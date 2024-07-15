"use client";

import ChatBubble from "@/components/conversation/ChatBubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exampleMessages } from "@/const/examples";
import { cn } from "@/lib/utils";
import { Message, SenderType } from "@/type";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { SendHorizonal } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="h-full flex flex-col">
      <header className="p-4 border-b-2 border-border">
        <h1 className="text-xl">Asking About Someone's Day</h1>
      </header>
      <ScrollArea className="grow overflow-y-auto bg-primary/5">
        <div className="flex flex-col gap-4 my-4">
          {exampleMessages.map((message, idx) => {
            return (
              <div
                key={idx}
                className={cn(
                  "flex px-4",
                  (message as Message).senderType === SenderType.USER
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
        <Input type="text" />
        <Button>
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
}
