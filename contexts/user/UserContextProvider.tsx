import { account } from "@/lib/appwrite";
import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Loader2 } from "lucide-react";
import { Models } from "appwrite";

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAccount = async () => {
    try {
      setIsLoading(true);
      const user = await account.get();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const session = await account.createEmailPasswordSession(email, password);
    await getAccount();
  };

  const logout = async () => {
    await account.deleteSession("current");
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isLoading,
        setCurrentUser,
        login,
        logout,
      }}
    >
      {isLoading && <Loader2 />}
      {isLoading === false && <>{children}</>}
    </UserContext.Provider>
  );
};
