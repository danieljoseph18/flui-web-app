"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const languages = [
  "All",
  "French",
  "Spanish",
  "German",
  "Italian",
  "Chinese",
  "Japanese",
];

const ConversationsPage = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const conversations = [
    {
      id: 1,
      title: "Greetings and Introductions",
      date: "2023-05-15",
      language: "French",
    },
    {
      id: 2,
      title: "Ordering at a Restaurant",
      date: "2023-05-18",
      language: "Spanish",
    },
    {
      id: 3,
      title: "Asking for Directions",
      date: "2023-05-20",
      language: "German",
    },
    {
      id: 4,
      title: "Discussing Hobbies",
      date: "2023-05-22",
      language: "Italian",
    },
    {
      id: 5,
      title: "Weather and Seasons",
      date: "2023-05-25",
      language: "Chinese",
    },
  ];

  const filteredConversations = conversations.filter(
    (conv) =>
      (filter === "All" || conv.language === filter) &&
      conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startNewConversation = () => {
    // In a real app, this would create a new conversation and redirect to it
    router.push("/dashboard/conversations/new");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Conversations</h1>
        <Button onClick={startNewConversation}>Start New Conversation</Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Conversations</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredConversations.map((conversation) => (
          <Card
            key={conversation.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() =>
              router.push(`/dashboard/conversations/${conversation.id}`)
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.language}`}
                  />
                  <AvatarFallback>{conversation.language[0]}</AvatarFallback>
                </Avatar>
                <span>{conversation.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-one">
                {conversation.language} • {conversation.date}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConversationsPage;
