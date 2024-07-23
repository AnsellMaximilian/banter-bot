"use client";

import React, { useState } from "react";

import { Separator } from "@/components/ui/separator";

import { languages } from "@/const";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useData } from "@/contexts/data/DataContext";
import { Button } from "@/components/ui/button";
import { exampleReviews } from "@/const/examples";
import { Review } from "@/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReviewItem from "@/components/review/ReviewItem";

export default function Page() {
  const { reviews } = useData();
  const [selectedLocale, setSelectedLocale] = useState(languages[0].locale);

  const review = (exampleReviews as Review[]).find(
    (r) => r.language === selectedLocale
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Your Reviews</h1>
      <p className="text-muted-foreground">
        This is where you&apos;ll be able to see your progress in each language.
        See your current level of understanding and/or how you&apos;ve improved
        since the last review.
      </p>
      <div className="mt-8">
        <div className="">
          <Select
            value={selectedLocale}
            onValueChange={(v) => setSelectedLocale(v)}
          >
            <SelectTrigger className="w-full lg:w-[600px] max-w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((l) => (
                <SelectItem key={l.locale} value={l.locale}>
                  <div className="flex gap-4 items-center" key={l.locale}>
                    <l.flag className="w-8" />
                    <div className=""> {l.readableName}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <div className="mt-4 p-8 pt-6 rounded-md border border-border">
            {review && review.reviewValue ? (
              <div className="">
                <h2 className="text-xl font-semibold">Generated Review</h2>
                <p className="mt-2 text-lg">{review.reviewValue.summary}</p>
                <Separator className="my-8" />
                <div className="">
                  <h3 className="font-bold">Details</h3>
                  <div className="space-y-4 mt-4">
                    <ReviewItem
                      title="Grammar"
                      reviewItem={review.reviewValue.grammar}
                    />
                    <ReviewItem
                      title="Vocabulary"
                      reviewItem={review.reviewValue.vocabulary}
                    />
                    <ReviewItem
                      title="Spelling"
                      reviewItem={review.reviewValue.spelling}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="text-center space-y-4">
                  <div className="text-center text-xl font-light">
                    You haven&apos;t had a review in this language yet.
                  </div>
                  <Button>Generate Review</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
