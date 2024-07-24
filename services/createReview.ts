import {
  ApiResponse,
  CreateChatRequestBody,
  CreateChatResponseBody,
  CreateReviewRequestBody,
  CreateReviewResponseBody,
} from "@/type";
import axios from "axios";

export const createReview = async (language: string, userId: string) => {
  const body: CreateReviewRequestBody = {
    language,
    userId,
  };
  const res = await axios.post("/api/create-review", body);
  const result = res.data as ApiResponse<CreateReviewResponseBody>;

  return result;
};
