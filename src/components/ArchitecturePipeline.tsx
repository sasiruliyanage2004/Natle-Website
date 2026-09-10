"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepDetail {
  id: string;
  stepNum: string;
  shortName: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  guarantee: string;
}

const PIPELINE_STEPS: StepDetail[] = [
  {
    id: "ingress",
    stepNum: "01",
    shortName: "Edge Ingress",
    title: "Global Anycast Edge Ingress",
    subtitle: "Low-latency TLS 1.3 handshakes terminating at 300+ edge locations",
    description:
      "Incoming requests are intercepted at the nearest metropolitan point of presence via BGP Anycast routing. TLS handshakes and DDoS mitigations occur entirely at the edge before traffic enters our private backbone.",
    tech: ["BGP Anycast", "TLS 1.3 / QUIC", "Cloudflare Fabric", "eBPF Packet Scrubbing"],
    metrics: [
      { label: "Handshake Overhead", value: "< 1.2ms" },
      { label: "DDoS Capacity", value: "Multi-Tbps" },
      { label: "Edge Proximity", value: "95% < 15ms" },
    ],
    guarantee: "Zero cold-start penalty on edge termination with global connection reuse.",
  },
  {
    id: "gateway",
    stepNum: "02",
    shortName: "API Gateway",
    title: "Semantic Routing & API Gateway",
    subtitle: "Zero-copy gRPC deserialization and intelligent request dispatching",
    description:
      "The gateway decomposes incoming payloads, validates cryptographic JWT tokens, and routes traffic across internal microservices using high-throughput gRPC over HTTP/2 with distributed tracing.",
    tech: ["Go Microservices", "gRPC / Protobuf", "Envoy Proxy", "OpenTelemetry Tracing"],
    metrics: [
      { label: "Routing Latency", value: "< 0.6ms" },
      { label: "Throughput", value: "180,000 req/s" },
      { label: "Token Validation", value: "Sub-millisecond" },
    ],
    guarantee: "Deterministic single-pass payload inspection with zero memory allocations.",
  },
  {
    id: "state",
    stepNum: "03",
    shortName: "Vector & State",
    title: "Distributed State & Vector Knowledge",
    subtitle: "Multi-tenant HNSW vector search with ACID transactional state",
    description:
      "High-dimensional vector embeddings are queried across sharded indices in parallel with transactional relational state. We ensure strict consistency, sub-5ms cosine similarity lookup, and automated multi-region replication.",
    tech: ["Milvus / Qdrant", "PostgreSQL / Raft", "Redis Cluster", "HNSW Indexing"],
    metrics: [
      { label: "Vector Search P99", value: "4.2ms" },
      { label: "Replication Factor", value: "3x Cross-Region" },
      { label: "Cache Hit Ratio", value: "97.4%" },
    ],
    guarantee: "100% ACID compliance with automatic multi-datacenter failover.",
  },
  {
    id: "compute",
    stepNum: "04",
    shortName: "Neural Compute",
    title: "Quantized Compute & Neural Inference",
    subtitle: "High-density model execution and distributed business logic",
    description:
      "Core business algorithms and AI inference models execute in parallel on dedicated GPU and high-frequency CPU worker pools. Dynamic continuous batching maximizes throughput without adding latency jitter.",
    tech: ["vLLM / Triton", "CUDA Kernels", "Rust Micro-engines", "Kafka Pipelines"],
    metrics: [
      { label: "Inference Latency", value: "8.8ms" },
      { label: "Batch Efficiency", value: "99.2%" },
      { label: "GPU Saturation", value: "89% Optimal" },
    ],
    guarantee: "Sub-10ms token generation with elastic auto-scaling based on queue depth.",
  },
  {
    id: "delivery",
    stepNum: "05",
    shortName: "Edge Delivery",
    title: "Real-Time Streaming Delivery",
    subtitle: "Multiplexed Server-Sent Events and instant client hydration",
    description:
      "Results, token streams, and transactional confirmations are compressed using Brotli-11 and pushed back to client devices over persistent multiplexed channels, delivering immediate visual feedback.",
    tech: ["HTTP/3 Streaming", "Server-Sent Events", "Brotli Compression", "Edge WebSocket"],
    metrics: [
      { label: "First Chunk TTFB", value: "< 14ms" },
      { label: "Packet Loss", value: "0.000%" },
      { label: "Client Hydration", value: "Instantaneous" },
    ],
    guarantee: "Smooth word-by-word streaming rendering without UI blocking.",
  },
];

export default function ArchitecturePipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Calculate step index from 0 to 4 based on scroll progress
          const index = Math.min(
            PIPELINE_STEPS.length - 1,
            Math.max(0, Math.floor(p * PIPELINE_STEPS.length))
          );
          setActiveStepIndex(index);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const activeStep = PIPELINE_STEPS[activeStepIndex];

  // Jump to step by clicking
  const handleStepClick = (idx: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + (idx / (PIPELINE_STEPS.length - 1)) * sectionHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-transparent text-ink"
      style={{ height: "300vh" }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 md:py-16 overflow-hidden">
        {/* Soft Ambient Fluid Mesh Orbs (Option 01) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Subtle Blueprint Dot Grid */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(rgba(10, 10, 10, 0.08) 1px, transparent 1px)`,
              backgroundSize: "36px 36px",
            }}
          />
          {/* Drifting Azure Fluid Glow Orb */}
          <div className="absolute top-1/4 -left-32 w-[650px] h-[550px] rounded-full bg-azure/10 blur-[140px] animate-pulse" style={{ animationDuration: "9s" }} />
          {/* Drifting Teal Fluid Glow Orb */}
          <div className="absolute bottom-1/4 -right-32 w-[600px] h-[500px] rounded-full bg-teal/10 blur-[150px] animate-pulse" style={{ animationDuration: "11s" }} />
          {/* Center Lime Fluid Glow Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-lime/10 blur-[160px] animate-pulse" style={{ animationDuration: "14s" }} />
        </div>

        <div className="container-content relative z-10 w-full flex-1 flex flex-col justify-between">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-azure text-xs font-mono font-semibold tracking-widest uppercase mb-2">
                SYSTEM ARCHITECTURE
              </div>
              <h2 className="font-display text-2xl md:text-4xl text-ink">
                Sub-Millisecond Execution Pipeline
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-ink/60 bg-white border border-ink/10 px-4 py-2 rounded-xl shadow-sm">
              <span>SCROLL PROGRESS:</span>
              <span className="text-azure font-semibold">
                STEP {activeStep.stepNum} OF 05
              </span>
              <div className="w-16 h-1.5 bg-ink/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-azure rounded-full transition-all duration-150"
                  style={{ width: `${Math.min(100, Math.max(5, scrollProgress * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stepped Node Rail (Interactive / Scroll-Driven) */}
          <div className="my-6 md:my-8">
            <div className="relative">
              {/* Background connecting rail */}
              <div className="hidden lg:block absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-ink/10 z-0" />
              
              {/* Animated Progress Beam */}
              <div
                className="hidden lg:block absolute top-1/2 left-4 -translate-y-1/2 h-[2px] bg-gradient-to-r from-azure via-teal to-lime z-0 transition-all duration-150"
                style={{
                  width: `${Math.min(100, (activeStepIndex / (PIPELINE_STEPS.length - 1)) * 96)}%`,
                }}
              />

              {/* 5 Pipeline Step Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 md:gap-3 relative z-10">
                {PIPELINE_STEPS.map((step, idx) => {
                  const isActive = idx === activeStepIndex;
                  const isCompleted = idx < activeStepIndex;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => handleStepClick(idx)}
                      className={`p-3.5 md:p-4 rounded-2xl text-left transition-all duration-300 border relative backdrop-blur-md ${
                        isActive
                          ? "bg-white border-azure shadow-[0_8px_30px_rgba(30,127,232,0.18)] scale-[1.02]"
                          : isCompleted
                          ? "bg-white border-emerald-200 text-ink/80 shadow-xs"
                          : "bg-white/80 border-ink/8 text-ink/50 hover:border-ink/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded-md ${
                            isActive
                              ? "bg-azure text-white font-semibold shadow-xs"
                              : isCompleted
                              ? "bg-emerald-50 text-emerald-600 font-semibold border border-emerald-200"
                              : "bg-mist text-ink/50 border border-ink/5"
                          }`}
                        >
                          {isCompleted ? "✓ DONE" : `STAGE ${step.stepNum}`}
                        </span>

                        <span
                          className={`w-2 h-2 rounded-full ${
                            isActive
                              ? "bg-azure animate-pulse shadow-[0_0_8px_#1E7FE8]"
                              : isCompleted
                              ? "bg-emerald-500"
                              : "bg-ink/20"
                          }`}
                        />
                      </div>

                      <div
                        className={`font-display text-xs md:text-sm font-semibold truncate ${
                          isActive ? "text-ink" : isCompleted ? "text-ink/85" : "text-ink/50"
                        }`}
                      >
                        {step.shortName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Active Step Stage */}
          <div className="rounded-3xl border border-ink/10 bg-white/90 backdrop-blur-xl p-6 md:p-10 shadow-xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Column: Architectural Narrative */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-3xl md:text-4xl text-azure font-bold">
                      {activeStep.stepNum}
                    </span>
                    <div className="h-6 w-[1px] bg-ink/15" />
                    <span className="text-ink/50 text-xs font-mono tracking-wide uppercase">
                      ACTIVE ARCHITECTURE STAGE
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-ink mb-2">
                    {activeStep.title}
                  </h3>

                  <p className="text-azure text-sm font-semibold mb-4">
                    {activeStep.subtitle}
                  </p>

                  <p className="text-ink/70 text-[14px] md:text-[15px] leading-relaxed mb-6 max-w-2xl">
                    {activeStep.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-ink/5">
                    {activeStep.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full bg-mist text-ink/75 border border-ink/10 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Concrete Engineering Telemetry Pod */}
                <div className="lg:col-span-5 rounded-2xl border border-black/10 bg-[#090A10] text-white p-6 font-mono text-xs space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-white/50">STAGE TELEMETRY</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      100% OPERATIONAL
                    </span>
                  </div>

                  {/* 3 Metrics */}
                  <div className="space-y-3">
                    {activeStep.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/5"
                      >
                        <span className="text-white/60">{m.label}</span>
                        <span className="text-azure font-semibold text-sm">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Architectural Guarantee */}
                  <div className="pt-3 border-t border-white/10 text-[11px] text-white/60 leading-relaxed">
                    <span className="text-white font-semibold block mb-0.5">Architectural Guarantee:</span>
                    {activeStep.guarantee}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Scroll Cue */}
          <div className="pt-4 flex items-center justify-between text-xs font-mono text-ink/40">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-azure animate-ping" />
              <span>SCROLL DOWN TO ADVANCE PIPELINE</span>
            </div>
            <div className="hidden sm:block">
              ENGINEERED BY NATLE CORE PLATFORM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
