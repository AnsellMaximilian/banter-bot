"use client";

import Conversation from "@/components/learning-track/Conversation";
import { exampleConversations } from "@/const/examples";
import { Conversation as IConversation } from "@/type";
import React, { useEffect } from "react";

export default function AppPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Learning Track</h1>
      <div className="flex flex-wrap gap-4 mt-8">
        {exampleConversations.map((conversation, idx) => {
          return <Conversation conversation={conversation as IConversation} />;
        })}
      </div>
    </div>
  );
}
