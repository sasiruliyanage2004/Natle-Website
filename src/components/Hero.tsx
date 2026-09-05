"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

import NeuralField from "@/components/animations/NeuralField";
import Counter from "@/components/common/Counter";

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

export default function Hero() {
 const { scrollYProgress } = useScroll();
 const funnel = useTransform(scrollYProgress, [0, 1], [0, 1]);
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
 { value: 9, suffix: "+", label: "Projects" },
 { value: 98.2, suffix: "%", decimals: 1, label: "Accuracy" },
 { value: 5, suffix: "", label: "Continents" },
 { value: 6, suffix: "", label: "AI Domains" },
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
 <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
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
 <NeuralField funnel={funnel} />
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
