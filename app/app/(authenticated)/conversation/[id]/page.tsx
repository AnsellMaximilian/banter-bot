"use client";

import ChatBubble from "@/components/conversation/ChatBubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exampleMessages } from "@/const/examples";
import privateRoute from "@/hooks/privateRoute";
import { config, databases } from "@/lib/appwrite";
import { cn } from "@/lib/utils";
import {
  Conversation,
  CreateChatRequestBody,
  CreateChatResponseBody,
  Message,
  Personality as IPersonality,
  SenderType,
  UserConversation,
  Language,
} from "@/type";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Query } from "appwrite";
import { SendHorizonal } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createChatResponse } from "@/services/createChatResponse";
import Image from "next/image";
import { languages } from "@/const";
import { useData } from "@/contexts/data/DataContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Page({
  params: { id: userConversationId },
}: {
  params: { id: string };
}) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [personality, setPersonality] = useState<IPersonality | null>(null);

  const { conversations } = useData();

  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const [currentMessageText, setCurrentMessageText] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingData(true);
        const userConversation = (await databases.getDocument(
          config.dbId,
          config.userConversationCollectionId,
          userConversationId
        )) as UserConversation;

        const conversation = (await databases.getDocument(
          config.dbId,
          config.conversationCollectionId,
          userConversation.conversationId
        )) as Conversation;

        const personality = (await databases.getDocument(
          config.dbId,
          config.personalityCollectionId,
          userConversation.personalityId
        )) as IPersonality;

        const messages = (
          await databases.listDocuments(
            config.dbId,
            config.messageCollectionId,
            [Query.equal("userConversationId", userConversationId)]
          )
        ).documents as Message[];

        setConversation({ ...conversation, userConversation });
        setMessages(messages);
        setPersonality(personality);

        if (messages.length <= 0) {
          const res = await createChatResponse(
            userConversation.personalityId,
            userConversation.$id
          );

          if (res.success) {
            const messages = res.data!;
            setMessages((prev) => {
              const msgs = prev.slice();
              if (messages.userMessage) msgs.push(messages.userMessage);
              msgs.push(messages.botMessage);

              return msgs;
            });
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingData(false);
      }
    })();
  }, []);

  const sendMessage = async () => {
    if (conversation && conversation.userConversation && currentMessageText) {
      try {
        setIsSending(true);

        const res = await createChatResponse(
          conversation.userConversation.personalityId,
          conversation.userConversation.$id,
          currentMessageText
        );

        if (res.success) {
          const data = res.data!;
          setMessages((prev) => {
            const msgs = prev.slice();
            if (data.userMessage) msgs.push(data.userMessage);
            msgs.push(data.botMessage);

            return msgs;
          });

          const updatedUserConversation = data.updatedUserConversation;
          setConversation((prev) =>
            prev ? { ...prev, userConversation: updatedUserConversation } : null
          );
          conversations.setData((prev) => ({
            ...prev,
            data: prev.data.map((c) =>
              c.$id === updatedUserConversation.conversationId
                ? { ...c, userConversation: updatedUserConversation }
                : c
            ),
          }));
        }
      } catch (error) {
      } finally {
        setIsSending(false);
      }
    }
  };
  const language: Language | undefined = languages.find(
    (l) => l.locale === conversation?.userConversation?.language
  );
  return (
    <div className="h-full flex flex-col">
      {conversation &&
      conversation.userConversation &&
      personality &&
      language ? (
        <>
          <header className="p-4 border-b-2 border-border flex items-center gap-4">
            <Image
              src={personality.imageUrl}
              height={55}
              width={55}
              alt={personality.name}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl">{personality.name}</h1>
              <p className="text-sm text-muted-foreground">
                {conversation.title}
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2">
              {conversation.userConversation.isComplete && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-green-500 text-sm text-white px-3 rounded-full">
                        Goal Reached
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        This conversation&apos;s goal has been reached, however
                        you can still continue talking.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              <Button variant="ghost" className="">
                <language.flag className="w-10" />
              </Button>
            </div>
          </header>
          <ScrollArea className="grow overflow-y-auto bg-primary/5">
            <div className="flex flex-col gap-4 my-4">
              {messages.map((message, idx) => {
                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex px-4",
                      message.senderType === SenderType.USER
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    <ChatBubble message={message as Message} />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <form
            className="p-4 flex gap-4 border-t-2 border-border"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
              setCurrentMessageText("");
            }}
          >
            <Input
              type="text"
              value={currentMessageText}
              onChange={(e) => setCurrentMessageText(e.target.value)}
            />
            <Button type="submit" disabled={isSending}>
              <SendHorizonal />
            </Button>
          </form>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
export default Page;
