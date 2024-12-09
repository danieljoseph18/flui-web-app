"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
};

const ConversationPage = () => {
  const params = useParams();
  const conversationId = params.id;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // In a real app, you would fetch the conversation history from an API
    setMessages([
      {
        id: 1,
        content: "Bonjour! Comment allez-vous?",
        sender: "ai",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        content: "Bonjour! Je vais bien, merci. Et vous?",
        sender: "user",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, [conversationId]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        content: input,
        sender: "user",
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setInput("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          content: "Je comprends. Pouvez-vous m'en dire plus?",
          sender: "ai",
          timestamp: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>French Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`flex ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  } items-start`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        message.sender === "ai"
                          ? "/ai-avatar.png"
                          : "/user-avatar.png"
                      }
                    />
                    <AvatarFallback>
                      {message.sender === "ai" ? "AI" : "You"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`mx-2 p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationPage;
