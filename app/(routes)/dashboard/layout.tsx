"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SubscriptionProtectedRoute from "@/components/auth/SubscriptionProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SubscriptionProtectedRoute>
        <main className="min-h-screen bg-background">{children}</main>
      </SubscriptionProtectedRoute>
    </ProtectedRoute>
  );
}
