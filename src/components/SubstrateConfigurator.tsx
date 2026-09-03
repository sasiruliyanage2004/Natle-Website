"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sprout, 
  Droplets, 
  Layers, 
  Ship, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Sparkles,
  Sliders,
  FileSpreadsheet,
  Building2,
  Leaf
} from "lucide-react";
import Link from "next/link";
import { CardPattern } from "@/components/ui/CardPattern";

interface CropPreset {
  id: string;
  name: string;
  icon: string;
  recommendedRatio: string;
  recommendedEC: string;
  recommendedFormat: string;
  airPorosity: string;
  waterCapacity: string;
}

const CROP_PRESETS: CropPreset[] = [
  {
    id: "tomato",
    name: "Hydroponic Tomatoes",
    icon: "🍅",
    recommendedRatio: "70/30 Pith & Husk Chips",
    recommendedEC: "< 0.5 mS/cm (Triple Washed)",
    recommendedFormat: "Growbag Slab (100×15×10cm)",
    airPorosity: "22% - 25%",
    waterCapacity: "850%",
  },
  {
    id: "berry",
    name: "Strawberries & Berries",
    icon: "🍓",
    recommendedRatio: "100% Fine Washed Peat",
    recommendedEC: "< 0.4 mS/cm (Buffered Ca+Mg)",
    recommendedFormat: "Easy-Fill Open Top Growbag",
    airPorosity: "18% - 20%",
    waterCapacity: "900%",
  },
  {
    id: "pepper",
    name: "Bell Peppers & Cucumbers",
    icon: "🫑",
    recommendedRatio: "50/50 Coir & Coarse Crush",
    recommendedEC: "< 0.5 mS/cm (Super Washed)",
    recommendedFormat: "Standard Growbag (100×20×10cm)",
    airPorosity: "24% - 28%",
    waterCapacity: "780%",
  },
  {
    id: "floriculture",
    name: "Roses, Orchids & Cut Flowers",
    icon: "🌸",
    recommendedRatio: "60/40 Coir & Husk Cubes",
    recommendedEC: "< 0.3 mS/cm (Ultra Pure)",
    recommendedFormat: "5kg Compacted Hydroponic Block",
    airPorosity: "25% - 30%",
    waterCapacity: "750%",
  },
  {
    id: "tea",
    name: "Highland Tea & Tree Nurseries",
    icon: "🌱",
    recommendedRatio: "100% Organic Ceylon Peat",
    recommendedEC: "< 0.6 mS/cm (OMRI Listed)",
    recommendedFormat: "Compressed Coir Disks & Pellets",
    airPorosity: "20% - 22%",
    waterCapacity: "880%",
  },
];

export default function SubstrateConfigurator() {
  const [selectedCrop, setSelectedCrop] = useState<string>("tomato");
  const [format, setFormat] = useState<string>("Growbag Slab (100×15×10cm)");
  const [ratio, setRatio] = useState<string>("70/30 Coir Pith to Husk Chips");
  const [ecGrade, setEcGrade] = useState<string>("Triple Washed (< 0.5 mS/cm)");
  const [buffering, setBuffering] = useState<string>("Calcium Nitrate Buffered (Ca(NO3)2)");
  const [containerSize, setContainerSize] = useState<string>("40ft High-Cube (24-26 MT Payload)");
  const [quoteRequested, setQuoteRequested] = useState<boolean>(false);

  const activePreset = CROP_PRESETS.find((c) => c.id === selectedCrop) || CROP_PRESETS[0];

  const handleApplyPreset = (preset: CropPreset) => {
    setSelectedCrop(preset.id);
    setFormat(preset.recommendedFormat);
    setRatio(preset.recommendedRatio);
    setEcGrade(preset.recommendedEC);
  };

  const handleDownloadSpec = () => {
    // Generate a simple client-side text spec file download
    const specContent = `=====================================================
HOSMA CEYLON & NATLE TECH — SUBSTRATE SPECIFICATION SHEET
Parent Entity: Hosma Ceylon (Pvt) Ltd (https://hosmaceylon.com)
Export Hub: Port of Colombo (CMB), Sri Lanka
=====================================================

TARGET CROP: ${activePreset.name}
PRODUCT FORMAT: ${format}
COIR MIXTURE RATIO: ${ratio}
ELECTRICAL CONDUCTIVITY (EC): ${ecGrade}
BUFFERING GRADE: ${buffering}
CONTAINER LOGISTICS: ${containerSize}

TECHNICAL PHYSICAL PARAMETERS:
- Water Holding Capacity: ${activePreset.waterCapacity} (8-9x weight)
- Air-Filled Porosity (AFP): ${activePreset.airPorosity}
- pH Range: 5.8 - 6.5 (Optimal Root Zone Buffer)
- Organic Matter: 98.5% (OMRI Listed & GlobalG.A.P Audit Ready)
- Heavy Metals / Pathogen Free: Certified Lab Analysis Included

SHIPPING & INCOTERMS:
- Port of Loading: Port of Colombo, Sri Lanka
- Incoterms Supported: FOB Colombo, CIF Rotterdam, CIF Yokohama, CIF Long Beach
- Factory Lead Time: 14-21 Days Dispatch

Direct Inquiries: contact@natle.tech | sales@hosmaceylon.com
=====================================================`;

    const blob = new Blob([specContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Hosma_Substrate_Spec_${selectedCrop}.txt`;
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
            <span>Interactive Substrate Lab &bull; Hosma Ceylon</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Custom Cocopeat <br />
            <span className="font-serif italic font-normal gradient-text">
              Mixture Configurator.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed">
            Select your commercial crop, customize aeration ratios, EC buffering levels, and export container sizing to generate an instant technical spec sheet.
          </p>
        </div>

        {/* 1. Crop Preset Bar */}
        <div className="mb-10">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/60 mb-3 text-center">
            Quick Crop Formulations:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {CROP_PRESETS.map((preset) => {
              const isActive = selectedCrop === preset.id;
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
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#071326] dark:text-white">Formulation Parameters</h3>
                    <p className="text-xs text-slate-500 dark:text-emerald-300/60 font-mono">Calibrated to Hosma Ceylon processing mills</p>
                  </div>
                </div>
              </div>

              {/* Control 1: Format */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider block">
                  1. Substrate Format &amp; Dimensions
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 bg-white/90 dark:bg-[#080d08] py-3.5 px-4 text-sm text-slate-900 dark:text-white font-medium focus:border-[#059669] focus:outline-none"
                >
                  <option>Growbag Slab (100×15×10cm)</option>
                  <option>Standard Growbag (100×20×10cm)</option>
                  <option>Easy-Fill Open Top Growbag (5L / 10L)</option>
                  <option>5kg Compacted Hydroponic Block (75L Expanded)</option>
                  <option>Compressed Coir Disks &amp; Pellets (Nursery Grade)</option>
                  <option>Bulk Loose Cocopeat (40ft Container Direct Load)</option>
                </select>
              </div>

              {/* Control 2: Ratio */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider block">
                  2. Coir Pith to Husk Chips Ratio (Aeration Blend)
                </label>
                <select
                  value={ratio}
                  onChange={(e) => setRatio(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 bg-white/90 dark:bg-[#080d08] py-3.5 px-4 text-sm text-slate-900 dark:text-white font-medium focus:border-[#059669] focus:outline-none"
                >
                  <option>100% Fine Washed Peat (Max Water Retention)</option>
                  <option>70/30 Coir Pith to Husk Chips (Balanced Vegetative)</option>
                  <option>50/50 Coir &amp; Coarse Crush (High Porosity Hydroponic)</option>
                  <option>60/40 Coir &amp; Husk Cubes (Long-Cycle Berry &amp; Orchids)</option>
                </select>
              </div>

              {/* Control 3: EC Grade */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider block">
                  3. Electrical Conductivity (EC Wash Grade)
                </label>
                <select
                  value={ecGrade}
                  onChange={(e) => setEcGrade(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 bg-white/90 dark:bg-[#080d08] py-3.5 px-4 text-sm text-slate-900 dark:text-white font-medium focus:border-[#059669] focus:outline-none"
                >
                  <option>Triple Washed (&lt; 0.5 mS/cm - Low EC Export Grade)</option>
                  <option>Ultra Pure Washed (&lt; 0.3 mS/cm - Dutch Standard)</option>
                  <option>Buffered with Calcium Nitrate (&lt; 0.4 mS/cm)</option>
                  <option>Unwashed Natural Raw (&gt; 1.5 mS/cm - Soil Conditioning)</option>
                </select>
              </div>

              {/* Control 4: Container Size */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider block">
                  4. Shipping Dispatch &amp; Incoterms
                </label>
                <select
                  value={containerSize}
                  onChange={(e) => setContainerSize(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 bg-white/90 dark:bg-[#080d08] py-3.5 px-4 text-sm text-slate-900 dark:text-white font-medium focus:border-[#059669] focus:outline-none"
                >
                  <option>40ft High-Cube Container (24-26 MT &bull; 22 Pallets)</option>
                  <option>20ft Standard Container (12-14 MT &bull; 10 Pallets)</option>
                  <option>LCL Trial Sample Pallet (1 MT Air/Sea Freight)</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 dark:border-emerald-900/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-emerald-300/60">
                <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
                <span>OMRI &bull; GlobalG.A.P &bull; ISO 9001 Certified</span>
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
            
            {/* Advanced Bio-Hex Honeycomb Telemetry Motif */}
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
                    Live Formulation Matrix
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#10E599] text-[10px] font-mono font-bold">
                  Ready to Dispatch
                </span>
              </div>

              {/* Summary Parameters */}
              <div className="py-6 space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Target Formulation:</span>
                  <p className="text-lg font-black text-white">{activePreset.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Air Porosity (AFP)</span>
                    <span className="text-sm font-bold text-[#10E599] font-mono">{activePreset.airPorosity}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Water Holding (WHC)</span>
                    <span className="text-sm font-bold text-[#00D2FF] font-mono">{activePreset.waterCapacity}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Selected Slab:</span>
                    <span className="text-white font-bold truncate max-w-[180px]">{format.split("(")[0]}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">EC Specification:</span>
                    <span className="text-[#10E599] font-bold">{ecGrade.split("(")[0]}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Port of Loading:</span>
                    <span className="text-white font-bold">Port of Colombo (CMB)</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Est. Dispatch:</span>
                    <span className="text-[#F59E0B] font-bold">14 - 21 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Quote Request CTA */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              {quoteRequested ? (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10E599]" />
                  <span>Spec dispatched to agronomy desk. We will email CIF rates shortly!</span>
                </div>
              ) : (
                <Link
                  href="/contact"
                  className="w-full gradient-btn group inline-flex items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-wider text-slate-950 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer text-center"
                >
                  <span>Request Instant Container Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              <p className="text-[10px] font-mono text-center text-slate-400">
                Direct export inquiry &bull; Colombo WTC Agronomy Desk
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
