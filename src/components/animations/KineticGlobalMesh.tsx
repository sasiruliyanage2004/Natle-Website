"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  colorType: number; // 0: emerald, 1: cyan, 2: mint
};

export default function KineticGlobalMesh({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, lastX: -9999, lastY: -9999 };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);

      // Node density: space grid every ~48px
      const spacing = width < 768 ? 58 : 46;
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);
      particles = [];

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i + 0.5) * (width / cols);
          const y = (j + 0.5) * (height / rows);
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            colorType: (i + j) % 3,
          });
        }
      }
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    let raf: number;
    function frame() {
      mouse.vx = mouse.x - mouse.lastX;
      mouse.vy = mouse.y - mouse.lastY;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      ctx!.clearRect(0, 0, width, height);

      // Physics update
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 140;

        if (dist < radius && dist > 0) {
          const force = (1 - dist / radius) * 5.8;
          const speed = Math.min(Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy), 40);
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * (0.4 + speed / 60);
          p.vy += Math.sin(angle) * force * (0.4 + speed / 60);
        }

        // Spring back to base position
        p.vx += (p.baseX - p.x) * 0.022;
        p.vy += (p.baseY - p.y) * 0.022;

        // Damping
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw connecting mesh lines
      ctx!.lineWidth = 1;
      const maxConnectDist = 52;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < maxConnectDistSq) {
            const opacity = 1 - d2 / maxConnectDistSq;
            if (isDark) {
              ctx!.strokeStyle = `rgba(16, 229, 153, ${opacity * 0.14})`;
            } else {
              ctx!.strokeStyle = `rgba(5, 150, 105, ${opacity * 0.12})`;
            }
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }
      }

      // Draw kinetic node dots
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNear = dist < 140;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, isNear ? 2.6 : 1.6, 0, Math.PI * 2);

        if (isDark) {
          if (isNear) {
            ctx!.fillStyle = "rgba(16, 229, 153, 0.95)";
          } else if (p.colorType === 0) {
            ctx!.fillStyle = "rgba(5, 150, 105, 0.4)";
          } else if (p.colorType === 1) {
            ctx!.fillStyle = "rgba(0, 210, 255, 0.4)";
          } else {
            ctx!.fillStyle = "rgba(16, 229, 153, 0.45)";
          }
        } else {
          if (isNear) {
            ctx!.fillStyle = "rgba(0, 82, 255, 0.85)";
          } else if (p.colorType === 0) {
            ctx!.fillStyle = "rgba(5, 150, 105, 0.3)";
          } else if (p.colorType === 1) {
            ctx!.fillStyle = "rgba(0, 210, 255, 0.35)";
          } else {
            ctx!.fillStyle = "rgba(0, 82, 255, 0.25)";
          }
        }
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    if (!prefersReduced) {
      frame();
    } else {
      // Static render for prefers-reduced-motion
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(16, 229, 153, 0.3)" : "rgba(5, 150, 105, 0.25)";
        ctx.fill();
      }
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500 ${className}`}
      aria-hidden="true"
    />
  );
}
