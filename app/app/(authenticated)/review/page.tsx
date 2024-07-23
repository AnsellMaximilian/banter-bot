"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/const";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Review</h1>
      <p className="text-muted-foreground">
        This is where you&apos;ll be able to see your progress in each language.
        See your current level of understanding and/or how you&apos;ve improved
        since the last review.
      </p>
      <hr className="my-8" />
      <div className="">
        <h2 className="text-xl font-semibold">Generate a Review</h2>
        <div className="mt-4">
          <div className="flex gap-4"></div>
        </div>
      </div>
    </div>
  );
}
