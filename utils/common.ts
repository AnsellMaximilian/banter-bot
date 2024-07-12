import { ApiResponse } from "@/type";

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
