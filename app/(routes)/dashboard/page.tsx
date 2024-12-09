"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Conversation from "@/components/Conversation";

const languages = ["French", "Spanish", "German", "Italian", "Chinese"];

export default function Dashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState<
    string | undefined
  >();

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <Select onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedLanguage && <Conversation language={selectedLanguage} />}
    </div>
  );
}
