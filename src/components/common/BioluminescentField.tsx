"use client";

import React, { useMemo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface BioluminescentFieldProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
  particleCount?: number;
  showGrid?: boolean;
  showGlows?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
}

const COLOR_PALETTE = [
  "rgba(16, 229, 153, 0.95)", // var(--neon-spring) #10E599
  "rgba(0, 210, 255, 0.85)",  // var(--cyber-cyan) #00D2FF
  "rgba(5, 150, 105, 0.90)",  // var(--flora-emerald) #059669
];

export function BioluminescentField({
  className,
  intensity = "medium",
  particleCount,
  showGrid = true,
  showGlows = true,
}: BioluminescentFieldProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const intensityMap = {
    subtle: { glowOpacity: 0.6, particleFactor: 0.7 },
    medium: { glowOpacity: 0.85, particleFactor: 1.0 },
    strong: { glowOpacity: 1.1, particleFactor: 1.3 },
  };

  const currentSettings = intensityMap[intensity];

  const effectiveCount = useMemo(() => {
    if (particleCount !== undefined) return particleCount;
    return isMobile ? 12 : Math.round(28 * currentSettings.particleFactor);
  }, [particleCount, isMobile, currentSettings.particleFactor]);

  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    for (let i = 0; i < effectiveCount; i++) {
      const pseudoRand = (seed: number) => {
        const x = Math.sin(seed * 9999 + i * 789) * 10000;
        return x - Math.floor(x);
      };

      const x = pseudoRand(1) * 96 + 2;
      const y = pseudoRand(2) * 85 + 10;
      const size = 2 + pseudoRand(3) * 2.2;
      const color = COLOR_PALETTE[i % COLOR_PALETTE.length];
      const duration = 16 + pseudoRand(4) * 14;
      const delay = -(pseudoRand(5) * 28);
      const sway = (pseudoRand(6) - 0.5) * 55;
      const opacity = (0.4 + pseudoRand(7) * 0.45) * (intensity === "subtle" ? 0.7 : 1);

      list.push({
        id: i,
        x,
        y,
        size,
        color,
        duration,
        delay,
        sway,
        opacity,
      });
    }
    return list;
  }, [effectiveCount, intensity]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden bg-transparent transition-colors duration-500",
        className
      )}
    >
      {/* LAYER 1: AMBIENT GLOW HALOS */}
      {showGlows && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="bioluminescent-animated ambient-halo-1 absolute -top-[12%] -left-[6%] w-[550px] sm:w-[680px] h-[500px] sm:h-[620px] rounded-full blur-[130px] sm:blur-[150px] pointer-events-none transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle, rgba(5, 150, 105, 0.16) 0%, rgba(5, 150, 105, 0.04) 50%, transparent 70%)",
              opacity: currentSettings.glowOpacity,
            }}
          />

          <div
            className="bioluminescent-animated ambient-halo-2 absolute top-[28%] -right-[8%] w-[600px] sm:w-[740px] h-[480px] sm:h-[580px] rounded-full blur-[140px] sm:blur-[160px] pointer-events-none transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle, rgba(0, 210, 255, 0.12) 0%, rgba(0, 210, 255, 0.03) 55%, transparent 75%)",
              opacity: currentSettings.glowOpacity,
            }}
          />

          <div
            className="bioluminescent-animated ambient-halo-3 absolute -bottom-[15%] left-[22%] w-[480px] sm:w-[600px] h-[420px] sm:h-[520px] rounded-full blur-[120px] sm:blur-[140px] pointer-events-none transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle, rgba(16, 229, 153, 0.10) 0%, rgba(16, 229, 153, 0.02) 60%, transparent 75%)",
              opacity: currentSettings.glowOpacity,
            }}
          />
        </div>
      )}

      {/* LAYER 2: FAINT TELEMETRY DOT-GRID */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.045] dark:opacity-[0.055]"
          style={{
            backgroundImage: "radial-gradient(var(--neon-spring, #10E599) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 45%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 45%, transparent 85%)",
          }}
        />
      )}

      {/* LAYER 3: BIOLUMINESCENT SPORE PARTICLES (CLIENT MOUNTED ONLY) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && particles.map((p) => (
          <div
            key={p.id}
            className="bioluminescent-particle bioluminescent-animated absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x.toFixed(3)}%`,
              top: `${p.y.toFixed(3)}%`,
              width: `${p.size.toFixed(1)}px`,
              height: `${p.size.toFixed(1)}px`,
              background: "radial-gradient(circle, " + p.color + " 0%, rgba(16, 229, 153, 0) 70%)",
              boxShadow: "0 0 " + (p.size * 2.5) + "px " + p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--particle-opacity": p.opacity,
              "--particle-sway": `${p.sway}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes bioluminescent-float {
          0% {
            transform: translate3d(0, 0, 0) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: var(--particle-opacity, 0.7);
          }
          50% {
            transform: translate3d(var(--particle-sway, 25px), -35vh, 0) scale(1.15);
            opacity: calc(var(--particle-opacity, 0.7) * 0.9);
          }
          85% {
            opacity: var(--particle-opacity, 0.7);
          }
          100% {
            transform: translate3d(calc(var(--particle-sway, 25px) * -0.5), -80vh, 0) scale(0.6);
            opacity: 0;
          }
        }

        @keyframes ambient-drift-1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(3%, -4%, 0) scale(1.06);
          }
          66% {
            transform: translate3d(-3%, 3%, 0) scale(0.96);
          }
        }

        @keyframes ambient-drift-2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(-4%, 3%, 0) scale(0.95);
          }
          66% {
            transform: translate3d(3%, -3%, 0) scale(1.05);
          }
        }

        @keyframes ambient-drift-3 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(2%, 2%, 0) scale(1.04);
          }
        }

        .bioluminescent-particle {
          animation-name: bioluminescent-float;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        .ambient-halo-1 {
          animation: ambient-drift-1 26s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-halo-2 {
          animation: ambient-drift-2 32s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-halo-3 {
          animation: ambient-drift-3 24s ease-in-out infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .bioluminescent-animated {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default BioluminescentField;
