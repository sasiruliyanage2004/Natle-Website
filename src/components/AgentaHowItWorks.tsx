"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Code2, Rocket } from "lucide-react";

const steps = [
 {
 icon: Search,
 title: "1. Discovery & Architecture",
 desc: "We analyze your operations, identify bottlenecks, and design a custom AI architecture tailored to your enterprise goals.",
 color: "#1a3a8f" // Primary Blue
 },
 {
 icon: Code2,
 title: "2. Model Training & Integration",
 desc: "Our engineers build, train, and seamlessly integrate the AI models into your existing software ecosystem without disruption.",
 color: "#0ea5e9" // Cyan
 },
 {
 icon: Rocket,
 title: "3. Deployment & Scaling",
 desc: "We launch the system to production, providing 24/7 monitoring, continuous learning updates, and scalable infrastructure.",
 color: "#5aec8f" // Lime
 }
];

export default function AgentaHowItWorks() {
 return (
 <section className="bg-transparent py-24 relative">
 <div className="mx-auto max-w-6xl px-6">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="mb-16 text-center"
 >
 <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
 style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.25)", color: "#0369a1" }}>
 The Process
 </div>
 <h2 className="font-display text-4xl font-black mb-4" style={{ color: "#0a1628" }}>
 How We Deliver
 </h2>
 <p className="mx-auto max-w-2xl text-[#64748b] leading-relaxed">
 A proven methodology for bringing enterprise-grade AI from concept to production.
 </p>
 </motion.div>

 <div className="relative grid gap-12 md:grid-cols-3">
 {/* Connecting Line (Desktop) */}
 <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-[2px] bg-gradient-to-r from-[#1a3a8f] via-[#0ea5e9] to-[#5aec8f] opacity-20 md:block"></div>

 {steps.map((step, i) => {
 const Icon = step.icon;
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: i * 0.15 }}
 className="relative flex flex-col items-center text-center group"
 >
 {/* Icon Container */}
 <div
 className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border bg-white shadow-sm transition-transform duration-300 group-hover:scale-110"
 style={{ borderColor: "rgba(14,165,233,0.15)" }}
 >
 <Icon className="h-7 w-7" style={{ color: step.color }} />
 {/* Subtle glow on hover */}
 <div className="absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" style={{ background: step.color, zIndex: -1 }} />
 </div>
 
 {/* Content */}
 <h3 className="mb-3 font-display text-xl font-bold" style={{ color: "#0a1628" }}>
 {step.title}
 </h3>
 <p className="text-sm leading-relaxed text-[#64748b]">
 {step.desc}
 </p>
 </motion.div>
 );
 })}
 </div>
 </div>
 </section>
 );
}
