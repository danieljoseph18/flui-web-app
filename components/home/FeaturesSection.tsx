import { BiSolidConversation } from "react-icons/bi";
import { FaGlobeAmericas, FaHandHoldingHeart } from "react-icons/fa";

const features: {
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Real-time Conversations",
    description:
      "Practice speaking and writing with our AI tutor in real-time, receiving instant feedback.",
    icon: <BiSolidConversation className="text-main-green text-4xl" />,
  },
  {
    title: "Any Language",
    description:
      "Choose from a wide range of languages to learn, with native-level AI conversations.",
    icon: <FaGlobeAmericas className="text-main-green text-4xl" />,
  },
  {
    title: "Personalized Learning",
    description:
      "Adaptive learning paths that adjust to your proficiency level and learning style.",
    icon: <FaHandHoldingHeart className="text-main-green text-4xl" />,
  },
];

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative flex flex-col justify-between rounded-lg p-6">
      <div className="space-y-4">
        <div className="inline-block rounded-lg bg-main-green/10 p-3 ring-2 ring-main-green/20 group-hover:ring-main-green/40 transition-all duration-300">
          {icon}
        </div>
        <h3 className="font-bold text-xl text-white group-hover:text-main-green transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-300/90 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative py-20 px-4 lg:py-32 lg:px-48 bg-gradient-to-b from-dark-green to-[#1a2b29] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-main-green/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-main-green/10 rounded-full blur-3xl" />
      </div>

      {/* Section content */}
      <div className="relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose LingualAI?
          </h2>
          <p className="text-gray-300/90 max-w-2xl mx-auto">
            Experience the future of language learning with our cutting-edge
            features
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: "both",
              }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
