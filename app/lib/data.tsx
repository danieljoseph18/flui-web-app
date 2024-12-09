export const benefits = [
  {
    title: "24/7 Access",
    description: "Learn anytime, anywhere with our AI tutors",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Native Speech",
    description: "Practice with natural, native-like conversations",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
  {
    title: "Instant Feedback",
    description: "Get real-time corrections and improvements",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement over time",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    title: "Multiple Languages",
    description: "Learn any language you want",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M12 2a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0-4-10 15.3 15.3 0 0 0 4-10z" />
      </svg>
    ),
  },
  {
    title: "Personalized",
    description: "Adaptive learning path for you",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

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
  },
];

export const faqs = [
  {
    question: "How does the AI language tutor work?",
    answer:
      "Our AI tutor uses advanced language models to engage in natural conversations with you in your target language. It adapts to your proficiency level and provides instant feedback on your grammar, pronunciation, and vocabulary.",
  },
  {
    question: "Which languages are available?",
    answer:
      "Out the box, we support all languages. Whether you want to learn French, Spanish, German, Italian, Chinese, Japanese, or any other language, we've got you covered.",
  },
  {
    question: "Can I switch between different languages?",
    answer:
      "Yes! You can learn multiple languages simultaneously and switch between them at any time. Each language's progress is tracked separately.",
  },
  {
    question: "How does the pricing work?",
    answer:
      "We offer three subscription tiers: Monthly, Quarterly, and Yearly. All plans include unlimited conversations with our AI tutor. The higher tiers include additional features like advanced analytics, pronunciation feedback, and custom learning paths.",
  },
];
