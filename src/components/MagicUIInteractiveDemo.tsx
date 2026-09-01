"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Activity, 
  Leaf, 
  Radio, 
  Globe2, 
  ShieldCheck, 
  Zap, 
  CheckCircle2,
  Terminal,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoTab {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  metrics: { label: string; value: string; trend: string }[];
  logs: string[];
  visualTag: string;
}

const tabs: DemoTab[] = [
  {
    id: "fieldos",
    title: "FieldOS™ Real-Time Telemetry",
    badge: "15km Wireless LoRaWAN",
    subtitle: "Autonomous root-zone moisture, electrical conductivity (EC), and soil temperature monitoring.",
    metrics: [
      { label: "Volumetric Water Content (VWC)", value: "38.2%", trend: "+2.4% Optimal" },
      { label: "Substrate Salinity (EC)", value: "0.85 mS/cm", trend: "Low-EC Certified" },
      { label: "Mesh Ingestion Latency", value: "34 ms", trend: "99.99% Uptime" },
    ],
    logs: [
      "[08:14:02] LoRaWAN Node #042 ping -> Gateway WTC-Colombo: RSSI -72dBm",
      "[08:14:03] Depth 15cm VWC = 38.2% | Target threshold achieved",
      "[08:14:04] Valve #08 Solenoid closed. Water conserved: 1,420 L/day",
    ],
    visualTag: "Telemetry Active",
  },
  {
    id: "yieldai",
    title: "YieldAI™ Neural Yield Engine",
    badge: "Machine Learning Predictor",
    subtitle: "Convolutional neural forecasting trained on 14,000+ hectares of tropical plantation cycles.",
    metrics: [
      { label: "Harvest Forecasting Accuracy", value: "98.7%", trend: "Calibrated" },
      { label: "Brix Sugar Index Boost", value: "+28.4%", trend: "Commercial High" },
      { label: "Fertilizer Runoff Reduction", value: "-42.0%", trend: "OMRI Compliant" },
    ],
    logs: [
      "[08:14:10] Sentinel-2 NDVI Revisit Ingested: Band 8 NIR reflectance = 0.84",
      "[08:14:11] Running 5-day predictive growth tensor model...",
      "[08:14:12] YieldAI: Expected fruit set volume +28.4% by Q4 harvest",
    ],
    visualTag: "Neural Model Live",
  },
  {
    id: "hosma",
    title: "Hosma Organic Substrate Matrix",
    badge: "100% Organic Ceylon Coir",
    subtitle: "Pristine triple-washed coconut substrates engineered for optimal cation exchange capacity.",
    metrics: [
      { label: "Air Filled Porosity (AFP)", value: "22.5%", trend: "Root Oxygen High" },
      { label: "Substrate pH Equilibrium", value: "6.2 pH", trend: "Microbial Buffer" },
      { label: "Compressed Block Expansion", value: "75 Liters", trend: "Per 5kg Block" },
    ],
    logs: [
      "[08:14:20] Batch #LK-9942 quality verified: Triple washed low potassium",
      "[08:14:21] Phytosanitary clearance issued by Colombo Port Authority",
      "[08:14:22] Shipped in 40ft High-Cube container fleet to Rotterdam",
    ],
    visualTag: "Substrate Active",
  },
  {
    id: "tracelink",
    title: "TraceLink™ Cryptographic Export Passports",
    badge: "European ESG & Customs",
    subtitle: "End-to-end chain-of-custody verification ensuring zero-chemical compliance at international borders.",
    metrics: [
      { label: "Global Port Clearance Speed", value: "< 2 Hours", trend: "Zero Customs Hold" },
      { label: "GlobalG.A.P Audit Score", value: "100%", trend: "A-Grade Pass" },
      { label: "Carbon Offset Verification", value: "-148 MT", trend: "Net Carbon Negative" },
    ],
    logs: [
      "[08:14:30] Immutable batch record #CX-8802 signed with SHA-256 hash",
      "[08:14:31] EU Import Standard (Reg 2026/41) verified by Port of Antwerp",
      "[08:14:32] Digital phytosanitary certificate downloaded by European buyer",
    ],
    visualTag: "Blockchain Verified",
  },
];

export default function MagicUIInteractiveDemo() {
  const [activeTab, setActiveTab] = useState<string>("fieldos");
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80 dark:border-white/10 overflow-hidden bg-white/50 dark:bg-[#030712]/60 select-none">
      
      {/* CodeForge-style Corner Crosshair Markers */}
      <div className="absolute top-0 left-6 text-slate-300 dark:text-slate-700 font-mono text-xs">+</div>
      <div className="absolute top-0 right-6 text-slate-300 dark:text-slate-700 font-mono text-xs">+</div>
      <div className="absolute bottom-0 left-6 text-slate-300 dark:text-slate-700 font-mono text-xs">+</div>
      <div className="absolute bottom-0 right-6 text-slate-300 dark:text-slate-700 font-mono text-xs">+</div>

      <div className="mx-auto max-w-7xl">
        
        {/* Section Header with Scroll-driven Blur Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0052FF] dark:text-[#38bdf8] mb-4 shadow-sm backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Simulator &bull; CodeForge Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#071326] dark:text-white leading-tight">
            Next-Gen Agricultural Intelligence <br />
            <span className="font-serif italic font-normal text-gradient">
              in Live Simulation.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
            Switch between real-time telemetry layers, neural forecasting models, and organic Ceylon substrate analytics.
          </p>
        </motion.div>


        {/* Interactive Tab Switcher Strip (CodeForge Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-slate-200/90 dark:border-white/15 bg-white/90 dark:bg-slate-900/90 p-1.5 shadow-xl backdrop-blur-2xl mb-8">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer",
                  isActive
                    ? "bg-gradient-to-r from-[#0052FF] to-[#00D2FF] text-white shadow-lg scale-[1.02] z-10"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                )}
              >
                <span className="truncate">{tab.title.split(" ")[0]}</span>
                <span className="text-[10px] font-normal opacity-85 mt-0.5 hidden sm:inline-block truncate">
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>


        {/* Live Simulation Card Canvas (CodeForge Interactive Preview) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-[2.5rem] border border-slate-200/90 dark:border-white/15 bg-white/95 dark:bg-slate-950/90 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Metrics & Architecture Overview */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-3 py-1 text-xs font-mono font-bold text-[#059669] dark:text-[#10E599]">
                    <span className="h-2 w-2 rounded-full bg-[#10E599] animate-ping" />
                    <span>{currentTab.visualTag}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    &bull; Real-Time Ingestion
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#071326] dark:text-white leading-tight">
                  {currentTab.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                  {currentTab.subtitle}
                </p>

                {/* 3 Live Metric Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-white/10">
                  {currentTab.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 p-4 transition-all hover:border-[#0052FF]/40"
                    >
                      <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase truncate">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-black text-[#071326] dark:text-white mt-1">
                        {metric.value}
                      </p>
                      <p className="text-[11px] font-mono font-bold text-[#059669] dark:text-[#10E599] mt-0.5">
                        {metric.trend}
                      </p>
                    </div>
                  ))}
                </div>

              </div>


              {/* Right Column: High-Tech Live Stream Terminal */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-800 bg-[#040D1E] p-5 shadow-2xl text-white font-mono text-xs">
                  
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[10px] text-slate-400 ml-2 font-bold">fieldos-daemon.sh</span>
                    </div>
                    <span className="text-[10px] text-[#10E599] font-bold">● LIVE</span>
                  </div>

                  {/* Terminal Code Logs */}
                  <div className="flex flex-col gap-2.5 py-2 text-slate-300">
                    {currentTab.logs.map((log, index) => (
                      <div key={index} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#00D2FF] select-none">&gt;</span>
                        <span className="text-[11px]">{log}</span>
                      </div>
                    ))}
                  </div>

                  {/* Live Status Pill */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Protocol: LoRaWAN 1.0.4 / MQTT</span>
                    <span className="text-[#00D2FF]">Sub-50ms Stream</span>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
