"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Droplets, 
  Leaf, 
  TrendingUp, 
  Radio, 
  CloudCog, 
  ArrowUpRight, 
  Zap,
  Activity
} from "lucide-react";
import Link from "next/link";
import { CardPattern } from "@/components/ui/CardPattern";

const bentoMetrics = [
  {
    title: "Substrate Moisture",
    value: "68.4",
    unit: "%",
    subtext: "+2.4%",
    subtextLabel: "vs last cycle",
    icon: Droplets,
    borderColor: "border-l-[#0052FF] dark:border-l-[#00D2FF]",
    iconColor: "text-[#0052FF] dark:text-[#00D2FF]",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    title: "Nutrient Salt EC",
    value: "1.28",
    unit: "mS/cm",
    badge: "Optimal Buffer",
    icon: Leaf,
    borderColor: "border-l-[#059669] dark:border-l-[#10E599]",
    iconColor: "text-[#059669] dark:text-[#10E599]",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
  },
  {
    title: "Yield Projection",
    value: "+28.4",
    unit: "%",
    progress: 82,
    icon: Activity,
    borderColor: "border-l-[#F59E0B]",
    iconColor: "text-[#F59E0B]",
    iconBg: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    title: "Sensor Mesh",
    value: "99.98",
    unit: "%",
    badge: "15km LoRaWAN",
    icon: Radio,
    borderColor: "border-l-[#00D2FF] dark:border-l-[#10E599]",
    iconColor: "text-[#00D2FF] dark:text-[#10E599]",
    iconBg: "bg-cyan-50 dark:bg-cyan-950/50",
  },
];

export default function Features() {
  return (
    <section id="services" className="relative bg-transparent py-28 md:py-36 select-none">
      {/* Ambient background blur */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-[#0052FF]/5 blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#059669]/8 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] mb-4 shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 text-[#059669] dark:text-[#10E599]" />
            <span>Precision Telemetry &bull; Core Pillars</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071326] dark:text-white leading-tight"
          >
            Where Agriculture Meets <br />
            <span className="gradient-text">Full-Stack Intelligence.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-100/70 leading-relaxed font-normal"
          >
            Four interconnected engineering disciplines unified into a single high-performance platform — turning raw acreage and coconut substrates into autonomous, high-yield ecosystems.
          </motion.p>
        </div>

        {/* 4-Card Bento Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {bentoMetrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                className={`glass-card rounded-3xl p-6 border-l-4 ${item.borderColor} transition-all duration-300 group shadow-md hover:shadow-xl cursor-pointer relative overflow-hidden`}
              >
                <CardPattern 
                  variant="bio-hex" 
                  position="top-right" 
                  theme="auto" 
                  className="w-36 h-36 opacity-30 group-hover:opacity-60" 
                />
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <span className="text-xs font-bold font-mono text-slate-500 dark:text-emerald-300/70 uppercase">
                    {item.title}
                  </span>
                  <div className={`w-8 h-8 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-[#071326] dark:text-white font-mono">
                    {item.value}
                  </span>
                  <span className="text-base font-bold text-slate-500 dark:text-emerald-300/60 font-mono">
                    {item.unit}
                  </span>
                </div>

                {item.subtext && (
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className="text-[#059669] dark:text-[#10E599] font-bold flex items-center gap-1 font-mono">
                      <TrendingUp className="w-3.5 h-3.5" /> {item.subtext}
                    </span>
                    <span className="text-slate-400 dark:text-emerald-300/50">{item.subtextLabel}</span>
                  </div>
                )}

                {item.badge && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/60 text-[#059669] dark:text-[#10E599] text-[11px] font-bold font-mono border border-emerald-500/20">
                      {item.badge}
                    </span>
                  </div>
                )}

                {item.progress && (
                  <div className="mt-4 w-full bg-slate-100 dark:bg-emerald-950/60 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-[#F59E0B] to-[#10E599] h-full rounded-full" 
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 2-Column Main Engineering Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Wireless IoT Hardware */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
            className="glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <CardPattern 
              variant="circuit" 
              position="top-right" 
              theme="cyan" 
              className="w-56 h-56 sm:w-72 sm:h-72 opacity-30 group-hover:opacity-60" 
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-emerald-950/60 text-[#0052FF] dark:text-[#10E599] border border-blue-100 dark:border-emerald-800/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-[#0052FF] dark:text-[#10E599] uppercase tracking-wider">
                Pillar 01 &bull; Hardware
              </span>
              <h3 className="text-2xl font-black text-[#071326] dark:text-white mt-1 group-hover:text-[#0052FF] dark:group-hover:text-[#10E599] transition-colors">
                LoRaWAN Telemetry Probes
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-emerald-100/70 leading-relaxed font-normal">
                Multi-depth capacitance sensors monitor water potential, root temperature, and EC in Ceylon cocopeat substrates with 5-year solar battery autonomy.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-emerald-300/60">
                IP68 Submersible Enclosures
              </span>
              <Link href="/services#iot" className="inline-flex items-center gap-1 text-xs font-black text-[#0052FF] dark:text-[#10E599] hover:underline">
                <span>View Hardware Specs</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Enterprise Cloud Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
            className="glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <CardPattern 
              variant="bio-hex" 
              position="top-right" 
              theme="emerald" 
              className="w-56 h-56 sm:w-72 sm:h-72 opacity-30 group-hover:opacity-60" 
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] dark:text-[#10E599] border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CloudCog className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-wider">
                Pillar 02 &bull; Cloud Software
              </span>
              <h3 className="text-2xl font-black text-[#071326] dark:text-white mt-1 group-hover:text-[#059669] dark:group-hover:text-[#10E599] transition-colors">
                NATLE FieldOS™ Platform
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-emerald-100/70 leading-relaxed font-normal">
                Scalable Next.js and distributed cloud backend ingesting millions of sensor telemetry events per second to trigger closed-loop irrigation valves autonomously.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-emerald-300/60">
                Sub-50ms API Latency
              </span>
              <Link href="/solutions#field-os" className="inline-flex items-center gap-1 text-xs font-black text-[#059669] dark:text-[#10E599] hover:underline">
                <span>Explore FieldOS™</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
