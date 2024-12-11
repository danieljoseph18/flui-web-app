import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export const ChatInput = () => {
  return (
    <div className="flex items-center gap-2 p-4">
      <Button
        size="icon"
        variant="ghost"
        className="shrink-0 rounded-full bg-gray-five"
      >
        <Mic className="h-5 w-5" />
      </Button>
      <div className="relative flex-1 rounded-2xl bg-dark-gray-three text-gray-three px-4 py-4 text-sm">
        Your words will be detected and fill out here as you speak...
      </div>
    </div>
  );
};
