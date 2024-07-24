export const maxDuration = 50; // This function can run for a maximum of 50 seconds

import { config } from "@/lib/appwrite";
import { databases } from "@/lib/appwriteNode";
import {
  CreateChatRequestBody,
  CreateChatResponseBody,
  CreateReviewRequestBody,
  CreateReviewResponseBody,
  GeminiMessageResponse,
  Message,
  Review,
  ReviewJSON,
  SenderType,
  UserConversation,
} from "@/type";
import {
  createErrorResponse,
  createSuccessResponse,
  geminiResHasExtras,
  getGenerateReviewPrompt,
  hasBeenAWeekSince,
  removeJsonEncasing,
} from "@/utils/common";
import {
  geminiFlashModel,
  geminiModel,
  generationConfig,
} from "@/utils/getGemini";
import { Content, GoogleGenerativeAIError } from "@google/generative-ai";
import { Query } from "appwrite";
import { NextRequest } from "next/server";
import { ID, Permission, Role } from "node-appwrite";

export async function POST(request: NextRequest) {
  // body contains userConversationId
  const body: CreateReviewRequestBody = await request.json();
  const userId = body.userId;
  const languageLocale = body.language;

  try {
    // check if review already exists
    let review: null | Review = null;
    const existingReviews = await databases.listDocuments(
      config.dbId,
      config.reviewCollectionId,
      [
        Query.and([
          Query.equal("userId", userId),
          Query.equal("language", languageLocale),
        ]),
      ]
    );

    if (existingReviews.total > 0) {
      review = existingReviews.documents[0] as Review;
      if (!hasBeenAWeekSince(review.$updatedAt))
        return createErrorResponse("Reviews can only be created every week.");
    }

    // fetch relevant messages (last 20 messages after latest update)
    const messageQueries: string[] = [
      Query.and([
        Query.equal("senderId", userId),
        Query.equal("language", languageLocale),
        ...(review ? [Query.greaterThan("$createdAt", review.$updatedAt)] : []),
      ]),
      Query.limit(15),
    ];

    const resMessages = await databases.listDocuments(
      config.dbId,
      config.messageCollectionId,
      messageQueries
    );

    if (resMessages.total < 15)
      return createErrorResponse(
        "You must have at least 15 new messages since the last review."
      );

    const messages = resMessages.documents as Message[];
    const sortedMessages = messages.sort(
      (a, b) =>
        new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime()
    );

    // ask for response by Gemini
    const geminiRes = await geminiFlashModel.generateContent({
      contents: [
        {
          role: "user",
          parts: getGenerateReviewPrompt(
            languageLocale,
            review,
            messages.map((m) => ({
              text: m.textContent,
              mistakes: m.mistakes || null,
              correctedText: m.correctedText || null,
            }))
          ),
        },
      ],
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
    });

    const geminiCustomResponse: ReviewJSON = JSON.parse(
      removeJsonEncasing(geminiRes.response.text())
    );

    const createdReview = (await databases.createDocument(
      config.dbId,
      config.reviewCollectionId,
      ID.unique(),
      {
        userId,
        language: languageLocale,
        reviewJSON: removeJsonEncasing(geminiRes.response.text()),
      }
    )) as Review;

    const response: CreateReviewResponseBody = {
      review: { ...createdReview, reviewValue: geminiCustomResponse },
      language: languageLocale,
    };

    return createSuccessResponse(response, "Review created");
  } catch (err) {
    console.log(err);
    let errorMsg = "Unkown Error";
    if (err instanceof GoogleGenerativeAIError)
      errorMsg = "Gemini encountered some error. Please try again.";
    else if (err instanceof Error) errorMsg = err.message;
    return createErrorResponse(errorMsg);
  }
}
