"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
};

export default function KineticMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    let scrollOffset = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);

      const cols = Math.floor(width / 46);
      const rows = Math.floor(height / 46);
      particles = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i + 0.5) * (width / cols);
          const y = (j + 0.5) * (height / rows);
          particles.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0 });
        }
      }
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onScroll() {
      scrollOffset = window.scrollY * 0.04;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf: number;
    function frame() {
      mouse.vx = mouse.x - mouse.lastX;
      mouse.vy = mouse.y - mouse.lastY;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        const targetY = p.baseY + scrollOffset;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 130;

        if (dist < radius) {
          const force = (1 - dist / radius) * 5.5;
          const speed = Math.min(Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy), 40);
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * (0.4 + speed / 60);
          p.vy += Math.sin(angle) * force * (0.4 + speed / 60);
        }

        // spring back to base
        p.vx += (p.baseX - p.x) * 0.02;
        p.vy += (targetY - p.y) * 0.02;
        // damping
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }

      ctx!.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 54 * 54) {
            const opacity = 1 - d2 / (54 * 54);
            ctx!.strokeStyle = `rgba(0, 82, 255, ${opacity * 0.12})`;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = dist < 130;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, near ? 2.1 : 1.4, 0, Math.PI * 2);
        ctx!.fillStyle = near ? "rgba(0, 210, 255, 0.65)" : "rgba(0, 82, 255, 0.22)";
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    if (!prefersReduced) {
      frame();
    } else {
      // static render, no animation loop
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 82, 255, 0.22)";
        ctx.fill();
      }
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
