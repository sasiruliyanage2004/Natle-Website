"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { motion } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  Cpu, 
  Code2, 
  Leaf, 
  Laptop, 
  Smartphone, 
  Database, 
  Bot, 
  Radio, 
  Sparkles, 
  ArrowRight 
} from "lucide-react";

type InquiryType = "software" | "agritech";

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("software");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    // Software Fields
    softwareService: "Full-Stack Web Application (Next.js / Node / Go)",
    budgetRange: "$5,000 - $20,000",
    projectScope: "MVP Development (1 - 3 Months)",
    // AgriTech Fields
    acreage: "50 - 200 Acres",
    cropType: "Coconut Plantation & Cocopeat Substrates",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300 select-none">
      <BeamsBackground intensity="subtle" className="absolute inset-0 z-0 pointer-events-none" />
      <SmoothCursor />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-16 md:pt-48 md:pb-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
              <span>Software Engineering &bull; AI Labs &bull; Sustainable AgriTech</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]"
            >
              Let&apos;s Build Your Next{" "}
              <span className="gradient-text">
                Breakthrough Solution.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-xl text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed max-w-3xl mx-auto"
            >
              Whether you need enterprise software engineering (Web, Mobile, AI, Cloud, Custom IoT) or commercial plantation telemetry &amp; Hosma Ceylon organic substrate exports, our architects are ready.
            </motion.p>
          </div>
        </section>

        {/* Dual-Track Selector & Contact Form Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Track Switcher Tabs */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="p-1.5 rounded-2xl bg-white/60 dark:bg-black/40 border border-slate-200/80 dark:border-emerald-900/40 backdrop-blur-xl grid grid-cols-2 gap-2 shadow-lg">
              <button
                type="button"
                onClick={() => setInquiryType("software")}
                className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  inquiryType === "software"
                    ? "bg-slate-900 text-white dark:bg-[#059669] dark:text-white shadow-md scale-[1.02]"
                    : "text-slate-600 dark:text-emerald-100/70 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Code2 className="w-4 h-4 text-[#10E599]" />
                <span>Software &amp; AI Engineering</span>
              </button>

              <button
                type="button"
                onClick={() => setInquiryType("agritech")}
                className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  inquiryType === "agritech"
                    ? "bg-[#059669] text-white shadow-md scale-[1.02]"
                    : "text-slate-600 dark:text-emerald-100/70 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Leaf className="w-4 h-4 text-[#10E599]" />
                <span>AgriTech &amp; Substrate Export</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Consultation Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 glass-card rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl hover:border-emerald-500/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#059669] dark:text-[#10E599] flex items-center justify-center border border-emerald-500/20">
                  {inquiryType === "software" ? <Code2 className="w-5 h-5" /> : <Leaf className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {inquiryType === "software" ? "Software & AI Project Inquiry" : "Plantation & Substrate Inquiry"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-emerald-300/60">
                    {inquiryType === "software"
                      ? "Discuss custom web/mobile apps, AI models, cloud architecture, or IoT hardware."
                      : "Order 40ft cocopeat containers or deploy commercial FieldOS™ LoRaWAN telemetry."}
                  </p>
                </div>
              </div>

              <div className="my-6 border-t border-slate-100 dark:border-emerald-900/30" />

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Consultation Request Received!</h3>
                  <p className="text-xs text-slate-600 dark:text-emerald-100/70 max-w-md mx-auto">
                    Thank you, {formData.name || "Client"}! Our {inquiryType === "software" ? "lead software architect" : "senior agronomist"} will review your specifications and contact you at {formData.email || "your email"} within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Client Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Johnathan Davis"
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-emerald-200/40 focus:bg-white dark:focus:bg-black/80 focus:border-[#059669] dark:focus:border-[#10E599] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@enterprise.com"
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-emerald-200/40 focus:bg-white dark:focus:bg-black/80 focus:border-[#059669] dark:focus:border-[#10E599] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Apex Innovations Inc."
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-emerald-200/40 focus:bg-white dark:focus:bg-black/80 focus:border-[#059669] dark:focus:border-[#10E599] focus:outline-none transition-all"
                      />
                    </div>

                    {/* Dynamic Field 1 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                        {inquiryType === "software" ? "Target Timeline / Phase" : "Cultivated Acreage / Scope"}
                      </label>
                      {inquiryType === "software" ? (
                        <select
                          value={formData.projectScope}
                          onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-black/80 focus:border-[#059669] dark:focus:border-[#10E599] focus:outline-none transition-all"
                        >
                          <option>MVP Development (1 - 2 Months)</option>
                          <option>Full Enterprise Architecture (3 - 6 Months)</option>
                          <option>Dedicated Developer Team Staffing</option>
                          <option>Existing Codebase Refactor &amp; Modernization</option>
                          <option>AI / Machine Learning Model R&amp;D</option>
                        </select>
                      ) : (
                        <select
                          value={formData.acreage}
                          onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-black/80 focus:border-[#059669] dark:focus:border-[#10E599] focus:outline-none transition-all"
                        >
                          <option>Under 50 Acres</option>
                          <option>50 - 200 Acres</option>
                          <option>200 - 1,000 Acres</option>
                          <option>1,000+ Commercial Plantation</option>
                          <option>Greenhouse / Hydroponic Importer</option>
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Field 2: Service/Focus Area Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                      {inquiryType === "software" ? "Primary Software Engineering Service" : "Primary AgriTech / Substrate Focus"}
                    </label>
                    {inquiryType === "software" ? (
                      <select
                        value={formData.softwareService}
                        onChange={(e) => setFormData({ ...formData, softwareService: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-black/80 focus:border-[#059669] dark:focus:border-[#10E599] focus:outline-none transition-all"
                      >
                        <option>Full-Stack Web Application (Next.js / React / Node / Go)</option>
                        <option>Mobile App Development (Flutter / iOS / Android)</option>
                        <option>Artificial Intelligence &amp; Computer Vision (PyTorch / OpenCV)</option>
                        <option>Custom IoT Firmware &amp; Hardware Prototyping (ESP32 / LoRaWAN)</option>
                        <option>Cloud DevOps &amp; Microservices (AWS / GCP / Kubernetes)</option>
                        <option>Enterprise SaaS / ERP &amp; Telemetry Dashboards</option>
                      </select>
                    ) : (
                      <select
                        value={formData.cropType}
                        onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-black/80 focus:border-[#059669] dark:focus:border-[#10E599] focus:outline-none transition-all"
                      >
                        <option>Hosma Ceylon 100% Organic Cocopeat Substrates (40ft Containers)</option>
                        <option>Commercial Greenhouse Hydroponics (Growbags / 5kg Blocks)</option>
                        <option>NATLE FieldOS™ Wireless LoRaWAN Telemetry Deployment</option>
                        <option>YieldAI™ Multispectral Drone NDVI Crop Health Mapping</option>
                        <option>TraceLink™ Blockchain Export Purity Verification</option>
                      </select>
                    )}
                  </div>

                  {/* Software Budget Selector */}
                  {inquiryType === "software" && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                        Estimated Budget Bracket
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {["<$5k (Starter)", "$5k - $20k", "$20k - $50k", "$50k+ (Enterprise)"].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormData({ ...formData, budgetRange: b })}
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              formData.budgetRange === b
                                ? "bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white shadow-xs"
                                : "bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-emerald-900/30 text-slate-600 dark:text-emerald-200/60"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                      Project Description &amp; Technical Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        inquiryType === "software"
                          ? "Tell us about your application features, tech stack preferences, APIs, or hardware specs..."
                          : "Tell us about your estate acreage, substrate specs, or current telemetry setup..."
                      }
                      className="w-full p-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-emerald-200/40 focus:bg-white dark:focus:bg-black/80 focus:border-[#059669] dark:focus:border-[#10E599] focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full gradient-btn flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-xl hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    <span>
                      {inquiryType === "software"
                        ? "Submit Software Consultation Request"
                        : "Submit Plantation Calibration Request"}
                    </span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right Column: 2 Dedicated Divisions Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: NATLE Software & AI Lab */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55 }}
                className="glass-card rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-emerald-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0052FF] to-[#00D2FF] text-white flex items-center justify-center shadow-md">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#00D2FF] uppercase">Engineering Division</span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">NATLE Software &amp; AI Lab</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-emerald-100/70 mb-4 leading-relaxed">
                  Building enterprise web platforms, scalable iOS/Android mobile apps, distributed cloud systems, and custom IoT firmware for global clients.
                </p>

                <div className="space-y-2.5 text-xs text-slate-600 dark:text-emerald-200/70 font-mono">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>Full-Stack SaaS &bull; Next.js &bull; Go &bull; Python</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5 text-[#10E599]" />
                    <span>AI &bull; Computer Vision &bull; Neural Forecasting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-amber-400" />
                    <span>Embedded Hardware &bull; LoRaWAN &bull; ESP32 Probes</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Direct Software Desk:</span>
                  <a href="mailto:dev@natle.tech" className="text-[#00D2FF] font-mono font-bold hover:underline">
                    dev@natle.tech
                  </a>
                </div>
              </motion.div>

              {/* Card 2: Hosma Ceylon & AgriTech Division */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="rounded-3xl bg-slate-950 dark:bg-[#0a140a]/90 p-8 text-white shadow-2xl border border-slate-800 dark:border-emerald-900/40 hover:border-emerald-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#059669] to-[#10E599] text-slate-950 flex items-center justify-center shadow-md font-bold">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#10E599]">
                      AgriTech &amp; Substrate Division
                    </span>
                    <h3 className="text-xl font-black text-white">
                      Hosma Ceylon (Pvt) Ltd
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 dark:text-emerald-200/70 leading-relaxed mb-4">
                  Global exporters of 100% organic, low-EC cocopeat growbags and manufacturer of FieldOS™ telemetry hardware in Sri Lanka.
                </p>

                <div className="space-y-2 text-xs text-slate-400 font-mono">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#10E599] shrink-0 mt-0.5" />
                    <span>Level 28, World Trade Center, Colombo 01</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#10E599]" />
                    <span>exports@hosmaceylon.com</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 dark:border-emerald-900/30 flex items-center justify-between text-xs text-slate-400">
                  <span>Substrate Exporter Portal:</span>
                  <a
                    href="https://hosmaceylon.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#10E599] font-bold hover:underline"
                  >
                    hosmaceylon.com &rarr;
                  </a>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        <CTAFooter />
      </div>
    </main>
  );
}
