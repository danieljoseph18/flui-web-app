"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SubscriptionProtectedRouteProps {
  children: React.ReactNode;
}

export default function SubscriptionProtectedRoute({
  children,
}: SubscriptionProtectedRouteProps) {
  const { data: session, status } = useSession();
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkSubscription() {
      if (session?.user?.email) {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("subscription_status")
            .eq("email", session.user.email)
            .single();

          if (error) {
            console.error("Error checking subscription:", error);
            setHasSubscription(false);
            router.push("/plans");
            return;
          }

          // Check if user has an active subscription
          const isSubscribed =
            data?.subscription_status === "active" ||
            data?.subscription_status === "trialing";

          setHasSubscription(isSubscribed);

          // Redirect to plans page if no subscription
          if (!isSubscribed) {
            router.push("/plans");
          }
        } catch (error) {
          console.error("Error in subscription check:", error);
          setHasSubscription(false);
          router.push("/plans");
        }
      }
    }

    if (status === "authenticated") {
      checkSubscription();
    }
  }, [session?.user?.email, status, router]);

  if (status === "loading" || hasSubscription === null) {
    return <div>Loading...</div>;
  }

  return hasSubscription ? children : null;
}
