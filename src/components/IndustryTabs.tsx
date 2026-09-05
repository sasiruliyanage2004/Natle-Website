"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
 {
 key: "banking",
 label: "Banking",
 headline: "Fraud review that explains itself to an auditor",
 body: "A copilot that scores transactions in real time and produces a written rationale a compliance team can defend — not a black-box confidence score.",
 metrics: [
 { value: "2M+", label: "transactions scored / day" },
 { value: "-31%", label: "analyst review time" },
 ],
 },
 {
 key: "healthcare",
 label: "Healthcare",
 headline: "Clinical documentation that a physician actually trusts",
 body: "Ambient note-generation tuned per specialty, with every claim traceable back to the visit transcript for chart review.",
 metrics: [
 { value: "12min", label: "saved per patient visit" },
 { value: "100%", label: "claims source-traceable" },
 ],
 },
 {
 key: "logistics",
 label: "Logistics",
 headline: "Route and inventory forecasting that adapts mid-week",
 body: "Demand models that re-forecast on live signals instead of waiting for the next weekly batch job to catch up.",
 metrics: [
 { value: "18%", label: "reduction in stockouts" },
 { value: "4hr", label: "forecast refresh cycle" },
 ],
 },
];

export default function IndustryTabs() {
 const [active, setActive] = useState(INDUSTRIES[0].key);
 const current = INDUSTRIES.find((i) => i.key === active)!;

 return (
 <div>
 <div className="flex flex-wrap gap-2" role="tablist">
 {INDUSTRIES.map((industry) => (
 <button
 key={industry.key}
 role="tab"
 aria-selected={active === industry.key}
 onClick={() => setActive(industry.key)}
 className={cn(
 "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
 active === industry.key
 ? "bg-gradient-to-r from-accent-cyan to-accent-lime text-[#070D24]"
 : "border border-ink-muted/25 text-ink-muted hover:border-accent-lime/50 hover:text-ink"
 )}
 >
 {industry.label}
 </button>
 ))}
 </div>

 <AnimatePresence mode="wait">
 <motion.div
 key={current.key}
 initial={{ opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -12 }}
 transition={{ duration: 0.3, ease: "easeOut" }}
 className="card-glass mt-6 grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-10"
 >
 <div>
 <h3 className="font-display text-2xl font-semibold text-ink">
 {current.headline}
 </h3>
 <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
 {current.body}
 </p>
 </div>
 <div className="flex flex-col justify-center gap-6 border-t border-white/5 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
 {current.metrics.map((metric) => (
 <div key={metric.label}>
 <p className="font-display text-3xl font-bold text-gradient-brand">
 {metric.value}
 </p>
 <p className="mt-1 text-sm text-ink-muted">{metric.label}</p>
 </div>
 ))}
 </div>
 </motion.div>
 </AnimatePresence>
 </div>
 );
}
