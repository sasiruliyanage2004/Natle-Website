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
    <section className="relative overflow-hidden bg-transparent py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-[2.5rem] p-8 sm:p-12">
          <div className="mx-auto max-w-xl text-center mb-12">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599]">
              Impact, Measured &bull; Real Estate Telemetry
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-[#071326] dark:text-white">
              Numbers our partners grow by.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-[#059669] dark:text-[#10E599] mb-3">
                  <s.icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-[#071326] dark:text-white font-mono">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-emerald-100/70">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
