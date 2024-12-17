import { create } from "zustand";

interface ModeState {
  selectedMode: Mode | null;
  setSelectedMode: (mode: Mode | null) => void;
}

export const useMode = create<ModeState>((set) => ({
  selectedMode: null,
  setSelectedMode: (mode) => set({ selectedMode: mode }),
}));
