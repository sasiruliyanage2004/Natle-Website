"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { motion } from "framer-motion";
import { 
  Activity, 
  Sprout, 
  ShoppingBag, 
  GraduationCap, 
  Users, 
  Cpu, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Brain,
  Zap
} from "lucide-react";
import Link from "next/link";
import CardPattern from "@/components/common/CardPattern";

interface ServiceItem {
  id: string;
  category: "all" | "healthcare" | "agriculture" | "pos" | "edtech" | "hr" | "custom-ai";
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  specs: string[];
  deliverables: string[];
  techPills: string[];
  accentGlow: string;
  badgeColor: string;
}

const servicesList: ServiceItem[] = [
  {
    id: "healthcare-ai",
    category: "healthcare",
    icon: Activity,
    badge: "Domain 01: Healthcare",
    title: "Clinical Diagnostic AI & PACS / EHR Integration",
    description: "Deep learning computer vision diagnostic algorithms integrated directly with hospital PACS and HL7/FHIR-compliant Electronic Health Record workflows. Empowers radiologists with sub-second lesion highlighting, reducing diagnostic miss rates by 34%.",
    specs: ["PACS & FHIR / HL7 Native Bridge", "Sub-15ms Diagnostic Vision Inference", "HIPAA & GDPR Patient Confidentiality", "Radiological Review Time Slashed by 50%"],
    deliverables: ["Clinical Decision Support System (CDSS)", "DICOM / PACS Diagnostic Microservices", "Automated Patient Triage Pipeline", "Compliance Audit Trail & Verification"],
    techPills: ["TensorFlow", "PyTorch", "FHIR / HL7", "DICOM", "FastAPI", "React", "Docker"],
    accentGlow: "rgba(14, 165, 233, 0.18)",
    badgeColor: "border-sky-500/30 text-sky-400 bg-sky-500/10",
  },
  {
    id: "agriculture-ai",
    category: "agriculture",
    icon: Sprout,
    badge: "Domain 02: Agriculture AI & IoT",
    title: "FieldOS™ Edge Telemetry & Crop Intelligence",
    description: "Autonomous agricultural operating system uniting multi-depth LoRaWAN root telemetry (capacitance moisture, EC salinity, microclimate) with drone/satellite multispectral crop stress models to automate precision irrigation and prevent crop yield decay.",
    specs: ["15km Sub-GHz LoRaWAN Mesh Coverage", "Multi-Depth Moisture & Salinity Sensing", "Multispectral NDVI Canopy Analytics", "Closed-Loop Solenoid Pulse Actuation"],
    deliverables: ["FieldOS™ Unified Cloud Telemetry Hub", "Industrial IP68 Edge Probe Hardware", "YieldAI™ Harvest Forecasting Engine", "Mobile Estate Manager PWA"],
    techPills: ["FieldOS™ v4.2", "PyTorch", "LoRaWAN", "AWS IoT Core", "PostgreSQL", "Next.js"],
    accentGlow: "rgba(16, 229, 153, 0.18)",
    badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  },
  {
    id: "pos-systems",
    category: "pos",
    icon: ShoppingBag,
    badge: "Domain 03: Retail & POS",
    title: "Intelligent Multi-Branch Point of Sales & Inventory AI",
    description: "Enterprise POS infrastructure engineered for high-concurrency retail chains. Features AI-powered demand forecasting, dynamic barcode scanning, real-time inventory rebalancing across distributed warehouses, and automated shrinkage prevention.",
    specs: ["Offline-First Local SQLite Resilience", "Sub-Second Barcode Indexing & Billing", "Automated Inter-Branch Stock Transfers", "99.9% Production SLA Across 60+ Stores"],
    deliverables: ["Cross-Platform Cashier & Manager Terminals", "Predictive Restocking Neural Module", "Loss Prevention & Shrinkage Analytics", "Executive Real-Time Sales Dashboards"],
    techPills: ["React", "Electron", "Node.js", "PostgreSQL", "TensorFlow Lite", "Redis"],
    accentGlow: "rgba(249, 115, 22, 0.18)",
    badgeColor: "border-orange-500/30 text-orange-400 bg-orange-500/10",
  },
  {
    id: "edtech-ai",
    category: "edtech",
    icon: GraduationCap,
    badge: "Domain 04: Education Technology",
    title: "Adaptive Learning Architectures & Cognitive LMS",
    description: "Next-generation Learning Management System powered by adaptive neural algorithms that tailor curriculum difficulty to individual student cognitive speeds. Deployed at scale across 200,000+ active learners across 12 countries.",
    specs: ["Dynamic Cognitive Difficulty Modeling", "Real-Time Student Retention Analytics", "Low-Bandwidth WebRTC Live Classrooms", "Automated Plagiarism & Grading AI"],
    deliverables: ["Enterprise Adaptive LMS Platform", "Intelligent Tutoring Algorithms", "Institutional Analytics & Dean Portals", "White-Label Native Mobile Apps"],
    techPills: ["Next.js", "FastAPI", "MongoDB", "PyTorch", "WebRTC", "Tailwind CSS"],
    accentGlow: "rgba(168, 85, 247, 0.18)",
    badgeColor: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  },
  {
    id: "human-resources-ai",
    category: "hr",
    icon: Users,
    badge: "Domain 05: Human Resources",
    title: "Enterprise HR Tech, Automated Payroll & Talent AI",
    description: "Comprehensive human capital platform combining AI talent acquisition screening, automated multi-currency statutory payroll calculation, facial-recognition attendance verification, and predictive employee sentiment analytics.",
    specs: ["Automated Multi-Jurisdiction Payroll", "Facial Biometric & Geofenced Clock-In", "AI Resume Parsing & Bias-Free Ranking", "SOC 2 & GDPR PII Cryptographic Vault"],
    deliverables: ["End-to-End Enterprise HRMS Portal", "Payroll Engine with Statutory Tax Export", "Employee Self-Service Mobile Portal", "Predictive Attrition & Sentiment Engine"],
    techPills: ["React", "FastAPI", "PostgreSQL", "PyTorch", "OpenCV", "AWS KMS"],
    accentGlow: "rgba(20, 184, 166, 0.18)",
    badgeColor: "border-teal-500/30 text-teal-400 bg-teal-500/10",
  },
  {
    id: "custom-ai-solutions",
    category: "custom-ai",
    icon: Cpu,
    badge: "Domain 06: Custom AI & Consulting",
    title: "Bespoke Enterprise Neural Networks & Applied ML",
    description: "Custom-architected machine learning solutions engineered from scratch for specialized enterprise workflows: proprietary LLM fine-tuning, retrieval-augmented generation (RAG), edge computer vision inspection, and digital transformation consulting.",
    specs: ["Zero Data Leakage On-Premises LLMs", "Sub-10ms Quantized ONNX Edge Inference", "Multi-Modal Document Parsing Pipelines", "Full Enterprise Model IP Ownership"],
    deliverables: ["Production PyTorch / TensorRT Neural Models", "Vector Knowledge Embeddings (pgvector)", "Private API Endpoints & SDK Wrappers", "90-Day Deployment Execution Roadmap"],
    techPills: ["PyTorch", "ONNX", "LangChain", "FastAPI", "Hugging Face", "CUDA"],
    accentGlow: "rgba(99, 102, 241, 0.18)",
    badgeColor: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
  },
];

const categoryTabs = [
  { id: "all", label: "All Platforms (6)" },
  { id: "healthcare", label: "Healthcare AI" },
  { id: "agriculture", label: "Agriculture AI" },
  { id: "pos", label: "POS & Retail" },
  { id: "edtech", label: "EdTech" },
  { id: "hr", label: "HR Tech" },
  { id: "custom-ai", label: "Custom AI" },
];

export default function ServicesPage() {
  const [filter, setFilter] = useState("all");

  const filteredServices = servicesList.filter((s) => {
    if (filter === "all") return true;
    return s.category === filter;
  });

  return (
    <main className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300 select-none">
      <SmoothCursor />
      <BeamsBackground intensity="subtle" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-16 md:pt-48 md:pb-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
              <span>Six Specialized Enterprise AI Domains</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08]"
            >
              Intelligent Technology for{" "}
              <span className="gradient-text">
                Every Industry.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-lg md:text-xl text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed max-w-3xl mx-auto"
            >
              NATLE delivers production-grade, audited artificial intelligence across Healthcare, Agriculture, Retail, Education, Human Resources, and Custom Enterprise pipelines — engineered for measurable commercial impact.
            </motion.p>

            {/* Filter Switcher Tabs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filter === tab.id
                      ? "bg-[#059669] text-white shadow-lg shadow-emerald-500/20 scale-105"
                      : "glass-card text-slate-700 dark:text-zinc-300 hover:border-emerald-500/40"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services List Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {filteredServices.map((srv, index) => {
              const Icon = srv.icon;

              return (
                <motion.div 
                  key={srv.id} 
                  id={srv.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="glass-card rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden border border-white/10"
                >
                  <CardPattern pattern="circuit" glowColor={srv.accentGlow} />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    
                    {/* Left: Info */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-center text-[#059669] dark:text-[#10E599] shadow-md">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${srv.badgeColor}`}>
                          {srv.badge}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                        {srv.title}
                      </h2>
                      <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                        {srv.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 my-6">
                        {srv.techPills.map((pill, pi) => (
                          <span key={pi} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-xs font-mono text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                            {pill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-zinc-400 mb-3">
                          Key Technical Capabilities
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {srv.specs.map((sp, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white bg-slate-50 dark:bg-zinc-900/60 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#10e599] shrink-0" />
                              <span>{sp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Deliverables Card */}
                    <div className="lg:col-span-5 bg-slate-950 dark:bg-[#070e07] p-6 md:p-8 rounded-2xl text-white shadow-xl border border-slate-800 dark:border-emerald-900/40 flex flex-col justify-between h-full">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-[#10e599] uppercase tracking-widest mb-4">
                          Enterprise Deliverables
                        </h4>
                        <ul className="space-y-3">
                          {srv.deliverables.map((del, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300 dark:text-emerald-200/70">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-[#10e599]" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-800 dark:border-emerald-900/30 flex items-center justify-between">
                        <span className="text-xs text-slate-400 dark:text-zinc-400 font-mono">
                          SOC 2 &bull; HIPAA &bull; GDPR
                        </span>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#059669] hover:bg-[#047857] text-white hover:scale-105 transition-all shadow-md"
                        >
                          <span>Inquire Solution</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

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
