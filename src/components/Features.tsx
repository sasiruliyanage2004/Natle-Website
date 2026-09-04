"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  Radio, 
  CloudCog, 
  ArrowUpRight, 
  Zap,
  Activity,
  Brain,
  Lock
} from "lucide-react";
import Link from "next/link";
import CardPattern from "@/components/common/CardPattern";

const bentoMetrics = [
  {
    title: "Diagnostic Accuracy",
    value: "98.2",
    unit: "%",
    subtext: "+34% Reduction",
    subtextLabel: "in clinical imaging errors",
    icon: Activity,
    borderColor: "border-l-sky-500",
    iconColor: "text-sky-500 dark:text-sky-400",
    iconBg: "bg-sky-50 dark:bg-sky-950/50",
  },
  {
    title: "Inference Latency",
    value: "<15",
    unit: "ms",
    badge: "Quantized ONNX",
    icon: Zap,
    borderColor: "border-l-indigo-500",
    iconColor: "text-indigo-500 dark:text-indigo-400",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/50",
  },
  {
    title: "Client Satisfaction",
    value: "100",
    unit: "%",
    progress: 100,
    icon: TrendingUp,
    borderColor: "border-l-emerald-500",
    iconColor: "text-emerald-500 dark:text-[#10E599]",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
  },
  {
    title: "Data Security SLA",
    value: "100",
    unit: "%",
    badge: "SOC 2 & HIPAA",
    icon: Lock,
    borderColor: "border-l-teal-500",
    iconColor: "text-teal-500 dark:text-teal-400",
    iconBg: "bg-teal-50 dark:bg-teal-950/50",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-transparent py-28 md:py-36 select-none">
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
            <span>Audited Production Benchmarks</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071326] dark:text-white leading-tight"
          >
            Engineering Rigor Meets <br />
            <span className="gradient-text">Applied Intelligence.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-100/70 leading-relaxed font-normal"
          >
            Production-tested architectures designed for high accuracy, microsecond latency, and strict zero-trust data protection across 6 core industry verticals.
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
                <CardPattern pattern="dots" glowColor="rgba(16, 229, 153, 0.12)" />

                <div className="relative z-10 flex justify-between items-start mb-6">
                  <span className="text-xs font-bold font-mono text-slate-500 dark:text-zinc-400 uppercase">
                    {item.title}
                  </span>
                  <div className={`w-8 h-8 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative z-10 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-[#071326] dark:text-white font-mono">
                    {item.value}
                  </span>
                  <span className="text-base font-bold text-slate-500 dark:text-zinc-400 font-mono">
                    {item.unit}
                  </span>
                </div>

                {item.subtext && (
                  <div className="relative z-10 mt-4 flex items-center gap-2 text-xs">
                    <span className="text-[#059669] dark:text-[#10E599] font-bold flex items-center gap-1 font-mono">
                      <TrendingUp className="w-3.5 h-3.5" /> {item.subtext}
                    </span>
                    <span className="text-slate-400 dark:text-zinc-500">{item.subtextLabel}</span>
                  </div>
                )}

                {item.badge && (
                  <div className="relative z-10 mt-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/60 text-[#059669] dark:text-[#10E599] text-[11px] font-bold font-mono border border-emerald-500/20">
                      {item.badge}
                    </span>
                  </div>
                )}

                {item.progress && (
                  <div className="relative z-10 mt-4 w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-[#059669] to-[#10E599] h-full rounded-full" 
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 2-Column Main Engineering Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Multi-Industry AI & Neural Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
            className="glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl transition-all group relative overflow-hidden border border-white/10"
          >
            <CardPattern pattern="circuit" glowColor="rgba(14, 165, 233, 0.15)" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Pillar 01 &bull; Applied Neural Intelligence
              </span>
              <h3 className="text-2xl font-black text-[#071326] dark:text-white mt-1 group-hover:text-sky-500 transition-colors">
                Domain-Specific Vision &amp; Deep Learning
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                Bespoke PyTorch and ONNX neural pipelines: clinical PACS radiology assistance, crop health NDVI segmentation, retail barcode indexing, and adaptive student retention models.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400">
                Sub-15ms Quantized Inference
              </span>
              <Link href="/services#healthcare-ai" className="inline-flex items-center gap-1 text-xs font-black text-sky-600 dark:text-sky-400 hover:underline">
                <span>Explore AI Verticals</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Distributed Cloud & IoT Systems */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
            className="glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl transition-all group relative overflow-hidden border border-white/10"
          >
            <CardPattern pattern="circuit" glowColor="rgba(16, 229, 153, 0.15)" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#059669] dark:text-[#10E599] border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CloudCog className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-wider">
                Pillar 02 &bull; Distributed Cloud &amp; IoT
              </span>
              <h3 className="text-2xl font-black text-[#071326] dark:text-white mt-1 group-hover:text-[#059669] dark:group-hover:text-[#10E599] transition-colors">
                Real-Time Mesh &amp; Event-Driven Architecture
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                Scalable Next.js, Go, and PostgreSQL distributed systems processing 10,000+ telemetry packets per second with multi-branch offline-first POS synchronization and FieldOS™ IoT mesh management.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400">
                99.9% Production SLA
              </span>
              <Link href="/services#agriculture-ai" className="inline-flex items-center gap-1 text-xs font-black text-[#059669] dark:text-[#10E599] hover:underline">
                <span>Explore IoT &amp; Cloud</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
