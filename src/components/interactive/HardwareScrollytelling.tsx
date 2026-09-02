"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Cpu, 
  ShieldCheck, 
  Radio, 
  Leaf, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Layers,
  ChevronDown
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
    description: "High-efficiency monocrystalline solar disc sealed in an aerospace-grade titanium bezel. Paired with ultra-low ESR supercapacitors to provide indefinite power through continuous tropical monsoon cloud cover.",
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
    description: "Aerospace green PCB with gold ENIG traces. Features dual-core RISC-V edge silicon, an 868/915MHz sub-GHz transceiver, and hardware AES-128 cryptographic telemetry vault penetrating dense tea mountain canopies.",
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

  // Smooth camera zoom & vertical translation linked to scroll
  // Phase 0: Solar Cap focus (Zoom in top)
  // Phase 1: Silicon Core focus
  // Phase 2: Prongs focus
  // Phase 3: Soil deep dive (Zoom in bottom root matrix)
  const cameraScale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1.15, 1.25, 1.1, 1.2, 1.35]);
  const cameraY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [40, -10, -80, -160, -220]);
  const probeExplosion = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.9, 0.95, 0.85]);

  // Physical SVG Layer Vertical Offsets mapped to scroll
  const solarY = useTransform(probeExplosion, [0, 1], [190, 80]);
  const mcuY = useTransform(probeExplosion, [0, 1], [225, 180]);
  const chassisY = useTransform(probeExplosion, [0, 1], [270, 290]);
  const prongsY = useTransform(probeExplosion, [0, 1], [330, 420]);
  const cocopeatY = useTransform(probeExplosion, [0, 1], [420, 560]);

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
                3D Scrollytelling Assembly &bull; Apple Launch Edition
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                NATLE IP68 Telemetry Probe &amp; Ceylon Substrate
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
          
          {/* LEFT 7 COLS: 3D SCROLL-DRIVEN CAMERA CAD CANVAS */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-[540px] rounded-3xl border border-slate-200/90 dark:border-emerald-500/30 bg-slate-950 p-4 sm:p-6 shadow-2xl overflow-hidden flex items-center justify-center">
            
            {/* Ambient CAD Grid */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#10E599 1px, transparent 1px)",
                backgroundSize: "28px 28px"
              }}
            />

            {/* Central Laser Alignment Rail */}
            <div className="absolute top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#10E599]/35 to-transparent pointer-events-none" />

            {/* Camera Frame that scales and pans with scroll */}
            <motion.div 
              style={{ 
                scale: cameraScale, 
                y: cameraY,
              }}
              className="relative w-full h-full flex items-center justify-center will-change-transform"
            >
              <svg 
                viewBox="0 0 700 680" 
                className="w-full h-full overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="scrollSolarGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="50%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>

                  <linearGradient id="scrollTitanium" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F8FAFC" />
                    <stop offset="50%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>

                  <linearGradient id="scrollGoldTraces" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#FCD34D" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>

                  <linearGradient id="scrollSteelProngs" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="50%" stopColor="#F8FAFC" />
                    <stop offset="100%" stopColor="#CBD5E1" />
                  </linearGradient>

                  <linearGradient id="scrollCocopeatBlock" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2D1810" />
                    <stop offset="100%" stopColor="#150A05" />
                  </linearGradient>
                </defs>

                {/* ------------------------------------------------------------- */}
                {/* 1. SOLAR MICRO-HARVESTER                                      */}
                {/* ------------------------------------------------------------- */}
                <motion.g style={{ y: solarY }}>
                  {/* Titanium Bezel */}
                  <ellipse 
                    cx="350" 
                    cy="0" 
                    rx={activePhaseIndex === 0 ? "95" : "85"} 
                    ry={activePhaseIndex === 0 ? "35" : "30"} 
                    fill="url(#scrollTitanium)" 
                    stroke={activePhaseIndex === 0 ? "#F59E0B" : "#94A3B8"}
                    strokeWidth={activePhaseIndex === 0 ? "3" : "1.5"}
                    filter={activePhaseIndex === 0 ? "drop-shadow(0 0 25px rgba(245,158,11,0.8))" : "none"}
                  />
                  {/* Inner Monocrystalline Photovoltaic Disc */}
                  <ellipse cx="350" cy="0" rx="76" ry="24" fill="url(#scrollSolarGlass)" />
                  {/* Hex Wires */}
                  <line x1="310" y1="-12" x2="390" y2="-12" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                  <line x1="290" y1="0" x2="410" y2="0" stroke="#38BDF8" strokeWidth="0.8" opacity="0.7" />
                  <line x1="310" y1="12" x2="390" y2="12" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                  <circle cx="350" cy="0" r="4" fill="#F59E0B" className="animate-pulse" />
                </motion.g>

                {/* ------------------------------------------------------------- */}
                {/* 2. SILICON LOGIC CORE & LORAWAN TRANSCEIVER                   */}
                {/* ------------------------------------------------------------- */}
                <motion.g style={{ y: mcuY }}>
                  {/* Green PCB */}
                  <ellipse 
                    cx="350" 
                    cy="0" 
                    rx={activePhaseIndex === 1 ? "98" : "90"} 
                    ry={activePhaseIndex === 1 ? "36" : "32"} 
                    fill="#064E3B" 
                    stroke={activePhaseIndex === 1 ? "#00D2FF" : "#10E599"}
                    strokeWidth={activePhaseIndex === 1 ? "3" : "1.5"}
                    filter={activePhaseIndex === 1 ? "drop-shadow(0 0 30px rgba(0,210,255,0.8))" : "none"}
                  />
                  <ellipse cx="350" cy="0" rx="84" ry="26" fill="none" stroke="url(#scrollGoldTraces)" strokeWidth="1.5" strokeDasharray="4 2" />
                  
                  {/* RISC-V Silicon Processor */}
                  <rect x="330" y="-12" width="40" height="24" rx="4" fill="#0F172A" stroke="#00D2FF" strokeWidth="1" />
                  <text x="350" y="3" textAnchor="middle" fill="#00D2FF" fontSize="8" fontWeight="bold" fontFamily="monospace">RISC-V</text>

                  {/* Helical LoRa Antenna Spire with Radiating Electromagnetic Waves */}
                  <line x1="415" y1="-25" x2="415" y2="5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="415" cy="-25" r="3" fill="#00D2FF" />
                  <ellipse cx="415" cy="-25" rx="14" ry="6" fill="none" stroke="#00D2FF" strokeWidth="1" opacity="0.8" className="animate-ping" />
                </motion.g>

                {/* ------------------------------------------------------------- */}
                {/* 3. IP68 HERMETIC SLEEVE                                      */}
                {/* ------------------------------------------------------------- */}
                <motion.g style={{ y: chassisY }}>
                  <ellipse cx="350" cy="-25" rx="85" ry="24" fill="#0F172A" opacity="0.6" stroke="#10E599" strokeWidth="1" />
                  <path 
                    d="M 265 -25 L 265 25 A 85 24 0 0 0 435 25 L 435 -25 Z" 
                    fill="rgba(6, 78, 59, 0.25)" 
                    stroke="rgba(16,229,153,0.5)" 
                    strokeWidth="1" 
                  />
                  <ellipse cx="350" cy="-12" rx="84" ry="22" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                  <ellipse cx="350" cy="12" rx="84" ry="22" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                  <text x="350" y="4" textAnchor="middle" fill="#10E599" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="1.5">
                    IP68 &bull; 15KM &bull; NATLE-AG
                  </text>
                </motion.g>

                {/* ------------------------------------------------------------- */}
                {/* 4. STAINLESS STEEL 316L CAPACITANCE BLADES                    */}
                {/* ------------------------------------------------------------- */}
                <motion.g style={{ y: prongsY }}>
                  <ellipse 
                    cx="350" 
                    cy="-20" 
                    rx="80" 
                    ry="22" 
                    fill="#334155" 
                    stroke={activePhaseIndex === 2 ? "#3B82F6" : "#64748B"} 
                    strokeWidth="1.5" 
                  />
                  <g filter={activePhaseIndex === 2 ? "drop-shadow(0 0 30px rgba(59,130,246,0.8))" : "none"}>
                    {/* 4 Blades with Depth Marks */}
                    <path d="M 295 -15 L 295 35 L 298 45 L 301 35 L 301 -15 Z" fill="url(#scrollSteelProngs)" stroke="#94A3B8" strokeWidth="0.8" />
                    <line x1="295" y1="15" x2="301" y2="15" stroke="#3B82F6" strokeWidth="2" />

                    <path d="M 330 -15 L 330 55 L 333 68 L 336 55 L 336 -15 Z" fill="url(#scrollSteelProngs)" stroke="#94A3B8" strokeWidth="0.8" />
                    <line x1="330" y1="30" x2="336" y2="30" stroke="#3B82F6" strokeWidth="2" />

                    <path d="M 365 -15 L 365 75 L 368 90 L 371 75 L 371 -15 Z" fill="url(#scrollSteelProngs)" stroke="#94A3B8" strokeWidth="0.8" />
                    <line x1="365" y1="50" x2="371" y2="50" stroke="#3B82F6" strokeWidth="2" />

                    <path d="M 400 -15 L 400 35 L 403 45 L 406 35 L 406 -15 Z" fill="url(#scrollSteelProngs)" stroke="#94A3B8" strokeWidth="0.8" />
                    <line x1="400" y1="15" x2="406" y2="15" stroke="#3B82F6" strokeWidth="2" />

                    {/* Glowing Electric Capacitance Arcs */}
                    <path d="M 301 20 Q 315 26 330 20" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" className="animate-pulse" />
                    <path d="M 336 35 Q 350 42 365 35" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" className="animate-pulse" />
                  </g>
                </motion.g>

                {/* ------------------------------------------------------------- */}
                {/* 5. HOSMA COCOPEAT & ROOT MICRO-MATRIX                        */}
                {/* ------------------------------------------------------------- */}
                <motion.g style={{ y: cocopeatY }}>
                  <g filter={activePhaseIndex === 3 ? "drop-shadow(0 0 35px rgba(5,150,105,0.9))" : "none"}>
                    <ellipse cx="350" cy="-15" rx="110" ry="32" fill="#382218" stroke={activePhaseIndex === 3 ? "#10E599" : "#6E473B"} strokeWidth={activePhaseIndex === 3 ? "2.5" : "1"} />
                    <path 
                      d="M 240 -15 L 240 32 A 110 32 0 0 0 460 32 L 460 -15 Z" 
                      fill="url(#scrollCocopeatBlock)" 
                      stroke={activePhaseIndex === 3 ? "#10E599" : "#4A2E24"} 
                      strokeWidth={activePhaseIndex === 3 ? "2" : "1"} 
                    />

                    {/* Plant Root Capillaries */}
                    <path d="M 350 -10 Q 330 10 310 22" fill="none" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 350 -10 Q 370 8 390 24" fill="none" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 330 10 Q 320 18 315 26" fill="none" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Glowing Blue Water Droplets (850% H2O) */}
                    <circle cx="310" cy="5" r="4" fill="#00D2FF" className="animate-ping" />
                    <circle cx="385" cy="12" r="4" fill="#00D2FF" className="animate-ping" />
                    <circle cx="350" cy="18" r="4" fill="#00D2FF" />
                  </g>
                </motion.g>

              </svg>
            </motion.div>

            {/* Bottom HUD: Live Depth & Altitude Readout */}
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activePhase.accentColor }} />
              <span>{activePhase.depthLabel}</span>
            </div>

          </div>

          {/* RIGHT 5 COLS: DYNAMIC SPEC SHEET INSPECTOR */}
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
                    <span>Request CAD Blueprint</span>
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
            <span>Scroll mouse wheel to glide camera and assemble hardware</span>
          </div>
          <div className="text-[11px] text-[#059669] dark:text-[#10E599] font-bold">
            Phase 0{activePhaseIndex + 1} / 04 Active
          </div>
        </div>

      </div>
    </section>
  );
}
