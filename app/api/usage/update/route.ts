import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Clean up old entries
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.timestamp < windowStart) {
      rateLimitMap.delete(key);
    }
  }

  const current = rateLimitMap.get(ip);
  if (!current) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (current.timestamp < windowStart) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (current.count >= MAX_REQUESTS) {
    return true;
  }

  current.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    if (isRateLimited(ip)) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }

    // Get the authenticated session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const email = formData.get("email") as string;
    const seconds = parseInt(formData.get("seconds") as string);

    // Verify the email matches the authenticated user
    if (email !== session.user.email) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!email || isNaN(seconds)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    // Get current minutes used
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("seconds_used, subscription_status")
      .eq("email", email)
      .single();

    if (fetchError) {
      console.error("Error fetching user data:", fetchError);
      return new NextResponse("Error fetching user data", { status: 500 });
    }

    // Verify user has an active subscription
    if (userData?.subscription_status !== "active") {
      return new NextResponse("Subscription not active", { status: 403 });
    }

    // Update minutes used
    const { error: updateError } = await supabase
      .from("users")
      .update({
        seconds_used: (userData?.seconds_used || 0) + seconds,
      })
      .eq("email", email);

    if (updateError) {
      console.error("Error updating minutes:", updateError);
      return new NextResponse("Error updating minutes", { status: 500 });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("Error in usage update:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
