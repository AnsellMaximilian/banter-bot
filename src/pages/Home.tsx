import React from "react";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b border-border">
        <nav className="flex justify-between container p-4">
          <div>Banter Bot</div>
          <div>Select Language</div>
        </nav>
      </header>
      <main className="container mx-auto p-4 grow">
        <section className="flex gap-8 items-center">
          <div>Image</div>
          <div>
            <div>
              <h1 className="text-4xl font-bold">Join Banter Bot</h1>
              <p className="text-2xl font-semibold">It will be fun</p>
            </div>
            <div>
              <Button>Get Started</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
