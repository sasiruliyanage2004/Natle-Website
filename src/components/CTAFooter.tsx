"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
} from "lucide-react";
import { Floating3DParticles } from "@/components/magicui/floating-3d-particles";

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
];

const COMPANY_LINKS = [
  { label: "About NATLE", href: "/about" },
  { label: "Engineering Culture", href: "/about#culture" },
  { label: "Careers", href: "/careers", badge: "Hiring" },
  { label: "Case Studies", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

const RESOURCE_LINKS = [
  { label: "Whitepapers", href: "/blog" },
  { label: "Edge Architecture", href: "/blog" },
  { label: "SOC 2 & Security", href: "/contact" },
  { label: "HIPAA Compliance", href: "/contact" },
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
    <footer className="relative z-10 w-full max-w-full overflow-hidden bg-[#f8faff] text-[#0a1628]">
      {/* Subtle top divider line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/25 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* ══════════════════════════════════════════════════
            COMPACT CLAYMORPHISM CTA BANNER (PROPORTIONAL)
           ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="clay-card relative mb-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/90 bg-white/95 p-6 sm:p-8 lg:p-10 shadow-[0_12px_36px_-10px_rgba(14,165,233,0.10)]"
        >
          {/* Subtle 3D Particles Effect inside the banner */}
          <Floating3DParticles
            color="#0ea5e9"
            quantity={90}
            opacity={0.3}
            size={3.5}
            drift={0.5}
            className="rounded-2xl sm:rounded-3xl"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
            <div className="max-w-xl">
              {/* Eyebrow status badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 shadow-xs mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Open for Deployments &bull; Q3/Q4 2026</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a1628] leading-tight">
                Ready to Deploy AI That{" "}
                <span className="gradient-text">Delivers Real ROI?</span>
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed max-w-lg">
                Consult with our systems architecture team. We audit your infrastructure and provide a production blueprint in 48 hours.
              </p>

              {/* Compliance trust chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#64748b]">
                <div className="flex items-center gap-1 rounded-md bg-slate-100/90 px-2 py-0.5 border border-slate-200/60">
                  <Shield className="h-3 w-3 text-[#0ea5e9]" />
                  <span>SOC 2 Type II</span>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-slate-100/90 px-2 py-0.5 border border-slate-200/60">
                  <CheckCircle2 className="h-3 w-3 text-[#059669]" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-slate-100/90 px-2 py-0.5 border border-slate-200/60">
                  <Sparkles className="h-3 w-3 text-[#0ea5e9]" />
                  <span>Air-Gapped Sovereign AI</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-row sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href="/contact"
                className="gradient-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-white text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-300"
              >
                <span>Architecture Review</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                href="/projects"
                className="clay-btn inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-6 py-3 font-bold text-xs sm:text-sm text-[#0a1628] hover:text-[#0ea5e9] transition-all duration-300"
              >
                <span>Case Studies</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#64748b]" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            MAIN FOOTER GRID (PROPORTIONALLY SIZED)
           ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-10 border-b border-slate-200/80 text-xs">
          
          {/* Col 1: Brand & Office (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <Link href="/" className="inline-block group">
                <Image
                  src="/natle-logo.jpeg"
                  alt="NATLE Technologies"
                  width={130}
                  height={38}
                  className="h-8 w-auto object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
              <p className="mt-2 text-xs text-[#64748b] leading-relaxed max-w-xs">
                Architecting high-reliability, sovereign enterprise AI platforms across healthcare diagnostics, agricultural telemetry, and enterprise automation.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-[#475569]">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5 text-[#0ea5e9] shrink-0" />
                <span>Level 4, Access Towers II, Colombo 02, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#0ea5e9] shrink-0" />
                <a href="tel:+94112345678" className="hover:text-[#0ea5e9] transition-colors">+94 11 234 5678</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#0ea5e9] shrink-0" />
                <a href="mailto:enterprise@natle.com" className="hover:text-[#0ea5e9] transition-colors font-mono">enterprise@natle.com</a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-card flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#64748b] hover:text-[#0ea5e9] transition-all hover:scale-105"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-card flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#64748b] hover:text-[#0ea5e9] transition-all hover:scale-105"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-card flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#64748b] hover:text-[#0ea5e9] transition-all hover:scale-105"
              >
                <TwitterXIcon className="h-3 w-3" />
              </a>
              <a
                href="mailto:enterprise@natle.com"
                aria-label="Email"
                className="clay-card flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#64748b] hover:text-[#0ea5e9] transition-all hover:scale-105"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Platform (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0a1628]">
              Platform &bull; Solutions
            </h3>
            <ul className="space-y-2 text-xs">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#64748b] hover:text-[#0ea5e9] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0a1628]">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-[#64748b] hover:text-[#0ea5e9] transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="rounded-full bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold font-mono text-emerald-700">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0a1628]">
              Enterprise Dispatch
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Technical whitepapers & deployment debriefs directly from our engineering team.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="clay-card flex items-center rounded-full bg-white p-1 border border-slate-200/80 shadow-xs focus-within:border-[#0ea5e9] transition-colors">
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
                  className="gradient-btn flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-xs hover:scale-105 transition-transform"
                >
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] font-medium text-emerald-600 animate-fadeIn">
                  ✓ Subscribed successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SUBTLE BACKGROUND LOGO WATERMARK (CONTROLLED)
           ══════════════════════════════════════════════════ */}
        <div className="relative select-none overflow-hidden py-3 text-center pointer-events-none">
          <span className="font-display font-black tracking-tighter text-slate-900/[0.03] text-6xl sm:text-8xl md:text-9xl leading-none block truncate">
            NATLE
          </span>
        </div>

        {/* ══════════════════════════════════════════════════
            BOTTOM BAR
           ══════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#64748b]">
          <div>
            <span>&copy; {new Date().getFullYear()} NATLE Technologies (Pvt) Ltd. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="hover:text-[#0ea5e9] transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-[#0ea5e9] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#0ea5e9] transition-colors">Security</Link>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-slate-500">
              <span>🇱🇰</span> Colombo HQ &bull; Global Operations
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}