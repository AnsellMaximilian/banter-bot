import { Client, Account, Databases, Functions } from "appwrite";

export const config = {
  projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  dbId: String(process.env.NEXT_PUBLIC_DB_ID),
  registerFuncId: String(process.env.NEXT_PUBLIC_REGISTER_FUNC_ID),

  userProfileCollectionId: String(
    process.env.NEXT_PUBLIC_USER_PROFILE_COLLECTION_ID
  ),
  conversationCollectionId: String(
    process.env.NEXT_PUBLIC_CONVERSATION_COLLECTION_ID
  ),
  userConversationCollectionId: String(
    process.env.NEXT_PUBLIC_USER_CONVERSATION_COLLECTION_ID
  ),
  messageCollectionId: String(process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID),
  personalityCollectionId: String(
    process.env.NEXT_PUBLIC_PERSONALITY_COLLECTION_ID
  ),
  reviewCollectionId: String(process.env.NEXT_PUBLIC_REVIEW_COLLECTION_ID),
};

export const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(config.projectId);

export const account = new Account(client);

export const databases = new Databases(client);

export const functions = new Functions(client);
