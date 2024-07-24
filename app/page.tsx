import Image from "next/image";
import hero from "@/assets/banter-bot-hero.svg";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen flex-col flex bg-[url('/images/banter-bot-bg.png')] justify-center">
      <main className="container mx-auto p-4 py-8">
        <div className="flex flex-col justify-center items-center gap-8">
          <Image
            src={hero}
            width={350}
            height={350}
            alt="logo"
            className="mx-auto w-44 md:w-72"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
              Master a New Language Through Engaging Conversations!
            </h1>
            <p className="text-xl md:text-2xl text-center">
              Practice with various AI Personalities and Experience Unique,
              Dynamic, and Responsive Interactions.
            </p>
          </div>
          <Link
            href="/app/dashboard"
            className={cn(buttonVariants({}), "text-xl md:text-2xl px-8 py-6")}
          >
            Get Started
          </Link>
        </div>
        {/* <div className="py-32">
          <h2 className="text-3xl font-semibold text-center">
            What is Banter Bot?
          </h2>
        </div> */}
      </main>
    </div>
  );
}
