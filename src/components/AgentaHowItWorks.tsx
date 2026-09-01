"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Radio, 
  Cpu, 
  Activity, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    step: "01",
    badge: "Calibration",
    duration: "<24 Hours",
    title: "Substrate & Sensor Calibration",
    description: "Install LoRaWAN multi-depth soil probes directly into Hosma Ceylon cocopeat slabs. Autonomous baseline mapping of root EC, moisture capacitance, and ambient micro-climate.",
    features: [
      "Substrate root-zone mapping",
      "Wireless LoRaWAN sync protocol",
      "End-to-end telemetry encryption",
    ],
    accent: "text-[#0052FF] dark:text-[#10e599]",
    bgGlow: "from-[#0052FF]/10 dark:from-[#10e599]/10",
  },
  {
    step: "02",
    badge: "Activation",
    duration: "100+ Rules",
    title: "FieldOS™ Engine Activation",
    description: "Connect irrigation valves, fertilizer dosers, and drone multispectral feeds to your customized NATLE cloud dashboard. Set autonomous closed-loop triggers with zero manual lag.",
    features: [
      "Dynamic deficit irrigation rules",
      "Multi-greenhouse zone grouping",
      "Real-time sensor threshold alerts",
    ],
    accent: "text-[#059669] dark:text-[#10e599]",
    bgGlow: "from-[#059669]/10 dark:from-[#10e599]/10",
  },
  {
    step: "03",
    badge: "Continuous ROI",
    duration: "+28.4% Yield",
    title: "YieldAI™ Harvest Sync & Evolve",
    description: "Predictive neural models analyze historical weather and substrate drain cycles to maximize crop flowering, minimize water usage by 35%, and forecast harvest yields with 98% accuracy.",
    features: [
      "Continuous machine learning updates",
      "NDVI satellite health overlay",
      "Automated harvest date prediction",
    ],
    accent: "text-[#F59E0B] dark:text-amber-400",
    bgGlow: "from-[#F59E0B]/10 dark:from-amber-400/10",
  },
];

export default function AgentaHowItWorks() {
  return (
    <section className="relative py-28 md:py-36 bg-[#EDF6F2] dark:bg-[#050505] select-none">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0052FF]/20 dark:border-emerald-900/30 bg-white/80 dark:bg-emerald-950/40 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0052FF] dark:text-[#10e599] mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#0052FF] dark:text-[#10e599]" />
            <span>How It Works &bull; Seamless Onboarding</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071326] dark:text-emerald-50 leading-tight">
            Deploy in Minutes. <br />
            <span className="gradient-text">Scale Across Thousands of Acres.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#071326]/70 dark:text-emerald-200/60 leading-relaxed font-normal">
            Three straightforward steps to transform traditional commercial acreage into a precision-engineered, autonomous agricultural engine.
          </p>
        </div>

        {/* 3-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-xl"
            >
              {/* Background ambient gradient */}
              <div className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl ${item.bgGlow} to-transparent rounded-bl-full pointer-events-none`} />

              <div>
                {/* Header: Step Number & Metric Badges */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-black font-mono text-[#071326]/20 dark:text-emerald-300/20 group-hover:text-[#0052FF] dark:group-hover:text-[#10e599] transition-colors">
                    {item.step}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white dark:bg-[#0a140a] border border-slate-200/80 dark:border-emerald-900/30 text-[11px] font-mono font-bold text-[#071326]/70 dark:text-emerald-200/60 shadow-sm">
                      {item.badge}
                    </span>
                    <span className={`px-3 py-1 rounded-full bg-white dark:bg-[#0a140a] border border-slate-200/80 dark:border-emerald-900/30 text-[11px] font-mono font-black ${item.accent} shadow-sm`}>
                      {item.duration}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-[#071326] dark:text-emerald-50 mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[#071326]/75 dark:text-emerald-200/70 leading-relaxed font-normal mb-8">
                  {item.description}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="pt-6 border-t border-slate-100 dark:border-emerald-900/30 space-y-2.5">
                {item.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-[#071326]/80 dark:text-emerald-100/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] dark:text-[#10e599] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="gradient-btn inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-black uppercase tracking-wider text-white shadow-xl hover:scale-105 transition-all"
          >
            <span>Begin Farm Calibration</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
