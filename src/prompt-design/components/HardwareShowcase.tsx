"use client";

const items = [
  { name: "Soil probe, gen 4", detail: "Moisture, EC, temperature — 5yr battery", color: "#059669" },
  { name: "Mesh gateway", detail: "8km line-of-sight, solar-assisted", color: "#0052FF" },
  { name: "Irrigation valve controller", detail: "Offline-first, manual override", color: "#00D2FF" },
  { name: "Canopy weather station", detail: "Rainfall, humidity, wind, solar radiation", color: "#84CC16" },
];

export default function HardwareShowcase() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1400px" }}>
      {items.map((item) => (
        <div
          key={item.name}
          className="group rounded-2xl border border-line bg-pearl/70 p-6 transition-transform duration-300 ease-out hover:[transform:rotateY(-8deg)_rotateX(4deg)_translateY(-4px)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="h-28 rounded-xl mb-5 flex items-center justify-center"
            style={{ background: `${item.color}14` }}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <rect x="14" y="4" width="16" height="30" rx="4" stroke={item.color} strokeWidth="2" />
              <circle cx="22" cy="38" r="4" fill={item.color} />
              <line x1="22" y1="10" x2="22" y2="26" stroke={item.color} strokeWidth="2" strokeDasharray="2 3" />
            </svg>
          </div>
          <p className="font-display font-semibold text-sm mb-1.5">{item.name}</p>
          <p className="text-xs text-ink-faint leading-relaxed">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}
