"use client";

import { useState } from "react";

const nodes = [
  {
    id: "field",
    label: "Field",
    detail: "LoRaWAN probes stream moisture, EC and temperature every 4 minutes.",
    color: "#059669",
  },
  {
    id: "platform",
    label: "FieldOS",
    detail: "Mesh data is normalized, forecast by YieldAI, and logged for compliance.",
    color: "#0052FF",
  },
  {
    id: "export",
    label: "Export",
    detail: "TraceLink writes the harvest lot to an immutable ledger for customs.",
    color: "#F59E0B",
  },
];

export default function ArchitectureFlow() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="glass-strong rounded-3xl p-8 lg:p-12">
      <div className="grid sm:grid-cols-3 gap-6 lg:gap-4 relative">
        {nodes.map((node, i) => (
          <div key={node.id} className="relative">
            <button
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(node.id)}
              onBlur={() => setHovered(null)}
              className="w-full text-left rounded-2xl border border-line bg-pearl/70 p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{
                boxShadow: hovered === node.id ? `0 20px 40px -20px ${node.color}55` : undefined,
                borderColor: hovered === node.id ? node.color : undefined,
              }}
            >
              <div
                className="h-2.5 w-2.5 rounded-full mb-4"
                style={{ background: node.color }}
              />
              <p className="font-display font-semibold text-lg mb-2">{node.label}</p>
              <p className="text-sm text-ink-faint leading-relaxed">{node.detail}</p>
            </button>
            {i < nodes.length - 1 && (
              <div className="hidden sm:flex absolute top-1/2 -right-4 lg:-right-3 -translate-y-1/2 z-10 items-center justify-center">
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                  <path d="M0 6H22M22 6L16 1M22 6L16 11" stroke="#0052FF" strokeWidth="1.5" strokeOpacity="0.4" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
