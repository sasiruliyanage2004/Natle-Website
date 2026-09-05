"use client";

import React, { useState } from "react";
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
 badgeColor: "border-sky-200 text-sky-700 bg-sky-50",
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
 badgeColor: "border-emerald-200 text-emerald-700 bg-emerald-50",
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
 badgeColor: "border-orange-200 text-orange-700 bg-orange-50",
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
 badgeColor: "border-purple-200 text-purple-700 bg-purple-50",
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
 <div className="relative min-h-screen bg-transparent text-[#0a1628] antialiased selection:bg-[#0ea5e9] selection:text-white transition-colors duration-300 select-none">
 
 <div className="relative z-10">
 
        {/* Hero Header */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-transparent">
          <div className="max-w-6xl mx-auto px-6 text-left relative z-10">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-6"
                style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.25)", color: "#0369a1" }}
              >
                <Building2 className="w-4 h-4" />
                <span>Real AI &bull; Measurable Production Results</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
                style={{ color: "#0a1628" }}
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
                className="mt-6 text-lg md:text-xl font-normal leading-relaxed text-[#475569]"
              >
                Explore how NATLE deploys bespoke deep learning pipelines, edge telemetry meshes, and high-concurrency cloud systems to solve industry bottlenecks with audited commercial returns.
              </motion.p>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center justify-start gap-2.5 mt-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? "clay-btn"
                        : " border border-[#e2e8f0] text-[#64748b] hover:border-[#0ea5e9]"
                    }`}
                    style={{
                      color: selectedCategory === cat ? "#0ea5e9" : "#64748b"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

 {/* Case Studies Grid */}
 <section className="py-12 max-w-6xl mx-auto px-6">
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
 className="clay-card rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group"
 >
 <CardPattern pattern="circuit" glowColor={study.accentGlow} />

 <div className="relative z-10">
 <div className="flex items-center justify-between mb-4">
 <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border`} style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.25)", color: "#0369a1" }}>
 {study.domain}
 </span>
 <span className="text-xs text-[#64748b] font-semibold">
 {study.client}
 </span>
 </div>

 <div className="flex items-start gap-4 mb-4">
 <div className="w-12 h-12 rounded-2xl border border-[#e2e8f0] flex items-center justify-center shrink-0 shadow-sm" style={{ color: "#0ea5e9" }}>
 <Icon className="w-6 h-6" />
 </div>
 <h3 className="text-2xl font-black text-[#0a1628] leading-snug">
 {study.title}
 </h3>
 </div>

 <p className="text-sm text-[#475569] leading-relaxed font-normal mb-6">
 {study.summary}
 </p>

 {/* Metrics Grid */}
 <div className="grid grid-cols-3 gap-3 mb-6">
 {study.metrics.map((m, mi) => (
 <div key={mi} className="bg-[#f8faff] p-3 rounded-2xl text-center border border-[#e2e8f0]">
 <p className="text-lg sm:text-xl font-black font-mono" style={{ color: "#0ea5e9" }}>{m.value}</p>
 <p className="text-[10px] font-bold text-[#64748b] uppercase mt-0.5">{m.label}</p>
 </div>
 ))}
 </div>

 {/* Tech Stack Pills */}
 <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#e2e8f0]">
 {study.techStack.map((tech) => (
 <span key={tech} className="px-2.5 py-1 border border-[#e2e8f0] text-[#475569] rounded-lg text-xs font-mono shadow-sm">
 {tech}
 </span>
 ))}
 </div>
 </div>

 <div className="relative z-10 mt-8 pt-6 border-t border-[#e2e8f0] flex items-center justify-between">
 <span className="text-xs font-mono font-bold flex items-center gap-1.5" style={{ color: "#0ea5e9" }}>
 <CheckCircle2 className="w-4 h-4" />
 Audited Production Deployment
 </span>
 <Link 
 href="/contact" 
 className="clay-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
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

      </div>
    </div>
  );
}
