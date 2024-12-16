export const plans = [
  {
    name: "Hobbyist",
    price: "29.99",
    originalPrice: "39.99",
    description: "Perfect for casual learners",
    features: [
      "60 minutes of lessons per month",
      "Additional minutes: $0.50/minute",
      "Basic Email support",
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
    name: "Enthusiast",
    price: "49.99",
    originalPrice: "79.99",
    description: "Best value for committed learners",
    featured: true,
    features: [
      "180 minutes/month",
      "Additional minutes: $0.40/minute",
      "Priority support",
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
    name: "Fluency Fast-track",
    price: "149.99",
    originalPrice: "249.99",
    description: "Best to become fluent ASAP",
    features: [
      "500 minutes/month",
      "Additional minutes: $0.30/minute",
      "Priority support",
      "Custom Feature Requests",
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
