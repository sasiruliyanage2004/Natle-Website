"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export default function AnimeGridCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const grid = [14, 24]; // 14 rows, 24 columns
    const totalDots = grid[0] * grid[1];
    
    // Clear any existing dots
    containerRef.current.innerHTML = "";

    // Create dot elements
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div");
      dot.className = "anime-dot w-2 h-2 rounded-full bg-slate-300/40 transition-colors duration-300";
      containerRef.current.appendChild(dot);
    }

    // Initial Anime.js v4 Staggered Ripple Animation
    const playStagger = (fromIndex: number | "center" = "center") => {
      const dots = containerRef.current?.querySelectorAll(".anime-dot");
      if (!dots || dots.length === 0) return;

      animate(dots, {
        scale: [
          { to: 0.2, ease: "outQuad", duration: 350 },
          { to: 1.3, ease: "inOutQuad", duration: 700 },
          { to: 1, ease: "inOutQuad", duration: 500 }
        ],
        backgroundColor: [
          { to: "rgba(0, 102, 255, 0.7)", duration: 500 },
          { to: "rgba(16, 185, 129, 0.8)", duration: 700 },
          { to: "rgba(226, 232, 240, 0.35)", duration: 900 }
        ],
        delay: stagger(35, { grid: grid, from: fromIndex }),
      });
    };

    // Play on load
    playStagger("center");

    // Continuous wave interval
    const interval = setInterval(() => {
      playStagger("center");
    }, 7500);

    // Interactive mousemove ripple
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const col = Math.floor((x / rect.width) * grid[1]);
      const row = Math.floor((y / rect.height) * grid[0]);
      const index = Math.max(0, Math.min(totalDots - 1, row * grid[1] + col));

      const dots = containerRef.current?.querySelectorAll(".anime-dot");
      if (!dots) return;

      animate(dots, {
        scale: [
          { to: 1.4, duration: 250, ease: "outQuad" },
          { to: 1, duration: 450, ease: "outElastic(1, .6)" }
        ],
        backgroundColor: [
          { to: "#0066FF", duration: 200 },
          { to: "#10B981", duration: 400 },
          { to: "rgba(226, 232, 240, 0.35)", duration: 700 }
        ],
        delay: stagger(20, { grid: grid, from: index }),
      });
    };

    const containerEl = containerRef.current;
    containerEl.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(interval);
      containerEl.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-75 pointer-events-auto">
      <div
        ref={containerRef}
        className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-4 md:gap-6 p-6 max-w-6xl w-full cursor-crosshair select-none"
      />
    </div>
  );
}
