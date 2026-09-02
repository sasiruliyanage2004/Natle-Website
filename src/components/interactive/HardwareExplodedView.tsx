"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Cpu, 
  ShieldCheck, 
  Radio, 
  Leaf, 
  Sliders, 
  ArrowRight, 
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  Maximize2
} from "lucide-react";
import { sound } from "@/lib/sound";

interface LayerDetail {
  id: string;
  name: string;
  shortTitle: string;
  calloutSide: "left" | "right";
  badge: string;
  accentColor: string;
  assembledY: number;
  explodedY: number;
  description: string;
  specs: { label: string; value: string }[];
}

const HARDWARE_LAYERS: LayerDetail[] = [
  {
    id: "solar",
    name: "01. Monocrystalline Solar Micro-Harvester",
    shortTitle: "Solar Energy Cap",
    calloutSide: "left",
    badge: "5+ Year Indefinite Power",
    accentColor: "#F59E0B",
    assembledY: 200,
    explodedY: 70,
    description: "High-efficiency monocrystalline solar disc embedded in an aerospace-grade titanium bezel. Paired with ultra-low ESR supercapacitors, providing indefinite power through continuous tropical cloud cover.",
    specs: [
      { label: "Solar Efficiency", value: "22.8% Monocrystalline" },
      { label: "Energy Autonomy", value: "5+ Years Maintenance-Free" },
      { label: "Optical Coating", value: "Hydrophobic Anti-Dust Quartz" },
    ],
  },
  {
    id: "mcu",
    name: "02. Silicon Logic Core & LoRaWAN Sub-GHz",
    shortTitle: "Silicon Logic & LoRa",
    calloutSide: "right",
    badge: "15km Sub-GHz Mesh",
    accentColor: "#00D2FF",
    assembledY: 235,
    explodedY: 175,
    description: "Multi-layer aerospace green PCB with gold ENIG traces. Features dual-core RISC-V edge silicon, an 868/915MHz LoRaWAN transceiver, and hardware AES-128 cryptographic telemetry vault.",
    specs: [
      { label: "Wireless Protocol", value: "LoRaWAN Class A/C (15km)" },
      { label: "Deep Sleep Current", value: "1.8 µA Ultra-Low Power" },
      { label: "Firmware", value: "Sub-50ms Event-Driven C++" },
    ],
  },
  {
    id: "chassis",
    name: "03. IP68 Hermetic Polycarbonate Sleeve",
    shortTitle: "IP68 Protective Shell",
    calloutSide: "left",
    badge: "Tractor & Chemical Proof",
    accentColor: "#10E599",
    assembledY: 280,
    explodedY: 295,
    description: "Reinforced cylindrical polycarbonate housing with dual food-grade fluoroelastomer O-rings. Built to withstand direct tractor compaction, agrochemical corrosion, and 3-meter water submersion.",
    specs: [
      { label: "Waterproof Standard", value: "IP68 Hermetic (3m Depth)" },
      { label: "Impact Rating", value: "IK09 Industrial Mechanical Shock" },
      { label: "Chemical Seal", value: "100% Acid & Saline Resistant" },
    ],
  },
  {
    id: "prongs",
    name: "04. Stainless Steel 316L Moisture Blades",
    shortTitle: "Capacitance Blades",
    calloutSide: "right",
    badge: "Tri-Depth High Frequency",
    accentColor: "#3B82F6",
    assembledY: 340,
    explodedY: 425,
    description: "Quad 70MHz high-frequency dielectric capacitance prongs with laser depth calibration marks at 10cm (surface), 30cm (feeder roots), and 60cm (taproot) to measure soil moisture, EC, and temperature.",
    specs: [
      { label: "Depth Calibrations", value: "10cm / 30cm / 60cm Ticks" },
      { label: "Conductivity (EC)", value: "0 - 20.0 mS/cm (±0.05 res)" },
      { label: "Moisture Accuracy", value: "±1.5% Volumetric Water Content" },
    ],
  },
  {
    id: "cocopeat",
    name: "05. Hosma Cocopeat & Root Micro-Matrix",
    shortTitle: "Hosma Organic Matrix",
    calloutSide: "left",
    badge: "850% Capillary Hydration",
    accentColor: "#059669",
    assembledY: 430,
    explodedY: 565,
    description: "Triple-washed natural Ceylon organic coconut coir substrate washed to Dutch greenhouse standard (EC < 0.4 mS/cm). Features biological micro-capillaries that absorb 850% water with zero nutrient leaching.",
    specs: [
      { label: "Water Absorption", value: "800% - 900% of Dry Biomass" },
      { label: "Air Porosity", value: "22% - 25% High Root Aeration" },
      { label: "Substrate Purity", value: "OMRI Listed 100% Organic" },
    ],
  },
];

export default function HardwareExplodedView() {
  const [explosion, setExplosion] = useState<number>(0.9); // 0 = Assembled, 1 = Fully Exploded
  const [activeLayer, setActiveLayer] = useState<LayerDetail>(HARDWARE_LAYERS[1]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setExplosion(val);
    sound.playSweep(val);
  };

  const handleSelect = (layer: LayerDetail) => {
    setActiveLayer(layer);
    sound.playClick();
  };

  return (
    <section 
      id="hardware-blueprint" 
      className="relative py-28 md:py-36 bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 select-none overflow-hidden transition-colors duration-300"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial CAD Architecture &bull; Schematics View</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            3D Exploded <span className="gradient-text">Hardware Anatomy.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-700 dark:text-emerald-100/70 leading-relaxed"
          >
            Drag the explosion slider to deconstruct the NATLE LoRaWAN sub-GHz telemetry probe into its precision physical components. Click any layer to inspect industrial specifications.
          </motion.p>
        </div>

        {/* Master Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ================= LEFT 7 COLS: WORLD-CLASS SVG EXPLODED ASSEMBLY CANVAS ================= */}
          <div className="lg:col-span-7 relative h-[680px] sm:h-[760px] rounded-3xl border border-slate-200/90 dark:border-emerald-500/30 bg-slate-950 p-4 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
            
            {/* Top HUD Telemetry Bar */}
            <div className="flex items-center justify-between z-30 text-xs font-mono">
              <div className="flex items-center gap-2 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10E599] animate-pulse" />
                <span className="font-bold tracking-wider">NATLE-PROBE // ISOMETRIC ANATOMY</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 text-[#10E599] font-bold border border-white/15">
                Separation: {Math.round(explosion * 100)}%
              </div>
            </div>

            {/* Central Pure SVG Vector Engineering Canvas */}
            <div className="relative w-full h-full flex items-center justify-center my-2">
              
              {/* Background Coordinate Grid */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#10E599 1px, transparent 1px)",
                  backgroundSize: "32px 32px"
                }}
              />

              {/* Central Laser Guide Rail */}
              <div className="absolute top-6 bottom-6 w-[2px] bg-gradient-to-b from-transparent via-[#10E599]/30 to-transparent pointer-events-none" />

              <svg 
                viewBox="0 0 700 680" 
                className="w-full h-full overflow-visible select-none"
              >
                <defs>
                  {/* Gradients for Physical Materials */}
                  <linearGradient id="solarGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="50%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>

                  <linearGradient id="titaniumBezel" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="50%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>

                  <linearGradient id="goldTraces" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#FCD34D" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>

                  <linearGradient id="steelProngs" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="50%" stopColor="#F8FAFC" />
                    <stop offset="100%" stopColor="#CBD5E1" />
                  </linearGradient>

                  <linearGradient id="cocopeatBlock" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2D1810" />
                    <stop offset="100%" stopColor="#150A05" />
                  </linearGradient>
                </defs>

                {/* ------------------------------------------------------------- */}
                {/* LAYER 1: MONOCRYSTALLINE SOLAR MICRO-HARVESTER               */}
                {/* ------------------------------------------------------------- */}
                {(() => {
                  const l = HARDWARE_LAYERS[0];
                  const y = l.assembledY + (l.explodedY - l.assembledY) * explosion;
                  const isSelected = activeLayer.id === l.id;

                  return (
                    <g 
                      onClick={() => handleSelect(l)}
                      className="cursor-pointer group"
                      style={{ transformOrigin: "350px 340px" }}
                    >
                      {/* Leader Line to Left Tag */}
                      <path 
                        d={`M 260 ${y} L 180 ${y}`} 
                        stroke={isSelected ? "#F59E0B" : "rgba(245,158,11,0.4)"} 
                        strokeWidth={isSelected ? "2" : "1"} 
                        strokeDasharray={isSelected ? "none" : "3 3"}
                      />
                      <circle cx="260" cy={y} r="3" fill="#F59E0B" />

                      {/* Physical Solar Disc Bezel */}
                      <ellipse 
                        cx="350" 
                        cy={y} 
                        rx={isSelected ? "90" : "85"} 
                        ry={isSelected ? "32" : "30"} 
                        fill="url(#titaniumBezel)" 
                        stroke={isSelected ? "#F59E0B" : "#94A3B8"}
                        strokeWidth={isSelected ? "2.5" : "1.5"}
                        filter={isSelected ? "drop-shadow(0 0 20px rgba(245,158,11,0.6))" : "none"}
                      />

                      {/* Inner Solar Photovoltaic Grid */}
                      <ellipse cx="350" cy={y} rx="76" ry="24" fill="url(#solarGlass)" />
                      {/* Hex Solar Grid Wires */}
                      <line x1="310" y1={y - 12} x2="390" y2={y - 12} stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                      <line x1="290" y1={y} x2="410" y2={y} stroke="#38BDF8" strokeWidth="0.8" opacity="0.7" />
                      <line x1="310" y1={y + 12} x2="390" y2={y + 12} stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                      <line x1="330" y1={y - 20} x2="330" y2={y + 20} stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
                      <line x1="370" y1={y - 20} x2="370" y2={y + 20} stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />

                      {/* Solar Center LED */}
                      <circle cx="350" cy={y} r="3.5" fill="#F59E0B" className="animate-pulse" />
                    </g>
                  );
                })()}

                {/* ------------------------------------------------------------- */}
                {/* LAYER 2: SILICON LOGIC CORE & LORAWAN ANTENNA                 */}
                {/* ------------------------------------------------------------- */}
                {(() => {
                  const l = HARDWARE_LAYERS[1];
                  const y = l.assembledY + (l.explodedY - l.assembledY) * explosion;
                  const isSelected = activeLayer.id === l.id;

                  return (
                    <g 
                      onClick={() => handleSelect(l)}
                      className="cursor-pointer group"
                    >
                      {/* Leader Line to Right Tag */}
                      <path 
                        d={`M 445 ${y} L 520 ${y}`} 
                        stroke={isSelected ? "#00D2FF" : "rgba(0,210,255,0.4)"} 
                        strokeWidth={isSelected ? "2" : "1"} 
                        strokeDasharray={isSelected ? "none" : "3 3"}
                      />
                      <circle cx="445" cy={y} r="3" fill="#00D2FF" />

                      {/* Circular Green/Cyan PCB Motherboard */}
                      <ellipse 
                        cx="350" 
                        cy={y} 
                        rx={isSelected ? "95" : "90"} 
                        ry={isSelected ? "34" : "32"} 
                        fill="#064E3B" 
                        stroke={isSelected ? "#00D2FF" : "#10E599"}
                        strokeWidth={isSelected ? "2.5" : "1.5"}
                        filter={isSelected ? "drop-shadow(0 0 25px rgba(0,210,255,0.7))" : "none"}
                      />

                      {/* Gold PCB Edge Pads */}
                      <ellipse cx="350" cy={y} rx="84" ry="26" fill="none" stroke="url(#goldTraces)" strokeWidth="1.5" strokeDasharray="4 2" />

                      {/* Central RISC-V MCU Processor Package */}
                      <rect x="330" y={y - 12} width="40" height="24" rx="4" fill="#0F172A" stroke="#00D2FF" strokeWidth="1" />
                      <text x="350" y={y + 3} textAnchor="middle" fill="#00D2FF" fontSize="8" fontWeight="bold" fontFamily="monospace">RISC-V</text>

                      {/* Sub-GHz Helical Antenna Spire with Animated Waves */}
                      <line x1="415" y1={y - 25} x2="415" y2={y + 5} stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="415" cy={y - 25} r="3" fill="#00D2FF" />
                      {/* Wave Rings */}
                      <ellipse cx="415" cy={y - 25} rx="12" ry="5" fill="none" stroke="#00D2FF" strokeWidth="0.8" opacity="0.7" className="animate-ping" />
                    </g>
                  );
                })()}

                {/* ------------------------------------------------------------- */}
                {/* LAYER 3: IP68 WEATHERPROOF POLYCARBONATE CASING               */}
                {/* ------------------------------------------------------------- */}
                {(() => {
                  const l = HARDWARE_LAYERS[2];
                  const y = l.assembledY + (l.explodedY - l.assembledY) * explosion;
                  const isSelected = activeLayer.id === l.id;

                  return (
                    <g 
                      onClick={() => handleSelect(l)}
                      className="cursor-pointer group"
                    >
                      {/* Leader Line to Left Tag */}
                      <path 
                        d={`M 265 ${y} L 180 ${y}`} 
                        stroke={isSelected ? "#10E599" : "rgba(16,229,153,0.4)"} 
                        strokeWidth={isSelected ? "2" : "1"} 
                        strokeDasharray={isSelected ? "none" : "3 3"}
                      />
                      <circle cx="265" cy={y} r="3" fill="#10E599" />

                      {/* Cylindrical Translucent Polycarbonate Housing */}
                      <g filter={isSelected ? "drop-shadow(0 0 25px rgba(16,229,153,0.6))" : "none"}>
                        {/* Top Rim */}
                        <ellipse cx="350" cy={y - 25} rx="85" ry="24" fill="#0F172A" opacity="0.6" stroke="#10E599" strokeWidth="1" />
                        
                        {/* Cylinder Body */}
                        <path 
                          d={`M 265 ${y - 25} L 265 ${y + 25} A 85 24 0 0 0 435 ${y + 25} L 435 ${y - 25} Z`} 
                          fill="rgba(6, 78, 59, 0.25)" 
                          stroke={isSelected ? "#10E599" : "rgba(16,229,153,0.5)"} 
                          strokeWidth={isSelected ? "2" : "1"}
                        />

                        {/* Dual Amber O-Rings */}
                        <ellipse cx="350" cy={y - 12} rx="84" ry="22" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                        <ellipse cx="350" cy={y + 12} rx="84" ry="22" fill="none" stroke="#F59E0B" strokeWidth="2.5" />

                        {/* Laser-Etched Technical Spec */}
                        <text x="350" y={y + 4} textAnchor="middle" fill="#10E599" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="1.5">
                          IP68 &bull; 15KM &bull; NATLE-AG
                        </text>
                      </g>
                    </g>
                  );
                })()}

                {/* ------------------------------------------------------------- */}
                {/* LAYER 4: STAINLESS STEEL 316L MULTI-DEPTH BLADES              */}
                {/* ------------------------------------------------------------- */}
                {(() => {
                  const l = HARDWARE_LAYERS[3];
                  const y = l.assembledY + (l.explodedY - l.assembledY) * explosion;
                  const isSelected = activeLayer.id === l.id;

                  return (
                    <g 
                      onClick={() => handleSelect(l)}
                      className="cursor-pointer group"
                    >
                      {/* Leader Line to Right Tag */}
                      <path 
                        d={`M 440 ${y} L 520 ${y}`} 
                        stroke={isSelected ? "#3B82F6" : "rgba(59,130,246,0.4)"} 
                        strokeWidth={isSelected ? "2" : "1"} 
                        strokeDasharray={isSelected ? "none" : "3 3"}
                      />
                      <circle cx="440" cy={y} r="3" fill="#3B82F6" />

                      {/* Base Mounting Flange */}
                      <ellipse 
                        cx="350" 
                        cy={y - 20} 
                        rx="80" 
                        ry="22" 
                        fill="#334155" 
                        stroke={isSelected ? "#3B82F6" : "#64748B"} 
                        strokeWidth="1.5" 
                      />

                      {/* 4 Polished Stainless Steel 316L Capacitance Blades */}
                      <g filter={isSelected ? "drop-shadow(0 0 25px rgba(59,130,246,0.7))" : "none"}>
                        {/* Blade 1 (Left - 10cm) */}
                        <path d={`M 295 ${y - 15} L 295 ${y + 35} L 298 ${y + 45} L 301 ${y + 35} L 301 ${y - 15} Z`} fill="url(#steelProngs)" stroke="#94A3B8" strokeWidth="0.8" />
                        <line x1="295" y1={y + 15} x2="301" y2={y + 15} stroke="#3B82F6" strokeWidth="1.5" />

                        {/* Blade 2 (Center-Left - 30cm) */}
                        <path d={`M 330 ${y - 15} L 330 ${y + 55} L 333 ${y + 68} L 336 ${y + 55} L 336 ${y - 15} Z`} fill="url(#steelProngs)" stroke="#94A3B8" strokeWidth="0.8" />
                        <line x1="330" y1={y + 30} x2="336" y2={y + 30} stroke="#3B82F6" strokeWidth="1.5" />

                        {/* Blade 3 (Center-Right - 60cm Deep Taproot) */}
                        <path d={`M 365 ${y - 15} L 365 ${y + 75} L 368 ${y + 90} L 371 ${y + 75} L 371 ${y - 15} Z`} fill="url(#steelProngs)" stroke="#94A3B8" strokeWidth="0.8" />
                        <line x1="365" y1={y + 50} x2="371" y2={y + 50} stroke="#3B82F6" strokeWidth="1.5" />

                        {/* Blade 4 (Right - 10cm) */}
                        <path d={`M 400 ${y - 15} L 400 ${y + 35} L 403 ${y + 45} L 406 ${y + 35} L 406 ${y - 15} Z`} fill="url(#steelProngs)" stroke="#94A3B8" strokeWidth="0.8" />
                        <line x1="400" y1={y + 15} x2="406" y2={y + 15} stroke="#3B82F6" strokeWidth="1.5" />

                        {/* Glowing Electric Capacitance Field Arcs between blades */}
                        <path d={`M 301 ${y + 20} Q 315 ${y + 26} 330 ${y + 20}`} fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 2" className="animate-pulse" />
                        <path d={`M 336 ${y + 35} Q 350 ${y + 42} 365 ${y + 35}`} fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 2" className="animate-pulse" />
                      </g>
                    </g>
                  );
                })()}

                {/* ------------------------------------------------------------- */}
                {/* LAYER 5: HOSMA CEYLON COCOPEAT & ROOT MATRIX                  */}
                {/* ------------------------------------------------------------- */}
                {(() => {
                  const l = HARDWARE_LAYERS[4];
                  const y = l.assembledY + (l.explodedY - l.assembledY) * explosion;
                  const isSelected = activeLayer.id === l.id;

                  return (
                    <g 
                      onClick={() => handleSelect(l)}
                      className="cursor-pointer group"
                    >
                      {/* Leader Line to Left Tag */}
                      <path 
                        d={`M 245 ${y} L 180 ${y}`} 
                        stroke={isSelected ? "#059669" : "rgba(5,150,105,0.4)"} 
                        strokeWidth={isSelected ? "2" : "1"} 
                        strokeDasharray={isSelected ? "none" : "3 3"}
                      />
                      <circle cx="245" cy={y} r="3" fill="#059669" />

                      {/* Organic Substrate Soil Matrix Block */}
                      <g filter={isSelected ? "drop-shadow(0 0 30px rgba(5,150,105,0.7))" : "none"}>
                        {/* Substrate Isometric Slab */}
                        <ellipse cx="350" cy={y - 15} rx="105" ry="32" fill="#382218" stroke={isSelected ? "#10E599" : "#6E473B"} strokeWidth={isSelected ? "2" : "1"} />
                        
                        <path 
                          d={`M 245 ${y - 15} L 245 ${y + 28} A 105 32 0 0 0 455 ${y + 28} L 455 ${y - 15} Z`} 
                          fill="url(#cocopeatBlock)" 
                          stroke={isSelected ? "#10E599" : "#4A2E24"} 
                          strokeWidth={isSelected ? "2" : "1"} 
                        />

                        {/* Golden Plant Root Tendrils Branching in Substrate */}
                        <path d={`M 350 ${y - 10} Q 330 ${y + 10} 310 ${y + 22}`} fill="none" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
                        <path d={`M 350 ${y - 10} Q 370 ${y + 8} 390 ${y + 24}`} fill="none" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
                        <path d={`M 330 ${y + 10} Q 320 ${y + 18} 315 ${y + 26}`} fill="none" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" />

                        {/* Glowing Blue Water Molecules (H2O Capillaries) */}
                        <circle cx="310" cy={y + 5} r="3" fill="#00D2FF" className="animate-ping" />
                        <circle cx="385" cy={y + 12} r="3" fill="#00D2FF" className="animate-ping" />
                        <circle cx="350" cy={y + 18} r="3" fill="#00D2FF" />
                      </g>
                    </g>
                  );
                })()}

              </svg>

              {/* ================= FLOATING TECHNICAL CALLOUT CARDS (LEFT & RIGHT) ================= */}
              {/* These cards sit at fixed positions on the canvas sides with leader lines, ZERO OVERLAPPING! */}
              <div className="absolute inset-0 pointer-events-none flex justify-between p-2 sm:p-4">
                
                {/* Left Side Callout Stack */}
                <div className="flex flex-col justify-around pointer-events-auto h-full py-4 max-w-[170px] sm:max-w-[210px]">
                  {HARDWARE_LAYERS.filter(l => l.calloutSide === "left").map((layer) => {
                    const isSelected = activeLayer.id === layer.id;

                    return (
                      <button
                        key={layer.id}
                        onClick={() => handleSelect(layer)}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-300 backdrop-blur-xl cursor-pointer ${
                          isSelected
                            ? "bg-slate-900/95 border-emerald-400 shadow-[0_0_25px_rgba(16,229,153,0.35)] scale-105"
                            : "bg-slate-900/70 border-white/10 hover:border-white/30 text-slate-400 hover:text-white"
                        }`}
                      >
                        <span 
                          className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider block mb-0.5"
                          style={{ color: layer.accentColor }}
                        >
                          {layer.badge}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                          {layer.shortTitle}
                        </h4>
                      </button>
                    );
                  })}
                </div>

                {/* Right Side Callout Stack */}
                <div className="flex flex-col justify-around pointer-events-auto h-full py-16 max-w-[170px] sm:max-w-[210px]">
                  {HARDWARE_LAYERS.filter(l => l.calloutSide === "right").map((layer) => {
                    const isSelected = activeLayer.id === layer.id;

                    return (
                      <button
                        key={layer.id}
                        onClick={() => handleSelect(layer)}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-300 backdrop-blur-xl cursor-pointer ${
                          isSelected
                            ? "bg-slate-900/95 border-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.35)] scale-105"
                            : "bg-slate-900/70 border-white/10 hover:border-white/30 text-slate-400 hover:text-white"
                        }`}
                      >
                        <span 
                          className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider block mb-0.5"
                          style={{ color: layer.accentColor }}
                        >
                          {layer.badge}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                          {layer.shortTitle}
                        </h4>
                      </button>
                    );
                  })}
                </div>

              </div>

            </div>

            {/* Bottom HUD: Explosion Slider & Stepper Controls */}
            <div className="z-30 bg-slate-900/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Sliders className="w-4 h-4 text-[#10E599]" />
                <span>Explosion Distance:</span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explosion}
                onChange={handleSliderChange}
                className="w-full sm:w-56 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#10E599]"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setExplosion(0);
                    sound.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    explosion === 0 ? "bg-white text-slate-950 shadow-md" : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  Assembled (0%)
                </button>
                <button
                  onClick={() => {
                    setExplosion(1);
                    sound.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    explosion === 1 ? "bg-[#10E599] text-slate-950 shadow-md" : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  Exploded (100%)
                </button>
              </div>
            </div>

          </div>

          {/* ================= RIGHT 5 COLS: COMPONENT SPEC SHEET INSPECTOR ================= */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-200/90 dark:border-emerald-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-slate-950 shadow-sm"
                      style={{ backgroundColor: activeLayer.accentColor }}
                    >
                      {activeLayer.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      CAD Component
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {activeLayer.name}
                  </h3>

                  <p className="mt-4 text-sm text-slate-700 dark:text-emerald-100/75 leading-relaxed font-normal">
                    {activeLayer.description}
                  </p>

                  <div className="mt-8 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-300/60">
                      Engineering &amp; Material Specifications
                    </h4>
                    
                    {activeLayer.specs.map((spec, i) => (
                      <div 
                        key={i} 
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/70 dark:border-emerald-900/30 flex items-center justify-between"
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

                <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-emerald-900/30 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Industrial Pilot Spec
                  </span>
                  
                  <a
                    href="/contact"
                    className="gradient-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>Request Hardware Spec Sheet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
