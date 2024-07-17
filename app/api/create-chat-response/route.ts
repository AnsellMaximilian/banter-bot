export const maxDuration = 50; // This function can run for a maximum of 50 seconds

import { config } from "@/lib/appwrite";
import { databases } from "@/lib/appwriteNode";
import {
  CreateChatRequestBody,
  CreateChatResponseBody,
  GeminiMessageResponse,
  Message,
  SenderType,
  UserConversation,
} from "@/type";
import {
  createErrorResponse,
  createSuccessResponse,
  removeJsonEncasing,
} from "@/utils/common";
import { geminiModel, generationConfig } from "@/utils/getGemini";
import { Content } from "@google/generative-ai";
import { Query } from "appwrite";
import { NextRequest } from "next/server";
import { ID, Permission, Role } from "node-appwrite";

export async function POST(request: NextRequest) {
  // body contains userConversationId
  const body: CreateChatRequestBody = await request.json();
  const userConversationId = body.userConversationId;
  const userMessage = body.userMessage;
  const personalityId = body.personalityId;

  try {
    // fetch user conversation
    const userConversation: UserConversation = await databases.getDocument(
      config.dbId,
      config.userConversationCollectionId,
      userConversationId
    );

    // fetch message history relating to user conversation
    const resMessages = await databases.listDocuments(
      config.dbId,
      config.messageCollectionId,
      [Query.equal("userConversationId", userConversation.$id)]
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

    console.log(JSON.stringify(history));

    // ask for response by Gemini
    const chatSession = geminiModel.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history,
    });

    const result = await chatSession.sendMessage(
      userMessage ? userMessage : "start the conversation"
    );
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
      } catch (error) {
        updatedUserConversation = null;
      }
    }

    // save user message
    let savedUserMessage: Message | undefined = undefined;
    if (userMessage) {
      savedUserMessage = (await databases.createDocument(
        config.dbId,
        config.messageCollectionId,
        ID.unique(),
        {
          userConversationId: userConversation.$id,
          textContent: userMessage,
          senderId: userConversation.userId,
          senderType: SenderType.USER,
          mistakes: geminiCustomResponse.mistakes,
          feedback: geminiCustomResponse.feedback,
          explanation: geminiCustomResponse.explanation,
          correctedText: geminiCustomResponse.correctedText,
        },
        [
          Permission.read(Role.user(userConversation.userId)),
          Permission.update(Role.user(userConversation.userId)),
        ]
      )) as Message;
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
      },
      [
        Permission.read(Role.user(userConversation.userId)),
        Permission.update(Role.user(userConversation.userId)),
      ]
    )) as Message;

    const response: CreateChatResponseBody = {
      userMessage: savedUserMessage || null,
      botMessage: savedBotMessage,
      updatedUserConversation: updatedUserConversation || userConversation,
    };

    return createSuccessResponse(response, "Message(s) created");
  } catch (err) {
    return createErrorResponse(
      err instanceof Error ? err.message : "Unknown error"
    );
  }
}
