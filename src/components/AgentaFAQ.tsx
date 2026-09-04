"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is NATLE's AI Platform secure for sensitive healthcare and financial data?",
    a: "Absolutely. Our architecture is SOC 2 Type II certified, HIPAA compliant, and GDPR ready. We implement end-to-end encryption, zero-trust security models, and sovereign data controls ensuring your data never leaves your secure boundaries."
  },
  {
    q: "How long does it take to deploy an AI solution?",
    a: "Unlike traditional vendors that take 6-12 months, our pre-built AI modules and FieldOS architecture allow us to deploy production-ready systems in 4-8 weeks, depending on integration complexity."
  },
  {
    q: "Do you integrate with our existing ERP and software systems?",
    a: "Yes. Our platforms are designed with API-first architectures that seamlessly integrate with legacy ERPs, EHRs, CRM systems, and custom databases without disrupting your current operations."
  },
  {
    q: "What kind of post-deployment support do you provide?",
    a: "We offer 24/7 SLA-backed enterprise support. This includes continuous model monitoring, real-time telemetry, automated scaling, and regular model retraining to ensure accuracy over time."
  }
];

export default function AgentaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-transparent py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold text-[#e8f0fe] mb-4"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-[#0ea5e9]/50 shadow-[0_0_20px_-5px_rgba(14,165,233,0.3)]" : "border-[#0ea5e9]/10"}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-[#e8f0fe] pr-8">{faq.q}</span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-[#64748b] shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-[#94a3b8] text-sm leading-relaxed border-t border-white/5 pt-4 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

