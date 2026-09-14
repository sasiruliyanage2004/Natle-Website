"use client";

import dynamic from "next/dynamic";

/**
 * Hero3D — Lazy loaded Quantum Power Breaker client wrapper
 *
 * Implements:
 * - next/dynamic({ ssr: false }) lazy loading with fallback
 * - Fullscreen radial wipe overlay originating from the switch's exact coordinates
 */
const PowerBreakerScene = dynamic(
  () => import("./hero/PowerBreakerScene"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#07090E]/20 to-transparent flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-2 font-mono text-xs text-azure/60">
          <span className="h-2 w-2 rounded-full bg-azure animate-ping" />
          <span>CONNECTING QUANTUM BREAKER...</span>
        </div>
      </div>
    ),
  }
);

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-[1]">
      <PowerBreakerScene />

      {/* Radial wipe transition overlay originating from switch coordinates */}
      <div
        className="pointer-events-none fixed inset-0 radial-wipe-mask bg-[#FCFDFE] dark:bg-[#07090E] opacity-95 transition-opacity duration-300 z-40"
        aria-hidden="true"
      />
    </div>
  );
}
