"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  DollarSign, 
  Droplets, 
  TrendingUp, 
  Leaf, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";

interface CropProfile {
  name: string;
  icon: string;
  waterPerAcre: number; // Liters per year
  fertilizerPerAcre: number; // USD per year
  baseYieldVal: number; // USD gross per acre
  yieldBoostPercent: number;
}

const CROPS: Record<string, CropProfile> = {
  tea: {
    name: "Ceylon High-Grown Tea",
    icon: "🍃",
    waterPerAcre: 3500000,
    fertilizerPerAcre: 1800,
    baseYieldVal: 8500,
    yieldBoostPercent: 24.5,
  },
  coconut: {
    name: "Commercial Coconut Estate",
    icon: "🥥",
    waterPerAcre: 4800000,
    fertilizerPerAcre: 1400,
    baseYieldVal: 6200,
    yieldBoostPercent: 28.0,
  },
  hydroponic: {
    name: "Greenhouse Hydroponics (Berries/Tomatoes)",
    icon: "🍓",
    waterPerAcre: 6200000,
    fertilizerPerAcre: 4200,
    baseYieldVal: 34000,
    yieldBoostPercent: 32.5,
  },
  spices: {
    name: "Ceylon Cinnamon & Black Pepper",
    icon: "🌿",
    waterPerAcre: 2900000,
    fertilizerPerAcre: 2100,
    baseYieldVal: 14500,
    yieldBoostPercent: 26.0,
  },
};

export default function SubstrateROICalculator() {
  const [acres, setAcres] = useState<number>(150);
  const [selectedCrop, setSelectedCrop] = useState<string>("tea");
  const [substrateType, setSubstrateType] = useState<"standard" | "hosma">("hosma");
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const crop = CROPS[selectedCrop];

  // Calculations
  const waterSavedLiters = Math.round(acres * crop.waterPerAcre * (substrateType === "hosma" ? 0.35 : 0.18));
  const fertilizerSavedUSD = Math.round(acres * crop.fertilizerPerAcre * (substrateType === "hosma" ? 0.28 : 0.12));
  const additionalYieldRevenueUSD = Math.round(acres * crop.baseYieldVal * (crop.yieldBoostPercent / 100));
  const totalFinancialBenefitUSD = fertilizerSavedUSD + additionalYieldRevenueUSD;
  const carbonOffsetTons = Math.round(acres * 3.4);

  const handleDownloadReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`[NATLE Feasibility Engine]\n\nCustom Estate Calibration Report for ${acres} Acres (${crop.name}) generated successfully!\n\nEstimated Annual ROI: $${totalFinancialBenefitUSD.toLocaleString()}\nWater Conserved: ${(waterSavedLiters / 1000000).toFixed(1)}M Liters.`);
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
            Calculate Your <span className="gradient-text">Estate Yield ROI</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-100/70"
          >
            Configure your acreage and cultivation model to estimate water conservation, fertilizer runoff reductions, and projected revenue gains with NATLE + Hosma Ceylon.
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
              
                {/* 1. Crop Selection Tabs */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/70 mb-3">
                    1. Select Crop Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(CROPS).map(([key, item]) => {
                      const isSelected = selectedCrop === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedCrop(key)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                            isSelected
                              ? "bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white shadow-md"
                              : "bg-white/40 dark:bg-black/30 border-slate-200/80 dark:border-emerald-900/30 text-slate-700 dark:text-emerald-200/70 hover:border-emerald-500/40"
                          }`}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <span className="text-xs font-bold block leading-tight">{item.name}</span>
                            <span className="text-[10px] font-mono text-[#059669] dark:text-[#10E599]">+{item.yieldBoostPercent}% Projected</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Acreage Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/70">
                      2. Plantation Acreage
                    </label>
                    <span className="text-lg font-black font-mono text-[#059669] dark:text-[#10E599] bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                      {acres.toLocaleString()} Acres
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1500"
                    step="10"
                    value={acres}
                    onChange={(e) => setAcres(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-emerald-950/60 rounded-lg appearance-none cursor-pointer accent-[#10E599]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                    <span>10 Acres (Boutique)</span>
                    <span>500 Acres</span>
                    <span>1,500+ Acres (Commercial)</span>
                  </div>
                </div>

                {/* 3. Substrate Model Switcher */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/70 mb-3">
                    3. Substrate & Telemetry Integration
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setSubstrateType("hosma")}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        substrateType === "hosma"
                          ? "bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white"
                          : "bg-white/40 dark:bg-black/30 border-slate-200/80 dark:border-emerald-900/30 text-slate-600 dark:text-emerald-200/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">Hosma + FieldOS™</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-emerald-300/60 block">Full Closed-Loop Automation</span>
                    </button>

                    <button
                      onClick={() => setSubstrateType("standard")}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        substrateType === "standard"
                          ? "bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white"
                          : "bg-white/40 dark:bg-black/30 border-slate-200/80 dark:border-emerald-900/30 text-slate-600 dark:text-emerald-200/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">Raw Soil / Standard</span>
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-emerald-300/60 block">Manual Field Monitoring</span>
                    </button>
                  </div>
                </div>

            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between text-xs text-slate-500 dark:text-emerald-300/60 font-mono">
              <span>* Calibrated to Sri Lankan & Dutch Field Data</span>
              <span>ISO &bull; OMRI &bull; GlobalG.A.P</span>
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
                    Projected Annual Financial Impact
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
                
                {/* Metric 1: Water Conserved */}
                <div className="bg-white/5 dark:bg-black/40 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <Droplets className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase font-bold">Water Saved</span>
                  </div>
                  <p className="text-xl font-black text-white font-mono">
                    {(waterSavedLiters / 1000000).toFixed(1)}M <span className="text-xs font-normal text-slate-400">Liters</span>
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">35% Reduction</span>
                </div>

                {/* Metric 2: Fertilizer Cost Reduction */}
                <div className="bg-white/5 dark:bg-black/40 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase font-bold">Fertilizer Cut</span>
                  </div>
                  <p className="text-xl font-black text-white font-mono">
                    ${fertilizerSavedUSD.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">Zero Leaching Runoff</span>
                </div>

                {/* Metric 3: Additional Harvest Revenue */}
                <div className="bg-white/5 dark:bg-black/40 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-[#10E599] mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase font-bold">Yield Revenue</span>
                  </div>
                  <p className="text-xl font-black text-white font-mono">
                    +${additionalYieldRevenueUSD.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">+{crop.yieldBoostPercent}% Crop Biomass</span>
                </div>

                {/* Metric 4: Carbon Offset */}
                <div className="bg-white/5 dark:bg-black/40 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Leaf className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase font-bold">Carbon Offset</span>
                  </div>
                  <p className="text-xl font-black text-white font-mono">
                    {carbonOffsetTons.toLocaleString()} <span className="text-xs font-normal text-slate-400">Tons CO₂e</span>
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">100% Organic Substrates</span>
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
                  <span>Generating Calibration Audit...</span>
                ) : (
                  <>
                    <span>Generate Custom Feasibility Audit</span>
                    <Download className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-400 font-mono">
                Direct export audit generated for Ceylon commercial plantation managers.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
