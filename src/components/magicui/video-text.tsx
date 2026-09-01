"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface VideoTextProps {
  src?: string;
  children: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string | number;
  letterSpacing?: string;
  textAnchor?: "start" | "middle" | "end";
  aspectRatio?: string;
}

export function VideoText({
  src = "https://cdn.magicui.design/ocean-small.webm",
  children,
  className,
  fontSize = "110",
  fontWeight = "900",
  letterSpacing = "-0.04em",
  textAnchor = "middle",
}: VideoTextProps) {
  const maskId = useId().replace(/:/g, "_");

  return (
    <div className={cn("relative w-full flex items-center justify-center select-none", className)}>
      <svg
        className="w-full h-auto max-h-[140px] md:max-h-[180px] overflow-visible"
        viewBox="0 0 1000 160"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="68%"
              textAnchor={textAnchor}
              dominantBaseline="middle"
              fill="white"
              fontSize={fontSize}
              fontWeight={fontWeight}
              letterSpacing={letterSpacing}
              fontFamily="var(--font-sans), Inter, sans-serif"
            >
              {children}
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
