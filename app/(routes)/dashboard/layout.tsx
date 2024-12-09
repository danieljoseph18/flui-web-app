import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden w-64 overflow-y-auto border-r bg-gray-100/40 md:block">
        <ScrollArea className="h-full py-6">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <div className="space-y-1">
              <Button
                variant="secondary"
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard">Overview</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/conversations">Conversations</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/progress">Progress</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
