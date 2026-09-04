"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Sparkles,
  Sliders,
  FileSpreadsheet,
  Building2,
  Lock,
  Zap,
  Activity
} from "lucide-react";
import Link from "next/link";
import { CardPattern } from "@/components/common/CardPattern";

interface SolutionPreset {
  id: string;
  name: string;
  icon: string;
  recommendedArch: string;
  recommendedLatency: string;
  recommendedCompliance: string;
  recommendedScale: string;
  roiMetric: string;
  accuracy: string;
}

const SOLUTION_PRESETS: SolutionPreset[] = [
  {
    id: "healthcare",
    name: "Healthcare Diagnostic AI",
    icon: "🩺",
    recommendedArch: "Air-Gapped On-Premises PACS Node",
    recommendedLatency: "<15ms (TensorRT FP8 Real-Time)",
    recommendedCompliance: "HIPAA & SOC 2 Type II Certified",
    recommendedScale: "Regional Hospital Network (12+ Centers)",
    roiMetric: "60% Workload Reduction",
    accuracy: "98.2% Diagnostic Precision",
  },
  {
    id: "agriculture",
    name: "Agriculture AI & Edge IoT",
    icon: "🌱",
    recommendedArch: "Hybrid Edge-Cloud + LoRaWAN 15km Mesh",
    recommendedLatency: "Sub-50ms Telemetry Sync",
    recommendedCompliance: "FieldOS™ Zero-Data Leakage",
    recommendedScale: "Commercial Plantation (15,000+ Ha)",
    roiMetric: "38% Water Conserved",
    accuracy: "±1.5% VWC Soil Precision",
  },
  {
    id: "pos",
    name: "Omnichannel POS & Retail AI",
    icon: "⚡",
    recommendedArch: "Offline-First Distributed Store Edge",
    recommendedLatency: "<12ms Checkout Execution",
    recommendedCompliance: "PCI-DSS Level 1 & SOC 2",
    recommendedScale: "Supermarket Chain (120+ Locations)",
    roiMetric: "-35% Inventory Shrink",
    accuracy: "99.98% Fraud Detection",
  },
  {
    id: "education",
    name: "Education Technology (EdTech)",
    icon: "🎓",
    recommendedArch: "Cognitive Knowledge Graph Engine",
    recommendedLatency: "<25ms Dynamic Pacing Inference",
    recommendedCompliance: "FERPA & GDPR Compliant",
    recommendedScale: "Global Online University (140k Learners)",
    roiMetric: "+45% Completion Uplift",
    accuracy: "94% Mastery Retention",
  },
  {
    id: "hr",
    name: "Human Resources Intelligence",
    icon: "👥",
    recommendedArch: "Isolated Enterprise HR VPC",
    recommendedLatency: "Sub-Second Candidate Graph Search",
    recommendedCompliance: "GDPR & EEOC Bias-Free Certified",
    recommendedScale: "Global Multi-Enterprise Workforce",
    roiMetric: "80% Faster Shortlisting",
    accuracy: "91% 1-Year Retention Match",
  },
  {
    id: "custom",
    name: "Custom Sovereign Enterprise AI",
    icon: "🛡️",
    recommendedArch: "Sovereign Private LLM / Air-Gapped",
    recommendedLatency: "<15ms Localized Token Generation",
    recommendedCompliance: "Defense-Grade Zero Egress",
    recommendedScale: "Global Sovereign Infrastructure",
    roiMetric: "100% Data Sovereignty",
    accuracy: "Deterministic Guardrails",
  },
];

export default function AISolutionConfigurator() {
  const [selectedDomain, setSelectedDomain] = useState<string>("healthcare");
  const [architecture, setArchitecture] = useState<string>("Air-Gapped On-Premises PACS Node");
  const [latency, setLatency] = useState<string>("<15ms (TensorRT FP8 Real-Time)");
  const [compliance, setCompliance] = useState<string>("HIPAA & SOC 2 Type II Certified");
  const [scale, setScale] = useState<string>("Regional Hospital Network (12+ Centers)");
  const [proposalRequested, setProposalRequested] = useState<boolean>(false);

  const activePreset = SOLUTION_PRESETS.find((p) => p.id === selectedDomain) || SOLUTION_PRESETS[0];

  const handleApplyPreset = (preset: SolutionPreset) => {
    setSelectedDomain(preset.id);
    setArchitecture(preset.recommendedArch);
    setLatency(preset.recommendedLatency);
    setCompliance(preset.recommendedCompliance);
    setScale(preset.recommendedScale);
  };

  const handleDownloadSpec = () => {
    const specContent = `=====================================================
NATLE ENTERPRISE AI — ARCHITECTURE & ROI SPECIFICATION SHEET
Engineering Headquarters: Ruwan Mawatha, Colombo 05, Sri Lanka
Regional Delivery Hubs: Singapore | Malaysia
=====================================================

SOLUTION DOMAIN: ${activePreset.name}
DEPLOYMENT ARCHITECTURE: ${architecture}
INFERENCE LATENCY SLA: ${latency}
SECURITY & COMPLIANCE: ${compliance}
OPERATIONAL SCALE: ${scale}

QUANTIFIED PERFORMANCE BENCHMARKS:
- Primary ROI Metric: ${activePreset.roiMetric}
- Neural Accuracy Benchmark: ${activePreset.accuracy}
- Data Sovereignty SLA: 100% (Zero External Egress / Air-Gapped)
- Sub-Second Edge Failover: Hardware Fallback Enabled
- Industry 4.0 Governance: Guided by Prof. Henrik von Scheel

INTEGRATION & DEPLOYMENT TIMELINE:
- Pilot Deployment: 4 - 8 Weeks
- Hardware Calibration: Sub-GHz / On-Prem Nodes Provisioned
- Payback Window: Verifiable 3 - 6 Months ROI

Direct Engineering Inquiries: contact@natle.tech | +94 70 465 9847
=====================================================`;

    const blob = new Blob([specContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NATLE_AI_Architecture_Spec_${selectedDomain}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="configurator" className="relative py-28 md:py-36 bg-transparent text-[#071326] dark:text-white select-none transition-colors duration-300 overflow-hidden">
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#059669]/10 via-[#10E599]/5 to-transparent blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-white/90 dark:bg-[#0a140a]/90 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm backdrop-blur-md mb-4">
            <Sliders className="h-3.5 w-3.5" />
            <span>Interactive Architecture Lab &bull; NATLE AI</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Enterprise AI Solution <br />
            <span className="font-serif italic font-normal gradient-text">
              Architecture Configurator.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed">
            Select your enterprise domain, customize isolation tiers, inference latency SLAs, and infrastructure scale to generate an instant technical spec sheet and ROI estimate.
          </p>
        </div>

        {/* 1. Solution Domain Preset Bar */}
        <div className="mb-10">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/60 mb-3 text-center">
            Select Enterprise Domain:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {SOLUTION_PRESETS.map((preset) => {
              const isActive = selectedDomain === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#059669] text-white shadow-lg shadow-emerald-500/30 scale-105"
                      : "bg-white/80 dark:bg-[#0a140a]/80 text-slate-700 dark:text-emerald-100/80 border border-slate-200/80 dark:border-emerald-900/40 hover:border-emerald-500/50"
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Configurator & Live Spec Sheet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 glass-card rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <CardPattern 
              variant="circuit" 
              position="top-right" 
              theme="auto" 
              className="w-64 h-64 opacity-25 group-hover:opacity-50" 
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 dark:border-emerald-900/30 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] dark:text-[#10E599] flex items-center justify-center font-bold">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#071326] dark:text-white">Architecture Parameters</h3>
                    <p className="text-xs text-slate-500 dark:text-emerald-300/60 font-mono">Calibrated to Industry 4.0 Sovereign Standards</p>
                  </div>
                </div>
              </div>

              {/* Control 1: Architecture */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider block">
                  1. Deployment Architecture &amp; Isolation
                </label>
                <select
                  value={architecture}
                  onChange={(e) => setArchitecture(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 bg-white/90 dark:bg-[#080d08] py-3.5 px-4 text-sm text-slate-900 dark:text-white font-medium focus:border-[#059669] focus:outline-none"
                >
                  <option>Air-Gapped On-Premises PACS Node</option>
                  <option>Hybrid Edge-Cloud + LoRaWAN 15km Mesh</option>
                  <option>Offline-First Distributed Store Edge</option>
                  <option>Cognitive Knowledge Graph Engine</option>
                  <option>Isolated Enterprise HR VPC</option>
                  <option>Sovereign Private LLM / Air-Gapped</option>
                </select>
              </div>

              {/* Control 2: Latency & Acceleration */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider block">
                  2. Inference SLA &amp; Quantization
                </label>
                <select
                  value={latency}
                  onChange={(e) => setLatency(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 bg-white/90 dark:bg-[#080d08] py-3.5 px-4 text-sm text-slate-900 dark:text-white font-medium focus:border-[#059669] focus:outline-none"
                >
                  <option>&lt;15ms (TensorRT FP8 Real-Time)</option>
                  <option>Sub-50ms Telemetry Sync</option>
                  <option>&lt;12ms Checkout Execution</option>
                  <option>&lt;25ms Dynamic Pacing Inference</option>
                  <option>Sub-Second Candidate Graph Search</option>
                </select>
              </div>

              {/* Control 3: Compliance Tier */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider block">
                  3. Security &amp; Regulatory Standard
                </label>
                <select
                  value={compliance}
                  onChange={(e) => setCompliance(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 bg-white/90 dark:bg-[#080d08] py-3.5 px-4 text-sm text-slate-900 dark:text-white font-medium focus:border-[#059669] focus:outline-none"
                >
                  <option>HIPAA &amp; SOC 2 Type II Certified</option>
                  <option>ISO 27001 &amp; GDPR Compliant</option>
                  <option>PCI-DSS Level 1 &amp; SOC 2</option>
                  <option>FERPA &amp; GDPR Compliant</option>
                  <option>Defense-Grade Zero Egress</option>
                </select>
              </div>

              {/* Control 4: Scale */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider block">
                  4. Operational Scale &amp; Footprint
                </label>
                <select
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 bg-white/90 dark:bg-[#080d08] py-3.5 px-4 text-sm text-slate-900 dark:text-white font-medium focus:border-[#059669] focus:outline-none"
                >
                  <option>Regional Hospital Network (12+ Centers)</option>
                  <option>Commercial Plantation (15,000+ Ha)</option>
                  <option>Supermarket Chain (120+ Locations)</option>
                  <option>Global Online University (140k Learners)</option>
                  <option>Global Multi-Enterprise Workforce</option>
                  <option>Global Sovereign Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 dark:border-emerald-900/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-emerald-300/60">
                <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
                <span>SOC 2 &bull; HIPAA &bull; ISO 27001 &bull; GDPR</span>
              </div>

              <button
                onClick={handleDownloadSpec}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-[#059669] dark:text-[#10E599] text-xs font-mono font-bold transition-all hover:scale-105 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Spec Sheet (.txt)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Technical Spec Sheet Card */}
          <div className="lg:col-span-5 rounded-[2.5rem] bg-[#071326] dark:bg-[#080d08] border border-emerald-500/30 p-6 sm:p-8 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl group">
            
            {/* Bio-Hex Motif */}
            <CardPattern 
              variant="bio-hex" 
              position="top-right" 
              theme="emerald" 
              className="w-64 h-64 sm:w-80 sm:h-80 opacity-35 group-hover:opacity-65" 
            />

            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#10E599]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-[#10E599]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                    Live Architecture Matrix
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#10E599] text-[10px] font-mono font-bold">
                  SLA Guaranteed
                </span>
              </div>

              {/* Summary Parameters */}
              <div className="py-6 space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Configured Solution:</span>
                  <p className="text-lg font-black text-white">{activePreset.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Projected ROI</span>
                    <span className="text-sm font-bold text-[#10E599] font-mono">{activePreset.roiMetric}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Accuracy Metric</span>
                    <span className="text-sm font-bold text-[#00D2FF] font-mono">{activePreset.accuracy}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Architecture:</span>
                    <span className="text-white font-bold truncate max-w-[180px]">{architecture.split("(")[0]}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Latency SLA:</span>
                    <span className="text-[#10E599] font-bold">{latency.split("(")[0]}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Sovereign Privacy:</span>
                    <span className="text-white font-bold">100% Zero-Leakage</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Est. Pilot Delivery:</span>
                    <span className="text-[#F59E0B] font-bold">4 - 8 Weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Proposal Request CTA */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              {proposalRequested ? (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10E599]" />
                  <span>Architecture spec dispatched to engineering team. We will reach out shortly!</span>
                </div>
              ) : (
                <Link
                  href="/contact"
                  className="w-full gradient-btn group inline-flex items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-wider text-slate-950 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer text-center"
                >
                  <span>Request Architecture Review</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              <p className="text-[10px] font-mono text-center text-slate-400">
                Direct enterprise inquiry &bull; Colombo 05 Solutions Desk
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// Named alias export for backwards compatibility
export const SubstrateConfigurator = AISolutionConfigurator;

