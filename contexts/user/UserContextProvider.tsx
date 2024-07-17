import { account, config, databases } from "@/lib/appwrite";
import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Loader2 } from "lucide-react";
import { User, UserProfile } from "@/type";

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAccount = async () => {
    try {
      setIsLoading(true);
      const user = await account.get();
      const userProfile: UserProfile = await databases.getDocument(
        config.dbId,
        config.userProfileCollectionId,
        user.$id
      );
      setCurrentUser({ ...user, profile: userProfile });
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
    setCurrentUser(null);
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
