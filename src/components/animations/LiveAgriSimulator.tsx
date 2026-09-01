"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Cpu, 
  Droplets, 
  Leaf, 
  TrendingUp, 
  Sliders, 
  Zap, 
  Wifi
} from "lucide-react";
import { animate, stagger } from "animejs";

export default function LiveAgriSimulator() {
  const [moisture, setMoisture] = useState(68);
  const [ecLevel, setEcLevel] = useState(1.4);
  const [isPumping, setIsPumping] = useState(false);
  const chartRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const triggerKineticPulse = () => {
    // Animate metric badges with Anime.js v4
    const badges = document.querySelectorAll(".metric-badge");
    if (badges.length > 0) {
      animate(badges, {
        scale: [
          { to: 1.12, ease: "outQuad", duration: 250 },
          { to: 1, ease: "outElastic(1, .6)", duration: 550 }
        ],
        delay: stagger(80),
      });
    }

    if (pulseRef.current) {
      animate(pulseRef.current, {
        scale: [
          { to: 1.35, ease: "outQuad", duration: 300 },
          { to: 1, ease: "outQuad", duration: 400 }
        ],
        opacity: [
          { to: 0.85, duration: 250 },
          { to: 0.4, duration: 450 }
        ]
      });
    }
  };

  const handleIrrigate = () => {
    setIsPumping(true);
    setMoisture((prev) => Math.min(85, prev + 8));
    triggerKineticPulse();
    setTimeout(() => setIsPumping(false), 1800);
  };

  useEffect(() => {
    triggerKineticPulse();
  }, [moisture, ecLevel]);

  return (
    <div className="relative rounded-3xl border border-white/90 bg-white/90 p-6 md:p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl">
      {/* Ambient background blur */}
      <div 
        ref={pulseRef}
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-emerald-500/20 blur-2xl opacity-40" 
      />

      {/* Header with Live Status */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Anime.js IoT Engine
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-sm font-black text-slate-900">
              Hosma Cocopeat Zone #048
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-black text-emerald-600">
          <Wifi className="h-3.5 w-3.5" />
          Live
        </span>
      </div>

      {/* Interactive Yield Growth Curve with Dynamic Wave */}
      <div className="mt-6 rounded-2xl border border-slate-200/70 bg-gradient-to-b from-slate-50/90 to-white/90 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Real-time Crop Biomass Flow
          </span>
          <span className="metric-badge flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
            <TrendingUp className="h-3.5 w-3.5" />
            +{((moisture * 0.35) + (ecLevel * 3.2)).toFixed(1)}% Harvest
          </span>
        </div>

        {/* Dynamic SVG Wave */}
        <div className="mt-3 h-28 w-full">
          <svg viewBox="0 0 240 80" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0066FF" />
                <stop offset="50%" stopColor="#00C0F0" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            <path
              ref={chartRef}
              d={`M0,65 C30,${70 - moisture * 0.2} 60,${60 - moisture * 0.3} 90,${55 - moisture * 0.35} C120,${45 - ecLevel * 10} 150,${35 - ecLevel * 8} 180,${25 - ecLevel * 6} C210,15 230,10 240,${15 - moisture * 0.1}`}
              fill="none"
              stroke="url(#waveStroke)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={`M0,65 C30,${70 - moisture * 0.2} 60,${60 - moisture * 0.3} 90,${55 - moisture * 0.35} C120,${45 - ecLevel * 10} 150,${35 - ecLevel * 8} 180,${25 - ecLevel * 6} C210,15 230,10 240,${15 - moisture * 0.1} L240,80 L0,80 Z`}
              fill="url(#waveFill)"
            />
          </svg>
        </div>
      </div>

      {/* Real-time Metric Dual Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="metric-badge rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <Droplets className="h-5 w-5 text-[#0066FF]" />
            <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-md">
              {moisture > 60 ? "Optimal" : "Needs Water"}
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-900">{moisture}%</p>
          <p className="text-xs font-bold text-slate-500">Substrate Moisture</p>
        </div>

        <div className="metric-badge rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <Leaf className="h-5 w-5 text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
              {ecLevel >= 1.2 ? "Grade A+" : "Standard"}
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-900">{ecLevel} mS/cm</p>
          <p className="text-xs font-bold text-slate-500">Nutrient EC Level</p>
        </div>
      </div>

      {/* Interactive Controls (Anime.js Simulator Panel) */}
      <div className="mt-5 rounded-2xl bg-slate-900 p-5 text-white shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Interactive Simulator</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase">Test Telemetry</span>
        </div>

        {/* Moisture Slider */}
        <div className="space-y-1 mb-3">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>Adjust Moisture Probe</span>
            <span className="text-white font-mono">{moisture}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="95"
            value={moisture}
            onChange={(e) => setMoisture(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
          />
        </div>

        {/* Action Button: Automated Irrigation Pulse */}
        <button
          onClick={handleIrrigate}
          disabled={isPumping}
          className={`w-full mt-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            isPumping 
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-95"
              : "gradient-btn hover:scale-[1.02] active:scale-95"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{isPumping ? "Irrigating Field..." : "Trigger Smart Irrigation Pulse"}</span>
        </button>
      </div>
    </div>
  );
}
