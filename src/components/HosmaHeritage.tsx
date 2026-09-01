"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sprout, 
  Globe2, 
  ShieldCheck, 
  Ship, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  Sparkles,
  Droplets,
  Layers
} from "lucide-react";
import Link from "next/link";
import { Globe } from "@/components/magicui/globe";

const exportDestinations = [
  { country: "Netherlands & Europe", share: "38%", port: "Port of Rotterdam", use: "Hydroponic Greenhouses", ec: "< 0.5 mS/cm" },
  { country: "Japan & South Korea", share: "26%", port: "Tokyo / Yokohama", use: "Precision Berry Substrates", ec: "< 0.4 mS/cm" },
  { country: "United States & Canada", share: "22%", port: "Long Beach, CA", use: "Commercial Vertical Farms", ec: "< 0.5 mS/cm" },
  { country: "Australia & New Zealand", share: "14%", port: "Port of Sydney", use: "Orchard Moisture Matrix", ec: "< 0.6 mS/cm" },
];

export default function HosmaHeritage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="heritage" className="relative overflow-hidden bg-white/50 dark:bg-black/50 py-24 md:py-32 select-none border-t border-slate-200/80 dark:border-zinc-800 transition-colors duration-300">
      
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px]" />
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

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-zinc-400 font-normal leading-relaxed">
            NATLE was born from <strong>Hosma Ceylon</strong> (<a href="https://hosmaceylon.com" target="_blank" rel="noreferrer" className="text-[#0052FF] dark:text-cyan-400 font-bold hover:underline">hosmaceylon.com</a>) — Sri Lanka&apos;s premier exporter of 100% organic coconut coir substrates, now supercharged with next-generation IoT telemetry and predictive cloud intelligence.
          </p>
        </div>

        {/* Dual Grid: Left Substrate Specs + Right Magic UI 3D Interactive Globe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Substrate Specifications */}
          <div className="lg:col-span-6 rounded-[2.5rem] border border-slate-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl">
            
            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-zinc-800">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#059669] dark:text-emerald-400 uppercase tracking-wider">
                    Product Matrix #01
                  </span>
                  <h3 className="text-2xl font-black text-[#071326] dark:text-white mt-1">
                    Hosma Ultra-Washed Cocopeat
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-xs font-mono font-bold text-[#059669] dark:text-emerald-400">
                  OMRI &bull; ISO 9001
                </span>
              </div>

              {/* Substrate Spec Cards */}
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-[#0052FF] dark:text-cyan-400 flex items-center justify-center font-bold">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase">Water Holding Capacity</p>
                      <p className="text-base font-black text-[#071326] dark:text-white">800% - 900% (8-9x Weight)</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0052FF] dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg">High Retentive</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#059669] dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase">Electrical Conductivity (EC)</p>
                      <p className="text-base font-black text-[#071326] dark:text-white">&lt; 0.5 mS/cm (Triple Washed)</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#059669] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">Low EC Grade</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-[#F59E0B] flex items-center justify-center font-bold">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase">Air Filled Porosity (AFP)</p>
                      <p className="text-base font-black text-[#071326] dark:text-white">18% - 22% Aeration</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#F59E0B] bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg">Optimal Oxygen</span>
                </div>
              </div>
            </div>

            {/* Bottom Export Fleet Metric */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ship className="w-4 h-4 text-[#0052FF] dark:text-cyan-400" />
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">40ft High-Cube Container Shipping</span>
              </div>
              <a 
                href="https://hosmaceylon.com" 
                target="_blank" 
                rel="noreferrer" 
                className="group inline-flex items-center gap-1 text-xs font-bold text-[#0052FF] dark:text-cyan-400 hover:text-[#059669] transition-colors"
              >
                <span>Visit Hosma Ceylon</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

          </div>


          {/* Right Column: Magic UI 3D Interactive Globe Card */}
          <div className="lg:col-span-6 rounded-[2.5rem] border border-slate-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl min-h-[480px]">
            
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#0052FF] dark:text-cyan-400 uppercase tracking-wider">
                  Global Supply Chain &bull; 24+ Countries
                </span>
                <h3 className="text-2xl font-black text-[#071326] dark:text-white mt-1">
                  Export Corridors from Ceylon
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 text-xs font-mono font-bold text-[#0052FF] dark:text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-[#00D2FF] animate-ping" />
                <span>3D Active</span>
              </div>
            </div>

            {/* Magic UI 3D Interactive Canvas Globe */}
            <div className="relative my-auto flex h-[300px] w-full items-center justify-center overflow-hidden">
              <Globe className="top-0" />
            </div>

            {/* Footer Trade Hub Badges */}
            <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
              <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/80 p-2 border border-slate-100 dark:border-zinc-800">
                <p className="text-[10px] text-slate-400 dark:text-zinc-500">Origin</p>
                <p className="text-xs font-bold text-[#071326] dark:text-white">Colombo WTC</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/80 p-2 border border-slate-100 dark:border-zinc-800">
                <p className="text-[10px] text-slate-400 dark:text-zinc-500">Europe Hub</p>
                <p className="text-xs font-bold text-[#0052FF] dark:text-cyan-400">Rotterdam</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/80 p-2 border border-slate-100 dark:border-zinc-800">
                <p className="text-[10px] text-slate-400 dark:text-zinc-500">Americas Hub</p>
                <p className="text-xs font-bold text-[#059669] dark:text-emerald-400">Long Beach</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/80 p-2 border border-slate-100 dark:border-zinc-800">
                <p className="text-[10px] text-slate-400 dark:text-zinc-500">Asia-Pacific</p>
                <p className="text-xs font-bold text-[#F59E0B]">Tokyo/Sydney</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
