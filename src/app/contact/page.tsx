"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  Globe2, 
  ShieldCheck,
  Building2,
  Sparkles
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    cropType: "Coconut / Cocopeat Substrates",
    acreage: "100 - 500 Acres",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        cropType: "Coconut / Cocopeat Substrates",
        acreage: "100 - 500 Acres",
        message: "",
      });
    }, 5000);
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300">
      <SmoothCursor />
      <BeamsBackground intensity="subtle" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300 dark:border-emerald-800/40 bg-blue-50 dark:bg-blue-950/50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-blue-800 dark:text-[#10e599] shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-[#0066FF] dark:text-[#10e599]" />
              <span>Let&apos;s Accelerate Your Harvest</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] dark:text-white tracking-tight leading-[1.05]">
              Request a Demo or{" "}
              <span className="bg-gradient-to-r from-[#0066FF] via-[#00C0F0] to-[#10B981] bg-clip-text text-transparent">
                Farm Assessment.
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 dark:text-emerald-200/70 font-normal leading-relaxed max-w-3xl mx-auto">
              Whether you are a commercial plantation owner, greenhouse operator, or global substrate importer, our engineering &amp; agronomy team is ready to assist.
            </p>
          </div>
        </section>

        {/* Contact Grid: Left Form + Right Info Cards */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Interactive Form */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#0a140a]/90 p-8 md:p-12 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Book a Platform Walkthrough
              </h2>
              <p className="text-xs text-slate-500 dark:text-emerald-300/60 mt-1 mb-8">
                Fill in your estate details for a tailored hardware &amp; software yield estimation.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-emerald-900 dark:text-emerald-50">Inquiry Received Successfully</h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-200/70 max-w-md mx-auto">
                    Thank you! An agronomist &amp; IoT solutions architect will contact you within 24 business hours with your custom assessment plan.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dhananjaya Senanayake"
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-emerald-200/40 focus:bg-white dark:focus:bg-black/80 focus:border-[#0066FF] dark:focus:border-[#10e599] focus:outline-none transition-all"
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
                        placeholder="dhananjaya@estate.com"
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-emerald-200/40 focus:bg-white dark:focus:bg-black/80 focus:border-[#0066FF] dark:focus:border-[#10e599] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                        Company / Estate Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Lanka Commercial Plantations"
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-emerald-200/40 focus:bg-white dark:focus:bg-black/80 focus:border-[#0066FF] dark:focus:border-[#10e599] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                        Cultivated Acreage / Scope
                      </label>
                      <select
                        value={formData.acreage}
                        onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-black/80 focus:border-[#0066FF] dark:focus:border-[#10e599] focus:outline-none transition-all"
                      >
                        <option>Under 50 Acres</option>
                        <option>50 - 200 Acres</option>
                        <option>200 - 1,000 Acres</option>
                        <option>1,000+ Commercial Plantation</option>
                        <option>Greenhouse / Hydroponic Importer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                      Primary Focus Area
                    </label>
                    <select
                      value={formData.cropType}
                      onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-black/80 focus:border-[#0066FF] dark:focus:border-[#10e599] focus:outline-none transition-all"
                    >
                      <option>Coconut Plantation &amp; Cocopeat Substrates</option>
                      <option>Commercial Greenhouse Hydroponics</option>
                      <option>Tea / Spices / High-Value Cash Crops</option>
                      <option>Bulk Cocopeat 40ft Container Export Order</option>
                      <option>Custom IoT Telemetry &amp; FieldOS™ License</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-emerald-100/60 uppercase tracking-wider mb-2">
                      Additional Message or Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your current irrigation setup, substrate needs, or telemetry goals..."
                      className="w-full p-4 rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-black/50 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-emerald-200/40 focus:bg-white dark:focus:bg-black/80 focus:border-[#0066FF] dark:focus:border-[#10e599] focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full gradient-btn flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-black uppercase tracking-wider text-white shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all"
                  >
                    <span>Submit Demo &amp; Assessment Request</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Office & Direct Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Colombo Headquarters Card */}
              <div className="rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#0a140a]/90 p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#0066FF] dark:text-[#10e599] flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#0066FF] dark:text-[#10e599] uppercase">Global Headquarters</span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-emerald-50">NATLE &bull; Colombo</h3>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-slate-600 dark:text-emerald-200/70 font-medium">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#0066FF] dark:text-[#10e599] shrink-0 mt-0.5" />
                    <span>Level 28, West Tower, World Trade Center, Colombo 01, Sri Lanka</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-emerald-600 dark:text-[#10e599] shrink-0" />
                    <span>contact@natle.tech / exports@hosmaceylon.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#0066FF] dark:text-[#10e599] shrink-0" />
                    <span>+94 (11) 234-5678 / +94 (77) 890-1234</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-400 dark:text-emerald-400/60 shrink-0" />
                    <span>Mon &ndash; Fri: 8:30 AM &ndash; 6:00 PM (IST)</span>
                  </div>
                </div>
              </div>

              {/* Hosma Substrate Export Processing Facility */}
              <div className="rounded-3xl bg-slate-950 dark:bg-[#0a140a]/90 p-8 text-white shadow-2xl border border-slate-800 dark:border-emerald-900/40">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 dark:text-[#10e599]">
                  Parent Agri Export Facility
                </span>
                <h3 className="text-xl font-black text-white mt-1 mb-4">
                  Hosma Ceylon (Pvt) Ltd
                </h3>
                <p className="text-xs text-slate-400 dark:text-emerald-200/70 leading-relaxed">
                  Export processing plant located in the North-Western Coconut Triangle with certified container direct-stuffing lines for Colombo Port.
                </p>

                <div className="mt-6 pt-4 border-t border-slate-800 dark:border-emerald-900/30 flex items-center justify-between text-xs text-slate-400 dark:text-emerald-200/70">
                  <span>Visit Hosma Ceylon</span>
                  <a
                    href="https://hosmaceylon.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 dark:text-[#10e599] font-bold hover:underline"
                  >
                    hosmaceylon.com &rarr;
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        <CTAFooter />
      </div>
    </main>
  );
}
