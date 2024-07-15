"use client";

import Conversation from "@/components/learning-track/Conversation";
import { exampleConversations } from "@/const/examples";
import { config, databases } from "@/lib/appwrite";
import { Conversation as IConversation, UserConversation } from "@/type";
import React, { useEffect, useState } from "react";

export default function AppPage() {
  const [conversations, setConversations] = useState<IConversation[]>([]);

  useEffect(() => {
    (async () => {
      const resConvos = await databases.listDocuments(
        config.dbId,
        config.conversationCollectionId
      );

      const resUserConvos = await databases.listDocuments(
        config.dbId,
        config.userConversationCollectionId
      );
      const conversations = resConvos.documents as IConversation[];
      const userConversations = resUserConvos.documents as UserConversation[];
      setConversations(
        conversations.map((convo) => ({
          ...convo,
          userConversation: userConversations.find(
            (uc) => uc.conversationId === convo.$id
          ),
        }))
      );
    })();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Learning Track</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        {conversations.map((conversation, idx) => {
          return <Conversation conversation={conversation as IConversation} />;
        })}
      </div>
    </div>
  );
}
