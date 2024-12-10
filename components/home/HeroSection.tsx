import { Button } from "@/components/ui/button";
import LoginSignupModal from "@/components/auth/LoginSignupModal";
import Link from "next/link";
import Image from "next/image";
import PlayIcon from "@/app/assets/play.svg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="flex flex-col items-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 px-4 lg:px-48 bg-light-green"
    >
      <div className=" flex flex-col items-center gap-6 text-center max-w-[60rem]">
        <h1 className="text-3xl font-semibold md:text-5xl lg:text-7xl">
          Master Any Language fluently with{" "}
          <span className="text-main-green">AI-Powered</span> Conversations
        </h1>
        <p className="leading-normal text-gray-one text-sm md:text-lg sm:leading-8">
          Transform your language speaking skills through real-time AI
          conversations. Practice speaking any language 24/7 with your personal
          AI language tutor, to take you from intermediate to fluent, for a
          fraction of the cost.
        </p>
        <div className="flex items-center gap-8">
          <LoginSignupModal>
            <Button className="bg-main-green text-white hover:bg-green-hover rounded-md">
              Try It Free
            </Button>
          </LoginSignupModal>
          <Link
            href="#"
            className="flex items-center gap-2 bg-transparent text-main-green"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full animate-ping bg-main-green/20"></div>
              <div className="absolute -inset-1 rounded-full animate-pulse bg-main-green/40"></div>
              <Image
                src={PlayIcon}
                alt="play"
                width={20}
                height={20}
                className="relative"
              />
            </div>
            <p className="bg-transparent text-main-green underline">
              Watch Demo
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
