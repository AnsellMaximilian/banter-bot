import { createContext, useContext } from "react";
export interface UserContextData {
  currentUser: any | null;
  setCurrentUser: (user: any | null) => void;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextData>({
  currentUser: null,
  setCurrentUser: () => {},
  isLoading: true,
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
