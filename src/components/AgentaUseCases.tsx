"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Leaf, 
  Sprout, 
  Layers, 
  Droplets, 
  Sun, 
  ShieldCheck, 
  Globe2, 
  Cpu, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const useCases = [
  {
    category: "Most Popular",
    domain: "Plantation Ag",
    title: "Commercial Coconut Estates",
    description: "Manage 1,000+ acres with LoRaWAN wireless canopy telemetry, solar pumps, and 35% water conservation.",
    metric: "35% Water Saved",
    time: "1,200 Acres",
    icon: Leaf,
    accent: "border-[#059669]",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] dark:text-[#10e599]",
  },
  {
    category: "Hydroponics",
    domain: "Controlled Environment",
    title: "Dutch Hydroponic Greenhouses",
    description: "Precision automated fertigation dosing directly matched to Hosma Ceylon cocopeat slab absorption curves.",
    metric: "+32% Berry Yield",
    time: "48 Greenhouses",
    icon: Sprout,
    accent: "border-[#0052FF]",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40 text-[#0052FF] dark:text-[#10e599]",
  },
  {
    category: "Specialty Crop",
    domain: "Highland Agriculture",
    title: "Highland Ceylon Tea Consortiums",
    description: "Slope moisture mapping and micro-climate forecasting protecting premium single-origin tea flushes.",
    metric: "Zero Frost Loss",
    time: "8 Estates",
    icon: Sun,
    accent: "border-[#F59E0B]",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40 text-[#F59E0B] dark:text-amber-400",
  },
  {
    category: "Urban Ag",
    domain: "Vertical Farming",
    title: "Closed-Loop Urban Vertical Farms",
    description: "Multi-tier LED spectrum management, root-zone EC regulation, and autonomous CO2 enrichment cycles.",
    metric: "99.4% Resource ROI",
    time: "24/7 Autopilot",
    icon: Layers,
    accent: "border-[#00D2FF]",
    badgeBg: "bg-cyan-50 dark:bg-cyan-950/40 text-[#0052FF] dark:text-[#10e599]",
  },
  {
    category: "Fruit Groves",
    domain: "Orchard Management",
    title: "Commercial Mango & Citrus Groves",
    description: "Regulated deficit irrigation models to stimulate sugar brix concentration before harvest export.",
    metric: "+18° Brix Peak",
    time: "450 Acres",
    icon: Droplets,
    accent: "border-[#059669]",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] dark:text-[#10e599]",
  },
  {
    category: "Supply Chain",
    domain: "Bulk Logistics",
    title: "Export Substrate Fleet Telemetry",
    description: "Real-time moisture & container humidity tracking for 40ft shipments leaving Colombo Port worldwide.",
    metric: "100% Quality Intact",
    time: "24 Export Markets",
    icon: Globe2,
    accent: "border-[#0052FF]",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40 text-[#0052FF] dark:text-[#10e599]",
  },
  {
    category: "Compliance",
    domain: "Blockchain Tracking",
    title: "TraceLink™ Organic Certification",
    description: "Generate instant immutable harvest passports verifying GlobalG.A.P and zero chemical pesticide usage.",
    metric: "Audit-Ready in 1s",
    time: "GlobalG.A.P",
    icon: ShieldCheck,
    accent: "border-[#10E599]",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] dark:text-[#10e599]",
  },
  {
    category: "Automation",
    domain: "Cloud Valves",
    title: "Predictive Solenoid Valve Control",
    description: "Weather-aware automated valve pulsing that syncs with cloud forecasts to prevent over-watering during rains.",
    metric: "Zero Runoff Waste",
    time: "Sub-50ms Trigger",
    icon: Cpu,
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
            <span className="gradient-text">of Agricultural Production.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#071326]/70 dark:text-emerald-200/60 leading-relaxed font-normal">
            Discover how NATLE telemetry and Hosma Ceylon organic substrates transform commercial yields across greenhouses, plantations, and global export corridors.
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
