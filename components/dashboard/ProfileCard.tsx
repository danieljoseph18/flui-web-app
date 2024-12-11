import { Button } from "@/components/ui/button";
import { Equal } from "lucide-react";
import FluiFrog from "@/app/assets/images/flui-frog.png";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  description: string;
  avatar: string;
}

export const ProfileCard = ({
  name,
  description,
}: // avatar,
ProfileCardProps) => {
  return (
    <div className="relative rounded-3xl bg-pastel-yellow p-6 text-brownish-yellow">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/10"
      >
        <Equal className="h-4 w-4" />
      </Button>
      <div className="mb-4 text-sm uppercase">Tutor</div>
      <div className="mb-4 flex justify-center">
        <Image
          src={FluiFrog}
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
    </div>
  );
};