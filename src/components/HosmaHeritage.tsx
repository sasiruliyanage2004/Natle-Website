"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Globe2, 
  ArrowUpRight,
  Award,
  TrendingUp,
  Building2
} from "lucide-react";
import Link from "next/link";
import { CardPattern } from "@/components/common/CardPattern";

export default function EnterpriseImpact() {
  return (
    <section id="heritage" className="relative overflow-hidden py-24 md:py-32 select-none bg-transparent transition-colors duration-300">
      
      {/* Background Ambient Multi-Glow with soft radial fade mask */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[650px] rounded-full bg-gradient-to-tr from-[#059669]/10 via-[#0052FF]/10 to-transparent blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 dark:border-emerald-500/30 bg-white/90 dark:bg-emerald-950/80 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm backdrop-blur-md mb-4"
          >
            <Award className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />
            <span>Strategic Advisory &bull; Industry 4.0 Pioneer</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071326] dark:text-white leading-[1.08]"
          >
            Pioneering Industry 4.0 &amp; <br />
            <span className="font-serif italic font-normal gradient-text">
              Enterprise Artificial Intelligence.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-200/70 font-normal leading-relaxed"
          >
            From our 2024 healthcare diagnostic AI breakthrough to multi-agent infrastructure across 6 critical domains. Advised by the originator of Industry 4.0, <strong>Prof. Henrik von Scheel</strong>, and scaling toward a <strong>$100M global acceleration</strong> with regional engineering delivery hubs in Colombo, Singapore, and Malaysia.
          </motion.p>
        </div>

        {/* Dual Value Proposition Grid with Animated Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto mb-12">
          
          {/* Left Column: Strategic Advisory Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
            className="lg:col-span-6 rounded-[2.5rem] border border-slate-200/90 dark:border-emerald-500/20 bg-white/95 dark:bg-[#070d07] p-8 shadow-xl flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl group hover:border-emerald-500/50 hover:shadow-2xl transition-all"
          >
            <CardPattern variant="circuit" position="top-right" theme="auto" className="w-56 h-56 opacity-20 group-hover:opacity-40" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-emerald-900/40">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-wider">
                    Strategic Guidance
                  </span>
                  <h3 className="text-2xl font-black text-[#071326] dark:text-white mt-1">
                    Prof. Henrik von Scheel
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-xs font-mono font-bold text-[#059669] dark:text-[#10E599]">
                  Industry 4.0
                </span>
              </div>

              {/* Advisory Highlights */}
              <div className="mt-6 space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-[#0052FF] dark:text-cyan-400 flex items-center justify-center font-bold">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-emerald-200/70 uppercase">Macroeconomic Integration</p>
                      <p className="text-base font-black text-[#071326] dark:text-white">Cyber-Physical Industrial Digital Twins</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0052FF] dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg">Pioneer</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#059669] dark:text-[#10E599] flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-emerald-200/70 uppercase">Sovereign Data Privacy</p>
                      <p className="text-base font-black text-[#071326] dark:text-white">100% On-Prem &amp; Air-Gapped VPCs</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">Zero-Trust</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-[#F59E0B] flex items-center justify-center font-bold">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-emerald-200/70 uppercase">Corporate Acceleration</p>
                      <p className="text-base font-black text-[#071326] dark:text-white">$100M Global Acceleration Roadmap</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#F59E0B] bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg">Growth</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Link */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/40 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
                <span className="text-xs font-mono text-slate-500 dark:text-emerald-200/70">Executive Advisory Board</span>
              </div>
              <Link 
                href="/about#board" 
                className="group inline-flex items-center gap-1 text-xs font-bold text-[#059669] dark:text-[#10E599] hover:text-[#0052FF] transition-colors"
              >
                <span>Read Board Profiles</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Global Enterprise Footprint */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
            className="lg:col-span-6 rounded-[2.5rem] border border-slate-200/90 dark:border-emerald-500/20 bg-white/95 dark:bg-[#070d07] p-8 shadow-xl flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl group hover:border-emerald-500/50 hover:shadow-2xl transition-all"
          >
            <CardPattern variant="telemetry" position="top-right" theme="auto" className="w-56 h-56 opacity-20 group-hover:opacity-40" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-emerald-900/40">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-wider">
                    Global Network
                  </span>
                  <h3 className="text-2xl font-black text-[#071326] dark:text-white mt-1">
                    Delivery Hubs &amp; Scale
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-xs font-mono font-bold text-[#059669] dark:text-[#10E599]">
                  6 Core Domains
                </span>
              </div>

              {/* 4 Regional Operations Hubs */}
              <div className="mt-6 space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div>
                    <p className="text-sm font-black text-[#071326] dark:text-white">Colombo 05 Headquarters</p>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/70">Core AI Research, Neural Vision &amp; Hardware Labs</p>
                  </div>
                  <span className="text-xs font-mono font-black text-[#059669] dark:text-[#10E599] bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg">R&amp;D Hub</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div>
                    <p className="text-sm font-black text-[#071326] dark:text-white">Singapore &amp; Malaysia</p>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/70">Southeast Asia Regional Enterprise Delivery Centers</p>
                  </div>
                  <span className="text-xs font-mono font-black text-[#059669] dark:text-[#10E599] bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg">Regional</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div>
                    <p className="text-sm font-black text-[#071326] dark:text-white">North America &amp; Europe</p>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/70">Clinical Diagnostic AI &amp; RetailMax Deployments</p>
                  </div>
                  <span className="text-xs font-mono font-black text-[#059669] dark:text-[#10E599] bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg">Enterprise</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div>
                    <p className="text-sm font-black text-[#071326] dark:text-white">Oceania &amp; APAC</p>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/70">GreenField Agri Corp 15,000+ Ha Telemetry Network</p>
                  </div>
                  <span className="text-xs font-mono font-black text-[#059669] dark:text-[#10E599] bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg">FieldOS™</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Link */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/40 flex items-center justify-between relative z-10">
              <span className="text-xs font-mono text-slate-500 dark:text-emerald-200/70">9+ Production Deployments Delivered</span>
              <Link 
                href="/projects" 
                className="group inline-flex items-center gap-1 text-xs font-bold text-[#059669] dark:text-[#10E599] hover:text-[#0052FF] transition-colors"
              >
                <span>View Case Studies</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

// Named alias export for backwards compatibility
export const HosmaHeritage = EnterpriseImpact;
