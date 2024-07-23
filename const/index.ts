import { Language } from "@/type";
import { US, ES, BR, FR, DE, ID } from "country-flag-icons/react/3x2";
import botIcon from "@/assets/icons/bot.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import chatIcon from "@/assets/icons/chat.svg";
import reviewsIcon from "@/assets/icons/review.svg";

export const sidebarItems = [
  { label: "Conversations", href: "/app/dashboard", icon: chatIcon },
  { label: "Personalities", href: "/app/personalities", icon: botIcon },
  { label: "AI Review", href: "/app/profile", icon: reviewsIcon },
  { label: "Profile", href: "/app/profile", icon: settingsIcon },
];

export const languages: Language[] = [
  {
    locale: "en-US",
    readableName: "English (United States)",
    flag: US,
  },
  {
    locale: "es-ES",
    readableName: "Spanish (Spain)",
    flag: ES,
  },
  {
    locale: "id-ID",
    readableName: "Indonesian (Indonesia)",
    flag: ID,
  },
  {
    locale: "fr-FR",
    readableName: "French (France)",
    flag: FR,
  },
  {
    locale: "de-DE",
    readableName: "German (Germany)",
    flag: DE,
  },
];
