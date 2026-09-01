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
            Everything you need to know about deploying NATLE smart telemetry and Hosma Ceylon organic substrates.
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
            <span>Have More Questions? Speak to an Agronomist</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
