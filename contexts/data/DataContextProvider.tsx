import { account, config, databases } from "@/lib/appwrite";
import { ReactNode, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Conversation,
  Personality,
  RemoteData,
  Settings,
  User,
  UserConversation,
  UserProfile,
} from "@/type";
import { languages } from "@/const";
import { DataContext } from "./DataContext";
import {
  getDefaultRemoteData,
  getRemoteDataWithSetter,
  setRemoteDataLoading,
} from "@/utils/common";

export const DataContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [conversations, setConversations] = useState<
    RemoteData<Conversation[]>
  >(getDefaultRemoteData([]));
  const [personalities, setPersonalities] = useState<RemoteData<Personality[]>>(
    getDefaultRemoteData([])
  );

  useEffect(() => {
    (async () => {
      setRemoteDataLoading(setConversations, true);
      setRemoteDataLoading(setPersonalities, true);
      const resConvos = await databases.listDocuments(
        config.dbId,
        config.conversationCollectionId
      );

      const resUserConvos = await databases.listDocuments(
        config.dbId,
        config.userConversationCollectionId
      );

      const resPersonalities = await databases.listDocuments(
        config.dbId,
        config.personalityCollectionId
      );
      const personalities = resPersonalities.documents as Personality[];
      const conversations = resConvos.documents as Conversation[];
      const userConversations = resUserConvos.documents as UserConversation[];

      setConversations((prev) => ({
        ...prev,
        conversations: conversations.map((convo) => ({
          ...convo,
          userConversation: userConversations.find(
            (uc) => uc.conversationId === convo.$id
          ),
        })),
      }));

      setPersonalities((prev) => ({
        ...prev,
        personalities: personalities,
      }));
      setRemoteDataLoading(setConversations, false);
      setRemoteDataLoading(setPersonalities, false);
    })();
  }, []);

  return (
    <DataContext.Provider
      value={{
        conversations: getRemoteDataWithSetter<Conversation[]>(
          conversations,
          setConversations
        ),
        personalities: getRemoteDataWithSetter<Personality[]>(
          personalities,
          setPersonalities
        ),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
