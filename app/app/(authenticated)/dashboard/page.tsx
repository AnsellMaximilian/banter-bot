"use client";

import Conversation from "@/components/learning-track/Conversation";
import { exampleConversations } from "@/const/examples";
import { config, databases } from "@/lib/appwrite";
import { Conversation as IConversation, UserConversation } from "@/type";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/settings/SettingsContext";
import { languages } from "@/const";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AppPage() {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { settings, setSettings } = useSettings();

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
  console.log(settings);
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Learning Track</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <settings.language.flag className="w-10" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.locale}
                className={cn(
                  "flex gap-4 cursor-pointer",
                  lang.locale === settings.language.locale ? "bg-secondary" : ""
                )}
                onClick={() =>
                  setSettings((prev) => ({ ...prev, language: lang }))
                }
              >
                <lang.flag className={cn("w-10")} />{" "}
                <span>{lang.readableName}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        {conversations.map((conversation) => {
          return (
            <Conversation
              conversation={conversation as IConversation}
              key={conversation.$id}
            />
          );
        })}
      </div>
    </div>
  );
}
