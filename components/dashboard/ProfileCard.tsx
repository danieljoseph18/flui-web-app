"use client";

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import "@/app/styles/profile-styles.css";
import { useSettings } from "@/store/useSettings";
import { getFlagForLanguage } from "@/app/lib/supportedFlags";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";

interface ProfileCardProps {
  name: string;
  description: string;
}

const ProfileCard = ({ name, description }: ProfileCardProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { targetLanguage } = useSettings();

  const currentLanguage = SUPPORTED_LANGUAGES.find(
    (lang) => lang.code === targetLanguage
  )?.name;

  return (
    <div className="relative rounded-3xl bg-pastel-yellow p-6 text-brownish-yellow">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/10 transition-transform hover:scale-110 p-1"
        onClick={() => setSettingsOpen(true)}
      >
        <Image
          src={
            getFlagForLanguage(currentLanguage || "") ||
            "/images/flags/british-flag.png"
          }
          alt="Language flag"
          width={24}
          height={24}
          className="rounded-sm object-cover"
        />
      </Button>
      <div className="mb-4 text-sm uppercase">Tutor</div>
      <div className="mb-4 flex justify-center">
        <Image
          src={"/images/common/flui-frog.png"}
          alt="Avatar"
          className="w-32"
          width={600}
          height={600}
        />
      </div>
      <div className="space-y-1">
        <div className="text-lg font-light">Hey! My name is</div>
        <div className="text-5xl font-semibold">{name}</div>
        <div className="text-sm">{description}</div>
      </div>
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default ProfileCard;
