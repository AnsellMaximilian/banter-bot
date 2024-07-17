"use client";

import Conversation from "@/components/learning-track/Conversation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/settings/SettingsContext";
import { languages } from "@/const";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useData } from "@/contexts/data/DataContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  Conversation as IConversation,
  Personality as IPersonality,
} from "@/type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Personality from "@/components/personalities/Personality";

export default function AppPage() {
  const { settings, setSettings } = useSettings();
  const { conversations, personalities } = useData();

  const [selectedConversation, setSelectedConversation] =
    useState<IConversation | null>(null);

  const [selectedPersonality, setSelectedPersonality] =
    useState<IPersonality | null>(null);

  const createUserConversation = () => {};

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Learning Track</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <settings.language.flag className="w-10" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.locale}
                className={cn(
                  "flex gap-4 cursor-pointer",
                  lang.locale === settings.language.locale ? "bg-secondary" : ""
                )}
                onClick={() =>
                  setSettings((prev) => ({ ...prev, language: lang }))
                }
              >
                <lang.flag className={cn("w-10")} />{" "}
                <span>{lang.readableName}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        {conversations.isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <Skeleton className="h-64 rounded-md" key={i} />
            ))
          : conversations.data.map((conversation) => {
              return (
                <Conversation
                  conversation={conversation}
                  key={conversation.$id}
                  setSelectedConversation={setSelectedConversation}
                />
              );
            })}
      </div>
      <Dialog
        open={!!selectedConversation}
        onOpenChange={(open) => {
          if (!open) setSelectedConversation(null);
        }}
      >
        <DialogContent className="w-[600px] md:w-[1024px] max-w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedConversation
                ? selectedConversation.title
                : "Loading conversation..."}
            </DialogTitle>
            <DialogDescription className="text-xl">
              {selectedConversation
                ? `${selectedConversation.description}`
                : "Loading conversation..."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-8 py-4">
            <div className="">
              <Label htmlFor="personality" className="block mb-2">
                Select a Personality
              </Label>
              <Select
                onValueChange={(id) =>
                  setSelectedPersonality(
                    personalities.data.find((p) => p.$id === id) || null
                  )
                }
              >
                <SelectTrigger className="w-[250px]" id="personality">
                  <SelectValue placeholder="Select a personality" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectGroup>
                    {personalities.data.map((p) => (
                      <SelectItem key={p.$id} value={p.$id}>
                        {p.name} - {p.persona}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              {selectedPersonality && (
                <Personality personality={selectedPersonality} />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => {}}>Start Conversation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
