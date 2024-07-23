import { cn } from "@/lib/utils";
import { Message, SenderType } from "@/type";
import React, { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiTranslateFill } from "react-icons/pi";

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
  const [isTranslated, setIsTranslated] = useState(false);
  const isFromUser = message?.senderType === SenderType.USER;
  const hasFeedback =
    message?.feedback ||
    message?.mistakes ||
    message?.correctedText ||
    message?.explanation;
  return (
    <div
      className={cn(
        "p-4 rounded-md shadow-md pr-8 relative group max-w-[800px]",
        isFromUser ? "bg-white ml-16" : "bg-primary text-white mr-16"
      )}
    >
      <div
        className={cn(
          "absolute",
          isFromUser
            ? "rotate-[135deg] -right-2 -bottom-2"
            : "rotate-[-135deg] -left-2 -bottom-2"
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className={cn(isFromUser ? "fill-white" : "fill-primary")}
        >
          <polygon points="10,0 20,20 0,20" />
        </svg>
      </div>
      {isFromUser && hasFeedback && message && (
        <IoMdInformationCircleOutline
          className="absolute top-2 right-2 text-red-600 cursor-pointer animate-pulse"
          onClick={() => select(message)}
        />
      )}

      {/* {!isFromUser && message?.translation && (
        <PiTranslateFill
          className={cn(
            "absolute top-2 right-2 cursor-pointer",
            isTranslated ? "text-[#2F2F2F]" : "text-white"
          )}
          onClick={() => setIsTranslated((prev) => !prev)}
        />
      )} */}

      {!message ? (
        <Typing />
      ) : (
        <div className="flex flex-col">
          <div>
            {isTranslated && message.translation
              ? message.translation
              : message.textContent}
          </div>
          {!isFromUser && message?.translation && (
            <button
              className="text-xs ml-auto mt-0.5 hover:underline text-gray-100"
              onClick={() => setIsTranslated((prev) => !prev)}
            >
              {isTranslated ? "See original" : "See translation"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
