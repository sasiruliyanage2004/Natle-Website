"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Leaf, ShoppingCart, GraduationCap, Users, Cpu, ArrowRight } from "lucide-react";

const DOMAINS = [
  {
    icon: Brain,
    label: "Healthcare AI",
    color: "#0ea5e9",
    title: "Clinical Intelligence",
    desc: "Predictive diagnostics, patient flow optimization, and automated clinical documentation that saves lives and hours.",
    tags: ["Diagnostics", "Patient Flow", "NLP"],
  },
  {
    icon: Leaf,
    label: "AgriTech",
    color: "#5aec8f",
    title: "Precision Agriculture",
    desc: "Soil telemetry, crop yield prediction, and IoT-driven irrigation that maximizes harvest and minimizes waste.",
    tags: ["IoT Sensors", "Yield Prediction", "Irrigation"],
  },
  {
    icon: ShoppingCart,
    label: "POS & Retail",
    color: "#f97316",
    title: "Intelligent Retail",
    desc: "Real-time inventory, personalized recommendations, and autonomous checkout that converts browsers to buyers.",
    tags: ["Inventory AI", "Recommender", "Checkout"],
  },
  {
    icon: GraduationCap,
    label: "EdTech",
    color: "#c084fc",
    title: "Adaptive Learning",
    desc: "Personalized curricula, AI tutors, and outcome analytics that transform student performance at scale.",
    tags: ["Adaptive LMS", "AI Tutor", "Analytics"],
  },
  {
    icon: Users,
    label: "HR Analytics",
    color: "#2dd4bf",
    title: "People Intelligence",
    desc: "Resume screening, attrition prediction, and performance coaching that turns HR into a strategic advantage.",
    tags: ["Talent AI", "Attrition", "Coaching"],
  },
  {
    icon: Cpu,
    label: "Custom AI",
    color: "#fbbf24",
    title: "Bespoke Solutions",
    desc: "End-to-end AI development tailored to your unique domain, data, and growth trajectory.",
    tags: ["Custom Models", "MLOps", "Consulting"],
  },
];

export default function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Translate cards horizontally as user scrolls
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.67%"]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${DOMAINS.length * 80}vh` }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="px-6 lg:px-12 mb-10 shrink-0"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{ background: "rgba(14,165,233,0.1)", borderColor: "rgba(14,165,233,0.3)", color: "#0ea5e9" }}>
            AI Domains
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white leading-tight">
            Six Industries.{" "}
            <span style={{ background: "linear-gradient(90deg,#0ea5e9,#5aec8f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              One Platform.
            </span>
          </h2>
        </motion.div>

        {/* Scrolling cards track */}
        <div className="overflow-hidden px-6 lg:px-12">
          <motion.div
            style={{ x }}
            className="flex gap-6"
          >
            {DOMAINS.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.label}
                  className="shrink-0 w-[320px] lg:w-[380px] rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 group cursor-pointer"
                  style={{
                    background: "rgba(13,21,53,0.7)",
                    backdropFilter: "blur(24px)",
                    border: `1px solid ${d.color}28`,
                    boxShadow: `0 8px 40px -12px ${d.color}22`,
                  }}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${d.color}18`, border: `1px solid ${d.color}35` }}>
                    <Icon className="w-6 h-6" style={{ color: d.color }} />
                  </div>

                  {/* Label badge */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${d.color}15`, color: d.color }}>
                      {d.label}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-3">{d.title}</h3>
                  </div>

                  <p className="text-[#94a3b8] text-sm leading-relaxed flex-1">{d.desc}</p>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap">
                    {d.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.04)", color: "#64748b", border: "1px solid rgba(255,255,255,0.07)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                    style={{ color: d.color }}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="px-6 lg:px-12 mt-8 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {DOMAINS.map((_, i) => (
                <div key={i} className="w-6 h-1 rounded-full transition-all"
                  style={{ background: i === 0 ? "linear-gradient(90deg,#0ea5e9,#5aec8f)" : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
            <span className="text-xs text-[#64748b] font-mono">scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
