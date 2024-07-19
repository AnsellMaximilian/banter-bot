"use client";

import ChatBubble from "@/components/conversation/ChatBubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { config, databases } from "@/lib/appwrite";
import { cn } from "@/lib/utils";
import {
  Conversation,
  Message,
  Personality as IPersonality,
  SenderType,
  UserConversation,
  Language,
} from "@/type";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ID, Permission, Query, Role } from "appwrite";
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
import Feedback from "@/components/conversation/Feedback";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Progress } from "@/components/ui/progress";
import { delay, getConversationLoadingMessage } from "@/utils/common";

function Page({
  params: { id: userConversationId },
}: {
  params: { id: string };
}) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [personality, setPersonality] = useState<IPersonality | null>(null);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { conversations } = useData();

  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentMessageText, setCurrentMessageText] = useState("");

  const [loadProgress, setLoadProgress] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingData(true);
        const userConversation = (await databases.getDocument(
          config.dbId,
          config.userConversationCollectionId,
          userConversationId
        )) as UserConversation;

        setLoadProgress(1);

        const conversation = (await databases.getDocument(
          config.dbId,
          config.conversationCollectionId,
          userConversation.conversationId
        )) as Conversation;

        setLoadProgress(2);

        const personality = (await databases.getDocument(
          config.dbId,
          config.personalityCollectionId,
          userConversation.personalityId
        )) as IPersonality;

        setLoadProgress(3);

        const messages = (
          await databases.listDocuments(
            config.dbId,
            config.messageCollectionId,
            [Query.equal("userConversationId", userConversationId)]
          )
        ).documents as Message[];
        setLoadProgress(4);
        await delay(500);
        setIsLoadingData(false);

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
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: res.message,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
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
    if (
      conversation &&
      conversation.userConversation &&
      currentMessageText &&
      !isLoadingData
    ) {
      try {
        setIsLoading(true);
        const savedUserMessage = (await databases.createDocument(
          config.dbId,
          config.messageCollectionId,
          ID.unique(),
          {
            userConversationId: conversation.userConversation.$id,
            textContent: currentMessageText,
            senderId: conversation.userConversation.userId,
            senderType: SenderType.USER,
          },
          [
            Permission.read(Role.user(conversation.userConversation.userId)),
            Permission.update(Role.user(conversation.userConversation.userId)),
          ]
        )) as Message;

        setMessages((prev) => [...prev, savedUserMessage]);
        setIsLoading(false);

        setIsSending(true);

        const res = await createChatResponse(
          conversation.userConversation.personalityId,
          conversation.userConversation.$id,
          savedUserMessage.$id
        );

        if (res.success) {
          const data = res.data!;
          setMessages((prev) => {
            const msgs = prev.slice();
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
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: res.message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      } catch (error) {
      } finally {
        setIsSending(false);
      }
    }
  };

  const selectMessage = (msg: Message | null) => setSelectedMessage(msg);

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
                    <ChatBubble
                      message={message as Message}
                      select={selectMessage}
                    />
                  </div>
                );
              })}
              {isSending && (
                <div className={cn("flex px-4 justify-start")}>
                  <ChatBubble select={selectMessage} />{" "}
                </div>
              )}
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
            <Button type="submit" disabled={isSending || isLoading}>
              <SendHorizonal />
            </Button>
          </form>
          <Dialog
            open={!!selectedMessage}
            onOpenChange={(open) => {
              if (!open) setSelectedMessage(null);
            }}
          >
            <DialogContent className="w-[600px] md:w-[750px] max-w-full">
              <DialogHeader>
                <DialogTitle className="">Feedback</DialogTitle>
                <DialogDescription className="">
                  Feedback on the message you sent.
                </DialogDescription>
              </DialogHeader>
              {selectedMessage && <Feedback message={selectedMessage} />}
              <DialogFooter>
                <Button
                  onClick={() => {
                    setSelectedMessage(null);
                  }}
                >
                  Got It
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="grow flex flex-col items-center justify-center">
          <div className="text-center text-xl mb-2 font-light">
            {getConversationLoadingMessage(loadProgress)}
          </div>
          <Progress
            value={(loadProgress / 4) * 100}
            className="w-[600px] max-w-full"
          />
        </div>
      )}
    </div>
  );
}
export default Page;
