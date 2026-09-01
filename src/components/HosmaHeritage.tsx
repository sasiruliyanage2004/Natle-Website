"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sprout, 
  Ship, 
  Sparkles,
  Droplets,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Globe2
} from "lucide-react";
import { Globe } from "@/components/magicui/globe";

export default function HosmaHeritage() {
  return (
    <section id="heritage" className="relative overflow-hidden bg-white/60 dark:bg-black/60 py-24 md:py-32 select-none border-t border-slate-200/80 dark:border-zinc-800 transition-colors duration-300">
      
      {/* Ambient Background Blur */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-tr from-[#059669]/10 via-[#0052FF]/10 to-transparent blur-[140px]" />
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


        {/* ================= EXACT MAGIC UI GLOBE SHOWCASE CONTAINER ================= */}
        <div className="relative mx-auto max-w-5xl rounded-[3rem] border border-slate-200/90 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 shadow-2xl backdrop-blur-2xl overflow-hidden p-6 sm:p-12 mb-16">
          
          {/* Magic UI Large Watermark Typography */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center pt-4 pb-48 sm:pb-64 md:pb-80">
            <span className="pointer-events-none bg-gradient-to-b from-[#071326] via-slate-700 to-slate-300/40 dark:from-white dark:via-zinc-400 dark:to-zinc-800/20 bg-clip-text text-6xl sm:text-8xl md:text-9xl leading-none font-black tracking-tight text-transparent">
              Global Scale
            </span>
            
            <p className="mt-4 max-w-xl text-xs sm:text-sm font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest">
              Connecting 24+ Global Export Corridors from Colombo WTC Hub
            </p>
          </div>

          {/* Magic UI 3D Interactive Globe (Rising from Bottom Hemisphere) */}
          <div className="absolute inset-x-0 bottom-0 top-24 sm:top-28 md:top-32 pointer-events-auto">
            <Globe className="top-12 sm:top-16 md:top-20" />
          </div>

          {/* Bottom Radial Gradient Floor Reflection */}
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,82,255,0.08),rgba(255,255,255,0))]" />

          {/* Floating Origin & Hub Badges */}
          <div className="relative z-20 mt-auto pt-6 border-t border-slate-100 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-3 border border-slate-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-md">
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Origin Port</p>
              <p className="text-xs font-black text-[#071326] dark:text-white mt-0.5">Colombo WTC</p>
            </div>
            <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-3 border border-slate-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-md">
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Europe Hub</p>
              <p className="text-xs font-black text-[#0052FF] dark:text-cyan-400 mt-0.5">Rotterdam</p>
            </div>
            <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-3 border border-slate-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-md">
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Americas Hub</p>
              <p className="text-xs font-black text-[#059669] dark:text-emerald-400 mt-0.5">Long Beach, CA</p>
            </div>
            <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 p-3 border border-slate-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-md">
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Asia-Pacific</p>
              <p className="text-xs font-black text-[#F59E0B] mt-0.5">Tokyo &amp; Sydney</p>
            </div>
          </div>

        </div>


        {/* ================= SUBSTRATE SCIENCE METRICS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
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
