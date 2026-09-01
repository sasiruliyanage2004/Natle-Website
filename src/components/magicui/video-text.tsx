"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface VideoTextProps {
  src?: string;
  line1?: string;
  line2?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
}

export function VideoText({
  src = "/videos/agriculture-hero.mp4",
  line1 = "Empowering",
  line2 = "Agriculture",
  align = "center",
  className,
}: VideoTextProps) {
  const maskId = useId().replace(/:/g, "_");
  const isLeft = align === "left";

  return (
    <div
      className={cn(
        "relative w-full overflow-visible select-none flex items-center",
        isLeft ? "justify-start text-left" : "justify-center text-center",
        className
      )}
    >
      {/* Luminous Ambient Back-Glow for High Visibility */}
      <div 
        className={cn(
          "absolute pointer-events-none -z-10 rounded-full blur-[80px] opacity-80",
          isLeft 
            ? "left-0 top-1/2 -translate-y-1/2 w-[550px] h-[220px] bg-gradient-to-r from-[#00d2ff]/25 via-[#10e599]/30 to-transparent" 
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[260px] bg-gradient-to-r from-[#00d2ff]/25 via-[#10e599]/30 to-[#059669]/25"
        )} 
      />

      <svg
        className="w-full h-auto overflow-visible block"
        viewBox={isLeft ? "0 0 1050 270" : "0 0 1200 300"}
        preserveAspectRatio={isLeft ? "xMinYMid meet" : "xMidYMid meet"}
        style={{
          filter: "drop-shadow(0 0 25px rgba(16, 229, 153, 0.4)) drop-shadow(0 4px 18px rgba(0, 0, 0, 0.7))",
        }}
      >
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />

            {/* Line 1: Empowering */}
            <text
              x={isLeft ? "10" : "600"}
              y={isLeft ? "100" : "110"}
              textAnchor={isLeft ? "start" : "middle"}
              dominantBaseline="middle"
              fill="white"
              fontSize={isLeft ? "120" : "130"}
              fontWeight="900"
              letterSpacing={isLeft ? "-2" : "-3"}
              fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
            >
              {line1}
            </text>

            {/* Line 2: Agriculture */}
            <text
              x={isLeft ? "10" : "600"}
              y={isLeft ? "225" : "240"}
              textAnchor={isLeft ? "start" : "middle"}
              dominantBaseline="middle"
              fill="white"
              fontSize={isLeft ? "120" : "130"}
              fontWeight="900"
              letterSpacing={isLeft ? "-2" : "-3"}
              fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
            >
              {line2}
            </text>
          </mask>
        </defs>

        {/* 1. Masked Agriculture / Green Plantation Video Container */}
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          mask={`url(#${maskId})`}
        >
          <div className="w-full h-full relative overflow-hidden bg-emerald-900">
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{
                minHeight: isLeft ? "280px" : "300px",
                filter: "brightness(1.35) contrast(1.2) saturate(1.4)",
              }}
            />
          </div>
        </foreignObject>

        {/* 2. Crisp Edge Definition Outlines for Razor-Sharp Readability */}
        <text
          x={isLeft ? "10" : "600"}
          y={isLeft ? "100" : "110"}
          textAnchor={isLeft ? "start" : "middle"}
          dominantBaseline="middle"
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1.5"
          fontSize={isLeft ? "120" : "130"}
          fontWeight="900"
          letterSpacing={isLeft ? "-2" : "-3"}
          fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
          className="pointer-events-none"
        >
          {line1}
        </text>

        <text
          x={isLeft ? "10" : "600"}
          y={isLeft ? "225" : "240"}
          textAnchor={isLeft ? "start" : "middle"}
          dominantBaseline="middle"
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1.5"
          fontSize={isLeft ? "120" : "130"}
          fontWeight="900"
          letterSpacing={isLeft ? "-2" : "-3"}
          fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
          className="pointer-events-none"
        >
          {line2}
        </text>
      </svg>
    </div>
  );
}

export default VideoText;
