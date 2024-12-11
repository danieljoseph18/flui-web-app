import { Sidebar } from "@/components/layout/Sidebar";
import ChatInterface from "@/components/dashboard/ChatInterface";

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-black py-3">
      <div className="w-[35%] max-w-md">
        <Sidebar />
      </div>
      <ChatInterface />
    </div>
  );
}
