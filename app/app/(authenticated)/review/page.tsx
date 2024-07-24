"use client";

import React, { useState } from "react";

import { Separator } from "@/components/ui/separator";

import { languages } from "@/const";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { createReview } from "@/services/createReview";
import { useUser } from "@/contexts/user/UserContext";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { reviews } = useData();
  const { toast } = useToast();
  const { currentUser } = useUser();
  const [selectedLocale, setSelectedLocale] = useState(languages[0].locale);
  const [isGeneratingReview, setIsGeneratingReview] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const review = reviews.data.find((r) => r.language === selectedLocale);

  const generateReview = async () => {
    if (currentUser) {
      try {
        setIsGeneratingReview(true);
        const res = await createReview(selectedLocale, currentUser.$id);
        if (res.success && res.data) {
          const review = res.data.review;
          const lang = res.data.language;
          reviews.setData((prev) => {
            const reviews = prev.data;
            const foundReview = reviews.find((r) => r.language === lang);
            console.log({ reviews, foundReview });
            return {
              ...prev,
              data: foundReview
                ? prev.data.map((r) => (r.language === lang ? review : r))
                : [...prev.data, review],
            };
          });
          toast({
            title: "Created review",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: res.message,
            // action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      } catch (error) {
      } finally {
        setIsGeneratingReview(false);
        setIsConfirmDialogOpen(false);
      }
    }
  };

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
                  <Button onClick={() => setIsConfirmDialogOpen(true)}>
                    Generate Review
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {review && (
          <div className="mt-2 flex justify-between items-start">
            <div className="text-muted-foreground text-sm">
              Last updated 30/20/2024
            </div>
            <Button onClick={() => setIsConfirmDialogOpen(true)}>
              Get Updated Review
            </Button>
          </div>
        )}
      </div>
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="w-[600px] md:w-[750px] max-w-full">
          <DialogHeader>
            <DialogTitle className="">Get Your Latest Review</DialogTitle>
            <DialogDescription className="">
              Ask AI to renew your language review based on the most recent
              data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={isGeneratingReview}
              onClick={() => generateReview()}
            >
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
