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
import { useEffect, useState } from "react";
import {
  Conversation as IConversation,
  Personality as IPersonality,
  UserConversation,
  UserProfile,
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
import { useUser } from "@/contexts/user/UserContext";
import { generateUserConversationPrompt } from "@/utils/common";
import { config, databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";

export default function AppPage() {
  const { settings, setSettings } = useSettings();
  const { conversations, personalities } = useData();
  const { currentUser, setCurrentUser } = useUser();

  const router = useRouter();

  const [selectedConversation, setSelectedConversation] =
    useState<IConversation | null>(null);

  const [selectedPersonality, setSelectedPersonality] =
    useState<IPersonality | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const createUserConversation = async () => {
    if (currentUser && selectedConversation && selectedPersonality) {
      try {
        setIsLoading(true);
        const body = {
          userId: currentUser.$id,
          personalityId: selectedPersonality.$id,
          language: settings.language.locale,
          isComplete: false,
          conversationId: selectedConversation.$id,
          prompt: generateUserConversationPrompt(
            selectedConversation,
            selectedPersonality,
            currentUser.profile.username,
            settings.language.locale
          ),
          personalityImage: selectedPersonality.imageUrl,
        };

        const createdUserConversation: UserConversation =
          await databases.createDocument(
            config.dbId,
            config.userConversationCollectionId,
            ID.unique(),
            body
          );

        conversations.setData((prev) => ({
          ...prev,
          data: prev.data.map((c) =>
            c.$id === createdUserConversation.conversationId
              ? { ...c, userConversation: createdUserConversation }
              : c
          ),
        }));

        router.push(`/app/conversation/${createdUserConversation.$id}`);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (currentUser?.profile) {
      setSettings((prev) => ({
        ...prev,
        language:
          languages.find(
            (l) => l.locale === currentUser.profile.currentLanguage
          ) || languages[0],
      }));
    }
  }, [currentUser?.profile, setSettings]);

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
                onClick={async () => {
                  setSettings((prev) => ({ ...prev, language: lang }));
                  if (currentUser) {
                    const updatedProfile = (await databases.updateDocument(
                      config.dbId,
                      config.userProfileCollectionId,
                      currentUser.$id,
                      {
                        currentLanguage: lang.locale,
                      }
                    )) as UserProfile;
                    setCurrentUser((prev) =>
                      prev ? { ...prev, profile: updatedProfile } : null
                    );
                  }
                }}
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
            <Button
              disabled={isLoading}
              onClick={() => {
                createUserConversation();
              }}
            >
              Start Conversation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
