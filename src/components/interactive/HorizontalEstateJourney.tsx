"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { 
  Leaf, 
  Radio, 
  Plane, 
  Droplets, 
  Ship, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Cpu, 
  ShieldCheck,
  CheckCircle2,
  Layers
} from "lucide-react";

interface JourneyStage {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  tagline: string;
  accentColor: string;
  metrics: { label: string; value: string }[];
  description: string;
  features: string[];
  icon: React.ElementType;
}

const STAGES: JourneyStage[] = [
  {
    id: "stage-1",
    stepNumber: "STAGE 01",
    badge: "Underground Substrate Sensing",
    title: "Subterranean Root Intelligence",
    tagline: "Dielectric Capacitance & Micro-Capillaries",
    accentColor: "#059669",
    icon: Leaf,
    description: "Multi-depth stainless steel probes monitor root-zone moisture, electrical conductivity (EC), and temperature inside Hosma Ceylon 100% organic cocopeat slabs at 10cm, 30cm, and 60cm depths.",
    metrics: [
      { label: "Moisture Precision", value: "±1.5% VWC" },
      { label: "Sampling Frequency", value: "Sub-10s" },
      { label: "Water Retention", value: "850% Matrix" },
    ],
    features: [
      "Zero chemical fertilizer leaching into aquifers",
      "Dynamic root temperature gradient monitoring",
      "Instant water stress triggers sent to edge MCU",
    ],
  },
  {
    id: "stage-2",
    stepNumber: "STAGE 02",
    badge: "15km Sub-GHz Radio Mesh",
    title: "LoRaWAN Autonomous Broadcast",
    tagline: "Ultra-Low Power Mountain & Valley Telemetry",
    accentColor: "#00D2FF",
    icon: Radio,
    description: "Encrypted 868/915MHz sub-GHz radio packets penetrate dense tropical mountain tea valleys and coconut canopy, transmitting sensor telemetry across a 15km mesh network with 5+ year solar autonomy.",
    metrics: [
      { label: "Transmission Range", value: "15km Mesh" },
      { label: "Packet Loss Rate", value: "< 0.02%" },
      { label: "AES-128 Encryption", value: "Military Grade" },
    ],
    features: [
      "Indefinite solar supercapacitor energy harvesting",
      "Automatic gateway failover & mesh routing",
      "Sub-50ms cloud pipeline ingestion in Go",
    ],
  },
  {
    id: "stage-3",
    stepNumber: "STAGE 03",
    badge: "Multispectral Drone & Satellite AI",
    title: "YieldAI™ Aerial Canopy Diagnostics",
    tagline: "Computer Vision & NDVI Crop Health Mapping",
    accentColor: "#10E599",
    icon: Plane,
    description: "Sentinel-2 satellite imagery combined with automated 2.1cm/px multispectral drone passes feeds directly into YieldAI neural networks to diagnose fungal outbreaks and nitrogen deficits 14 days before visible.",
    metrics: [
      { label: "Spatial Resolution", value: "2.1cm / px" },
      { label: "Stress Detection", value: "14 Days Early" },
      { label: "Canopy Coverage", value: "500 Acres / Day" },
    ],
    features: [
      "Automated Normalized Difference Vegetation Index (NDVI)",
      "Prescriptive variable-rate fertilizer zoning",
      "Harvest yield forecasts calibrated for Ceylon crops",
    ],
  },
  {
    id: "stage-4",
    stepNumber: "STAGE 04",
    badge: "Closed-Loop Precision Irrigation",
    title: "Autonomous Drip & Solenoid Control",
    tagline: "Vapor Pressure Deficit (VPD) Auto-Pulsing",
    accentColor: "#3B82F6",
    icon: Droplets,
    description: "When soil suction thresholds and atmospheric VPD demand hydration, FieldOS cloud commands wireless solenoid valves to pulse micro-drip fertigation with sub-50ms response, slashing water consumption by 35%.",
    metrics: [
      { label: "Water Conservation", value: "35% Average" },
      { label: "Fertilizer Runoff Cut", value: "-22% Waste" },
      { label: "Valve Response", value: "< 50ms Pulse" },
    ],
    features: [
      "Solar-powered wireless latching solenoid nodes",
      "Closed-loop automated nutrient dosing curves",
      "Fail-safe local override with cellular watchdog",
    ],
  },
  {
    id: "stage-5",
    stepNumber: "STAGE 05",
    badge: "Global Cold-Chain Traceability",
    title: "TraceLink™ Port & Export Ledger",
    tagline: "From Colombo Port to 24+ Global Destinations",
    accentColor: "#F59E0B",
    icon: Ship,
    description: "Every 40ft container of certified low-EC Hosma coconut coir slabs and export crops carries a cryptographic QR passport with real-time IoT temperature, humidity, and chemical purity telemetry for overseas buyers.",
    metrics: [
      { label: "Audit Pass Rate", value: "100% Certified" },
      { label: "Global Reach", value: "24+ Countries" },
      { label: "Container Telemetry", value: "Real-Time 24/7" },
    ],
    features: [
      "Automatic GlobalG.A.P, OMRI & ISO export certificates",
      "Live reefer container temperature & humidity alerts",
      "Direct cryptographic buyer verification portal",
    ],
  },
];

export default function HorizontalEstateJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform vertical travel into horizontal slide: 0% to -80% (for 5 stages)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(STAGES.length - 1, Math.floor(latest * STAGES.length));
    if (step !== activeStepIndex) {
      setActiveStepIndex(step);
    }
  });

  return (
    <section 
      ref={containerRef}
      className="relative h-[380vh] bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 select-none transition-colors duration-300"
    >
      {/* Pinned / Sticky Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 px-4 sm:px-8">
        
        {/* Top Sticky HUD Header */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-30 pt-16 sm:pt-14 pb-4 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-[#059669] dark:text-[#10E599] flex items-center justify-center font-bold">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#059669] dark:text-[#10E599] block">
                Autonomous Agronomy Loop &bull; Landscape Scroll
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                From Soil Micro-Capillaries to Global Export
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white font-bold">
              {STAGES[activeStepIndex].stepNumber} / 05
            </span>
            <span className="text-[11px] text-slate-400 hidden md:inline">
              Scroll down &darr; to slide landscape
            </span>
          </div>
        </div>

        {/* ================= HORIZONTALLY TRANSLATING STAGES TRACK ================= */}
        <div className="relative flex-1 w-full flex items-center overflow-hidden my-4">
          <motion.div 
            style={{ x }} 
            className="flex gap-6 sm:gap-10 pl-2 sm:pl-8 pr-16 items-stretch"
          >
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={stage.id}
                  className="w-[85vw] sm:w-[70vw] lg:w-[58vw] max-w-[850px] shrink-0 h-[480px] sm:h-[520px] rounded-3xl p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-500 border backdrop-blur-2xl glass-card"
                  style={{
                    boxShadow: isActive 
                      ? "0 25px 50px -12px rgba(5, 150, 105, 0.25)" 
                      : "0 10px 30px -4px rgba(7, 19, 38, 0.05)",
                  }}
                >
                  {/* Subtle Background Glow per Stage */}
                  <div 
                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: stage.accentColor }}
                  />

                  {/* Stage Top Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-slate-950 shadow-sm"
                        style={{ backgroundColor: stage.accentColor }}
                      >
                        {stage.stepNumber} &bull; {stage.badge}
                      </span>
                      <div 
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-950 font-bold shadow-md"
                        style={{ backgroundColor: stage.accentColor }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <span className="text-xs font-mono text-slate-400 dark:text-emerald-300/60 font-medium">
                      {stage.tagline}
                    </span>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-1">
                      {stage.title}
                    </h2>

                    <p className="mt-4 text-xs sm:text-sm text-slate-700 dark:text-emerald-100/75 leading-relaxed max-w-2xl font-normal">
                      {stage.description}
                    </p>
                  </div>

                  {/* Middle: 3 Key Metrics Cards */}
                  <div className="grid grid-cols-3 gap-3 my-4">
                    {stage.metrics.map((m, mi) => (
                      <div 
                        key={mi} 
                        className="p-3 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-black/40 border border-slate-200/80 dark:border-emerald-900/30 text-left"
                      >
                        <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-emerald-300/60 block mb-1">
                          {m.label}
                        </span>
                        <span 
                          className="text-sm sm:text-base lg:text-lg font-black font-mono block"
                          style={{ color: stage.accentColor }}
                        >
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom: Feature Bullets & CTA */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-emerald-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1 text-[11px] sm:text-xs text-slate-600 dark:text-emerald-200/80">
                      {stage.features.slice(0, 2).map((feat, fi) => (
                        <div key={fi} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="/solutions"
                      className="gradient-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 shrink-0 hover:scale-105 transition-transform"
                    >
                      <span>Explore Stage Tech</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
