"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Sprout, 
  ShoppingBag, 
  GraduationCap, 
  Users, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Zap,
  ShieldCheck,
  Brain
} from "lucide-react";
import Link from "next/link";
import CardPattern from "@/components/common/CardPattern";

const SOLUTIONS = [
  {
    id: "healthcare-ai",
    title: "Healthcare AI",
    tagline: "Clinical Diagnostic Computer Vision & PACS Bridge",
    description: "Deep learning vision algorithms integrated with PACS/EHR hospital systems. Enables automated lesion detection, reducing radiological diagnostic miss rates by 34%.",
    icon: Activity,
    badge: "Domain 01: Healthcare",
    highlights: [
      "Sub-15ms inference on clinical imaging scans",
      "Native FHIR / HL7 & DICOM PACS protocol bridge",
      "Automated radiologist triage and heatmaps",
      "HIPAA and GDPR certified zero-trust encryption"
    ],
    stats: { primary: "34%", label: "Fewer Diagnostic Errors" },
    tech: "TensorFlow &bull; PyTorch &bull; FHIR &bull; DICOM"
  },
  {
    id: "agriculture-ai",
    title: "Agriculture AI",
    tagline: "FieldOS™ Edge Telemetry & Crop Intelligence",
    description: "Multi-depth LoRaWAN soil sensing (moisture, EC, microclimate) combined with drone/satellite multispectral NDVI models managing 50,000 hectares.",
    icon: Sprout,
    badge: "Domain 02: Agriculture AI",
    highlights: [
      "Autonomous VPD-driven drip irrigation actuation",
      "Multi-depth capacitance moisture & salinity probes",
      "Zonal fertilizer prescription and yield forecast",
      "15km LoRaWAN wireless sub-GHz mesh connectivity"
    ],
    stats: { primary: "28%", label: "Water Savings Across 50k Ha" },
    tech: "FieldOS™ &bull; LoRaWAN &bull; AWS IoT &bull; PyTorch"
  },
  {
    id: "pos-systems",
    title: "POS Systems",
    tagline: "Intelligent Multi-Branch Retail Engine",
    description: "Cloud-synchronized Point of Sale infrastructure featuring AI demand forecasting, shrinkage detection, and sub-second checkout across 60 retail branches.",
    icon: ShoppingBag,
    badge: "Domain 03: Retail / POS",
    highlights: [
      "Offline-first local SQLite caching & auto-sync",
      "Sub-second high-concurrency barcode billing",
      "Autonomous cross-branch stock rebalancing",
      "Predictive shrinkage and loss prevention"
    ],
    stats: { primary: "41%", label: "Inventory Waste Reduction" },
    tech: "React &bull; Electron &bull; Node.js &bull; TF Lite"
  },
  {
    id: "edtech-ai",
    title: "EdTech",
    tagline: "Adaptive Learning Platform & Student AI",
    description: "Intelligent LMS dynamically calibrating curriculum difficulty to student cognitive retention curves, serving 200,000+ active students across 12 countries.",
    icon: GraduationCap,
    badge: "Domain 04: Education",
    highlights: [
      "Dynamic cognitive difficulty calibration models",
      "Real-time student drop-out risk prediction",
      "Low-bandwidth WebRTC interactive classrooms",
      "Automated plagiarism & assessment scoring"
    ],
    stats: { primary: "+22%", label: "Course Completion Retention" },
    tech: "Next.js &bull; FastAPI &bull; MongoDB &bull; WebRTC"
  },
  {
    id: "human-resources-ai",
    title: "Human Resources",
    tagline: "Automated Payroll & Talent Intelligence",
    description: "Enterprise HRMS featuring AI talent resume parsing, multi-currency statutory payroll calculation, and facial recognition biometric time-tracking.",
    icon: Users,
    badge: "Domain 05: HR Tech",
    highlights: [
      "Automated multi-jurisdiction tax and payroll",
      "Facial recognition biometric attendance verification",
      "Bias-free resume scoring & candidate matching",
      "Predictive employee attrition & sentiment analytics"
    ],
    stats: { primary: "90%", label: "Payroll Admin Time Slashed" },
    tech: "FastAPI &bull; PostgreSQL &bull; OpenCV &bull; AWS KMS"
  },
  {
    id: "custom-ai-solutions",
    title: "Custom AI",
    tagline: "Bespoke Enterprise Deep Learning & Consulting",
    description: "Tailored neural networks, private on-premises LLMs, vector search embeddings, and computer vision systems designed for proprietary enterprise operations.",
    icon: Cpu,
    badge: "Domain 06: Custom AI",
    highlights: [
      "Zero-data-leakage private on-premises LLM tuning",
      "Sub-10ms quantized ONNX edge vision pipelines",
      "Full IP ownership transfer to enterprise clients",
      "Rapid concept-to-production under 90 days"
    ],
    stats: { primary: "<90d", label: "Average Time to Production" },
    tech: "PyTorch &bull; ONNX &bull; LangChain &bull; CUDA"
  }
];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState(SOLUTIONS[0].id);
  const current = SOLUTIONS.find((s) => s.id === activeTab) || SOLUTIONS[0];

  return (
    <section id="solutions" className="relative bg-transparent py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-[#10e599] border border-emerald-200/80 dark:border-emerald-900/30 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Proprietary AI Platforms</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Solutions Built for <br className="hidden sm:block" />
            <span className="gradient-text">Real-World Enterprise Scale</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
            Six specialized AI domains purpose-built to solve mission-critical operational challenges with verifiable commercial returns.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {SOLUTIONS.map((sol) => {
            const isActive = activeTab === sol.id;
            const Icon = sol.icon;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 dark:bg-emerald-950 text-white dark:text-emerald-50 shadow-xl scale-105 border border-emerald-500/50"
                    : "bg-white/80 dark:bg-zinc-900/60 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#10e599]" : "text-slate-400"}`} />
                <span>{sol.title}</span>
              </button>
            );
          })}
        </div>

        {/* Solution Details Card */}
        <div className="relative rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 p-8 md:p-12 shadow-2xl backdrop-blur-xl overflow-hidden group">
          <CardPattern pattern="circuit" glowColor="rgba(16, 229, 153, 0.15)" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10"
            >
              {/* Left Column: Description */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-[#059669] dark:text-[#10e599] text-xs font-mono font-bold uppercase tracking-wider border border-emerald-500/20">
                  <Zap className="w-3.5 h-3.5" />
                  {current.badge}
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {current.title}
                </h3>
                <p className="text-base sm:text-lg font-semibold text-[#059669] dark:text-[#10e599] -mt-2">
                  {current.tagline}
                </p>

                <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {current.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {current.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#10e599] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-zinc-300">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <Link
                    href={`/services#${current.id}`}
                    className="gradient-btn px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md"
                  >
                    <span>Full Technical Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-700 dark:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[#059669] transition"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>

              {/* Right Column: Verified Metric Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl bg-slate-950 p-7 text-white shadow-2xl border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between pb-5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#10e599]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">Audited Metric</span>
                    </div>
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#10e599] text-xs font-mono font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10e599] animate-pulse" />
                      Production Live
                    </span>
                  </div>

                  <div className="py-6">
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Quantified ROI</p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="text-5xl font-black text-white font-mono tracking-tight">
                        {current.stats.primary}
                      </span>
                      <span className="text-sm font-medium text-[#10e599]">
                        {current.stats.label}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span>Inference SLA:</span>
                      <span className="text-white">&lt;15ms Latency</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance:</span>
                      <span className="text-white">SOC 2 &bull; HIPAA &bull; GDPR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tech Stack:</span>
                      <span className="text-[#10e599]" dangerouslySetInnerHTML={{ __html: current.tech }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
