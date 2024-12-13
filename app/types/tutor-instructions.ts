type LanguageLevel = "beginner" | "intermediate" | "advanced";

interface TutorConfig {
  targetLanguage: string;
  nativeLanguage: string;
  skillLevel: LanguageLevel;
  userName?: string;
}

interface LanguageSpecifics {
  grammarFocus: string[];
  culturalNotes: string[];
  pronunciationTips: string[];
  commonPitfalls: string[];
}
