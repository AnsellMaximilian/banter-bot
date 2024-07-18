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

Respond in the following format as JSON:
{
 "message": "A string representing a message starting the conversation or responding to the most recent user message.",
 "isGoalReached": "a boolean representing whether or not the specified goal of the conversation has been reached. Make sure the user has replied a few times at least before determining goal is reached (true). Be immensly strict about this and only set to true once the history of messages is representative of reaching the specified goal.",
 "mistakes": "if user message is not null, it should be string explaining what grammar/linguistic mistakes the user message has. If there are no mistakes or if user message is null, this should be null",
 "correctedText": "if user message is not null and has mistakes, it should be string rewriting user message to be correct. If there are no mistakes or if user message is null, this should be null",
 "explanation": "A string explaining in general grammar and linguistic concepts relating to either user message (if it has no mistakes) or the correctedText if it has any mistakes. If user message is null, this should be null.",
 "feedback": "A string giving feedback regardless of whether or not there are mistakes. Just advice for improvement. If user message is null, this should be null"
}
`;
  return prompt;
}

export function getConversationLoadingMessage(progress: 0 | 1 | 2 | 3 | 4) {
  switch (progress) {
    case 0:
      return "Loading user conversation...";
    case 1:
      return "Loading conversation...";
    case 2:
      return "Loading AI personality...";
    case 3:
      return "Loading messages...";

    case 4:
      return "Loading complete.";

      break;

    default:
      break;
  }
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
