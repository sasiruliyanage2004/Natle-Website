"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface TilesProps {
  className?: string
  rows?: number
  cols?: number
  tileClassName?: string
  tileSize?: "sm" | "md" | "lg"
}

export function Tiles({
  className,
  rows = 150,
  cols = 40,
  tileClassName,
  tileSize = "lg",
}: TilesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Calculate which tile is currently hovered
      const bounds = containerRef.current.getBoundingClientRect();
      
      // Get tile size in pixels based on the prop
      const sizeMap = { sm: 32, md: 48, lg: 64 };
      const currentSize = sizeMap[tileSize];
      
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      
      if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) return;
      
      const col = Math.floor(x / currentSize);
      const row = Math.floor(y / currentSize);
      
      // Calculate 1D index
      const index = row * cols + col;
      
      const tiles = containerRef.current.children as HTMLCollectionOf<HTMLDivElement>;
      if (index >= 0 && index < tiles.length) {
        const tile = tiles[index];
        
        if (activeTileRef.current !== tile) {
          if (activeTileRef.current) {
            activeTileRef.current.style.transition = "background-color 2s ease-out";
            activeTileRef.current.style.backgroundColor = "transparent";
          }
          
          tile.style.transition = "none";
          tile.style.backgroundColor = "var(--tile)";
          activeTileRef.current = tile;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cols, tileSize]);

  const rowsArray = new Array(rows).fill(1)
  const colsArray = new Array(cols).fill(1)

  const sizeClasses = {
    sm: "w-8 h-8 min-w-8 min-h-8",
    md: "w-12 h-12 min-w-12 min-h-12",
    lg: "w-16 h-16 min-w-16 min-h-16",
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative flex flex-wrap justify-start items-start overflow-hidden",
        className
      )}
      style={{ width: `${cols * 64}px` }}
    >
      {rowsArray.map((_, i) => (
        colsArray.map((_, j) => (
          <div
            key={`${i}-${j}`}
            className={cn(
              sizeClasses[tileSize],
              "border-r border-t border-slate-900/5 dark:border-white/5",
              tileClassName
            )}
          />
        ))
      ))}
    </div>
  )
}
