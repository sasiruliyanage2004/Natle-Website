"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Globe2, 
  Ship, 
  Radio, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  ArrowUpRight, 
  Sparkles 
} from "lucide-react";

interface ExportDestination {
  id: string;
  country: string;
  city: string;
  flag: string;
  lat: number;
  lng: number;
  containers: string;
  sensorNodes: number;
  cropFocus: string;
  substrate: string;
}

const DESTINATIONS: ExportDestination[] = [
  {
    id: "nl",
    country: "Netherlands",
    city: "Port of Rotterdam / Westland",
    flag: "🇳🇱",
    lat: 51.9,
    lng: 4.4,
    containers: "140+ TEU / Year",
    sensorNodes: 1250,
    cropFocus: "High-Wire Tomatoes & Bell Peppers",
    substrate: "Hosma Low-EC Buffered 100x15x10 Growbags",
  },
  {
    id: "jp",
    country: "Japan",
    city: "Yokohama / Nagano Greenhouses",
    flag: "🇯🇵",
    lat: 35.4,
    lng: 139.6,
    containers: "85+ TEU / Year",
    sensorNodes: 840,
    cropFocus: "Premium Hydroponic Strawberries & Melons",
    substrate: "Hosma Easy-Fill 5kg Blocks (EC < 0.4 mS/cm)",
  },
  {
    id: "uae",
    country: "United Arab Emirates",
    city: "Jebel Ali, Dubai / Al Ain",
    flag: "🇦🇪",
    lat: 25.0,
    lng: 55.1,
    containers: "110+ TEU / Year",
    sensorNodes: 1420,
    cropFocus: "Climate-Resilient Desert Hydroponics",
    substrate: "Hosma 70/30 High-Porosity Coco/Chip Mix",
  },
  {
    id: "usa",
    country: "United States",
    city: "Long Beach, CA / Salinas Valley",
    flag: "🇺🇸",
    lat: 33.7,
    lng: -118.2,
    containers: "220+ TEU / Year",
    sensorNodes: 2600,
    cropFocus: "Commercial Organic Berry & Cannabis Farms",
    substrate: "OMRI Listed 100% Organic Ceylon Cocopeat",
  },
  {
    id: "au",
    country: "Australia",
    city: "Melbourne / Goulburn Valley",
    flag: "🇦🇺",
    lat: -37.8,
    lng: 144.9,
    containers: "75+ TEU / Year",
    sensorNodes: 950,
    cropFocus: "Commercial Vineyards & Macadamia Orchards",
    substrate: "Hosma Coir Disks & Custom Tree Pellets",
  },
];

export default function GlobalExportMap() {
  const [selectedDest, setSelectedDest] = useState<ExportDestination>(DESTINATIONS[0]);

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
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Agricultural Supply Chain</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Colombo Port to <span className="gradient-text">24+ Countries.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-emerald-100/70"
          >
            How Hosma Ceylon 100% organic substrates and NATLE wireless telemetry power commercial growers and greenhouse operators worldwide.
          </motion.p>
        </div>

        {/* Global Hub Map & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Destination Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/70 block mb-2">
              Select Primary Export Hub:
            </span>

            {DESTINATIONS.map((dest) => {
              const isSelected = selectedDest.id === dest.id;

              return (
                <motion.div
                  key={dest.id}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedDest(dest)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? "glass-card border-emerald-500 bg-emerald-500/10 shadow-lg"
                      : "bg-white/40 dark:bg-black/30 border-slate-200/80 dark:border-emerald-900/30 hover:border-emerald-500/40"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{dest.flag}</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">{dest.country}</h4>
                      <p className="text-xs text-slate-500 dark:text-emerald-300/60 font-mono">{dest.city}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold font-mono text-[#059669] dark:text-[#10E599] block">{dest.containers}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{dest.sensorNodes} Active IoT Probes</span>
                  </div>
                </motion.div>
              );
            })}

            {/* Direct Hosma Ceylon Export Link */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/40 border border-emerald-500/20 text-xs flex items-center justify-between text-slate-700 dark:text-emerald-200/80 mt-4">
              <span>Looking for bulk container freight?</span>
              <a
                href="https://hosmaceylon.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#059669] dark:text-[#10E599] font-bold hover:underline flex items-center gap-1"
              >
                <span>hosmaceylon.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Terminal Dashboard */}
          <motion.div
            key={selectedDest.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7 bg-slate-950 dark:bg-[#070e07] rounded-3xl p-8 md:p-10 text-white shadow-2xl border border-slate-800 dark:border-emerald-900/40 flex flex-col justify-between"
          >
            <div>
              {/* Terminal Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedDest.flag}</span>
                  <div>
                    <span className="text-[10px] font-mono text-[#10E599] uppercase font-bold tracking-widest block">
                      Active Export Corridor
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Colombo &rarr; {selectedDest.city}
                    </h3>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-[#10E599] text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Telemetry</span>
                </div>
              </div>

              {/* 3 Metric Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Annual Freight</span>
                  <p className="text-xl font-black text-white font-mono mt-1">{selectedDest.containers}</p>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">40ft High Cube Direct</span>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">FieldOS Telemetry</span>
                  <p className="text-xl font-black text-cyan-400 font-mono mt-1">{selectedDest.sensorNodes.toLocaleString()} Probes</p>
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">LoRaWAN Mesh Sync</span>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Audit Compliance</span>
                  <p className="text-xl font-black text-[#10E599] font-mono mt-1">100%</p>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1">GlobalG.A.P / OMRI</span>
                </div>
              </div>

              {/* Crop & Substrate Details */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Primary Commercial Crop</span>
                  <p className="text-sm font-bold text-white">{selectedDest.cropFocus}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Certified Hosma Substrate Specification</span>
                  <p className="text-sm font-bold text-[#10E599]">{selectedDest.substrate}</p>
                </div>
              </div>
            </div>

            {/* Bottom Status & CTA */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Ship className="w-4 h-4 text-cyan-400" />
                <span>Direct Bill of Lading from Colombo Port</span>
              </div>

              <a
                href="/contact"
                className="w-full sm:w-auto gradient-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-md hover:scale-105 transition-transform"
              >
                <span>Order Freight Allocation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
