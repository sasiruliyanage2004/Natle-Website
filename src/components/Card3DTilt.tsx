"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  perspective?: number;
}

export default function Card3DTilt({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  perspective = 1000,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none)").matches
    );
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const xPercent = clientX / rect.width;
      const yPercent = clientY / rect.height;

      const rotX = ((0.5 - yPercent) * maxTilt).toFixed(2);
      const rotY = ((xPercent - 0.5) * maxTilt).toFixed(2);

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: "transform 0.08s ease-out",
        transformStyle: "preserve-3d",
      });

      if (glare) {
        setGlarePos({
          x: Math.round(xPercent * 100),
          y: Math.round(yPercent * 100),
          opacity: 1,
        });
      }
    },
    [isTouchDevice, maxTilt, perspective, scale, glare]
  );

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      transformStyle: "preserve-3d",
    });

    if (glare) {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [isTouchDevice, perspective, glare]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Holographic Specular Glare Layer */}
      {glare && !isTouchDevice && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(30, 127, 232, 0.22), rgba(255, 255, 255, 0.12) 30%, transparent 70%)`,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
}
