import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-light-green to-subtle-gray">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-four">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-four">
              <li>Name and email address when you create an account</li>
              <li>Payment information when you subscribe to our services</li>
              <li>Usage data and interaction with our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-four">
              We use the information we collect to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-four">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
            <p className="text-gray-four">
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Contact Us</h2>
            <p className="text-gray-four">
              If you have any questions about this Privacy Policy, please
              contact us at: [Your Contact Email]
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
