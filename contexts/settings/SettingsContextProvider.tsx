import { account, config, databases } from "@/lib/appwrite";
import { ReactNode, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Settings, User, UserProfile } from "@/type";
import { languages } from "@/const";
import { SettingsContext } from "./SettingsContext";

export const SettingsContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>({
    language: languages[0],
  });
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        isLoading,
        setSettings,
        settings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
