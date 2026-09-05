"use client";

import React, { useEffect, useRef } from "react";

export default function AuroraBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Mouse Tracking with Smooth Lerp Trailing for Spotlight
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let smoothMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isVisible = !document.hidden;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 2. Spotlight Animation Loop
    let animationFrameId: number;

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Smooth lerp trailing for the mouse spotlight
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${smoothMouse.x - 300}px, ${smoothMouse.y - 300}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 3. Visibility Change (Pause animations when tab unfocused)
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* ── Layer 1: Clean Mesh Gradient Background & Spotlight (z-0) ── */}
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
        <div className="absolute inset-0 overflow-hidden filter blur-[90px] sm:blur-[115px] opacity-80">
          {/* Blob 1: Blue #3B82F6 — Top Right */}
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              top: "-5%",
              right: "5%",
              width: "580px",
              height: "580px",
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.20) 0%, rgba(59, 130, 246, 0.04) 65%, transparent 75%)",
              animation: "meshBlobBlue 18s ease-in-out infinite alternate",
            }}
          />

          {/* Blob 2: Purple #8B5CF6 — Middle Left */}
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              top: "22%",
              left: "-4%",
              width: "600px",
              height: "600px",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.16) 0%, rgba(139, 92, 246, 0.03) 60%, transparent 75%)",
              animation: "meshBlobPurple 20s ease-in-out infinite alternate",
            }}
          />

          {/* Blob 3: Teal #14B8A6 — Bottom Center / Right */}
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              bottom: "8%",
              right: "18%",
              width: "540px",
              height: "540px",
              background: "radial-gradient(circle, rgba(20, 184, 166, 0.18) 0%, rgba(20, 184, 166, 0.03) 65%, transparent 75%)",
              animation: "meshBlobTeal 17s ease-in-out infinite alternate",
            }}
          />

          {/* Blob 4: Soft White #FFFFFF — Luminous Center Highlight */}
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              top: "15%",
              left: "30%",
              width: "700px",
              height: "480px",
              background: "radial-gradient(ellipse, rgba(255, 255, 255, 0.65) 0%, transparent 70%)",
              animation: "meshBlobWhite 16s ease-in-out infinite alternate",
            }}
          />
        </div>

        {/* Pure Minimalist Black Micro-Dot Grid Overlay (Architectural & Clean) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#000000 1.1px, transparent 1.1px)",
            backgroundSize: "28px 28px",
            opacity: 0.045,
          }}
        />

        {/* Mouse-Follow Interactive Glow Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, rgba(20, 184, 166, 0.12) 30%, rgba(139, 92, 246, 0.05) 55%, transparent 70%)",
            filter: "blur(45px)",
          }}
        />
      </div>

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