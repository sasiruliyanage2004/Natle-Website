"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Tractor, Gauge, TrendingUp, Globe2, type LucideIcon } from "lucide-react";

type Stat = {
  icon: LucideIcon;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
};

const STATS: Stat[] = [
  { icon: Tractor, value: 500, suffix: "+", label: "Farms Empowered" },
  { icon: Gauge, value: 99.9, suffix: "%", decimals: 1, label: "Platform Reliability" },
  { icon: TrendingUp, value: 20, suffix: "%", label: "Avg. Yield Increase" },
  { icon: Globe2, value: 12, suffix: "", label: "Regions Served" },
];

function Counter({ value, suffix, decimals = 0 }: Omit<Stat, "icon" | "label">) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] dark:bg-[#050505] py-24">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#0066FF]/20 blur-3xl" />
        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#10B981]/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#10B981]">
            Impact, Measured
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Numbers our partners grow by.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <s.icon className="h-6 w-6 text-[#10B981]" strokeWidth={2} />
              </span>
              <p className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-2 text-sm text-slate-400 dark:text-emerald-300/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
