import React from "react";
import { Button } from "@/components/ui/button";
import LoginSignupModal from "@/components/auth/LoginSignupModal";
import { FaBoltLightning } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <section className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full opacity-10"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-green/90 to-light-green/70 z-0" />

      {/* Blob Shape */}
      <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-main-green/10 rounded-full filter blur-3xl" />
      <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-main-green/10 rounded-full filter blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 px-4 xl:px-48">
        <div className="flex flex-col items-center gap-6 text-center max-w-[60rem]">
          <h1 className="text-3xl font-semibold md:text-5xl lg:text-7xl">
            Master Any Language fluently with{" "}
            <span className="text-main-green">AI-Powered</span> Conversations
          </h1>
          <p className="leading-normal text-gray-one text-sm md:text-lg sm:leading-8">
            Transform your language speaking skills through real-time AI
            conversations. Practice speaking any language 24/7 with your
            personal AI language tutor, to take you from intermediate to fluent,
            for a fraction of the cost.
          </p>
          <div className="flex items-center gap-8">
            <LoginSignupModal>
              <Button className="bg-main-green text-white hover:bg-green-hover rounded-md">
                <FaBoltLightning size={16} />
                Get Started
              </Button>
            </LoginSignupModal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
