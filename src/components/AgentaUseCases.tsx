"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Leaf, 
  Activity, 
  Zap, 
  Users, 
  ShieldCheck, 
  Globe2, 
  Cpu, 
  ArrowUpRight,
  Sparkles,
  Layers
} from "lucide-react";
import Link from "next/link";

const useCases = [
  {
    category: "Healthcare AI",
    domain: "Clinical Diagnostics",
    title: "Hospital DICOM & PACS Vision",
    description: "Real-time AI diagnostic vision triaging emergency CT, MRI, and X-ray scans with 98.2% clinical accuracy.",
    metric: "98.2% Accuracy",
    time: "<15ms Inference",
    icon: Activity,
    accent: "border-[#059669]",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] dark:text-[#10e599]",
  },
  {
    category: "AgriTech",
    domain: "Precision Agriculture",
    title: "Autonomous IoT Soil Telemetry",
    description: "Tri-depth LoRaWAN capacitance probes and FieldOS automated fertigation across commercial plantations.",
    metric: "38% Water Saved",
    time: "15,000+ Hectares",
    icon: Leaf,
    accent: "border-[#0052FF]",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40 text-[#0052FF] dark:text-[#10e599]",
  },
  {
    category: "Retail AI",
    domain: "Point of Sales",
    title: "Omnichannel POS & Loss Prevention",
    description: "Sub-15ms transaction synchronization with AI-driven inventory shrink detection and dynamic pricing.",
    metric: "-35% Inventory Loss",
    time: "120+ Store Chain",
    icon: Zap,
    accent: "border-[#F59E0B]",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40 text-[#F59E0B] dark:text-amber-400",
  },
  {
    category: "EdTech",
    domain: "Adaptive Learning",
    title: "Cognitive Knowledge Graphs",
    description: "Personalized multi-modal learning pathways with real-time student pacing and automated assessment.",
    metric: "+45% Engagement",
    time: "140,000+ Students",
    icon: Globe2,
    accent: "border-[#00D2FF]",
    badgeBg: "bg-cyan-50 dark:bg-cyan-950/40 text-[#0052FF] dark:text-[#10e599]",
  },
  {
    category: "Human Resources",
    domain: "Talent Intelligence",
    title: "Predictive Talent & Retention AI",
    description: "Bias-free candidate skill graph matching and organizational attrition risk modeling for high-scale teams.",
    metric: "80% Faster Hiring",
    time: "Enterprise HR",
    icon: Users,
    accent: "border-[#059669]",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] dark:text-[#10e599]",
  },
  {
    category: "Custom AI",
    domain: "Sovereign Intelligence",
    title: "Air-Gapped Private LLMs",
    description: "Custom domain LLMs fine-tuned on proprietary internal knowledge bases with zero public cloud leakage.",
    metric: "100% Data Sovereignty",
    time: "On-Prem / VPC",
    icon: Cpu,
    accent: "border-[#0052FF]",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40 text-[#0052FF] dark:text-[#10e599]",
  },
  {
    category: "Industry 4.0",
    domain: "Industrial IoT",
    title: "Predictive Maintenance Telemetry",
    description: "Vibration, acoustic, and thermal telemetry algorithms forecasting equipment breakdowns 14 days in advance.",
    metric: "Zero Unplanned Halt",
    time: "Continuous Stream",
    icon: Layers,
    accent: "border-[#10E599]",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] dark:text-[#10e599]",
  },
  {
    category: "Compliance",
    domain: "Audit Security",
    title: "Deterministic Safety Guardrails",
    description: "Immutable compliance ledgers validating SOC 2 Type II, HIPAA, and GDPR audit rules in real time.",
    metric: "100% Audit-Ready",
    time: "Sub-50ms SLA",
    icon: ShieldCheck,
    accent: "border-[#0052FF]",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40 text-[#0052FF] dark:text-[#10e599]",
  },
];

export default function AgentaUseCases() {
  return (
    <section className="relative py-28 md:py-36 bg-transparent select-none">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#059669]/20 dark:border-emerald-900/30 bg-white/90 dark:bg-emerald-950/40 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10e599] mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#059669] dark:text-[#10e599]" />
            <span>Commercial Deployment &bull; Enterprise Use Cases</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071326] dark:text-emerald-50 leading-tight">
            Elevate Every Domain <br />
            <span className="gradient-text">with Sovereign AI.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#071326]/70 dark:text-emerald-200/60 leading-relaxed font-normal">
            Discover how NATLE AI platforms and edge telemetry transform performance, data privacy, and operational ROI across healthcare, retail, agriculture, and global education.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-card rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group shadow-md"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${item.badgeBg}`}>
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#0a140a] border border-slate-100 dark:border-emerald-900/30 flex items-center justify-center text-[#0052FF] dark:text-[#10e599] group-hover:bg-[#0052FF] dark:group-hover:bg-[#10e599] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-emerald-300/60 uppercase tracking-wider block mb-1">
                    {item.domain}
                  </span>

                  <h3 className="text-lg font-black text-[#071326] dark:text-emerald-50 mb-2 leading-snug group-hover:text-[#0052FF] dark:group-hover:text-[#10e599] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#071326]/70 dark:text-emerald-200/60 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Metric & Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black font-mono text-[#059669] dark:text-[#10e599]">{item.metric}</p>
                    <p className="text-[10px] font-mono text-slate-400 dark:text-emerald-300/60">{item.time}</p>
                  </div>

                  <Link href="/contact" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-emerald-950/40 flex items-center justify-center text-[#071326] dark:text-emerald-50 group-hover:bg-[#0052FF] dark:group-hover:bg-[#10e599] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
