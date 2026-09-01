"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NatleLogo({ 
  className = "",
  showTagline = true 
}: { 
  className?: string;
  showTagline?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn("group relative flex flex-col justify-center select-none cursor-pointer text-slate-900 dark:text-white", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Ambient Bioluminescent Glow Aura */}
      <motion.div 
        className="pointer-events-none absolute -inset-2.5 rounded-2xl bg-gradient-to-r from-[#0052FF]/15 via-[#00D2FF]/20 to-[#10E599]/25 blur-xl"
        animate={{
          opacity: isHovered ? 0.95 : 0.2,
          scale: isHovered ? 1.08 : 0.95,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* 2. Pristine Vector SVG Logo: [ N ] [ A ] [ T ] [ L ] [ E ] */}
      <motion.svg
        viewBox="0 0 460 160"
        className="h-11 md:h-12 w-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          y: isHovered ? -2 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <defs>
          {/* Quantum Bio-Sapphire Gradient */}
          <linearGradient id="nLeftPillar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>

          {/* Fusion Diagonal: Sapphire to Flora Emerald */}
          <linearGradient id="nDiagonalSwoop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="40%" stopColor="#00D2FF" />
            <stop offset="75%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10E599" />
          </linearGradient>

          {/* Ceylon Flora Emerald Pillar */}
          <linearGradient id="nRightPillar" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="60%" stopColor="#10E599" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>

          {/* Orbiting Halo Arc */}
          <linearGradient id="haloOrbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="50%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#10E599" />
          </linearGradient>

          {/* Letter 'A' Gradient */}
          <linearGradient id="letterAGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="50%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Letter 'E' Middle Bar Accent Gradient */}
          <linearGradient id="letterEGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="50%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#10E599" />
          </linearGradient>
        </defs>

        {/* ==================== 1. LETTER 'N' (THE ICONIC EMBLEM) ==================== */}
        
        {/* Halo Back Arc */}
        <motion.path
          d="M 16 78 C 16 94, 65 110, 110 98 C 150 86, 175 62, 170 42 C 166 28, 140 22, 110 28"
          stroke="url(#haloOrbitGlow)"
          strokeWidth="5.5"
          strokeLinecap="round"
          animate={{
            pathLength: [0.75, 1, 0.75],
            opacity: [0.65, 0.95, 0.65],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Left Vertical Stem */}
        <path d="M44 32 L72 32 L72 114 L44 114 Z" fill="url(#nLeftPillar)" />

        {/* Diagonal Swoop */}
        <path d="M44 32 L74 32 L142 114 C136 122 118 122 104 122 L44 32 Z" fill="url(#nDiagonalSwoop)" />

        {/* Right Vertical Stem */}
        <path d="M116 44 L142 44 L142 114 L116 114 Z" fill="url(#nRightPillar)" />

        {/* Orbit Front Arc */}
        <motion.path
          d="M 98 92 C 124 86, 164 70, 174 48"
          stroke="url(#haloOrbitGlow)"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{
            strokeWidth: isHovered ? 7 : 6,
            opacity: [0.75, 1, 0.75],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Living IoT Pixel Swarm */}
        <g>
          <rect x="148" y="16" width="8" height="8" rx="1.5" fill="#10E599" />
          <rect x="160" y="16" width="8" height="8" rx="1.5" fill="#059669" />
          <rect x="138" y="28" width="8.5" height="8.5" rx="1.5" fill="#0052FF" />
          <rect x="149" y="28" width="8.5" height="8.5" rx="1.5" fill="#00D2FF" />
          <rect x="161" y="28" width="8.5" height="8.5" rx="1.5" fill="#10E599" />
          <rect x="127" y="40" width="9" height="9" rx="1.5" fill="#0052FF" />
          <rect x="139" y="40" width="9" height="9" rx="1.5" fill="#00D2FF" />
          <rect x="150" y="40" width="9" height="9" rx="1.5" fill="#10E599" />
        </g>


        {/* ==================== 2. LETTER 'A' (Triangular Chevron) ==================== */}
        <g>
          <path
            d="M 188 114 L 218 54 L 248 114 L 230 114 L 218 88 L 206 114 Z"
            fill="url(#letterAGrad)"
          />
          <polygon 
            points="218,70 228,94 208,94" 
            fill="currentColor"
            className="text-white dark:text-[#050505]"
          />
        </g>


        {/* ==================== 3. LETTER 'T' ==================== */}
        <path
          d="M 248 64 L 298 64 L 293 76 L 279 76 L 269 114 L 253 114 L 263 76 L 244 76 Z"
          fill="currentColor"
        />


        {/* ==================== 4. LETTER 'L' ==================== */}
        <path
          d="M 292 64 L 308 64 L 297 102 L 332 102 L 328 114 L 279 114 Z"
          fill="currentColor"
        />


        {/* ==================== 5. LETTER 'E' ==================== */}
        <g>
          <path d="M 342 64 L 394 64 L 388 76 L 338 76 Z" fill="currentColor" />
          <path d="M 334 82 L 386 82 L 381 94 L 331 94 Z" fill="url(#letterEGrad)" />
          <path d="M 326 100 L 382 100 L 377 114 L 314 114 L 328 64 L 344 64 L 332 106 L 370 106 L 373 100 Z" fill="currentColor" />
        </g>


        {/* ==================== 6. SUBTITLE: INNOVATE • BUILD • GROW ==================== */}
        {showTagline && (
          <g>
            <line x1="44" y1="144" x2="90" y2="144" stroke="#00D2FF" strokeWidth="2" strokeLinecap="round" />

            <text 
              x="102" y="148" 
              fill="currentColor"
              fontSize="12" 
              fontWeight="900" 
              letterSpacing="0.22em" 
              fontFamily="system-ui, sans-serif"
            >
              INNOVATE
            </text>

            <circle cx="200" cy="144" r="3" fill="#00D2FF" />

            <text 
              x="216" y="148" 
              fill="currentColor"
              fontSize="12" 
              fontWeight="900" 
              letterSpacing="0.22em" 
              fontFamily="system-ui, sans-serif"
            >
              BUILD
            </text>

            <circle cx="282" cy="144" r="3" fill="#10E599" />

            <text 
              x="298" y="148" 
              fill="currentColor"
              fontSize="12" 
              fontWeight="900" 
              letterSpacing="0.22em" 
              fontFamily="system-ui, sans-serif"
            >
              GROW
            </text>

            <line x1="370" y1="144" x2="416" y2="144" stroke="#10E599" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
      </motion.svg>
    </div>
  );
}
