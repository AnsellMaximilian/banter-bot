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
