"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Code snippets for Flagship Card tabs
const CODE_SNIPPETS = {
  frontend: `// Next.js 14 App Router + Server Actions
export async function streamRealtimeTelemetry(nodeId: string) {
  "use server";
  const channel = await edgeBroker.subscribe(nodeId);
  return channel.pipeThrough(new CompressionStream("gzip"));
}`,
  backend: `// Distributed Go Microservice Mesh
func HandlePayload(ctx context.Context, req *Packet) (*Ack, error) {
  select {
  case <-ctx.Done(): return nil, ctx.Err()
  case workerPool <- req:
    return &Ack{Status: "ROUTED_ZERO_COPY", P99: "4.2ms"}, nil
  }
}`,
  cloud: `// Infrastructure as Code (K8s / Terraform)
resource "helm_release" "natle_edge_mesh" {
  name       = "mesh-operator"
  repository = "oci://registry.natle.io/infra"
  set { name = "autoscaling.targetP99Latency" value = "15ms" }
}`,
};

type CodeTab = "frontend" | "backend" | "cloud";

export default function SpotlightBento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>("frontend");
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeColor, setActiveColor] = useState<"azure" | "lime" | "cyan" | "violet">("azure");

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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const colorStyles = {
    azure: {
      bg: "bg-azure/10",
      border: "border-azure/30",
      text: "text-azure",
      glow: "rgba(30, 127, 232, 0.4)",
    },
    lime: {
      bg: "bg-lime/10",
      border: "border-lime/30",
      text: "text-lime",
      glow: "rgba(111, 207, 62, 0.4)",
    },
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      glow: "rgba(6, 182, 212, 0.4)",
    },
    violet: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      text: "text-purple-400",
      glow: "rgba(168, 85, 247, 0.4)",
    },
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: FLAGSHIP - Product Engineering & Scalable Systems (Col-span-2) */}
        <div className="spotlight-card group relative col-span-1 md:col-span-2 rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
          {/* Spotlight Border illumination */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(30, 127, 232, 0.4), rgba(18, 184, 166, 0.15) 30%, transparent 60%)`,
            }}
          />
          {/* Card Body */}
          <div className="relative h-full w-full rounded-[23px] bg-[#0C0E15] border border-white/10 p-7 md:p-9 flex flex-col justify-between overflow-hidden">
            {/* Inner spotlight glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(800px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(30, 127, 232, 0.08), transparent 50%)`,
              }}
            />

            <div>
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-azure/10 border border-azure/25 text-azure text-xs font-semibold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-azure animate-pulse" />
                  CORE FLAGSHIP SERVICE
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  P99 LATENCY &lt; 14ms
                </div>
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-white mb-3">
                Full-Stack Product Engineering & High-Throughput Architecture
              </h3>
              <p className="text-white/70 text-[15px] md:text-base leading-relaxed max-w-2xl mb-8">
                From sub-millisecond edge APIs to responsive native mobile interfaces, we build mission-critical digital systems engineered for zero downtime, elastic horizontal scale, and enterprise-grade fault tolerance.
              </p>

              {/* Interactive Code Playground Widget */}
              <div className="rounded-2xl border border-white/10 bg-[#07080D] overflow-hidden shadow-2xl">
                {/* Window Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                    <span className="ml-3 font-mono text-xs text-white/40 hidden sm:inline">
                      engine.natle.internal
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/5">
                    {(["frontend", "backend", "cloud"] as CodeTab[]).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveCodeTab(tab)}
                        className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                          activeCodeTab === tab
                            ? "bg-azure text-white shadow-sm font-semibold"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {tab === "frontend" ? "App.tsx" : tab === "backend" ? "mesh.go" : "infra.tf"}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="text-xs font-mono text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                    title="Copy code"
                  >
                    {copiedCode ? (
                      <span className="text-emerald-400">Copied!</span>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Code Content */}
                <div className="p-4 md:p-5 font-mono text-xs md:text-[13px] text-white/85 leading-relaxed overflow-x-auto">
                  <pre className="text-white/90">
                    <code>{CODE_SNIPPETS[activeCodeTab]}</code>
                  </pre>
                </div>

                {/* Live Build Status Bar */}
                <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/50">
                  <span className="flex items-center gap-2 text-emerald-400">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    0 Vulnerabilities • Build: 340ms
                  </span>
                  <span>Edge CDN Cache: 99.2% Hit</span>
                </div>
              </div>
            </div>

            {/* Bottom feature tags */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {["Next.js / React 19", "Go / Rust Core", "WebSockets", "GraphQL & gRPC"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-white/70 border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                className="text-xs font-semibold text-azure hover:text-azure-light transition-colors flex items-center gap-1 group-hover:translate-x-1 duration-200"
              >
                Explore Engineering Systems →
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
          <div className="relative h-full w-full rounded-[23px] bg-[#0C0E15] border border-white/10 p-7 flex flex-col justify-between overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(18, 184, 166, 0.08), transparent 50%)`,
              }}
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 border border-teal/25 text-teal text-xs font-semibold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-ping" />
                INTELLIGENT SYSTEMS
              </div>

              <h3 className="font-display text-2xl text-white mb-3">
                Applied AI & Autonomous Pipelines
              </h3>
              <p className="text-white/70 text-[14px] leading-relaxed mb-6">
                Turn proprietary business data into real-time decision intelligence with hybrid RAG, fine-tuned foundational models, and high-speed vector embeddings.
              </p>

              {/* Neural Stream Simulation Widget */}
              <div className="rounded-2xl border border-white/10 bg-[#07080D] p-4 font-mono text-xs space-y-3 shadow-inner">
                <div className="flex items-center justify-between text-white/50 pb-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-teal font-semibold">
                    <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                    VECTOR PIPELINE ACTIVE
                  </span>
                  <span>dim: 1536</span>
                </div>

                <div className="space-y-1.5 text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/40">Inference Latency:</span>
                    <span className="text-emerald-400 font-semibold">8.4ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Throughput:</span>
                    <span className="text-white">186 tokens/sec</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Vector Engine:</span>
                    <span className="text-white">HNSW Graph (Cosine)</span>
                  </div>
                </div>

                {/* Animated visual audio/neural frequency waves */}
                <div className="pt-2 flex items-center justify-between gap-1 h-8">
                  {[40, 75, 55, 95, 30, 85, 60, 100, 45, 90, 70, 80, 50, 65].map((val, idx) => (
                    <motion.div
                      key={idx}
                      className="w-1 rounded-full bg-gradient-to-t from-teal/30 to-teal"
                      animate={{
                        height: [`${val * 0.3}%`, `${val}%`, `${val * 0.4}%`],
                      }}
                      transition={{
                        duration: 1.2 + (idx % 3) * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
              {["Agentic Workflows", "Vector DBs", "RAG Systems", "LLM Fine-tuning"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/70 border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 3: Cloud & Autonomous DevOps */}
        <div className="spotlight-card group relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(450px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(111, 207, 62, 0.4), transparent 60%)`,
            }}
          />
          <div className="relative h-full w-full rounded-[23px] bg-[#0C0E15] border border-white/10 p-7 flex flex-col justify-between overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(111, 207, 62, 0.08), transparent 50%)`,
              }}
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/25 text-lime text-xs font-semibold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                GLOBAL INFRASTRUCTURE
              </div>

              <h3 className="font-display text-2xl text-white mb-3">
                Cloud Architecture & Auto-Scaling DevOps
              </h3>
              <p className="text-white/70 text-[14px] leading-relaxed mb-6">
                Zero-downtime canary deployments, automated multi-cloud failovers, and Kubernetes clusters that scale dynamically with your user volume.
              </p>

              {/* Multi-Region Cluster Status */}
              <div className="rounded-2xl border border-white/10 bg-[#07080D] p-4 font-mono text-xs space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between text-white/50 pb-2 border-b border-white/5">
                  <span>ACTIVE REGIONS</span>
                  <span className="text-lime font-semibold">99.999% HEALTHY</span>
                </div>

                {[
                  { region: "us-east-1 (N. Virginia)", ping: "12ms", load: "34%" },
                  { region: "eu-west-1 (Frankfurt)", ping: "18ms", load: "28%" },
                  { region: "ap-southeast-1 (Singapore)", ping: "24ms", load: "41%" },
                ].map((r) => (
                  <div key={r.region} className="flex items-center justify-between text-white/70">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                      {r.region}
                    </span>
                    <span className="text-white/40">{r.ping}</span>
                  </div>
                ))}

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
                  <span>Dynamic Pods: 48 Auto-provisioned</span>
                  <span className="text-emerald-400">Canary: Active</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
              {["Kubernetes", "AWS / GCP / Azure", "Terraform", "Zero-Downtime"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/70 border border-white/5">
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
          <div className="relative h-full w-full rounded-[23px] bg-[#0C0E15] border border-white/10 p-7 flex flex-col justify-between overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(245, 158, 11, 0.08), transparent 50%)`,
              }}
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                SECURITY & COMPLIANCE
              </div>

              <h3 className="font-display text-2xl text-white mb-3">
                Zero-Trust Enterprise Systems & Modernization
              </h3>
              <p className="text-white/70 text-[14px] leading-relaxed mb-6">
                Transform obsolete legacy tech stacks into ultra-secure internal tools, ERP platforms, and cryptographically verified data meshes.
              </p>

              {/* Cryptographic Vault Widget */}
              <div className="rounded-2xl border border-white/10 bg-[#07080D] p-4 font-mono text-xs space-y-3 shadow-inner">
                <div className="flex items-center justify-between text-white/50 pb-2 border-b border-white/5">
                  <span className="flex items-center gap-2 text-amber-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    AES-GCM-256 ENCRYPTED
                  </span>
                  <span className="text-emerald-400">PASSED</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {["SOC 2 Type II", "ISO 27001", "HIPAA Ready", "GDPR Native"].map((cert) => (
                    <div key={cert} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between text-[11px] text-white/80">
                      <span>{cert}</span>
                      <span className="text-emerald-400">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
              {["Legacy Migration", "ERP Modernization", "Role-Based ACL", "Audit Logging"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/70 border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 5: Product Design & Interactive Systems (Col-span-1 md:col-span-2) */}
        <div className="spotlight-card group relative col-span-1 md:col-span-2 rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(168, 85, 247, 0.4), transparent 60%)`,
            }}
          />
          <div className="relative h-full w-full rounded-[23px] bg-[#0C0E15] border border-white/10 p-7 md:p-9 flex flex-col justify-between overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(800px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(168, 85, 247, 0.08), transparent 50%)`,
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-semibold tracking-wide mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  EXPERIENCE DESIGN & TOKENS
                </div>

                <h3 className="font-display text-2xl md:text-3xl text-white mb-3">
                  Product Design & Systematic Interaction Architecture
                </h3>
                <p className="text-white/70 text-[15px] leading-relaxed mb-6">
                  Great software doesn&apos;t just function — it feels fluid, predictable, and remarkably fast. We construct cohesive Figma design systems, micro-interactions, and accessible UI libraries that bridge the gap between design and engineering.
                </p>

                {/* Interactive Token Palette Controls */}
                <div className="space-y-3">
                  <p className="text-xs font-mono text-white/50">
                    LIVE THEME TOKEN PLAYGROUND — CLICK TO MUTATE ACCENT:
                  </p>
                  <div className="flex items-center gap-3">
                    {[
                      { id: "azure", label: "Azure #1E7FE8", color: "bg-[#1E7FE8]" },
                      { id: "lime", label: "Lime #6FCF3E", color: "bg-[#6FCF3E]" },
                      { id: "cyan", label: "Cyan #06B6D4", color: "bg-[#06B6D4]" },
                      { id: "violet", label: "Violet #A855F7", color: "bg-[#A855F7]" },
                    ].map((swatch) => (
                      <button
                        key={swatch.id}
                        type="button"
                        onClick={() => setActiveColor(swatch.id as any)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                          activeColor === swatch.id
                            ? "border-white bg-white/10 text-white font-semibold shadow-lg scale-105"
                            : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/30"
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${swatch.color}`} />
                        <span className="hidden sm:inline">{swatch.id.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Reactive UI Card Preview */}
              <div className="lg:col-span-5">
                <div
                  className="rounded-2xl border p-5 transition-all duration-300 shadow-2xl relative overflow-hidden"
                  style={{
                    backgroundColor: "#07080D",
                    borderColor: colorStyles[activeColor].glow,
                    boxShadow: `0 0 35px -5px ${colorStyles[activeColor].glow}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-xl ${colorStyles[activeColor].bg} ${colorStyles[activeColor].text} flex items-center justify-center font-bold text-xs border ${colorStyles[activeColor].border}`}>
                        NT
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold">Interactive Token Host</div>
                        <div className="text-white/40 text-[10px] font-mono">accent: var(--brand-{activeColor})</div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${colorStyles[activeColor].bg} ${colorStyles[activeColor].text} border ${colorStyles[activeColor].border}`}>
                      Active
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden mb-4">
                    <motion.div
                      className={`h-full rounded-full ${
                        activeColor === "azure"
                          ? "bg-azure"
                          : activeColor === "lime"
                          ? "bg-lime"
                          : activeColor === "cyan"
                          ? "bg-cyan-400"
                          : "bg-purple-500"
                      }`}
                      animate={{ width: ["30%", "85%", "65%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-white/5">
                    <span className="text-white/50 text-[11px]">Design System Ver: 3.4.0</span>
                    <button
                      type="button"
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        activeColor === "azure"
                          ? "bg-azure text-white"
                          : activeColor === "lime"
                          ? "bg-lime text-black"
                          : activeColor === "cyan"
                          ? "bg-cyan-400 text-black"
                          : "bg-purple-500 text-white"
                      } transition-colors`}
                    >
                      Action Component
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
              {["Figma Design Systems", "Micro-Interactions", "WCAG AAA Accessibility", "Token Sync", "User Research"].map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-white/70 border border-white/5">
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
          <div className="relative h-full w-full rounded-[23px] bg-[#0C0E15] border border-white/10 p-7 flex flex-col justify-between overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(59, 130, 246, 0.08), transparent 50%)`,
              }}
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                EXECUTIVE ADVISORY
              </div>

              <h3 className="font-display text-2xl text-white mb-3">
                Fractional CTO & Strategic Architecture
              </h3>
              <p className="text-white/70 text-[14px] leading-relaxed mb-6">
                Senior engineering direction for tech roadmaps, vendor evaluations, security audits, and institutional fundraising due diligence.
              </p>

              {/* Metrics & Handover Gauge */}
              <div className="rounded-2xl border border-white/10 bg-[#07080D] p-4 font-mono text-xs space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between text-white/50 pb-2 border-b border-white/5">
                  <span>ENG VELOCITY MULTIPLIER</span>
                  <span className="text-azure font-bold">+3.8x</span>
                </div>

                <div className="space-y-2 text-white/80 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Zero Tech-Debt Architectural Audits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Investor Technical Due Diligence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Total In-House Team Handover</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
              {["Tech Diligence", "Roadmap Scoping", "Vendor Audit", "Hiring & Mentorship"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/70 border border-white/5">
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
