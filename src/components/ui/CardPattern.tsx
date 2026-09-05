"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardPatternProps {
 variant?: "bio-hex" | "circuit" | "topographic" | "telemetry";
 pattern?: "dots" | "circuit" | "grid" | string;
 glowColor?: string;
 position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
 theme?: "colored" | "neutral" | "emerald" | "cyan" | "amber" | "auto";
 className?: string;
}

export function CardPattern({
 variant = "bio-hex",
 pattern,
 glowColor,
 position = "top-right",
 theme = "auto",
 className,
}: CardPatternProps) {
 const activeVariant = pattern === "circuit" ? "circuit" : (pattern === "dots" ? "bio-hex" : variant);
 // Position coordinate classes & gradient mask centers
 const positionConfig = {
 "top-right": {
 wrapper: "top-0 right-0",
 mask: "radial-gradient(circle at 100% 0%, black 25%, rgba(0,0,0,0.5) 60%, transparent 85%)",
 transform: "",
 },
 "bottom-right": {
 wrapper: "bottom-0 right-0",
 mask: "radial-gradient(circle at 100% 100%, black 25%, rgba(0,0,0,0.5) 60%, transparent 85%)",
 transform: "",
 },
 "top-left": {
 wrapper: "top-0 left-0",
 mask: "radial-gradient(circle at 0% 0%, black 25%, rgba(0,0,0,0.5) 60%, transparent 85%)",
 transform: "scaleX(-1)",
 },
 "bottom-left": {
 wrapper: "bottom-0 left-0",
 mask: "radial-gradient(circle at 0% 100%, black 25%, rgba(0,0,0,0.5) 60%, transparent 85%)",
 transform: "scaleX(-1)",
 },
 };

 const pos = positionConfig[position] || positionConfig["top-right"];

 // Adaptive Color & Opacity
 // Colored cards get crisp neon/cyan tones
 // Neutral/glass cards get subtle architectural tones in light mode and cyber-emerald in dark mode
 const themeClasses = {
 auto: "text-[#059669]/20 group-hover:text-[#059669]/35 ",
 colored: "text-[#10E599]/30 group-hover:text-[#10E599]/55",
 emerald: "text-[#059669]/25 group-hover:text-[#10E599]/50",
 cyan: "text-[#0052FF]/25 group-hover:text-[#00D2FF]/50",
 amber: "text-[#D97706]/25 group-hover:text-[#FBBF24]/50",
 neutral: "text-slate-900/10 group-hover:text-slate-900/20 ",
 };

 const selectedTheme = themeClasses[theme] || themeClasses.auto;

 return (
 <div
 aria-hidden="true"
 className={cn(
 "pointer-events-none absolute select-none overflow-hidden transition-all duration-500 z-0",
 pos.wrapper,
 "w-44 sm:w-60 md:w-72 h-44 sm:h-60 md:h-72",
 selectedTheme,
 className
 )}
 style={{
 WebkitMaskImage: pos.mask,
 maskImage: pos.mask,
 transform: pos.transform,
 ...(glowColor ? { color: glowColor } : {}),
 }}
 >
 {/* 1. VARIANT: BIO-HEX (Organic Agronomy Cell Lattice & Telemetry Hexagons) */}
 {activeVariant === "bio-hex" && (
 <svg
 viewBox="0 0 320 320"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="w-full h-full stroke-current"
 >
 <g strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
 {/* Primary Cluster - Isometric Hexagonal Hive */}
 <polygon points="320,60 270,30 220,60 220,120 270,150 320,120" />
 <polygon points="270,150 220,120 170,150 170,210 220,240 270,210" />
 <polygon points="220,60 170,30 120,60 120,120 170,150 220,120" />
 <polygon points="170,210 120,180 70,210 70,270 120,300 170,270" />
 <polygon points="320,180 270,150 270,210 270,270 320,300 320,240" />
 
 {/* Nested Inner Hexagons */}
 <polygon points="295,75 270,60 245,75 245,105 270,120 295,105" strokeWidth="0.8" strokeDasharray="3 3" />
 <polygon points="245,165 220,150 195,165 195,195 220,210 245,195" strokeWidth="0.8" strokeDasharray="2 2" />
 
 {/* Extended Telemetry Vectors */}
 <line x1="270" y1="30" x2="270" y2="0" strokeWidth="1" strokeDasharray="4 3" />
 <line x1="170" y1="30" x2="140" y2="10" strokeWidth="1" />
 <line x1="120" y1="60" x2="60" y2="30" strokeWidth="1" strokeDasharray="2 4" />
 <line x1="70" y1="210" x2="20" y2="180" strokeWidth="1" />
 <line x1="120" y1="300" x2="90" y2="320" strokeWidth="1" strokeDasharray="3 3" />
 <line x1="220" y1="240" x2="220" y2="310" strokeWidth="1" strokeDasharray="5 3" />

 {/* Junction Nodes & Crosshairs */}
 <circle cx="270" cy="150" r="3.5" fill="currentColor" />
 <circle cx="220" cy="60" r="2.5" fill="currentColor" />
 <circle cx="170" cy="150" r="3" fill="currentColor" />
 <circle cx="120" cy="120" r="2" fill="currentColor" />
 <circle cx="70" cy="210" r="2.5" fill="currentColor" />
 <circle cx="220" cy="240" r="3" fill="currentColor" />

 {/* Micro Crosshairs */}
 <path d="M165 150H175 M170 145V155" strokeWidth="1.2" />
 <path d="M265 60H275 M270 55V65" strokeWidth="1" />
 <path d="M115 60H125 M120 55V65" strokeWidth="1" />
 <path d="M215 240H225 M220 235V245" strokeWidth="1.2" />
 </g>

 {/* Micro Telemetry Data Ticks */}
 <g fontSize="7" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.8">
 <text x="240" y="24">#BIO.01</text>
 <text x="135" y="112">EC:1.2</text>
 <text x="80" y="196">WP:-33</text>
 <text x="235" y="255">pH:6.4</text>
 </g>
 </svg>
 )}

 {/* 2. VARIANT: CIRCUIT (IoT LoRaWAN Sensor Traces & Printed Micro-Lattice) */}
 {activeVariant === "circuit" && (
 <svg
 viewBox="0 0 320 320"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="w-full h-full stroke-current"
 >
 <g strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
 {/* Bus 1 */}
 <path d="M320 40H220L180 80H120L90 110H0" />
 <circle cx="220" cy="40" r="3" fill="currentColor" />
 <circle cx="180" cy="80" r="2.5" />
 <circle cx="90" cy="110" r="3" fill="currentColor" />

 {/* Bus 2 */}
 <path d="M320 90H260L210 140H140L100 180H20" strokeDasharray="5 3" />
 <circle cx="260" cy="90" r="2" />
 <circle cx="210" cy="140" r="3" fill="currentColor" />
 <circle cx="100" cy="180" r="2.5" />

 {/* Bus 3 */}
 <path d="M320 160H270L220 210H160L130 240H40" />
 <circle cx="270" cy="160" r="3" fill="currentColor" />
 <circle cx="160" cy="210" r="2" fill="currentColor" />
 <circle cx="130" cy="240" r="3" />

 {/* Bus 4 - Vertical drops */}
 <path d="M280 0V50L250 80V160L220 190V280" />
 <circle cx="280" cy="50" r="2.5" fill="currentColor" />
 <circle cx="220" cy="190" r="3" fill="currentColor" />

 {/* Bus 5 */}
 <path d="M320 230H250L200 280H110" strokeDasharray="3 4" />
 <circle cx="250" cy="230" r="3" />
 <circle cx="200" cy="280" r="3" fill="currentColor" />

 {/* Micro Integrated IC Pad */}
 <rect x="185" y="115" width="26" height="26" rx="4" strokeWidth="1" />
 <circle cx="198" cy="128" r="4" fill="currentColor" />
 </g>

 <g fontSize="7" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.8">
 <text x="245" y="32">LORA.TX</text>
 <text x="160" y="105">915MHz</text>
 <text x="225" y="180">SPI.BUS</text>
 </g>
 </svg>
 )}

 {/* 3. VARIANT: TOPOGRAPHIC (Ceylon Soil Elevation & Hydro Contours) */}
 {activeVariant === "topographic" && (
 <svg
 viewBox="0 0 320 320"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="w-full h-full stroke-current"
 >
 <g strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
 <path d="M320 30C280 40 240 60 210 100C180 140 160 200 110 230C60 260 20 270 0 300" />
 <path d="M320 70C270 85 230 110 190 145C150 180 135 235 90 265C50 290 10 295 0 320" strokeDasharray="4 3" />
 <path d="M320 115C260 130 210 160 175 195C140 230 110 280 60 305C30 318 10 320 0 320" />
 <path d="M320 160C250 180 190 215 155 250C120 285 90 315 40 320" strokeWidth="0.8" />
 <path d="M320 210C240 230 170 270 135 305C110 320 90 320 80 320" strokeDasharray="2 3" />
 <path d="M320 260C230 280 150 315 120 320" strokeWidth="0.8" />

 {/* Elevation Height Pins */}
 <circle cx="210" cy="100" r="2.5" fill="currentColor" />
 <circle cx="190" cy="145" r="2.5" fill="currentColor" />
 <circle cx="175" cy="195" r="2.5" fill="currentColor" />
 </g>

 <g fontSize="7" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.8">
 <text x="218" y="96">+142m</text>
 <text x="198" y="141">+128m</text>
 <text x="183" y="191">+114m</text>
 </g>
 </svg>
 )}

 {/* 4. VARIANT: TELEMETRY (Precision Crosshairs & Coordinates) */}
 {activeVariant === "telemetry" && (
 <svg
 viewBox="0 0 320 320"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="w-full h-full stroke-current"
 >
 <g strokeWidth="1" strokeLinecap="round">
 {/* Concentric Calibration Reticle */}
 <circle cx="260" cy="60" r="45" strokeDasharray="3 3" />
 <circle cx="260" cy="60" r="28" />
 <circle cx="260" cy="60" r="12" strokeDasharray="2 2" />
 <circle cx="260" cy="60" r="2.5" fill="currentColor" />
 <line x1="260" y1="5" x2="260" y2="115" strokeDasharray="4 4" />
 <line x1="205" y1="60" x2="315" y2="60" strokeDasharray="4 4" />

 {/* Secondary Reticle */}
 <circle cx="160" cy="180" r="32" strokeDasharray="2 3" />
 <circle cx="160" cy="180" r="16" />
 <circle cx="160" cy="180" r="2" fill="currentColor" />
 <line x1="160" y1="140" x2="160" y2="220" />
 <line x1="120" y1="180" x2="200" y2="180" />

 {/* Connecting Vector */}
 <line x1="240" y1="80" x2="180" y2="160" strokeDasharray="4 2" strokeWidth="1.2" />

 {/* Micro Crosses */}
 <path d="M95 100H105 M100 95V105" />
 <path d="M215 250H225 M220 245V255" />
 <path d="M75 220H85 M80 215V225" />
 </g>

 <g fontSize="7" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.8">
 <text x="210" y="24">SYS.GEO // 06°55'N</text>
 <text x="110" y="152">SENSOR.CAL // 99.8%</text>
 </g>
 </svg>
 )}
 </div>
 );
}

export default CardPattern;
