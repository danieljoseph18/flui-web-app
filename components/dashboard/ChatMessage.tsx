import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import FluiFrog from "@/app/assets/images/flui-frog.png";

interface ChatMessageProps {
  content: string;
  isUser?: boolean;
  avatar?: string;
}

export const ChatMessage = ({
  content,
  isUser = false,
}: // avatar,
ChatMessageProps) => {
  return (
    <div className={`group relative flex gap-3 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <div className="flex flex-col !min-h-full justify-end">
          <Avatar className="h-8 w-8 bg-gray-four">
            <AvatarImage src={FluiFrog.src} />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div
        className={`relative max-w-[85%] px-3 py-2 text-sm ${
          isUser
            ? "bg-pastel-blue rounded-xl rounded-br-md"
            : "bg-gray-four text-gray-three rounded-xl rounded-bl-md"
        }`}
      >
        {content}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-10 top-0 hidden h-8 w-8 group-hover:flex"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  );
};
