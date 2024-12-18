import React from "react";
import { BookOpen, Brain, MessageSquare } from "lucide-react";

export const modes: Mode[] = [
  {
    title: "Story Mode",
    description:
      "Practice real-world conversations through interactive storytelling scenarios. Navigate fun, but tricky situations, all while developing your language skills. Each story presents unique challenges to help you master everyday conversations with confidence.",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Playground Mode",
    description:
      "Your personalised language learning sandbox where you set the agenda. Simply tell us what you'd like to focus on. Flui will adapt to your interests and goals, creating natural conversations to help you improve at your own pace.",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: "Challenge Mode",
    description:
      "Put your language skills to the test. Face a variety of challenges including translations, grammar exercises, and conversational responses. Perfect for measuring your progress and reinforcing your learning.",
    icon: <Brain className="w-5 h-5" />,
  },
];
