"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Magnetic from "./Magnetic";
import NatleLogo from "./NatleLogo";
import { FOOTER_SERVICES, FOOTER_COMPANY } from "@/lib/nav";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const glassLensRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  // Smooth mouse tracking for the interactive glass lens over NATLE
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let raf = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      setIsHovered(true);
    };

    const onMouseLeave = () => {
      setIsHovered(false);
    };

    const animateLens = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setMousePos({ x: currentX, y: currentY });
      raf = requestAnimationFrame(animateLens);
    };

    footer.addEventListener("mousemove", onMouseMove);
    footer.addEventListener("mouseleave", onMouseLeave);
    raf = requestAnimationFrame(animateLens);

    return () => {
      footer.removeEventListener("mousemove", onMouseMove);
      footer.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // GSAP Parallax Animation
  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      if (window.innerWidth >= 1024 && giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: 60, scale: 0.94, opacity: 0.08 },
          {
            y: 0,
            scale: 1,
            opacity: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 85%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-screen w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer
        ref={footerRef}
        className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#FCFDFE] dark:bg-[#07090E] text-slate-900 dark:text-white transition-colors duration-500 select-none"
      >
        {/* Ambient Glows */}
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(30,127,232,0.12)_0%,rgba(18,184,166,0.08)_45%,transparent_70%)] rounded-full blur-[100px] pointer-events-none z-0" />

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 1. GIANT WATERMARK "NATLE"                                        */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div
          ref={giantTextRef}
          className="absolute bottom-20 sm:bottom-28 lg:bottom-28 left-1/2 -translate-x-1/2 whitespace-nowrap z-[1] pointer-events-none select-none text-[20vw] sm:text-[22vw] tracking-[0.14em] font-black leading-none text-center w-full opacity-15 dark:opacity-25"
          style={{
            color: "transparent",
            WebkitTextStroke: "1.5px currentColor",
          }}
          aria-hidden="true"
        >
          NATLE
        </div>

        {/* The Interactive Floating Specular Glass Lens (Follows cursor over the footer & NATLE) */}
        {isHovered && (
          <div
            ref={glassLensRef}
            className="pointer-events-none absolute z-[15] hidden sm:block -translate-x-1/2 -translate-y-1/2 w-64 h-36 rounded-3xl backdrop-blur-md bg-white/20 dark:bg-cyan-500/[0.06] border border-white/60 dark:border-cyan-400/40 shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_rgba(0,229,255,0.18)] transition-opacity duration-300 overflow-hidden"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          >
            {/* Prismatic glass sheen & light reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 dark:via-cyan-300/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50 dark:ring-cyan-300/30" />
            {/* Subtle center crosshair / coordinate mark */}
            <div className="absolute top-3 right-3 text-[9px] font-mono text-slate-500/60 dark:text-cyan-400/50 uppercase tracking-widest">
              N·01 / GLASS
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 2. TOP DIRECTORY (Modern 4-column layout inside frosted glass)   */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 lg:pt-20 pb-8">
          <div className="rounded-3xl backdrop-blur-xl bg-white/60 dark:bg-[#0B101B]/70 border border-slate-200/70 dark:border-white/[0.08] shadow-2xl shadow-slate-900/5 dark:shadow-cyan-950/20 p-8 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-slate-900/[0.08] dark:border-white/[0.08]">
              
              {/* Column 1: Brand & Contact (lg:col-span-4) */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="inline-block mb-4">
                    <NatleLogo className="h-7 w-auto" showTagline={false} />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                    Empowering founders and ambitious enterprise teams with scalable, production-ready software systems and AI architecture.
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-2 text-xs sm:text-[13px] font-mono text-slate-600 dark:text-slate-400">
                  <p className="flex items-center gap-2">
                    <span className="text-azure">✉</span>
                    <a href="mailto:info@natle.dev" className="hover:text-azure dark:hover:text-white transition-colors">
                      info@natle.dev
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-teal">☎</span>
                    <a href="tel:+94112507601" className="hover:text-teal dark:hover:text-white transition-colors">
                      +94 11 250 7601
                    </a>
                    <span className="text-slate-400 dark:text-slate-600">•</span>
                    <a href="tel:+94704659847" className="hover:text-teal dark:hover:text-white transition-colors">
                      +94 70 465 9847
                    </a>
                  </p>
                  <p className="flex items-start gap-2 pt-1 text-slate-500 dark:text-slate-500">
                    <span className="text-lime">📍</span>
                    <span>No. 283 1/1, Ruwan Mawatha, Colombo 05, Sri Lanka</span>
                  </p>
                </div>
              </div>

            {/* Column 2: Capabilities (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4">
                Capabilities
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_SERVICES.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 dark:text-slate-300 hover:text-azure dark:hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-azure">›</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Studio (lg:col-span-2) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4">
                Studio
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 dark:text-slate-300 hover:text-azure dark:hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-azure">›</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter / The Letter (lg:col-span-3, like img 1) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4">
                The Letter
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-[13px] leading-relaxed mb-4">
                Notes on modern software engineering, AI architecture, and scaling digital products. No spam, ever.
              </p>

              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-full text-xs font-mono bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-azure transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold text-xs hover:opacity-90 transition-opacity shrink-0 shadow-sm"
                >
                  {subscribed ? "Joined ✓" : "Join"}
                </button>
              </form>

              {/* Status pill */}
              <div className="mt-5 flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ENGINEERING ADVISORY OPEN FOR Q4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 3. PANORAMIC JAPANESE / SUMI-E ARTISTIC LANDSCAPE MURAL           */}
        {/*    (Misty Mountains, Bonsai Pines, Flying Cranes — from img 1)   */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="relative w-full overflow-hidden h-[180px] sm:h-[220px] lg:h-[280px] mt-auto pointer-events-none z-[2]">
          <svg
            className="absolute bottom-0 left-0 w-full h-full object-cover"
            viewBox="0 0 1600 360"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Light Mode Gradients */}
              <linearGradient id="light-mountain-far" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C7D7E8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EBF2F8" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="light-mountain-mid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8BAAC9" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#D4E4F2" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="light-mountain-near" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A6B8A" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#A4C2DE" stopOpacity="0.2" />
              </linearGradient>

              {/* Dark Mode Gradients */}
              <linearGradient id="dark-mountain-far" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#07090E" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="dark-mountain-mid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#164E63" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#07090E" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="dark-mountain-near" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0E7490" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#07090E" stopOpacity="0.15" />
              </linearGradient>

              {/* Mist Gradients */}
              <linearGradient id="light-mist-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FCFDFE" stopOpacity="0" />
                <stop offset="100%" stopColor="#FCFDFE" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="dark-mist-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#07090E" stopOpacity="0" />
                <stop offset="100%" stopColor="#07090E" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Far Distant Mountain Ridges */}
            <path
              d="M0 240 Q 220 130, 480 180 T 960 140 T 1400 170 L 1600 210 L 1600 360 L 0 360 Z"
              className="fill-[url(#light-mountain-far)] dark:fill-[url(#dark-mountain-far)] transition-all duration-700"
            />

            {/* Midground Layer with Mountain Peaks */}
            <path
              d="M0 280 Q 180 170, 360 210 T 780 180 T 1200 210 T 1600 240 L 1600 360 L 0 360 Z"
              className="fill-[url(#light-mountain-mid)] dark:fill-[url(#dark-mountain-mid)] transition-all duration-700"
            />

            {/* Near Ridge with Shoreline Contours */}
            <path
              d="M0 310 Q 260 230, 560 270 T 1100 240 T 1600 280 L 1600 360 L 0 360 Z"
              className="fill-[url(#light-mountain-near)] dark:fill-[url(#dark-mountain-near)] transition-all duration-700"
            />

            {/* ── PINE TREES (Bonsai Pine Silhouettes) ── */}
            {/* Pine Grove Left */}
            <g className="text-slate-700 dark:text-cyan-300 opacity-80 transition-colors duration-700">
              {/* Trunk 1 */}
              <path d="M 120 360 C 130 320, 115 280, 140 250" stroke="currentColor" strokeWidth="4" fill="none" />
              {/* Foliage Cloud 1 */}
              <ellipse cx="140" cy="245" rx="35" ry="14" fill="currentColor" opacity="0.85" />
              <ellipse cx="115" cy="265" rx="28" ry="12" fill="currentColor" opacity="0.85" />
              <ellipse cx="165" cy="260" rx="30" ry="12" fill="currentColor" opacity="0.85" />

              {/* Trunk 2 (Tilted) */}
              <path d="M 220 360 C 230 310, 260 285, 275 260" stroke="currentColor" strokeWidth="3.5" fill="none" />
              <ellipse cx="280" cy="255" rx="38" ry="14" fill="currentColor" opacity="0.9" />
              <ellipse cx="250" cy="275" rx="26" ry="11" fill="currentColor" opacity="0.8" />
              <ellipse cx="305" cy="270" rx="28" ry="12" fill="currentColor" opacity="0.8" />
            </g>

            {/* Pine Grove Right */}
            <g className="text-slate-700 dark:text-teal-300 opacity-80 transition-colors duration-700">
              <path d="M 1380 360 C 1370 310, 1390 280, 1375 250" stroke="currentColor" strokeWidth="4" fill="none" />
              <ellipse cx="1370" cy="245" rx="40" ry="15" fill="currentColor" opacity="0.85" />
              <ellipse cx="1340" cy="265" rx="30" ry="12" fill="currentColor" opacity="0.85" />
              <ellipse cx="1410" cy="260" rx="32" ry="13" fill="currentColor" opacity="0.85" />

              <path d="M 1480 360 C 1475 320, 1460 290, 1450 270" stroke="currentColor" strokeWidth="3" fill="none" />
              <ellipse cx="1450" cy="265" rx="32" ry="13" fill="currentColor" opacity="0.85" />
              <ellipse cx="1480" cy="280" rx="26" ry="11" fill="currentColor" opacity="0.85" />
            </g>

            {/* ── FLYING CRANES (Birds Soaring in Flight, as in img 1) ── */}
            {/* Crane 1 (Large Leading Crane) */}
            <g className="text-slate-800 dark:text-cyan-200 transition-colors duration-700" transform="translate(680, 150) scale(0.95)">
              {/* Body and head */}
              <path d="M 0 0 C 15 -5, 30 -2, 45 4" stroke="currentColor" strokeWidth="2.5" fill="none" />
              {/* Wings */}
              <path d="M 15 -2 C 20 -28, 40 -35, 55 -32 C 42 -20, 30 -5, 25 0" fill="currentColor" />
              <path d="M 15 -2 C 10 18, 25 32, 40 34 C 30 20, 22 8, 20 0" fill="currentColor" />
              {/* Long Legs */}
              <path d="M -5 2 L -25 6 M -4 4 L -23 10" stroke="currentColor" strokeWidth="1.5" />
            </g>

            {/* Crane 2 (Trailing Companion) */}
            <g className="text-slate-700 dark:text-cyan-300 transition-colors duration-700" transform="translate(610, 185) scale(0.75)">
              <path d="M 0 0 C 15 -5, 30 -2, 45 4" stroke="currentColor" strokeWidth="2.5" fill="none" />
              <path d="M 15 -2 C 20 -28, 40 -35, 55 -32 C 42 -20, 30 -5, 25 0" fill="currentColor" />
              <path d="M 15 -2 C 10 18, 25 32, 40 34 C 30 20, 22 8, 20 0" fill="currentColor" />
              <path d="M -5 2 L -25 6 M -4 4 L -23 10" stroke="currentColor" strokeWidth="1.5" />
            </g>

            {/* Distant Flock of Cranes in V-formation */}
            <g className="text-slate-500 dark:text-cyan-400/60" transform="translate(860, 110) scale(0.45)">
              <path d="M 0 0 Q 8 -12, 16 0 Q 24 -12, 32 0" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M 40 -15 Q 48 -27, 56 -15 Q 64 -27, 72 -15" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M 80 -30 Q 88 -42, 96 -30 Q 104 -42, 112 -30" stroke="currentColor" strokeWidth="2" fill="none" />
            </g>

            {/* Gentle Morning/Midnight Mist Wash across the bottom */}
            <rect
              x="0"
              y="280"
              width="1600"
              height="80"
              className="fill-[url(#light-mist-gradient)] dark:fill-[url(#dark-mist-gradient)] transition-all duration-700"
            />
          </svg>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 4. BOTTOM COPYRIGHT BAR                                           */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="relative z-20 w-full py-4 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-900/[0.08] dark:border-white/[0.10] bg-white/70 dark:bg-[#07090E]/80 backdrop-blur-md">
          <div className="text-slate-500 dark:text-white/40 text-xs font-mono tracking-wider uppercase order-2 sm:order-1">
            © {new Date().getFullYear()} NATLE. All rights reserved.
          </div>

          <div className="order-1 sm:order-2 flex gap-6 text-slate-500 dark:text-white/40 text-xs font-mono">
            <Link href="/about" className="hover:text-azure dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-azure dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>

          <Magnetic>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white transition-all group order-3 shadow-xs"
              aria-label="Scroll to top"
            >
              <svg
                className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </footer>
    </div>
  );
}
