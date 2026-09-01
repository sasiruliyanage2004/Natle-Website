"use client";

import { useState } from "react";
import { solutionsTabs } from "@/prompt-design/lib/data";

const accentMap: Record<string, { text: string; bg: string; ring: string }> = {
  quantum: { text: "text-quantum", bg: "bg-quantum", ring: "ring-quantum/30" },
  emerald: { text: "text-emerald", bg: "bg-emerald", ring: "ring-emerald/30" },
  amber: { text: "text-amber", bg: "bg-amber", ring: "ring-amber/30" },
};

export default function SolutionsTabs() {
  const [active, setActive] = useState(solutionsTabs[0].id);
  const tab = solutionsTabs.find((t) => t.id === active)!;
  const accent = accentMap[tab.accent];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {solutionsTabs.map((t) => {
          const isActive = t.id === active;
          const a = accentMap[t.accent];
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                isActive
                  ? `${a.bg} text-white border-transparent`
                  : "border-line text-ink-soft hover:border-ink/30"
              }`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      <div className="glass-strong rounded-3xl p-8 lg:p-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
        <div>
          <p className={`font-data text-xs uppercase tracking-wide ${accent.text} mb-3`}>
            {tab.name}
          </p>
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4 max-w-md">{tab.tagline}</h3>
          <p className="text-ink-soft leading-relaxed max-w-lg">{tab.description}</p>
        </div>
        <ul className="space-y-4 self-center">
          {tab.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${accent.bg} shrink-0`} />
              <span className="text-sm text-ink-soft leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
