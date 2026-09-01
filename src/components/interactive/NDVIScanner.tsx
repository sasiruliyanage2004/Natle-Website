"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Scan, 
  Layers, 
  Sparkles, 
  Activity, 
  Droplets, 
  Sun, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  status: "optimal" | "stress" | "dry";
  metric: string;
  desc: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "zone-a",
    x: 28,
    y: 42,
    title: "Terrace Zone A (Upper Ridge)",
    status: "optimal",
    metric: "NDVI 0.88 &bull; Optimal Biomass",
    desc: "Hosma Ceylon buffered growbags maintaining 72% volumetric water content. Zero nutrient leaching.",
  },
  {
    id: "zone-b",
    x: 64,
    y: 36,
    title: "Sector 4B (Hillside Valley)",
    status: "stress",
    metric: "NDVI 0.42 &bull; Early Nitrogen Depletion",
    desc: "FieldOS YieldAI detected mild chlorosis 11 days before visible yellowing. Solenoid valve #12 pulsed dosing.",
  },
  {
    id: "zone-c",
    x: 78,
    y: 68,
    title: "Estate Sector 9 (Southern Slope)",
    status: "dry",
    metric: "NDVI 0.58 &bull; High VPD Evaporation",
    desc: "Root temperature peak at 29.4°C. Automatic pulse misting activated to reduce vapor pressure deficit.",
  },
];

export default function NDVIScanner() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
      setSliderPos(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="relative py-28 bg-transparent select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-4"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Multispectral Satellite &times; Drone AI Vision</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Interactive <span className="gradient-text">NDVI Crop Health</span> Scanner
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-100/70"
          >
            Drag the slider across the commercial tea and coconut estate below to compare raw optical drone footage with real-time YieldAI™ multispectral canopy diagnostics.
          </motion.p>
        </div>

        {/* Interactive Comparison Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-emerald-500/30 bg-slate-950 shadow-2xl"
        >
          {/* Top Control Bar */}
          <div className="px-6 py-4 bg-slate-900/90 dark:bg-black/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-4 text-white">
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Drone Feed: Nuwara Eliya Sector 4
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-emerald-400">Resolution: 2.1cm/px Multispectral</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-bold">
                Slide &harr; {Math.round(sliderPos)}%
              </span>
              <span className="text-[11px] text-slate-400 hidden md:inline">
                Drag slider or click any zone hotspot
              </span>
            </div>
          </div>

          {/* Main Visualizer Area */}
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[420px] sm:h-[520px] md:h-[600px] cursor-ew-resize select-none overflow-hidden"
          >
            {/* Layer 1: Simulated High-Resolution True RGB Drone View (Right Side) */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 flex items-center justify-center">
              {/* Agricultural Grid Texture representing terrace rows */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(#10e599 1.5px, transparent 1.5px), radial-gradient(#059669 1.5px, #062b1a 1.5px)",
                  backgroundSize: "36px 36px",
                  backgroundPosition: "0 0, 18px 18px"
                }}
              />
              
              {/* Drone Field Contours */}
              <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1000 600">
                <path d="M 0 150 Q 250 80, 500 200 T 1000 120 L 1000 600 L 0 600 Z" fill="#033820" />
                <path d="M 0 280 Q 300 220, 600 350 T 1000 290 L 1000 600 L 0 600 Z" fill="#022415" />
                <path d="M 0 420 Q 350 360, 700 480 T 1000 410 L 1000 600 L 0 600 Z" fill="#01140c" />
              </svg>

              <div className="absolute right-8 bottom-8 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-right">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">RGB Visible Spectrum</span>
                <span className="text-xs text-white font-bold">Standard Aerial Camera</span>
              </div>
            </div>

            {/* Layer 2: Multispectral NDVI Thermal Heatmap View (Left Side Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 w-[1000px] sm:w-[1400px] lg:w-[1900px] h-full bg-gradient-to-br from-[#059669] via-[#10E599] to-amber-500">
                {/* Heatmap false-color overlays */}
                <div 
                  className="absolute inset-0 opacity-60 mix-blend-overlay"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 40%, #00ff88 0%, #059669 45%, #eab308 75%, #ef4444 100%)",
                  }}
                />
                
                {/* High Density Canopy Contours */}
                <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 1000 600">
                  <path d="M 0 150 Q 250 80, 500 200 T 1000 120 L 1000 600 L 0 600 Z" fill="#10e599" />
                  <path d="M 0 280 Q 300 220, 600 350 T 1000 290 L 1000 600 L 0 600 Z" fill="#059669" />
                  <path d="M 0 420 Q 350 360, 700 480 T 1000 410 L 1000 600 L 0 600 Z" fill="#0f766e" />
                </svg>

                {/* Stressed Zone Indicator Overlay */}
                <div className="absolute left-[64%] top-[36%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-amber-500/40 blur-2xl pointer-events-none" />

                <div className="absolute left-8 bottom-8 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-emerald-500/30">
                  <span className="text-[10px] font-mono text-[#10E599] uppercase font-bold block">Calibrated YieldAI™ NDVI</span>
                  <span className="text-xs text-white font-bold">Multispectral Biomass Index</span>
                </div>
              </div>
            </div>

            {/* Slider Dividing Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#00D2FF] via-white to-[#10E599] shadow-[0_0_20px_rgba(16,229,153,0.8)] z-30"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Slider Circular Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-slate-950 border-2 border-[#10E599] shadow-2xl flex items-center justify-center text-white cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                <div className="flex items-center -space-x-1 text-[#10E599]">
                  <ChevronLeft className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Clickable Telemetry Hotspot Badges */}
            {HOTSPOTS.map((spot) => {
              const isSelected = activeHotspot?.id === spot.id;

              return (
                <button
                  key={spot.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(spot);
                  }}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-40 group cursor-pointer"
                >
                  <span className="relative flex h-8 w-8">
                    <span 
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        spot.status === "optimal" ? "bg-emerald-400" : spot.status === "stress" ? "bg-amber-400" : "bg-cyan-400"
                      }`} 
                    />
                    <span 
                      className={`relative inline-flex rounded-full h-8 w-8 items-center justify-center text-slate-950 font-black text-xs shadow-lg border-2 border-white ${
                        spot.status === "optimal" ? "bg-[#10E599]" : spot.status === "stress" ? "bg-amber-400" : "bg-cyan-400"
                      } ${isSelected ? "scale-125 ring-4 ring-white/40" : "hover:scale-110"} transition-all`}
                    >
                      <Activity className="w-4 h-4" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Inspector Panel */}
          {activeHotspot && (
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 dark:bg-black/95 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-white">{activeHotspot.title}</span>
                  <span 
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      activeHotspot.status === "optimal" 
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {activeHotspot.status}
                  </span>
                </div>
                <p className="text-xs text-emerald-400 font-mono font-bold" dangerouslySetInnerHTML={{ __html: activeHotspot.metric }} />
                <p className="text-xs text-slate-300 max-w-2xl">{activeHotspot.desc}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-left">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Substrate Status</span>
                  <span className="text-xs font-bold text-[#10E599]">Hosma Cocopeat 70/30</span>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-left">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Irrigation Solenoid</span>
                  <span className="text-xs font-bold text-cyan-400">Closed-Loop Auto</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
