"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { 
  ArrowRight, 
  PlayCircle, 
  Leaf, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  Radio
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.2, duration: 1.0 },
  },
};

const partnerLogos = [
  { name: "Hosma Ceylon", icon: Leaf, desc: "100% Organic Substrates" },
  { name: "LoRaWAN Alliance", icon: Radio, desc: "15km Wireless Mesh" },
  { name: "GlobalG.A.P", icon: ShieldCheck, desc: "Export Certified" },
  { name: "OMRI Listed", icon: Sparkles, desc: "Organic Materials" },
  { name: "Next.js Cloud", icon: Cpu, desc: "Sub-50ms Telemetry" },
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-radial from-[#e0f7fa]/60 via-[#ffffff]/50 to-[#edf6f2] font-sans antialiased pt-36 pb-20 md:pt-44 md:pb-28 select-none">
      
      {/* Ambient Radial Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[600px] rounded-full bg-gradient-to-tr from-[#007bff]/10 via-[#00d2ff]/10 to-[#00c9a7]/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 md:px-8 text-center flex flex-col items-center justify-center">
        
        {/* ================= HERO CONTENT (Exact 1:1 Match to User Design) ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Top Badge: HOSMA CEYLON HERITAGE × NEXT-GEN TELEMETRY */}
          <motion.div
            variants={riseVariants}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-emerald-200/80 rounded-full px-4 py-1.5 mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase font-mono">
              HOSMA CEYLON HERITAGE &times; NEXT-GEN TELEMETRY
            </span>
          </motion.div>

          {/* Headline: Empowering Agriculture with Next-Gen Code. */}
          <motion.h1
            variants={riseVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.08] text-[#071326] tracking-tight mb-4"
          >
            <span className="block">Empowering</span>
            <span className="block">Agriculture</span>
            <span className="font-serif italic font-normal text-gradient block mt-1 pb-1">
              with Next-Gen Code.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={riseVariants}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed font-normal"
          >
            Atmospheric intelligence meets precision Ceylon coconut substrates. We fuse wireless LoRaWAN soil telemetry with distributed cloud software to maximize harvest yields autonomously.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            variants={riseVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="gradient-btn group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #007bff, #00d2ff, #00c9a7)",
              }}
            >
              <span>SCHEDULE FARM ASSESSMENT</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-8 py-4 text-sm font-bold text-slate-800 shadow-sm hover:bg-white transition-all hover:scale-105"
            >
              <PlayCircle className="h-4 w-4 text-[#007bff]" />
              <span>Explore Platform Simulation</span>
            </Link>
          </motion.div>
        </motion.div>


        {/* ================= 3D ARTWORK FUSION MASTERPIECE (Cinematic 16:9 Frame) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-14 relative w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/95 bg-white/90 p-3 sm:p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl group"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem]">
            <Image
              src="/images/natle-fusion-hero.jpg"
              alt="NATLE Software Engineering & Ceylon Smart Plantation Fusion"
              fill
              priority
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating Live Telemetry Badge: Top Right */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full bg-slate-950/85 border border-white/20 px-3.5 py-1.5 backdrop-blur-md text-white shadow-xl">
              <span className="flex h-2 w-2 rounded-full bg-[#10e599] animate-ping" />
              <span className="text-[11px] font-mono font-bold text-[#10e599]">IoT Telemetry &bull; LIVE STREAM</span>
            </div>

            {/* Floating Telemetry Badge: Bottom Left */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 rounded-2xl bg-white/95 border border-slate-200/90 p-3.5 shadow-2xl backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#007bff] to-[#00d2ff] text-white shadow-md">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-slate-900">Next.js Cloud &times; Ceylon Substrate</p>
                <p className="text-[10px] font-mono font-bold text-[#059669]">YieldAI™ Harvest Prediction: +28.4%</p>
              </div>
            </div>
          </div>
        </motion.div>


        {/* ================= PARTNER LOGOS STRIP ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center border-t border-slate-200/80 pt-10 w-full"
        >
          <motion.p
            variants={riseVariants}
            className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-6"
          >
            Powering Sustainable Commercial Plantations &amp; Global Exports
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {partnerLogos.map((partner) => {
              const Icon = partner.icon;

              return (
                <motion.div
                  key={partner.name}
                  variants={riseVariants}
                  className="flex items-center gap-2.5 rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-xs backdrop-blur-md hover:border-[#007bff]/40 hover:bg-white transition-all group"
                >
                  <Icon className="h-4 w-4 text-[#007bff] group-hover:text-[#059669] transition-colors" />
                  <span className="text-xs font-bold text-slate-800">
                    {partner.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
