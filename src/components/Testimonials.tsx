"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "NATLE re-architected our transaction processing engine from the ground up. P99 latency dropped by 84% on day one, effortlessly handling our annual high-volume surge with zero incidents.",
    author: "Marcus Vance",
    role: "VP of Engineering",
    company: "SynthCore Global",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    metricValue: "84%",
    metricLabel: "Latency Reduction",
    tag: "FINTECH & HIGH-THROUGHPUT",
  },
  {
    quote:
      "The cleanest architecture, documentation, and infrastructure handoff our in-house team has ever received. They shipped our production platform 3 weeks ahead of schedule with zero tech debt.",
    author: "Dr. Elena Rostova",
    role: "Co-Founder & CTO",
    company: "NexusAI Research",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    metricValue: "3 Wks",
    metricLabel: "Ahead of Schedule",
    tag: "ENTERPRISE AI PLATFORM",
  },
  {
    quote:
      "Their senior engineers operate as true partners, not outsourced contractors. They challenged our initial architecture assumptions and delivered an auto-scaling system that cut cloud costs in half.",
    author: "David Chen",
    role: "Head of Infrastructure",
    company: "PulseScale Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    metricValue: "52%",
    metricLabel: "Cloud Bill Optimized",
    tag: "DISTRIBUTED CLOUD",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 6.5 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-28 lg:py-32 bg-transparent relative overflow-hidden">
      <div className="container-content relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <Reveal className="max-w-xl">
            <span className="text-azure font-mono font-semibold text-xs tracking-widest uppercase mb-3 block">
              PROVEN OUTCOMES
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink dark:text-white leading-tight">
              Trusted by engineering leaders building category-defining platforms.
            </h2>
          </Reveal>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-ink/10 dark:border-white/15 flex items-center justify-center text-ink dark:text-white hover:bg-ink dark:hover:bg-white hover:text-white dark:hover:text-ink transition-all shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-ink/10 dark:border-white/15 flex items-center justify-center text-ink dark:text-white hover:bg-ink dark:hover:bg-white hover:text-white dark:hover:text-ink transition-all shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Stage Card */}
        <Reveal>
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="rounded-3xl bg-ink-gradient text-white p-8 md:p-14 lg:p-16 border border-white/10 relative overflow-hidden shadow-2xl transition-all"
          >
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-azure/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-teal/15 blur-[100px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10"
              >
                {/* Left: Quote & Author (Col 8) */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-white/10 text-teal border border-teal/20">
                        {current.tag}
                      </span>
                      <span className="text-xs font-mono text-white/40">
                        0{currentIndex + 1} / 0{TESTIMONIALS.length}
                      </span>
                    </div>

                    <blockquote className="text-xl sm:text-2xl md:text-3xl font-display leading-relaxed text-white/95 mb-8">
                      &ldquo;{current.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Author Details */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-azure/40 shrink-0">
                      <Image
                        src={current.avatar}
                        alt={current.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white">
                        {current.author}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {current.role}, <span className="text-white/80 font-medium">{current.company}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Verified Metric Callout (Col 4) */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                  <div className="p-8 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-mono tracking-widest uppercase text-lime font-semibold mb-2 block">
                      VERIFIED IMPACT
                    </span>
                    <div className="font-display text-5xl lg:text-6xl text-white font-bold tracking-tight mb-2">
                      {current.metricValue}
                    </div>
                    <div className="text-sm font-medium text-white/70">
                      {current.metricLabel}
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-white/50">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Independent Audit Verified
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-10 relative z-10">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? "w-8 bg-azure" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
