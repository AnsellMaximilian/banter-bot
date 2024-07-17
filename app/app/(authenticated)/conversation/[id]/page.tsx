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

function Page({
  params: { id: userConversationId },
}: {
  params: { id: string };
}) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [personality, setPersonality] = useState<IPersonality | null>(null);

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
          const messages = res.data!;
          setMessages((prev) => {
            const msgs = prev.slice();
            if (messages.userMessage) msgs.push(messages.userMessage);
            msgs.push(messages.botMessage);

            return msgs;
          });
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

            <Button variant="ghost" className="ml-auto">
              <language.flag className="w-10" />
            </Button>
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
