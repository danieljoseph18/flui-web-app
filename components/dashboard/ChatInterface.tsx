import React, { forwardRef } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import VoiceChat from "./VoiceChat";

const ChatInterface = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-1 flex-col rounded-3xl bg-dark-gray-two"
    >
      <ScrollArea className="flex-1 p-4">
        <VoiceChat />
      </ScrollArea>
    </div>
  );
});

ChatInterface.displayName = "ChatInterface";

export default ChatInterface;
