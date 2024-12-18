import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-gradient-to-b from-light-green to-subtle-gray">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-four">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
            <p className="text-gray-four">
              Permission is granted to temporarily access the materials
              (information or software) on our website for personal,
              non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Account</h2>
            <p className="text-gray-four">
              To access certain features of the website, you may be required to
              create an account. You are responsible for maintaining the
              confidentiality of your account information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. Service Modifications
            </h2>
            <p className="text-gray-four">
              We reserve the right to modify or discontinue, temporarily or
              permanently, the service with or without notice at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Governing Law</h2>
            <p className="text-gray-four">
              These terms and conditions are governed by and construed in
              accordance with the laws of [Your Jurisdiction] and you
              irrevocably submit to the exclusive jurisdiction of the courts in
              that location.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
