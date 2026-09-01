"use client";

import React, { useEffect, useRef } from "react";

export default function KineticFluidMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      isMoving: false,
    };

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY + scrollY * 0.15;
      mouse.isMoving = true;
    };
    window.addEventListener("mousemove", handleMouseMove);

    interface Particle {
      originX: number;
      originY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseAlpha: number;
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const cols = Math.floor(width / 42);
      const rows = Math.floor(height / 42);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = (c + 0.5) * (width / cols);
          const originY = (r + 0.5) * (height / rows);
          
          // System 01: Quantum Bio-Sapphire (#0052FF), Cyber Cyan (#00D2FF), Ceylon Flora (#059669)
          const isGreen = (r + c) % 3 === 0;
          const isCyan = (r + c) % 3 === 1;
          const color = isGreen ? "#059669" : isCyan ? "#00D2FF" : "#0052FF";

          particles.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            size: (r + c) % 4 === 0 ? 2.5 : 1.8,
            color,
            baseAlpha: 0.25,
          });
        }
      }
    };

    initParticles();

    let time = 0;
    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const waveX = Math.sin(time + p.originY * 0.015) * 4;
        const waveY = Math.cos(time + p.originX * 0.015) * 4;

        const dx = (p.x) - mouse.x;
        const dy = (p.y) - (mouse.y - scrollY);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 35;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.12;
          p.vy += Math.sin(angle) * force * 0.12;
        }

        const springX = (p.originX + waveX - p.x) * 0.08;
        const springY = (p.originY + waveY - p.y) * 0.08;

        p.vx += springX;
        p.vy += springY;

        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;

        const highlight = dist < mouse.radius ? (1 - dist / mouse.radius) : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + highlight * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha + highlight * 0.65;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const lineDx = p.x - p2.x;
          const lineDy = p.y - p2.y;
          const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDist < 54) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - lineDist / 54) * (0.1 + highlight * 0.3);
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
}
