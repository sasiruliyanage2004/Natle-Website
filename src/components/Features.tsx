"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Puzzle, Palette, Layout, Terminal, Check } from "lucide-react";
import { TechCornerBrackets } from "@/components/common/TechCornerBrackets";

// ─────────────────────────────────────────────────────────────
// VISUAL 1: Interactive Network Vertex Mesh & Axis (Screenshot 1)
// ─────────────────────────────────────────────────────────────
function NetworkVertexVisual() {
  return (
    <div className="relative h-full min-h-[170px] w-full flex items-center justify-center overflow-hidden">
      {/* Subtle background coordinate grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      <svg className="w-full h-full max-w-[200px] max-h-[150px]" viewBox="0 0 160 120" fill="none">
        {/* Vertical dotted axis line */}
        <line
          x1="120"
          y1="10"
          x2="120"
          y2="110"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Outer connecting guides */}
        <line x1="20" y1="60" x2="65" y2="25" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <line x1="20" y1="60" x2="65" y2="95" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <line x1="65" y1="25" x2="120" y2="40" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.4" />
        <line x1="65" y1="95" x2="120" y2="80" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.4" />

        {/* Main Polygon / Polyline in Emerald & Cyan */}
        <polyline
          points="65,25 65,95 120,80 120,40 65,25"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
        />
        <line x1="65" y1="60" x2="120" y2="60" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Nodes / Vertices */}
        <circle cx="20" cy="60" r="3.5" fill="#64748b" />
        <circle cx="65" cy="25" r="4.5" fill="#10b981" className="animate-pulse" />
        <circle cx="65" cy="95" r="4.5" fill="#10b981" />
        <circle cx="65" cy="60" r="3" fill="#0ea5e9" />
        <circle cx="120" cy="40" r="4" fill="#0ea5e9" />
        <circle cx="120" cy="80" r="4" fill="#0ea5e9" />
        <circle cx="120" cy="15" r="2.5" fill="#94a3b8" />
        <circle cx="120" cy="105" r="2.5" fill="#94a3b8" />
      </svg>

      <span className="absolute bottom-2 right-2 font-mono text-[9px] text-slate-400">
        MESH // TOPOLOGY
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VISUAL 2: Radar Sonar Scanner with Concentric Rings (Screenshot 2)
// ─────────────────────────────────────────────────────────────
function RadarSonarVisual() {
  return (
    <div className="relative h-full min-h-[170px] w-full flex items-center justify-center overflow-hidden">
      {/* Concentric Sonar Rings */}
      <div className="absolute h-36 w-36 rounded-full border border-slate-200" />
      <div className="absolute h-24 w-24 rounded-full border border-[#0ea5e9]/25" />
      <div className="absolute h-14 w-14 rounded-full border border-[#10b981]/35" />

      {/* Axis Crosshairs */}
      <div className="absolute h-full w-[1px] bg-slate-200/80" />
      <div className="absolute w-full h-[1px] bg-slate-200/80" />

      {/* Rotating Radar Sweep Cone */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
        className="absolute h-36 w-36 rounded-full origin-center"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(16,185,129,0.3) 0deg, rgba(14,165,233,0.15) 30deg, transparent 65deg, transparent 360deg)",
        }}
      />

      {/* Central Green Crosshair + */}
      <div className="relative flex items-center justify-center z-10">
        <span className="text-emerald-500 font-bold text-sm leading-none select-none">+</span>
      </div>

      {/* Orbiting Radar Blips */}
      <div className="absolute top-5 right-9">
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative block h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
      </div>

      <div className="absolute bottom-8 left-10">
        <span className="block h-1.5 w-1.5 rounded-full bg-[#0ea5e9] shadow-[0_0_4px_#0ea5e9]" />
      </div>

      <div className="absolute top-12 left-14">
        <span className="block h-1.5 w-1.5 rounded-full bg-slate-400" />
      </div>

      <span className="absolute bottom-2 right-2 font-mono text-[9px] text-slate-400">
        X-AXIS // SONAR
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VISUAL 3: Decentralized Protocol & Battery Equalizer (Screenshot 3)
// ─────────────────────────────────────────────────────────────
function TelemetryEqualizerVisual() {
  const [pulse, setPulse] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 10);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full min-h-[170px] w-full flex flex-col justify-center px-4 py-2 space-y-4">
      {/* Top Protocol Status with Live Green Dot */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
            DECENTRALIZED PROTOCOL
          </span>
        </div>

        {/* Progress Line */}
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <motion.div
            className="h-full bg-gradient-to-r from-[#0ea5e9] via-emerald-400 to-[#10b981] rounded-full"
            animate={{ width: ["60%", "85%", "72%", "94%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Segmented LED Bar Gauge (Equalizer / Battery Style from Screenshot) */}
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => {
            const activeThreshold = 7 + (n % 3);
            const isActive = n <= activeThreshold;
            return (
              <motion.div
                key={n}
                animate={{
                  scaleY: isActive ? [0.75, 1, 0.85] : 0.4,
                  opacity: isActive ? 1 : 0.25,
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: n * 0.06,
                }}
                className={`h-6 flex-1 rounded-[2px] transition-all origin-bottom ${
                  isActive
                    ? "bg-gradient-to-t from-emerald-500 to-[#5aec8f] shadow-[0_0_6px_rgba(16,185,129,0.4)]"
                    : "bg-slate-200"
                }`}
              />
            );
          })}
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 pt-0.5">
          <span>THROUGHPUT: 24.8k OPS</span>
          <span className="text-emerald-600 font-semibold">ONLINE</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VISUAL 4: SYS.READY Status Matrix Grid (Screenshot 4)
// ─────────────────────────────────────────────────────────────
function StatusMatrixVisual() {
  return (
    <div className="relative h-full min-h-[170px] w-full flex flex-col justify-center items-end px-5 py-2">
      {/* Header status badge */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-600 uppercase">
          SYS.READY
        </span>
      </div>

      {/* Glowing 3x3 / 4x3 Matrix Grid */}
      <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-inner">
        {[
          true, true, true, false,
          true, true, false, true,
          true, true, true, true,
        ].map((active, i) => (
          <motion.div
            key={i}
            animate={
              active
                ? {
                    opacity: [0.7, 1, 0.7],
                    scale: [0.96, 1, 0.96],
                  }
                : { opacity: 0.2 }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
            className={`h-4 w-4 rounded-[3px] transition-all ${
              active
                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] border border-emerald-400"
                : "bg-slate-200 border border-slate-300/40"
            }`}
          />
        ))}
      </div>

      <span className="font-mono text-[9px] text-slate-400 mt-2">
        RUNTIME // VERIFIED
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CARDS DEFINITION (Matching the 4 Watermelon UI Cards)
// ─────────────────────────────────────────────────────────────
const FEATURES_DATA = [
  {
    icon: Code2,
    codeTag: "{ ... }",
    title: "100% OPEN & SOVEREIGN",
    desc: "Air-gapped and self-hosted deployment models. Zero third-party telemetry, complete data ownership, and strict on-prem compliance without proprietary lock-in.",
    visual: NetworkVertexVisual,
  },
  {
    icon: Puzzle,
    codeTag: "RADAR // MESH",
    title: "600+ ENTERPRISE MODULES",
    desc: "An exhaustive library of meticulously engineered AI modules — from clinical diagnostic pipelines and LoRaWAN edge telemetry to real-time high-concurrency fraud engines.",
    visual: RadarSonarVisual,
  },
  {
    icon: Palette,
    codeTag: "THEMING // PROTOCOL",
    title: "POWERFUL REAL-TIME ADAPTATION",
    desc: "Dynamic inference scaling, continuous drift recalibration, and modular plug-and-play APIs that blend seamlessly into your existing ERP, EHR, and CRM infrastructure.",
    visual: TelemetryEqualizerVisual,
  },
  {
    icon: Layout,
    codeTag: "SYS.READY // PROD",
    title: "PRODUCTION READY AT SCALE",
    desc: "Stop testing fragile research prototypes. Deploy hardened, fault-tolerant AI platforms battle-tested across 5 continents and verified with 99.98% SLA uptime.",
    visual: StatusMatrixVisual,
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 bg-[#ffffff] select-none overflow-hidden">
      {/* Subtle top/bottom hairline borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{
              background: "rgba(14,165,233,0.08)",
              borderColor: "rgba(14,165,233,0.25)",
              color: "#0369a1",
            }}
          >
            <Terminal className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span>Architecture &bull; Core Capabilities</span>
          </div>

          <h2 className="font-display text-4xl lg:text-5xl font-black text-[#0a1628] tracking-tight">
            Why Enterprises <span className="gradient-text">Choose NATLE</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#64748b] max-w-2xl mx-auto">
            Engineered like critical infrastructure. We eliminate guesswork with verifiable architectures built for mission-critical scale.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            2x2 GRID WITH SIDE VISUAL DESIGNS & CORNER BRACKETS
           ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {FEATURES_DATA.map((item, i) => {
            const Icon = item.icon;
            const VisualComponent = item.visual;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="clay-card group relative flex flex-col sm:flex-row justify-between rounded-2xl border border-slate-200/90 bg-white/95 transition-all duration-300 hover:border-[#0ea5e9]/40 hover:shadow-[0_18px_40px_-10px_rgba(14,165,233,0.14)] hover:-translate-y-1 overflow-hidden"
              >
                {/* ┌ ┐ └ ┘ Technical Corner Brackets from screenshot */}
                <TechCornerBrackets
                  color="rgba(14, 165, 233, 0.45)"
                  size={12}
                  offset={10}
                />

                {/* Left Half: Content */}
                <div className="flex-1 p-7 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Top Icon in Vibrant Lime / Cyan */}
                    <div className="mb-4 inline-flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 group-hover:scale-105 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
                        {item.codeTag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg sm:text-xl font-black text-[#0a1628] mb-3 tracking-tight group-hover:text-[#0ea5e9] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Verification Tick */}
                  <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 font-semibold">
                    <Check className="h-3.5 w-3.5" />
                    <span>PRODUCTION VERIFIED</span>
                  </div>
                </div>

                {/* Right Half: Dedicated High-Tech Visual Widget ("ainen design ekak") */}
                <div className="w-full sm:w-[42%] shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 bg-slate-50/40 relative flex items-center justify-center">
                  <VisualComponent />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}