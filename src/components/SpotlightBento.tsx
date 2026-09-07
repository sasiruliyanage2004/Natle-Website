"use client";

import React, { useRef } from "react";
import Link from "next/link";

export default function SpotlightBento() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for smooth cursor-following radial spotlight on cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".spotlight-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: FLAGSHIP - Product Engineering & High-Throughput Architecture (Col-span-2) */}
        <div className="spotlight-card group relative col-span-1 md:col-span-2 rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
          {/* Spotlight Border illumination */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(30, 127, 232, 0.4), rgba(18, 184, 166, 0.2) 35%, transparent 65%)`,
            }}
          />
          {/* Card Body */}
          <div className="relative h-full w-full rounded-[23px] bg-white border border-ink/8 p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-card transition-shadow">
            {/* Inner spotlight glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(750px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(30, 127, 232, 0.04), transparent 50%)`,
              }}
            />

            <div>
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-azure/10 border border-azure/20 text-azure text-xs font-semibold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-azure animate-pulse" />
                  CORE ARCHITECTURE
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-ink/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  P99 LATENCY &lt; 14ms
                </div>
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-ink mb-4">
                Full-Stack Product Engineering & Scalable Systems
              </h3>
              <p className="text-ink/65 text-[15px] md:text-base leading-relaxed max-w-2xl mb-8">
                We design and build production-grade web and native applications engineered for zero downtime, sub-millisecond edge response, and horizontal scale. From distributed Go/Rust microservices to responsive Next.js architectures.
              </p>

              {/* Architecture Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                <div className="rounded-2xl border border-ink/5 bg-mist/80 p-5">
                  <div className="font-mono text-xs text-azure font-semibold mb-2">01 / FRONTEND</div>
                  <div className="text-ink text-sm font-semibold mb-1">Modern Web & Mobile</div>
                  <p className="text-ink/60 text-xs leading-relaxed">
                    Next.js App Router, React Server Components, and native iOS/Android with sub-100ms hydration.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/5 bg-mist/80 p-5">
                  <div className="font-mono text-xs text-teal font-semibold mb-2">02 / BACKEND</div>
                  <div className="text-ink text-sm font-semibold mb-1">Distributed Microservices</div>
                  <p className="text-ink/60 text-xs leading-relaxed">
                    Go, Rust, and Node.js microservices interconnected via low-latency gRPC and message queues.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/5 bg-mist/80 p-5">
                  <div className="font-mono text-xs text-emerald-600 font-semibold mb-2">03 / PERFORMANCE</div>
                  <div className="text-ink text-sm font-semibold mb-1">Global Edge Delivery</div>
                  <p className="text-ink/60 text-xs leading-relaxed">
                    Anycast routing, automated Redis caching layers, and zero-downtime rolling releases.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom feature tags */}
            <div className="mt-8 pt-6 border-t border-ink/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {["Next.js / React 19", "Distributed Go", "gRPC & WebSockets", "PostgreSQL / Redis"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-ink/[0.04] text-ink/70 border border-ink/5">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                className="text-xs font-semibold text-azure hover:text-azure-light transition-colors flex items-center gap-1 group-hover:translate-x-1 duration-200"
              >
                Discuss Technical Specs →
              </Link>
            </div>
          </div>
        </div>

        {/* CARD 2: Applied AI & Neural Pipelines */}
        <div className="spotlight-card group relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(450px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(18, 184, 166, 0.4), transparent 60%)`,
            }}
          />
          <div className="relative h-full w-full rounded-[23px] bg-white border border-ink/8 p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-card transition-shadow">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(550px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(18, 184, 166, 0.04), transparent 50%)`,
              }}
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-semibold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                APPLIED AI
              </div>

              <h3 className="font-display text-2xl text-ink mb-3">
                Applied AI & Autonomous Pipelines
              </h3>
              <p className="text-ink/65 text-[14px] leading-relaxed mb-6">
                Transform business data into automated intelligence with production RAG architectures, fine-tuned domain models, and high-throughput vector search.
              </p>

              {/* Clean Telemetry Overview */}
              <div className="rounded-2xl border border-ink/5 bg-mist/80 p-5 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-ink/50 pb-2 border-b border-ink/5">
                  <span className="text-teal font-semibold">PRODUCTION BENCHMARK</span>
                  <span className="text-emerald-600 font-semibold">OPTIMAL</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span className="text-ink/40">Inference P99:</span>
                  <span className="text-emerald-600 font-semibold">&lt; 12ms</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span className="text-ink/40">Embedding Dimension:</span>
                  <span className="text-ink">1536 (Cosine HNSW)</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span className="text-ink/40">Knowledge Base:</span>
                  <span className="text-ink">Multi-Tenant Vector DB</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/5 flex flex-wrap gap-2">
              {["Custom RAG", "Vector Search", "Fine-Tuning", "Autonomous Agents"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-ink/[0.04] text-ink/70 border border-ink/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 3: Cloud & Auto-Scaling DevOps */}
        <div className="spotlight-card group relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(450px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(111, 207, 62, 0.4), transparent 60%)`,
            }}
          />
          <div className="relative h-full w-full rounded-[23px] bg-white border border-ink/8 p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-card transition-shadow">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(550px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(111, 207, 62, 0.04), transparent 50%)`,
              }}
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-emerald-600 text-xs font-semibold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                CLOUD & DEVOPS
              </div>

              <h3 className="font-display text-2xl text-ink mb-3">
                Cloud Architecture & Auto-Scaling DevOps
              </h3>
              <p className="text-ink/65 text-[14px] leading-relaxed mb-6">
                Zero-downtime rolling deployments, automated multi-cloud failovers, and resilient Kubernetes clusters that scale dynamically without manual intervention.
              </p>

              {/* Multi-Region Availability */}
              <div className="rounded-2xl border border-ink/5 bg-mist/80 p-5 font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between text-ink/50 pb-2 border-b border-ink/5">
                  <span>ACTIVE REGIONS</span>
                  <span className="text-emerald-600 font-semibold">99.999% SLA</span>
                </div>
                {[
                  { name: "US-East (N. Virginia)", ping: "12ms" },
                  { name: "EU-West (Frankfurt)", ping: "18ms" },
                  { name: "AP-South (Singapore)", ping: "24ms" },
                ].map((r) => (
                  <div key={r.name} className="flex items-center justify-between text-ink/70">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {r.name}
                    </span>
                    <span className="text-ink/40">{r.ping}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/5 flex flex-wrap gap-2">
              {["Kubernetes", "AWS / GCP / Azure", "Terraform", "Zero Downtime"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-ink/[0.04] text-ink/70 border border-ink/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 4: Zero-Trust Enterprise Systems */}
        <div className="spotlight-card group relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(450px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(245, 158, 11, 0.4), transparent 60%)`,
            }}
          />
          <div className="relative h-full w-full rounded-[23px] bg-white border border-ink/8 p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-card transition-shadow">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(550px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(245, 158, 11, 0.04), transparent 50%)`,
              }}
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-semibold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                SECURITY & AUDIT
              </div>

              <h3 className="font-display text-2xl text-ink mb-3">
                Zero-Trust Enterprise Systems & Modernization
              </h3>
              <p className="text-ink/65 text-[14px] leading-relaxed mb-6">
                Replace brittle legacy tools with secure internal platforms, automated compliance protocols, and cryptographically verified data pipelines.
              </p>

              {/* Compliance Matrix */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { name: "SOC 2 Type II", status: "Verified" },
                  { name: "ISO 27001", status: "Certified" },
                  { name: "HIPAA / GDPR", status: "Compliant" },
                  { name: "End-to-End TLS", status: "Enforced" },
                ].map((item) => (
                  <div key={item.name} className="rounded-xl border border-ink/5 bg-mist/80 p-3 font-mono text-xs">
                    <div className="text-ink font-semibold mb-0.5">{item.name}</div>
                    <div className="text-emerald-600 text-[10px] flex items-center gap-1 font-semibold">
                      <span>✓</span> {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/5 flex flex-wrap gap-2">
              {["Legacy Migration", "ERP Systems", "Role-Based ACL", "Audit Logging"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-ink/[0.04] text-ink/70 border border-ink/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 5: Product Design & Interaction Systems (Col-span-1 md:col-span-2) */}
        <div className="spotlight-card group relative col-span-1 md:col-span-2 rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(168, 85, 247, 0.4), transparent 60%)`,
            }}
          />
          <div className="relative h-full w-full rounded-[23px] bg-white border border-ink/8 p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-card transition-shadow">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(750px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(168, 85, 247, 0.04), transparent 50%)`,
              }}
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-xs font-semibold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                PRODUCT DESIGN
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-ink mb-4">
                Product Design & Cohesive Design Systems
              </h3>
              <p className="text-ink/65 text-[15px] leading-relaxed max-w-2xl mb-8">
                Great software feels effortless. Our design engineering team creates unified Figma design tokens, micro-interactions, and accessible component architectures that translate directly into clean production code without handover loss.
              </p>

              {/* Design System Foundations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-ink/5 bg-mist/80 p-5">
                  <div className="font-mono text-xs text-purple-600 font-semibold mb-2">DESIGN TOKENS</div>
                  <div className="text-ink text-sm font-semibold mb-1">Single Source of Truth</div>
                  <p className="text-ink/60 text-xs leading-relaxed">
                    Synchronized color, typography, and spacing variables exported directly to Tailwind and CSS modules.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/5 bg-mist/80 p-5">
                  <div className="font-mono text-xs text-azure font-semibold mb-2">MICRO-INTERACTIONS</div>
                  <div className="text-ink text-sm font-semibold mb-1">Intentional Motion</div>
                  <p className="text-ink/60 text-xs leading-relaxed">
                    GPU-accelerated transforms and physics springs that guide user focus without causing layout delay.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/5 bg-mist/80 p-5">
                  <div className="font-mono text-xs text-emerald-600 font-semibold mb-2">ACCESSIBILITY</div>
                  <div className="text-ink text-sm font-semibold mb-1">WCAG AAA Certified</div>
                  <p className="text-ink/60 text-xs leading-relaxed">
                    Semantic DOM hierarchy, keyboard navigation, and high-contrast color balance validated by automated audits.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/5 flex flex-wrap gap-2">
              {["Figma Tokens", "Micro-Interactions", "WCAG AAA", "Component Libraries", "UX Research"].map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-ink/[0.04] text-ink/70 border border-ink/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 6: Fractional CTO & Strategic Advisory */}
        <div className="spotlight-card group relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(450px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(59, 130, 246, 0.4), transparent 60%)`,
            }}
          />
          <div className="relative h-full w-full rounded-[23px] bg-white border border-ink/8 p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-card transition-shadow">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(550px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(59, 130, 246, 0.04), transparent 50%)`,
              }}
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                EXECUTIVE ADVISORY
              </div>

              <h3 className="font-display text-2xl text-ink mb-3">
                Fractional CTO & Strategic Architecture
              </h3>
              <p className="text-ink/65 text-[14px] leading-relaxed mb-6">
                Senior engineering direction for tech roadmaps, vendor evaluations, security audits, and institutional fundraising due diligence.
              </p>

              {/* Concrete Advisory Deliverables */}
              <div className="rounded-2xl border border-ink/5 bg-mist/80 p-5 font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between text-ink/50 pb-2 border-b border-ink/5">
                  <span>ENG VELOCITY IMPACT</span>
                  <span className="text-azure font-bold">+3.8x</span>
                </div>
                <div className="space-y-2 text-ink/80 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Zero Tech-Debt Codebase Handover</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Investor Technical Due Diligence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Full Documentation & Team Mentorship</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/5 flex flex-wrap gap-2">
              {["Tech Diligence", "Roadmap Scoping", "Vendor Audit", "Team Mentorship"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-ink/[0.04] text-ink/70 border border-ink/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
