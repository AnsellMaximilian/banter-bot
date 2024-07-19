import { cn } from "@/lib/utils";
import { Message, SenderType } from "@/type";
import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Typing = () => {
  return (
    <div className="flex gap-4">
      <div className="w-3 h-3 rounded-full bg-white typing delay-0"></div>
      <div className="w-3 h-3 rounded-full bg-white typing delay-250"></div>
      <div className="w-3 h-3 rounded-full bg-white typing delay-500"></div>
    </div>
  );
};

export default function ChatBubble({
  message,
  select,
}: {
  message?: Message;
  select: (msg: Message | null) => void;
}) {
  const isFromUser = message?.senderType === SenderType.USER;
  const hasFeedback =
    message?.feedback ||
    message?.mistakes ||
    message?.correctedText ||
    message?.explanation;
  return (
    <div
      className={cn(
        "p-4 rounded-md shadow-md pr-8 relative group",
        isFromUser ? "bg-white ml-16" : "bg-primary text-white mr-16"
      )}
    >
      {isFromUser && hasFeedback && message && (
        <IoMdInformationCircleOutline
          className="absolute top-2 right-2 text-red-600 cursor-pointer animate-pulse"
          onClick={() => select(message)}
        />
      )}

      {!message ? <Typing /> : <span>{message.textContent}</span>}
    </div>
  );
}
