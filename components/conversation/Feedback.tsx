import { cn } from "@/lib/utils";
import { Message, MessageFeedback } from "@/type";
import React from "react";

const FeedbackItem = ({
  title,
  value,
  bgColor = "bg-secondary",
}: {
  title: string;
  value: string;
  bgColor?: string;
}) => {
  return (
    <div className={cn("p-2 rounded-md border-border border", bgColor)}>
      <h3 className="text-sm font-bold">{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default function Feedback({ message }: { message: Message }) {
  return (
    <div className="space-y-2">
      <FeedbackItem title="Original Message" value={message.textContent} />
      {message.correctedText && (
        <FeedbackItem
          title="Corrected Text"
          value={message.correctedText}
          bgColor="bg-green-200"
        />
      )}
      {message.mistakes && (
        <FeedbackItem
          title="Mistakes"
          value={message.mistakes}
          bgColor="bg-red-200"
        />
      )}
      {message.explanation && (
        <FeedbackItem
          title="Explanation"
          value={message.explanation}
          bgColor="bg-orange-100"
        />
      )}
    </div>
  );
}
