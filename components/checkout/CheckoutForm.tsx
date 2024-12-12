import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements || !clientSecret) {
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message || "Something went wrong");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/success",
      },
    });

    if (error) {
      setErrorMessage(error.message || "Something went wrong");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => setErrorMessage(error.message));
  }, [amount]);

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {clientSecret ? (
        <div className="flex flex-col gap-4">
          <PaymentElement />
          <div className="flex w-full items-center justify-center">
            <Button disabled={loading || !stripe || !elements} id="submit">
              {loading ? "Loading..." : "Pay"}
            </Button>
          </div>
        </div>
      ) : (
        <div>Loading payment form...</div>
      )}

      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
