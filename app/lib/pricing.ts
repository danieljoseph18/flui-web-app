export const plans = [
  {
    name: "Monthly",
    price: "29",
    description: "Perfect for casual learners",
    features: [
      "Unlimited conversations",
      "All languages available",
      "Basic progress tracking",
      "Email support",
    ],
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_7sI6s65Ja5bf4O4fYY"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QUrItLl0sXgCLQErzYYSyan"
        : "",
  },
  {
    name: "Quarterly",
    price: "79",
    description: "Best value for committed learners",
    featured: true,
    features: [
      "Everything in Monthly",
      "Advanced progress analytics",
      "Pronunciation feedback",
      "Priority support",
      "Custom learning paths",
    ],
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_7sI6s65Ja5bf4O4fYY"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QUrItLl0sXgCLQErzYYSyan"
        : "",
  },
  {
    name: "Yearly",
    price: "199",
    description: "For serious language enthusiasts",
    features: [
      "Everything in Quarterly",
      "1-on-1 tutor sessions",
      "Offline mode",
      "Custom vocabulary lists",
      "Certificate of completion",
    ],
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_7sI6s65Ja5bf4O4fYY"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QUrItLl0sXgCLQErzYYSyan"
        : "",
  },
];
