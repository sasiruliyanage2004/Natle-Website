"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeData {
  id: string;
  name: string;
  role: string;
  tech: string;
  latency: string;
  throughput: string;
  protocol: string;
  status: "optimal" | "rerouted" | "active";
  description: string;
  stats: { label: string; value: string }[];
}

interface Scenario {
  id: "ai" | "fintech" | "cloud";
  name: string;
  tag: string;
  description: string;
  nodes: NodeData[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "ai",
    name: "Enterprise AI & RAG Pipeline",
    tag: "SUB-12MS INFERENCE",
    description:
      "End-to-end proprietary retrieval-augmented generation pipeline with real-time vector embeddings and quantized neural streaming.",
    nodes: [
      {
        id: "ai-client",
        name: "Client Ingress",
        role: "Edge API & App Router",
        tech: "Next.js 14 / HTTP/3",
        latency: "1.2 ms",
        throughput: "45,000 req/s",
        protocol: "HTTP/3 over QUIC",
        status: "optimal",
        description: "Zero-latency edge TLS handshake terminating user queries at nearest metropolitan point of presence.",
        stats: [
          { label: "TLS Termination", value: "0.8ms" },
          { label: "Edge Cache Hit", value: "98.4%" },
          { label: "Concurrency", value: "100k+ users" },
        ],
      },
      {
        id: "ai-router",
        name: "Semantic Gateway",
        role: "Query Decomposition",
        tech: "Rust / Cloudflare Workers",
        latency: "3.4 ms",
        throughput: "38,200 req/s",
        protocol: "gRPC Streaming",
        status: "optimal",
        description: "Deconstructs natural language queries, performs intent classification, and directs semantic routing.",
        stats: [
          { label: "Intent Accuracy", value: "99.9%" },
          { label: "Zero-Copy Deserialization", value: "Active" },
          { label: "Guardrail Filtering", value: "< 1.1ms" },
        ],
      },
      {
        id: "ai-vector",
        name: "Vector Knowledge DB",
        role: "HNSW Dense Retrieval",
        tech: "Milvus / Qdrant Distributed",
        latency: "4.8 ms",
        throughput: "24,000 queries/s",
        protocol: "Binary Vector IPC",
        status: "optimal",
        description: "Searches billions of 1536-dimensional proprietary business vectors using cosine distance algorithms.",
        stats: [
          { label: "Index Type", value: "HNSW + IVFPQ" },
          { label: "Recall @ 10", value: "99.4%" },
          { label: "Index Shards", value: "32 Nodes" },
        ],
      },
      {
        id: "ai-cluster",
        name: "Quantized Neural Engine",
        role: "Tensor Inference Engine",
        tech: "vLLM / Triton Server",
        latency: "8.6 ms",
        throughput: "185 tokens/s",
        protocol: "Server-Sent Events",
        status: "optimal",
        description: "Executes 4-bit AWQ quantized multi-head attention heads with dynamic continuous token batching.",
        stats: [
          { label: "Memory Bandwidth", value: "3.2 TB/s" },
          { label: "KV Cache Hit", value: "92.1%" },
          { label: "GPU Utilization", value: "88%" },
        ],
      },
      {
        id: "ai-cache",
        name: "Streaming Edge Cache",
        role: "Delta Serialization",
        tech: "Upstash Redis / Anycast",
        latency: "0.9 ms",
        throughput: "82,000 events/s",
        protocol: "WebSocket / SSE",
        status: "optimal",
        description: "Streams reconstructed token chunks back to client devices with smooth word-by-word UI rendering.",
        stats: [
          { label: "P99 Jitter", value: "< 0.4ms" },
          { label: "Compression", value: "Brotli 11" },
          { label: "Delivery SLA", value: "100%" },
        ],
      },
    ],
  },
  {
    id: "fintech",
    name: "High-Throughput Fintech & Web3",
    tag: "ZERO-KNOWLEDGE FINALITY",
    description:
      "Deterministic order execution engine with cryptographically validated state transitions and sub-millisecond settlement.",
    nodes: [
      {
        id: "fn-feed",
        name: "Market Feed Gateway",
        role: "Order Ingestion",
        tech: "C++20 / DPDK Kernel Bypass",
        latency: "0.4 ms",
        throughput: "250,000 msg/s",
        protocol: "FIX 5.0 / WebSockets",
        status: "optimal",
        description: "Processes institutional order feeds with direct hardware network card queue bypass.",
        stats: [
          { label: "Packet Drop", value: "0.000%" },
          { label: "Jitter Window", value: "240ns" },
          { label: "NIC Polling", value: "Kernel Bypass" },
        ],
      },
      {
        id: "fn-engine",
        name: "LMAX Matching Engine",
        role: "Deterministic Sequencer",
        tech: "Disruptor Ring Buffer",
        latency: "1.1 ms",
        throughput: "180,000 matches/s",
        protocol: "Zero-Copy Shared Memory",
        status: "optimal",
        description: "Lock-free single-threaded ring buffer executing deterministic order book state matching.",
        stats: [
          { label: "Book Depth", value: "1,000 Levels" },
          { label: "Matching P99", value: "0.8ms" },
          { label: "State Checkpoint", value: "Real-time" },
        ],
      },
      {
        id: "fn-zk",
        name: "zk-SNARK Prover",
        role: "Cryptographic Proofs",
        tech: "Halo2 / Plonky3 CUDA",
        latency: "14.2 ms",
        throughput: "12,000 proofs/min",
        protocol: "Binary Proof Format",
        status: "optimal",
        description: "Generates zero-knowledge validity proofs certifying solvency and trade validity without revealing balances.",
        stats: [
          { label: "Circuit Constraints", value: "2^20 gates" },
          { label: "Proof Size", value: "480 bytes" },
          { label: "Verification Time", value: "< 2ms" },
        ],
      },
      {
        id: "fn-vault",
        name: "Multi-Sig HSM Vault",
        role: "Key Sharding & Signing",
        tech: "FIPS 140-2 Level 3 HSM",
        latency: "2.8 ms",
        throughput: "8,500 signs/s",
        protocol: "mTLS Encrypted Bus",
        status: "optimal",
        description: "Hardware Security Module executing threshold MPC Ed25519 cryptographic authorizations.",
        stats: [
          { label: "Threshold", value: "3 of 5 Shards" },
          { label: "Key Extraction", value: "Zero Surface" },
          { label: "Air-Gapped Sync", value: "Active" },
        ],
      },
      {
        id: "fn-ledger",
        name: "Settlement Ledger",
        role: "Atomic State Commitment",
        tech: "BFT Consensus Engine",
        latency: "3.5 ms",
        throughput: "65,000 tx/s",
        protocol: "Parallel State Machine",
        status: "optimal",
        description: "Commits immutable double-entry ledger transactions with sub-second finality guarantee.",
        stats: [
          { label: "Finality", value: "Instantaneous" },
          { label: "Fault Tolerance", value: "33% Byzantine" },
          { label: "Audit Log", value: "Merkle DAG" },
        ],
      },
    ],
  },
  {
    id: "cloud",
    name: "Autonomous Cloud & Edge Mesh",
    tag: "99.999% SELF-HEALING",
    description:
      "Global Kubernetes service mesh with predictive auto-scaling, distributed edge failovers, and automatic chaos remediation.",
    nodes: [
      {
        id: "cl-ingress",
        name: "Anycast Edge Fabric",
        role: "DDoS Mitigation & Ingress",
        tech: "BGP Anycast / Envoy",
        latency: "2.1 ms",
        throughput: "500,000 req/s",
        protocol: "TLS 1.3 / HTTP/3",
        status: "optimal",
        description: "Absorbs multi-terabit volumetric traffic attacks while routing requests to nearest cluster.",
        stats: [
          { label: "Attack Scrubbing", value: "Automated" },
          { label: "Edge PoPs", value: "320+ Cities" },
          { label: "Global Routing", value: "Latency-Optimized" },
        ],
      },
      {
        id: "cl-scaler",
        name: "Predictive Auto-Scaler",
        role: "ML Resource Forecasting",
        tech: "Custom K8s Operator / Go",
        latency: "4.2 ms",
        throughput: "15,000 metrics/s",
        protocol: "Prometheus Metric Bus",
        status: "optimal",
        description: "Pre-provisions Kubernetes compute pods 90 seconds prior to anticipated traffic spikes.",
        stats: [
          { label: "Forecast Accuracy", value: "96.4%" },
          { label: "Cold Start Time", value: "< 180ms" },
          { label: "Cost Savings", value: "42% vs Static" },
        ],
      },
      {
        id: "cl-mesh",
        name: "Service Mesh Mesh",
        role: "Zero-Trust Service Router",
        tech: "Istio / eBPF Cilium",
        latency: "0.6 ms",
        throughput: "320,000 req/s",
        protocol: "mTLS WireGuard",
        status: "optimal",
        description: "Kernel-level eBPF packet routing between microservices with cryptographically enforced identity.",
        stats: [
          { label: "Kernel Overhead", value: "Negligible" },
          { label: "Mutual TLS", value: "100% Enforced" },
          { label: "Circuit Breaking", value: "Adaptive" },
        ],
      },
      {
        id: "cl-db",
        name: "Distributed Sharded DB",
        role: "Multi-Region Consistency",
        tech: "CockroachDB / Raft",
        latency: "5.4 ms",
        throughput: "95,000 writes/s",
        protocol: "PostgreSQL Wire v3",
        status: "optimal",
        description: "Globally distributed ACID transactional database surviving whole datacenter outages without data loss.",
        stats: [
          { label: "Isolation Level", value: "Serializable" },
          { label: "Replication Factor", value: "5x Geographic" },
          { label: "RPO / RTO", value: "0 sec / < 1 sec" },
        ],
      },
      {
        id: "cl-heal",
        name: "Self-Healing Sentinel",
        role: "Chaos Engineering & Recovery",
        tech: "OpenTelemetry / Vector",
        latency: "1.5 ms",
        throughput: "1.2M events/s",
        protocol: "OTLP gRPC",
        status: "optimal",
        description: "Continuously injects synthetic tests, detects anomalies in microseconds, and restarts unhealthy workloads.",
        stats: [
          { label: "MTTR", value: "< 4.5 seconds" },
          { label: "Log Ingestion", value: "Real-time" },
          { label: "Remediation", value: "Zero Human Touch" },
        ],
      },
    ],
  },
];

export default function ArchitectureSandbox() {
  const [activeScenarioId, setActiveScenarioId] = useState<"ai" | "fintech" | "cloud">("ai");
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [isSurgeActive, setIsSurgeActive] = useState<boolean>(false);
  const [simulatedLoad, setSimulatedLoad] = useState<number>(42);
  const [lastBurstTime, setLastBurstTime] = useState<string | null>(null);

  const currentScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];
  const currentNode = currentScenario.nodes[selectedNodeIndex] || currentScenario.nodes[0];

  // Auto reset selected node when scenario switches
  const handleScenarioChange = (id: "ai" | "fintech" | "cloud") => {
    setActiveScenarioId(id);
    setSelectedNodeIndex(0);
  };

  // Trigger high-speed network traffic burst simulation
  const handleTriggerBurst = () => {
    setIsSurgeActive(true);
    setSimulatedLoad(98);
    const now = new Date();
    setLastBurstTime(
      `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now.getMilliseconds().toString().padStart(3, "0")}`
    );

    setTimeout(() => {
      setIsSurgeActive(false);
      setSimulatedLoad(44);
    }, 2400);
  };

  return (
    <section className="py-28 lg:py-32 bg-[#06070B] text-white relative overflow-hidden border-t border-white/5">
      {/* Background Ambient Glow & Grid Matrix */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(rgba(30, 127, 232, 0.25) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-azure/20 blur-[140px] rounded-full" />
      </div>

      <div className="container-content relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-azure/10 border border-azure/30 text-azure text-xs font-mono font-semibold tracking-wider uppercase mb-5">
            <span className="w-2 h-2 rounded-full bg-azure animate-ping" />
            LIVE TELEMETRY SIMULATOR
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-5">
            Interactive Architecture <span className="text-gradient">Sandbox</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            Switch between production topologies, click individual nodes to inspect live protocol telemetry, and simulate high-concurrency traffic bursts.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
          {SCENARIOS.map((scenario) => {
            const isActive = scenario.id === activeScenarioId;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleScenarioChange(scenario.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs md:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-white/10 border-azure text-white shadow-[0_0_25px_rgba(30,127,232,0.3)] scale-[1.02]"
                    : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:border-white/25 hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? "bg-azure animate-pulse" : "bg-white/30"
                  }`}
                />
                <span>{scenario.name}</span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                  {scenario.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sandbox Canvas Container */}
        <div className="rounded-3xl border border-white/10 bg-[#0A0C13] p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                <span className="text-azure font-semibold">TOPOLOGY:</span>
                <span>{currentScenario.name}</span>
              </div>
              <p className="text-white/60 text-xs mt-1 max-w-xl">
                {currentScenario.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleTriggerBurst}
                disabled={isSurgeActive}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 border ${
                  isSurgeActive
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-azure hover:bg-azure-light text-white border-azure shadow-lg hover:shadow-azure/30"
                }`}
              >
                {isSurgeActive ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>INJECTING 500K REQ BURST...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>SIMULATE TRAFFIC BURST</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Topology Graph Visualizer */}
          <div className="mb-10 relative">
            <div className="text-[11px] font-mono text-white/40 mb-3 flex items-center justify-between">
              <span>ACTIVE DATA PIPELINE FLOW (CLICK ANY NODE TO INSPECT TELEMETRY)</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Zero Packet Loss
              </span>
            </div>

            {/* Horizontal Nodes Sequence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
              {currentScenario.nodes.map((node, index) => {
                const isSelected = index === selectedNodeIndex;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeIndex(index)}
                    className={`relative p-4 rounded-2xl text-left transition-all duration-300 border group ${
                      isSelected
                        ? "bg-white/[0.08] border-azure shadow-[0_0_30px_rgba(30,127,232,0.35)] scale-[1.02]"
                        : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]"
                    }`}
                  >
                    {/* Node step number */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-white/50">
                        STEP 0{index + 1}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSurgeActive
                            ? "bg-emerald-400 animate-ping"
                            : isSelected
                            ? "bg-azure animate-pulse"
                            : "bg-white/20"
                        }`}
                      />
                    </div>

                    <div className="font-display text-sm md:text-[15px] text-white font-semibold mb-1 group-hover:text-azure transition-colors">
                      {node.name}
                    </div>
                    <div className="text-xs text-white/50 mb-2 truncate">
                      {node.role}
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-white/40">Latency</span>
                      <span className={isSelected ? "text-azure font-semibold" : "text-emerald-400"}>
                        {isSurgeActive ? "< 0.8ms" : node.latency}
                      </span>
                    </div>

                    {/* Connecting Chevron on desktop for nodes that aren't the last */}
                    {index < currentScenario.nodes.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                        <div className="w-5 h-5 rounded-full bg-[#0A0C13] border border-white/15 flex items-center justify-center text-[10px] text-azure">
                          →
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Simulated Animated Data Stream Flow Rail */}
            <div className="mt-5 p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between overflow-hidden relative">
              <div className="flex items-center gap-3 font-mono text-xs text-white/60">
                <span className="flex items-center gap-1.5 text-azure">
                  <span className="w-2 h-2 rounded-full bg-azure animate-pulse" />
                  PACKET BUS:
                </span>
                <span className="hidden md:inline text-white/80">
                  {isSurgeActive ? "BURST PACKETS FLOODING WIRE [500K REQ/S]" : "STEADY EMISSION (TLS 1.3 / QUIC)"}
                </span>
              </div>

              {/* Animated Light Packet Rail */}
              <div className="absolute inset-y-0 left-44 right-44 hidden md:block overflow-hidden">
                <motion.div
                  className="h-full w-24 bg-gradient-to-r from-transparent via-azure to-transparent opacity-75"
                  animate={{ x: ["-100%", "500%"] }}
                  transition={{
                    duration: isSurgeActive ? 0.6 : 1.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              <div className="font-mono text-xs text-white/50">
                {lastBurstTime ? `Last Surge: ${lastBurstTime}` : "System Status: 100% HEALTHY"}
              </div>
            </div>
          </div>

          {/* Node Inspector Drawer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNode.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-white/10 bg-[#07080E] p-6 md:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Node Identity & Details */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-azure/10 border border-azure/30 text-azure text-xs font-mono font-semibold">
                      SELECTED SUBSYSTEM
                    </span>
                    <span className="text-white/40 text-xs font-mono">
                      TECH: <span className="text-white">{currentNode.tech}</span>
                    </span>
                    <span className="text-white/40 text-xs font-mono">
                      WIRE: <span className="text-white">{currentNode.protocol}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                    {currentNode.name}
                  </h3>
                  <p className="text-azure text-sm font-semibold mb-4">
                    {currentNode.role}
                  </p>
                  <p className="text-white/70 text-[14px] leading-relaxed max-w-2xl mb-6">
                    {currentNode.description}
                  </p>

                  {/* Benchmark Stat Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {currentNode.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-white/5 bg-white/[0.02] p-3 font-mono"
                      >
                        <div className="text-white/40 text-[10px] uppercase mb-1">
                          {stat.label}
                        </div>
                        <div className="text-white font-semibold text-xs md:text-sm">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Live Telemetry Gauges */}
                <div className="lg:col-span-5 rounded-xl border border-white/10 bg-[#0B0D15] p-5 font-mono text-xs space-y-4 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="text-white/50">LIVE TELEMETRY MONITOR</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      OPTIMAL
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-white/60 mb-1">
                        <span>P99 RESPONSE TIME</span>
                        <span className="text-azure font-semibold">
                          {isSurgeActive ? "0.74 ms" : currentNode.latency}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-azure rounded-full transition-all duration-500"
                          style={{ width: isSurgeActive ? "22%" : "38%" }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-white/60 mb-1">
                        <span>THROUGHPUT</span>
                        <span className="text-emerald-400 font-semibold">
                          {isSurgeActive ? "520,000 req/s" : currentNode.throughput}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: isSurgeActive ? "95%" : "62%" }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-white/60 mb-1">
                        <span>SYSTEM LOAD</span>
                        <span className="text-white/80 font-semibold">{simulatedLoad}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-lime rounded-full transition-all duration-500"
                          style={{ width: `${simulatedLoad}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
                    <span>Audit Status: Passed (0 CVE)</span>
                    <span className="text-white/70">Verified by NATLE Ops</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
