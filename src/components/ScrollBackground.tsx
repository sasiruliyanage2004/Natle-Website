"use client";

import React, { useEffect, useRef } from "react";

export default function ScrollBackground() {
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);
  const node5Ref = useRef<HTMLDivElement>(null);
  const auroraWaveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check user motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let targetProgress = 0;
    let smoothProgress = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let rafId: number | null = null;
    let startTime = performance.now();

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;

      // Calculate instantaneous scroll velocity with dampening
      const delta = Math.abs(scrollY - lastScrollY);
      scrollVelocity = Math.min(delta / 40, 1.5);
      lastScrollY = scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) / halfW;
      targetMouseY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    onScroll();

    const tick = (now: number) => {
      const elapsed = (now - startTime) * 0.001; // in seconds

      // Smooth lerp for scroll progress (0.055 for buttery inertia)
      smoothProgress += (targetProgress - smoothProgress) * 0.055;
      const p = smoothProgress;

      // Decay scroll velocity smoothly
      scrollVelocity *= 0.92;

      // Smooth mouse parallax lerp
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.05;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.05;
      const mx = smoothMouseX;
      const my = smoothMouseY;

      // NODE 1: Azure Blue Core (#1E7FE8)
      // Sweeps horizontally across from right (+26vw) to center-left (-20vw)
      if (node1Ref.current) {
        const x = Math.sin(p * Math.PI * 2.2) * 34 + Math.cos(elapsed * 0.6) * 4 + mx * 3;
        const y = p * 60 + Math.sin(elapsed * 0.8) * 5 + my * 2;
        const rot = p * 120 + elapsed * 7;
        const sc = (1 + Math.sin(p * Math.PI * 2) * 0.22) * (1 + scrollVelocity * 0.15);
        node1Ref.current.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rot}deg) scale(${sc})`;
      }

      // NODE 2: Electric Teal Flow (#0D9488)
      // Sweeps diagonally across from left (-24vw) to right (+28vw)
      if (node2Ref.current) {
        const x = -Math.cos(p * Math.PI * 2.0) * 32 + Math.sin(elapsed * 0.7) * 4 - mx * 2.5;
        const y = -p * 45 + Math.cos(elapsed * 0.9) * 5 - my * 2.5;
        const rot = p * -95 - elapsed * 6;
        const sc = (1 + Math.cos(p * Math.PI * 2.4) * 0.2) * (1 + scrollVelocity * 0.12);
        node2Ref.current.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rot}deg) scale(${sc})`;
      }

      // NODE 3: Vibrant Lime Glow (#84CC16)
      // Floats upwards through the center in an undulating S-curve
      if (node3Ref.current) {
        const x = Math.sin(p * Math.PI * 2.8 + 1.2) * 28 + Math.cos(elapsed * 0.5) * 5 + mx * 2;
        const y = (0.7 - p * 0.85) * 55 + Math.sin(elapsed * 0.7) * 4 + my * 2;
        const rot = p * 135 + elapsed * 9;
        const sc = (0.95 + Math.sin(p * Math.PI * 3) * 0.22) * (1 + scrollVelocity * 0.1);
        node3Ref.current.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rot}deg) scale(${sc})`;
      }

      // NODE 4: Royal Violet / Orchid (#8B5CF6)
      // Ascends and broadens to create rich contrast behind complex sections
      if (node4Ref.current) {
        const x = Math.cos(p * Math.PI * 2.2 + 2.0) * 30 + Math.sin(elapsed * 0.6) * 4 - mx * 2;
        const y = p * -38 + Math.cos(elapsed * 0.8) * 6 + my * 2;
        const rot = p * -110 + elapsed * 7;
        const sc = (1 + Math.sin(p * Math.PI * 2.5) * 0.24) * (1 + scrollVelocity * 0.1);
        node4Ref.current.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rot}deg) scale(${sc})`;
      }

      // NODE 5: Solar Amber Accent (#F59E0B)
      // Dynamic prismatic flare orbiting harmoniously between colors
      if (node5Ref.current) {
        const x = Math.sin(p * Math.PI * 3.4 + elapsed * 0.8) * 24 + mx * 3.5;
        const y = Math.cos(p * Math.PI * 2.8 + elapsed * 0.6) * 22 + my * 3.5;
        const rot = elapsed * 16;
        const sc = (0.85 + Math.sin(elapsed * 1.2) * 0.18) * (1 + scrollVelocity * 0.12);
        node5Ref.current.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rot}deg) scale(${sc})`;
      }

      // AURORA STREAM: Diagonal glowing ribbon that undulates and shifts angle
      if (auroraWaveRef.current) {
        const x = Math.sin(p * Math.PI * 1.8) * 18 + mx * 1.5;
        const y = p * 30 - 15;
        const rot = -18 + p * 36;
        const scY = 1 + scrollVelocity * 0.2;
        auroraWaveRef.current.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rot}deg) scaleY(${scY})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#FCFDFE]"
      aria-hidden="true"
    >
      {/* AURORA STREAM: Diagonal fluid glowing ribbon connecting the nodes */}
      <div
        ref={auroraWaveRef}
        className="absolute -top-[20vh] -left-[20vw] w-[140vw] h-[55vh] opacity-[0.22] blur-[85px] md:blur-[120px] will-change-transform"
        style={{
          background:
            "linear-gradient(115deg, rgba(30,127,232,0.8) 0%, rgba(13,148,136,0.6) 35%, rgba(132,204,22,0.5) 70%, rgba(245,158,11,0.4) 100%)",
        }}
      />

      {/* NODE 1: Azure Blue Core (#1E7FE8) - Top Right drifting across to Left */}
      <div
        ref={node1Ref}
        className="absolute -top-[12vw] right-[8vw] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#1E7FE8]/28 blur-[75px] md:blur-[105px] animate-liquid-1 will-change-transform"
      />

      {/* NODE 2: Electric Teal Flow (#0D9488) - Mid Left drifting across to Right */}
      <div
        ref={node2Ref}
        className="absolute top-[28vh] -left-[10vw] w-[46vw] h-[46vw] max-w-[650px] max-h-[650px] bg-[#0D9488]/26 blur-[75px] md:blur-[105px] animate-liquid-2 will-change-transform"
      />

      {/* NODE 3: Vibrant Lime Glow (#84CC16) - Lower center S-curve */}
      <div
        ref={node3Ref}
        className="absolute top-[70vh] left-[20vw] w-[44vw] h-[44vw] max-w-[600px] max-h-[600px] bg-[#84CC16]/22 blur-[80px] md:blur-[110px] animate-liquid-3 will-change-transform"
      />

      {/* NODE 4: Royal Violet / Orchid (#8B5CF6) - Lower right ascending */}
      <div
        ref={node4Ref}
        className="absolute top-[110vh] right-[12vw] w-[48vw] h-[48vw] max-w-[660px] max-h-[660px] bg-[#8B5CF6]/24 blur-[85px] md:blur-[115px] animate-liquid-1 will-change-transform"
      />

      {/* NODE 5: Solar Amber Accent (#F59E0B) - Prismatic orbiting flare */}
      <div
        ref={node5Ref}
        className="absolute top-[50vh] left-[40vw] w-[32vw] h-[32vw] max-w-[440px] max-h-[440px] bg-[#F59E0B]/20 blur-[65px] md:blur-[95px] animate-liquid-2 will-change-transform"
      />

      {/* Blueprint Dot Grid Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage: `radial-gradient(rgba(10, 10, 10, 0.05) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
