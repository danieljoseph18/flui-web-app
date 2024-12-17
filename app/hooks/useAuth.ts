import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ApiError {
  error?: string;
  status?: string;
  message: string;
  details?: string;
}

export const useAuth = (callbackUrl?: string) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        callbackUrl:
          callbackUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
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

        router.replace(callbackUrl || "/dashboard");
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

  return {
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
  };
};
