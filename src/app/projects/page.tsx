"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { motion } from "framer-motion";
import { 
  Building2, 
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

const caseStudies = [
  {
    title: "1,200-Acre Ceylon Tea Estate",
    location: "Nuwara Eliya, Sri Lanka",
    client: "Highland Bio-Teas PLC",
    summary: "Deployed 85 wireless soil moisture nodes and drone multispectral NDVI mapping across steep hillside tea terraces to eliminate under-fertilization.",
    metrics: [
      { label: "Yield Increase", value: "+24.5%" },
      { label: "Water Savings", value: "32%" },
      { label: "Fertilizer Waste", value: "-18%" },
    ],
    solution: "FieldOS™ + YieldAI™",
  },
  {
    title: "European Glasshouse Hydroponics",
    location: "Westland, Netherlands",
    client: "EuroGrow Greenhouse B.V.",
    summary: "Integrated Hosma Ceylon low-EC buffered cocopeat growbags with automated closed-loop drip pulse valves for high-wire commercial tomato cultivation.",
    metrics: [
      { label: "Crop Cycle", value: "-12 Days" },
      { label: "Root Mass", value: "+40%" },
      { label: "Zero Runoff", value: "100%" },
    ],
    solution: "Hosma Substrates + TraceLink™",
  },
  {
    title: "Middle-East Desert Hydroponics",
    location: "Al Ain, United Arab Emirates",
    client: "Oasis AgTech Farms",
    summary: "Overcame extreme 48°C ambient desert heat with real-time root zone temperature telemetry and optimized Hosma 70/30 cocopeat/chips water buffering.",
    metrics: [
      { label: "Water Efficiency", value: "+44%" },
      { label: "Mortality Rate", value: "<1.2%" },
      { label: "Harvest Cycles", value: "4x/Yr" },
    ],
    solution: "FieldOS™ + Hosma Cocopeat",
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300 select-none">
      <BeamsBackground intensity="subtle" className="absolute inset-0 z-0 pointer-events-none" />
      <SmoothCursor />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-6"
            >
              <Building2 className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
              <span>Commercial Field Case Studies</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]"
            >
              Proven Deployments in the{" "}
              <span className="gradient-text">
                Harshest Climates.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-xl text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed max-w-3xl mx-auto"
            >
              From tropical tea hillsides in Sri Lanka to high-tech Dutch glasshouses and Middle-Eastern desert hydroponics, explore how NATLE and Hosma Ceylon deliver quantified agricultural ROI.
            </motion.p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <motion.div 
                key={study.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.98 }}
                className="glass-card rounded-3xl p-8 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:border-emerald-500/50 transition-all relative z-10 cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-wider">
                    {study.location}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{study.title}</h3>
                  <p className="text-xs font-bold text-slate-500 dark:text-emerald-300/60 mt-1">Client: {study.client}</p>
                  <p className="text-xs text-slate-600 dark:text-emerald-100/70 mt-4 leading-relaxed font-normal">{study.summary}</p>

                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-emerald-900/30 space-y-3">
                    <h4 className="text-[10px] font-mono font-bold text-slate-400 dark:text-emerald-300/60 uppercase">Verified Results</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {study.metrics.map((m, mi) => (
                        <div key={mi} className="bg-emerald-500/5 dark:bg-emerald-950/40 p-2.5 rounded-xl text-center border border-emerald-500/20">
                          <p className="text-base font-black text-[#059669] dark:text-[#10E599] font-mono">{m.value}</p>
                          <p className="text-[9px] font-bold text-slate-500 dark:text-emerald-300/60 uppercase mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-emerald-50">{study.solution}</span>
                  <Link href="/contact" className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-[#059669] dark:text-[#10E599] hover:bg-[#059669] hover:text-slate-950 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <CTAFooter />
      </div>
    </main>
  );
}
