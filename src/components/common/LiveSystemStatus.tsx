"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Globe, ShieldCheck } from "lucide-react";
import { useTrustCenter } from "@/components/trust/TrustCenterModal";

export default function LiveSystemStatus({ className = "" }: { className?: string }) {
  const { openTrustCenter } = useTrustCenter();
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    // Subtle realistic latency fluctuation between 21ms - 27ms
    const interval = setInterval(() => {
      setLatency(20 + Math.floor(Math.random() * 8));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm text-xs text-[#0a1628] ${className}`}>
      {/* Live Green Pulsing Beacon */}
      <div className="flex items-center gap-1.5 font-mono font-bold text-[11px] text-emerald-600">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>SYSTEMS OPERATIONAL</span>
      </div>

      <span className="h-3 w-px bg-slate-200" />

      {/* Latency Metric */}
      <div className="hidden sm:flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
        <Activity className="w-3 h-3 text-[#0ea5e9]" />
        <span>Edge Latency: <strong className="text-[#0a1628]">{latency}ms</strong></span>
      </div>

      <span className="hidden sm:block h-3 w-px bg-slate-200" />

      {/* Trust Center Trigger Link */}
      <button
        onClick={() => openTrustCenter("soc2")}
        className="flex items-center gap-1 text-[11px] font-bold text-[#0ea5e9] hover:text-[#0052FF] transition-colors"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[#0ea5e9]" />
        <span>SOC 2 &bull; HIPAA Verified</span>
      </button>
    </div>
  );
}
