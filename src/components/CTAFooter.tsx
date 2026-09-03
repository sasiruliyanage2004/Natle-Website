"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowUp, 
  ArrowRight, 
  MapPin, 
  Mail, 
  Phone,
  ShieldCheck, 
  Send,
  Leaf,
  Cpu,
  Sparkles,
  Radio,
  CheckCircle2,
  Globe2
} from "lucide-react";
import NatleLogo from "@/components/common/NatleLogo";
import SocialShareButton from "@/components/common/SocialShareButton";
import ViewOnMap from "@/components/common/ViewOnMap";
import { CardPattern } from "@/components/ui/CardPattern";

const footerNavigation = {
  solutions: [
    { name: "FieldOS™ Cloud Platform", href: "/solutions#field-os" },
    { name: "YieldAI™ Harvest Engine", href: "/solutions#yield-ai" },
    { name: "LoRaWAN Soil Sensor Probes", href: "/services#iot" },
    { name: "TraceLink™ Blockchain Compliance", href: "/solutions#tracelink" },
    { name: "NDVI Satellite Crop Heatmaps", href: "/services#satellite" },
    { name: "Autonomous Drip Solenoid Valves", href: "/services#valves" },
  ],
  substrates: [
    { name: "Hosma Ultra-Washed Cocopeat", href: "https://hosmaceylon.com", external: true },
    { name: "Low-EC High-Porosity Growbags", href: "https://hosmaceylon.com", external: true },
    { name: "5kg Compacted Hydroponic Blocks", href: "https://hosmaceylon.com", external: true },
    { name: "Coco Coir Disks & Seedling Pellets", href: "https://hosmaceylon.com", external: true },
    { name: "40ft Bulk Container Shipping", href: "https://hosmaceylon.com", external: true },
    { name: "OMRI Listed 100% Organic", href: "https://hosmaceylon.com", external: true },
  ],
  company: [
    { name: "About NATLE", href: "/about" },
    { name: "Hosma Ceylon Heritage", href: "/about#heritage" },
    { name: "Agronomy Research Lab", href: "/blog" },
    { name: "Client Field Whitepapers", href: "/blog" },
    { name: "Careers & Internships", href: "/careers", badge: "We're Hiring" },
    { name: "Global Sustainability Passports", href: "/about#sustainability" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Security Architecture", href: "/security" },
    { name: "API Documentation", href: "/docs" },
    { name: "GlobalG.A.P Audit Portal", href: "/compliance" },
  ],
};

export default function CTAFooter() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmailInput("");
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#071326] dark:bg-[#050505] text-slate-300 font-sans antialiased select-none border-t border-slate-800/80 dark:border-emerald-900/30">
      
      {/* Background Ambient Multi-Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#0052FF]/15 to-transparent blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-[#059669]/15 to-transparent blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* ================= 1. TOP INTERACTIVE CTA BENTO BANNER ================= */}
        <div className="relative rounded-[2.5rem] border border-white/10 dark:border-emerald-900/40 bg-gradient-to-b from-white/[0.07] to-white/[0.02] dark:from-[#0a140a]/90 dark:to-[#050505]/95 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl overflow-hidden mb-16 group">
          
          {/* Advanced Geometric Telemetry Lattice */}
          <CardPattern variant="bio-hex" position="top-right" theme="colored" className="w-80 h-80 sm:w-96 sm:h-96" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Headline & Telemetry Status */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold text-[#10E599]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10E599] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
                </span>
                <span>Hosma Ceylon &times; NATLE Cloud &bull; All Systems Live</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Empower your acreage with <br />
                <span className="font-serif italic font-normal gradient-text">
                  Autonomous Intelligence.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 dark:text-emerald-100/70 max-w-xl font-normal leading-relaxed">
                Connect your commercial plantation to wireless LoRaWAN root sensors and organic Ceylon coconut substrates. Get a customized farm yield assessment.
              </p>
            </div>

            {/* Interactive Farm Assessment Form */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-white/15 dark:border-emerald-900/50 bg-black/40 dark:bg-[#080d08]/90 p-6 shadow-xl backdrop-blur-xl overflow-hidden group/form">
                <CardPattern variant="circuit" position="top-right" theme="emerald" className="w-44 h-44 opacity-40" />
                <span className="relative z-10 text-xs font-mono font-bold text-[#10E599] uppercase tracking-wider block mb-2">
                  Get Free Farm Assessment
                </span>

                {subscribed ? (
                  <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[#10E599] shrink-0" />
                    <span>Inquiry received! An agronomy engineer will reach out within 2 hours.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your enterprise email..."
                        className="w-full rounded-2xl border border-white/15 dark:border-emerald-900/60 bg-white/5 dark:bg-black/50 py-3.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-[#10E599] focus:outline-none focus:ring-1 focus:ring-[#10E599] transition-all font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full gradient-btn group inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 px-6 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                    >
                      <span>Request Farm Calibration</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                )}

                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Direct: contact@natle.tech</span>
                  <span>Sub-50ms Response</span>
                </div>
              </div>
            </div>

          </div>

        </div>


        {/* ================= 2. RICH 4-COLUMN CATEGORIZED DIRECTORY ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pb-14 border-b border-white/[0.08] dark:border-emerald-900/30">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <NatleLogo showTagline={true} className="text-white" />
            
            <p className="text-xs sm:text-sm text-slate-400 dark:text-emerald-200/60 max-w-sm leading-relaxed">
              Pioneering the synthesis of precision software engineering, IoT sensor telemetry, and 100% organic Ceylon coconut coir substrates with Hosma Ceylon.
            </p>

            {/* Direct Contact Pills */}
            <div className="space-y-2.5 text-xs font-mono">
              <a 
                href="mailto:contact@natle.tech" 
                className="inline-flex items-center gap-2 text-white hover:text-[#10E599] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#10E599]" />
                <span>contact@natle.tech</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>World Trade Center, Level 28, Colombo 01</span>
              </div>
            </div>

            {/* Interactive Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ViewOnMap 
                locationName="NATLE & Hosma Headquarters"
                address="World Trade Center, Level 28, Colombo 01, Sri Lanka"
              />
              <SocialShareButton />
            </div>
          </div>

          {/* Col 2: Solutions & Platform */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white dark:text-emerald-400">
              Platform &amp; IoT
            </h3>
            <ul className="space-y-2.5 text-xs">
              {footerNavigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-slate-400 hover:text-white dark:hover:text-[#10E599] transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hosma Substrates */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white dark:text-emerald-400">
              Hosma Substrates
            </h3>
            <ul className="space-y-2.5 text-xs">
              {footerNavigation.substrates.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white dark:hover:text-[#10E599] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] opacity-60 group-hover:translate-x-0.5 transition-transform">&nearr;</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company & Knowledge */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white dark:text-emerald-400">
              Company &amp; Lab
            </h3>
            <ul className="space-y-2.5 text-xs">
              {footerNavigation.company.map((item) => (
                <li key={item.name} className="flex items-center gap-2">
                  <Link 
                    href={item.href}
                    className="text-slate-400 hover:text-white dark:hover:text-[#10E599] transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#10E599] text-[9px] font-mono font-bold">
                      {item.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>


        {/* ================= 3. BOTTOM TRADEMARKS & CERTIFICATION STRIP ================= */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Trust Certifications */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 text-[#10E599]">
              <ShieldCheck className="h-4 w-4" />
              <span>GlobalG.A.P Audit Ready</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#00D2FF]">
              <Leaf className="h-4 w-4" />
              <span>OMRI Listed Organic</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#F59E0B]">
              <Sparkles className="h-4 w-4" />
              <span>ISO 9001:2015</span>
            </div>
          </div>

          {/* Copyright & Scroll To Top */}
          <div className="flex items-center gap-6">
            <p className="text-xs font-mono text-slate-500">
              &copy; {new Date().getFullYear()} NATLE Tech &bull; Hosma Ceylon (Pvt) Ltd.
            </p>

            <button
              onClick={handleScrollToTop}
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 dark:border-emerald-900/50 bg-white/5 dark:bg-[#0a140a] px-3.5 py-1.5 text-xs font-mono font-bold text-slate-300 hover:text-white dark:hover:text-[#10E599] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 text-[#10E599]" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
