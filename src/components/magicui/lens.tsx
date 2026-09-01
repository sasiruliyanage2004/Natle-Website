"use client";

import React, { useRef, useState, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: { x: number; y: number };
  isStatic?: boolean;
  duration?: number;
  lensColor?: string;
  ariaLabel?: string;
  className?: string;
}

export function Lens({
  children,
  zoomFactor = 1.8,
  lensSize = 160,
  isStatic = false,
  position = { x: 200, y: 150 },
  duration = 0.15,
  lensColor = "white",
  ariaLabel = "Zoom Lens",
  className,
}: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState(position);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const halfLens = lensSize / 2;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden cursor-crosshair group select-none", className)}
      aria-label={ariaLabel}
    >
      {/* Normal Image / Children */}
      {children}

      {/* Interactive Magnifying Glass Lens */}
      <AnimatePresence>
        {(isHovered || isStatic) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration }}
            style={{
              position: "absolute",
              left: `${mousePos.x - halfLens}px`,
              top: `${mousePos.y - halfLens}px`,
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              pointerEvents: "none",
            }}
            className="z-30 rounded-full border-2 border-white/90 shadow-[0_0_30px_rgba(0,82,255,0.4),inset_0_0_20px_rgba(255,255,255,0.5)] backdrop-blur-xs overflow-hidden"
          >
            {/* Magnified Image Projection */}
            <div
              style={{
                position: "absolute",
                left: `${-mousePos.x * zoomFactor + halfLens}px`,
                top: `${-mousePos.y * zoomFactor + halfLens}px`,
                transform: `scale(${zoomFactor})`,
                transformOrigin: "0 0",
                width: containerRef.current?.offsetWidth || "100%",
                height: containerRef.current?.offsetHeight || "100%",
              }}
            >
              {children}
            </div>

            {/* Lens Reflection Glass Shine Overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-[#00D2FF]/20 pointer-events-none" />
            
            {/* Center Precision Aim Cross */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-2 h-0.5 bg-white" />
              <div className="h-2 w-0.5 bg-white absolute" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
