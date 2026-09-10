"use client";

import React, { useEffect, useRef } from "react";

export default function ScrollBackground() {
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const blobCRef = useRef<HTMLDivElement>(null);
  const blobDRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let targetProgress = 0;
    let smoothProgress = 0;
    let rafId: number | null = null;

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const tick = () => {
      // Eased smooth interpolation (0.055) for buttery continuous motion
      smoothProgress += (targetProgress - smoothProgress) * 0.055;
      const p = smoothProgress;

      // Parallax transforms on GPU compositor thread
      if (blobARef.current) {
        blobARef.current.style.transform = `translate3d(0, ${p * 55}vh, 0) rotate(${p * 35}deg)`;
      }
      if (blobBRef.current) {
        blobBRef.current.style.transform = `translate3d(0, ${p * -32}vh, 0) rotate(${p * -25}deg)`;
      }
      if (blobCRef.current) {
        blobCRef.current.style.transform = `translate3d(0, ${p * -55}vh, 0) scale(${1 + p * 0.25})`;
      }
      if (blobDRef.current) {
        blobDRef.current.style.transform = `translate3d(0, ${p * 40}vh, 0) scale(${1 + p * 0.2})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-paper"
      aria-hidden="true"
    >
      {/* Blob A: Azure Blue (Upper right drifting down) */}
      <div
        ref={blobARef}
        className="absolute -top-[10vw] right-[5vw] w-[48vw] h-[48vw] max-w-[680px] max-h-[680px] rounded-full bg-[#1E7FE8]/15 blur-[110px] md:blur-[150px] will-change-transform"
      />

      {/* Blob B: Soft Teal (Middle left drifting up) */}
      <div
        ref={blobBRef}
        className="absolute top-[35vh] -left-[8vw] w-[46vw] h-[46vw] max-w-[640px] max-h-[640px] rounded-full bg-[#12B8A6]/14 blur-[110px] md:blur-[150px] will-change-transform"
      />

      {/* Blob C: Soft Violet (Lower right) */}
      <div
        ref={blobCRef}
        className="absolute top-[75vh] right-[10vw] w-[46vw] h-[46vw] max-w-[650px] max-h-[650px] rounded-full bg-[#8B5CF6]/12 blur-[120px] md:blur-[160px] will-change-transform"
      />

      {/* Blob D: Soft Lime (Bottom left) */}
      <div
        ref={blobDRef}
        className="absolute top-[120vh] left-[8vw] w-[42vw] h-[42vw] max-w-[580px] max-h-[580px] rounded-full bg-[#6FCF3E]/12 blur-[110px] md:blur-[150px] will-change-transform"
      />

      {/* Blueprint Dot Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `radial-gradient(rgba(10, 10, 10, 0.05) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
