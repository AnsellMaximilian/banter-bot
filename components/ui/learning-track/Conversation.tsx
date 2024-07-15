import { Conversation as IConversation } from "@/type";
import React from "react";

export default function Conversation({
  conversation,
}: {
  conversation: IConversation;
}) {
  return (
    <div className="w-64 h-64 border-border border rounded-md p-4 flex flex-col hover:border-primary hover:bg-secondary cursor-pointer">
      <h3 className="text-xl font-semibold text-center mt-auto">
        {conversation.title}
      </h3>
    </div>
  );
}
