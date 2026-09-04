"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { motion } from "framer-motion";
import { 
  Building2, 
  ArrowUpRight,
  Activity,
  Sprout,
  ShoppingBag,
  GraduationCap,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import CardPattern from "@/components/common/CardPattern";

const caseStudies = [
  {
    id: "healthfirst",
    domain: "Healthcare",
    title: "Diagnostic Vision AI for HealthFirst Hospital",
    client: "HealthFirst Hospital Group",
    summary: "Engineered and deployed a high-precision computer vision diagnostic system deeply integrated with the hospital's existing PACS and FHIR-compliant EHR infrastructure, dramatically augmenting radiological review throughput.",
    metrics: [
      { label: "Fewer Diagnostic Errors", value: "34%" },
      { label: "Faster Image Review", value: "2x" },
      { label: "Annual Clinical Savings", value: "$2.4M" },
    ],
    techStack: ["TensorFlow", "Python", "FHIR / HL7", "React", "Node.js", "Docker"],
    badgeColor: "border-sky-500/30 text-sky-400 bg-sky-500/10",
    accentGlow: "rgba(14, 165, 233, 0.15)",
    icon: Activity,
  },
  {
    id: "greenfield",
    domain: "Agriculture",
    title: "Smart Crop Intelligence Platform (FieldOS™)",
    client: "GreenField Agri Corp",
    summary: "Architected a multi-sensor LoRaWAN IoT mesh and edge computer vision intelligence platform delivering real-time soil chemistry, canopy temperature, and predictive harvest modeling across 50,000 hectares.",
    metrics: [
      { label: "Prediction Accuracy", value: "91%" },
      { label: "Water Savings", value: "28%" },
      { label: "Input Cost Reduction", value: "18%" },
    ],
    techStack: ["PyTorch", "AWS IoT Core", "PostgreSQL", "Next.js", "Python", "LoRaWAN"],
    badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    accentGlow: "rgba(16, 229, 153, 0.15)",
    icon: Sprout,
  },
  {
    id: "retailmax",
    domain: "Retail / POS",
    title: "Multi-Branch POS Intelligence Suite",
    client: "RetailMax Chain",
    summary: "Engineered an end-to-end AI-powered smart Point of Sale and autonomous inventory replenishment engine deployed across 60 retail branches with sub-second barcode indexing and shrinkage detection.",
    metrics: [
      { label: "Waste Reduction", value: "41%" },
      { label: "Faster Checkout Speed", value: "3x" },
      { label: "Uptime SLA", value: "99.9%" },
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "TensorFlow Lite", "Electron", "Redis"],
    badgeColor: "border-orange-500/30 text-orange-400 bg-orange-500/10",
    accentGlow: "rgba(249, 115, 22, 0.15)",
    icon: ShoppingBag,
  },
  {
    id: "edureach",
    domain: "Education",
    title: "Adaptive Learning Platform for EduReach",
    client: "EduReach Global",
    summary: "Built an intelligent adaptive LMS featuring dynamic cognitive difficulty calibration and real-time student sentiment modeling serving over 200,000 active learners across 12 countries.",
    metrics: [
      { label: "Retention Increase", value: "+22%" },
      { label: "Faster Skill Acquisition", value: "40%" },
      { label: "Student NPS Rating", value: "4.8/5" },
    ],
    techStack: ["Next.js", "FastAPI", "MongoDB", "PyTorch", "WebRTC", "Tailwind CSS"],
    badgeColor: "border-purple-500/30 text-purple-400 bg-purple-500/10",
    accentGlow: "rgba(168, 85, 247, 0.15)",
    icon: GraduationCap,
  },
];

const categories = ["All", "Healthcare", "Agriculture", "Retail / POS", "Education"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? caseStudies
    : caseStudies.filter(p => p.domain === selectedCategory);

  return (
    <main className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300 select-none">
      <BeamsBackground intensity="subtle" className="absolute inset-0 z-0 pointer-events-none" />
      <SmoothCursor />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-16 md:pt-48 md:pb-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-6"
            >
              <Building2 className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
              <span>Real AI &bull; Measurable Production Results</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]"
            >
              Enterprise Case Studies That{" "}
              <span className="gradient-text">
                Deliver Quantified ROI.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-xl text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed max-w-3xl mx-auto"
            >
              Explore how NATLE deploys bespoke deep learning pipelines, edge telemetry meshes, and high-concurrency cloud systems to solve industry bottlenecks with audited commercial returns.
            </motion.p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#059669] text-white shadow-lg shadow-emerald-500/20 scale-105"
                      : "bg-white/80 dark:bg-zinc-900/80 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-white/10 hover:border-[#059669]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((study, i) => {
              const Icon = study.icon;
              return (
                <motion.div 
                  key={study.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="glass-card rounded-3xl p-8 md:p-10 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all relative overflow-hidden group border border-white/10"
                >
                  <CardPattern pattern="circuit" glowColor={study.accentGlow} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${study.badgeColor}`}>
                        {study.domain}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                        {study.client}
                      </span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#059669] dark:text-[#10E599]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-snug">
                        {study.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal mb-6">
                      {study.summary}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {study.metrics.map((m, mi) => (
                        <div key={mi} className="bg-slate-100 dark:bg-zinc-900/60 p-3 rounded-2xl text-center border border-slate-200 dark:border-white/5">
                          <p className="text-lg sm:text-xl font-black text-[#059669] dark:text-[#10E599] font-mono">{m.value}</p>
                          <p className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200 dark:border-white/10">
                      {study.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 rounded-lg text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Audited Production Deployment
                    </span>
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-[#059669] text-[#059669] dark:text-[#10E599] hover:text-white transition-all text-xs font-bold"
                    >
                      <span>Inquire Blueprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <CTAFooter />
      </div>
    </main>
  );
}
