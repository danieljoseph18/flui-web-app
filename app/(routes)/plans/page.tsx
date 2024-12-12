"use client";

import PricingSection from "@/components/home/PricingSection";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PlansPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function checkSubscription() {
      if (session?.user?.id) {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("subscription_status")
            .eq("id", session.user.id)
            .single();

          if (error) throw error;

          // If user has an active subscription, redirect to dashboard
          if (
            data?.subscription_status === "active" ||
            data?.subscription_status === "trialing"
          ) {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error checking subscription:", error);
        }
      }
    }

    checkSubscription();
  }, [session?.user?.id, router]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upgrade Your Account</h1>
          <p className="text-gray-600 text-lg">
            Choose a plan to get full access to all features and start your
            language learning journey.
          </p>
        </div>
        <PricingSection />
      </div>
    </div>
  );
}
