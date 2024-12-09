import { Button } from "@/components/ui/button";
import LoginSignupModal from "@/components/auth/LoginSignupModal";
import Link from "next/link";
import Image from "next/image";
import PlayIcon from "@/app/assets/play.svg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="flex flex-col items-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 lg:px-48 bg-light-green"
    >
      <div className=" flex flex-col items-center gap-4 text-center max-w-[60rem]">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Master Any Language with{" "}
          <span className="text-main-green">AI-Powered</span> Conversations
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Experience personalized language tutoring through natural
          conversations with our advanced AI. Learn at your own pace, any time,
          anywhere.
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
