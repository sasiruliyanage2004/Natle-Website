"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    id: "field-os",
    name: "NATLE FieldOS™",
    tagline: "Operating System for Commercial Acreage",
    badge: "Cloud & IoT Edge",
    description: "An enterprise-grade telemetry ingestion engine that bridges thousands of LoRaWAN soil moisture probes, weather stations, and automated drip valves into one centralized command center.",
    features: [
      "Sub-50ms Telemetry Pipeline processing 10,000+ data points/sec",
      "Dynamic VPD (Vapor Pressure Deficit) irrigation triggers",
      "Multi-estate role-based access control and grower permissions",
      "Offline-first PWA sync for remote field agronomists",
    ],
    metric: "35% Average Water Savings",
    techStack: ["Next.js", "Go", "TimescaleDB", "LoRaWAN", "WebSockets"],
  },
  {
    id: "yield-ai",
    name: "NATLE YieldAI™",
    tagline: "Predictive Agronomy & Machine Learning",
    badge: "Computer Vision & AI",
    description: "Multi-modal neural network analyzing satellite multispectral NDVI imaging, weather radar, and root-zone sensor telemetry to predict crop yield and detect biological stress 14 days before visible symptoms.",
    features: [
      "Autonomous Normalized Difference Vegetation Index (NDVI) mapping",
      "Fungal, pest, and root rot early outbreak heatmaps",
      "Predictive harvest scheduling algorithm calibrated for Ceylon crops",
      "Prescriptive automated fertigation dosing curves",
    ],
    metric: "+28.4% Yield Improvement",
    techStack: ["PyTorch", "Sentinel-2 Satellite", "OpenCV", "TensorFlow Lite"],
  },
  {
    id: "tracelink",
    name: "NATLE TraceLink™",
    tagline: "Seed-to-Port Export Compliance Ledger",
    badge: "Enterprise Traceability",
    description: "Cryptographic supply chain verification that guarantees export purity, organic certification standards (OMRI, GlobalG.A.P), and real-time cold chain telemetry for overseas buyers.",
    features: [
      "Consumer and buyer QR-code substrate passport scanning",
      "Immutable Farm-to-Port Sensor Telemetry & Chemical Audit Log",
      "Automatic GlobalG.A.P, OMRI & ISO Export Certificate Generation",
      "Live Reefer Container Temperature & Humidity Telemetry Tracking",
    ],
    metric: "100% Export Audit Pass Rate",
    techStack: ["Cryptographic Proofs", "GlobalG.A.P APIs", "Smart Contracts", "REST"],
  },
];

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300 select-none">
      <BeamsBackground intensity="subtle" className="absolute inset-0 z-0 pointer-events-none" />
      <SmoothCursor />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
              <span>Full-Stack Software Architecture</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] dark:text-white tracking-tight leading-[1.05]"
            >
              Intelligent Software for{" "}
              <span className="gradient-text">
                Every Harvest Stage.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-xl text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed max-w-3xl mx-auto"
            >
              Our trio of proprietary cloud solutions — <strong>FieldOS™</strong>, <strong>YieldAI™</strong>, and <strong>TraceLink™</strong> — turn raw estate telemetry into autonomous, high-yield commercial farming.
            </motion.p>
          </div>
        </section>

        {/* Solutions Deep Dive */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {solutions.map((sol, index) => (
              <motion.div 
                key={sol.id} 
                id={sol.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
                className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-2xl hover:border-emerald-500/50 transition-all overflow-hidden relative z-10 cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  
                  {/* Left Column: Solution Detail */}
                  <div className="lg:col-span-7">
                    <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase">
                      {sol.badge}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-4">{sol.name}</h2>
                    <p className="text-base font-bold text-[#059669] dark:text-[#10E599] mt-1">{sol.tagline}</p>
                    <p className="mt-4 text-base text-slate-600 dark:text-emerald-100/70 leading-relaxed">{sol.description}</p>

                    <div className="mt-8 space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-emerald-300/60">Architectural Highlights</h4>
                      {sol.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-emerald-50">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#10E599] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-emerald-900/30">
                      {sol.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-emerald-950/40 text-[11px] font-mono text-slate-600 dark:text-emerald-200/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Performance Badge & CTA */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 dark:from-[#080d08] dark:to-[#050505] p-8 rounded-3xl text-white shadow-2xl border border-slate-800 dark:border-emerald-900/40 flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#10E599]">Measured Impact</span>
                      <p className="text-4xl font-black text-white mt-2 font-mono">{sol.metric}</p>
                      <p className="text-xs text-slate-400 dark:text-emerald-300/60 mt-2">Verified across commercial coconut and tea estates in Sri Lanka and Europe.</p>
                    </div>

                    <div className="mt-12 pt-6 border-t border-slate-800 dark:border-emerald-900/30">
                      <Link
                        href="/contact"
                        className="w-full gradient-btn flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg hover:scale-105 transition-transform"
                      >
                        <span>Schedule {sol.name} Demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <CTAFooter />
      </div>
    </main>
  );
}
