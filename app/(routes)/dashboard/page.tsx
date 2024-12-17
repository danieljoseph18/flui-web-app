import Sidebar from "@/components/layout/Sidebar";
import ChatInterface from "@/components/dashboard/ChatInterface";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-6 md:flex-row md:h-screen bg-black py-3">
        <div className="w-full md:w-[35%]">
          <Sidebar />
        </div>
        <ChatInterface />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
