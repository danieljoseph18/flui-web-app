"use client";

import React from "react";
import { motion } from "framer-motion";
import "@/app/styles/benefits-styles.css";
import { benefits } from "@/app/lib/content/benefits";

const BenefitsSection = () => {
  return (
    <section className="relative min-h-screen py-16 md:py-24 px-4 xl:px-48 overflow-hidden bg-subtle-gray">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="dots"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 -left-32 w-64 h-64 bg-main-green/20 rounded-full filter blur-3xl animate-float" />
      <div className="absolute bottom-20 -right-32 w-64 h-64 bg-main-green/10 rounded-full filter blur-3xl animate-float-delayed" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex max-w-[58rem] mx-auto flex-col items-center justify-center gap-6 text-center mb-16">
          <div className="inline-block">
            <motion.h2
              className="text-4xl font-bold leading-tight md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Advanced Language Learning Features
            </motion.h2>
          </div>
          <motion.p
            className="leading-relaxed text-gray-one max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Break through the language barrier with unlimited speaking practice.
            Our AI language tutor adapts to your level, helping you achieve true
            fluency in any language - from French and Spanish to Japanese and
            Korean.
          </motion.p>
        </div>

        <div className="grid justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full rounded-2xl bg-white/50 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-green-glow">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex flex-col items-center justify-center text-center gap-6">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 bg-main-green/20 blur-xl rounded-full group-hover:scale-110 transition-transform duration-300" />
                    <div className="relative flex items-center justify-center h-full w-full text-main-green transition-transform duration-300 group-hover:scale-110">
                      <benefit.icon />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {benefit.title}
                  </h3>
                  <p className="text-base text-gray-two">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BenefitsSection;
