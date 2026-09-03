"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck,
  Cpu,
  Sun,
  Leaf,
  Sliders
} from "lucide-react";
import { sound } from "@/lib/sound";

interface HardwareLayer {
  id: string;
  number: string;
  name: string;
  tag: string;
  targetYPercent: number; // Y position on the real image (0 to 100)
  triggerMin: number;
  triggerMax: number;
  accentColor: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
}

const LAYERS: HardwareLayer[] = [
  {
    id: "solar",
    number: "01",
    name: "solar.photovoltaic",
    tag: "Titanium Solar Harvester",
    targetYPercent: 14,
    triggerMin: 0.0,
    triggerMax: 0.22,
    accentColor: "#F59E0B",
    title: "Brushed Titanium Solar Energy Cap",
    description: "Aerospace-grade circular brushed titanium bezel encasing a high-efficiency monocrystalline photovoltaic disc. Generates continuous power even under thick tropical monsoon cloud cover, feeding dual ultra-low ESR supercapacitors.",
    specs: [
      { label: "Solar Efficiency", value: "22.8% Monocrystalline" },
      { label: "Bezel Material", value: "Grade 5 Aerospace Titanium" },
      { label: "Operational Lifespan", value: "5+ Years Maintenance-Free" },
    ],
  },
  {
    id: "pcb",
    number: "02",
    name: "silicon.mcu.riscv",
    tag: "Silicon Logic & LoRaWAN",
    targetYPercent: 28,
    triggerMin: 0.22,
    triggerMax: 0.44,
    accentColor: "#00D2FF",
    title: "Dual-Core RISC-V & LoRa Telemetry Core",
    description: "Precision circular multi-layer green silicon PCB with gold ENIG traces. Integrates an ultra-low-power RISC-V edge computing unit, hardware AES-128 cryptographic vault, and a high-gain sub-GHz LoRa helical antenna penetrating 15km mountain topography.",
    specs: [
      { label: "Processing Core", value: "Dual-Core 32-bit RISC-V" },
      { label: "Wireless Range", value: "15km Line-of-Sight (LoRaWAN)" },
      { label: "Sleep Consumption", value: "1.8 µA Ultra-Low Power" },
    ],
  },
  {
    id: "casing",
    number: "03",
    name: "polycarbonate.ip68",
    tag: "Hermetic IP68 Sleeve",
    targetYPercent: 44,
    triggerMin: 0.44,
    triggerMax: 0.64,
    accentColor: "#3B82F6",
    title: "Waterproof IP68 Polycarbonate Sleeve",
    description: "Optically clear, high-impact polycarbonate cylinder with dual high-compression orange silicone O-rings. Protects sensitive electronics against chemical fertilizers, high-pressure irrigation jets, and tractor soil compaction.",
    specs: [
      { label: "Waterproof Rating", value: "IP68 Submersible (3m / 72h)" },
      { label: "Compression Seals", value: "Dual Fluoroelastomer O-Rings" },
      { label: "Impact Standard", value: "IK09 Industrial Mechanical" },
    ],
  },
  {
    id: "blades",
    number: "04",
    name: "stainless.316l.blades",
    tag: "Tri-Depth Capacitance",
    targetYPercent: 62,
    triggerMin: 0.64,
    triggerMax: 0.84,
    accentColor: "#6366F1",
    title: "316L Stainless Steel Moisture Blades",
    description: "Quad electro-polished 316L marine-grade stainless steel dielectric prongs with laser-etched depth marks. Measures high-frequency soil capacitance, electrical conductivity (EC), and thermal gradients across three distinct root horizons.",
    specs: [
      { label: "Depth Calibrations", value: "10cm / 30cm / 60cm Horizons" },
      { label: "Electrical Conductivity", value: "0.0 - 20.0 mS/cm Range" },
      { label: "Metal Composition", value: "Marine-Grade 316L Stainless" },
    ],
  },
  {
    id: "cocopeat",
    number: "05",
    name: "hosma.ceylon.substrate",
    tag: "Ceylon Bio-Matrix",
    targetYPercent: 84,
    triggerMin: 0.84,
    triggerMax: 1.0,
    accentColor: "#10E599",
    title: "Hosma Ceylon Cocopeat Substrate Block",
    description: "Triple-washed natural Ceylon organic coconut coir substrate (EC < 0.4 mS/cm). Porous micro-capillaries absorb 850% water by weight, providing ideal aeration for active root elongation and zero nutrient runoff.",
    specs: [
      { label: "Water Absorption", value: "850% Dry Biomass Weight" },
      { label: "Air-Filled Porosity", value: "22% - 25% Root Aeration" },
      { label: "Certification", value: "100% OMRI Listed Organic" },
    ],
  },
];

export default function HardwareScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const [manualScrub, setManualScrub] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"assembled" | "exploded">("assembled");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [scrollVal, setScrollVal] = useState<number>(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollVal(latest);
    const idx = LAYERS.findIndex(
      (l) => latest >= l.triggerMin && latest <= l.triggerMax
    );
    if (idx !== -1 && idx !== activeLayerIndex) {
      setActiveLayerIndex(idx);
      sound.playClick();
    }
  });

  const progress = manualScrub !== null ? manualScrub : scrollVal;
  const activeLayer = LAYERS[activeLayerIndex] || LAYERS[0];

  // Subtle camera focus glide on the real 3D image
  const imageScale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1.02, 1.08, 1.05, 1.08, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "3%", "0%", "-3%", "-6%"]);

  // Calculate target Y position dynamically based on viewMode
  const getTargetY = (layer: HardwareLayer) => {
    if (viewMode === "assembled") {
      switch (layer.id) {
        case "solar": return 12;
        case "pcb": return 30;
        case "casing": return 44;
        case "blades": return 62;
        case "cocopeat": return 82;
        default: return layer.targetYPercent;
      }
    }
    return layer.targetYPercent;
  };

  return (
    <section 
      ref={containerRef}
      id="hardware-scrollytelling"
      className="relative h-[420vh] bg-[#F8FAFC] dark:bg-[#050505] text-slate-900 dark:text-white select-none transition-colors duration-300"
    >
      {/* Pinned 100vh Sticky Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-6 lg:p-10 overflow-hidden">
        
        {/* Subtle Ambient Bioluminescent Halos matching site theme */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* ================= 1. HEADER (ANIME.JS & APPLE EDITORIAL STYLE) ================= */}
        <div className="relative z-20 max-w-7xl mx-auto w-full pt-12 sm:pt-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-[#059669] dark:text-[#10E599] text-[10px] font-mono font-bold tracking-widest uppercase mb-2 border border-emerald-500/20">
              <Sparkles className="w-3 h-3" />
              <span>Anime.js Hardware Architecture &bull; Photorealistic 3D Exploded View</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
              The complete <span className="text-[#059669] dark:text-[#10E599]">hardware anatomy.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed pb-1">
            Industrial LoRaWAN telemetry meets precision Ceylon coconut coir substrate. Scroll down or drag the scrubber to inspect all 5 physical layers in photorealistic 3D detail.
          </p>
        </div>

        {/* ================= 2. MAIN 2-COLUMN STAGE: REAL 3D IMAGE + ANIME.JS LEADER LINES ================= */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center overflow-hidden my-2">
          
          {/* LEFT 7 COLS: REAL 3D HARDWARE (ASSEMBLED BY DEFAULT) WITH LEADER LINES */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] lg:h-[520px] rounded-3xl bg-white/70 dark:bg-[#0b0f0d]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-2xl p-4 flex items-center justify-center overflow-hidden">
            
            {/* View Mode Switcher: Original Assembled (Default) vs Exploded Anatomy */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 p-1 rounded-full bg-white/85 dark:bg-black/70 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm">
              <button
                type="button"
                onClick={() => {
                  setViewMode("assembled");
                  sound.playClick();
                }}
                className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  viewMode === "assembled"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Original Assembled
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode("exploded");
                  sound.playClick();
                }}
                className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  viewMode === "exploded"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Exploded View
              </button>
            </div>

            {/* Real 3D Image Container */}
            <motion.div 
              style={{ scale: imageScale, y: imageY }}
              className="relative w-full h-full max-w-[420px] max-h-[490px] flex items-center justify-center will-change-transform"
            >
              <Image
                src={viewMode === "assembled" ? "/images/probe-assembled.jpg" : "/images/hardware-exploded-realistic.jpg"}
                alt="NATLE Photorealistic 3D Soil Probe"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                priority
                className="object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-all duration-300"
              />

              {/* Dynamic Interactive Leader Lines & Pointer Rings (Anime.js Image 5 style!) */}
              {LAYERS.map((layer, idx) => {
                const isActive = activeLayerIndex === idx;
                const targetY = getTargetY(layer);

                return (
                  <div 
                    key={layer.id}
                    style={{ top: `${targetY}%` }}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-between pointer-events-none z-30 transition-all duration-300"
                  >
                    {/* Left Leader Line */}
                    <div className="w-1/3 flex items-center justify-end pr-8">
                      <div 
                        className={`h-[1px] w-full max-w-[90px] transition-all duration-300 ${
                          isActive 
                            ? "bg-emerald-500 scale-x-100 opacity-100" 
                            : "bg-slate-300 dark:bg-white/20 scale-x-75 opacity-40"
                        }`}
                      />
                    </div>

                    {/* Glowing Pointer Target Dot right on the layer */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveLayerIndex(idx);
                        sound.playClick();
                      }}
                      className="pointer-events-auto relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer group"
                      title={layer.tag}
                    >
                      {isActive && (
                        <span 
                          className="absolute inset-0 rounded-full animate-ping opacity-75"
                          style={{ backgroundColor: layer.accentColor }}
                        />
                      )}
                      <span 
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-transform duration-300 ${
                          isActive 
                            ? "scale-125 border-white shadow-lg" 
                            : "border-slate-400 dark:border-white/50 bg-white/70 dark:bg-black/60 group-hover:scale-110"
                        }`}
                        style={{ backgroundColor: isActive ? layer.accentColor : undefined }}
                      />
                    </button>

                    {/* Right Leader Line & Monospace Label (Anime.js style) */}
                    <div className="w-1/3 flex items-center pl-8">
                      <div 
                        className={`h-[1px] w-12 transition-all duration-300 ${
                          isActive 
                            ? "bg-emerald-500 scale-x-100 opacity-100" 
                            : "bg-slate-300 dark:bg-white/20 scale-x-75 opacity-40"
                        }`}
                      />
                      <span 
                        className={`font-mono text-[10px] sm:text-xs ml-2 whitespace-nowrap transition-colors duration-300 ${
                          isActive 
                            ? "font-bold text-slate-900 dark:text-white" 
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {layer.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Bottom Status Chip */}
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[11px] font-mono flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeLayer.accentColor }} />
              <span className="font-bold text-slate-900 dark:text-white">{activeLayer.tag}</span>
            </div>
          </div>

          {/* RIGHT 5 COLS: DYNAMIC SPEC SHEET INSPECTOR */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 dark:border-emerald-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-slate-950 shadow-sm"
                      style={{ backgroundColor: activeLayer.accentColor }}
                    >
                      Layer {activeLayer.number} &bull; {activeLayer.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      0{activeLayerIndex + 1} / 05
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {activeLayer.title}
                  </h3>

                  <p className="mt-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {activeLayer.description}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80">
                      Engineering &amp; Material Specifications
                    </h4>
                    
                    {activeLayer.specs.map((spec, i) => (
                      <div 
                        key={i} 
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/70 dark:border-emerald-900/30 flex items-center justify-between"
                      >
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {spec.label}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-900 dark:text-[#10E599]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Scroll down or scrub below &darr;
                  </span>
                  
                  <a
                    href="/contact"
                    className="gradient-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>Request Spec Sheet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ================= 3. BOTTOM BAR: ANIME.JS RULER SCRUBBER WIDGET ================= */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {/* Layer Indicator Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            {LAYERS.map((layer, idx) => {
              const isActive = activeLayerIndex === idx;
              return (
                <button
                  key={layer.id}
                  onClick={() => {
                    setActiveLayerIndex(idx);
                    sound.playClick();
                  }}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold transition-all cursor-pointer border ${
                    isActive 
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-emerald-500 shadow-md scale-105" 
                      : "bg-white/60 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-400"
                  }`}
                >
                  <span>{layer.number}. {layer.name}</span>
                </button>
              );
            })}
          </div>

          {/* Anime.js Iconic Linear Tick Ruler Scrubber (Exact match to Images 4 & 5!) */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden md:inline">
              Layer Scrubber:
            </span>

            {/* Scrubber Capsule */}
            <div 
              className="relative flex items-center h-9 px-3 rounded-full bg-[#18181B] text-white border border-black/10 dark:border-white/15 shadow-xl select-none cursor-ew-resize"
              onMouseMove={(e) => {
                if (e.buttons === 1) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const val = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  setManualScrub(val);
                  const idx = Math.min(4, Math.floor(val * 5));
                  setActiveLayerIndex(idx);
                }
              }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const val = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                setManualScrub(val);
                const idx = Math.min(4, Math.floor(val * 5));
                setActiveLayerIndex(idx);
                sound.playClick();
              }}
            >
              {/* Vertical Tick Marks */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                  <span 
                    key={i}
                    className={`w-[1px] rounded-full transition-colors ${
                      i % 6 === 0 
                        ? "h-4 bg-zinc-300" 
                        : "h-2 bg-zinc-600"
                    }`}
                  />
                ))}
              </div>

              {/* Red/Emerald Active Needle Indicator */}
              <motion.div 
                style={{ 
                  left: `calc(12px + ${((activeLayerIndex + 0.5) / 5) * (100 - 18)}%)` 
                }}
                className="absolute top-1.5 bottom-1.5 w-[2px] bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.9)] transition-all duration-150"
              />
            </div>

            {/* Reset to Scroll Auto Mode */}
            {manualScrub !== null && (
              <button
                onClick={() => setManualScrub(null)}
                className="text-[10px] font-mono font-bold text-[#059669] dark:text-[#10E599] hover:underline cursor-pointer"
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
