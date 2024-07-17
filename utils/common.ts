import {
  ApiResponse,
  Conversation,
  Personality,
  RemoteData,
  RemoteDataWithSetter,
} from "@/type";
import { Dispatch, SetStateAction } from "react";

export function removeJsonEncasing(text: string) {
  const pattern = /^```json\s+([\s\S]*?)\s+```$/;

  const result = text.replace(pattern, "$1");

  return result;
}

export function createErrorResponse(message: string): Response {
  const res: ApiResponse<null> = {
    data: null,
    success: false,
    message: message,
  };

  return Response.json(res);
}

export function createSuccessResponse<T>(
  data: T,
  message: string = ""
): Response {
  const res: ApiResponse<T> = {
    data,
    success: true,
    message,
  };

  return Response.json(res);
}

export function getDefaultRemoteData<T>(data: T): RemoteData<T> {
  return {
    isLoading: false,
    data,
  };
}

export function getRemoteDataWithSetter<T>(
  remoteData: RemoteData<T>,
  setter: Dispatch<SetStateAction<RemoteData<T>>>
): RemoteDataWithSetter<T> {
  return { ...remoteData, setData: setter };
}

export function setRemoteDataLoading<T>(
  setter: Dispatch<SetStateAction<RemoteData<T>>>,
  value: boolean
) {
  setter((prev) => ({ ...prev, isLoading: value }));
}

export function generateUserConversationPrompt(
  conversation: Conversation,
  personality: Personality
): string {
  const prompt = `${personality.prompt}

You are ${personality.traits}

${conversation.prompt}

goal of the conversation: ${conversation.goal}

Respond in the following format:
{
 "message": "A string representing a message starting the conversation or responding to the most recent user message.",
 "isGoalReached": "a boolean representing whether or not the specified goal of the conversation has been reached. Make sure the user has replied a few times at least before determining goal is reached (true).",
}
`;
  return prompt;
}
