"use client";

import { useEffect } from "react";

export default function AuroraBackdrop() {
  // Parallax aurora blobs on mouse move (Jiro-inspired depth)
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty("--mx", `${x}`);
      document.documentElement.style.setProperty("--my", `${y}`);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {/* ── Base gradient (very deep navy → near-black) ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 120% 80% at 50% -20%, #0d1f5c 0%, #020818 55%)",
        }}
      />

      {/* ── Aurora 1 — large cyan bloom top-left ── */}
      <div
        className="absolute"
        style={{
          top: "-15%",
          left: "-10%",
          width: "800px",
          height: "700px",
          background: "radial-gradient(circle, rgba(14,165,233,0.22) 0%, rgba(14,165,233,0.06) 45%, transparent 70%)",
          filter: "blur(80px)",
          transform: "calc(var(--mx, 0.5) * -20px) calc(var(--my, 0.5) * -10px)",
        }}
      />

      {/* ── Aurora 2 — lime glow bottom-right ── */}
      <div
        className="absolute"
        style={{
          bottom: "-10%",
          right: "-10%",
          width: "700px",
          height: "650px",
          background: "radial-gradient(circle, rgba(90,236,143,0.18) 0%, rgba(90,236,143,0.05) 45%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* ── Aurora 3 — deep blue center glow ── */}
      <div
        className="absolute"
        style={{
          top: "30%",
          left: "30%",
          width: "900px",
          height: "600px",
          background: "radial-gradient(circle, rgba(26,58,143,0.25) 0%, transparent 65%)",
          filter: "blur(120px)",
        }}
      />

      {/* ── Aurora 4 — small bright cyan spark top-right ── */}
      <div
        className="absolute"
        style={{
          top: "5%",
          right: "15%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(14,165,233,0.28) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Dot grid overlay ── */}
      <div
        className="absolute inset-0 dot-grid"
        style={{ opacity: 0.7 }}
      />

      {/* ── Subtle noise vignette for depth ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(2,8,24,0.7) 100%)",
        }}
      />
    </div>
  );
}
