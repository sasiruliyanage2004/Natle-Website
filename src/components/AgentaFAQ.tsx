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
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.25)", color: "#0369a1" }}>
            FAQ
          </div>
          <h2 className="font-display text-4xl font-black mb-4" style={{ color: "#0a1628" }}>
            Common Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden rounded-2xl border transition-all duration-300"
                style={{
                  background: isOpen ? "#ffffff" : "#f8faff",
                  borderColor: isOpen ? "rgba(14,165,233,0.3)" : "#e2e8f0",
                  boxShadow: isOpen ? "0 4px 20px -4px rgba(10,22,60,0.05)" : "none"
                }}
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-display text-lg font-bold" style={{ color: "#0a1628" }}>
                    {faq.q}
                  </span>
                  <div
                    className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors"
                    style={{
                      background: isOpen ? "#0ea5e9" : "#ffffff",
                      borderColor: isOpen ? "#0ea5e9" : "#e2e8f0",
                      color: isOpen ? "#ffffff" : "#64748b"
                    }}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-[#475569] text-sm leading-relaxed">
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
