"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { features } from "@/app/lib/content/features";
import { FaBoltLightning } from "react-icons/fa6";
import { MdSwipeRight } from "react-icons/md";
import "@/app/styles/swipe-animation.css";
import LoginSignupModal from "../auth/LoginSignupModal";

const DifferenceCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <Card className="relative h-full bg-white shadow-green-glow hover:border hover:border-main-green transition-all duration-300">
    <CardContent className="pt-6 px-6">
      <div
        className="mb-4 size-12 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: title.includes("Real-Time")
            ? "#f3f0ff"
            : title.includes("Personalized")
            ? "#e7f6e7"
            : "#ffefeb",
        }}
      >
        <Icon
          className="size-6"
          style={{
            color: title.includes("Real-Time")
              ? "#7c3aed"
              : title.includes("Personalized")
              ? "#16a34a"
              : "#f97316",
          }}
        />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
    <CardFooter className="pb-6 px-6"></CardFooter>
  </Card>
);

const DifferencesSection = () => {
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setShowSwipeIndicator(true);
      // Hide the indicator after animation
      const timer = setTimeout(() => {
        setShowSwipeIndicator(false);
      }, 3000); // 3 seconds total (1s delay + 2s animation)
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section className="py-16 px-4 xl:px-48 bg-subtle-gray">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Why Choose Flui?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Break through the language barrier with unlimited speaking practice.
          Our AI language tutor adapts to your level, helping you achieve true
          fluency in any language - from French and Spanish to Japanese and
          Korean.
        </p>
      </div>

      {/* Desktop view - Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <DifferenceCard key={index} {...feature} />
        ))}
      </div>

      {/* Mobile view - Carousel */}
      <div className="md:hidden relative" ref={ref}>
        <Carousel className="w-full max-w-sm mx-auto">
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <DifferenceCard {...feature} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {showSwipeIndicator && (
          <div className="swipe-indicator">
            <MdSwipeRight className="text-black w-20 h-20" />
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <LoginSignupModal>
          <Button className="bg-main-green text-white hover:bg-green-hover rounded-md">
            <FaBoltLightning size={16} />
            Get Started
          </Button>
        </LoginSignupModal>
      </div>
    </section>
  );
};

export default DifferencesSection;
