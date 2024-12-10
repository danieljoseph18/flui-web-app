"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const languages = [
  "French",
  "Spanish",
  "German",
  "Italian",
  "Chinese",
  "Japanese",
];

const Dashboard = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const [conversations, setConversations] = useState([
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
  ]);

  const startNewConversation = () => {
    if (selectedLanguage) {
      const newConversation = {
        id: conversations.length + 1,
        title: `New ${selectedLanguage} Conversation`,
        date: new Date().toISOString().split("T")[0],
        language: selectedLanguage,
      };
      setConversations([newConversation, ...conversations]);
      router.push(`/dashboard/conversations/${newConversation.id}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Language Learning Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Start a New Conversation</CardTitle>
            <CardDescription>
              Select a language and begin practicing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter>
            <Button onClick={startNewConversation} disabled={!selectedLanguage}>
              Start Conversation
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>
              Track your language learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Languages Practiced
                </h4>
                <div className="flex space-x-2">
                  {Array.from(
                    new Set(conversations.map((c) => c.language))
                  ).map((lang) => (
                    <span
                      key={lang}
                      className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Total Conversations
                </h4>
                <p className="text-2xl font-bold">{conversations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Conversation History</CardTitle>
          <CardDescription>
            Review and continue your past conversations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex items-center space-x-4 mb-4"
              >
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.language}`}
                  />
                  <AvatarFallback>{conversation.language[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {conversation.title}
                  </p>
                  <p className="text-sm text-gray-one">
                    {conversation.language} • {conversation.date}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/conversations/${conversation.id}`)
                  }
                >
                  Continue
                </Button>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
