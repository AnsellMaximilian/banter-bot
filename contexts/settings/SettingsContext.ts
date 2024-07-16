import { languages } from "@/const";
import { Settings, User } from "@/type";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
export interface SettingsContextData {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
  isLoading: boolean;
}

export const SettingsContext = createContext<SettingsContextData>({
  settings: {
    language: languages[0],
  },
  setSettings: () => {},
  isLoading: true,
});

export const useSettings = (): SettingsContextData => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettings must be used within a corresponding ContextProvider"
    );
  }
  return context;
};
