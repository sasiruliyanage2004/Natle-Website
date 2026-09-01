"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  ArrowUpRight, 
  Cpu, 
  Leaf, 
  HeartHandshake
} from "lucide-react";
import Link from "next/link";

const jobs = [
  {
    title: "Senior Embedded Firmware Engineer",
    department: "Hardware & IoT",
    location: "Colombo, Sri Lanka / Remote",
    type: "Full-Time",
    snippet: "Design ultra-low-power C/C++ firmware for solar-powered LoRaWAN soil moisture and environmental sensor nodes.",
  },
  {
    title: "Full-Stack Software Architect (Next.js / Go)",
    department: "Cloud Platform",
    location: "Colombo, Sri Lanka / Hybrid",
    type: "Full-Time",
    snippet: "Build high-throughput real-time telemetry pipelines and responsive farmer-facing dashboards for NATLE FieldOS™.",
  },
  {
    title: "Agronomy Research Specialist",
    department: "Hosma Substrate Lab",
    location: "Kurunegala / Field Operations",
    type: "Full-Time",
    snippet: "Conduct substrate water-holding capacity, EC leaching, and plant nutrient uptake trials on commercial coconut growbags.",
  },
  {
    title: "Computer Vision / AI Engineer",
    department: "YieldAI™ Lab",
    location: "Colombo, Sri Lanka / Remote",
    type: "Full-Time",
    snippet: "Develop multispectral satellite NDVI anomaly detection and crop yield forecasting neural networks using PyTorch.",
  },
];

const perks = [
  {
    icon: Cpu,
    title: "Cutting-Edge Tech Stack",
    description: "Work with satellite imaging, LoRaWAN mesh networks, and high-performance distributed cloud software.",
  },
  {
    icon: Leaf,
    title: "Tangible Environmental Impact",
    description: "Every line of code directly saves millions of liters of fresh water and prevents chemical agricultural runoff.",
  },
  {
    icon: HeartHandshake,
    title: "Competitive Equity & Growth",
    description: "Generous compensation, enterprise hardware allowances, and direct mentorship from industry veterans.",
  },
];

export default function CareersPage() {
  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300 select-none">
      <BeamsBackground intensity="subtle" className="absolute inset-0 z-0 pointer-events-none" />
      <SmoothCursor />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-6"
            >
              <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
              <span>Join the Engineering Movement</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]"
            >
              Build the Technology that{" "}
              <span className="gradient-text">
                Feeds the World.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-xl text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed max-w-3xl mx-auto"
            >
              We are a passionate team of software architects, hardware hackers, and soil scientists building the next generation of autonomous precision farming.
            </motion.p>
          </div>
        </section>

        {/* Perks Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perks.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div 
                  key={p.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                  className="glass-card rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-emerald-500/50 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#059669] dark:text-[#10E599] border border-emerald-500/20 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="mt-3 text-xs text-slate-600 dark:text-emerald-100/70 leading-relaxed font-normal">{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Open Positions Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-widest"
            >
              Opportunities
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2"
            >
              Open Engineering &amp; Agri Roles
            </motion.h2>
          </div>

          <div className="space-y-6">
            {jobs.map((job, i) => (
              <motion.div 
                key={job.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
                className="glass-card rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:border-emerald-500/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[#059669] dark:text-[#10E599] text-xs font-mono font-bold border border-emerald-500/20">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-emerald-950/40 text-slate-600 dark:text-emerald-200/70 text-xs font-mono">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{job.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-emerald-300/60 mt-1 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-emerald-400/60" />
                    {job.location}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-emerald-100/70 mt-3 max-w-2xl font-normal leading-relaxed">{job.snippet}</p>
                </div>

                <Link
                  href="/contact"
                  className="gradient-btn shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-slate-950 shadow-md hover:scale-105 transition-transform"
                >
                  <span>Apply For Role</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <CTAFooter />
      </div>
    </main>
  );
}
