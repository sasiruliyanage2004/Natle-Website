"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "How does NATLE IoT telemetry integrate with Hosma Ceylon substrates?",
    a: "Our wireless LoRaWAN sensors feature specialized stainless-steel multi-depth capacitance prongs calibrated specifically to the water-holding capacity and air porosity of Hosma 100% organic cocopeat. They provide real-time root moisture, EC, and temperature readings with zero substrate disruption.",
  },
  {
    q: "Do I need technical or coding knowledge to operate FieldOS™?",
    a: "No. NATLE FieldOS™ is designed with an intuitive, zero-code visual dashboard. You can set irrigation triggers, view satellite NDVI crop maps, and receive automated harvest notifications on any mobile device, tablet, or desktop with 1-click controls.",
  },
  {
    q: "Can we order Hosma Ceylon cocopeat substrates internationally?",
    a: "Yes. In partnership with Hosma Ceylon (https://hosmaceylon.com), we export 40ft container loads of certified low-EC 5kg blocks, easy-fill disks, and custom-ratio growbags directly from Sri Lanka to over 24 countries worldwide.",
  },
  {
    q: "How long do the wireless field sensor batteries last?",
    a: "Every NATLE telemetry probe is equipped with ultra-low-power industrial silicon and a built-in micro-solar recharging panel, delivering continuous 5+ year maintenance-free operation under all weather conditions (IP68 certified).",
  },
  {
    q: "Are the data and telemetry feeds compliant with GlobalG.A.P and OMRI?",
    a: "Yes. Our TraceLink™ engine automatically logs every irrigation event, fertilizer EC cycle, and harvest lot onto an immutable, audit-ready compliance ledger that exports GlobalG.A.P and OMRI verification reports in seconds.",
  },
];

export default function AgentaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-28 md:py-36 bg-[#F1F7F4]/60 dark:bg-[#050505] border-t border-slate-200/80 dark:border-emerald-900/30 select-none">
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0052FF]/20 bg-white/80 dark:bg-[#0a140a]/80 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0052FF] mb-4 shadow-sm backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-[#0052FF]" />
            <span>Support &bull; Knowledge Base</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#071326] dark:text-emerald-50 leading-tight">
            Frequently Asked <span className="gradient-text">Questions.</span>
          </h2>

          <p className="mt-4 text-base text-[#071326]/70 dark:text-emerald-200/60 leading-relaxed font-normal">
            Everything you need to know about deploying NATLE smart telemetry and Hosma Ceylon organic substrates.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.q}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-emerald-900/30 transition-all duration-300 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-white/50 transition-colors"
                >
                  <span className="text-base font-bold text-[#071326] dark:text-emerald-50">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-emerald-950/40 flex items-center justify-center text-[#0052FF] shrink-0">
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
                      <div className="px-6 pb-6 pt-2 text-sm text-[#071326]/75 dark:text-emerald-200/70 leading-relaxed font-normal border-t border-slate-100 dark:border-emerald-900/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support CTA */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-white/80 dark:bg-[#0a140a]/80 border border-slate-200/80 dark:border-emerald-900/30 shadow-md">
          <p className="text-sm font-bold text-[#071326] dark:text-emerald-50">Still have questions regarding your acreage?</p>
          <p className="text-xs text-slate-500 dark:text-emerald-300/60 mt-1 mb-4">Our agronomy and software engineers are available 24/7.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0052FF] hover:underline"
          >
            <span>Speak with an Agronomy Specialist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
