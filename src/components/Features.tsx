"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  Cpu, 
  Droplets, 
  Leaf, 
  TrendingUp, 
  Radio, 
  CloudCog, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Activity,
  Layers
} from "lucide-react";
import Link from "next/link";

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
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0052FF]/20 bg-[#0052FF]/5 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0052FF] mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Precision Telemetry &bull; Core Pillars</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071326] dark:text-emerald-50 leading-tight">
            Where Agriculture Meets <br />
            <span className="gradient-text">Full-Stack Intelligence.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#071326]/70 dark:text-emerald-200/70 leading-relaxed font-normal">
            Four interconnected engineering disciplines unified into a single high-performance platform — turning raw acreage and coconut substrates into autonomous, high-yield ecosystems.
          </p>
        </div>


        {/* ================= 4-CARD BENTO METRIC GRID (From Stitch Design) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Bento Card 1: Soil Moisture */}
          <div className="glass-card rounded-3xl p-6 border-l-4 border-l-[#0052FF] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold font-mono text-[#071326]/60 dark:text-emerald-200/60 uppercase">Substrate Moisture</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0052FF] flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#071326] dark:text-emerald-50 font-mono">68.4</span>
              <span className="text-base font-bold text-[#071326]/60 dark:text-emerald-200/60">%</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="text-[#059669] font-bold flex items-center gap-1 font-mono">
                <TrendingUp className="w-3.5 h-3.5" /> +2.4%
              </span>
              <span className="text-slate-400 dark:text-emerald-300/60">vs last cycle</span>
            </div>
          </div>

          {/* Bento Card 2: Electrical Conductivity (EC) */}
          <div className="glass-card rounded-3xl p-6 border-l-4 border-l-[#059669] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold font-mono text-[#071326]/60 dark:text-emerald-200/60 uppercase">Nutrient Salt EC</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#071326] dark:text-emerald-50 font-mono">1.28</span>
              <span className="text-sm font-bold text-[#071326]/60 dark:text-emerald-200/60 font-mono">mS/cm</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#10E599]/15 text-[#059669] text-[11px] font-bold font-mono">
                Optimal Buffer
              </span>
            </div>
          </div>

          {/* Bento Card 3: YieldAI Harvest Prediction */}
          <div className="glass-card rounded-3xl p-6 border-l-4 border-l-[#F59E0B] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold font-mono text-[#071326]/60 dark:text-emerald-200/60 uppercase">Yield Projection</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#F59E0B] flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#071326] dark:text-emerald-50 font-mono">+28.4</span>
              <span className="text-base font-bold text-[#F59E0B]">%</span>
            </div>
            <div className="mt-4 w-full bg-slate-100 dark:bg-emerald-950/40 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#F59E0B] to-[#10E599] w-[82%] h-full rounded-full" />
            </div>
          </div>

          {/* Bento Card 4: LoRaWAN Signal */}
          <div className="glass-card rounded-3xl p-6 border-l-4 border-l-[#00D2FF] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold font-mono text-[#071326]/60 dark:text-emerald-200/60 uppercase">Sensor Mesh</span>
              <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-[#00D2FF] flex items-center justify-center">
                <Radio className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#071326] dark:text-emerald-50 font-mono">99.98</span>
              <span className="text-base font-bold text-[#0052FF]">%</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0052FF]/10 text-[#0052FF] text-[11px] font-bold font-mono">
                15km LoRaWAN
              </span>
            </div>
          </div>

        </div>


        {/* ================= 2-COLUMN MAIN ENGINEERING SHOWCASE ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Wireless IoT Hardware */}
          <div className="glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#0052FF] flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-[#0052FF] uppercase tracking-wider">Pillar 01 &bull; Hardware</span>
              <h3 className="text-2xl font-black text-[#071326] dark:text-emerald-50 mt-1">LoRaWAN Telemetry Probes</h3>
              <p className="mt-3 text-sm text-[#071326]/75 dark:text-emerald-200/70 leading-relaxed font-normal">
                Multi-depth capacitance sensors monitor water potential, root temperature, and EC in Ceylon cocopeat substrates with 5-year solar battery autonomy.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-emerald-300/60">IP68 Submersible Enclosures</span>
              <Link href="/services#iot" className="inline-flex items-center gap-1 text-xs font-black text-[#0052FF] hover:underline">
                <span>View Hardware Specs</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Enterprise Cloud Architecture */}
          <div className="glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] flex items-center justify-center mb-6">
                <CloudCog className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">Pillar 02 &bull; Cloud Software</span>
              <h3 className="text-2xl font-black text-[#071326] dark:text-emerald-50 mt-1">NATLE FieldOS™ Platform</h3>
              <p className="mt-3 text-sm text-[#071326]/75 dark:text-emerald-200/70 leading-relaxed font-normal">
                Scalable Next.js and distributed cloud backend ingesting millions of sensor telemetry events per second to trigger closed-loop irrigation valves autonomously.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-emerald-300/60">Sub-50ms API Latency</span>
              <Link href="/solutions#field-os" className="inline-flex items-center gap-1 text-xs font-black text-[#059669] hover:underline">
                <span>Explore FieldOS™</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
