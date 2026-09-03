"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { motion } from "framer-motion";
import { 
  Code2, 
  Bot, 
  Smartphone, 
  Radio, 
  Leaf, 
  Plane, 
  Droplets, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Database, 
  Globe2 
} from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  category: "software" | "agritech";
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  specs: string[];
  deliverables: string[];
  techPills: string[];
}

const servicesList: ServiceItem[] = [
  // ================= DIVISION 1: SOFTWARE ENGINEERING & AI =================
  {
    id: "software-web",
    category: "software",
    icon: Code2,
    badge: "Cloud & Web Engineering",
    title: "Full-Stack Web & SaaS Platform Engineering",
    description: "Designing hyper-scalable, sub-50ms web applications and real-time enterprise SaaS portals with Next.js, Go microservices, distributed WebSockets, and TimescaleDB.",
    specs: ["Sub-50ms Server Response", "Microservices & Distributed Architecture", "Real-Time WebSocket Sync", "99.99% Uptime Guarantee"],
    deliverables: ["Custom Web Application Architecture", "Secure Role-Based User Portals", "RESTful & GraphQL APIs", "Automated CI/CD Deployment Pipelines"],
    techPills: ["Next.js 15", "TypeScript", "Go / Golang", "PostgreSQL", "Docker", "AWS / GCP"],
  },
  {
    id: "software-ai",
    category: "software",
    icon: Bot,
    badge: "Artificial Intelligence",
    title: "Enterprise AI, Machine Learning & Computer Vision",
    description: "Building proprietary neural networks, predictive anomaly detection models, automated document processing, and custom LLM agent integrations tailored to enterprise datasets.",
    specs: ["Custom Model Training & Fine-Tuning", "Real-Time Edge Computer Vision", "Predictive Trend & Risk Algorithms", "Privacy-Preserving On-Premises LLMs"],
    deliverables: ["Production-Ready PyTorch / ONNX Models", "Computer Vision Inspection Pipelines", "Automated Decision Support Engine", "Model Performance & Accuracy Reports"],
    techPills: ["PyTorch", "Python", "OpenCV", "TensorFlow", "FastAPI", "Hugging Face"],
  },
  {
    id: "software-mobile",
    category: "software",
    icon: Smartphone,
    badge: "Mobile Architecture",
    title: "Cross-Platform & Native Mobile Applications",
    description: "Developing blazing-fast iOS and Android applications with Flutter and React Native, featuring offline-first local SQLite sync and hardware Bluetooth/NFC telemetry hooks.",
    specs: ["60 FPS Fluid Native UI", "Offline-First Local Data Persistence", "Background Geofencing & Telemetry Sync", "Biometric Authentication"],
    deliverables: ["iOS App Store & Google Play Release", "Responsive Tablet / POS Layouts", "Push Notification Architecture", "Cross-Platform Design System"],
    techPills: ["Flutter", "Dart", "React Native", "iOS / Swift", "Android / Kotlin", "SQLite"],
  },
  {
    id: "software-iot",
    category: "software",
    icon: Cpu,
    badge: "Hardware & Firmware",
    title: "Custom Embedded IoT Hardware & Firmware Engineering",
    description: "Custom PCB design, ultra-low-power microcontrollers (ESP32, STM32, Nordic), long-range LoRaWAN sub-GHz telemetry, and industrial sensor network integration.",
    specs: ["5+ Year Ultra-Low Power Sleep Modes", "15km LoRaWAN Mesh Wireless Range", "IP68 Submersible Enclosures", "Over-The-Air (OTA) Firmware Updates"],
    deliverables: ["Custom PCB Layout & Schematics", "Industrial C/C++ Firmware", "LoRaWAN & Cellular Gateway Setup", "Hardware In-Field Test Bench"],
    techPills: ["Embedded C/C++", "ESP32", "STM32", "LoRaWAN", "MQTT", "PCB Design"],
  },

  // ================= DIVISION 2: AGRITECH & SUBSTRATES =================
  {
    id: "agri-telemetry",
    category: "agritech",
    icon: Radio,
    badge: "AgriTech Telemetry",
    title: "NATLE FieldOS™ Commercial Telemetry Network",
    description: "Multi-depth capacitive probes measuring root-zone moisture, electrical conductivity (EC), and temperature at 10cm, 30cm, and 60cm depths with autonomous closed-loop triggers.",
    specs: ["Multi-Depth Soil Sensing", "Automated Irrigation Valve Sync", "Vapor Pressure Deficit (VPD) Curves", "Instant Frost/Drought Mobile Alerts"],
    deliverables: ["LoRaWAN Gateway Installation", "Multi-Depth Capacitance Soil Probes", "Weather Micro-Station", "Real-Time Cloud Dashboard"],
    techPills: ["FieldOS™ v4.2", "LoRaWAN", "TimescaleDB", "Mobile PWA", "Solar Nodes"],
  },
  {
    id: "agri-substrates",
    category: "agritech",
    icon: Leaf,
    badge: "Hosma Ceylon Export",
    title: "Hosma Ceylon 100% Organic Cocopeat Substrates",
    description: "Export-grade 100% organic coconut coir growbags, buffered slabs, and open-top blocks washed to ultra-low EC (<0.5 mS/cm) Dutch greenhouse standards.",
    specs: ["Triple Washed EC < 0.5 mS/cm", "800-900% Water Retention Capacity", "Optimum 5.8 - 6.5 pH Level", "Custom 70/30 or 50/50 Ratios"],
    deliverables: ["Custom Growbag Sizing (100x15x10cm)", "OMRI / GlobalG.A.P Certification", "Direct 40ft Container Freight", "Dedicated Agronomist Support"],
    techPills: ["OMRI Listed", "ISO 9001:2015", "GlobalG.A.P", "40ft Container Direct", "100% Organic"],
  },
  {
    id: "agri-automation",
    category: "agritech",
    icon: Droplets,
    badge: "Irrigation Automation",
    title: "Autonomous Fertigation & Drip Valve Control",
    description: "Cloud-triggered solenoid valves that pulse irrigation only when VPD and soil suction thresholds demand it, reducing nutrient runoff to near zero.",
    specs: ["35% Average Water Conservation", "22% Fertilizer Runoff Cut", "<50ms Solenoid Response", "Fail-Safe Cloud Override"],
    deliverables: ["Solenoid Valve Controllers", "Solar-Powered Pressure Nodes", "Automated Dosing Rules Engine", "Fail-Safe Manual Override"],
    techPills: ["Smart Valves", "Closed-Loop Dosing", "Energy Efficient", "Zero Waste"],
  },
  {
    id: "agri-drones",
    category: "agritech",
    icon: Plane,
    badge: "Aerial Vision",
    title: "Drone Multispectral & Satellite NDVI Canopy Mapping",
    description: "High-resolution multispectral imagery converted into calibrated NDVI maps to detect crop stress, nitrogen deficiency, and pest hot spots 14 days before visible symptoms.",
    specs: ["2.1cm/px Spatial Resolution", "<6 hrs Analysis Turnaround", "500 Acres/Day Aerial Coverage", "GIS Boundary Integration"],
    deliverables: ["Weekly Canopy Health Reports", "Variable Rate Fertilizer Maps", "Zonal Biomass Forecasting", "GIS Boundary Integration"],
    techPills: ["Sentinel-2", "Multispectral Drone", "NDVI / NDRE", "Computer Vision"],
  },
];

export default function ServicesPage() {
  const [filter, setFilter] = useState<"all" | "software" | "agritech">("all");

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
              <span>Full-Spectrum Technology &bull; Software &bull; AI &bull; AgriTech</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08]"
            >
              Engineering Excellence Across{" "}
              <span className="gradient-text">
                Code &amp; Agriculture.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-lg md:text-xl text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed max-w-3xl mx-auto"
            >
              NATLE operates two high-performance divisions: Silicon Valley grade <strong>Software, AI &amp; IoT Engineering</strong>, and world-class <strong>Precision AgriTech &amp; Hosma Ceylon Organic Substrates</strong>.
            </motion.p>

            {/* Filter Switcher Tabs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === "all"
                    ? "bg-[#059669] text-white shadow-md scale-105"
                    : "glass-card text-slate-700 dark:text-emerald-200/70 hover:border-emerald-500/40"
                }`}
              >
                All Capabilities ({servicesList.length})
              </button>

              <button
                onClick={() => setFilter("software")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  filter === "software"
                    ? "bg-slate-900 text-white dark:bg-[#00D2FF] dark:text-slate-950 shadow-md scale-105"
                    : "glass-card text-slate-700 dark:text-emerald-200/70 hover:border-emerald-500/40"
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>Software &amp; AI Lab (4)</span>
              </button>

              <button
                onClick={() => setFilter("agritech")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  filter === "agritech"
                    ? "bg-[#059669] text-white shadow-md scale-105"
                    : "glass-card text-slate-700 dark:text-emerald-200/70 hover:border-emerald-500/40"
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-[#10E599]" />
                <span>AgriTech &amp; Substrates (4)</span>
              </button>
            </div>

          </div>
        </section>

        {/* Services List Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {filteredServices.map((srv, index) => {
              const Icon = srv.icon;
              const isSoftware = srv.category === "software";

              return (
                <motion.div 
                  key={srv.id} 
                  id={srv.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
                  className="glass-card rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl hover:border-emerald-500/50 transition-all cursor-pointer"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Info */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                          isSoftware 
                            ? "bg-gradient-to-tr from-[#0052FF] to-[#00D2FF] text-white" 
                            : "bg-gradient-to-tr from-[#059669] to-[#10E599] text-slate-950"
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${
                          isSoftware
                            ? "bg-blue-500/10 text-[#0052FF] dark:text-[#00D2FF] border-blue-500/20"
                            : "bg-emerald-500/10 text-[#059669] dark:text-[#10E599] border-emerald-500/20"
                        }`}>
                          {srv.badge}
                        </span>
                      </div>

                      <h2 className="text-3xl font-black text-slate-900 dark:text-white">{srv.title}</h2>
                      <p className="mt-4 text-base text-slate-600 dark:text-emerald-100/70 leading-relaxed font-normal">
                        {srv.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 my-6">
                        {srv.techPills.map((pill, pi) => (
                          <span key={pi} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-black/40 text-[11px] font-mono text-slate-700 dark:text-emerald-200/80 border border-slate-200/80 dark:border-emerald-900/30">
                            {pill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-emerald-300/60 mb-3">
                          Key Technical Capabilities
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {srv.specs.map((sp, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-emerald-50 bg-slate-50 dark:bg-emerald-950/40 px-3 py-2 rounded-xl border border-slate-100 dark:border-emerald-900/30">
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
                        <span className="text-xs text-slate-400 dark:text-emerald-300/50">
                          {isSoftware ? "Available for Custom Hire" : "Ready for Global Deployment"}
                        </span>
                        <Link
                          href="/contact"
                          className="gradient-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 hover:scale-105 transition-transform"
                        >
                          <span>{isSoftware ? "Inquire Project" : "Request Spec Sheet"}</span>
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
