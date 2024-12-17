type LanguageLevel = "beginner" | "intermediate" | "advanced";

interface TutorConfig {
  targetLanguage: string;
  nativeLanguage: string;
  skillLevel: LanguageLevel;
  mode: Mode["title"];
}

interface LanguageSpecifics {
  grammarFocus: string[];
  culturalNotes: string[];
  pronunciationTips: string[];
  commonPitfalls: string[];
}
