import { Button } from "@/components/ui/button";
import { cn } from "@/app/lib/utils";
import { plans } from "@/app/lib/data";

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="py-8 md:py-12 px-4 lg:py-24 lg:px-48 bg-subtle-gray"
    >
      <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Membership Levels
        </h2>
        <p className="max-w-[85%] leading-normal text-gray-one sm:leading-7">
          Choose the perfect plan for your language learning journey
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative overflow-hidden rounded-lg border bg-background p-8",
              plan.featured && "border-main-green border-2"
            )}
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">{plan.description}</p>
              <Button
                className={cn(
                  "mt-4",
                  plan.featured
                    ? "bg-main-green text-white hover:bg-green-hover"
                    : ""
                )}
              >
                Get Started
              </Button>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg
                      className={cn(
                        "h-4 w-4",
                        plan.featured
                          ? "text-main-green"
                          : "text-muted-foreground"
                      )}
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
                    {feature}
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
