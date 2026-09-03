"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sprout, 
  Droplets, 
  Sparkles, 
  Layers, 
  Ship, 
  ArrowUpRight 
} from "lucide-react";

export default function HosmaHeritage() {
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
            <Sprout className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />
            <span>Parent Heritage &bull; Hosma Ceylon (Pvt) Ltd</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071326] dark:text-white leading-[1.08]"
          >
            Rooted in Ceylon&apos;s Richest Soil. <br />
            <span className="font-serif italic font-normal gradient-text">
              Engineered for the World.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-200/70 font-normal leading-relaxed"
          >
            NATLE was born from <strong>Hosma Ceylon</strong> (<a href="https://hosmaceylon.com" target="_blank" rel="noreferrer" className="text-[#059669] dark:text-[#10E599] font-bold hover:underline">hosmaceylon.com</a>) — Sri Lanka&apos;s premier exporter of 100% organic coconut coir substrates, now supercharged with next-generation IoT telemetry and predictive cloud intelligence.
          </motion.p>
        </div>

        {/* Dual Value Proposition Grid with Animated Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto mb-12">
          
          {/* Left Column: Substrate Specifications Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
            className="lg:col-span-6 rounded-[2.5rem] border border-slate-200/90 dark:border-emerald-500/20 bg-white/95 dark:bg-[#070d07] p-8 shadow-xl flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl group hover:border-emerald-500/50 hover:shadow-2xl transition-all"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-emerald-900/40">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-wider">
                    Product Specification
                  </span>
                  <h3 className="text-2xl font-black text-[#071326] dark:text-white mt-1">
                    Hosma Ultra-Washed Cocopeat
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-xs font-mono font-bold text-[#059669] dark:text-[#10E599]">
                  OMRI &bull; ISO 9001
                </span>
              </div>

              {/* Substrate Spec Highlights */}
              <div className="mt-6 space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-[#0052FF] dark:text-cyan-400 flex items-center justify-center font-bold">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-emerald-200/70 uppercase">Water Holding Capacity</p>
                      <p className="text-base font-black text-[#071326] dark:text-white">800% - 900% (8-9x Weight)</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0052FF] dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg">High Retentive</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#059669] dark:text-[#10E599] flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-emerald-200/70 uppercase">Electrical Conductivity (EC)</p>
                      <p className="text-base font-black text-[#071326] dark:text-white">&lt; 0.5 mS/cm (Triple Washed)</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">Low EC Grade</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-[#F59E0B] flex items-center justify-center font-bold">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-emerald-200/70 uppercase">Air Filled Porosity (AFP)</p>
                      <p className="text-base font-black text-[#071326] dark:text-white">18% - 22% Aeration</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#F59E0B] bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg">Optimal Oxygen</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Link */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ship className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
                <span className="text-xs font-mono text-slate-500 dark:text-emerald-200/70">40ft High-Cube Shipping Fleet</span>
              </div>
              <a 
                href="https://hosmaceylon.com" 
                target="_blank" 
                rel="noreferrer" 
                className="group inline-flex items-center gap-1 text-xs font-bold text-[#059669] dark:text-[#10E599] hover:text-[#0052FF] transition-colors"
              >
                <span>Visit Hosma Ceylon</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Global Export Corridors & Fleet Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
            className="lg:col-span-6 rounded-[2.5rem] border border-slate-200/90 dark:border-emerald-500/20 bg-white/95 dark:bg-[#070d07] p-8 shadow-xl flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl group hover:border-emerald-500/50 hover:shadow-2xl transition-all"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-emerald-900/40">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-wider">
                    International Trade
                  </span>
                  <h3 className="text-2xl font-black text-[#071326] dark:text-white mt-1">
                    Export Corridors from Ceylon
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-xs font-mono font-bold text-[#059669] dark:text-[#10E599]">
                  24+ Countries
                </span>
              </div>

              {/* 4 Trade Destination Hubs */}
              <div className="mt-6 space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div>
                    <p className="text-sm font-black text-[#071326] dark:text-white">Netherlands &amp; European Union</p>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/70">High-Tech Hydroponic Berry &amp; Tomato Greenhouses</p>
                  </div>
                  <span className="text-xs font-mono font-black text-[#059669] dark:text-[#10E599] bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg">38% Volume</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div>
                    <p className="text-sm font-black text-[#071326] dark:text-white">United States &amp; Canada</p>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/70">Commercial Soft Fruit, Floriculture &amp; Nursery Cultivation</p>
                  </div>
                  <span className="text-xs font-mono font-black text-[#059669] dark:text-[#10E599] bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg">26% Volume</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div>
                    <p className="text-sm font-black text-[#071326] dark:text-white">Japan &amp; South Korea</p>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/70">Ultra-Pure Low EC Strawberry &amp; Melon Substrates</p>
                  </div>
                  <span className="text-xs font-mono font-black text-[#059669] dark:text-[#10E599] bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg">20% Volume</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/40 flex items-center justify-between transition-transform"
                >
                  <div>
                    <p className="text-sm font-black text-[#071326] dark:text-white">Australia &amp; Middle East</p>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/70">Arid-Zone Controlled Environment Greenhouse Slabs</p>
                  </div>
                  <span className="text-xs font-mono font-black text-[#059669] dark:text-[#10E599] bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-lg">16% Volume</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Link */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/40 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 dark:text-emerald-200/70">Port of Colombo &bull; Direct Freight</span>
              <a 
                href="https://hosmaceylon.com/contact" 
                target="_blank" 
                rel="noreferrer" 
                className="group inline-flex items-center gap-1 text-xs font-bold text-[#059669] dark:text-[#10E599] hover:text-[#0052FF] transition-colors"
              >
                <span>Request Freight Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
