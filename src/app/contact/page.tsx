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
  Laptop, 
  Smartphone, 
  Bot, 
  Radio, 
  Sparkles, 
  ShieldCheck,
  Globe2,
  Activity,
  ShoppingBag,
  GraduationCap,
  Users
} from "lucide-react";
import { sanitizeInput, validateEmail, sanitizeMessage } from "@/lib/security";

type InquiryDomain = "all" | "healthcare" | "agriculture" | "pos" | "edtech" | "hr" | "custom";

export default function ContactPage() {
  const [selectedDomain, setSelectedDomain] = useState<InquiryDomain>("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    platformDomain: "Healthcare AI & Clinical Diagnostics (PACS/EHR)",
    budgetRange: "$10k - $30k",
    timeline: "1 - 3 Months",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Please provide a valid enterprise email address.");
      return;
    }
    // Clean and sanitize all fields
    setFormData((prev) => ({
      ...prev,
      name: sanitizeInput(prev.name),
      email: sanitizeInput(prev.email),
      company: sanitizeInput(prev.company),
      message: sanitizeMessage(prev.message),
    }));
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300 select-none">
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
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
              <span>Enterprise AI Consultation &bull; Global Engineering</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]"
            >
              Let&apos;s Build Your Next{" "}
              <span className="gradient-text">
                Breakthrough AI Solution.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-xl text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed max-w-3xl mx-auto"
            >
              Consult directly with our solution architects and engineering leads to scope your enterprise AI platform, edge telemetry mesh, or custom neural architecture.
            </motion.p>
          </div>
        </section>

        {/* Contact Form & Office Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Interactive Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 glass-card rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/10"
            >
              <div className="mb-8">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599]">
                  Architect Consultation
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Scope Your Implementation
                </h2>
                <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2">
                  Guaranteed response from a senior Solution Architect within 4 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-[#059669] dark:text-[#10E599] flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Consultation Request Received</h3>
                  <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. A NATLE Enterprise Architect has been assigned to your inquiry for <em>{formData.platformDomain}</em> and will reach out via <strong>{formData.email}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:scale-105 transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Eleanor Vance"
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#059669] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                        Enterprise Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eleanor@healthfirst.org"
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#059669] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="HealthFirst Hospital Group / RetailMax Corp"
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#059669] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Target AI Platform / Vertical
                    </label>
                    <select
                      value={formData.platformDomain}
                      onChange={(e) => setFormData({ ...formData, platformDomain: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#059669] transition-all"
                    >
                      <option>Healthcare AI &amp; Clinical Diagnostics (PACS / EHR Integration)</option>
                      <option>Agriculture AI &amp; FieldOS™ Edge Telemetry (50k+ Hectares)</option>
                      <option>Point of Sales (POS) &amp; Multi-Branch Retail Intelligence</option>
                      <option>Education Technology &amp; Adaptive Learning LMS (200k+ Students)</option>
                      <option>Human Resources &amp; Automated Payroll AI</option>
                      <option>Custom Enterprise Deep Learning Models (PyTorch / ONNX / LLM)</option>
                    </select>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Estimated Project Budget Bracket
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {["<$10k (Pilot)", "$10k - $30k", "$30k - $80k", "$80k+ (Enterprise)"].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: b })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            formData.budgetRange === b
                              ? "bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white shadow-xs"
                              : "bg-slate-50 dark:bg-zinc-900/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Project Goals &amp; Architecture Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your operational bottleneck, data pipelines, PACS/ERP integrations, or latency requirements..."
                      className="w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#059669] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full gradient-btn flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-xl hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    <span>Submit Enterprise Consultation Request</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right Column: Global HQ & Regional Delivery Hubs */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Colombo Global Headquarters */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55 }}
                className="glass-card rounded-3xl p-8 shadow-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#059669] to-[#10E599] text-slate-950 flex items-center justify-center shadow-md font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase">
                      Global Headquarters
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      NATLE Technologies
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-300 mb-5 leading-relaxed">
                  Central engineering center, neural model laboratory, and primary international client delivery command.
                </p>

                <div className="space-y-3.5 text-xs text-slate-700 dark:text-zinc-300 font-mono">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#059669] dark:text-[#10E599] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      No. 283 1/1, Ruwan Mawatha, Thimbirigasyaya Road, Colombo 05, Sri Lanka, 00500
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#059669] dark:text-[#10E599] shrink-0" />
                    <span>+94 70 465 9847 / +94 11 250 7601</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#059669] dark:text-[#10E599] shrink-0" />
                    <span>info@natle.tech / contact@natle.tech</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#059669] dark:text-[#10E599] shrink-0" />
                    <span>Mon - Fri: 08:30 - 18:00 IST (24/7 Priority SLA)</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: International Presence & Compliance */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="rounded-3xl bg-slate-950 dark:bg-zinc-950 p-8 text-white shadow-2xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">
                      Global Expansion
                    </span>
                    <h3 className="text-xl font-black text-white">
                      Regional Operations
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  Supporting multinational clients with regional delivery desks in Singapore and Malaysia, scaling towards our $100M global acceleration roadmap.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="font-bold text-indigo-300">Singapore</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">APAC Business Hub</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="font-bold text-indigo-300">Malaysia</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Regional Delivery</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-green-400">
                    <ShieldCheck className="w-4 h-4" />
                    SOC 2 &bull; HIPAA &bull; GDPR
                  </span>
                  <span>Enterprise Security</span>
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
