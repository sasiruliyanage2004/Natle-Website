"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ArrowRight, MapPin, Mail, ShieldCheck } from "lucide-react";
import NatleLogo from "@/components/common/NatleLogo";
import SocialShareButton from "@/components/common/SocialShareButton";
import ViewOnMap from "@/components/common/ViewOnMap";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function CTAFooter() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full overflow-hidden font-sans antialiased bg-[#071326] dark:bg-[#050505] text-white select-none">
      
      {/* ================= UPPER MINIMALIST SECTION (Footer-11 Style) ================= */}
      <div className="relative px-6 pt-12 pb-14 sm:px-10 md:px-16 lg:px-20 max-w-7xl mx-auto">
        
        {/* Top Status & Scroll to Top */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#10E599]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10E599] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
            </span>
            <span>Hosma Ceylon &times; NATLE Platform &bull; All Systems Live</span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="group inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-slate-400 hover:text-white transition-colors"
          >
            <span>Scroll to Top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1 text-[#10E599]" />
          </button>
        </div>

        {/* Large Conversational Headline */}
        <div className="mt-10 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
            Ready to empower your agricultural enterprise with next-generation telemetry &amp; organic Ceylon substrates?
          </h2>
        </div>

        {/* Action Controls & Clean Nav Links */}
        <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between pt-8 border-t border-white/[0.08]">
          
          {/* Direct Email Contact & Interactive Map Pill */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Direct Agronomy Inquiries:
            </span>
            <a
              href="mailto:contact@natle.tech"
              className="group inline-flex items-center gap-2 text-xl sm:text-2xl font-bold text-white hover:text-[#10E599] transition-colors"
            >
              <span>contact@natle.tech</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5 text-[#10E599]" />
            </a>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <ViewOnMap 
                locationName="NATLE & Hosma Headquarters"
                address="World Trade Center, Level 28, Colombo 01, Sri Lanka"
              />
              <SocialShareButton />
            </div>
          </div>

          {/* Clean Horizontal Navigation */}
          <nav className="flex flex-wrap items-center gap-5 sm:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

        </div>
      </div>


      {/* ================= LOWER BRAND LOGO SECTION (Footer-11 Style) ================= */}
      <div className="relative bg-[#040D1E] dark:bg-[#080d08] px-6 pt-10 pb-12 sm:px-10 md:px-16 lg:px-20 border-t border-white/[0.06]">
        
        {/* Ambient Subtle Multi-Glow */}
        <div className="pointer-events-none absolute right-0 bottom-0 h-full w-2/3 blur-2xl opacity-40">
          <div className="absolute right-0 bottom-0 h-full w-full bg-gradient-to-tl from-[#0052FF]/30 via-[#059669]/20 to-transparent" />
          <div className="absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-[#10E599]/20 blur-3xl" />
        </div>

        {/* Big Editorial Watermark & Certifications */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
          
          <div className="flex items-center gap-4">
            <NatleLogo showTagline={false} />
            <span className="hidden sm:inline-block text-xs text-slate-500 font-mono">
              &bull; Colombo WTC &bull; 24+ Global Export Markets
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#10E599]" />
              <span>GlobalG.A.P &bull; OMRI &bull; ISO 9001</span>
            </div>
            <span>&copy; {new Date().getFullYear()} NATLE.</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
