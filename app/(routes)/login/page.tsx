"use client";

import LoginSignupModal from "@/components/auth/LoginSignupModal";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

// Create a separate component for the modal content
const LoginContent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/#pricing";

  useEffect(() => {
    // Wait 3 seconds and open the modal once the page is loaded
    setTimeout(() => {
      buttonRef.current?.click();
    }, 3_000);

    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main-green" />
      ) : (
        <LoginSignupModal callbackUrl={callbackUrl}>
          <button ref={buttonRef} className="hidden">
            Open Modal
          </button>
        </LoginSignupModal>
      )}
    </>
  );
};

// Main page component with Suspense boundary
const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense
        fallback={
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main-green" />
        }
      >
        <LoginContent />
      </Suspense>
    </div>
  );
};

export default LoginPage;
