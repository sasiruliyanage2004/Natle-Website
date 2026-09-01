"use client";

import { useState } from "react";
import { milestones } from "@/prompt-design/lib/data";

export default function MilestoneRoadmap() {
  const [active, setActive] = useState(milestones.length - 1);
  const current = milestones[active];

  return (
    <div>
      <div className="relative flex justify-between mb-10 overflow-x-auto pb-2">
        <div className="absolute left-0 right-0 top-[9px] h-px bg-line" />
        {milestones.map((m, i) => (
          <button
            key={m.year}
            onClick={() => setActive(i)}
            className="relative flex flex-col items-center gap-3 px-2 shrink-0"
          >
            <span
              className={`h-[18px] w-[18px] rounded-full border-2 transition-all ${
                i === active
                  ? "bg-quantum border-quantum scale-110"
                  : i < active
                  ? "bg-cyan/40 border-cyan/60"
                  : "bg-pearl border-line"
              }`}
            />
            <span
              className={`font-data text-xs ${
                i === active ? "text-ink font-medium" : "text-ink-faint"
              }`}
            >
              {m.year}
            </span>
          </button>
        ))}
      </div>

      <div className="glass-strong rounded-3xl p-8 lg:p-12 min-h-[200px]">
        <p className="font-data text-xs uppercase tracking-wide text-quantum mb-3">{current.year}</p>
        <h3 className="text-2xl lg:text-3xl font-semibold mb-4 max-w-lg">{current.title}</h3>
        <p className="text-ink-soft leading-relaxed max-w-xl">{current.body}</p>
      </div>
    </div>
  );
}
