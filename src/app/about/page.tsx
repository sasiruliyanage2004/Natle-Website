"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { motion } from "framer-motion";
import { 
  Sprout, 
  Cpu, 
  Leaf, 
  CheckCircle2
} from "lucide-react";

export const milestones = [
  {
    year: "2018",
    title: "Hosma Ceylon Foundation",
    description: "Established premier coconut substrate processing facility in Sri Lanka, exporting low-EC coir slabs to Japanese and European greenhouses.",
  },
  {
    year: "2021",
    title: "IoT Firmware Development",
    description: "Built proprietary LoRaWAN multi-depth soil moisture and EC probes tailored to Sri Lankan soil and coconut substrate physical properties.",
  },
  {
    year: "2023",
    title: "NATLE FieldOS™ Launch",
    description: "Deployed the unified cloud telemetry hub across 500+ commercial agricultural estates in Sri Lanka, Australia, and the Middle East.",
  },
  {
    year: "2026",
    title: "YieldAI™ Neural Forecasting",
    description: "Integrated multispectral satellite crop NDVI imaging with localized weather sensors for predictive closed-loop irrigation automation.",
  },
];

export const team = [
  {
    name: "Sasiru Liyanage",
    role: "Founder & Chief Architect",
    specialty: "Full-Stack Software & IoT Architecture",
    bio: "Pioneering the intersection of distributed cloud systems, real-time wireless telemetry, and precision agriculture.",
  },
  {
    name: "Hosma Agronomy Team",
    role: "Substrate & Soil Physics",
    specialty: "Low-EC Coir & Buffering Chemistry",
    bio: "30+ years of collective experience perfecting 100% natural, triple-washed coconut substrates for global commercial greenhouses.",
  },
  {
    name: "Edge Hardware Lab",
    role: "Embedded Systems & LoRaWAN",
    specialty: "Solar Telemetry & Industrial Sensors",
    bio: "Designing robust IP68 submersible hardware nodes engineered to survive extreme tropical and greenhouse environments.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300 select-none">
      <SmoothCursor />
      <BeamsBackground intensity="subtle" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-xs mb-6"
            >
              <Sprout className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
              <span>Our Vision &bull; Innovate &bull; Build &bull; Grow</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]"
            >
              Where Sustainable Soil Meets{" "}
              <span className="gradient-text">
                Intelligent Code.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-xl text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed max-w-3xl mx-auto"
            >
              NATLE is the dual-power fusion of <strong>Hosma Ceylon</strong> (<a href="https://hosmaceylon.com" target="_blank" rel="noopener noreferrer" className="text-[#059669] dark:text-[#10E599] font-bold hover:underline">hosmaceylon.com</a>), premier organic coconut substrate exporter, and cutting-edge software engineering. We empower growers globally with automated telemetry, predictive algorithms, and organic Sri Lankan substrates.
            </motion.p>
          </div>
        </section>

        {/* Dual Core Pillars */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55 }}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25 } }}
              className="glass-card rounded-3xl p-8 md:p-10 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:border-emerald-500/50 transition-all cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#059669] dark:text-[#10E599] border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Leaf className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Hosma Ceylon Substrates</h2>
                <p className="mt-3 text-base text-slate-600 dark:text-emerald-100/70 leading-relaxed">
                  100% natural, triple-washed coconut coir substrates with ultra-low sodium EC (&lt; 0.5 mS/cm). Specially compacted for European hydroponics, Japanese berry farms, and commercial greenhouses worldwide.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center gap-4 text-xs font-mono font-bold text-[#059669] dark:text-[#10E599]">
                <span>OMRI LISTED</span> &bull; <span>ISO 9001:2015</span> &bull; <span>GLOBALG.A.P</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25 } }}
              className="glass-card rounded-3xl p-8 md:p-10 text-white shadow-2xl flex flex-col justify-between hover:shadow-2xl hover:border-emerald-500/50 transition-all cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#059669] dark:text-[#10E599] border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">NATLE Software &amp; IoT Lab</h2>
                <p className="mt-3 text-base text-slate-600 dark:text-emerald-100/70 leading-relaxed">
                  Silicon-Valley standard full-stack engineering, long-range LoRaWAN sensor networks, satellite NDVI crop biomass tracking, and automated cloud edge triggers for commercial agriculture.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center gap-4 text-xs font-mono font-bold text-[#059669] dark:text-[#10E599]">
                <span>FIELDOS™ v4.2</span> &bull; <span>YIELD AI™</span> &bull; <span>99.9% UPTIME</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Milestones Timeline */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-widest"
            >
              Our Journey
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2"
            >
              Pioneering Smart Agriculture
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <motion.div 
                key={m.year}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                className="glass-card rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-emerald-500/50 flex flex-col justify-between transition-all cursor-pointer"
              >
                <div>
                  <span className="text-3xl font-black text-[#059669] dark:text-[#10E599] font-mono">{m.year}</span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-2">{m.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-emerald-100/70 mt-2 leading-relaxed">{m.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center gap-2 text-[11px] font-bold text-[#059669] dark:text-[#10E599]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed Milestone</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-widest"
            >
              Leadership &amp; Engineering
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2"
            >
              The Minds Behind NATLE
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                className="glass-card rounded-3xl p-7 shadow-xl hover:shadow-2xl hover:border-emerald-500/50 flex flex-col justify-between transition-all cursor-pointer"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#059669] to-[#10E599] text-slate-950 flex items-center justify-center text-xl font-black mb-4 shadow-md">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs font-bold text-[#059669] dark:text-[#10E599] mt-0.5">{member.role}</p>
                  <p className="text-[11px] font-mono text-emerald-800 dark:text-[#10E599] bg-emerald-500/10 px-2.5 py-1 rounded-md mt-2 inline-block border border-emerald-500/20">
                    {member.specialty}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-emerald-100/70 mt-4 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <CTAFooter />
      </div>
    </main>
  );
}
