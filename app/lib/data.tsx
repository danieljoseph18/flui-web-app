import {
  Clock,
  Mic,
  Settings,
  BarChart3,
  Globe,
  MessageSquare,
  PiggyBank,
  Globe2,
  BookOpen,
} from "lucide-react";

export const messages = [
  {
    content:
      "Hey! I'm Flui. I'm a Frog AI tutor. I'm here to help you learn any language of your choosing.\nHow are you doing?",
    isUser: false,
  },
  {
    content:
      "Hey Flui, nice to meet you too\nThank you, I'm doing well.\nI'm really excited to start learning French.",
    isUser: true,
  },
  {
    content:
      "Great to hear! Let's start with the basics.\nCould you tell us a bit about yourself?\nYour current level of French, and what level you'd like to achieve?",
    isUser: false,
  },
];

export const scenarios: { title: string; description: string }[] = [
  {
    title: "Restaurant",
    description: "Let's order food together.",
  },
  {
    title: "First date",
    description: "We just met each other — let's get some coffee together!",
  },
  {
    title: "Movie night discussion",
    description: "Let's chat about your favourite films.",
  },
  {
    title: "Holiday",
    description: "Let's plan a holiday together.",
  },
  {
    title: "Business Meeting",
    description: "Let's discuss business together.",
  },
  {
    title: "Travel",
    description: "Let's plan a trip together.",
  },
  {
    title: "Family",
    description: "Let's chat about your family.",
  },
  {
    title: "Work",
    description: "Let's discuss work together.",
  },
];

export const features = [
  {
    icon: Globe2,
    title: "Real-Time Language Conversation Practice",
    description:
      "Master any language through natural, flowing conversations with our advanced AI tutor. Practice speaking French, Japanese, Spanish, or any other language without scheduling hassles - just open the app and start talking.",
  },
  {
    icon: BookOpen,
    title: "Personalized Language Learning Journey",
    description:
      "Our AI language tutor automatically adjusts to your proficiency level, creating custom speaking exercises that take you from intermediate to fluent. Perfect for learners who want to improve their speaking skills beyond basic language apps.",
  },
  {
    icon: PiggyBank,
    title: "Affordable Language Tutoring Alternative",
    description:
      "Get unlimited language practice for a fraction of traditional tutoring costs. Practice speaking any language whenever you want, without expensive hourly rates.",
  },
];

export const benefits = [
  {
    title: "Flexible Language Practice Schedule",
    description:
      "Practice speaking your target language 24/7 – ideal for busy professionals and students who can't commit to fixed class schedules.",
    icon: Clock,
  },
  {
    title: "Confidence-Building Environment",
    description:
      "Develop natural speaking skills in a supportive space where you can practice without judgment. Perfect for overcoming language speaking anxiety.",
    icon: Mic,
  },
  {
    title: "Intelligent Conversation Pacing",
    description:
      "Whether you need slow, clear pronunciation guidance or want to practice rapid native-speed conversations, our AI adapts to help you improve your speaking skills.",
    icon: Settings,
  },
  {
    title: "Structured Language Learning",
    description:
      "No preparation needed – our AI creates engaging speaking practice sessions tailored to your language goals and current level.",
    icon: BarChart3,
  },
  {
    title: "Real-World Conversation Scenarios",
    description:
      "Practice speaking in authentic situations like business meetings, travel conversations, or casual chats. Our AI simulates real-world interactions to prepare you for actual language use.",
    icon: Globe,
  },
  {
    title: "Instant Pronunciation Feedback",
    description:
      "Receive immediate, detailed feedback on your pronunciation and intonation. Our AI helps you perfect your accent with targeted exercises and real-time corrections.",
    icon: MessageSquare,
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
    question: "How is this different from other language learning apps?",
    answer:
      "Our AI tutor uses advanced language models to engage in natural conversations with you in your target language. It adapts to your proficiency level and provides instant feedback on your grammar, pronunciation, and vocabulary.While most apps focus on basic vocabulary and grammar, we specialize in helping intermediate learners achieve fluency through real-time speaking practice. Our AI provides unlimited conversation practice that adapts to your level – something traditional language apps can't offer.",
  },
  {
    question: "How does the AI language tutor adapt to my speaking level?",
    answer:
      "Our advanced AI assesses your speaking ability in real-time and adjusts its language complexity, speaking speed, and teaching approach accordingly. As your speaking skills improve, it gradually increases the challenge to ensure continuous progress.",
  },
  {
    question: "Can AI really help me improve my speaking skills?",
    answer:
      "Yes! Our AI tutor offers unique advantages over traditional methods: 24/7 availability for language practice, consistent patience with pronunciation, zero judgment when making mistakes, and unlimited speaking practice at a fraction of traditional tutoring costs. Many users report faster progress due to more frequent speaking practice opportunities.",
  },
  {
    question: "Which languages can I practice speaking?",
    answer:
      "Practice speaking any major language including French, Spanish, Japanese, Korean, and many others. Our AI maintains consistent quality across all languages, ensuring effective speaking practice regardless of your chosen language.",
  },
  {
    question: "How much can I save compared to traditional language tutors?",
    answer:
      "Traditional language tutors typically charge $30-50 per hour, costing $600-1000 monthly for regular speaking practice. Our unlimited language practice service starts at just $29/month – saving you up to 97% while providing unlimited conversation practice time.",
  },
];
