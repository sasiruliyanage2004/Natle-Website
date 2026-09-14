"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function HeroContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero='eyebrow']",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: "all" }
      )
        .fromTo(
          "[data-hero='line']",
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.09, clearProps: "all" },
          "-=0.3"
        )
        .fromTo(
          "[data-hero='sub']",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, clearProps: "all" },
          "-=0.35"
        )
        .fromTo(
          "[data-hero='cta']",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          "[data-hero='stat']",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, clearProps: "all" },
          "-=0.35"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative z-10 pointer-events-none">
      <div
        data-hero="eyebrow"
        className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure/10 dark:bg-azure/15 border border-azure/20 dark:border-azure/30 mb-4 sm:mb-5 backdrop-blur-md"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-azure dark:text-cyan-400 text-xs font-semibold tracking-wider uppercase font-mono">
          Software Engineering Studio
        </span>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.9rem] xl:text-[4.5rem] leading-[1.04] font-medium text-ink max-w-2xl">
        <span data-hero="line" className="block overflow-hidden">
          <span data-anchor="headline-word" className="inline-block mr-2.5">Ideas,</span>
          <span data-anchor="headline-word" className="inline-block">engineered</span>
        </span>
        <span data-hero="line" className="block overflow-hidden text-gradient">
          <span data-anchor="headline-word" className="inline-block mr-2.5">into</span>
          <span data-anchor="headline-word" className="inline-block">growth.</span>
        </span>
      </h1>
      <p data-hero="sub" className="mt-5 text-base sm:text-lg text-ink/65 dark:text-white/70 max-w-xl leading-relaxed">
        NATLE partners with founders and enterprise teams to design, build, and
        scale software that actually moves the business — from first prototype
        to production at scale.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Link
          data-hero="cta"
          data-anchor="cta-btn"
          href="/contact"
          className="pointer-events-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1E7FE8] hover:bg-[#1565C0] text-white px-7 py-3.5 text-[15px] font-semibold shadow-lg shadow-[#1E7FE8]/30 dark:shadow-[0_0_24px_rgba(30,127,232,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <span>Start a project</span>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
        <Link
          data-hero="cta"
          href="/projects"
          className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-white/25 bg-white/80 dark:bg-white/[0.08] text-slate-900 dark:text-white px-7 py-3.5 text-[15px] font-semibold hover:border-slate-400 dark:hover:border-white/40 hover:bg-slate-100 dark:hover:bg-white/[0.14] backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm"
        >
          See our work
        </Link>
      </div>

      <div data-anchor="stats" className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
        <div data-hero="stat">
          <div className="font-display text-3xl text-ink">120+</div>
          <div className="text-sm text-ink/50 mt-1">Products shipped</div>
        </div>
        <div data-hero="stat">
          <div className="font-display text-3xl text-ink">40+</div>
          <div className="text-sm text-ink/50 mt-1">Engineers &amp; designers</div>
        </div>
        <div data-hero="stat">
          <div className="font-display text-3xl text-ink">8</div>
          <div className="text-sm text-ink/50 mt-1">Industries served</div>
        </div>
      </div>
    </div>
  );
}
