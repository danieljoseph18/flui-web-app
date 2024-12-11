import React from "react";
import { ChatInput } from "./ChatInput";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChatMessage } from "./ChatMessage";
import { messages } from "@/app/lib/data";

const ChatInterface = () => {
  return (
    <div className="flex flex-1 flex-col rounded-3xl bg-dark-gray-two">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </div>
      </ScrollArea>
      <ChatInput />
    </div>
  );
};

export default ChatInterface;
