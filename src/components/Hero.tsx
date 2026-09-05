"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
 const words = text.split(" ");
 return (
 <span className={className} aria-label={text}>
 {words.map((word, i) => (
 <span key={i} className="inline-block overflow-hidden mr-[0.22em]">
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

function NeuralField() {
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const mouse = useRef({ x: 0.5, y: 0.5 });
 const frameRef = useRef<number>(0);

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext("2d");
 if (!ctx) return;

 let W = canvas.offsetWidth || 520;
 let H = canvas.offsetHeight || 520;
 canvas.width = W * window.devicePixelRatio;
 canvas.height = H * window.devicePixelRatio;
 ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

 const COUNT = 500;
 type P = { x: number; y: number; ox: number; oy: number; size: number; color: string; phase: number; speed: number };
 const particles: P[] = [];

 // Use deeper/richer colors that show on white bg
 const colors = ["#0ea5e9", "#0ea5e9", "#0ea5e9", "#0369a1", "#5aec8f", "#1a3a8f"];

 for (let i = 0; i < COUNT; i++) {
 const angle = (i / COUNT) * Math.PI * 2 * 7;
 const r = 0.2 + Math.random() * 0.8;
 const spread = 170 + Math.random() * 70;
 const cx = W / 2, cy = H / 2;
 const ox = cx + Math.cos(angle) * spread * r;
 const oy = cy + Math.sin(angle) * spread * r * 0.9;
 particles.push({
 x: ox, y: oy, ox, oy,
 size: 1 + Math.random() * 2.2,
 color: colors[Math.floor(Math.random() * colors.length)],
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
 const mx = (mouse.current.x - 0.5) * 50;
 const my = (mouse.current.y - 0.5) * 50;

 particles.forEach(p => {
 const wave = Math.sin(t * p.speed + p.phase) * 16 + Math.cos(t * 0.7 * p.speed + p.phase * 1.3) * 9;
 const waveY = Math.cos(t * p.speed + p.phase * 0.8) * 12;
 p.x = p.ox + wave + mx * 0.12;
 p.y = p.oy + waveY + my * 0.12;

 // Glow halo (stronger on light bg)
 const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
 grd.addColorStop(0, p.color + "80");
 grd.addColorStop(0.5, p.color + "30");
 grd.addColorStop(1, "transparent");
 ctx.beginPath();
 ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
 ctx.fillStyle = grd;
 ctx.fill();

 // Solid core
 ctx.beginPath();
 ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
 ctx.fillStyle = p.color + "dd";
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

 return <canvas ref={canvasRef} className="w-full h-full" style={{ background: "transparent" }} />;
}

export default function Hero() {
 const { scrollYProgress } = useScroll();
 const fieldOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
 const fieldScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.75]);

 return (
 <section
 className="relative w-full min-h-screen overflow-hidden flex items-center"
 style={{ paddingTop: "96px", paddingBottom: "80px", background: "transparent" }}
 >
 {/* Subtle gradient at top */}
 <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)" }} />

 <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
 <div className="grid lg:grid-cols-2 gap-12 items-center">

 {/* LEFT */}
 <div className="flex flex-col items-start">
 {/* Badge */}
 <motion.div
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-7 border"
 style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.3)", color: "#0369a1" }}
 >
 <span className="w-1.5 h-1.5 rounded-full bg-[#5aec8f] animate-pulse" />
 Enterprise AI Platform
 </motion.div>

 {/* H1 — dark text on white */}
 <h1
 className="font-display font-black leading-[1.05] mb-5"
 style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)", color: "#0a1628" }}
 >
 <WordReveal text="We Build the AI" delay={0.1} />
 <br />
 <span>
 <WordReveal text="That " delay={0.35} />
 <WordReveal
 text="Moves Industries."
 delay={0.42}
 className="inline"
 />
 </span>
 </h1>

 {/* Gradient accent underline */}
 <motion.div
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
 className="w-44 h-1 rounded-full mb-7 origin-left"
 style={{ background: "linear-gradient(90deg, #1a3a8f, #0ea5e9, #5aec8f)" }}
 />

 <motion.p
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.6, duration: 0.7 }}
 className="text-lg leading-relaxed mb-10 max-w-lg"
 style={{ color: "#475569" }}
 >
 NATLE delivers intelligent, scalable AI solutions that transform how enterprises operate, compete, and grow — across Healthcare, Agriculture, Retail, EdTech, and HR.
 </motion.p>

 {/* CTAs */}
 <motion.div
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.72 }}
 className="flex flex-col sm:flex-row gap-4 mb-12"
 >
 <Link
 href="/services"
 className="gradient-btn flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm"
 >
 Explore Our Services <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 href="/contact"
 className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 border"
 style={{ background: "rgba(14,165,233,0.06)", borderColor: "rgba(14,165,233,0.25)", color: "#0369a1" }}
 >
 <ShieldCheck className="w-4 h-4" /> Talk to a Specialist
 </Link>
 </motion.div>

 {/* Stats */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.9 }}
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
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.95 + i * 0.08 }}
 >
 <div
 className="font-display text-2xl font-black"
 style={{
 background: "linear-gradient(90deg,#1a3a8f,#0ea5e9)",
 WebkitBackgroundClip: "text",
 WebkitTextFillColor: "transparent",
 backgroundClip: "text",
 }}
 >
 {s.val}
 </div>
 <div className="text-xs uppercase tracking-wider mt-0.5" style={{ color: "#94a3b8" }}>{s.label}</div>
 </motion.div>
 ))}
 </motion.div>
 </div>

 {/* RIGHT — Neural Luminescence Field (particles vivid on white) */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 1.4, delay: 0.2 }}
 className="relative hidden lg:block"
 style={{ height: "560px" }}
 >
 <motion.div className="absolute inset-0" style={{ opacity: fieldOpacity, scale: fieldScale }}>
 <NeuralField />
 </motion.div>

 {/* Floating domain badges */}
 {[
 { label: "Healthcare AI", color: "#0ea5e9", top: "6%", left: "8%" },
 { label: "AgriTech", color: "#16a34a", top: "14%", right: "4%" },
 { label: "POS Systems", color: "#ea580c", bottom: "32%", left: "2%" },
 { label: "EdTech", color: "#7c3aed", top: "50%", right: "2%" },
 { label: "HR Analytics", color: "#0d9488", bottom: "12%", right: "14%" },
 { label: "Custom AI", color: "#d97706", bottom: "20%", left: "16%" },
 ].map((b, i) => (
 <motion.div
 key={b.label}
 className="clay-card absolute px-4 py-2 rounded-full text-xs font-bold z-10 pointer-events-none"
 style={{
 ...b as any,
 background: "#ffffff",
 color: b.color,
 animation: `float ${3.5 + i * 0.4}s ease-in-out infinite`,
 animationDelay: `${i * 0.5}s`,
 }}
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 1.1 + i * 0.1 }}
 >
 {b.label}
 </motion.div>
 ))}
 </motion.div>
 </div>
 </div>

 {/* Bottom border line */}
 <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.2), transparent)" }} />
 </section>
 );
}
