import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

interface SettingsState {
  targetLanguage: string;
  nativeLanguage: string;
  skillLevel: SkillLevel;
  setTargetLanguage: (language: string) => void;
  setNativeLanguage: (language: string) => void;
  setSkillLevel: (level: SkillLevel) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      targetLanguage: "english",
      nativeLanguage: "english",
      skillLevel: "beginner",
      setTargetLanguage: (language) => set({ targetLanguage: language }),
      setNativeLanguage: (language) => set({ nativeLanguage: language }),
      setSkillLevel: (level) => set({ skillLevel: level }),
    }),
    {
      name: "settings-storage",
    }
  )
);
