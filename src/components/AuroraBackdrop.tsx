"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AuroraBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Accessibility Check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 2. Mouse Tracking with Smooth Lerp Trailing
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let smoothMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isVisible = !document.hidden;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 3. Floating Interactive Particles Setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Colors matching brand palette: Sky Blue, Royal Blue, Purple, Teal, Emerald
    const PARTICLE_COLORS = [
      "rgba(14, 165, 233, ",  // Sky Blue #0EA5E9
      "rgba(59, 130, 246, ",  // Royal Blue #3B82F6
      "rgba(139, 92, 246, ",  // Purple #8B5CF6
      "rgba(20, 184, 166, ",  // Teal #14B8A6
      "rgba(16, 229, 153, ",  // Emerald #10E599
    ];

    const PARTICLE_COUNT = Math.min(80, Math.max(50, Math.floor(window.innerWidth / 20)));
    interface AmbientParticle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      colorBase: string;
      floatSpeed: number;
      phase: number;
      phaseY: number;
    }

    const particles: AmbientParticle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        radius: 2.2 + Math.random() * 2.5,
        baseAlpha: 0.38 + Math.random() * 0.42,
        colorBase: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        floatSpeed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
      });
    }

    // 4. Animation Loop (Particles + Mouse Trailing Spotlight)
    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Smooth lerp trailing for the mouse spotlight
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.09;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.09;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${smoothMouse.x - 325}px, ${smoothMouse.y - 325}px, 0)`;
      }

      if (!prefersReducedMotion) {
        clock += 0.014;
        ctx.clearRect(0, 0, width, height);

        const REPEL_RADIUS = 135;
        const REPEL_RADIUS_SQ = REPEL_RADIUS * REPEL_RADIUS;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Buoyant natural drift
          const floatX = p.originX + Math.sin(clock * p.floatSpeed + p.phase) * 22;
          const floatY = p.originY + Math.cos(clock * p.floatSpeed * 0.8 + p.phaseY) * 18;

          // Mouse Repulsion Physics
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < REPEL_RADIUS_SQ && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
            const angle = Math.atan2(dy, dx);
            // Push away dynamically
            p.vx += Math.cos(angle) * force * 2.8;
            p.vy += Math.sin(angle) * force * 2.8;
          }

          // Spring back toward natural floating position
          const returnForceX = (floatX - p.x) * 0.04;
          const returnForceY = (floatY - p.y) * 0.04;

          p.vx = (p.vx + returnForceX) * 0.88; // Damping
          p.vy = (p.vy + returnForceY) * 0.88;

          p.x += p.vx;
          p.y += p.vy;

          // Wrap particles around screen edges smoothly
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          // Draw Particle with soft glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.colorBase}${p.baseAlpha})`;
          ctx.shadowColor = `${p.colorBase}0.55)`;
          ctx.shadowBlur = 5;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 5. Visibility Change (Pause animations when tab unfocused)
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* ── Layer 1: Deep Mesh Gradient Background & Spotlight (z-0) ── */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Soft Base Foundation */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #f8faff 0%, #f1f5f9 100%)",
          }}
        />

        {/* Animated Mesh Gradient Blobs */}
        <div className="absolute inset-0 overflow-hidden filter blur-[90px] sm:blur-[115px] opacity-85">
          {/* Blob 1: Blue #3B82F6 — Top Right */}
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              top: "-5%",
              right: "5%",
              width: "600px",
              height: "600px",
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(59, 130, 246, 0.05) 65%, transparent 75%)",
              animation: "meshBlobBlue 18s ease-in-out infinite alternate",
            }}
          />

          {/* Blob 2: Purple #8B5CF6 — Middle Left */}
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              top: "22%",
              left: "-4%",
              width: "640px",
              height: "640px",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(139, 92, 246, 0.04) 60%, transparent 75%)",
              animation: "meshBlobPurple 20s ease-in-out infinite alternate",
            }}
          />

          {/* Blob 3: Teal #14B8A6 — Bottom Center / Right */}
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              bottom: "8%",
              right: "18%",
              width: "560px",
              height: "560px",
              background: "radial-gradient(circle, rgba(20, 184, 166, 0.20) 0%, rgba(20, 184, 166, 0.04) 65%, transparent 75%)",
              animation: "meshBlobTeal 17s ease-in-out infinite alternate",
            }}
          />

          {/* Blob 4: Soft White #FFFFFF — Luminous Center Highlight */}
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              top: "15%",
              left: "30%",
              width: "740px",
              height: "500px",
              background: "radial-gradient(ellipse, rgba(255, 255, 255, 0.7) 0%, transparent 70%)",
              animation: "meshBlobWhite 16s ease-in-out infinite alternate",
            }}
          />
        </div>

        {/* Subtle Dot-Grid Texture Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(15, 23, 42, 0.55) 1.2px, transparent 1.2px)",
            backgroundSize: "26px 26px",
            opacity: 0.055,
          }}
        />

        {/* Mouse-Follow Interactive Glow Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 w-[650px] h-[650px] rounded-full pointer-events-none will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, rgba(20, 184, 166, 0.16) 32%, rgba(139, 92, 246, 0.08) 55%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ── Layer 2: Interactive Floating Particles Canvas (z-15, over background & between elements) ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none h-full w-full"
        style={{ zIndex: 15 }}
        aria-hidden="true"
      />

      {/* ── GPU-Accelerated Keyframe Morph Animations ── */}
      <style jsx global>{`
        @keyframes meshBlobBlue {
          0% {
            transform: translate3d(0px, 0px, 0) scale(1);
          }
          50% {
            transform: translate3d(-70px, 80px, 0) scale(1.12);
          }
          100% {
            transform: translate3d(50px, 40px, 0) scale(0.95);
          }
        }

        @keyframes meshBlobPurple {
          0% {
            transform: translate3d(0px, 0px, 0) scale(1);
          }
          50% {
            transform: translate3d(90px, -60px, 0) scale(1.08);
          }
          100% {
            transform: translate3d(40px, 70px, 0) scale(0.92);
          }
        }

        @keyframes meshBlobTeal {
          0% {
            transform: translate3d(0px, 0px, 0) scale(1);
          }
          50% {
            transform: translate3d(-80px, -50px, 0) scale(1.14);
          }
          100% {
            transform: translate3d(60px, -30px, 0) scale(0.96);
          }
        }

        @keyframes meshBlobWhite {
          0% {
            transform: translate3d(0px, 0px, 0) scale(1);
          }
          50% {
            transform: translate3d(40px, 50px, 0) scale(1.06);
          }
          100% {
            transform: translate3d(-50px, -30px, 0) scale(0.94);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .will-change-transform {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}