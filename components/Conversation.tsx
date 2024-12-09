"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Conversation({ language }: { language: string }) {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // TODO: Implement AI response logic here
    // For now, we'll just echo the user's message
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: `AI response to: ${input}` },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Conversation in {language}</h2>
      <div className="space-y-4 mb-4 h-80 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
            } max-w-[80%]`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
