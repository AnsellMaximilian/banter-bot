import { cn } from "@/lib/utils";
import { ReviewItem as IReviewItem } from "@/type";
import React from "react";

export default function ReviewItem({
  title,
  reviewItem,
}: {
  title: string;
  reviewItem: IReviewItem;
}) {
  return (
    <div className="flex justify-between items-end">
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <p>{reviewItem.review}</p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "w-4 h-4 border-border border",
                  reviewItem.score >= i + 1 ? "bg-primary" : "bg-secondary"
                )}
              ></div>
            );
          })}
        </div>
        <div className="font-bold text-sm">{reviewItem.score}/10</div>
      </div>
    </div>
  );
}
