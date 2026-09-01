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
    <div className={cn("relative w-full max-w-4xl mx-auto flex items-center justify-center select-none", className)}>
      <svg
        className="w-full h-auto overflow-visible"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            
            {/* Line 1 */}
            <text
              x="600"
              y="110"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="130"
              fontWeight="900"
              letterSpacing="-3"
              fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
            >
              {line1}
            </text>

            {/* Line 2 */}
            <text
              x="600"
              y="240"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="130"
              fontWeight="900"
              letterSpacing="-3"
              fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
            >
              {line2}
            </text>
          </mask>
        </defs>

        <foreignObject width="100%" height="100%" mask={`url(#${maskId})`}>
          <div className="w-full h-full relative" style={{ width: "100%", height: "300px" }}>
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ minHeight: "300px" }}
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

export default VideoText;
