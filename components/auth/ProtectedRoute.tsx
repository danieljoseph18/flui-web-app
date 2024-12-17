"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "../common/LoadingScreen";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  // Handle loading percentage animation
  useEffect(() => {
    if (status === "loading") {
      const duration = 3000; // 3 seconds
      const interval = 30; // Update every 30ms for smooth animation
      const steps = duration / interval;
      const incrementPerStep = 100 / steps;
      let currentPercentage = 0;

      const timer = setInterval(() => {
        currentPercentage += incrementPerStep;
        if (currentPercentage >= 100) {
          clearInterval(timer);
          currentPercentage = 100;
        }
        setLoadingPercentage(Math.min(currentPercentage, 100));
      }, interval);

      return () => clearInterval(timer);
    }
  }, [status]);

  // Handle authentication redirect
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-subtle-gray">
        <LoadingScreen loadingPercentage={loadingPercentage} />
      </div>
    );
  }

  return session ? <>{children}</> : null;
};

export default ProtectedRoute;
