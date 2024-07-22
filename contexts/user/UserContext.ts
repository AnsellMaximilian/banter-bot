import { User } from "@/type";
import { createContext, useContext } from "react";
export interface UserContextData {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  // for fetching account
  isLoading: boolean;
  // for activities involving accounts (register, login, etc)
  isProcessing: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextData>({
  currentUser: null,
  setCurrentUser: () => {},
  isLoading: true,
  isProcessing: false,
  login: () => {},
  logout: () => {},
});

export const useUser = (): UserContextData => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUser must be used within a corresponding ContextProvider"
    );
  }
  return context;
};
