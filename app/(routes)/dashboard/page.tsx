"use client";

import { useRef, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import ChatInterface from "@/components/dashboard/ChatInterface";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useMode } from "@/store/useMode";

const DashboardPage = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const { selectedMode } = useMode();

  useEffect(() => {
    if (selectedMode && window.innerWidth < 768) {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedMode]);

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-6 md:flex-row md:h-screen bg-black py-3">
        <div className="w-full md:w-[35%]">
          <Sidebar />
        </div>
        <ChatInterface ref={chatRef} />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
