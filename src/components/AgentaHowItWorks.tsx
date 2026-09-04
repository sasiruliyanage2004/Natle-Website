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
    badge: "Architecture",
    duration: "<48 Hours",
    title: "Domain Integration & Data Ingestion",
    description: "Ingest PACS/DICOM imaging, LoRaWAN edge IoT telemetry, retail POS events, and enterprise ERP streams directly into sovereign, air-gapped VPCs with zero data leakage.",
    features: [
      "Zero-trust VPC & on-prem isolation",
      "Streaming ingestion (<10ms queue)",
      "Automated schema & modal validation",
    ],
    accent: "text-[#0052FF] dark:text-[#10e599]",
    bgGlow: "from-[#0052FF]/10 dark:from-[#10e599]/10",
  },
  {
    step: "02",
    badge: "Inference SLA",
    duration: "<15ms Latency",
    title: "Neural Calibration & Edge Deployment",
    description: "Deploy domain-specific neural architectures with TensorRT and FP8 quantization. Achieve 98.2% diagnostic precision with deterministic safety guardrails.",
    features: [
      "Domain-specific neural fine-tuning",
      "Sub-15ms real-time edge inferencing",
      "Continuous hallucination filtering",
    ],
    accent: "text-[#059669] dark:text-[#10e599]",
    bgGlow: "from-[#059669]/10 dark:from-[#10e599]/10",
  },
  {
    step: "03",
    badge: "Continuous ROI",
    duration: "60% Workload Drop",
    title: "Autonomous Workflow Orchestration",
    description: "Deploy autonomous multi-agent copilots that triage clinical scans, balance retail inventory across 100+ stores, or pulse closed-loop fertigation valves with zero manual lag.",
    features: [
      "Human-in-the-loop oversight portals",
      "Automated compliance audit trails",
      "Measurable 3-month ROI payback",
    ],
    accent: "text-[#F59E0B] dark:text-amber-400",
    bgGlow: "from-[#F59E0B]/10 dark:from-amber-400/10",
  },
];

export default function AgentaHowItWorks() {
  return (
    <section className="relative py-28 md:py-36 bg-transparent select-none">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0052FF]/20 dark:border-emerald-900/30 bg-white/80 dark:bg-emerald-950/40 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0052FF] dark:text-[#10e599] mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#0052FF] dark:text-[#10e599]" />
            <span>Deployment Lifecycle &bull; Seamless Integration</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071326] dark:text-emerald-50 leading-tight">
            Deploy in Days. <br />
            <span className="gradient-text">Scale Across Global Infrastructure.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#071326]/70 dark:text-emerald-200/60 leading-relaxed font-normal">
            Three structured phases to integrate sovereign artificial intelligence into enterprise operations with zero disruption to legacy infrastructure.
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
            <span>Request Enterprise AI Pilot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
