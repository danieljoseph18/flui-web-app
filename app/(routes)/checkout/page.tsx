"use client";

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/checkout/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const convertToCents = (amount: number) => {
  return Math.floor(amount * 100);
};

const CheckoutPage = () => {
  // Payment plan
  const [amount] = useState(29.99);

  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "subscription",
          amount: convertToCents(amount), // Convert to cents
          currency: "usd",
          setup_future_usage: "off_session",
        }}
      >
        <CheckoutForm amount={convertToCents(amount)} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
