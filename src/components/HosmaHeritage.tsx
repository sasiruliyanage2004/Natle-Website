"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sprout, 
  Droplets,
  Sparkles,
  Layers,
  Ship,
  ArrowUpRight
} from "lucide-react";
import { Globe } from "@/components/magicui/globe";

export default function HosmaHeritage() {
  return (
    <section id="heritage" className="relative overflow-hidden py-24 md:py-36 select-none border-t border-slate-200/80 dark:border-zinc-800 transition-colors duration-300">
      
      {/* Background Ambient Multi-Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[650px] rounded-full bg-gradient-to-tr from-[#059669]/10 via-[#0052FF]/10 to-transparent blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 dark:border-emerald-500/30 bg-white/90 dark:bg-zinc-900/80 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-emerald-400 shadow-sm backdrop-blur-md mb-4">
            <Sprout className="h-4 w-4 text-[#059669] dark:text-emerald-400" />
            <span>Parent Heritage &bull; Hosma Ceylon (Pvt) Ltd</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071326] dark:text-white leading-[1.08]">
            Rooted in Ceylon&apos;s Richest Soil. <br />
            <span className="font-serif italic font-normal gradient-text">
              Engineered for the World.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-zinc-400 font-normal leading-relaxed">
            NATLE was born from <strong>Hosma Ceylon</strong> (<a href="https://hosmaceylon.com" target="_blank" rel="noreferrer" className="text-[#0052FF] dark:text-cyan-400 font-bold hover:underline">hosmaceylon.com</a>) — Sri Lanka&apos;s premier exporter of 100% organic coconut coir substrates, now supercharged with next-generation IoT telemetry and predictive cloud intelligence.
          </p>
        </div>


        {/* ================= OPEN SEAMLESS MAGIC UI GLOBE HERO ================= */}
        <div className="relative mx-auto max-w-5xl flex flex-col items-center justify-center pt-8 pb-12">
          
          {/* Big Editorial Watermark Title */}
          <div className="relative z-10 text-center mb-6">
            <span className="pointer-events-none bg-gradient-to-b from-[#071326] via-slate-700 to-slate-400/40 dark:from-white dark:via-zinc-400 dark:to-zinc-800/20 bg-clip-text text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-none font-black tracking-tight text-transparent">
              Global Scale
            </span>
            <p className="mt-2 text-xs sm:text-sm font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest">
              Connecting 24+ Global Export Corridors directly from Colombo WTC
            </p>
          </div>

          {/* 3D Interactive Rotating Globe Hemisphere */}
          <div className="relative h-[360px] sm:h-[440px] md:h-[500px] w-full max-w-[650px] flex items-center justify-center my-2">
            <Globe />
          </div>

          {/* Trade Route Pills */}
          <div className="relative z-20 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono mt-6">
            <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-3.5 border border-slate-200/90 dark:border-zinc-800 shadow-md backdrop-blur-md">
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Origin Hub</p>
              <p className="text-sm font-black text-[#071326] dark:text-white mt-0.5">Colombo WTC</p>
            </div>
            <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-3.5 border border-slate-200/90 dark:border-zinc-800 shadow-md backdrop-blur-md">
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Europe Port</p>
              <p className="text-sm font-black text-[#0052FF] dark:text-cyan-400 mt-0.5">Rotterdam</p>
            </div>
            <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-3.5 border border-slate-200/90 dark:border-zinc-800 shadow-md backdrop-blur-md">
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Americas Port</p>
              <p className="text-sm font-black text-[#059669] dark:text-emerald-400 mt-0.5">Long Beach, CA</p>
            </div>
            <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-3.5 border border-slate-200/90 dark:border-zinc-800 shadow-md backdrop-blur-md">
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Asia-Pacific</p>
              <p className="text-sm font-black text-[#F59E0B] mt-0.5">Tokyo &amp; Sydney</p>
            </div>
          </div>

        </div>


        {/* ================= SUBSTRATE SCIENCE METRICS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          
          <div className="rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950 p-6 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-[#0052FF] dark:text-cyan-400 flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase">Water Capacity</p>
                <p className="text-lg font-black text-[#071326] dark:text-white">800% - 900%</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Holds 8-9x dry weight in bio-available moisture for continuous hydroponic root hydration.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950 p-6 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#059669] dark:text-emerald-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase">Electrical Conductivity</p>
                <p className="text-lg font-black text-[#071326] dark:text-white">&lt; 0.5 mS/cm</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Triple-washed in fresh spring water to remove excess sodium and potassium salts.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950 p-6 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-[#F59E0B] flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase">Air Filled Porosity</p>
                <p className="text-lg font-black text-[#071326] dark:text-white">18% - 22% AFP</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Maximum aeration preventing root rot in closed-loop commercial substrate growbags.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
