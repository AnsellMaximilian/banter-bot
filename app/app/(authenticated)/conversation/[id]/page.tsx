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
  SenderType,
  UserConversation,
} from "@/type";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Query } from "appwrite";
import { SendHorizonal } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createChatResponse } from "@/services/createChatResponse";

function Page({
  params: { id: userConversationId },
}: {
  params: { id: string };
}) {
  const [conversation, setConversation] = useState<Conversation | null>(null);

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

        const messages = (
          await databases.listDocuments(
            config.dbId,
            config.messageCollectionId,
            [Query.equal("userConversationId", userConversationId)]
          )
        ).documents as Message[];

        setConversation({ ...conversation, userConversation });
        setMessages(messages);

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

  console.log({ messages });
  return (
    <div className="h-full flex flex-col">
      {conversation ? (
        <>
          <header className="p-4 border-b-2 border-border">
            <h1 className="text-xl">{conversation.title}</h1>
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
          <div className="p-4 flex gap-4 border-t-2 border-border">
            <Input
              type="text"
              onChange={(e) => setCurrentMessageText(e.target.value)}
            />
            <Button onClick={() => sendMessage()} disabled={isSending}>
              <SendHorizonal />
            </Button>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
export default Page;
