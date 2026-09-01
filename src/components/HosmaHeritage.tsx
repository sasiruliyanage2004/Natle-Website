"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sprout, 
  Globe2, 
  ShieldCheck, 
  Ship, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  Layers,
  Sparkles,
  Droplets
} from "lucide-react";
import Link from "next/link";

const exportDestinations = [
  { country: "Netherlands & Europe", share: "38%", use: "High-tech Hydroponic Greenhouses", ec: "< 0.5 mS/cm" },
  { country: "Japan & South Korea", share: "26%", use: "Precision Berry & Melon Substrates", ec: "< 0.4 mS/cm" },
  { country: "United States & Canada", share: "22%", use: "Commercial Indoor Vertical Farms", ec: "< 0.5 mS/cm" },
  { country: "Australia & New Zealand", share: "14%", use: "Orchard & Viticulture Moisture Retention", ec: "< 0.6 mS/cm" },
];

export default function HosmaHeritage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="heritage" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white py-28 md:py-36 select-none">
      
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 shadow-sm mb-4">
            <Sprout className="h-4 w-4 text-emerald-600" />
            <span>Parent Heritage &bull; Hosma Ceylon (Pvt) Ltd</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0F172A] leading-[1.08]">
            Rooted in Ceylon&apos;s Richest Soil. <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-[#0066FF] bg-clip-text text-transparent">
              Engineered for the World.
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-600 font-normal leading-relaxed">
            NATLE was born from <strong>Hosma Ceylon</strong> (<a href="https://hosmaceylon.com" target="_blank" rel="noreferrer" className="text-[#0066FF] font-bold hover:underline">hosmaceylon.com</a>) — Sri Lanka&apos;s premier exporter of 100% organic coconut coir substrates, now supercharged with next-generation IoT telemetry and predictive cloud intelligence.
          </p>
        </div>

        {/* Dual Interactive Grid: Left 3D Substrate Anatomy + Right Global Export Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 3D Cocopeat Technology Card */}
          <div className="lg:col-span-6 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            
            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-600 uppercase tracking-wider">
                    Product Specification #01
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    Hosma Ultra-Washed Cocopeat
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                  OMRI &bull; ISO 9001
                </span>
              </div>

              {/* Interactive Substrate Spec Breakdown */}
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0066FF] flex items-center justify-center font-bold">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Water Holding Capacity</p>
                      <p className="text-base font-black text-slate-900">800% - 900% (8-9x Weight)</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-[#0066FF] bg-blue-50 px-2.5 py-1 rounded-lg">High Retentive</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Electrical Conductivity (EC)</p>
                      <p className="text-base font-black text-slate-900">&lt; 0.5 mS/cm (Triple Washed)</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">Low Salt</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">pH Level &amp; Aeration</p>
                      <p className="text-base font-black text-slate-900">5.8 - 6.5 pH &bull; 25% Air Porosity</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-lg">Optimal Roots</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Available in 5kg Blocks, Growbags &amp; Easy-Fill Disks</span>
              <Link 
                href="/services" 
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#0066FF] hover:text-blue-700"
              >
                <span>View Tech Specs</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>


          {/* Right Column: Global Export Network Matrix */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-950 p-8 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden border border-slate-800">
            
            {/* Ambient Background Light */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0066FF] to-cyan-400 text-white flex items-center justify-center">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
                      Worldwide Supply Chain
                    </span>
                    <h3 className="text-2xl font-black text-white">Global Export Corridors</h3>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400">
                  <Ship className="w-3.5 h-3.5" />
                  Direct Vessels
                </span>
              </div>

              {/* Export Destination Cards */}
              <div className="mt-6 space-y-3">
                {exportDestinations.map((dest, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <h4 className="text-sm font-black text-white">{dest.country}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{dest.use}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-emerald-400 font-mono">{dest.share}</span>
                      <p className="text-[10px] font-mono text-slate-500">EC {dest.ec}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Shipped from Colombo Port with Live IoT Smart Container Tracking</span>
              <span className="font-mono text-cyan-400 font-bold">100% Traceable</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
