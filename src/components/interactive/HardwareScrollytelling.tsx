"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Cpu, 
  ShieldCheck, 
  Radio, 
  Leaf, 
  Sparkles, 
  ArrowRight, 
  Layers,
  ChevronDown,
  Eye,
  Scan
} from "lucide-react";
import { sound } from "@/lib/sound";

interface PhaseSpec {
  phaseIndex: number;
  id: string;
  name: string;
  shortTitle: string;
  badge: string;
  accentColor: string;
  depthLabel: string;
  beaconTop: string; // Vertical position on the photorealistic image (percentage)
  description: string;
  specs: { label: string; value: string }[];
}

const PHASES: PhaseSpec[] = [
  {
    phaseIndex: 0,
    id: "solar",
    name: "01. Monocrystalline Solar Micro-Harvester",
    shortTitle: "Solar Energy Cap",
    badge: "5+ Year Perpetual Energy",
    accentColor: "#F59E0B",
    depthLabel: "Altitude: +15cm (Atmosphere)",
    beaconTop: "14%",
    description: "High-efficiency monocrystalline solar disc sealed in an aerospace-grade brushed titanium bezel. Paired with ultra-low ESR supercapacitors to provide perpetual autonomous telemetry through continuous tropical monsoon cloud cover.",
    specs: [
      { label: "Solar Efficiency", value: "22.8% Monocrystalline" },
      { label: "Energy Autonomy", value: "5+ Years Maintenance-Free" },
      { label: "Optical Coating", value: "Hydrophobic Anti-Dust Quartz" },
    ],
  },
  {
    phaseIndex: 1,
    id: "silicon",
    name: "02. Silicon Logic Core & LoRaWAN Sub-GHz Spire",
    shortTitle: "Silicon Logic & LoRa",
    badge: "15km Sub-GHz Mesh",
    accentColor: "#00D2FF",
    depthLabel: "Altitude: +5cm (Edge MCU)",
    beaconTop: "28%",
    description: "Multi-layer aerospace green PCB with gold ENIG traces. Features dual-core RISC-V edge silicon, an 868/915MHz sub-GHz transceiver, and hardware AES-128 cryptographic telemetry vault penetrating dense tea mountain canopies.",
    specs: [
      { label: "Wireless Protocol", value: "LoRaWAN Class A/C (15km)" },
      { label: "Deep Sleep Current", value: "1.8 µA Ultra-Low Power" },
      { label: "Firmware", value: "Sub-50ms Event-Driven C++" },
    ],
  },
  {
    phaseIndex: 2,
    id: "prongs",
    name: "03. Stainless 316L Tri-Depth Capacitance Blades",
    shortTitle: "Capacitance Blades",
    badge: "Tri-Depth High Frequency",
    accentColor: "#3B82F6",
    depthLabel: "Depth: 10cm / 30cm / 60cm",
    beaconTop: "58%",
    description: "Quad 70MHz dielectric capacitance prongs with laser calibration depth markers at 10cm (surface moisture), 30cm (feeder roots), and 60cm (taproot) to measure volumetric soil moisture, EC, and temperature.",
    specs: [
      { label: "Depth Calibrations", value: "10cm / 30cm / 60cm Ticks" },
      { label: "Conductivity (EC)", value: "0 - 20.0 mS/cm (±0.05 res)" },
      { label: "Moisture Accuracy", value: "±1.5% Volumetric Water Content" },
    ],
  },
  {
    phaseIndex: 3,
    id: "cocopeat",
    name: "04. Hosma Ceylon Cocopeat & Root Micro-Matrix",
    shortTitle: "Hosma Organic Matrix",
    badge: "850% Capillary Hydration",
    accentColor: "#059669",
    depthLabel: "Subsoil: -30cm to -80cm",
    beaconTop: "84%",
    description: "Triple-washed natural Ceylon organic coconut coir substrate washed to Dutch greenhouse standards (EC < 0.4 mS/cm). Biological micro-capillaries absorb 850% water with zero nutrient leaching.",
    specs: [
      { label: "Water Absorption", value: "850% of Dry Biomass" },
      { label: "Air-Filled Porosity", value: "22% - 25% High Root Aeration" },
      { label: "Substrate Purity", value: "OMRI Listed 100% Organic" },
    ],
  },
];

export default function HardwareScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [showAnnotated, setShowAnnotated] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track phase crossings with whisper-soft haptic audio
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const p = Math.min(3, Math.floor(latest * 4));
    if (p !== activePhaseIndex) {
      setActivePhaseIndex(p);
      sound.playClick();
    }
  });

  // Photorealistic Camera Zoom & Pan transforms mapped to scroll progress
  // Phase 0 (0-25%): Focus on Solar Cap at the top (scale up, pan down)
  // Phase 1 (25-50%): Focus on Green PCB Logic Core
  // Phase 2 (50-75%): Focus on Stainless Steel Blades
  // Phase 3 (75-100%): Dive deep into the Cocopeat root block at the bottom
  const cameraScale = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [1.15, 1.45, 1.5, 1.45, 1.65]
  );
  
  const cameraY = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    ["18%", "26%", "8%", "-16%", "-32%"]
  );

  const activePhase = PHASES[activePhaseIndex];

  return (
    <section 
      ref={containerRef}
      id="hardware-scrollytelling"
      className="relative h-[360vh] bg-[#F8FAFC] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 select-none transition-colors duration-300"
    >
      {/* Pinned 100vh Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 overflow-hidden">
        
        {/* Background Ambient Bioluminescent Halos */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Top HUD Telemetry Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-30 pt-16 sm:pt-14 pb-3 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-[#059669] dark:text-[#10E599] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#059669] dark:text-[#10E599] block">
                Photorealistic 3D Keynote &bull; Apple Launch Edition
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                NATLE IP68 LoRaWAN Soil Probe &amp; Ceylon Cocopeat
              </h3>
            </div>
          </div>

          {/* Stepper Phase Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {PHASES.map((p, idx) => {
              const isActive = activePhaseIndex === idx;
              return (
                <div
                  key={p.id}
                  className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold transition-all duration-300 border ${
                    isActive 
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-emerald-500 shadow-md scale-105" 
                      : "bg-white/60 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10"
                  }`}
                >
                  <span className="hidden md:inline">0{idx + 1}. </span>
                  <span>{p.shortTitle}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= MAIN 2-COLUMN STAGE ================= */}
        <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center overflow-hidden my-2">
          
          {/* ================= LEFT 7 COLS: PHOTOREALISTIC 3D STUDIO SHOWCASE ================= */}
          {/* Clean, luxury studio background with NO dark blue grid, soft shadows & camera zoom */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-[540px] rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-b from-[#f1f5f9]/90 via-[#e2e8f0]/80 to-[#cbd5e1]/70 dark:from-[#111613] dark:via-[#090e0b] dark:to-[#040605] p-3 sm:p-5 shadow-2xl overflow-hidden flex items-center justify-center">
            
            {/* Soft Ambient Radial Light Studio Glow */}
            <div className="absolute inset-0 bg-radial-[at_50%_40%] from-white/70 via-transparent to-transparent dark:from-emerald-500/10 dark:via-transparent dark:to-transparent pointer-events-none" />

            {/* View Mode Toggle: Clean Studio 3D vs Annotated Blueprint */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 p-1 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-slate-300/80 dark:border-white/15 shadow-sm">
              <button
                onClick={() => setShowAnnotated(false)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  !showAnnotated 
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs" 
                    : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Clean 3D
              </button>
              <button
                onClick={() => setShowAnnotated(true)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  showAnnotated 
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs" 
                    : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Annotated
              </button>
            </div>

            {/* Dynamic Camera Frame that zooms and pans with mouse wheel scroll */}
            <motion.div 
              style={{ 
                scale: cameraScale, 
                y: cameraY,
              }}
              className="relative w-full h-full flex items-center justify-center will-change-transform"
            >
              <div className="relative w-full h-full max-w-[480px] max-h-[500px]">
                <Image
                  src={showAnnotated ? "/images/hardware-exploded-annotated.jpg" : "/images/hardware-exploded-realistic.jpg"}
                  alt="NATLE 3D Exploded Hardware Probe"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                  className="object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-all duration-300 rounded-2xl"
                />

                {/* Pulsing Active Component Beacon / Radar Indicator */}
                {!showAnnotated && (
                  <motion.div
                    key={activePhase.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    style={{ top: activePhase.beaconTop, left: "50%" }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center"
                  >
                    <span 
                      className="absolute w-12 h-12 rounded-full opacity-60 animate-ping"
                      style={{ backgroundColor: activePhase.accentColor }}
                    />
                    <span 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: activePhase.accentColor }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Bottom HUD: Live Depth & Altitude Readout */}
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-xs font-mono flex items-center gap-2 text-slate-900 dark:text-white shadow-sm">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activePhase.accentColor }} />
              <span className="font-bold">{activePhase.depthLabel}</span>
            </div>

          </div>

          {/* ================= RIGHT 5 COLS: DYNAMIC SPEC SHEET INSPECTOR ================= */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-200/90 dark:border-emerald-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-slate-950 shadow-sm"
                      style={{ backgroundColor: activePhase.accentColor }}
                    >
                      {activePhase.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Phase 0{activePhaseIndex + 1} of 04
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {activePhase.name}
                  </h3>

                  <p className="mt-3.5 text-xs sm:text-sm text-slate-700 dark:text-emerald-100/75 leading-relaxed font-normal">
                    {activePhase.description}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-300/60">
                      Engineering &amp; Material Specifications
                    </h4>
                    
                    {activePhase.specs.map((spec, i) => (
                      <div 
                        key={i} 
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/70 dark:border-emerald-900/30 flex items-center justify-between"
                      >
                        <span className="text-xs text-slate-600 dark:text-emerald-300/70 font-medium">
                          {spec.label}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-900 dark:text-[#10E599]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-emerald-900/30 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Scroll down for next phase &darr;
                  </span>
                  
                  <a
                    href="/contact"
                    className="gradient-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>Request Hardware Spec</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Scroll Indicator */}
        <div className="max-w-7xl mx-auto w-full z-30 pb-1 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ChevronDown className="w-4 h-4 text-[#10E599] animate-bounce" />
            <span>Scroll mouse wheel to zoom camera through realistic 3D layers</span>
          </div>
          <div className="text-[11px] text-[#059669] dark:text-[#10E599] font-bold">
            Phase 0{activePhaseIndex + 1} / 04 Active
          </div>
        </div>

      </div>
    </section>
  );
}
