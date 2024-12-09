"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginSignupModal } from "@/components/auth/LoginSignupModal";

export function Header() {
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="lg:px-48 z-40 bg-light-green">
      <div className="flex h-20 items-center justify-between py-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-main-green">
              LingualAI
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium hover:text-main-green"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-sm font-medium hover:text-main-green"
          >
            Pricing
          </button>
          <LoginSignupModal>
            <Button className="bg-main-green text-white hover:bg-green-hover">
              Sign In
            </Button>
          </LoginSignupModal>
        </nav>
      </div>
    </header>
  );
}
