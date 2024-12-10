import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import PricingSection from "@/components/home/PricingSection";
import FaqSection from "@/components/home/FaqSection";
import DifferencesSection from "@/components/home/DifferencesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DifferencesSection />
      <BenefitsSection />
      <PricingSection />
      <FaqSection />
    </>
  );
}
