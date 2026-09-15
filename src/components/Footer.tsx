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

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  // GSAP Parallax Animation for the giant NATLE watermark
  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      if (window.innerWidth >= 1024 && giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: 50, scale: 0.95, opacity: 0.1 },
          {
            y: 0,
            scale: 1,
            opacity: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1.2,
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
        className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#FCFDFE] dark:bg-[#07090E] text-slate-900 dark:text-white transition-colors duration-500"
      >
        {/* Ambient Aurora Glow */}
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(30,127,232,0.10)_0%,rgba(18,184,166,0.06)_40%,transparent_70%)] rounded-full blur-[110px] pointer-events-none z-0" />

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 1. PANORAMIC JAPANESE / SUMI-E LANDSCAPE ARTWORK (Image 1)        */}
        {/*    Misty Mountains, Bonsai Pines, Flying Cranes — Full Width     */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="absolute inset-x-0 bottom-0 h-[50%] sm:h-[56%] lg:h-[62%] pointer-events-none overflow-hidden z-0 select-none">
          {/* Light Mode Sumi-e Landscape Mural */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer-landscape-light.jpg"
            alt="Traditional Sumi-e Ink Wash Landscape"
            className="absolute inset-0 w-full h-full object-cover object-bottom dark:hidden opacity-90 transition-opacity duration-700"
          />

          {/* Dark Mode Cyber-Zen Landscape Mural */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer-landscape-dark.jpg"
            alt="Cyber Zen Glowing Night Landscape"
            className="absolute inset-0 w-full h-full object-cover object-bottom hidden dark:block opacity-90 transition-opacity duration-700"
          />

          {/* Top Gradient Fade to blend seamlessly with the footer background */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#FCFDFE] via-[#FCFDFE]/75 to-transparent dark:from-[#07090E] dark:via-[#07090E]/75 pointer-events-none" />

          {/* Bottom Mist Wash blending into copyright bar */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FCFDFE] via-[#FCFDFE]/80 to-transparent dark:from-[#07090E] dark:via-[#07090E]/80 pointer-events-none" />
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 2. GIANT WATERMARK "NATLE" TYPOGRAPHY (Image 2)                   */}
        {/*    Expansive, bold, clean editorial watermark                     */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div
          ref={giantTextRef}
          className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap z-[1] pointer-events-none select-none text-[20vw] sm:text-[22vw] lg:text-[24vw] tracking-[0.14em] font-black leading-none text-center w-full"
          style={{
            color: "transparent",
            WebkitTextStroke: "1.5px currentColor",
          }}
          aria-hidden="true"
        >
          <span className="text-slate-900/[0.12] dark:text-cyan-400/[0.18] transition-colors duration-500">
            NATLE
          </span>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 3. DIRECTORY GRID — NO BOXES (Clean, natural layout like img 1)   */}
        {/*    Brand & Contact + Capabilities + Studio + The Letter          */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 lg:pt-20 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10 items-start pb-12 border-b border-slate-900/[0.08] dark:border-white/[0.08]">
            
            {/* Column 1: Brand & Contact Info (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="inline-block mb-4">
                  <NatleLogo className="h-7 w-auto" showTagline={false} />
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm mb-6">
                  Empowering ambitious founders and enterprise teams with scalable, production-ready software systems, high-velocity cloud architecture, and AI infrastructure.
                </p>
              </div>

              <div>
                {/* Contact information */}
                <div className="space-y-2 text-xs sm:text-[13px] font-mono text-slate-700 dark:text-slate-300 pb-4 mb-4">
                  <p className="flex items-center gap-2">
                    <span className="text-azure font-bold">✉</span>
                    <a
                      href="mailto:info@natle.dev"
                      className="hover:text-azure dark:hover:text-cyan-400 transition-colors font-medium"
                    >
                      info@natle.dev
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-teal font-bold">☎</span>
                    <a
                      href="tel:+94112507601"
                      className="hover:text-teal dark:hover:text-cyan-400 transition-colors"
                    >
                      +94 11 250 7601
                    </a>
                    <span className="text-slate-400 dark:text-slate-600">•</span>
                    <a
                      href="tel:+94704659847"
                      className="hover:text-teal dark:hover:text-cyan-400 transition-colors"
                    >
                      +94 70 465 9847
                    </a>
                  </p>
                  <p className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <span className="text-lime font-bold">📍</span>
                    <span>No. 283 1/1, Ruwan Mawatha, Colombo 05, Sri Lanka</span>
                  </p>
                </div>

                {/* Social media icons */}
                <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 hover:text-azure transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 hover:text-azure transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.4 3.66z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 hover:text-azure transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Capabilities (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4">
                Capabilities
              </h4>
              <ul className="space-y-3">
                {FOOTER_SERVICES.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-700 dark:text-slate-300 hover:text-azure dark:hover:text-cyan-300 transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="text-xs text-azure opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                        ›
                      </span>
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
              <ul className="space-y-3">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-700 dark:text-slate-300 hover:text-azure dark:hover:text-cyan-300 transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="text-xs text-azure opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                        ›
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: The Letter / Newsletter (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4">
                The Letter
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed mb-4">
                Sign up for monthly technical briefings on AI systems, scalable infrastructure, and product strategy.
              </p>

              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2.5 rounded-full text-xs font-mono bg-slate-900/[0.04] dark:bg-white/[0.06] border border-slate-900/10 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-azure transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shrink-0 shadow-sm"
                >
                  {subscribed ? "Joined ✓" : "Join"}
                </button>
              </form>

              {/* Status pill indicator */}
              <div className="mt-5 flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ENGINEERING ADVISORY OPEN FOR Q4</span>
              </div>
            </div>

          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 4. BOTTOM COPYRIGHT BAR                                           */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="relative z-20 w-full py-4 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-900/[0.08] dark:border-white/[0.10] bg-white/70 dark:bg-[#07090E]/80 backdrop-blur-md">
          <div className="text-slate-500 dark:text-white/50 text-xs font-mono tracking-wider uppercase order-2 sm:order-1">
            © {new Date().getFullYear()} NATLE. All rights reserved.
          </div>

          <div className="order-1 sm:order-2 flex gap-6 text-slate-500 dark:text-white/50 text-xs font-mono">
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
              className="w-9 h-9 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100/90 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white transition-all group order-3 shadow-xs"
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
