"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import LoadingScreen from "../common/LoadingScreen";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Separate the form logic into its own component
const ResetPasswordFormContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if we have an access token in the URL hash
    const hash = window.location.hash;
    const email = searchParams.get("email");

    if (hash && email) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        setIsResetMode(true);
        setEmail(email);
        setAccessToken(token);

        // Set the session with the access token
        supabase.auth.setSession({
          access_token: token,
          refresh_token: params.get("refresh_token") || "",
        });
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (isResetMode) {
        if (!accessToken) {
          throw new Error("Invalid reset link");
        }

        // Update the password using Supabase
        const { error } = await supabase.auth.updateUser({
          password: password,
        });

        if (error) {
          throw new Error(error.message);
        }

        setMessage("Password updated successfully!");

        // Sign in with the new credentials
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        // Handle reset password request
        const response = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        setMessage("Check your email for password reset instructions");
        setEmail("");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isResetMode ? "Set New Password" : "Reset Password"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-two"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-three border-2 p-2 shadow-sm focus:outline-none focus:ring-none"
            required
            disabled={isResetMode}
          />
        </div>

        {isResetMode && (
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-two"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-three border-2 p-2 shadow-sm focus:outline-none focus:ring-none"
              required
              minLength={6}
            />
          </div>
        )}

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        {message && (
          <div className="mb-4 text-green-500 text-sm">{message}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-main-green hover:bg-green-hover focus:outline-none disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : isResetMode
            ? "Set New Password"
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

// Create a wrapper component that includes Suspense
const ResetPasswordForm = () => {
  return (
    <Suspense fallback={<LoadingScreen loadingPercentage={100} />}>
      <ResetPasswordFormContent />
    </Suspense>
  );
};

export default ResetPasswordForm;
