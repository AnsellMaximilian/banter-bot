import {
  ApiResponse,
  CreateChatRequestBody,
  CreateChatResponseBody,
} from "@/type";
import axios from "axios";

export const createChatResponse = async (
  personalityId: string,
  userConversationId: string,
  messageId?: string
) => {
  const body: CreateChatRequestBody = {
    personalityId: personalityId,
    userConversationId: userConversationId,
    messageId,
  };
  const res = await axios.post("/api/create-chat-response", body);
  const messages = res.data as ApiResponse<CreateChatResponseBody>;

  return messages;
};
