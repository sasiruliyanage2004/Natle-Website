"use client";

import { useMemo, useRef, useState } from "react";

function buildCurve(moisture: number, ec: number) {
  // yield index shaped by a moisture sweet spot around 55-65% and EC sweet spot around 0.6-0.8
  const points: number[] = [];
  for (let day = 0; day <= 12; day++) {
    const moistureFactor = 1 - Math.abs(moisture - 60) / 70;
    const ecFactor = 1 - Math.abs(ec - 0.7) / 1.1;
    const wobble = Math.sin(day * 0.7) * 3;
    const base = 40 + moistureFactor * 35 + ecFactor * 25;
    points.push(Math.max(8, Math.min(96, base + wobble + day * 0.6)));
  }
  return points;
}

export default function TelemetrySimulator() {
  const [moisture, setMoisture] = useState(58);
  const [ec, setEc] = useState(0.7);
  const [pulseActive, setPulseActive] = useState(false);
  const [pulseLog, setPulseLog] = useState<string[]>([]);
  const pulseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const curve = useMemo(() => buildCurve(moisture, ec), [moisture, ec]);

  function handleMoistureChange(next: number) {
    setMoisture(next);
    if (next < 34 && !pulseActive) {
      setPulseActive(true);
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setPulseLog((log) => [`${time} — Pulse triggered, block A4`, ...log].slice(0, 4));
      if (pulseTimeout.current) clearTimeout(pulseTimeout.current);
      pulseTimeout.current = setTimeout(() => setPulseActive(false), 2200);
    }
  }

  const pathD = useMemo(() => {
    const w = 480;
    const h = 160;
    const stepX = w / (curve.length - 1);
    return curve
      .map((v, i) => {
        const x = i * stepX;
        const y = h - (v / 100) * h;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [curve]);

  const areaD = `${pathD} L480,160 L0,160 Z`;

  const yieldIndex = Math.round(curve[curve.length - 1]);

  return (
    <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 items-stretch">
      <div className="space-y-6">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="moisture" className="text-sm font-medium text-ink-soft">
              Substrate moisture
            </label>
            <span className="font-data text-sm text-quantum">{moisture}%</span>
          </div>
          <input
            id="moisture"
            type="range"
            min={10}
            max={95}
            value={moisture}
            onChange={(e) => handleMoistureChange(Number(e.target.value))}
            className="w-full accent-[#0052FF]"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="ec" className="text-sm font-medium text-ink-soft">
              Electrical conductivity
            </label>
            <span className="font-data text-sm text-emerald">{ec.toFixed(2)} mS/cm</span>
          </div>
          <input
            id="ec"
            type="range"
            min={0.2}
            max={1.4}
            step={0.01}
            value={ec}
            onChange={(e) => setEc(Number(e.target.value))}
            className="w-full accent-[#059669]"
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <span
            className={`relative flex h-2.5 w-2.5 rounded-full ${
              pulseActive ? "bg-cyan" : "bg-ink-faint/30"
            }`}
          >
            {pulseActive && (
              <span className="absolute inset-0 rounded-full bg-cyan animate-ping" />
            )}
          </span>
          <p className="text-xs text-ink-faint font-data">
            {pulseActive ? "Irrigation pulse active — block A4" : "Irrigation standing by"}
          </p>
        </div>

        {pulseLog.length > 0 && (
          <div className="border-t border-line pt-3 space-y-1.5">
            {pulseLog.map((entry, i) => (
              <p key={i} className="text-xs font-data text-ink-faint">
                {entry}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="glass-strong rounded-2xl p-5 lg:p-6 flex flex-col">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-xs uppercase tracking-wide text-ink-faint font-medium">
            Projected yield index, 12-day window
          </p>
          <p className="font-data text-2xl font-semibold text-ink">
            {yieldIndex}
            <span className="text-emerald text-base">/100</span>
          </p>
        </div>
        <svg viewBox="0 0 480 160" className="w-full flex-1" preserveAspectRatio="none">
          <defs>
            <linearGradient id="yieldFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#10E599" stopOpacity="0.35" />
              <stop offset="1" stopColor="#10E599" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0"
              x2="480"
              y1={i * 40}
              y2={i * 40}
              stroke="rgba(7,19,38,0.06)"
              strokeWidth="1"
            />
          ))}
          <path d={areaD} fill="url(#yieldFill)" />
          <path d={pathD} fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <p className="mt-3 text-xs text-ink-faint">
          Model preview only — live estates use six seasons of FieldOS and YieldAI data.
        </p>
      </div>
    </div>
  );
}
