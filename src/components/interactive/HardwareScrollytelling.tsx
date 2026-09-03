"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Sliders, 
  Activity,
  Maximize2,
  Compass,
  CheckCircle2
} from "lucide-react";
import { sound } from "@/lib/sound";

interface TechCallout {
  id: string;
  name: string;
  detail: string;
  side: "top-right" | "bottom-left";
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  triggerProgress: number; // 0 to 1
  accentColor: string;
}

const CALLOUTS: TechCallout[] = [
  // Top-Right Branch
  {
    id: "solar",
    name: "solar.photovoltaic",
    detail: "22.8% monocrystalline titanium cap",
    side: "top-right",
    x: 280,
    y: 190,
    labelX: 630,
    labelY: 90,
    triggerProgress: 0.15,
    accentColor: "#F59E0B",
  },
  {
    id: "mcu",
    name: "silicon.mcu.riscv",
    detail: "Dual-core 32-bit edge telemetric processor",
    side: "top-right",
    x: 320,
    y: 225,
    labelX: 630,
    labelY: 125,
    triggerProgress: 0.28,
    accentColor: "#00D2FF",
  },
  {
    id: "lora",
    name: "lorawan.868mhz.mesh",
    detail: "15km sub-GHz helical transceiver coil",
    side: "top-right",
    x: 360,
    y: 260,
    labelX: 630,
    labelY: 160,
    triggerProgress: 0.42,
    accentColor: "#10E599",
  },
  {
    id: "casing",
    name: "polycarbonate.sleeve",
    detail: "IK09 impact-resistant transparent housing",
    side: "top-right",
    x: 410,
    y: 300,
    labelX: 630,
    labelY: 195,
    triggerProgress: 0.55,
    accentColor: "#3B82F6",
  },
  {
    id: "armor",
    name: "curved.shield.armor",
    detail: "Agrochemical & UV repellent outer plates",
    side: "top-right",
    x: 460,
    y: 345,
    labelX: 630,
    labelY: 230,
    triggerProgress: 0.68,
    accentColor: "#EC4899",
  },

  // Bottom-Left Branch
  {
    id: "oring",
    name: "fluoroelastomer.o-rings",
    detail: "Dual IP68 hermetic compression seals",
    side: "bottom-left",
    x: 340,
    y: 380,
    labelX: 50,
    labelY: 530,
    triggerProgress: 0.60,
    accentColor: "#F59E0B",
  },
  {
    id: "capacitance",
    name: "capacitance.70mhz",
    detail: "High-frequency soil dielectric resonance",
    side: "bottom-left",
    x: 385,
    y: 425,
    labelX: 50,
    labelY: 565,
    triggerProgress: 0.72,
    accentColor: "#00D2FF",
  },
  {
    id: "blades",
    name: "stainless.316l.blades",
    detail: "Tri-depth 10cm / 30cm / 60cm laser ticks",
    side: "bottom-left",
    x: 430,
    y: 470,
    labelX: 50,
    labelY: 600,
    triggerProgress: 0.82,
    accentColor: "#3B82F6",
  },
  {
    id: "cocopeat",
    name: "hosma.organic.substrate",
    detail: "100% natural washed Ceylon coconut coir",
    side: "bottom-left",
    x: 480,
    y: 520,
    labelX: 50,
    labelY: 635,
    triggerProgress: 0.90,
    accentColor: "#059669",
  },
  {
    id: "hydration",
    name: "micro.capillary.850%",
    detail: "Biological water retention with zero leaching",
    side: "bottom-left",
    x: 520,
    y: 565,
    labelX: 50,
    labelY: 670,
    triggerProgress: 0.95,
    accentColor: "#10E599",
  },
];

export default function HardwareScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCalloutId, setActiveCalloutId] = useState<string>("solar");
  const [manualScrub, setManualScrub] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate effective progress (either from scroll or manual scrubber)
  const [scrollVal, setScrollVal] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollVal(latest);
    // Find active callout matching progress
    const active = CALLOUTS.reduce((prev, curr) => {
      return (latest >= curr.triggerProgress) ? curr : prev;
    }, CALLOUTS[0]);

    if (active.id !== activeCalloutId) {
      setActiveCalloutId(active.id);
      sound.playClick();
    }
  });

  const progress = manualScrub !== null ? manualScrub : scrollVal;

  // 45-Degree Axial Separation Offsets (along isometric vector [-0.7, -0.7])
  // 1. Solar Cap (moves far up-left)
  const solarSeparation = progress * 130;
  // 2. Silicon Logic Core
  const mcuSeparation = progress * 85;
  // 3. LoRa Antenna Coil
  const loraSeparation = progress * 50;
  // 4. Center IP68 Casing (pivot anchor)
  // 5. Outer Armor Shells (explode outward perpendicularly!)
  const armorShellOffset = progress * 65;
  // 6. Stainless Blades (moves down-right)
  const bladesSeparation = progress * 75;
  // 7. Substrate Core (moves far down-right)
  const substrateSeparation = progress * 135;

  const currentCallout = CALLOUTS.find(c => c.id === activeCalloutId) || CALLOUTS[0];

  return (
    <section 
      ref={containerRef}
      id="hardware-scrollytelling"
      className="relative h-[400vh] bg-[#F4F2EC] dark:bg-[#0B0C0E] text-[#18181B] dark:text-[#E4E4E7] select-none transition-colors duration-300"
    >
      {/* Pinned 100vh Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden">
        
        {/* Subtle Architectural Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px"
          }}
        />

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-transparent to-black/5 dark:to-black/40 pointer-events-none" />

        {/* ================= TOP SECTION: ANIME.JS STYLE EDITORIAL HEADER ================= */}
        <div className="relative z-20 max-w-7xl mx-auto w-full pt-10 sm:pt-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[#059669] dark:text-[#10E599] text-[10px] font-mono font-bold tracking-widest uppercase mb-3 border border-black/5 dark:border-white/10"
            >
              <Sparkles className="w-3 h-3" />
              <span>Anime.js Hardware Architecture &bull; 45&deg; Isometric Deconstruction</span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#18181B] dark:text-white">
              The complete <br />
              <span className="text-[#059669] dark:text-[#10E599]">hardware anatomy.</span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-normal leading-relaxed">
              Industrial LoRaWAN telemetry meets precision Ceylon coconut coir substrate. Scroll down or drag the scrubber to deconstruct all 7 mechanical barrels along the central axis.
            </p>
          </div>

          {/* Top Right Mini HUD Lens Display (Inspired by Image 2 & 3) */}
          <div className="hidden sm:flex items-center gap-4 p-3 rounded-2xl bg-white/70 dark:bg-[#15171B]/80 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-lg">
            {/* Circular Reticle Gauge */}
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center p-1 border border-black/10 dark:border-white/20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 dark:text-zinc-800" />
                <circle 
                  cx="20" 
                  cy="20" 
                  r="17" 
                  fill="none" 
                  stroke="#10E599" 
                  strokeWidth="2" 
                  strokeDasharray="106" 
                  strokeDashoffset={106 - 106 * progress}
                  className="transition-all duration-150"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-[9px] font-bold">
                <span>{Math.round(progress * 100)}%</span>
              </div>
            </div>

            <div className="font-mono text-left">
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">Active Barrel</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate max-w-[140px]">
                {currentCallout.name}
              </span>
              <span className="text-[9px] text-[#059669] dark:text-[#10E599]">
                {progress === 0 ? "100% Assembled" : "Exploded State"}
              </span>
            </div>
          </div>
        </div>

        {/* ================= CENTER: 45-DEGREE ISOMETRIC DECONSTRUCTING CAD CANVAS ================= */}
        <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center overflow-visible my-1 sm:my-2">
          
          <svg
            viewBox="0 0 800 700"
            className="w-full h-full max-h-[580px] overflow-visible select-none"
          >
            <defs>
              {/* Knurled Metal & Titanium Shading */}
              <linearGradient id="cadTitanium" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>

              {/* Optical Solar Disc */}
              <linearGradient id="cadSolarPrism" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="60%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>

              {/* Gold Contact Traces */}
              <linearGradient id="cadGoldTraces" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Stainless Steel Prongs */}
              <linearGradient id="cadSteelProngs" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>

              {/* Ceylon Cocopeat Substrate */}
              <linearGradient id="cadCocopeat" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3E2723" />
                <stop offset="100%" stopColor="#1B0F0B" />
              </linearGradient>
            </defs>

            {/* Central 45-Degree Axis Guide Laser Line */}
            <line 
              x1="180" 
              y1="90" 
              x2="620" 
              y2="660" 
              stroke="currentColor" 
              strokeWidth="0.8" 
              strokeDasharray="4 4"
              className="text-slate-300 dark:text-zinc-800 pointer-events-none"
            />

            {/* ------------------------------------------------------------- */}
            {/* 1. TOP SOLAR KNURLED BEZEL & PRISM (Separates Up-Left)        */}
            {/* ------------------------------------------------------------- */}
            <g 
              transform={`translate(${-solarSeparation * 0.7}, ${-solarSeparation * 0.7})`}
              className="cursor-pointer transition-transform duration-75"
              onClick={() => setActiveCalloutId("solar")}
            >
              {/* Outer Knurled Rim with Mechanical Teeth */}
              <ellipse cx="280" cy="190" rx="72" ry="36" fill="url(#cadTitanium)" stroke="currentColor" strokeWidth="1.5" className="text-slate-800 dark:text-slate-300" />
              <ellipse cx="280" cy="198" rx="72" ry="36" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-slate-700 dark:text-slate-400" />
              
              {/* Knurling Serration Lines */}
              {[-50, -35, -20, -5, 10, 25, 40, 55].map((off, i) => (
                <line key={i} x1={280 + off} y1={190 + Math.sin(i) * 12} x2={280 + off} y2={198 + Math.sin(i) * 12} stroke="currentColor" strokeWidth="1" opacity="0.6" />
              ))}

              {/* Photovoltaic Solar Glass Disc */}
              <ellipse cx="280" cy="190" rx="60" ry="28" fill="url(#cadSolarPrism)" stroke="#38BDF8" strokeWidth="0.8" />
              <line x1="240" y1="185" x2="320" y2="185" stroke="#38BDF8" strokeWidth="0.8" opacity="0.7" />
              <line x1="230" y1="192" x2="330" y2="192" stroke="#38BDF8" strokeWidth="0.8" opacity="0.7" />
              <line x1="270" y1="170" x2="270" y2="210" stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
              <circle cx="280" cy="190" r="3.5" fill="#F59E0B" className="animate-pulse" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* 2. SILICON RISC-V PCB & LORAWAN COIL (Separates Up-Left)      */}
            {/* ------------------------------------------------------------- */}
            <g 
              transform={`translate(${-mcuSeparation * 0.7}, ${-mcuSeparation * 0.7})`}
              className="cursor-pointer transition-transform duration-75"
              onClick={() => setActiveCalloutId("mcu")}
            >
              {/* Circular Green PCB Motherboard */}
              <ellipse cx="320" cy="235" rx="68" ry="32" fill="#064E3B" stroke="#10E599" strokeWidth="1.5" />
              {/* Gold Contact Edge Ring */}
              <ellipse cx="320" cy="235" rx="63" ry="28" fill="none" stroke="url(#cadGoldTraces)" strokeWidth="1.2" strokeDasharray="4 2" />

              {/* RISC-V Dual-Core Silicon Chip Package */}
              <rect x="304" y="224" width="32" height="20" rx="3" fill="#0F172A" stroke="#00D2FF" strokeWidth="1" />
              <text x="320" y="238" textAnchor="middle" fill="#00D2FF" fontSize="7" fontWeight="bold" fontFamily="monospace">RISC-V</text>

              {/* Helical LoRa Antenna Coil Spire */}
              <ellipse cx="355" cy="225" rx="14" ry="7" fill="none" stroke="#F59E0B" strokeWidth="1.8" />
              <ellipse cx="355" cy="225" rx="20" ry="10" fill="none" stroke="#00D2FF" strokeWidth="0.8" opacity="0.6" className="animate-ping" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* 3. CENTER CYLINDRICAL POLYCARBONATE IP68 BARREL (Core Anchor) */}
            {/* ------------------------------------------------------------- */}
            <g 
              className="cursor-pointer"
              onClick={() => setActiveCalloutId("casing")}
            >
              {/* Cylindrical Translucent Wall */}
              <path 
                d="M 330 270 L 330 360 A 75 35 0 0 0 480 360 L 480 270 A 75 35 0 0 1 330 270 Z" 
                fill="rgba(5, 150, 105, 0.08)" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="text-slate-800 dark:text-emerald-400/70"
              />

              {/* Dual Orange Silicone O-Rings */}
              <ellipse cx="405" cy="290" rx="74" ry="32" fill="none" stroke="#F59E0B" strokeWidth="3" />
              <ellipse cx="405" cy="340" rx="74" ry="32" fill="none" stroke="#F59E0B" strokeWidth="3" />

              {/* Laser-Etched Serial Text */}
              <text x="405" y="318" textAnchor="middle" fill="#10E599" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                IP68 &bull; NATLE-AG-868
              </text>
            </g>

            {/* ------------------------------------------------------------- */}
            {/* 4. OUTER CURVED ARMOR SHIELD PLATES (Explodes Outward!)       */}
            {/* ------------------------------------------------------------- */}
            {/* Left Outer Shield Plate */}
            <g 
              transform={`translate(${-armorShellOffset * 0.9}, ${armorShellOffset * 0.5})`}
              className="cursor-pointer transition-transform duration-75"
              onClick={() => setActiveCalloutId("armor")}
            >
              <path 
                d="M 280 290 Q 295 320 310 350 L 325 340 Q 310 310 295 280 Z" 
                fill="url(#cadTitanium)" 
                stroke="currentColor" 
                strokeWidth="1.2"
                className="text-slate-700 dark:text-zinc-300"
              />
              <line x1="290" y1="295" x2="305" y2="330" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 2" />
            </g>

            {/* Right Outer Shield Plate */}
            <g 
              transform={`translate(${armorShellOffset * 0.9}, ${-armorShellOffset * 0.5})`}
              className="cursor-pointer transition-transform duration-75"
              onClick={() => setActiveCalloutId("armor")}
            >
              <path 
                d="M 495 280 Q 510 310 525 340 L 510 350 Q 495 320 480 290 Z" 
                fill="url(#cadTitanium)" 
                stroke="currentColor" 
                strokeWidth="1.2"
                className="text-slate-700 dark:text-zinc-300"
              />
              <line x1="492" y1="295" x2="507" y2="330" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 2" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* 5. STAINLESS STEEL 316L PROBE BLADES (Separates Down-Right)   */}
            {/* ------------------------------------------------------------- */}
            <g 
              transform={`translate(${bladesSeparation * 0.7}, ${bladesSeparation * 0.7})`}
              className="cursor-pointer transition-transform duration-75"
              onClick={() => setActiveCalloutId("blades")}
            >
              {/* Base Flange Mounting Plate */}
              <ellipse cx="445" cy="400" rx="66" ry="28" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />

              {/* 4 Multi-Depth Stainless Steel Tines */}
              {/* Blade 1 (10cm) */}
              <path d="M 405 400 L 405 470 L 408 480 L 411 470 L 411 400 Z" fill="url(#cadSteelProngs)" stroke="#64748B" strokeWidth="0.8" />
              <line x1="405" y1="435" x2="411" y2="435" stroke="#3B82F6" strokeWidth="2" />

              {/* Blade 2 (30cm Feeder Root) */}
              <path d="M 430 400 L 430 495 L 433 505 L 436 495 L 436 400 Z" fill="url(#cadSteelProngs)" stroke="#64748B" strokeWidth="0.8" />
              <line x1="430" y1="455" x2="436" y2="455" stroke="#3B82F6" strokeWidth="2" />

              {/* Blade 3 (60cm Deep Taproot) */}
              <path d="M 455 400 L 455 515 L 458 528 L 461 515 L 461 400 Z" fill="url(#cadSteelProngs)" stroke="#64748B" strokeWidth="0.8" />
              <line x1="455" y1="475" x2="461" y2="475" stroke="#3B82F6" strokeWidth="2" />

              {/* Blade 4 (10cm) */}
              <path d="M 480 400 L 480 470 L 483 480 L 486 470 L 486 400 Z" fill="url(#cadSteelProngs)" stroke="#64748B" strokeWidth="0.8" />
              <line x1="480" y1="435" x2="486" y2="435" stroke="#3B82F6" strokeWidth="2" />

              {/* Dielectric Capacitance Waves */}
              <path d="M 411 445 Q 420 452 430 445" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 2" className="animate-pulse" />
              <path d="M 436 465 Q 445 472 455 465" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 2" className="animate-pulse" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* 6. HOSMA ORGANIC CEYLON COCOPEAT BASE (Separates Down-Right) */}
            {/* ------------------------------------------------------------- */}
            <g 
              transform={`translate(${substrateSeparation * 0.7}, ${substrateSeparation * 0.7})`}
              className="cursor-pointer transition-transform duration-75"
              onClick={() => setActiveCalloutId("cocopeat")}
            >
              <ellipse cx="510" cy="495" rx="88" ry="34" fill="#382218" stroke="#6E473B" strokeWidth="1.5" />
              <path 
                d="M 422 495 L 422 550 A 88 34 0 0 0 598 550 L 598 495 Z" 
                fill="url(#cadCocopeat)" 
                stroke="#4A2E24" 
                strokeWidth="1.5" 
              />
              {/* Plant Root Tendrils */}
              <path d="M 510 500 Q 480 525 460 540" fill="none" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 510 500 Q 535 520 560 542" fill="none" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
              {/* Glowing Water Droplets */}
              <circle cx="485" cy="520" r="3.5" fill="#00D2FF" className="animate-ping" />
              <circle cx="535" cy="528" r="3.5" fill="#00D2FF" />
            </g>

            {/* ================= ARCHITECTURAL LEADER LINES (TOP-RIGHT BRANCH) ================= */}
            {CALLOUTS.filter(c => c.side === "top-right").map((callout) => {
              const isVisible = progress >= (callout.triggerProgress - 0.08);
              const isActive = activeCalloutId === callout.id;

              return (
                <g 
                  key={callout.id}
                  onClick={() => setActiveCalloutId(callout.id)}
                  className="cursor-pointer transition-opacity duration-300"
                  style={{ opacity: isVisible ? 1 : 0.25 }}
                >
                  {/* Angled Leader Pointer Path */}
                  <path
                    d={`M ${callout.x} ${callout.y} L ${callout.labelX - 30} ${callout.labelY} L ${callout.labelX} ${callout.labelY}`}
                    fill="none"
                    stroke={isActive ? callout.accentColor : "currentColor"}
                    strokeWidth={isActive ? "1.8" : "0.8"}
                    strokeDasharray={isActive ? "none" : "3 3"}
                    className="text-slate-400 dark:text-zinc-600"
                  />
                  <circle cx={callout.x} cy={callout.y} r="3" fill={callout.accentColor} />

                  {/* Label Text */}
                  <text
                    x={callout.labelX + 8}
                    y={callout.labelY + 4}
                    fill={isActive ? callout.accentColor : "currentColor"}
                    fontSize="11"
                    fontWeight={isActive ? "bold" : "normal"}
                    fontFamily="var(--font-mono), monospace"
                    className="text-slate-800 dark:text-zinc-300"
                  >
                    {callout.name}
                  </text>
                </g>
              );
            })}

            {/* ================= ARCHITECTURAL LEADER LINES (BOTTOM-LEFT BRANCH) ================= */}
            {CALLOUTS.filter(c => c.side === "bottom-left").map((callout) => {
              const isVisible = progress >= (callout.triggerProgress - 0.08);
              const isActive = activeCalloutId === callout.id;

              return (
                <g 
                  key={callout.id}
                  onClick={() => setActiveCalloutId(callout.id)}
                  className="cursor-pointer transition-opacity duration-300"
                  style={{ opacity: isVisible ? 1 : 0.25 }}
                >
                  {/* Angled Leader Pointer Path */}
                  <path
                    d={`M ${callout.x} ${callout.y} L ${callout.labelX + 170} ${callout.labelY} L ${callout.labelX + 140} ${callout.labelY}`}
                    fill="none"
                    stroke={isActive ? callout.accentColor : "currentColor"}
                    strokeWidth={isActive ? "1.8" : "0.8"}
                    strokeDasharray={isActive ? "none" : "3 3"}
                    className="text-slate-400 dark:text-zinc-600"
                  />
                  <circle cx={callout.x} cy={callout.y} r="3" fill={callout.accentColor} />

                  {/* Label Text */}
                  <text
                    x={callout.labelX + 130}
                    y={callout.labelY + 4}
                    textAnchor="end"
                    fill={isActive ? callout.accentColor : "currentColor"}
                    fontSize="11"
                    fontWeight={isActive ? "bold" : "normal"}
                    fontFamily="var(--font-mono), monospace"
                    className="text-slate-800 dark:text-zinc-300"
                  >
                    {callout.name}
                  </text>
                </g>
              );
            })}

          </svg>

        </div>

        {/* ================= BOTTOM BAR: ANIME.JS STYLE RULER SCRUBBER (IMAGE 5 STYLE) ================= */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {/* Active Callout Detail Badge */}
          <div className="flex items-center gap-3">
            <span 
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: currentCallout.accentColor }}
            />
            <span className="font-mono text-xs font-bold text-[#18181B] dark:text-white">
              {currentCallout.name}:
            </span>
            <span className="text-xs text-slate-600 dark:text-zinc-400 font-normal">
              {currentCallout.detail}
            </span>
          </div>

          {/* Anime.js Iconic Linear Tick Ruler Scrubber (Exact match to Images 4 & 5!) */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden md:inline">
              Deconstruction Scrub:
            </span>

            {/* Scrubber Capsule */}
            <div 
              className="relative flex items-center h-9 px-3 rounded-full bg-[#18181B] text-white border border-black/10 dark:border-white/15 shadow-xl select-none cursor-ew-resize"
              onMouseMove={(e) => {
                if (e.buttons === 1) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const val = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  setManualScrub(val);
                }
              }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const val = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                setManualScrub(val);
                sound.playClick();
              }}
            >
              {/* Vertical Tick Marks */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span 
                    key={i}
                    className={`w-[1px] rounded-full transition-colors ${
                      i % 5 === 0 
                        ? "h-4 bg-zinc-400" 
                        : "h-2.5 bg-zinc-600"
                    }`}
                  />
                ))}
              </div>

              {/* Red/Emerald Active Needle Indicator */}
              <motion.div 
                style={{ 
                  left: `calc(12px + ${progress * (100 - 15)}%)` 
                }}
                className="absolute top-1.5 bottom-1.5 w-[2px] bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.9)]"
              />
            </div>

            {/* Reset to Scroll Auto Mode */}
            {manualScrub !== null && (
              <button
                onClick={() => setManualScrub(null)}
                className="text-[10px] font-mono font-bold text-[#059669] hover:underline cursor-pointer"
              >
                Auto Scroll
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
