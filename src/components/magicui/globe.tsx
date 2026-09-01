"use client";

import createGlobe from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ExtendedCOBEOptions {
  width: number;
  height: number;
  phi: number;
  theta: number;
  mapSamples: number;
  mapBrightness: number;
  baseColor: [number, number, number];
  markerColor: [number, number, number];
  glowColor: [number, number, number];
  markers?: { location: [number, number]; size: number; color?: [number, number, number]; id?: string }[];
  arcs?: { from: [number, number]; to: [number, number]; color?: [number, number, number] }[];
  arcColor?: [number, number, number];
  arcWidth?: number;
  arcHeight?: number;
  markerElevation?: number;
  diffuse: number;
  devicePixelRatio: number;
  dark: number;
  scale?: number;
  offset?: [number, number];
  onRender?: (state: Record<string, any>) => void;
}

export function Globe({
  className,
}: {
  className?: string;
}) {
  let phi = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = canvasRef.current.clientWidth || 600;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.clientWidth || 600;
      }
    };

    window.addEventListener("resize", onResize);

    const isDarkMode = document.documentElement.classList.contains("dark");

    const globe = (createGlobe as any)(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2 || 1200,
      height: width * 2 || 1200,
      phi: 0,
      theta: 0.25,
      dark: isDarkMode ? 1 : 0,
      diffuse: 1.4,
      scale: 1,
      mapSamples: 18000,
      mapBrightness: 5.5,
      // Crisp continent dot grid contrast (Exact Magic UI palette)
      baseColor: isDarkMode ? [0.3, 0.35, 0.4] : [0.35, 0.4, 0.45],
      markerColor: [0.98, 0.45, 0.15],
      glowColor: isDarkMode ? [0.2, 0.3, 0.5] : [0.85, 0.9, 0.88],
      offset: [0, 0],
      markers: [
        // Colombo, Sri Lanka (Origin Hub)
        { location: [6.9271, 79.8612], size: 0.1, color: [0.98, 0.45, 0.15] },
        // Rotterdam, Netherlands
        { location: [51.9244, 4.4777], size: 0.08, color: [0, 0.65, 1] },
        // Los Angeles / California, USA
        { location: [34.0522, -118.2437], size: 0.08, color: [0.98, 0.45, 0.15] },
        // Tokyo, Japan
        { location: [35.6762, 139.6503], size: 0.08, color: [0.98, 0.45, 0.15] },
        // Sydney, Australia
        { location: [-33.8688, 151.2093], size: 0.08, color: [0.98, 0.45, 0.15] },
        // Dubai, UAE
        { location: [25.2048, 55.2708], size: 0.08, color: [0.98, 0.45, 0.15] },
        // Hamburg, Germany
        { location: [53.5511, 9.9937], size: 0.07, color: [0, 0.65, 1] },
      ],
      arcs: [
        { from: [6.9271, 79.8612], to: [51.9244, 4.4777], color: [0, 0.7, 1] },
        { from: [6.9271, 79.8612], to: [34.0522, -118.2437], color: [0.05, 0.8, 0.5] },
        { from: [6.9271, 79.8612], to: [35.6762, 139.6503], color: [0.98, 0.5, 0.2] },
        { from: [6.9271, 79.8612], to: [-33.8688, 151.2093], color: [0.05, 0.8, 0.5] },
        { from: [6.9271, 79.8612], to: [25.2048, 55.2708], color: [0.98, 0.5, 0.2] },
      ],
      arcColor: [0, 0.7, 1],
      arcWidth: 0.6,
      arcHeight: 0.28,
      markerElevation: 0.03,
      onRender: (state: Record<string, any>) => {
        if (!pointerInteracting.current) phi += 0.004;
        state.phi = phi + r;
        state.width = (canvasRef.current?.clientWidth || 600) * 2;
        state.height = (canvasRef.current?.clientWidth || 600) * 2;
      },
    });

    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [r]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[650px]",
        className
      )}
    >
      <canvas
        className="size-full opacity-100 transition-opacity duration-300 [contain:layout_paint_size] cursor-grab active:cursor-grabbing"
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
