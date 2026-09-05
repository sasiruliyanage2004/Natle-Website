"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Target, Layers, Shield, Zap, Lock } from "lucide-react";

const FEATURES = [
  { icon: Brain, color: "#0ea5e9", title: "AI-First Architecture", desc: "Every solution starts with AI at its core, not as an afterthought." },
  { icon: Target, color: "#5aec8f", title: "Deep Domain Expertise", desc: "Vertical knowledge across 6 industries before you explain the challenge." },
  { icon: Layers, color: "#0ea5e9", title: "Scalable by Design", desc: "From pilot to enterprise-scale, handling millions of transactions daily." },
  { icon: Shield, color: "#5aec8f", title: "SOC 2 & HIPAA Compliant", desc: "End-to-end encrypted, GDPR ready. Your data is always sovereign." },
  { icon: Zap, color: "#0ea5e9", title: "Rapid Deployment", desc: "Pre-built AI modules slash time to market — weeks, not months." },
  { icon: Lock, color: "#5aec8f", title: "24/7 Enterprise Support", desc: "SLA-backed monitoring. Your AI systems never sleep." },
];

const BARS = [
  { label: "Model Accuracy", value: 98.2, color: "#0ea5e9" },
  { label: "Inference Speed", value: 96.8, color: "#5aec8f" },
  { label: "Data Security", value: 100, color: "#2dd4bf" },
  { label: "Client Satisfaction", value: 100, color: "#1a6fd4" },
];

function CounterBar({ bar, inView }: { bar: typeof BARS[0]; inView: boolean }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex justify-between mb-2">
        <span className="text-[#94a3b8] text-xs font-semibold">{bar.label}</span>
        <span className="text-xs font-bold font-mono" style={{ color: bar.color }}>{bar.value}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${bar.value}%` } : { width: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ background: `linear-gradient(90deg, ${bar.color}99, ${bar.color})` }}
        />
      </div>
    </div>
  );
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "rgba(13,21,53,0.35)" }}>
      {/* subtle glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{ background: "rgba(90,236,143,0.1)", borderColor: "rgba(90,236,143,0.3)", color: "#5aec8f" }}>
            Why NATLE
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white">
            Why Enterprises{" "}
            <span style={{ background: "linear-gradient(90deg,#0ea5e9,#5aec8f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Choose NATLE
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Feature list */}
          <div className="space-y-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="flex gap-4 p-5 rounded-2xl border transition-all duration-300 group cursor-default"
                  style={{
                    background: "rgba(13,21,53,0.5)",
                    borderColor: "rgba(14,165,233,0.08)",
                  }}
                  whileHover={{ borderColor: `${f.color}45`, scale: 1.01 }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${f.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-sm mb-1">{f.title}</h3>
                    <p className="text-[#64748b] text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Metrics card */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl p-8"
            style={{
              background: "rgba(13,21,53,0.7)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(14,165,233,0.15)",
              boxShadow: "0 0 60px -20px rgba(14,165,233,0.2)",
            }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#5aec8f] animate-pulse" />
                  <span className="text-xs text-[#5aec8f] font-mono font-bold uppercase tracking-wider">Live Platform</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white">NATLE AI Platform</h3>
                <p className="text-[#64748b] text-xs mt-0.5">v4.2 · Production</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-[#64748b]">Avg. Time to ROI</div>
                <div className="font-display text-2xl font-black"
                  style={{ background: "linear-gradient(90deg,#0ea5e9,#5aec8f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  6 weeks
                </div>
              </div>
            </div>

            {/* Progress bars */}
            {BARS.map(bar => (
              <CounterBar key={bar.label} bar={bar} inView={inView} />
            ))}

            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {["SOC 2", "GDPR", "ISO 27001", "HIPAA"].map(b => (
                <span key={b} className="text-xs px-3 py-1 rounded-full font-bold"
                  style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.25)", color: "#38bdf8" }}>
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
