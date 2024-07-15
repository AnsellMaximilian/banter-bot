import Personality from "@/components/personalities/Personality";
import { examplePersonalities } from "@/const/examples";
import React from "react";
import { Personality as IPersonality } from "@/type";

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Bot Personalities</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {[...examplePersonalities].map((personality, idx) => {
          return (
            <Personality personality={personality as IPersonality} key={idx} />
          );
        })}
      </div>
    </div>
  );
}
