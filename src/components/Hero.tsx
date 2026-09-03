"use client";

import React, { useState } from "react";
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
import { VideoText } from "@/components/magicui/video-text";
import VideoDemoModal from "@/components/interactive/VideoDemoModal";

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
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative isolate w-full overflow-hidden bg-transparent font-sans antialiased pt-36 pb-16 md:pt-44 md:pb-20 select-none transition-colors duration-300">
      
      {/* Light Mode Radial Glow with soft radial fade mask */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[600px] rounded-full bg-gradient-to-tr from-[#007bff]/10 via-[#00d2ff]/10 to-[#00c9a7]/15 blur-[120px] dark:from-[#059669]/15 dark:via-[#10e599]/8 dark:to-transparent" />
      </div>

      <div className="mx-auto max-w-5xl px-4 md:px-8 text-center flex flex-col items-center justify-center">
        
        {/* ================= HERO CONTENT ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto w-full"
        >
          {/* Top Badge */}
          <motion.div
            variants={riseVariants}
            className="inline-flex items-center gap-2 bg-white/80 dark:bg-[#0a140a]/90 backdrop-blur-md border border-emerald-200/90 dark:border-emerald-800/50 rounded-full px-4 py-1.5 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase font-mono">
              HOSMA CEYLON HERITAGE &times; NEXT-GEN TELEMETRY
            </span>
          </motion.div>

          {/* Magic UI 2-Line VideoText Headline (No Clipping, Perfectly Centered) */}
          <motion.div variants={riseVariants} className="w-full flex flex-col items-center justify-center text-center mb-2">
            <VideoText
              src="/videos/agriculture-crop-field.webm"
              line1="Empowering"
              line2="Agriculture"
              align="center"
              className="w-full max-w-4xl mx-auto justify-center text-center"
            />

            <span className="font-serif italic font-normal gradient-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl block mt-2 pb-1 text-center">
              with Next-Gen Code.
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={riseVariants}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-700 dark:text-zinc-400 max-w-3xl leading-relaxed font-normal"
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
              className="gradient-btn group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <span>SCHEDULE FARM ASSESSMENT</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="tech-btn inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              <PlayCircle className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />
              <span>Watch 60s FieldOS Demo</span>
            </button>
          </motion.div>

          <VideoDemoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

          {/* Dual-Buyer Intent Visual Fork */}
          <motion.div
            variants={riseVariants}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl w-full"
          >
            {/* Substrate Procurement Pathway */}
            <a
              href="#configurator"
              className="bg-white/95 dark:bg-[#0c140d]/90 rounded-2xl p-4 flex items-center gap-3.5 text-left border border-slate-200/90 dark:border-emerald-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none hover:border-emerald-500 hover:shadow-lg hover:scale-[1.02] transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-[#059669] dark:text-[#10E599] flex items-center justify-center shrink-0 shadow-xs">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-[#10E599]">
                  Procurement &bull; Substrates
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#059669] dark:group-hover:text-[#10E599] transition-colors">
                  Order 40ft Cocopeat Containers &rarr;
                </p>
              </div>
            </a>

            {/* FieldOS Technology Pathway */}
            <Link
              href="/solutions#field-os"
              className="bg-white/95 dark:bg-[#0c140d]/90 rounded-2xl p-4 flex items-center gap-3.5 text-left border border-slate-200/90 dark:border-cyan-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none hover:border-[#0052FF] hover:shadow-lg hover:scale-[1.02] transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-[#0052FF] dark:text-cyan-400 flex items-center justify-center shrink-0 shadow-xs">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0052FF] dark:text-cyan-400">
                  AgriTech &bull; IoT Software
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0052FF] dark:group-hover:text-cyan-400 transition-colors">
                  Explore FieldOS™ Platform &rarr;
                </p>
              </div>
            </Link>
          </motion.div>
        </motion.div>


        {/* ================= UNIFIED ISOMETRIC SHOWCASE: THE CLOUD & THE FIELD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-14 relative w-full max-w-5xl rounded-[2rem] sm:rounded-[2.5rem] border border-emerald-500/25 dark:border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(16,229,153,0.15)] overflow-hidden group p-0 bg-transparent"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
            <Image
              src="/images/chatgpt-fusion.png"
              alt="NATLE FieldOS Next.js Cloud Dashboard & Precision Ceylon Smart Greenhouse Telemetry"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />

            {/* Subtle High-Contrast Gradient Overlays for Razor-Sharp Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Left Floating Ecosystem Badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-white/15 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#10E599] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#10E599]">
                NATLE FIELDOS™ &bull; THE STACK &times; THE FIELD
              </span>
            </div>

            {/* Bottom Left: The Stack Telemetry Chip */}
            <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-20 flex items-center gap-3 rounded-2xl bg-slate-950/90 border border-white/15 p-3 sm:p-3.5 shadow-2xl backdrop-blur-md">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0052FF] to-[#00D2FF] text-white shadow-md shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-black text-white">Next.js Cloud &times; Go Engine</p>
                <p className="text-[10px] font-mono font-medium text-slate-300">Sub-50ms LoRa Telemetry Pipeline</p>
              </div>
            </div>

            {/* Bottom Right: The Field Agronomy Chip */}
            <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-slate-950/90 border border-white/15 p-3 sm:p-3.5 shadow-2xl backdrop-blur-md">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#059669] to-[#10E599] text-slate-950 shadow-md shrink-0">
                <Leaf className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-black text-white">Smart Canopy &times; Hosma Organic</p>
                <p className="text-[10px] font-mono font-bold text-[#10E599]">YieldAI™ Harvest Prediction: +28.4%</p>
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
          className="mt-16 text-center border-t border-slate-200/80 dark:border-emerald-900/30 pt-10 w-full"
        >
          <motion.p
            variants={riseVariants}
            className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-6"
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
                  className="flex items-center gap-2.5 rounded-full border border-white/80 dark:border-emerald-900/40 bg-white/70 dark:bg-[#0a140a]/80 px-4 py-2 shadow-xs backdrop-blur-md hover:border-[#007bff]/40 dark:hover:border-emerald-600/50 hover:bg-white dark:hover:bg-emerald-950/50 transition-all group"
                >
                  <Icon className="h-4 w-4 text-[#007bff] dark:text-[#10e599] group-hover:text-[#059669] transition-colors" />
                  <span className="text-xs font-bold text-slate-800 dark:text-emerald-100/80">
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
