import { useMemo } from "react";
import { TutorInstructionsBuilder } from "@/app/lib/open-api/instructionsBuilder";

export const useTutorInstructions = (config: TutorConfig) => {
  const instructions = useMemo(() => {
    const builder = new TutorInstructionsBuilder(config);
    return builder.build();
  }, [config.targetLanguage, config.skillLevel]);

  return instructions;
};
