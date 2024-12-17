"use client";

import { useRef, useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
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
import { useAuth } from "@/app/hooks/useAuth";

interface LoginSignupModalProps {
  children: React.ReactNode;
  callbackUrl?: string;
}

const LoginSignupModal = ({ children, callbackUrl }: LoginSignupModalProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);

  const {
    isLogin,
    setIsLogin,
    email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    isLoading,
    clearInputs,
    handleSocialLogin,
    handleSubmit,
    getErrorMessage,
  } = useAuth(callbackUrl);

  useEffect(() => {
    if (session) {
      router.replace(callbackUrl || "/dashboard");
    }
  }, [session, router, callbackUrl]);

  if (session) {
    return null;
  }

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
