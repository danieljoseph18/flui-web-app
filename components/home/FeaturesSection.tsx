import Image from "next/image";
import "@/app/styles/conveyor-belt.css";
import { supportedFlags } from "@/app/lib/supportedFlags";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative py-16 bg-gradient-to-b from-dark-green to-[#1a2b29] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-main-green/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-main-green/10 rounded-full blur-3xl" />
      </div>

      {/* Section content */}
      <div className="relative">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            The Ultimate Solution for Intermediate Language Learners
          </h2>
          <p className="text-gray-300/90 max-w-2xl mx-auto">
            Over 80+ Languages Supported
          </p>
        </div>

        {/* Conveyor belt of flags */}

        <div className="overflow-hidden whitespace-nowrap py-4">
          <div className="flex animate-scroll">
            {/* First set of flags */}
            {supportedFlags.map((flag) => (
              <Image
                src={flag.flag}
                alt={`${flag.name} flag`}
                className="w-16 h-16 mx-8 cursor-pointer flag-spin"
                width={128}
                height={128}
                key={flag.name}
              />
            ))}
            {/* Duplicate set of flags to create seamless loop */}
            {supportedFlags.map((flag) => (
              <Image
                src={flag.flag}
                alt={`${flag.name} flag`}
                className="w-16 h-16 mx-8 cursor-pointer flag-spin"
                width={128}
                height={128}
                key={`${flag.name}-duplicate`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
