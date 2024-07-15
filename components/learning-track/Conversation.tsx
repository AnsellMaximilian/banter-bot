import { cn } from "@/lib/utils";
import { Conversation as IConversation } from "@/type";
import Link from "next/link";
import React from "react";

export default function Conversation({
  conversation,
}: {
  conversation: IConversation;
}) {
  return (
    <Link
      href="/app/conversation"
      className="relative w-64 h-64 border-border border rounded-md p-4 flex flex-col hover:border-primary hover:bg-secondary cursor-pointer"
    >
      <div
        className={cn(
          "absolute right-0 top-4 rounded-l-full text-white px-2",
          "bg-green-600"
        )}
      >
        Completed
      </div>
      <h3 className="text-xl font-semibold text-center mt-auto">
        {conversation.title}
      </h3>
      <p className="text-center text-sm mt-2">{conversation.description}</p>
    </Link>
  );
}
