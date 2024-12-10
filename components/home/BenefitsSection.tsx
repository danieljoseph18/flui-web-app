"use client";
import { benefits } from "@/app/lib/data";
import { motion } from "framer-motion";

const BenefitsSection = () => {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-subtle-gray py-16 md:py-24 px-4 lg:px-48"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex max-w-[58rem] mx-auto flex-col items-center justify-center gap-6 text-center mb-16">
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Advanced Language Learning Features
          </h2>
          <p className="leading-relaxed text-gray-one">
            Break through the language barrier with unlimited speaking practice.
            Our AI language tutor adapts to your level, helping you achieve true
            fluency in any language - from French and Spanish to Japanese and
            Korean.
          </p>
        </div>

        <div className="grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex h-full flex-col items-center text-center gap-4 p-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-main-green/20 blur-xl rounded-full group-hover:scale-110 transition-transform duration-300" />
                  <benefit.icon className="relative h-16 w-16 text-main-green transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-base text-gray-two">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BenefitsSection;
