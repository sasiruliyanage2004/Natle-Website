"use client";

import React, { useState } from "react";
import Reveal from "./Reveal";

export default function ArchitectureSimulator() {
  const [rps, setRps] = useState<number>(120000);
  const [edgeCache, setEdgeCache] = useState<boolean>(true);
  const [multiRegion, setMultiRegion] = useState<boolean>(true);

  // Real-time calculation models
  const latency = edgeCache
    ? (3.4 + (rps / 500000) * 6.2 - (multiRegion ? 1.2 : 0)).toFixed(1)
    : (68 + (rps / 500000) * 115 - (multiRegion ? 18 : 0)).toFixed(1);

  const cacheHitRate = edgeCache ? (97.4 - (rps / 500000) * 3.1).toFixed(1) : "0.0";
  const monthlySavings = edgeCache
    ? Math.round((rps / 1000) * 385 + (multiRegion ? 12000 : 0))
    : 0;

  const isHighLoad = rps > 350000 && !edgeCache;

  return (
    <section className="py-24 lg:py-28 bg-transparent relative overflow-hidden">
      <div className="container-content relative z-10">
        
        {/* Header */}
        <Reveal className="max-w-2xl mb-12">
          <span className="text-azure font-mono font-semibold text-xs tracking-widest uppercase mb-3 block">
            LIVE SYSTEM PLAYGROUND
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-ink dark:text-white leading-tight mb-4">
            Stress-test our architecture under extreme enterprise load.
          </h2>
          <p className="text-ink/60 dark:text-white/60 text-base max-w-xl">
            Dial throughput, toggle global multi-tier caching, and simulate multi-region distribution to observe real-time P99 latency and cluster economics.
          </p>
        </Reveal>

        {/* Interactive Dashboard Container */}
        <Reveal>
          <div className="rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-ink/8 dark:border-white/10 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-card transition-all">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Controls Column (Col 5) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Control 1: Traffic Throughput Slider */}
                <div className="p-5 rounded-2xl bg-paper dark:bg-white/[0.03] border border-ink/5 dark:border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-mono font-semibold text-ink/70 dark:text-white/70 uppercase tracking-wider">
                      CONCURRENT LOAD (RPS)
                    </label>
                    <span className="text-base font-display text-azure font-bold font-mono">
                      {rps.toLocaleString()} req/s
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={rps}
                    onChange={(e) => setRps(Number(e.target.value))}
                    className="w-full h-2 bg-ink/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#1E7FE8]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-ink/40 dark:text-white/40 mt-2">
                    <span>10k RPS</span>
                    <span>250k RPS</span>
                    <span>500k RPS</span>
                  </div>
                </div>

                {/* Control 2: Global Edge Cache Toggle */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-paper dark:bg-white/[0.03] border border-ink/5 dark:border-white/5">
                  <div>
                    <span className="block text-sm font-semibold text-ink dark:text-white">
                      Global Edge Caching Layer
                    </span>
                    <span className="text-xs text-ink/50 dark:text-white/50">
                      Multi-tier CDN edge compute with sub-millisecond cache hits
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEdgeCache(!edgeCache)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      edgeCache ? "bg-azure" : "bg-ink/20 dark:bg-white/20"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        edgeCache ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Control 3: Multi-Region Active-Active Replication */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-paper dark:bg-white/[0.03] border border-ink/5 dark:border-white/5">
                  <div>
                    <span className="block text-sm font-semibold text-ink dark:text-white">
                      Active-Active Multi-Region
                    </span>
                    <span className="text-xs text-ink/50 dark:text-white/50">
                      Dynamic geo-routing across 4 global availability clusters
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMultiRegion(!multiRegion)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      multiRegion ? "bg-teal" : "bg-ink/20 dark:bg-white/20"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        multiRegion ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

              </div>

              {/* Real-time Benchmark Outputs Column (Col 7) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                
                {/* Live Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  
                  {/* Gauge 1: P99 Latency */}
                  <div className="p-4 rounded-2xl bg-paper dark:bg-white/[0.02] border border-ink/5 dark:border-white/5">
                    <span className="text-xs font-mono uppercase text-ink/50 dark:text-white/50 block mb-1">
                      P99 LATENCY
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-display font-bold ${
                        isHighLoad ? "text-rose-500" : Number(latency) < 10 ? "text-emerald-500" : "text-azure"
                      }`}>
                        {latency}
                      </span>
                      <span className="text-xs font-mono text-ink/40 dark:text-white/40">ms</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-500 flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {Number(latency) < 10 ? "Optimal Ultra-Fast" : "Origin Bound"}
                    </span>
                  </div>

                  {/* Gauge 2: Cache Hit Ratio */}
                  <div className="p-4 rounded-2xl bg-paper dark:bg-white/[0.02] border border-ink/5 dark:border-white/5">
                    <span className="text-xs font-mono uppercase text-ink/50 dark:text-white/50 block mb-1">
                      CACHE HIT RATIO
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-display font-bold text-ink dark:text-white">
                        {cacheHitRate}
                      </span>
                      <span className="text-xs font-mono text-ink/40 dark:text-white/40">%</span>
                    </div>
                    <span className="text-[11px] font-mono text-ink/40 dark:text-white/40 block mt-1">
                      {edgeCache ? "Bypassing Origin" : "Direct Hits"}
                    </span>
                  </div>

                  {/* Gauge 3: Estimated Savings */}
                  <div className="p-4 rounded-2xl bg-paper dark:bg-white/[0.02] border border-ink/5 dark:border-white/5 col-span-2 sm:col-span-1">
                    <span className="text-xs font-mono uppercase text-ink/50 dark:text-white/50 block mb-1">
                      CLOUD COST REDUCTION
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-display font-bold text-teal">
                        ${(monthlySavings / 1000).toFixed(0)}k
                      </span>
                      <span className="text-xs font-mono text-ink/40 dark:text-white/40">/mo</span>
                    </div>
                    <span className="text-[11px] font-mono text-teal/80 block mt-1">
                      Bandwidth Egress Saved
                    </span>
                  </div>

                </div>

                {/* Animated Topology Visualization */}
                <div className="relative p-6 rounded-2xl bg-ink text-white overflow-hidden border border-white/10 shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-mono text-white/70 uppercase">
                        LIVE TOPOLOGY PIPELINE
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/40">
                      SLA: 99.999%
                    </span>
                  </div>

                  {/* Nodes diagram */}
                  <div className="flex items-center justify-between relative py-4">
                    
                    {/* SVG Connector line */}
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[2px] bg-white/10" />
                    
                    {/* Moving pulse light on the connector */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-24 animate-marquee-fast"
                      style={{
                        animationDuration: `${Math.max(1, 4 - (rps / 500000) * 3)}s`,
                      }}
                    />

                    {/* Node 1: Client */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-sm font-mono font-bold text-white">
                        CLI
                      </div>
                      <span className="text-[10px] font-mono text-white/50 mt-1">Users</span>
                    </div>

                    {/* Node 2: CDN Edge */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-mono font-bold transition-colors ${
                        edgeCache ? "bg-azure/20 border-azure text-azure" : "bg-white/5 border-white/10 text-white/30"
                      }`}>
                        CDN
                      </div>
                      <span className="text-[10px] font-mono text-white/50 mt-1">Edge Layer</span>
                    </div>

                    {/* Node 3: Gateway */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-sm font-mono font-bold text-white">
                        GW
                      </div>
                      <span className="text-[10px] font-mono text-white/50 mt-1">Mesh Ingress</span>
                    </div>

                    {/* Node 4: DB Cluster */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-mono font-bold transition-colors ${
                        multiRegion ? "bg-teal/20 border-teal text-teal" : "bg-white/10 border-white/20 text-white"
                      }`}>
                        DB
                      </div>
                      <span className="text-[10px] font-mono text-white/50 mt-1">Distributed DB</span>
                    </div>

                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                    <span>Packet Loss: 0.000%</span>
                    <span>Zero Cold Starts</span>
                    <span>Autonomous Failover</span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
