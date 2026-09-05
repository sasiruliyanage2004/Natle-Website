"use client";

import React, { useId, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface VideoTextProps {
 src?: string;
 line1?: string;
 line2?: string;
 align?: "left" | "center";
 className?: string;
}

export function VideoText({
 src = "/videos/agriculture-crop-field.webm",
 line1 = "Empowering",
 line2 = "Agriculture",
 align = "center",
 className,
}: VideoTextProps) {
 const maskId = useId().replace(/:/g, "_");
 const isLeft = align === "left";
 const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

 useEffect(() => {
 const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
 setPrefersReducedMotion(mediaQuery.matches);

 const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
 mediaQuery.addEventListener("change", handler);
 return () => mediaQuery.removeEventListener("change", handler);
 }, []);

 return (
 <div
 className={cn(
 "relative w-full overflow-visible select-none flex flex-col items-center",
 isLeft ? "items-start text-left" : "items-center text-center",
 className
 )}
 >
 {/* 1. Subtle Dark Radial Vignette for High Text Silhouette Contrast */}
 <div 
 className={cn(
 "absolute pointer-events-none -z-20 rounded-full blur-[70px] transition-opacity duration-700",
 isLeft 
 ? "left-0 top-1/2 -translate-y-1/2 w-[580px] h-[260px] bg-black/70 " 
 : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[300px] bg-black/60 "
 )} 
 />

 {/* 2. Ambient Flora-Emerald & Cyan Halo Glow */}
 <div 
 className={cn(
 "absolute pointer-events-none -z-10 rounded-full blur-[100px] opacity-40 transition-opacity duration-700",
 isLeft 
 ? "left-0 top-1/2 -translate-y-1/2 w-[550px] h-[220px] bg-gradient-to-r from-[#00D2FF]/20 via-[#10E599]/25 to-transparent" 
 : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[260px] bg-gradient-to-r from-[#00D2FF]/20 via-[#10E599]/25 to-[#059669]/20"
 )} 
 />

 {/* 3. SVG Display Headline with Video Mask & Instant Gradient Fallback */}
 <svg
 className="w-full h-auto overflow-visible block drop-shadow-[0_4px_24px_rgba(7,19,38,0.35)] )]"
 viewBox={isLeft ? "0 0 1050 280" : "0 0 1200 320"}
 preserveAspectRatio={isLeft ? "xMinYMid meet" : "xMidYMid meet"}
 >
 <defs>
 {/* Brand Gradient for Pre-load & Reduced-Motion Fallback */}
 <linearGradient id={`${maskId}_grad`} x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="#10E599" />
 <stop offset="45%" stopColor="#059669" />
 <stop offset="100%" stopColor="#00D2FF" />
 </linearGradient>

 {/* Precision Text Shape Mask with font-black 900 weight */}
 <mask id={maskId}>
 <rect width="100%" height="100%" fill="black" />

 {/* Line 1: Empowering — Heavyweight 900 Display */}
 <text
 x={isLeft ? "10" : "600"}
 y={isLeft ? "100" : "110"}
 textAnchor={isLeft ? "start" : "middle"}
 dominantBaseline="middle"
 fill="white"
 fontSize={isLeft ? "124" : "136"}
 fontWeight="900"
 letterSpacing={isLeft ? "-2" : "-3.5"}
 fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
 >
 {line1}
 </text>

 {/* Line 2: Agriculture — Heavyweight 900 Display */}
 <text
 x={isLeft ? "10" : "600"}
 y={isLeft ? "232" : "248"}
 textAnchor={isLeft ? "start" : "middle"}
 dominantBaseline="middle"
 fill="white"
 fontSize={isLeft ? "124" : "136"}
 fontWeight="900"
 letterSpacing={isLeft ? "-2" : "-3.5"}
 fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
 >
 {line2}
 </text>
 </mask>
 </defs>

 {/* 1. Masked Video Container (Always active & playing) */}
 {!prefersReducedMotion ? (
 <foreignObject
 x="0"
 y="0"
 width="100%"
 height="100%"
 mask={`url(#${maskId})`}
 >
 <div className="w-full h-full relative overflow-hidden bg-slate-950">
 <video
 autoPlay
 loop
 muted
 playsInline
 className="w-full h-full object-cover"
 style={{
 minHeight: isLeft ? "280px" : "320px",
 filter: "brightness(1.35) contrast(1.25) saturate(1.45)",
 }}
 >
 <source src={src} type="video/webm" />
 <source src="https://cdn.magicui.design/ocean-small.webm" type="video/webm" />
 </video>
 </div>
 </foreignObject>
 ) : (
 /* 2. Reduced-Motion Static Gradient Text Fallback */
 <g>
 <text
 x={isLeft ? "10" : "600"}
 y={isLeft ? "100" : "110"}
 textAnchor={isLeft ? "start" : "middle"}
 dominantBaseline="middle"
 fill={`url(#${maskId}_grad)`}
 fontSize={isLeft ? "124" : "136"}
 fontWeight="900"
 letterSpacing={isLeft ? "-2" : "-3.5"}
 fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
 >
 {line1}
 </text>
 <text
 x={isLeft ? "10" : "600"}
 y={isLeft ? "232" : "248"}
 textAnchor={isLeft ? "start" : "middle"}
 dominantBaseline="middle"
 fill={`url(#${maskId}_grad)`}
 fontSize={isLeft ? "124" : "136"}
 fontWeight="900"
 letterSpacing={isLeft ? "-2" : "-3.5"}
 fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
 >
 {line2}
 </text>
 </g>
 )}
 </svg>
 </div>
 );
}

export default VideoText;
