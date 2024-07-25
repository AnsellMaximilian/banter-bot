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
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 first:pt-0">
      <div className="">
        <div className="text-xs md:text-sm font-semibold">{title}</div>
        <p className="text-sm md:text-base">{reviewItem.review}</p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-1 lg:gap-2">
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 lg:w-4 lg:h-4 border-border border",
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
