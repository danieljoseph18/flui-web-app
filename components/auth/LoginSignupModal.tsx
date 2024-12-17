"use client";

import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

interface ApiError {
  error?: string;
  status?: string;
  message: string;
  details?: string;
}

const LoginSignupModal = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setError(null);
    setSuccess(null);
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      await signIn(provider, {
        callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        redirect: true,
      });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          if (result.error.includes("email_not_confirmed")) {
            setError({
              status: "confirmation_required",
              message:
                "Please check your email to confirm your account before signing in.",
            });
          } else {
            setError({
              error: "auth_error",
              message: "Invalid email or password",
            });
          }
          return;
        }

        router.replace("/dashboard");
      } else {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.status === "confirmation_required") {
          setSuccess(data.message);
          setEmail("");
          setPassword("");
          return;
        }

        if (!response.ok) {
          setError(data);
          return;
        }

        // Only attempt to sign in if no confirmation is required
        if (!data.status) {
          const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (result?.error) {
            setError({
              error: "auth_error",
              message: "Error signing in after registration",
            });
            return;
          }

          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      console.error("Error signing in or up:", error);
      setError({
        error: "unknown_error",
        message: "An unexpected error occurred",
        details: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error: ApiError) => {
    const errorMessages: { [key: string]: string } = {
      weak_password:
        "Password is too weak. It must be at least 6 characters long and contain a mix of characters.",
      email_taken: "This email is already registered.",
      auth_error: "Invalid email or password.",
      signup_failed: "Failed to create account. Please try again.",
      server_error: "Server error. Please try again later.",
    };

    return (
      error.message ||
      errorMessages[error.error || ""] ||
      "An error occurred. Please try again."
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild ref={ref}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isLogin ? "Welcome back" : "Create an account"}
          </DialogTitle>
          <DialogDescription>
            {isLogin
              ? "Enter your email to sign in to your account"
              : "Enter your email to create your account"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => handleSocialLogin("google")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => handleSocialLogin("github")}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm">
                {getErrorMessage(error)}
              </div>
            )}
            {success && <div className="text-green-500 text-sm">{success}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-main-green text-white hover:bg-green-hover"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </div>

        <Button
          variant="link"
          className="w-full"
          onClick={() => {
            setIsLogin(!isLogin);
            clearInputs();
          }}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>

        {isLogin && (
          <Link
            href="/reset-password"
            className="text-sm text-center w-full text-gray-one hover:underline"
          >
            Forgot your password?
          </Link>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginSignupModal;
