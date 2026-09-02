"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Sun, 
  Cpu, 
  ShieldCheck, 
  Radio, 
  Leaf, 
  Sliders, 
  ArrowRight, 
  Layers, 
  Sparkles,
  Droplets,
  Zap,
  Activity
} from "lucide-react";
import { sound } from "@/lib/sound";

interface LayerData {
  id: string;
  name: string;
  category: string;
  badge: string;
  accentColor: string;
  depthOffset: number; // Y separation in px when fully exploded
  description: string;
  specs: { label: string; value: string }[];
}

const LAYERS: LayerData[] = [
  {
    id: "solar-cap",
    name: "Layer 1: Micro-Solar Panel & Aerospace Cap",
    category: "Energy Harvesting",
    badge: "5+ Year Autonomous Energy",
    accentColor: "#F59E0B",
    depthOffset: -180,
    description: "Monocrystalline silicon solar dome with anti-reflective nanocoating and ultra-low ESR supercapacitors. Generates continuous power even through thick tropical monsoon canopy cover.",
    specs: [
      { label: "Solar Efficiency", value: "22.8% Monocrystalline" },
      { label: "Energy Autonomy", value: "5+ Years Maintenance-Free" },
      { label: "Operating Temp", value: "-15°C to +70°C Tropical" },
    ],
  },
  {
    id: "silicon-mcu",
    name: "Layer 2: Dual-Core Silicon & LoRaWAN Radio",
    category: "Edge Computing",
    badge: "15km Sub-GHz Mesh",
    accentColor: "#00D2FF",
    depthOffset: -90,
    description: "Ultra-low-power industrial MCU paired with an 868/915MHz sub-GHz LoRaWAN transceiver and AES-128 cryptographic telemetry vault. Awakens from 1.8µA sleep in sub-10ms.",
    specs: [
      { label: "Wireless Range", value: "Up to 15km Line-of-Sight" },
      { label: "Sleep Current", value: "1.8 µA Ultra-Low Power" },
      { label: "Latency", value: "< 45ms Ingestion to FieldOS" },
    ],
  },
  {
    id: "chassis-shell",
    name: "Layer 3: IP68 Hermetic Aerospace Casing",
    category: "Protective Shell",
    badge: "Tractor & Chemical Proof",
    accentColor: "#10E599",
    depthOffset: 0,
    description: "UV-stabilized polycarbonate chassis with dual food-grade silicone hermetic O-rings. Built to withstand direct tractor compaction, agrochemical acid sprays, and 3-meter water submersion.",
    specs: [
      { label: "Waterproof Standard", value: "IP68 Submersible (3m Depth)" },
      { label: "Impact Rating", value: "IK09 Industrial Mechanical Shock" },
      { label: "Corrosion Seal", value: "100% Acid & Saline Proof" },
    ],
  },
  {
    id: "stainless-prongs",
    name: "Layer 4: Stainless Steel 316L Multi-Depth Blades",
    category: "Capacitance Sensing",
    badge: "Tri-Depth High Frequency",
    accentColor: "#3B82F6",
    depthOffset: 90,
    description: "Quad 70MHz high-frequency dielectric capacitance prongs calibrated for 10cm (surface mat), 30cm (feeder zone), and 60cm (taproot) moisture, EC, and root-zone temperature.",
    specs: [
      { label: "Depth Intervals", value: "10cm / 30cm / 60cm Calibrated" },
      { label: "Conductivity (EC)", value: "0 - 20.0 mS/cm (±0.05 res)" },
      { label: "VWC Accuracy", value: "±1.5% Volumetric Water Content" },
    ],
  },
  {
    id: "cocopeat-soil",
    name: "Layer 5 (Underground): Hosma Cocopeat & Root Matrix",
    category: "Substrate Physics",
    badge: "Micro-Capillary Hydration",
    accentColor: "#059669",
    depthOffset: 180,
    description: "Natural Ceylon organic coconut coir substrate washed to Dutch greenhouse EC (<0.4 mS/cm). Features biological micro-capillaries providing 850% water absorption with zero fertilizer leaching.",
    specs: [
      { label: "Water Retention", value: "800% - 900% of Dry Biomass" },
      { label: "Air Porosity", value: "22% - 25% Optimum Root Aeration" },
      { label: "Substrate Purity", value: "OMRI Listed 100% Organic" },
    ],
  },
];

export default function HardwareExplodedView() {
  const [explosionRatio, setExplosionRatio] = useState<number>(0.85); // 0 = fully assembled, 1 = fully exploded
  const [activeLayer, setActiveLayer] = useState<LayerData>(LAYERS[1]);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setExplosionRatio(val);
    sound.playSweep(val);
  };

  const handleLayerSelect = (layer: LayerData) => {
    setActiveLayer(layer);
    sound.playClick();
  };

  return (
    <section 
      id="hardware-blueprint" 
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 select-none overflow-hidden transition-colors duration-300"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

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
            <span>Physical Hardware Architecture &bull; Schematics</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            3D Exploded <span className="gradient-text">Hardware Blueprint.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-100/70 leading-relaxed"
          >
            Scroll or drag the slider below to deconstruct NATLE&apos;s IP68 LoRaWAN Soil Probe into its physical aerospace components and inspect how silicon logic interacts with Hosma Ceylon organic root physics.
          </motion.p>
        </div>

        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ================= LEFT COLUMN: PHYSICAL 3D EXPLODED SVG PROBE ================= */}
          <div className="lg:col-span-7 relative h-[620px] sm:h-[720px] rounded-3xl border border-slate-200/80 dark:border-emerald-500/30 bg-slate-950 p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
            
            {/* Top HUD Telemetry */}
            <div className="flex items-center justify-between z-20 text-xs font-mono">
              <div className="flex items-center gap-2 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10E599] animate-pulse" />
                <span className="font-bold">NATLE-PROBE-V4 // EXPLODED SCHEMATICS</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 text-[#10E599] font-bold border border-white/10">
                Separation: {Math.round(explosionRatio * 100)}%
              </div>
            </div>

            {/* Central 3D Exploded Physical Canvas */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Technical Blueprint Grid Lines */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#10E599 1px, transparent 1px)",
                  backgroundSize: "28px 28px"
                }}
              />

              {/* Central Laser Alignment Line */}
              <div className="absolute top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-[#10E599]/40 to-transparent pointer-events-none" />

              {/* LAYER 1: MONOCRYSTALLINE SOLAR MICRO-HARVESTER */}
              <motion.div
                animate={{ y: LAYERS[0].depthOffset * explosionRatio }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => handleLayerSelect(LAYERS[0])}
                className="absolute z-50 cursor-pointer group flex flex-col items-center"
              >
                {/* Visual Graphic: Hex Solar Cell Cap */}
                <div className={`relative w-44 sm:w-56 h-16 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center p-3 shadow-xl backdrop-blur-md ${
                  activeLayer.id === LAYERS[0].id
                    ? "bg-amber-950/90 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.5)] scale-105"
                    : "bg-slate-900/90 border-amber-500/40 hover:border-amber-400"
                }`}>
                  {/* Solar Hex Texture */}
                  <div className="absolute inset-2 border border-amber-400/30 rounded-xl flex items-center justify-center gap-1.5 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 rotate-45" />
                    <div className="w-8 h-8 rounded-lg bg-amber-500/30 border border-amber-500/40 rotate-45" />
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 rotate-45" />
                  </div>
                  <div className="relative z-10 flex items-center gap-2 text-white font-mono text-xs font-bold">
                    <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                    <span>01. Solar Cap</span>
                  </div>
                </div>
                {/* Pointer Tag */}
                <span className="mt-1 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  Aerospace Solar Bezel
                </span>
              </motion.div>


              {/* LAYER 2: SILICON LOGIC BOARD & LORAWAN ANTENNA */}
              <motion.div
                animate={{ y: LAYERS[1].depthOffset * explosionRatio }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => handleLayerSelect(LAYERS[1])}
                className="absolute z-40 cursor-pointer group flex flex-col items-center"
              >
                {/* Visual Graphic: Emerald Circuit PCB */}
                <div className={`relative w-52 sm:w-64 h-20 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between px-5 shadow-xl backdrop-blur-md ${
                  activeLayer.id === LAYERS[1].id
                    ? "bg-slate-900/95 border-[#00D2FF] shadow-[0_0_40px_rgba(0,210,255,0.45)] scale-105"
                    : "bg-slate-900/85 border-cyan-500/30 hover:border-cyan-400"
                }`}>
                  {/* Gold Circuit Traces & Microcontroller */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-inner">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 block font-bold">STM32 / LoRa RF</span>
                      <span className="text-xs font-bold text-white">Silicon Logic Core</span>
                    </div>
                  </div>

                  {/* Helical LoRaWAN Antenna with Pulse Rings */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-7 h-7 rounded-full bg-cyan-400/20 animate-ping" />
                    <Radio className="w-5 h-5 text-cyan-400 relative z-10" />
                  </div>
                </div>
                <span className="mt-1 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  LoRaWAN 15km Sub-GHz
                </span>
              </motion.div>


              {/* LAYER 3: IP68 WEATHERPROOF ENCLOSURE */}
              <motion.div
                animate={{ y: LAYERS[2].depthOffset * explosionRatio }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => handleLayerSelect(LAYERS[2])}
                className="absolute z-30 cursor-pointer group flex flex-col items-center"
              >
                {/* Visual Graphic: Cylindrical Translucent Polycarbonate Housing */}
                <div className={`relative w-48 sm:w-60 h-22 rounded-3xl border-2 transition-all duration-300 flex items-center justify-center p-3 shadow-xl backdrop-blur-md ${
                  activeLayer.id === LAYERS[2].id
                    ? "bg-slate-900/95 border-[#10E599] shadow-[0_0_35px_rgba(16,229,153,0.45)] scale-105"
                    : "bg-slate-900/80 border-emerald-500/30 hover:border-emerald-400"
                }`}>
                  {/* Silicone O-Ring Bands */}
                  <div className="absolute top-2 left-4 right-4 h-1 bg-amber-500/70 rounded-full" />
                  <div className="absolute bottom-2 left-4 right-4 h-1 bg-amber-500/70 rounded-full" />
                  
                  <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
                    <ShieldCheck className="w-5 h-5 text-[#10E599]" />
                    <span>03. IP68 Hermetic Shell</span>
                  </div>
                </div>
                <span className="mt-1 text-[10px] font-mono font-bold text-[#10E599] uppercase tracking-widest">
                  Tractor &amp; Acid Proof
                </span>
              </motion.div>


              {/* LAYER 4: STAINLESS STEEL MULTI-DEPTH BLADES */}
              <motion.div
                animate={{ y: LAYERS[3].depthOffset * explosionRatio }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => handleLayerSelect(LAYERS[3])}
                className="absolute z-20 cursor-pointer group flex flex-col items-center"
              >
                {/* Visual Graphic: 4 Capacitance Stainless Steel Blades */}
                <div className={`relative w-56 sm:w-72 h-20 rounded-2xl border-2 transition-all duration-300 flex items-center justify-around px-4 shadow-xl backdrop-blur-md ${
                  activeLayer.id === LAYERS[3].id
                    ? "bg-slate-900/95 border-blue-400 shadow-[0_0_35px_rgba(59,130,246,0.45)] scale-105"
                    : "bg-slate-900/80 border-blue-500/30 hover:border-blue-400"
                }`}>
                  {/* 4 Blades with Depth Calibration Ticks */}
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-12 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-200 rounded-b-md shadow-md" />
                    <span className="text-[9px] font-mono text-blue-300 font-bold mt-1">10cm</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-14 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-200 rounded-b-md shadow-md" />
                    <span className="text-[9px] font-mono text-blue-300 font-bold mt-1">30cm</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-16 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-200 rounded-b-md shadow-md" />
                    <span className="text-[9px] font-mono text-blue-300 font-bold mt-1">60cm</span>
                  </div>
                </div>
                <span className="mt-1 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                  Stainless 316L Moisture Probes
                </span>
              </motion.div>


              {/* LAYER 5: UNDERGROUND HOSMA COCOPEAT & PLANT ROOTS */}
              <motion.div
                animate={{ y: LAYERS[4].depthOffset * explosionRatio }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => handleLayerSelect(LAYERS[4])}
                className="absolute z-10 cursor-pointer group flex flex-col items-center"
              >
                {/* Visual Graphic: Organic Substrate Slab with Root Filaments & Water Drops */}
                <div className={`relative w-64 sm:w-80 h-22 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between px-6 shadow-2xl backdrop-blur-md ${
                  activeLayer.id === LAYERS[4].id
                    ? "bg-[#1b1008] border-[#059669] shadow-[0_0_40px_rgba(5,150,105,0.5)] scale-105"
                    : "bg-[#140b05] border-emerald-900/60 hover:border-emerald-500/60"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#10E599] flex items-center justify-center border border-emerald-500/30">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold block">100% Organic Ceylon Coir</span>
                      <span className="text-xs font-bold text-white">Hosma Substrate Matrix</span>
                    </div>
                  </div>

                  {/* Pulsing Water Molecule Drops (H2O) */}
                  <div className="flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-cyan-400 animate-bounce" />
                    <span className="text-[11px] font-mono font-bold text-cyan-300">850% H₂O</span>
                  </div>
                </div>
                <span className="mt-1 text-[10px] font-mono font-bold text-[#10E599] uppercase tracking-widest">
                  Micro-Capillary Root Zone
                </span>
              </motion.div>

            </div>

            {/* Bottom HUD: Explosion Slider & Controls */}
            <div className="z-20 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Sliders className="w-4 h-4 text-[#10E599]" />
                <span>Explosion Distance:</span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explosionRatio}
                onChange={handleSlider}
                className="w-full sm:w-64 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#10E599]"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setExplosionRatio(0);
                    sound.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    explosionRatio === 0 ? "bg-white text-slate-950 shadow-md" : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  Assembled (0%)
                </button>
                <button
                  onClick={() => {
                    setExplosionRatio(1);
                    sound.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    explosionRatio === 1 ? "bg-[#10E599] text-slate-950 shadow-md" : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  Exploded (100%)
                </button>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE COMPONENT SPEC SHEET ================= */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35 }}
                className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-200/80 dark:border-emerald-500/30 flex flex-col justify-between"
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
                      {activeLayer.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {activeLayer.name}
                  </h3>

                  <p className="mt-4 text-sm text-slate-600 dark:text-emerald-100/75 leading-relaxed font-normal">
                    {activeLayer.description}
                  </p>

                  <div className="mt-8 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-300/60">
                      Material &amp; Engineering Specifications
                    </h4>
                    
                    {activeLayer.specs.map((spec, i) => (
                      <div 
                        key={i} 
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-emerald-900/30 flex items-center justify-between"
                      >
                        <span className="text-xs text-slate-500 dark:text-emerald-300/70 font-medium">
                          {spec.label}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-900 dark:text-[#10E599]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Industrial Pilot Available
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
