"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

// ─── Word reveal component ────────────────────────────────────────────────────
function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Neural Luminescence Field ────────────────────────────────────────────────
function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Particles
    const COUNT = 600;
    type Particle = {
      x: number; y: number;
      ox: number; oy: number;
      vx: number; vy: number;
      size: number;
      color: string;
      phase: number; speed: number;
    };

    const particles: Particle[] = [];
    const CYAN = "#0ea5e9";
    const LIME = "#5aec8f";
    const BLUE = "#1a6fd4";

    for (let i = 0; i < COUNT; i++) {
      // Organic cloud shape using fibonacci + noise offset
      const angle = (i / COUNT) * Math.PI * 2 * 7;
      const r = 0.2 + Math.random() * 0.8;
      const spread = 180 + Math.random() * 80;
      const cx = W / 2, cy = H / 2;
      const ox = cx + Math.cos(angle) * spread * r;
      const oy = cy + Math.sin(angle) * spread * r * 0.9;
      const color = i % 10 < 7 ? CYAN : i % 10 < 9 ? LIME : BLUE;
      particles.push({
        x: ox, y: oy,
        ox, oy,
        vx: 0, vy: 0,
        size: 0.8 + Math.random() * 1.8,
        color,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.6,
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / W;
      mouse.current.y = (e.clientY - rect.top) / H;
    };
    window.addEventListener("mousemove", onMouseMove);

    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      const mx = (mouse.current.x - 0.5) * 60;
      const my = (mouse.current.y - 0.5) * 60;

      particles.forEach((p) => {
        // Organic wave motion
        const wave = Math.sin(t * p.speed + p.phase) * 18 + Math.cos(t * 0.7 * p.speed + p.phase * 1.3) * 10;
        const waveY = Math.cos(t * p.speed + p.phase * 0.8) * 14;

        p.x = p.ox + wave + mx * 0.15;
        p.y = p.oy + waveY + my * 0.15;

        // Draw glowing dot
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grd.addColorStop(0, p.color + "cc");
        grd.addColorStop(0.5, p.color + "55");
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "ee";
        ctx.fill();
      });
    };
    animate();

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { scrollYProgress } = useScroll();
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const fieldScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ paddingTop: "96px", paddingBottom: "64px" }}
    >
      {/* ── Deep space layered background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Aurora blob — top left cyan */}
        <div className="absolute -top-32 -left-32 w-[700px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)", filter: "blur(120px)" }} />
        {/* Aurora blob — bottom right lime */}
        <div className="absolute -bottom-32 -right-20 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(90,236,143,0.14) 0%, transparent 70%)", filter: "blur(140px)" }} />
        {/* Aurora blob — center navy */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(26,58,143,0.20) 0%, transparent 70%)", filter: "blur(100px)" }} />
        {/* Dot grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(rgba(14,165,233,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT ─ Copy */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-7 border"
              style={{ background: "rgba(14,165,233,0.1)", borderColor: "rgba(14,165,233,0.35)", color: "#0ea5e9" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5aec8f] animate-pulse" />
              Enterprise AI Platform
            </motion.div>

            {/* H1 — word reveal */}
            <h1 className="font-display font-extrabold text-white leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}>
              <WordReveal text="We Build the AI" delay={0.1} />
              <br />
              <WordReveal
                text="That Moves Industries."
                delay={0.35}
                className="inline"
              />
            </h1>

            {/* Gradient underline accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-40 h-1 rounded-full mb-7 origin-left"
              style={{ background: "linear-gradient(90deg, #0ea5e9, #5aec8f)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-[#94a3b8] text-lg leading-relaxed mb-9 max-w-lg"
            >
              NATLE delivers intelligent, scalable AI solutions that transform how enterprises operate, compete, and grow — across Healthcare, Agriculture, Retail, EdTech, and HR.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/services"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-8px_rgba(14,165,233,0.7)]"
                style={{ background: "linear-gradient(135deg, #1a3a8f 0%, #0ea5e9 55%, #5aec8f 100%)" }}
              >
                Explore Our Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
                style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.3)", color: "#38bdf8" }}
              >
                <ShieldCheck className="w-4 h-4" /> Talk to a Specialist
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="flex gap-8 flex-wrap"
            >
              {[
                { val: "9+", label: "Projects" },
                { val: "98.2%", label: "Accuracy" },
                { val: "5", label: "Continents" },
                { val: "6", label: "AI Domains" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.08 }}
                >
                  <div className="font-display text-2xl font-black"
                    style={{ background: "linear-gradient(90deg, #0ea5e9, #5aec8f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {s.val}
                  </div>
                  <div className="text-[#64748b] text-xs uppercase tracking-wider mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT ─ Neural Luminescence Field */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="relative hidden lg:block"
            style={{ height: "560px" }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ opacity: fieldOpacity, scale: fieldScale }}
            >
              <NeuralField />
            </motion.div>

            {/* Floating AI domain badges */}
            {[
              { label: "Healthcare AI", color: "#0ea5e9", top: "6%", left: "8%" },
              { label: "AgriTech", color: "#5aec8f", top: "14%", right: "4%" },
              { label: "POS Systems", color: "#f97316", bottom: "32%", left: "2%" },
              { label: "EdTech", color: "#c084fc", top: "50%", right: "2%" },
              { label: "HR Analytics", color: "#2dd4bf", bottom: "12%", right: "14%" },
              { label: "Custom AI", color: "#fbbf24", bottom: "20%", left: "16%" },
            ].map((b, i) => (
              <motion.div
                key={b.label}
                className="absolute px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md z-10 pointer-events-none"
                style={{
                  ...b as any,
                  background: `${b.color}18`,
                  border: `1px solid ${b.color}55`,
                  color: b.color,
                  animation: `float ${3.5 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              >
                {b.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
