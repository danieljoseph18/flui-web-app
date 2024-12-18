"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/app/lib/utils";
import { plans } from "@/app/lib/pricing";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PricingSectionProps {
  isModal?: boolean;
}

const PricingSection = ({ isModal = false }: PricingSectionProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = (link: string) => {
    if (!session) {
      router.push("/login");
      return;
    }

    // Check if link is valid before redirecting
    if (!link) {
      console.error("No valid payment link found");
      return;
    }

    // Add email to Stripe checkout URL if available
    const checkoutUrl = session.user?.email
      ? `${link}?prefilled_email=${encodeURIComponent(session.user.email)}`
      : link;

    console.log("Checkout URL: ", checkoutUrl);

    window.location.href = checkoutUrl;
  };

  return (
    <section
      id="pricing"
      className={cn(
        "py-8 md:py-12 lg:py-24",
        isModal ? "px-0 bg-transparent" : "px-4 xl:px-48 bg-subtle-gray"
      )}
    >
      {!isModal && (
        <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Membership Levels
          </h2>
          <p className="max-w-[85%] leading-normal text-gray-one sm:leading-7">
            Choose the perfect plan for your language learning journey
          </p>
        </div>
      )}
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative overflow-hidden rounded-lg border bg-background p-8 shadow-green-glow",
              plan.featured && "border-main-green border-2"
            )}
          >
            {plan.featured && (
              <div className="absolute -right-[40px] top-[32px] rotate-45 bg-main-green px-10 min-w-[200px] text-center py-1 text-sm font-semibold text-white">
                Best Value
              </div>
            )}
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">£{plan.price}</span>
                <span className="text-gray-one line-through text-lg ml-2">
                  £{plan.originalPrice}
                </span>
                <span className="text-gray-one">/month</span>
              </div>
              <p className="text-gray-one">{plan.description}</p>
              <Button
                onClick={() => handleSubscribe(plan.link)}
                className={cn(
                  "mt-4",
                  plan.featured
                    ? "bg-main-green text-white hover:bg-green-hover"
                    : ""
                )}
              >
                Get Started
              </Button>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-main-green"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-one">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
