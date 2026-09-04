"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "NATLE's Clinical Diagnostic AI dropped our emergency radiologist scan backlog by 60% with 98.2% accuracy. It seamlessly integrated into our PACS/DICOM infrastructure without a single hour of downtime.",
    author: "Dr. Marcus Vance",
    role: "Chief Medical Officer",
    company: "HealthFirst Hospital Group",
    avatar: "MV",
    rating: 5,
    metrics: "60% Workload Drop"
  },
  {
    quote: "Migrating 120+ retail supermarket stores to NATLE's real-time Point of Sales and predictive inventory AI slashed our stockouts by 35% and accelerated checkout throughput by 40%.",
    author: "Elena Rostova",
    role: "VP of Global Supply Chain",
    company: "RetailMax Chain",
    avatar: "ER",
    rating: 5,
    metrics: "-35% Inventory Shrink"
  },
  {
    quote: "Deploying NATLE's LoRaWAN soil telemetry nodes and FieldOS predictive engine across 15,000 hectares cut our irrigation consumption by 38% while lifting seasonal harvest yield by 28%.",
    author: "David K. Henderson",
    role: "Chief Technology Officer",
    company: "GreenField Agri Corp",
    avatar: "DH",
    rating: 5,
    metrics: "38% Water Conserved"
  }
];

export default function Testimonials() {
  return (
    <section className="relative bg-transparent py-28 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-[#059669] dark:text-[#10E599] border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider mb-4"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Enterprise Case Studies</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Trusted by Enterprise Leaders <br className="hidden sm:block" />
            <span className="gradient-text">&amp; Global Industry Pioneers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-slate-600 dark:text-emerald-100/70"
          >
            See how healthcare groups, retail networks, and commercial agricultural operators leverage NATLE to scale operations, reduce costs, and guarantee compliance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-200/80 dark:border-emerald-500/20 bg-white/90 dark:bg-[#070d07]/90 p-8 shadow-md hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[#059669] dark:text-[#10E599] border border-emerald-500/20 text-xs font-mono font-bold">
                    {t.metrics}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-emerald-300/40 dark:text-emerald-500/30 mb-4" />
                <p className="text-base text-slate-700 dark:text-emerald-100/80 leading-relaxed font-normal italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-100 dark:border-emerald-900/30">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#059669] to-[#10E599] flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.author}</h4>
                  <p className="text-xs text-slate-500 dark:text-emerald-300/60">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
