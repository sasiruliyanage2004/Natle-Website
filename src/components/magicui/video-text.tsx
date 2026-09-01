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
      <svg
        className="w-full h-auto overflow-visible block"
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

        <foreignObject width="100%" height="100%" mask={`url(#${maskId})`}>
          <div className="w-full h-full relative" style={{ width: "100%", height: isLeft ? "280px" : "300px" }}>
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ minHeight: isLeft ? "280px" : "300px" }}
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

export default VideoText;
