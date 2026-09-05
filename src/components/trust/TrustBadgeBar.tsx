"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Activity, Server, ChevronRight } from "lucide-react";
import { useTrustCenter } from "./TrustCenterModal";

const BADGES = [
  { id: "soc2", label: "SOC 2 Type II", icon: ShieldCheck, color: "#0ea5e9", audit: "Certified AICPA" },
  { id: "hipaa", label: "HIPAA Security", icon: Activity, color: "#10b981", audit: "Clinical PHI BAA" },
  { id: "iso27001", label: "ISO/IEC 27001", icon: Lock, color: "#8b5cf6", audit: "Audited ISMS" },
  { id: "sovereign", label: "Air-Gapped Sovereign AI", icon: Server, color: "#f59e0b", audit: "Zero Telemetry" },
];

export default function TrustBadgeBar({ className = "" }: { className?: string }) {
  const { openTrustCenter } = useTrustCenter();

  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Enterprise Audited:
        </span>

        {BADGES.map((badge) => {
          const Icon = badge.icon;
          return (
            <motion.button
              key={badge.id}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openTrustCenter(badge.id)}
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-[#0a1628] shadow-sm hover:shadow-md hover:border-[#0ea5e9]/40 transition-all backdrop-blur-sm"
            >
              <span 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: `${badge.color}15`, color: badge.color }}
              >
                <Icon className="w-3 h-3" />
              </span>
              <span>{badge.label}</span>
              <span className="text-[10px] font-mono text-slate-400 group-hover:text-[#0ea5e9] transition-colors flex items-center">
                &bull; {badge.audit}
                <ChevronRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
