"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Sun, 
  ShieldCheck, 
  Radio, 
  Leaf, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  Sparkles, 
  Activity,
  ArrowRight,
  Maximize2
} from "lucide-react";
import { sound } from "@/lib/sound";

interface HardwareLayer {
  id: string;
  name: string;
  category: "energy" | "silicon" | "chassis" | "sensor" | "substrate";
  badge: string;
  yOffsetFactor: number;
  specs: { label: string; value: string }[];
  description: string;
  icon: React.ElementType;
  accentColor: string;
}

const LAYERS: HardwareLayer[] = [
  {
    id: "layer-solar",
    name: "01. Polycrystalline Solar Micro-Harvester",
    category: "energy",
    badge: "Continuous Autonomous Power",
    yOffsetFactor: -1.6,
    icon: Sun,
    accentColor: "#F59E0B",
    description: "High-efficiency monocrystalline solar cap paired with ultra-low ESR supercapacitors, providing indefinite 5+ year maintenance-free energy even under tropical monsoon cloud cover.",
    specs: [
      { label: "Solar Conversion", value: "22.4% High Efficiency" },
      { label: "Operational Life", value: "5+ Years Zero-Battery Change" },
      { label: "Operating Range", value: "-10°C to +65°C Tropical" },
    ],
  },
  {
    id: "layer-mcu",
    name: "02. Dual-Core Silicon & LoRaWAN Radio",
    category: "silicon",
    badge: "Sub-GHz Edge Intelligence",
    yOffsetFactor: -0.8,
    icon: Cpu,
    accentColor: "#00D2FF",
    description: "Industrial 32-bit RISC-V edge silicon running custom C/C++ firmware. Features an 868/915 MHz sub-GHz LoRaWAN transceiver with AES-128 hardware encryption and sub-10ms sleep awakening.",
    specs: [
      { label: "Wireless Protocol", value: "LoRaWAN Class A/C (15km Mesh)" },
      { label: "Sleep Current", value: "<1.8 µA Deep Hibernation" },
      { label: "Telemetry Latency", value: "<50ms Direct Ingestion" },
    ],
  },
  {
    id: "layer-chassis",
    name: "03. IP68 Hermetic Aerospace Shell",
    category: "chassis",
    badge: "Tractor & Chemical Proof",
    yOffsetFactor: 0,
    icon: ShieldCheck,
    accentColor: "#10E599",
    description: "Reinforced UV-stabilized polycarbonate chassis with medical-grade silicone dual O-rings. Impervious to acid fertilizers, agrochemical corrosion, and heavy agricultural field equipment.",
    specs: [
      { label: "Waterproof Rating", value: "IP68 Submersible (3 Meters)" },
      { label: "Impact Resistance", value: "IK09 Heavy Machinery Shock" },
      { label: "Chemical Seal", value: "100% Acid/Saline Leaching Proof" },
    ],
  },
  {
    id: "layer-prongs",
    name: "04. Stainless Steel 316L Multi-Depth Blades",
    category: "sensor",
    badge: "Tri-Depth High Frequency",
    yOffsetFactor: 0.8,
    icon: Radio,
    accentColor: "#0052FF",
    description: "High-frequency (70MHz) dielectric capacitance prongs positioned at 10cm, 30cm, and 60cm root depths to measure true Volumetric Water Content (VWC), Electrical Conductivity (EC), and substrate temperature.",
    specs: [
      { label: "Probe Depths", value: "10cm (Surface) / 30cm / 60cm (Taproot)" },
      { label: "EC Range", value: "0 to 20.0 mS/cm (±0.05 Resolution)" },
      { label: "Moisture Accuracy", value: "±1.5% Volumetric Water Content" },
    ],
  },
  {
    id: "layer-soil",
    name: "05. Hosma Ceylon 100% Organic Cocopeat Matrix",
    category: "substrate",
    badge: "Biological Soil Physics",
    yOffsetFactor: 1.6,
    icon: Leaf,
    accentColor: "#059669",
    description: "Triple-washed organic coconut coir medium engineered by Hosma Ceylon. Possesses naturally buffered micro-capillaries providing 800-900% water retention and 22% air porosity for unhindered root expansion.",
    specs: [
      { label: "Sodium Leached EC", value: "< 0.4 mS/cm Dutch Standard" },
      { label: "Water Absorption", value: "800% - 900% Biomass Weight" },
      { label: "Substrate Purity", value: "OMRI Listed 100% Organic" },
    ],
  },
];

export default function HardwareExplodedView() {
  const [explosionPercent, setExplosionPercent] = useState<number>(75);
  const [selectedLayer, setSelectedLayer] = useState<HardwareLayer>(LAYERS[1]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setExplosionPercent(val);
    sound.playSweep(val / 100);
  };

  const handleLayerClick = (layer: HardwareLayer) => {
    setSelectedLayer(layer);
    sound.playClick();
  };

  return (
    <section className="relative py-28 md:py-36 bg-transparent select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Hardware &times; Substrate Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Exploded <span className="gradient-text">Hardware Blueprint.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-100/70"
          >
            Drag the explosion slider below to deconstruct the NATLE LoRaWAN sub-GHz telemetry probe and inspect how aerospace silicon meets Hosma Ceylon organic root physics.
          </motion.p>
        </div>

        {/* Interactive Main Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Canvas: 3D Exploded Layer Stack */}
          <div className="lg:col-span-7 relative h-[520px] sm:h-[620px] rounded-3xl border border-slate-200/80 dark:border-emerald-500/30 bg-slate-950 p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
            
            {/* Top Stage Badges */}
            <div className="flex items-center justify-between z-10 text-xs font-mono">
              <div className="flex items-center gap-2 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10E599] animate-pulse" />
                <span>NATLE Probe v4.2 &bull; Schematics View</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 text-emerald-400 font-bold">
                Separation: {explosionPercent}%
              </div>
            </div>

            {/* Central Animated Vector Stack */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Background Luminous Blueprint Grid */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(to right, #10E599 1px, transparent 1px), linear-gradient(to bottom, #10E599 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }}
              />

              {/* 5 Exploded Floating Layers */}
              {LAYERS.map((layer) => {
                const isSelected = selectedLayer.id === layer.id;
                // Calculate dynamic Y offset based on slider percentage
                const currentY = (layer.yOffsetFactor * (explosionPercent * 1.55));

                return (
                  <motion.div
                    key={layer.id}
                    animate={{ 
                      y: currentY,
                      scale: isSelected ? 1.05 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    onClick={() => handleLayerClick(layer)}
                    className="absolute cursor-pointer group flex flex-col items-center"
                    style={{ zIndex: Math.round(50 - Math.abs(layer.yOffsetFactor * 10)) }}
                  >
                    {/* Layer Vector Graphic Card */}
                    <div className={`relative px-6 py-4 rounded-2xl border transition-all duration-300 backdrop-blur-md flex items-center gap-4 ${
                      isSelected 
                        ? "bg-slate-900/95 border-[#10E599] shadow-[0_0_30px_rgba(16,229,153,0.35)] scale-105" 
                        : "bg-slate-900/70 border-white/10 hover:border-white/30 hover:bg-slate-900/90"
                    }`}>
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-950 shadow-md shrink-0"
                        style={{ backgroundColor: layer.accentColor }}
                      >
                        <layer.icon className="w-5 h-5" />
                      </div>

                      <div className="text-left pr-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                          {layer.badge}
                        </span>
                        <h4 className="text-sm font-black text-white whitespace-nowrap">
                          {layer.name}
                        </h4>
                      </div>

                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: layer.accentColor }} />
                    </div>

                    {/* Connecting Vertical Laser Line */}
                    {explosionPercent > 20 && (
                      <div className="w-0.5 h-6 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                    )}
                  </motion.div>
                );
              })}

            </div>

            {/* Bottom Explosion Controls */}
            <div className="z-10 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Sliders className="w-4 h-4 text-[#10E599]" />
                <span>Explosion Distance:</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={explosionPercent}
                onChange={handleSliderChange}
                className="w-full sm:w-64 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#10E599]"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setExplosionPercent(0);
                    sound.playClick();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    explosionPercent === 0 ? "bg-white text-slate-950 font-bold" : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  Assembled
                </button>
                <button
                  onClick={() => {
                    setExplosionPercent(85);
                    sound.playClick();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    explosionPercent > 50 ? "bg-[#10E599] text-slate-950 font-bold" : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  Exploded
                </button>
              </div>
            </div>

          </div>

          {/* Detailed Inspector Panel for Selected Layer */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLayer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-200/80 dark:border-emerald-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-slate-950 shadow-sm"
                      style={{ backgroundColor: selectedLayer.accentColor }}
                    >
                      {selectedLayer.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Component Spec Sheet
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {selectedLayer.name}
                  </h3>

                  <p className="mt-4 text-sm text-slate-600 dark:text-emerald-100/75 leading-relaxed font-normal">
                    {selectedLayer.description}
                  </p>

                  <div className="mt-8 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-300/60">
                      Engineering Benchmarks
                    </h4>
                    
                    {selectedLayer.specs.map((spec, i) => (
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
                    Industrial IP68 Standard
                  </span>
                  
                  <a
                    href="/contact"
                    className="gradient-btn inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>Request Hardware Pilot</span>
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
