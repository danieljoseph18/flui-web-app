"use client";

import { Button } from "@/components/ui/button";
import { Equal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SettingsModal from "./SettingsModal";

interface ProfileCardProps {
  name: string;
  description: string;
  avatar: string;
}

export const ProfileCard = ({ name, description }: ProfileCardProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="relative rounded-3xl bg-pastel-yellow p-6 text-brownish-yellow">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/10"
        onClick={() => setSettingsOpen(true)}
      >
        <Equal className="h-4 w-4" />
      </Button>
      <div className="mb-4 text-sm uppercase">Tutor</div>
      <div className="mb-4 flex justify-center">
        <Image
          src={"/images/common/flui-og-logo.png"}
          alt="Avatar"
          className="w-42"
          width={600}
          height={400}
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
