import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

interface SettingsState {
  targetLanguage: string;
  skillLevel: SkillLevel;
  setTargetLanguage: (language: string) => void;
  setSkillLevel: (level: SkillLevel) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      targetLanguage: "english",
      skillLevel: "beginner",
      setTargetLanguage: (language) => set({ targetLanguage: language }),
      setSkillLevel: (level) => set({ skillLevel: level }),
    }),
    {
      name: "settings-storage",
    }
  )
);
