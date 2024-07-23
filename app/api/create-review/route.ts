export const maxDuration = 50; // This function can run for a maximum of 50 seconds

import { config } from "@/lib/appwrite";
import { databases } from "@/lib/appwriteNode";
import {
  CreateChatRequestBody,
  CreateChatResponseBody,
  CreateReviewRequestBody,
  GeminiMessageResponse,
  Message,
  Review,
  SenderType,
  UserConversation,
} from "@/type";
import {
  createErrorResponse,
  createSuccessResponse,
  geminiResHasExtras,
  removeJsonEncasing,
} from "@/utils/common";
import { geminiModel, generationConfig } from "@/utils/getGemini";
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
      [Query.equal("userId", userId), Query.equal("language", languageLocale)]
    );

    if (existingReviews.total > 0) {
      review = existingReviews.documents[0] as Review;
    } else {
    }

    // fetch relevant messages (last 20 messages 7 days after latest update)
    const resMessages = await databases.listDocuments(
      config.dbId,
      config.messageCollectionId,
      [Query.equal("senderId", userId)]
    );

    const messages = resMessages.documents as Message[];
    const sortedMessages = messages.sort(
      (a, b) =>
        new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime()
    );
    // string together history
    const history: Content[] = [
      {
        role: "user",
        parts: [
          {
            text: `${userConversation.prompt}
            user message: ${userMessage ? `"${userMessage}"` : "null"}
            `,
          },
        ],
      },
      ...sortedMessages.map((m) => {
        return {
          role: m.senderType === SenderType.USER ? "user" : "model",
          parts: [
            {
              text: `\`\`\`json
            {
              "message": ${m.textContent},
              "isGoalReached": false
            }
            \`\`\``,
            },
          ],
        };
      }),
    ];

    if (userMessage) {
      history.push({
        role: "user",
        parts: [
          {
            text: `\`\`\`json
          {
            "message": ${userMessage},
            "isGoalReached": false
          }
          \`\`\``,
          },
        ],
      });
    }

    // console.log(JSON.stringify(history));

    // ask for response by Gemini
    const chatSession = geminiModel.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history,
    });

    const result = await chatSession.sendMessage(
      userMessage ? userMessage.textContent : "start the conversation"
    );

    console.log(result.response.text());
    const geminiCustomResponse: GeminiMessageResponse = JSON.parse(
      removeJsonEncasing(result.response.text())
    );

    let updatedUserConversation: UserConversation | null = null;

    if (geminiCustomResponse.isGoalReached) {
      try {
        updatedUserConversation = (await databases.updateDocument(
          config.dbId,
          config.userConversationCollectionId,
          userConversation.$id,
          {
            isComplete: true,
          }
        )) as UserConversation;
        console.log("UPDATED USER CONVO");
      } catch (error) {
        updatedUserConversation = null;
      }
    }

    // update user message
    if (userMessage && geminiResHasExtras(geminiCustomResponse)) {
      userMessage = (await databases.updateDocument(
        config.dbId,
        config.messageCollectionId,
        userMessage.$id,
        {
          mistakes: geminiCustomResponse.mistakes,
          feedback: geminiCustomResponse.feedback,
          explanation: geminiCustomResponse.explanation,
          correctedText: geminiCustomResponse.correctedText,
        }
      )) as Message;
      console.log("UPDATED message");
    }

    const savedBotMessage = (await databases.createDocument(
      config.dbId,
      config.messageCollectionId,
      ID.unique(),
      {
        userConversationId: userConversation.$id,
        textContent: geminiCustomResponse.message,
        senderId: personalityId,
        senderType: SenderType.BOT,
        translation: geminiCustomResponse.translation,
      },
      [
        Permission.read(Role.user(userConversation.userId)),
        Permission.update(Role.user(userConversation.userId)),
      ]
    )) as Message;

    const response: CreateChatResponseBody = {
      userMessage: userMessage || null,
      botMessage: savedBotMessage,
      updatedUserConversation: updatedUserConversation || userConversation,
    };

    return createSuccessResponse(response, "Message(s) created");
  } catch (err) {
    console.log(err);
    let errorMsg = "Unkown Error";
    if (err instanceof GoogleGenerativeAIError)
      errorMsg = "Gemini encountered some error. Please try again.";
    else if (err instanceof Error) errorMsg = err.message;
    return createErrorResponse(errorMsg);
  }
}
