import { cn } from "@/lib/utils";
import { Message, SenderType } from "@/type";
import React from "react";

export default function ChatBubble({ message }: { message: Message }) {
  return (
    <div
      className={cn(
        "p-4 rounded-md shadow-md",
        message.senderType === SenderType.USER
          ? "bg-white ml-16"
          : "bg-primary text-white mr-16"
      )}
    >
      {message.textContent}
    </div>
  );
}
