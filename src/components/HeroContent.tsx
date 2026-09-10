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
      tl.from("[data-hero='eyebrow']", { y: 16, opacity: 0, duration: 0.6 })
        .from(
          "[data-hero='line']",
          { y: 44, opacity: 0, duration: 0.85, stagger: 0.09 },
          "-=0.3"
        )
        .from("[data-hero='sub']", { y: 20, opacity: 0, duration: 0.7 }, "-=0.35")
        .from("[data-hero='cta']", { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .from("[data-hero='stat']", { y: 14, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.35");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative z-10">
      <p
        data-hero="eyebrow"
        className="text-azure font-semibold text-sm tracking-wide mb-5"
      >
        Software engineering studio
      </p>
      <h1 className="font-display text-[13vw] leading-[0.98] sm:text-6xl md:text-7xl lg:text-[5.2rem] font-medium text-ink max-w-4xl">
        <span data-hero="line" className="block overflow-hidden">
          Ideas, engineered
        </span>
        <span data-hero="line" className="block overflow-hidden text-gradient">
          into growth.
        </span>
      </h1>
      <p data-hero="sub" className="mt-7 text-lg text-ink/60 max-w-xl leading-relaxed">
        NATLE partners with founders and enterprise teams to design, build, and
        scale software that actually moves the business — from first prototype
        to production at scale.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Link
          data-hero="cta"
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-ink text-white px-7 py-3.5 text-[15px] font-semibold hover:bg-ink-soft dark:bg-white dark:text-ink dark:hover:bg-slate-100 dark:shadow-[0_0_24px_rgba(255,255,255,0.14)] transition-all"
        >
          Start a project
        </Link>
        <Link
          data-hero="cta"
          href="/projects"
          className="inline-flex items-center justify-center rounded-full border border-ink/15 text-ink px-7 py-3.5 text-[15px] font-semibold hover:border-ink/30 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5 transition-colors"
        >
          See our work
        </Link>
      </div>

      <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6">
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
