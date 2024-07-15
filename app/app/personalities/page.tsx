"use client";

import Personality from "@/components/personalities/Personality";
import { examplePersonalities } from "@/const/examples";
import React, { useEffect, useState } from "react";
import { Personality as IPersonality } from "@/type";
import { config, databases } from "@/lib/appwrite";

export default function Page() {
  const [personalities, setPersonalities] = useState<IPersonality[]>([]);

  useEffect(() => {
    (async () => {
      const res = await databases.listDocuments(
        config.dbId,
        config.personalityCollectionId
      );
      const personalities = res.documents as IPersonality[];
      setPersonalities(personalities);
    })();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Bot Personalities</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {personalities.map((personality, idx) => {
          return (
            <Personality personality={personality as IPersonality} key={idx} />
          );
        })}
      </div>
    </div>
  );
}
