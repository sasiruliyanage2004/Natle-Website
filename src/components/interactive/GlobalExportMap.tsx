"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
 Globe2, 
 Brain,
 Radio, 
 CheckCircle2, 
 MapPin, 
 Layers, 
 ArrowUpRight, 
 Sparkles,
 ShieldCheck
} from "lucide-react";

interface DeploymentHub {
 id: string;
 country: string;
 city: string;
 flag: string;
 lat: number;
 lng: number;
 stat1Label: string;
 stat1Value: string;
 stat1Sub: string;
 stat2Label: string;
 stat2Value: string;
 stat2Sub: string;
 compliance: string;
 client: string;
 domain: string;
}

const DEPLOYMENTS: DeploymentHub[] = [
 {
 id: "us",
 country: "United States",
 city: "Boston, MA / Houston, TX",
 flag: "🇺🇸",
 lat: 42.3,
 lng: -71.0,
 stat1Label: "Daily AI Scans",
 stat1Value: "12,000+",
 stat1Sub: "Radiology & Pathology",
 stat2Label: "Diagnostic Accuracy",
 stat2Value: "98.2%",
 stat2Sub: "vs. 91% baseline",
 compliance: "HIPAA · SOC 2 · HL7 FHIR",
 client: "HealthFirst Hospital Group",
 domain: "Healthcare Diagnostic AI",
 },
 {
 id: "uk",
 country: "United Kingdom & Europe",
 city: "London / Amsterdam / Berlin",
 flag: "🇬🇧",
 lat: 51.5,
 lng: -0.1,
 stat1Label: "Retail Stores Live",
 stat1Value: "120+",
 stat1Sub: "Real-time POS NeuralSync",
 stat2Label: "Checkout Latency",
 stat2Value: "<15ms",
 stat2Sub: "Edge inference",
 compliance: "GDPR · PCI DSS · SOC 2",
 client: "RetailMax Chain",
 domain: "Retail POS Intelligence",
 },
 {
 id: "sg",
 country: "Singapore & Malaysia",
 city: "Singapore CBD / Kuala Lumpur",
 flag: "🇸🇬",
 lat: 1.3,
 lng: 103.8,
 stat1Label: "Active Students",
 stat1Value: "140,000+",
 stat1Sub: "EduReach Global",
 stat2Label: "Engagement Uplift",
 stat2Value: "+43%",
 stat2Sub: "Adaptive learning paths",
 compliance: "ISO 27001 · PDPA · SOC 2",
 client: "EduReach Global",
 domain: "Adaptive EdTech AI",
 },
 {
 id: "au",
 country: "Australia",
 city: "Queensland / Western Australia",
 flag: "🇦🇺",
 lat: -27.5,
 lng: 153.0,
 stat1Label: "Hectares Monitored",
 stat1Value: "15,000+",
 stat1Sub: "IoT telemetry mesh",
 stat2Label: "Yield Increase",
 stat2Value: "+31%",
 stat2Sub: "vs. prior season",
 compliance: "GlobalG.A.P · ISO 27001",
 client: "GreenField Agri Corp",
 domain: "Agriculture IoT AI",
 },
 {
 id: "jp",
 country: "Japan & South Korea",
 city: "Tokyo / Seoul",
 flag: "🇯🇵",
 lat: 35.6,
 lng: 139.7,
 stat1Label: "Robotics AI Nodes",
 stat1Value: "2,400+",
 stat1Sub: "Industrial edge inference",
 stat2Label: "Process Automation",
 stat2Value: "60%",
 stat2Sub: "Workload reduction",
 compliance: "ISO 9001 · IEC 62443",
 client: "Precision Robotics Consortium",
 domain: "Industry 4.0 & Edge AI",
 },
];

export default function GlobalExportMap() {
 const [selectedHub, setSelectedHub] = useState<DeploymentHub>(DEPLOYMENTS[0]);

 return (
 <section className="relative py-28 bg-transparent select-none">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto mb-14">
 <motion.div
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] ] shadow-sm mb-4"
 >
 <Globe2 className="w-3.5 h-3.5" />
 <span>Global Enterprise AI Deployments</span>
 </motion.div>

 <motion.h2
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight"
 >
 Colombo to <span className="gradient-text">5 Continents.</span>
 </motion.h2>

 <motion.p
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.15 }}
 className="mt-4 text-base sm:text-lg text-slate-600 "
 >
 How NATLE sovereign enterprise AI powers hospitals, retailers, agri-corps, and schools across the globe — with zero data leaving client premises.
 </motion.p>
 </div>

 {/* Deployment Hub Map & Details Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
 
 {/* Left Column: Interactive Hub Selector */}
 <div className="lg:col-span-5 space-y-3">
 <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
 Select Deployment Region:
 </span>

 {DEPLOYMENTS.map((hub) => {
 const isSelected = selectedHub.id === hub.id;

 return (
 <motion.div
 key={hub.id}
 whileHover={{ x: 4, transition: { duration: 0.2 } }}
 onClick={() => setSelectedHub(hub)}
 className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
 isSelected
 ? "glass-card border-emerald-500 bg-emerald-500/10 shadow-lg"
 : "bg-white/40 border-slate-200/80 hover:border-emerald-500/40"
 }`}
 >
 <div className="flex items-center gap-3.5">
 <span className="text-2xl">{hub.flag}</span>
 <div>
 <h4 className="text-sm font-black text-slate-900 ">{hub.country}</h4>
 <p className="text-xs text-slate-500 font-mono">{hub.city}</p>
 </div>
 </div>

 <div className="text-right">
 <span className="text-xs font-bold font-mono text-[#059669] ] block">{hub.domain}</span>
 <span className="text-[10px] text-slate-400 font-mono">{hub.client}</span>
 </div>
 </motion.div>
 );
 })}

 {/* Enterprise Contact CTA */}
 <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs flex items-center justify-between text-slate-700 mt-4">
 <span>Deploy NATLE AI in your region?</span>
 <a
 href="/contact"
 className="text-[#059669] ] font-bold hover:underline flex items-center gap-1"
 >
 <span>Book a Demo</span>
 <ArrowUpRight className="w-3.5 h-3.5" />
 </a>
 </div>
 </div>

 {/* Right Column: Dynamic Deployment Terminal */}
 <motion.div
 key={selectedHub.id}
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.35 }}
 className="lg:col-span-7 bg-slate-950 ] rounded-3xl p-8 md:p-10 text-white shadow-2xl border border-slate-800 flex flex-col justify-between"
 >
 <div>
 {/* Terminal Header */}
 <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
 <div className="flex items-center gap-3">
 <span className="text-4xl">{selectedHub.flag}</span>
 <div>
 <span className="text-[10px] font-mono text-[#10E599] uppercase font-bold tracking-widest block">
 Live Deployment
 </span>
 <h3 className="text-2xl sm:text-3xl font-black text-white">
 {selectedHub.client}
 </h3>
 </div>
 </div>

 <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-[#10E599] text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-2">
 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
 <span>Sovereign AI Active</span>
 </div>
 </div>

 {/* 3 Metric Chips */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
 <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
 <span className="text-[10px] font-mono text-slate-400 uppercase block">{selectedHub.stat1Label}</span>
 <p className="text-xl font-black text-white font-mono mt-1">{selectedHub.stat1Value}</p>
 <span className="text-[10px] text-emerald-400 font-bold block mt-1">{selectedHub.stat1Sub}</span>
 </div>

 <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
 <span className="text-[10px] font-mono text-slate-400 uppercase block">{selectedHub.stat2Label}</span>
 <p className="text-xl font-black text-cyan-400 font-mono mt-1">{selectedHub.stat2Value}</p>
 <span className="text-[10px] text-slate-400 font-bold block mt-1">{selectedHub.stat2Sub}</span>
 </div>

 <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
 <span className="text-[10px] font-mono text-slate-400 uppercase block">Data Sovereignty</span>
 <p className="text-xl font-black text-[#10E599] font-mono mt-1">100%</p>
 <span className="text-[10px] text-emerald-400 font-bold block mt-1">On-Premise Only</span>
 </div>
 </div>

 {/* Domain & Compliance Details */}
 <div className="space-y-4">
 <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
 <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">AI Domain</span>
 <p className="text-sm font-bold text-white">{selectedHub.domain}</p>
 </div>

 <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
 <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Compliance & Certifications</span>
 <p className="text-sm font-bold text-[#10E599]">{selectedHub.compliance}</p>
 </div>
 </div>
 </div>

 {/* Bottom Status & CTA */}
 <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
 <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
 <ShieldCheck className="w-4 h-4 text-[#10E599]" />
 <span>Zero data egress · Deployed from Colombo 05, Sri Lanka</span>
 </div>

 <a
 href="/contact"
 className="w-full sm:w-auto gradient-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-md hover:scale-105 transition-transform"
 >
 <span>Schedule Enterprise Demo</span>
 <ArrowUpRight className="w-4 h-4" />
 </a>
 </div>

 </motion.div>

 </div>

 </div>
 </section>
 );
}


