export const plans = [
  {
    name: "Hobbyist",
    price: "29.99",
    originalPrice: "39.99",
    description: "Perfect for casual learners",
    features: [
      "60 minutes of lessons per month",
      "Additional minutes: £0.50/minute",
      "Basic Email support",
    ],
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_7sI6s65Ja5bf4O4fYY"
        : "https://buy.stripe.com/6oE14G5hAdMc1Ik3cc",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QUrItLl0sXgCLQErzYYSyan"
        : "price_1QXH1cLl0sXgCLQEY0qpU6jM",
  },
  {
    name: "Enthusiast",
    price: "49.99",
    originalPrice: "79.99",
    description: "Best value for committed learners",
    featured: true,
    features: [
      "180 minutes/month",
      "Additional minutes: £0.40/minute",
      "Priority support",
    ],
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_eVa17M6Ne8nrbcs3cd"
        : "https://buy.stripe.com/4gwaFgbFY6jK9aMbIJ",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QXGmLLl0sXgCLQEfixrkeQ3"
        : "price_1QXH1eLl0sXgCLQETcdojBCr",
  },
  {
    name: "Flui Fast-track",
    price: "99.99",
    originalPrice: "199.99",
    description: "Best to become fluent ASAP",
    features: [
      "500 minutes/month",
      "Additional minutes: £0.30/minute",
      "Priority support",
      "Custom Feature Requests",
    ],
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_bIYcQugnOgTXgwMfZ0"
        : "https://buy.stripe.com/14k5kW39sgYo0Eg8wy",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QXGrXLl0sXgCLQEuqzu0JUM"
        : "price_1QXH1gLl0sXgCLQEBDe94FBS",
  },
];

export function getSecondsLimit(priceId: string | null): number {
  const plan = plans.find((p) => p.priceId === priceId);
  if (!plan) return 0;

  // Extract minutes from the features array
  const minutesFeature = plan.features.find((f) => f.includes("minutes"));
  if (!minutesFeature) return 0;

  // Parse the number from strings like "60 minutes/month" or "180 minutes/month"
  const minutes = parseInt(minutesFeature.match(/\d+/)?.[0] || "0");
  return minutes * 60;
}
