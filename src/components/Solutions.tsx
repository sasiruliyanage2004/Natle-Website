"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sprout, 
  Cpu, 
  LineChart, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Activity,
  Zap
} from "lucide-react";
import Link from "next/link";

const SOLUTIONS = [
  {
    id: "field-os",
    title: "NATLE FieldOS™",
    tagline: "Centralized Farm & IoT Telemetry Hub",
    description: "Connect all your field sensors, soil probes, weather stations, and automated irrigation valves into a single unified control room.",
    icon: Cpu,
    color: "from-blue-600 to-cyan-500",
    badge: "Hardware & IoT",
    highlights: [
      "Plug-and-play LoRaWAN & GSM soil sensor support",
      "Automated precision drip irrigation triggers",
      "Micro-climate weather forecasting & frost alerts",
      "Offline-first mobile field synchronization"
    ],
    stats: { primary: "35%", label: "Water Usage Reduction" }
  },
  {
    id: "yield-ai",
    title: "NATLE YieldAI™",
    tagline: "Predictive Crop Health & Yield Analytics",
    description: "Computer vision and multispectral satellite imaging detect early disease outbreaks, nutrient deficiencies, and harvest volume weeks in advance.",
    icon: LineChart,
    color: "from-emerald-500 to-teal-600",
    badge: "AI & Machine Learning",
    highlights: [
      "High-resolution NDVI satellite crop health heatmaps",
      "AI pest and fungus detection via mobile camera",
      "Precision harvest date and yield volume forecasting",
      "Variable rate fertilizer prescription maps"
    ],
    stats: { primary: "+24.8%", label: "Average Yield Boost" }
  },
  {
    id: "tracelink",
    title: "NATLE TraceLink™",
    tagline: "Seed-to-Shelf Supply Chain & Export Compliance",
    description: "End-to-end traceability platform enabling commercial growers and exporters to verify sustainability, GlobalG.A.P certifications, and cold chain telemetry.",
    icon: ShieldCheck,
    color: "from-blue-600 to-emerald-500",
    badge: "Enterprise & Cloud",
    highlights: [
      "QR-code batch traceability for international buyers",
      "Automated compliance documentation for EU/US exports",
      "Cold-chain temperature tracking during logistics",
      "Real-time inventory and warehouse management"
    ],
    stats: { primary: "100%", label: "Export Audit Ready" }
  }
];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState(SOLUTIONS[0].id);
  const current = SOLUTIONS.find((s) => s.id === activeTab) || SOLUTIONS[0];

  return (
    <section id="solutions" className="relative bg-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            Proprietary Technology
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Software built specifically for <br className="hidden sm:block" />
            <span className="gradient-text">Modern Agriculture</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Scalable software architecture that bridges the gap between field hardware, predictive AI algorithms, and commercial farm management.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SOLUTIONS.map((sol) => {
            const isActive = activeTab === sol.id;
            const Icon = sol.icon;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 scale-105"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-blue-500"}`} />
                <span>{sol.title}</span>
              </button>
            );
          })}
        </div>

        {/* Solution Details Card */}
        <div className="relative rounded-3xl border border-slate-200/80 bg-slate-50/80 p-8 md:p-12 shadow-xl backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Column: Description */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  {current.badge}
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                  {current.title}
                </h3>
                <p className="text-lg font-semibold text-blue-600 -mt-2">
                  {current.tagline}
                </p>

                <p className="text-base text-slate-600 leading-relaxed">
                  {current.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {current.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex items-center gap-4">
                  <Link
                    href="/solutions"
                    className="gradient-btn px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-md"
                  >
                    <span>Learn Full Architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 rounded-full text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition"
                  >
                    Book Live Demo
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Mockup / Metric Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-7 text-white shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between pb-6 border-b border-slate-700/60">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-bold uppercase tracking-wider text-slate-300">Live Telemetry</span>
                    </div>
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Connected
                    </span>
                  </div>

                  <div className="py-6">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Observed Impact</p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="text-5xl font-extrabold text-white tracking-tight">
                        {current.stats.primary}
                      </span>
                      <span className="text-sm font-medium text-emerald-400">
                        {current.stats.label}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-700/60">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Sync Latency</span>
                      <span className="text-white font-mono font-semibold">12ms (Cloud Edge)</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>IoT Sensor Protocol</span>
                      <span className="text-white font-mono font-semibold">MQTT / TLS 1.3</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Data Accuracy</span>
                      <span className="text-emerald-400 font-mono font-semibold">99.98% Confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
