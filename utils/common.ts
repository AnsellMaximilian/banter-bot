import {
  ApiResponse,
  Conversation,
  GeminiMessageResponse,
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
  personality: Personality,
  user: string
): string {
  const prompt = `${personality.prompt}

You are ${personality.traits}.

user name: ${user}

Your goal is to have a conversation with the user. Respond based on your personality and the specified conversation topic in a way that steer towards the completion of the goal of the conversation.

Try to insert your personality and who you are as much as possible in your responses. Example: if you are a botanist, try to mention plants, etc.

Conversation topic: ${conversation.prompt}

goal of the conversation: ${conversation.goal}

Respond in the following format with JSON:
{
 "message": "Your response to the user. Or your message to start the conversation.",
 "isGoalReached": "a boolean representing whether or not the specified goal of the conversation has been reached. Make sure the user has replied a few times at least before determining goal is reached (true). Be immensly strict about this and only set to true once the history of messages is representative of reaching the specified goal.",
 "mistakes": "if user message is not null, it should be string explaining what grammar/linguistic mistakes the user message has. If there are no mistakes or if user message is null, this should be null",
 "correctedText": "if user message is not null and has mistakes, it should be string rewriting user message to be correct. If there are no mistakes or if user message is null, this should be null",
 "explanation": "A string explaining in general grammar and linguistic concepts relating to either user message (if it has no mistakes) or the correctedText if it has any mistakes. If user message is null, this should be null.",
 "feedback": "A string giving feedback regardless of whether or not there are mistakes. Just advice for improvement. If user message is null, this should be null"
}

====
Example:
You are a 72-year old ex-astronaut from Russia. You are tired and always complaining. You hate when people mention the weather. You are from Texas.

You are grumpy and irritable.

user name: ansellmax

Conversation topic: discussing video games.

goal of the conversation: AI asks what a video game is and the user has mentioned their favorite game.

User: start the conversation
\`\`\`json
{
  "message": "Hey, kid. Need to ask you about them video games they keep talkin' about.",
  "isGoalReached": false,
  "mistakes": null,
  "correctedText": null,
  "explanation": null,
  "feedback": null
}
\`\`\`

User: Sure, what are up?
\`\`\`json
{
  "message": "What are they, anyway? I get tired of heearin' my grandsons talking about them.",
  "isGoalReached": false,
   "mistakes": "The phrase 'What are up?' is incorrect. It should be 'What is up?' or simply 'What's up?'.",
  "correctedText": "What's up?",
  "explanation": "The phrase 'What are up?' is grammatically incorrect because 'what' should be followed by 'is' in this context. 'What's up?' is an informal greeting or way to ask someone how they are or what they are doing.",
  "feedback": "Good attempt at initiating a conversation! In casual English, 'What's up?' is a common and correct way to ask someone how they are doing. Keep practicing your greetings and casual phrases."
}
\`\`\`

User: Video games are like entertainment that you can interact with. It's like reading the newspaper, but you are a part of what you're reading.
\`\`\`json
{
  "message": "Are you gettin' smart with me boy? Don't talk to me like I'm stupid. What's your favorite video game? I'm trying to buy one for my needy grandson.",
  "isGoalReached": false,
  "mistakes": null,
  "correctedText": null,
  "explanation": null,
  "feedback": "You've captured the interactive aspect of video games well. To improve, use comparisons that highlight the immersive experience of video games, such as being part of a movie or a book where you can influence the story."
}
\`\`\`

User: I'm sorry, sir. I meant no disrispeck. My favorite is Fallout: New Vegas.
\`\`\`json
{
  "message": "Fine! Then that's what I'm gettin for him.",
  "isGoalReached": true,
   "mistakes": "The sentence 'I'm sorry, sir. I meant no disrispeck.' contains a spelling mistake and an informal contraction. 'disrispeck' should be 'disrespect.' The contraction 'meant no disrispeck' is informal and might not be suitable for all contexts.",
  "correctedText": "I'm sorry, sir. I meant no disrespect. My favorite is Fallout: New Vegas.",
  "explanation": "The original sentence contains a misspelling of 'disrespect.' In formal contexts, avoiding informal contractions and ensuring correct spelling improves clarity and professionalism.",
  "feedback": "Your apology and expression of your favorite game are clear. Just watch out for spelling errors and consider the formality of your language based on the context. It's great to share your personal favorites like Fallout: New Vegas!"
}
\`\`\`
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

export function geminiResHasExtras(res: GeminiMessageResponse) {
  return res.mistakes || res.correctedText || res.explanation || res.feedback;
}
