"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sound";
import { motion } from "framer-motion";

export default function SoundToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsEnabled(sound.getIsSoundEnabled());
  }, []);

  const handleToggle = () => {
    const newState = sound.toggleMute();
    setIsEnabled(newState);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      title={isEnabled ? "Tactile Audio: ON" : "Tactile Audio: OFF (Click to unmute)"}
      aria-label="Toggle sound feedback"
      className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 border cursor-pointer ${
        isEnabled
          ? "bg-emerald-500/15 border-emerald-500/40 text-[#059669] dark:text-[#10E599] shadow-sm shadow-emerald-500/10"
          : "bg-black/5 dark:bg-white/5 border-slate-200/80 dark:border-emerald-500/20 text-slate-500 dark:text-emerald-100/50 hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      {isEnabled ? (
        <>
          {/* Animated sound wave bars */}
          <div className="flex items-end gap-0.5 h-3">
            <motion.span
              animate={{ height: ["4px", "12px", "4px"] }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
              className="w-0.5 bg-[#059669] dark:bg-[#10E599] rounded-full"
            />
            <motion.span
              animate={{ height: ["10px", "5px", "10px"] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="w-0.5 bg-[#059669] dark:bg-[#10E599] rounded-full"
            />
            <motion.span
              animate={{ height: ["6px", "12px", "6px"] }}
              transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.2 }}
              className="w-0.5 bg-[#059669] dark:bg-[#10E599] rounded-full"
            />
          </div>
          <span className="text-[11px] hidden sm:inline">Audio ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="text-[11px] hidden sm:inline">Audio OFF</span>
        </>
      )}
    </button>
  );
}
