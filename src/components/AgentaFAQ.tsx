"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "How does NATLE ensure 100% sovereign data privacy for healthcare & enterprise clients?",
    a: "We deploy zero-data-retention, air-gapped VPC or on-premise neural inference architectures. Training weights and clinical patient records (DICOM/PACS) never leave your private network, fully compliant with HIPAA, SOC 2 Type II, and GDPR standards.",
  },
  {
    q: "What inference latency can we expect for real-time edge workloads?",
    a: "Using TensorRT FP8 quantization and custom C++ edge pipelines, our models deliver sub-15ms inference latency on localized edge hardware for surgical vision, real-time POS fraud prevention, and autonomous agricultural telemetry.",
  },
  {
    q: "Can NATLE AI platforms integrate with legacy hospital PACS and retail ERP systems?",
    a: "Yes. Our systems feature native connectors for HL7/FHIR, DICOM, SAP, Oracle NetSuite, and major POS protocols. We enable seamless bi-directional synchronization with zero disruption to active workflows.",
  },
  {
    q: "How does Industry 4.0 advisory by Prof. Henrik von Scheel shape your deployments?",
    a: "Prof. Henrik von Scheel (originator of Industry 4.0) guides our architectural steering committee, ensuring our solutions bridge macroeconomic manufacturing strategy, autonomous digital twins, and bottom-line enterprise ROI.",
  },
  {
    q: "What is the typical deployment timeline and ROI payback window?",
    a: "Production pilot architectures are deployed within 4 to 8 weeks. Across healthcare diagnostic and retail POS deployments, our enterprise partners consistently achieve a verifiable ROI payback within 3 to 6 months.",
  },
];

export default function AgentaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-28 md:py-36 bg-transparent select-none">
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] mb-4 shadow-sm backdrop-blur-md"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support &bull; Knowledge Base</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-[#071326] dark:text-white leading-tight"
          >
            Frequently Asked <span className="gradient-text">Questions.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base text-slate-600 dark:text-emerald-100/70 leading-relaxed font-normal"
          >
            Everything you need to know about deploying NATLE enterprise AI solutions, sovereign architectures, and SLAs.
          </motion.p>
        </div>

        {/* Accordion List with Scroll Reveal and Hover animations */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-emerald-500/5 transition-colors cursor-pointer"
                >
                  <span className="text-base font-bold text-[#071326] dark:text-white">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-[#059669] dark:text-[#10E599] flex items-center justify-center shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-slate-600 dark:text-emerald-100/80 leading-relaxed font-normal border-t border-slate-100 dark:border-emerald-900/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            href="/contact"
            className="gradient-btn inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md hover:scale-105 transition-all"
          >
            <span>Have More Questions? Consult an AI Architect</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
