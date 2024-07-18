import { cn } from "@/lib/utils";
import { Message, SenderType } from "@/type";
import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function ChatBubble({
  message,
  select,
}: {
  message: Message;
  select: (msg: Message) => void;
}) {
  const isFromUser = message.senderType === SenderType.USER;
  const hasFeedback =
    message.feedback ||
    message.mistakes ||
    message.correctedText ||
    message.explanation;
  return (
    <div
      className={cn(
        "p-4 rounded-md shadow-md pr-8 relative group",
        isFromUser ? "bg-white ml-16" : "bg-primary text-white mr-16"
      )}
    >
      {isFromUser && hasFeedback && (
        <IoMdInformationCircleOutline
          className="absolute top-2 right-2 text-red-600 cursor-pointer animate-pulse"
          onClick={() => select(message)}
        />
      )}

      <span>{message.textContent}</span>
    </div>
  );
}
