"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const NAV = [
  {
    heading: "Platform",
    links: [
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Projects", href: "/projects" },
      { label: "Pricing", href: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Case Studies", href: "/projects" },
      { label: "Security", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

const CONTACT = [
  { icon: MapPin, text: "Level 4, Access Towers II, Colombo 02, Sri Lanka" },
  { icon: Phone, text: "+94 11 234 5678" },
  { icon: Mail, text: "enterprise@natle.com" },
];

// Staggered word reveal animation
function BigRevealText({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const words = children.split(" ");

  return (
    <div ref={ref} className="overflow-hidden">
      <div className="flex flex-wrap gap-x-[0.22em]">
        {words.map((word, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.08 }}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CTAFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(2,8,24,0.95) 8%, #020818 100%)",
        borderTop: "1px solid rgba(14,165,233,0.08)",
      }}
    >
      {/* ── CTA Section (Revnue-inspired large enter animation) ── */}
      <div
        ref={ref}
        className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-24 border-b"
        style={{ borderColor: "rgba(14,165,233,0.08)" }}
      >
        {/* Glowing blob behind CTA text */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "700px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(14,165,233,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest border"
            style={{ background: "rgba(90,236,143,0.1)", borderColor: "rgba(90,236,143,0.3)", color: "#5aec8f" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#5aec8f] animate-pulse" />
            Start Today
          </span>
        </motion.div>

        {/* Giant heading — Revnue style word-by-word reveal */}
        <div className="text-center mb-10">
          <h2
            className="font-display font-black text-white leading-[1.0] mb-2"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <BigRevealText>Ready to Move</BigRevealText>
          </h2>
          <h2
            className="font-display font-black leading-[1.0]"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              background: "linear-gradient(90deg, #0ea5e9 0%, #5aec8f 60%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <BigRevealText>Your Industry?</BigRevealText>
          </h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-[#64748b] text-lg max-w-xl mx-auto mb-12"
        >
          Let&apos;s build something intelligent. Talk to a NATLE engineer and get your AI roadmap in 48 hours.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-white text-sm transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #1a3a8f 0%, #0ea5e9 55%, #5aec8f 100%)", boxShadow: "0 4px 30px -6px rgba(14,165,233,0.55)" }}
          >
            Request a Demo
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.3)", color: "#38bdf8" }}
          >
            Explore Services
          </Link>
        </motion.div>
      </div>

      {/* ── Footer Links Grid ── */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-2 lg:grid-cols-5 gap-10 border-b"
        style={{ borderColor: "rgba(14,165,233,0.06)" }}
      >
        {/* Brand column */}
        <div className="col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo wordmark */}
            <div className="font-display text-2xl font-black tracking-tight mb-4">
              <span className="text-white">NATLE</span>
              <span style={{ color: "#0ea5e9" }}>.</span>
            </div>
            <p className="text-[#64748b] text-sm leading-relaxed mb-6 max-w-[220px]">
              Enterprise AI systems, engineered for production — not demos.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {CONTACT.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#0ea5e9" }} />
                    <span className="text-xs text-[#64748b]">{c.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Nav columns */}
        {NAV.map((col, ci) => (
          <motion.div
            key={col.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: ci * 0.1 }}
          >
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">{col.heading}</h4>
            <ul className="space-y-3">
              {col.links.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748b] hover:text-[#0ea5e9] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#475569]">
          © 2026 NATLE Technologies (Pvt) Ltd. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-xs text-[#475569] hover:text-[#0ea5e9] transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-xs text-[#475569] hover:text-[#0ea5e9] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
