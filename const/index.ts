import { Language } from "@/type";
import { US, ES, BR, FR, DE, ID } from "country-flag-icons/react/3x2";

export const sidebarItems = [
  { label: "Conversations", href: "/app/dashboard" },
  { label: "Personalities", href: "/app/personalities" },
  { label: "Profile", href: "/app/settings" },
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
