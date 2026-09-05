"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Target, Layers, Shield, Zap, Lock } from "lucide-react";

const FEATURES = [
  { icon: Brain, color: "#0ea5e9", title: "AI-First Architecture", desc: "Every solution starts with AI at its core, not as an afterthought." },
  { icon: Target, color: "#16a34a", title: "Deep Domain Expertise", desc: "Vertical knowledge across 6 industries before you explain the challenge." },
  { icon: Layers, color: "#0ea5e9", title: "Scalable by Design", desc: "From pilot to enterprise-scale, handling millions of transactions daily." },
  { icon: Shield, color: "#7c3aed", title: "SOC 2 & HIPAA Compliant", desc: "End-to-end encrypted, GDPR ready. Your data is always sovereign." },
  { icon: Zap, color: "#d97706", title: "Rapid Deployment", desc: "Pre-built AI modules slash time to market — weeks, not months." },
  { icon: Lock, color: "#0d9488", title: "24/7 Enterprise Support", desc: "SLA-backed monitoring. Your AI systems never sleep." },
];

const BARS = [
  { label: "Model Accuracy", value: 98.2, color: "#0ea5e9" },
  { label: "Inference Speed", value: 96.8, color: "#16a34a" },
  { label: "Data Security", value: 100, color: "#0d9488" },
  { label: "Client Satisfaction", value: 100, color: "#1a3a8f" },
];

function CounterBar({ bar, inView }: { bar: typeof BARS[0]; inView: boolean }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex justify-between mb-2">
        <span className="text-xs font-semibold" style={{ color: "#475569" }}>{bar.label}</span>
        <span className="text-xs font-bold font-mono" style={{ color: bar.color }}>{bar.value}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: "#e2e8f0" }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${bar.value}%` } : { width: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ background: `linear-gradient(90deg, ${bar.color}88, ${bar.color})` }}
        />
      </div>
    </div>
  );
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 relative" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{ background: "rgba(90,236,143,0.1)", borderColor: "rgba(22,163,74,0.3)", color: "#16a34a" }}>
            Why NATLE
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black" style={{ color: "#0a1628" }}>
            Why Enterprises{" "}
            <span style={{ background: "linear-gradient(90deg,#1a3a8f,#0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Choose NATLE
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Feature list */}
          <div className="space-y-3">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="flex gap-4 p-5 rounded-2xl border cursor-default transition-all duration-300"
                  style={{ background: "#f8faff", borderColor: "#e2e8f0" }}
                  whileHover={{ borderColor: `${f.color}40`, background: "#ffffff", boxShadow: `0 4px 20px -6px ${f.color}25` }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ background: `${f.color}10`, borderColor: `${f.color}25` }}>
                    <Icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm mb-1" style={{ color: "#0a1628" }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Metrics card */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="clay-card rounded-3xl p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#16a34a" }}>Live Platform</span>
                </div>
                <h3 className="font-display text-lg font-bold" style={{ color: "#0a1628" }}>NATLE AI Platform</h3>
                <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>v4.2 · Production</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono" style={{ color: "#94a3b8" }}>Avg. Time to ROI</div>
                <div className="font-display text-2xl font-black"
                  style={{ background: "linear-gradient(90deg,#1a3a8f,#0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  6 weeks
                </div>
              </div>
            </div>

            {BARS.map(bar => <CounterBar key={bar.label} bar={bar} inView={inView} />)}

            <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop: "1px solid #f1f5f9" }}>
              {["SOC 2", "GDPR", "ISO 27001", "HIPAA"].map(b => (
                <span key={b} className="text-xs px-3 py-1 rounded-full font-bold border"
                  style={{ background: "rgba(14,165,233,0.07)", borderColor: "rgba(14,165,233,0.2)", color: "#0369a1" }}>
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
