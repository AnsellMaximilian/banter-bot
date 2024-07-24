"use client";

import { cn } from "@/lib/utils";
import { Conversation as IConversation } from "@/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

export default function Conversation({
  conversation,
  setSelectedConversation,
}: {
  conversation: IConversation;
  setSelectedConversation: Dispatch<SetStateAction<IConversation | null>>;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (conversation.userConversation) {
          router.push(`/app/conversation/${conversation.userConversation.$id}`);
        } else {
          setSelectedConversation(conversation);
        }
      }}
      className="relative h-64 border-border border rounded-md p-4 flex flex-col hover:border-primary hover:bg-secondary cursor-pointer"
    >
      <div
        className={cn(
          "absolute right-0 top-4 rounded-l-full text-white px-2",
          conversation.userConversation
            ? conversation.userConversation.isComplete
              ? "bg-green-600"
              : "bg-orange-600"
            : "bg-secondary text-gray-400"
        )}
      >
        {conversation.userConversation
          ? conversation.userConversation.isComplete
            ? "Completed"
            : "In Progress"
          : "Not Started"}
      </div>
      <Image
        src={
          conversation.userConversation
            ? conversation.userConversation.personalityImage
            : "/images/personalities/default.png"
        }
        width={200}
        height={200}
        alt="Personality"
        className="rounded-full w-32 mx-auto mt-auto"
      />
      <h3 className="text-xl font-semibold text-center mt-4 mx-auto">
        {conversation.title}
      </h3>
      <p className="text-center text-sm mt-2">{conversation.description}</p>
    </button>
  );
}
