"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginSignupModal from "@/components/auth/LoginSignupModal";
import { useState } from "react";
import { FaBoltLightning } from "react-icons/fa6";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="px-4 z-40 bg-light-green w-full">
      <div className="flex h-20 items-center justify-between py-6 w-full">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={"/images/common/flui-og-logo.png"}
              alt="Flui Logo"
              width={100}
              height={100}
              className="w-7"
            />
            <span className="text-2xl font-bold text-main-green">Flui</span>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-main-green">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <nav
          className={`absolute top-20 left-0 w-full z-50 bg-light-green rounded-b-md md:static md:flex md:space-x-6 md:w-auto ${
            isMenuOpen ? "flex flex-col py-10 px-4" : "hidden"
          }`}
        >
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium hover:text-main-green py-2"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-sm font-medium hover:text-main-green py-2"
          >
            Pricing
          </button>
          <LoginSignupModal>
            <Button className="bg-main-green text-white hover:bg-green-hover py-2 flex items-center gap-2">
              <FaBoltLightning size={16} />
              Get Started
            </Button>
          </LoginSignupModal>
        </nav>
      </div>
    </header>
  );
};

export default Header;
