import { Models } from "appwrite";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type UserProfile = Models.Document & {
  username: string;
};

export type User = Models.User<Models.Preferences> & {
  profile: UserProfile;
};

export type Conversation = Models.Document & {
  title: string;
  description: string;
  prompt: string;
};

export enum SenderType {
  USER = "USER",
  BOT = "BOT",
}

export type Message = Models.Document & {
  textContent: string;
  sender: string;
  senderType: SenderType;
  userConversationId: string;
};

export type UserConversation = Models.Document & {
  userId: string;
  language: string;
  personalityId: string;
};

export type Personality = Models.Document & {
  name: string;
  description: string;
  prompt: string;
  persona: string;
  imageUrl: string;
  traits: string;
};
