"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

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
    <section className="relative bg-transparent py-24 select-none">
      <div className="mx-auto max-w-3xl px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{
              background: "rgba(14,165,233,0.08)",
              borderColor: "rgba(14,165,233,0.25)",
              color: "#0369a1",
            }}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span>FAQ &bull; Knowledge Base</span>
          </div>

          <h2 className="font-display text-4xl font-black text-[#0a1628] tracking-tight sm:text-5xl">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748b]">
            Hover or click any question to explore our architecture and enterprise deployment terms.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onMouseEnter={() => setOpenIndex(i)}
                className={`clay-card group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#0ea5e9]/40 bg-white shadow-[0_12px_32px_-8px_rgba(14,165,233,0.15)] ring-1 ring-[#0ea5e9]/20"
                    : "border-slate-200/80 bg-white/70 hover:bg-white hover:border-[#0ea5e9]/30 hover:shadow-md"
                }`}
              >
                <div
                  className="flex w-full items-center justify-between px-6 py-5 text-left select-none"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span
                    className={`font-display text-base sm:text-lg font-bold transition-colors duration-200 ${
                      isOpen ? "text-[#0ea5e9]" : "text-[#0a1628] group-hover:text-[#0ea5e9]"
                    }`}
                  >
                    {faq.q}
                  </span>

                  <div
                    className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "gradient-btn border-transparent text-white scale-105"
                        : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-[#0ea5e9]/40 group-hover:text-[#0ea5e9]"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-[#475569] text-sm sm:text-base leading-relaxed border-t border-slate-100 mt-1">
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