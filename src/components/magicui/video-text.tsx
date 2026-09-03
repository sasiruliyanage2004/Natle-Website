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
  src = "https://cdn.magicui.design/ocean-small.webm",
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
          "absolute pointer-events-none -z-10 rounded-full blur-[90px] opacity-30 dark:opacity-80 transition-opacity",
          isLeft 
            ? "left-0 top-1/2 -translate-y-1/2 w-[550px] h-[220px] bg-gradient-to-r from-[#00d2ff]/20 via-[#10e599]/25 to-transparent" 
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[260px] bg-gradient-to-r from-[#00d2ff]/20 via-[#10e599]/25 to-[#059669]/20"
        )} 
      />

      <svg
        className="w-full h-auto overflow-visible block drop-shadow-[0_12px_28px_rgba(7,19,38,0.22)] dark:drop-shadow-[0_0_25px_rgba(0,210,255,0.4)]"
        viewBox={isLeft ? "0 0 1050 270" : "0 0 1200 300"}
        preserveAspectRatio={isLeft ? "xMinYMid meet" : "xMidYMid meet"}
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

        {/* 1. Masked Pristine Video Container */}
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          mask={`url(#${maskId})`}
        >
          <div className="w-full h-full relative overflow-hidden bg-[#071326]">
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{
                minHeight: isLeft ? "280px" : "300px",
                filter: "brightness(1.4) contrast(1.25) saturate(1.45)",
              }}
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

export default VideoText;
