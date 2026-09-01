"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface VideoTextProps {
  src?: string;
  line1?: string;
  line2?: string;
  children?: React.ReactNode;
  className?: string;
}

export function VideoText({
  src = "https://cdn.magicui.design/ocean-small.webm",
  line1 = "Empowering",
  line2 = "Agriculture",
  className,
}: VideoTextProps) {
  const maskId = useId().replace(/:/g, "_");

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto flex items-center justify-center select-none overflow-visible", className)}>
      <svg
        className="w-full h-auto max-h-[160px] sm:max-h-[220px] md:max-h-[260px] overflow-visible"
        viewBox="0 0 1000 260"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id={maskId}>
            {/* Background black: transparent for mask */}
            <rect width="100%" height="100%" fill="black" />
            
            {/* Line 1: Empowering */}
            <text
              x="50%"
              y="38%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="120"
              fontWeight="900"
              letterSpacing="-0.04em"
              fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
            >
              {line1}
            </text>

            {/* Line 2: Agriculture */}
            <text
              x="50%"
              y="85%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="120"
              fontWeight="900"
              letterSpacing="-0.04em"
              fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
            >
              {line2}
            </text>
          </mask>
        </defs>

        <foreignObject width="100%" height="100%" mask={`url(#${maskId})`}>
          <div className="w-full h-full relative">
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

export default VideoText;
