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
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center" style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #f8faff 100%)" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="px-6 lg:px-12 mb-10 shrink-0"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.25)", color: "#0369a1" }}>
            AI Domains
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black leading-tight" style={{ color: "#0a1628" }}>
            Six Industries.{" "}
            <span style={{ background: "linear-gradient(90deg,#1a3a8f,#0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              One Platform.
            </span>
          </h2>
        </motion.div>

        {/* Scrolling cards track */}
        <div className="overflow-hidden px-6 lg:px-12">
          <motion.div style={{ x }} className="flex gap-5">
            {DOMAINS.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.label}
                  className="clay-card shrink-0 w-[310px] lg:w-[360px] p-7 flex flex-col gap-5 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                    style={{ background: `${d.color}12`, borderColor: `${d.color}30` }}>
                    <Icon className="w-6 h-6" style={{ color: d.color }} />
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${d.color}12`, color: d.color }}>
                      {d.label}
                    </span>
                    <h3 className="font-display text-xl font-bold mt-3" style={{ color: "#0a1628" }}>{d.title}</h3>
                  </div>

                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#64748b" }}>{d.desc}</p>

                  <div className="flex gap-2 flex-wrap">
                    {d.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-lg border"
                        style={{ background: "#f8faff", color: "#94a3b8", borderColor: "#e2e8f0" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                    style={{ color: d.color }}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll hint dots */}
        <div className="px-6 lg:px-12 mt-7 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {DOMAINS.map((_, i) => (
                <div key={i} className="h-1 rounded-full transition-all"
                  style={{ width: i === 0 ? "24px" : "8px", background: i === 0 ? "linear-gradient(90deg,#1a3a8f,#0ea5e9)" : "#e2e8f0" }} />
              ))}
            </div>
            <span className="text-xs font-mono" style={{ color: "#94a3b8" }}>scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
