import React from "react";
import { Personality as IPersonality } from "@/type";
import Link from "next/link";
import Image from "next/image";

export default function Personality({
  personality,
}: {
  personality: IPersonality;
}) {
  return (
    <Link
      href="/app/conversation"
      className="flex gap-4 border-border border rounded-md p-4 hover:border-primary hover:bg-secondary cursor-pointer"
    >
      <Image
        src={personality.imageUrl}
        width={200}
        height={200}
        alt={`Picture of ${personality.name}`}
        className="rounded-md w-[250px] h-[250px] object-cover"
      />

      <div>
        <h3 className="text-2xl font-semibold">{personality.name}</h3>
        <p className="text-lg">{personality.persona}</p>

        <p className="mt-2 text-sm">{personality.description}</p>
      </div>
    </Link>
  );
}
