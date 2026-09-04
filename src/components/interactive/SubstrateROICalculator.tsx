"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  ArrowRight, 
  Download, 
  Activity, 
  Zap, 
  Leaf, 
  Globe2,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

interface DomainProfile {
  name: string;
  icon: string;
  unitLabel: string;
  minScale: number;
  maxScale: number;
  defaultScale: number;
  stepScale: number;
  costPerUnitAnnual: number;
  workloadDropPct: number;
  efficiencyGainPct: number;
  metric1Label: string;
  metric2Label: string;
  metric3Label: string;
}

const DOMAINS: Record<string, DomainProfile> = {
  healthcare: {
    name: "Healthcare Diagnostic AI",
    icon: "🩺",
    unitLabel: "Hospital Beds / Scans per Day",
    minScale: 100,
    maxScale: 2500,
    defaultScale: 650,
    stepScale: 50,
    costPerUnitAnnual: 480,
    workloadDropPct: 60,
    efficiencyGainPct: 42,
    metric1Label: "Radiologist Hours Saved",
    metric2Label: "Triage Velocity Gain",
    metric3Label: "Missed Anomaly Prevention",
  },
  retail: {
    name: "Retail POS & Omnichannel AI",
    icon: "⚡",
    unitLabel: "Supermarket / Store Locations",
    minScale: 10,
    maxScale: 400,
    defaultScale: 120,
    stepScale: 10,
    costPerUnitAnnual: 3800,
    workloadDropPct: 35,
    efficiencyGainPct: 40,
    metric1Label: "Inventory Shrink Reduced",
    metric2Label: "Checkout Speed Uplift",
    metric3Label: "Restock Automation Value",
  },
  agriculture: {
    name: "Agriculture AI & Edge Telemetry",
    icon: "🌱",
    unitLabel: "Cultivated Hectares",
    minScale: 100,
    maxScale: 15000,
    defaultScale: 3500,
    stepScale: 100,
    costPerUnitAnnual: 95,
    workloadDropPct: 38,
    efficiencyGainPct: 28,
    metric1Label: "Irrigation Water Saved",
    metric2Label: "NPK Runoff Elimination",
    metric3Label: "Harvest Yield Boost",
  },
  edtech: {
    name: "Adaptive EdTech Platform",
    icon: "🎓",
    unitLabel: "Active Enrolled Students",
    minScale: 5000,
    maxScale: 250000,
    defaultScale: 45000,
    stepScale: 5000,
    costPerUnitAnnual: 14,
    workloadDropPct: 45,
    efficiencyGainPct: 85,
    metric1Label: "Student Retention Boost",
    metric2Label: "Grading Hours Saved",
    metric3Label: "Course Completion Value",
  },
};

export default function AIEnterpriseROICalculator() {
  const [selectedDomain, setSelectedDomain] = useState<string>("healthcare");
  const [scale, setScale] = useState<number>(650);
  const [deploymentTier, setDeploymentTier] = useState<"onprem" | "cloud">("onprem");
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const domain = DOMAINS[selectedDomain];

  // Calculations
  const tierMultiplier = deploymentTier === "onprem" ? 1.15 : 1.0;
  const totalFinancialBenefitUSD = Math.round(scale * domain.costPerUnitAnnual * tierMultiplier);
  const hoursSaved = Math.round(scale * 14.5 * (domain.workloadDropPct / 100));
  const efficiencyScore = domain.efficiencyGainPct;
  const complianceScore = 100;

  const handleDomainChange = (key: string) => {
    setSelectedDomain(key);
    setScale(DOMAINS[key].defaultScale);
  };

  const handleDownloadReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`[NATLE Intelligence Feasibility Engine]\n\nEnterprise ROI Model for ${domain.name} (${scale.toLocaleString()} ${domain.unitLabel}) generated!\n\nEstimated Annual Financial Gain: $${totalFinancialBenefitUSD.toLocaleString()}\nOperational Workload Drop: ${domain.workloadDropPct}%\nEfficiency Lift: +${efficiencyScore}%.`);
    }, 1200);
  };

  return (
    <section className="relative py-28 bg-transparent select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-4"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Commercial Feasibility &bull; Quantified ROI</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Calculate Your <span className="gradient-text">Enterprise AI ROI</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-100/70"
          >
            Configure your organizational scale and deployment tier to estimate operational cost reductions, workload savings, and projected revenue gains with NATLE.
          </motion.p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 glass-card rounded-3xl p-8 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-8">
              
                {/* 1. Domain Selection Tabs */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/70 mb-3">
                    1. Select Enterprise Solution
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(DOMAINS).map(([key, item]) => {
                      const isSelected = selectedDomain === key;
                      return (
                        <button
                          key={key}
                          onClick={() => handleDomainChange(key)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                            isSelected
                              ? "bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white shadow-md"
                              : "bg-white/40 dark:bg-black/30 border-slate-200/80 dark:border-emerald-900/30 text-slate-700 dark:text-emerald-200/70 hover:border-emerald-500/40"
                          }`}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <span className="text-xs font-bold block leading-tight">{item.name}</span>
                            <span className="text-[10px] font-mono text-[#059669] dark:text-[#10E599]">-{item.workloadDropPct}% Workload Drop</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Scale Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/70">
                      2. Scale ({domain.unitLabel})
                    </label>
                    <span className="text-lg font-black font-mono text-[#059669] dark:text-[#10E599] bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                      {scale.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={domain.minScale}
                    max={domain.maxScale}
                    step={domain.stepScale}
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-emerald-950/60 rounded-lg appearance-none cursor-pointer accent-[#10E599]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                    <span>{domain.minScale.toLocaleString()} (Pilot)</span>
                    <span>{Math.round((domain.minScale + domain.maxScale) / 2).toLocaleString()}</span>
                    <span>{domain.maxScale.toLocaleString()} (Enterprise)</span>
                  </div>
                </div>

                {/* 3. Deployment Tier */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/70 mb-3">
                    3. Deployment &amp; Isolation Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setDeploymentTier("onprem")}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        deploymentTier === "onprem"
                          ? "bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white"
                          : "bg-white/40 dark:bg-black/30 border-slate-200/80 dark:border-emerald-900/30 text-slate-600 dark:text-emerald-200/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">Sovereign On-Prem / Air-Gap</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-emerald-300/60 block">100% Zero Network Egress</span>
                    </button>

                    <button
                      onClick={() => setDeploymentTier("cloud")}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        deploymentTier === "cloud"
                          ? "bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white"
                          : "bg-white/40 dark:bg-black/30 border-slate-200/80 dark:border-emerald-900/30 text-slate-600 dark:text-emerald-200/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">Isolated Private VPC</span>
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-emerald-300/60 block">Managed Multi-Region VPC</span>
                    </button>
                  </div>
                </div>

            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between text-xs text-slate-500 dark:text-emerald-300/60 font-mono">
              <span>* Calibrated to HealthFirst &amp; RetailMax Deployments</span>
              <span>SOC 2 &bull; HIPAA &bull; GDPR</span>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Projected Impact Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 bg-slate-950 dark:bg-[#070e07] rounded-3xl p-8 md:p-10 text-white shadow-2xl border border-slate-800 dark:border-emerald-900/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] font-mono text-[#10E599] uppercase font-bold tracking-widest block">
                    Projected Annual Value Creation
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-black text-white mt-1 font-mono">
                    +${totalFinancialBenefitUSD.toLocaleString()}
                    <span className="text-xs font-normal text-slate-400 ml-2">/ Year</span>
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-[#10E599] flex items-center justify-center border border-emerald-500/30">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              {/* 4 Quantified Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                
                {/* Metric 1 */}
                <div className="bg-white/5 dark:bg-black/40 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase font-bold">{domain.metric1Label}</span>
                  </div>
                  <p className="text-xl font-black text-white font-mono">
                    {hoursSaved.toLocaleString()} <span className="text-xs font-normal text-slate-400">Hours</span>
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">-{domain.workloadDropPct}% Queue Backlog</span>
                </div>

                {/* Metric 2 */}
                <div className="bg-white/5 dark:bg-black/40 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <Zap className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase font-bold">{domain.metric2Label}</span>
                  </div>
                  <p className="text-xl font-black text-white font-mono">
                    +{efficiencyScore}%
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">Sub-15ms Latency</span>
                </div>

                {/* Metric 3 */}
                <div className="bg-white/5 dark:bg-black/40 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-[#10E599] mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase font-bold">{domain.metric3Label}</span>
                  </div>
                  <p className="text-xl font-black text-white font-mono">
                    98.2%
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">Precision Guaranteed</span>
                </div>

                {/* Metric 4 */}
                <div className="bg-white/5 dark:bg-black/40 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase font-bold">Data Privacy</span>
                  </div>
                  <p className="text-xl font-black text-white font-mono">
                    {complianceScore}%
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">Zero Cloud Leakage</span>
                </div>

              </div>
            </div>

            {/* CTA Action */}
            <div className="space-y-3">
              <button
                onClick={handleDownloadReport}
                disabled={isExporting}
                className="w-full gradient-btn flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-xl hover:scale-[1.01] transition-all cursor-pointer"
              >
                {isExporting ? (
                  <span>Generating Enterprise Model...</span>
                ) : (
                  <>
                    <span>Generate Custom Feasibility Audit</span>
                    <Download className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-400 font-mono">
                Enterprise feasibility audit generated for executive steering committees.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

// Named alias export for backwards compatibility
export const SubstrateROICalculator = AIEnterpriseROICalculator;

