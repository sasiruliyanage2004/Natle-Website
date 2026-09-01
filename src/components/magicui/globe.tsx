"use client";

import createGlobe from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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

    // Exact high-visibility Magic UI Globe configuration
    const globe = (createGlobe as any)(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2 || 1200,
      height: width * 2 || 1200,
      phi: 0,
      theta: 0.3,
      dark: isDarkMode ? 1 : 0,
      diffuse: 1.6,
      scale: 1,
      mapSamples: 24000,
      mapBrightness: isDarkMode ? 6 : 2.5,
      mapBaseBrightness: 0.1,
      // Solid shaded globe body color so continents & sphere stand out boldly
      baseColor: isDarkMode ? [0.18, 0.22, 0.26] : [0.82, 0.88, 0.85],
      markerColor: [0.98, 0.42, 0.12],
      glowColor: isDarkMode ? [0.1, 0.4, 0.7] : [0.7, 0.85, 0.8],
      offset: [0, 0],
      markers: [
        // Colombo, Sri Lanka (Origin Hub)
        { location: [6.9271, 79.8612], size: 0.12, color: [0.98, 0.42, 0.12] },
        // Rotterdam, Netherlands
        { location: [51.9244, 4.4777], size: 0.08, color: [0, 0.6, 1] },
        // Los Angeles / California, USA
        { location: [34.0522, -118.2437], size: 0.08, color: [0.98, 0.42, 0.12] },
        // Tokyo, Japan
        { location: [35.6762, 139.6503], size: 0.08, color: [0.98, 0.42, 0.12] },
        // Sydney, Australia
        { location: [-33.8688, 151.2093], size: 0.08, color: [0.98, 0.42, 0.12] },
        // Dubai, UAE
        { location: [25.2048, 55.2708], size: 0.08, color: [0.98, 0.42, 0.12] },
        // Hamburg, Germany
        { location: [53.5511, 9.9937], size: 0.07, color: [0, 0.6, 1] },
      ],
      arcs: [
        { from: [6.9271, 79.8612], to: [51.9244, 4.4777], color: [0, 0.65, 1] },
        { from: [6.9271, 79.8612], to: [34.0522, -118.2437], color: [0.05, 0.75, 0.45] },
        { from: [6.9271, 79.8612], to: [35.6762, 139.6503], color: [0.98, 0.45, 0.15] },
        { from: [6.9271, 79.8612], to: [-33.8688, 151.2093], color: [0.05, 0.75, 0.45] },
        { from: [6.9271, 79.8612], to: [25.2048, 55.2708], color: [0.98, 0.45, 0.15] },
      ],
      arcColor: [0, 0.65, 1],
      arcWidth: 0.6,
      arcHeight: 0.3,
      markerElevation: 0.04,
      onRender: (state: Record<string, any>) => {
        if (!pointerInteracting.current) phi += 0.005;
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
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[650px] flex items-center justify-center pointer-events-auto",
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
