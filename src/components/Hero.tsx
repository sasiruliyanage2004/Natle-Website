"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { 
  ArrowRight, 
  PlayCircle, 
  Activity, 
  Sprout, 
  ShoppingBag, 
  GraduationCap, 
  Users, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  Lock,
  CheckCircle2
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

const complianceBadges = [
  { name: "SOC 2 Type II", icon: ShieldCheck, desc: "Audited Security" },
  { name: "HIPAA Compliant", icon: Lock, desc: "Clinical Grade" },
  { name: "GDPR Ready", icon: ShieldCheck, desc: "Privacy First" },
  { name: "ISO 27001", icon: CheckCircle2, desc: "Information Security" },
  { name: "Avg. ROI < 90 Days", icon: Sparkles, desc: "Rapid Time to Value" },
];

const domainPills = [
  { name: "Healthcare AI", href: "/services#healthcare-ai", icon: Activity },
  { name: "Agriculture AI", href: "/services#agriculture-ai", icon: Sprout },
  { name: "Point of Sales", href: "/services#pos-systems", icon: ShoppingBag },
  { name: "EdTech Platform", href: "/services#edtech-ai", icon: GraduationCap },
  { name: "Human Resources", href: "/services#human-resources-ai", icon: Users },
  { name: "Custom AI", href: "/services#custom-ai-solutions", icon: Cpu },
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
              ENTERPRISE ARTIFICIAL INTELLIGENCE &times; PRODUCTION-GRADE SYSTEMS
            </span>
          </motion.div>

          {/* Magic UI 2-Line VideoText Headline */}
          <motion.div variants={riseVariants} className="w-full flex flex-col items-center justify-center text-center mb-2">
            <VideoText
              src="/videos/agriculture-crop-field.webm"
              line1="Transforming"
              line2="Industries"
              align="center"
              className="w-full max-w-4xl mx-auto justify-center text-center"
            />

            <span className="font-serif italic font-normal gradient-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl block mt-2 pb-1 text-center">
              with Artificial Intelligence.
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={riseVariants}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal"
          >
            NATLE delivers production-grade, scalable AI platforms that transform how enterprises operate, compete, and grow — with deep specialized solutions across Healthcare, Agriculture, Retail POS, Education, and HR.
          </motion.p>

          {/* Key Metrics Strip */}
          <motion.div
            variants={riseVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-3 px-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm"
          >
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">9+</span>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Delivered Projects</p>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-white/10 hidden sm:block" />
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#059669] dark:text-[#10E599] font-mono">26+</span>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">In Pipeline</p>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-white/10 hidden sm:block" />
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">6</span>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Industry Domains</p>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-white/10 hidden sm:block" />
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">100%</span>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Data Security</p>
            </div>
          </motion.div>

          {/* Action CTA Buttons */}
          <motion.div
            variants={riseVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/services"
              className="gradient-btn group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <span>EXPLORE AI PLATFORMS</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="tech-btn inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />
              <span>Talk to a Specialist</span>
            </Link>
          </motion.div>

          <VideoDemoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

          {/* 6 AI Domains Quick Pills */}
          <motion.div
            variants={riseVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-2xl"
          >
            {domainPills.map((d) => {
              const Icon = d.icon;
              return (
                <Link
                  key={d.name}
                  href={d.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:border-[#059669] dark:hover:border-[#10E599] hover:text-[#059669] transition-all shadow-xs"
                >
                  <Icon className="w-3.5 h-3.5 text-[#059669] dark:text-[#10E599]" />
                  <span>{d.name}</span>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>


        {/* ================= UNIFIED SHOWCASE: INTELLIGENT ENTERPRISE PLATFORM ================= */}
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
              alt="NATLE AI Enterprise Cloud Architecture & Multi-Domain Model Telemetry"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />

            {/* Subtle High-Contrast Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Left Floating Platform Badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-white/15 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#10E599] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#10E599]">
                NATLE AI PLATFORM &bull; v4.2 PRODUCTION READY
              </span>
            </div>

            {/* Bottom Left: Clinical & Vision AI Chip */}
            <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-20 flex items-center gap-3 rounded-2xl bg-slate-950/90 border border-white/15 p-3 sm:p-3.5 shadow-2xl backdrop-blur-md">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0052FF] to-[#00D2FF] text-white shadow-md shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-black text-white">Diagnostic Neural Vision</p>
                <p className="text-[10px] font-mono font-medium text-slate-300">&lt;15ms Latency &bull; 98.2% Accuracy</p>
              </div>
            </div>

            {/* Bottom Right: Edge Telemetry Chip */}
            <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-slate-950/90 border border-white/15 p-3 sm:p-3.5 shadow-2xl backdrop-blur-md">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#059669] to-[#10E599] text-slate-950 shadow-md shrink-0">
                <Sprout className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-black text-white">FieldOS™ Edge Telemetry</p>
                <p className="text-[10px] font-mono font-bold text-[#10E599]">50,000 Hectares Live Ingestion</p>
              </div>
            </div>
          </div>
        </motion.div>


        {/* ================= COMPLIANCE & ACCELERATION STRIP ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center border-t border-slate-200/80 dark:border-white/10 pt-10 w-full"
        >
          <motion.p
            variants={riseVariants}
            className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-6"
          >
            Enterprise Security Standards &bull; Zero-Trust AI Architecture
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {complianceBadges.map((badge) => {
              const Icon = badge.icon;

              return (
                <motion.div
                  key={badge.name}
                  variants={riseVariants}
                  className="flex items-center gap-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 shadow-xs backdrop-blur-md hover:border-[#059669] transition-all group"
                >
                  <Icon className="h-4 w-4 text-[#059669] dark:text-[#10e599]" />
                  <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                    {badge.name}
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
