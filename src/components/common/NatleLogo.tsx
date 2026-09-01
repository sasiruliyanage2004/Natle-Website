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
      className={cn("group relative flex flex-col justify-center select-none cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Ambient Bioluminescent Glow Aura (Expanding smoothly on hover) */}
      <motion.div 
        className="pointer-events-none absolute -inset-3 rounded-2xl bg-gradient-to-r from-[#0052FF]/15 via-[#00D2FF]/20 to-[#059669]/20 blur-xl"
        animate={{
          opacity: isHovered ? 0.95 : 0.25,
          scale: isHovered ? 1.08 : 0.95,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* 2. ONE SINGLE UNIFIED PRISTINE VECTOR LOGO: [ N ] [ A ] [ T ] [ L ] [ E ] */}
      <motion.svg
        viewBox="0 0 460 160"
        className="h-12 md:h-14 w-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          y: isHovered ? -2.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <defs>
          {/* Quantum Bio-Sapphire Gradient */}
          <linearGradient id="nLeftPillar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A1E4A" />
            <stop offset="50%" stopColor="#0052FF" />
            <stop offset="100%" stopColor="#0070F3" />
          </linearGradient>

          {/* Fusion Diagonal: Quantum Sapphire to Flora Emerald */}
          <linearGradient id="nDiagonalSwoop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="40%" stopColor="#00D2FF" />
            <stop offset="80%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10E599" />
          </linearGradient>

          {/* Ceylon Flora Emerald Pillar */}
          <linearGradient id="nRightPillar" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="60%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#0052FF" />
          </linearGradient>

          {/* Orbiting Halo Arc */}
          <linearGradient id="haloOrbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="40%" stopColor="#00E5FF" />
            <stop offset="80%" stopColor="#10E599" />
            <stop offset="100%" stopColor="#84CC16" />
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

          {/* Laser Shimmer Light Sweep for Letters */}
          <linearGradient id="shimmerBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#071326" />
            <stop offset="45%" stopColor="#071326" />
            <stop offset="50%" stopColor="#00D2FF" />
            <stop offset="55%" stopColor="#10E599" />
            <stop offset="60%" stopColor="#071326" />
            <stop offset="100%" stopColor="#071326" />
          </linearGradient>
        </defs>

        {/* ==================== 1. LETTER 'N' (THE ICONIC EMBLEM) ==================== */}
        
        {/* Continuous Slow-Motion Orbiting Halo Loop (Back Arc) */}
        <motion.path
          d="M 16 78 C 16 94, 65 110, 110 98 C 150 86, 175 62, 170 42 C 166 28, 140 22, 110 28"
          stroke="url(#haloOrbitGlow)"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{
            pathLength: [0.7, 1, 0.7],
            opacity: [0.65, 0.95, 0.65],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Left 3D Sapphire Vertical Stem */}
        <path d="M44 32 L72 32 L72 114 L44 114 Z" fill="url(#nLeftPillar)" />
        {/* 3D Fold shadow */}
        <path d="M44 32 L60 52 L60 114 L44 114 Z" fill="#040D1E" opacity="0.4" />

        {/* Diagonal Swoop (Quantum Sapphire to Flora Emerald) */}
        <path d="M44 32 L74 32 L142 114 C136 122 118 122 104 122 L44 32 Z" fill="url(#nDiagonalSwoop)" />

        {/* Right Vertical Stem */}
        <path d="M116 44 L142 44 L142 114 L116 114 Z" fill="url(#nRightPillar)" />

        {/* Orbit Front Arc (Crossing in front of the diagonal) */}
        <motion.path
          d="M 98 92 C 124 86, 164 70, 174 48"
          stroke="url(#haloOrbitGlow)"
          strokeWidth="6.5"
          strokeLinecap="round"
          animate={{
            strokeWidth: isHovered ? 7.5 : 6.5,
            opacity: [0.75, 1, 0.75],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Living IoT Pixel Swarm (Continuous organic twinkling) */}
        <g>
          <motion.rect 
            x="148" y="16" width="8" height="8" rx="1.5" 
            fill="#84CC16" 
            animate={{ 
              y: [-1, 1.5, -1],
              opacity: [0.6, 1, 0.6] 
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect 
            x="160" y="16" width="8" height="8" rx="1.5" 
            fill="#059669"
            animate={{ 
              y: [1, -1.5, 1],
              opacity: [0.85, 0.4, 0.85] 
            }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.rect 
            x="138" y="28" width="8.5" height="8.5" rx="1.5" 
            fill="#0052FF"
            animate={{ 
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
          <motion.rect 
            x="149" y="28" width="8.5" height="8.5" rx="1.5" 
            fill="#00D2FF" 
            animate={{ 
              y: [0, -1.2, 0],
              opacity: [0.95, 0.5, 0.95] 
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.rect 
            x="161" y="28" width="8.5" height="8.5" rx="1.5" 
            fill="#10E599" 
            animate={{ 
              y: [-1, 1, -1],
              opacity: [0.5, 0.95, 0.5] 
            }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.rect x="127" y="40" width="9" height="9" rx="1.5" fill="#0A1E4A" />
          <motion.rect x="139" y="40" width="9" height="9" rx="1.5" fill="#0052FF" />
          <motion.rect x="150" y="40" width="9" height="9" rx="1.5" fill="#00D2FF" />
          <motion.rect x="116" y="52" width="9" height="9" rx="1.5" fill="#040D1E" />
          <motion.rect x="128" y="52" width="9" height="9" rx="1.5" fill="#0070F3" />
          <motion.rect x="140" y="52" width="9" height="9" rx="1.5" fill="#00C6FF" />
        </g>


        {/* ==================== 2. LETTER 'A' (Triangular Chevron) ==================== */}
        <motion.g
          animate={{
            y: isHovered ? -1.5 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <path
            d="M 188 114 L 218 54 L 248 114 L 230 114 L 218 88 L 206 114 Z"
            fill="url(#letterAGrad)"
          />
          <polygon 
            points="218,70 228,94 208,94" 
            fill="#071326" 
            opacity="0.98"
          />
        </motion.g>


        {/* ==================== 3. LETTER 'T' (Deep Obsidian Sapphire) ==================== */}
        <motion.g
          animate={{
            y: isHovered ? -1.5 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.04 }}
        >
          <path
            d="M 242 64 L 292 64 L 287 76 L 273 76 L 263 114 L 247 114 L 257 76 L 238 76 Z"
            fill="#071326"
          />
        </motion.g>


        {/* ==================== 4. LETTER 'L' (Deep Obsidian Sapphire) ==================== */}
        <motion.g
          animate={{
            y: isHovered ? -1.5 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 }}
        >
          <path
            d="M 282 64 L 298 64 L 287 102 L 322 102 L 318 114 L 269 114 Z"
            fill="#071326"
          />
        </motion.g>


        {/* ==================== 5. LETTER 'E' (With Quantum/Flora Gradient Accent) ==================== */}
        <motion.g
          animate={{
            y: isHovered ? -1.5 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.12 }}
        >
          <path d="M 332 64 L 384 64 L 378 76 L 328 76 Z" fill="#071326" />
          <path d="M 324 82 L 376 82 L 371 94 L 321 94 Z" fill="url(#letterEGrad)" />
          <path d="M 316 100 L 372 100 L 367 114 L 304 114 L 318 64 L 334 64 L 322 106 L 360 106 L 363 100 Z" fill="#071326" />
        </motion.g>


        {/* ==================== 6. SUBTITLE: INNOVATE • BUILD • GROW ==================== */}
        {showTagline && (
          <g>
            <line x1="44" y1="144" x2="90" y2="144" stroke="#00D2FF" strokeWidth="2.5" strokeLinecap="round" />

            <text 
              x="102" y="148" 
              fill="#071326" 
              fontSize="12.5" 
              fontWeight="900" 
              letterSpacing="0.22em" 
              fontFamily="system-ui, sans-serif"
            >
              INNOVATE
            </text>

            <circle cx="200" cy="144" r="3.5" fill="#0052FF" />

            <text 
              x="216" y="148" 
              fill="#071326" 
              fontSize="12.5" 
              fontWeight="900" 
              letterSpacing="0.22em" 
              fontFamily="system-ui, sans-serif"
            >
              BUILD
            </text>

            <circle cx="282" cy="144" r="3.5" fill="#059669" />

            <text 
              x="298" y="148" 
              fill="#071326" 
              fontSize="12.5" 
              fontWeight="900" 
              letterSpacing="0.22em" 
              fontFamily="system-ui, sans-serif"
            >
              GROW
            </text>

            <line x1="370" y1="144" x2="416" y2="144" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
      </motion.svg>
    </div>
  );
}
