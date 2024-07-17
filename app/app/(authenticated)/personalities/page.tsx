"use client";

import Personality from "@/components/personalities/Personality";
import { examplePersonalities } from "@/const/examples";
import React, { useEffect, useState } from "react";
import { Personality as IPersonality } from "@/type";
import { config, databases } from "@/lib/appwrite";
import { useData } from "@/contexts/data/DataContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { personalities } = useData();
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Bot Personalities</h1>
      <div className="grid xl:grid-cols-2 gap-4 mt-4">
        {personalities.isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-md" />
            ))
          : personalities.data.map((personality, idx) => {
              return (
                <Personality
                  personality={personality as IPersonality}
                  key={idx}
                />
              );
            })}
      </div>
    </div>
  );
}
