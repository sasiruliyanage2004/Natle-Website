"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
} from "lucide-react";

// Clean inline SVGs for social platforms
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const PLATFORM_LINKS = [
  { label: "Diagnostic Vision AI", href: "/solutions#healthcare" },
  { label: "AgriTech Telemetry Mesh", href: "/solutions#agritech" },
  { label: "Retail Demand & Loss", href: "/solutions#retail" },
  { label: "HR Predictive Copilot", href: "/solutions#hr" },
  { label: "Edge Inference Runtime", href: "/services" },
  { label: "Custom Foundation Models", href: "/services" },
];

const COMPANY_LINKS = [
  { label: "About NATLE", href: "/about" },
  { label: "Our Engineering Culture", href: "/about#culture" },
  { label: "Careers", href: "/careers", badge: "Hiring" },
  { label: "Client Case Studies", href: "/projects" },
  { label: "Contact Specialists", href: "/contact" },
];

const RESOURCE_LINKS = [
  { label: "Research Whitepapers", href: "/blog" },
  { label: "Edge Architecture Blueprint", href: "/blog" },
  { label: "Model Evaluation Suite", href: "/about" },
  { label: "Security & SOC 2", href: "/contact" },
  { label: "HIPAA / GDPR Compliance", href: "/contact" },
];

export default function CTAFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="relative z-10 w-full overflow-hidden bg-[#f8faff] text-[#0a1628]">
      {/* Hairline subtle top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/30 to-transparent" />

      {/* Ambient background glow accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#0ea5e9]/10 via-[#5aec8f]/5 to-transparent blur-3xl opacity-70" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-8">
        
        {/* ══════════════════════════════════════════════════
            PRE-FOOTER FLOATING CLAYMORPHISM CTA HERO
           ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="clay-card relative mb-20 overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/95 p-8 md:p-14 lg:p-16 shadow-[0_25px_60px_-15px_rgba(14,165,233,0.12)]"
        >
          {/* Subtle inner corner glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-[#0ea5e9]/15 to-[#5aec8f]/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-[#1a3a8f]/10 to-[#0ea5e9]/10 blur-2xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-2xl">
              {/* Eyebrow status badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 shadow-xs mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Open for Enterprise Deployments &bull; Q3/Q4 2026</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0a1628] leading-[1.12]">
                Ready to Deploy AI That{" "}
                <span className="gradient-text">Actually Delivers ROI?</span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl">
                Consult with our systems architecture team. We audit your infrastructure and provide a production deployment blueprint within 48 hours.
              </p>

              {/* Compliance trust chips */}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#64748b]">
                <div className="flex items-center gap-1.5 rounded-full bg-slate-100/80 px-3 py-1 border border-slate-200/60">
                  <Shield className="h-3.5 w-3.5 text-[#0ea5e9]" />
                  <span>SOC 2 Type II</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-slate-100/80 px-3 py-1 border border-slate-200/60">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#059669]" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-slate-100/80 px-3 py-1 border border-slate-200/60">
                  <Sparkles className="h-3.5 w-3.5 text-[#0ea5e9]" />
                  <span>Air-Gapped Sovereign AI</span>
                </div>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              <Link
                href="/contact"
                className="gradient-btn inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 font-bold text-white text-sm shadow-md hover:shadow-xl transition-all duration-300"
              >
                <span>Schedule Architecture Review</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/projects"
                className="clay-btn inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white px-8 py-4 font-bold text-sm text-[#0a1628] hover:text-[#0ea5e9] transition-all duration-300"
              >
                <span>Explore Case Studies</span>
                <ArrowUpRight className="h-4 w-4 text-[#64748b]" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            MAIN FOOTER COLUMNS
           ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-200/80">
          
          {/* Col 1: Brand & Contact (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="inline-block font-display text-2xl font-black tracking-tight text-[#0a1628]">
                NATLE<span className="text-[#0ea5e9]">.</span>
              </Link>
              
              <p className="mt-4 text-sm text-[#475569] leading-relaxed max-w-sm">
                Architecting high-reliability, sovereign enterprise AI platforms across healthcare diagnostics, agricultural telemetry, and high-concurrency commercial operations.
              </p>
            </div>

            {/* Direct Contact Info */}
            <div className="space-y-2.5 text-xs text-[#475569]">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-[#0ea5e9] shrink-0" />
                <span>Level 4, Access Towers II, Colombo 02, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#0ea5e9] shrink-0" />
                <a href="tel:+94112345678" className="hover:text-[#0ea5e9] transition-colors">+94 11 234 5678</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#0ea5e9] shrink-0" />
                <a href="mailto:enterprise@natle.com" className="hover:text-[#0ea5e9] transition-colors font-mono">enterprise@natle.com</a>
              </div>
            </div>

            {/* Social / Developer Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://github.com"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-card flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#64748b] hover:text-[#0ea5e9] transition-all hover:scale-110"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-card flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#64748b] hover:text-[#0ea5e9] transition-all hover:scale-110"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-card flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#64748b] hover:text-[#0ea5e9] transition-all hover:scale-110"
              >
                <TwitterXIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:enterprise@natle.com"
                aria-label="Email"
                className="clay-card flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#64748b] hover:text-[#0ea5e9] transition-all hover:scale-110"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Platform (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a1628] mb-5">
              Platform &bull; Solutions
            </h3>
            <ul className="space-y-3">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#475569] hover:text-[#0ea5e9] transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#0ea5e9]/40 group-hover:bg-[#0ea5e9] group-hover:w-2 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company & Culture (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a1628] mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#0ea5e9] transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold font-mono text-emerald-700">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter / Enterprise Dispatch (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a1628] mb-4">
              Enterprise Dispatch
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed mb-4">
              Monthly technical whitepapers, telemetry benchmarks, and deployment debriefs directly from our lab.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="clay-card flex items-center rounded-full bg-white p-1.5 border border-slate-200/80 shadow-xs focus-within:border-[#0ea5e9] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full bg-transparent px-3 text-xs text-[#0a1628] placeholder:text-[#94a3b8] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="gradient-btn flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-xs hover:scale-105 transition-transform"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] font-medium text-emerald-600 animate-fadeIn">
                  ✓ Thank you! You&apos;re subscribed to our dispatch.
                </p>
              )}
              <p className="text-[10px] text-[#94a3b8]">
                Sovereign data policy. No marketing trackers.
              </p>
            </form>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            GIANT WATERMARK BRANDING (Awwwards Style)
           ══════════════════════════════════════════════════ */}
        <div className="relative select-none overflow-hidden py-6 text-center">
          <span className="font-display font-black tracking-tighter text-slate-900/[0.04] text-[13vw] sm:text-[14vw] leading-none block">
            NATLE
          </span>
        </div>

        {/* ══════════════════════════════════════════════════
            BOTTOM LEGAL & CREDITS
           ══════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-[#64748b]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} NATLE Technologies (Pvt) Ltd. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/contact" className="hover:text-[#0ea5e9] transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-[#0ea5e9] transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-[#0ea5e9] transition-colors">Security Disclosures</Link>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
              <span>🇱🇰</span> Colombo HQ &bull; Global Operations
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}