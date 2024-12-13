import React from "react";
import { ChatInput } from "./ChatInput";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChatMessage } from "./ChatMessage";
import { messages } from "@/app/lib/data";
import VoiceChat from "./VoiceChat";

const ChatInterface = () => {
  return (
    <div className="flex flex-1 flex-col rounded-3xl bg-dark-gray-two">
      <ScrollArea className="flex-1 p-4">
        <VoiceChat />
      </ScrollArea>
    </div>
  );
};

export default ChatInterface;
