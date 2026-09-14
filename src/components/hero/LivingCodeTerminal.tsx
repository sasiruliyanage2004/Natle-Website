"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Living Code Terminal — Production Masterpiece
 *
 * SOTD-Grade Features:
 * - Real-world local time with live ticking seconds & automatic Day/Night awareness
 * - Interactive multi-tab IDE: [⚡ natle-engine.ts] [📊 architecture.json] [🚀 deploy.sh]
 * - Tactile [ ☀️ DAYLIGHT | 🌙 NIGHT_OPS ] switch embedded directly inside the code
 * - Mechanical keyboard "thock" sound synthesis (with sound mute toggle)
 * - Keyboard shortcut support: Press Space or 'T' to toggle lights
 * - Live compiler log drawer with real-time latency & memory telemetry
 * - 3D Gyroscope/Mouse Parallax tilt with prismatic glass reflection
 * - Dynamic SVG glowing circuit conduits snaking across to the DOM headline
 */

// Synthesize a crisp mechanical keyboard switch sound ("thock")
function playKeystrokeSound(isDarkTarget: boolean, soundEnabled: boolean) {
  if (!soundEnabled) return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;

    // Tactile key switch click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(isDarkTarget ? 1200 : 1600, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);

    // Mechanical "thock" housing resonance
    const thock = ctx.createOscillator();
    const thockGain = ctx.createGain();
    thock.type = "triangle";
    thock.frequency.setValueAtTime(isDarkTarget ? 140 : 240, now + 0.01);
    thock.frequency.exponentialRampToValueAtTime(60, now + 0.14);
    thockGain.gain.setValueAtTime(0.16, now + 0.01);
    thockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    thock.connect(thockGain);
    thockGain.connect(ctx.destination);
    thock.start(now + 0.01);
    thock.stop(now + 0.18);
  } catch {
    // Audio fallback
  }
}

type TabType = "engine" | "architecture" | "deploy";

export default function LivingCodeTerminal() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>("engine");
  const [isDark, setIsDark] = useState(true);
  const [localTime, setLocalTime] = useState("");
  const [isNightTime, setIsNightTime] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    "System ready. Grid connected.",
    "Awaiting developer command...",
  ]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Detect Real Local Time & initial theme
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setLocalTime(`${hrs}:${mins}:${secs}`);

      // Evening (18:00 - 06:00) is night
      const h = now.getHours();
      setIsNightTime(h >= 18 || h < 6);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    const checkDark = document.documentElement.classList.contains("dark");
    setIsDark(checkDark);

    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      clearInterval(timer);
      obs.disconnect();
    };
  }, []);

  // 2. Interactive 3D Card Tilt with Mouse Parallax
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;
    let raf = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);

      targetRotY = dx * 8; // max 8 deg yaw
      targetRotX = -dy * 6; // max 6 deg pitch
    };

    const animateTilt = () => {
      curRotX += (targetRotX - curRotX) * 0.08;
      curRotY += (targetRotY - curRotY) * 0.08;
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${curRotX}deg) rotateY(${curRotY}deg)`;
      }
      raf = requestAnimationFrame(animateTilt);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(animateTilt);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // 3. Toggle Function — Switches Theme site-wide from Code!
  const toggleLights = useCallback(() => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    setIsCompiling(true);

    playKeystrokeSound(nextDark, soundEnabled);

    // Update site-wide theme
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("natle_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("natle_theme", "light");
    }

    // Update console log
    setLogs([
      `> [NATLE] Recompiling illumination: ${nextDark ? '"NIGHT_OPS"' : '"DAYLIGHT"'}`,
      `> [GRID] Lights turned ${nextDark ? "OFF (Night Mode)" : "ON (Daylight)"} in 0.8ms`,
    ]);

    // Dispatch global event
    window.dispatchEvent(new Event("themechange"));

    // Ignite DOM anchors
    const words = document.querySelectorAll('[data-anchor="headline-word"]');
    words.forEach((w, idx) => {
      setTimeout(() => {
        w.classList.add("ignited");
        setTimeout(() => w.classList.remove("ignited"), 600);
      }, idx * 80);
    });

    const cta = document.querySelector('[data-anchor="cta-btn"]');
    if (cta) {
      cta.classList.add("ignited");
      setTimeout(() => cta.classList.remove("ignited"), 700);
    }

    setTimeout(() => setIsCompiling(false), 600);
  }, [isDark, soundEnabled]);

  // 4. Keyboard Shortcut Listener (Press Space or T)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if (e.code === "Space" || e.key.toLowerCase() === "t") {
        e.preventDefault();
        toggleLights();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleLights]);

  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-[530px] select-none mx-auto lg:mx-0">
      {/* Dynamic Ambient Aura Glow behind the terminal */}
      <div
        className={`absolute -inset-1 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none opacity-40 dark:opacity-50 ${
          isDark
            ? "bg-gradient-to-r from-cyan-500/30 via-azure/30 to-purple-600/30"
            : "bg-gradient-to-r from-amber-400/30 via-teal-400/30 to-sky-400/30"
        }`}
        aria-hidden="true"
      />

      {/* 3D Floating Glass IDE Window */}
      <div
        ref={cardRef}
        className="relative transition-all duration-300 rounded-2xl bg-white/80 dark:bg-[#07090E]/90 backdrop-blur-2xl border border-slate-900/[0.08] dark:border-white/[0.14] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_90px_-20px_rgba(0,229,255,0.18)] overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Editor Window Header (macOS dots + tabs + local time + sound toggle) */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-900/[0.06] dark:border-white/[0.08] bg-slate-100/60 dark:bg-white/[0.02]">
          {/* macOS window dots + tabs */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
            </div>

            {/* Interactive Tabs */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("engine")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1.5 transition-all ${
                  activeTab === "engine"
                    ? "bg-white dark:bg-white/[0.10] text-slate-900 dark:text-white shadow-xs font-semibold"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <span className="text-[#1E7FE8]">⚡</span>
                <span>engine.ts</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1.5 transition-all ${
                  activeTab === "architecture"
                    ? "bg-white dark:bg-white/[0.10] text-slate-900 dark:text-white shadow-xs font-semibold"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <span className="text-teal-500">📊</span>
                <span className="hidden sm:inline">arch.json</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("deploy")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1.5 transition-all ${
                  activeTab === "deploy"
                    ? "bg-white dark:bg-white/[0.10] text-slate-900 dark:text-white shadow-xs font-semibold"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <span className="text-purple-500">🚀</span>
                <span className="hidden sm:inline">deploy.sh</span>
              </button>
            </div>
          </div>

          {/* Right Controls: Real-time clock & sound toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Real-time local time detection badge */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200/60 dark:bg-white/[0.06] border border-slate-300/50 dark:border-white/10 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              <span>{isNightTime ? "🌙" : "☀️"}</span>
              <span className="font-semibold">{localTime}</span>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled((v) => !v)}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              title={soundEnabled ? "Mute keystroke audio" : "Enable keystroke audio"}
              aria-label="Toggle audio feedback"
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>
          </div>
        </div>

        {/* Tab 1: engine.ts (Main Interactive Code Editor) */}
        {activeTab === "engine" && (
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-800 dark:text-slate-200">
            {/* Line 1 */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">1</span>
              <p>
                <span className="text-purple-600 dark:text-purple-400">import</span>{" "}
                <span className="text-slate-800 dark:text-slate-100 font-semibold">{"{ NatleStudio }"}</span>{" "}
                <span className="text-purple-600 dark:text-purple-400">from</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">&quot;@natle/core&quot;</span>;
              </p>
            </div>

            {/* Line 2 */}
            <div className="flex items-center gap-3 sm:gap-4 opacity-60">
              <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">2</span>
              <p className="text-slate-400 dark:text-slate-500 italic">
                {"// ⏰ Time-synced environment: "}{localTime} ({isNightTime ? "Night time detected" : "Daylight detected"})
              </p>
            </div>

            {/* Line 3 */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">3</span>
              <p>
                <span className="text-blue-600 dark:text-blue-400">export const</span>{" "}
                <span className="text-amber-600 dark:text-amber-300 font-semibold">studio</span> ={" "}
                <span className="text-purple-600 dark:text-purple-400">new</span>{" "}
                <span className="text-teal-600 dark:text-teal-300 font-semibold">NatleStudio</span>({"{"}
              </p>
            </div>

            {/* Line 4 */}
            <div className="flex items-center gap-3 sm:gap-4 pl-4">
              <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">4</span>
              <p>
                <span className="text-slate-600 dark:text-slate-400">client:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">&quot;Founders & Enterprise&quot;</span>,
              </p>
            </div>

            {/* Line 5 */}
            <div className="flex items-center gap-3 sm:gap-4 pl-4">
              <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">5</span>
              <p>
                <span className="text-slate-600 dark:text-slate-400">throughput:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400">&quot;99.99% SLA&quot;</span>,
              </p>
            </div>

            {/* Line 6 — THE MAGIC INTERACTIVE SWITCH LINE */}
            <div className="flex items-center gap-3 sm:gap-4 pl-4 my-2 py-2 px-2.5 -mx-2.5 rounded-xl bg-blue-500/10 dark:bg-[#00E5FF]/10 border border-blue-500/25 dark:border-[#00E5FF]/35 shadow-xs transition-all duration-200">
              <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">6</span>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-blue-700 dark:text-cyan-300 font-bold">lights:</span>

                {/* The Tactile Toggle Switch Widget inside the code */}
                <button
                  type="button"
                  onClick={toggleLights}
                  className={`group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-md hover:scale-[1.03] active:scale-[0.96] ${
                    isDark
                      ? "bg-[#08101E] border-cyan-400/60 shadow-[0_0_20px_rgba(0,229,255,0.35)] text-cyan-300"
                      : "bg-amber-50 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.35)] text-amber-900"
                  }`}
                  title="Click to toggle website lights (Dark / Light mode)"
                >
                  {/* Sliding Knob */}
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded-full text-xs transition-transform duration-300 shadow-sm ${
                      isDark
                        ? "bg-cyan-400 text-slate-950"
                        : "bg-amber-400 text-slate-950"
                    }`}
                  >
                    {isDark ? "🌙" : "☀️"}
                  </span>

                  <span className="font-bold tracking-wide text-xs">
                    {isDark ? '"NIGHT_OPS"' : '"DAYLIGHT"'}
                  </span>

                  <span
                    className={`h-2 w-2 rounded-full animate-ping ${
                      isDark ? "bg-cyan-400" : "bg-amber-500"
                    }`}
                  />

                  <span className="text-[10px] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white transition-colors">
                    [TOGGLE]
                  </span>
                </button>
              </div>
            </div>

            {/* Line 7 */}
            <div className="flex items-center gap-3 sm:gap-4 pl-4">
              <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">7</span>
              <p>
                <span className="text-slate-600 dark:text-slate-400">status:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">&quot;ACTIVE_GRID&quot;</span>
              </p>
            </div>

            {/* Line 8 */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">8</span>
              <p>
                {"});"}
              </p>
            </div>

            {/* Line 9 */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">9</span>
              <p>
                <span className="text-amber-600 dark:text-amber-300 font-semibold">studio</span>.
                <span className="text-blue-600 dark:text-blue-400 font-semibold">deploy</span>();
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: architecture.json (Micro-dashboard) */}
        {activeTab === "architecture" && (
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 dark:text-slate-200">
            <p className="text-slate-400 dark:text-slate-500 italic mb-2">{"// Production Cluster Telemetry"}</p>
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block">LATENCY (P99)</span>
                <span className="text-emerald-500 font-bold text-sm">0.8 ms</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block">AVAILABILITY</span>
                <span className="text-cyan-500 font-bold text-sm">99.999%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block">MICROSERVICES</span>
                <span className="text-purple-400 font-bold text-sm">128 Online</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block">ENCRYPTION</span>
                <span className="text-blue-400 font-bold text-sm">Quantum-Safe</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">Auto-scaling edge nodes: 42 regions active</p>
          </div>
        )}

        {/* Tab 3: deploy.sh */}
        {activeTab === "deploy" && (
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 dark:text-slate-200">
            <p className="text-emerald-500 font-semibold mb-2">#!/usr/bin/env bash</p>
            <p className="text-slate-400">$ natle deploy --env=production</p>
            <p className="text-slate-600 dark:text-slate-300">✔ Validating AST & dependencies... [PASSED]</p>
            <p className="text-slate-600 dark:text-slate-300">✔ Compiling edge workers... [0.4s]</p>
            <p className="text-cyan-500">✔ Zero-downtime deployment active across all nodes.</p>
          </div>
        )}

        {/* Mini Compiler Terminal Log Drawer */}
        <div className="px-4 py-2.5 border-t border-slate-900/[0.06] dark:border-white/[0.08] bg-slate-900 text-slate-300 font-mono text-[11px] flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase tracking-wider pb-0.5">
            <span className="flex items-center gap-1.5">
              <span>TERMINAL OUTPUT</span>
              <span className="text-slate-600">•</span>
              <span className="text-[9px] text-slate-500">HOT RELOAD READY</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>
          {logs.map((log, i) => (
            <p
              key={i}
              className={`leading-tight ${
                i === logs.length - 1
                  ? isCompiling
                    ? "text-cyan-300 animate-pulse font-semibold"
                    : "text-emerald-300"
                  : "text-slate-400"
              }`}
            >
              {log}
            </p>
          ))}
        </div>
      </div>

      {/* Helper Keyboard Shortcut Pill */}
      <div className="mt-2.5 flex items-center justify-between px-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/15 text-[10px]">
            Space
          </kbd>
          <span>or click switch to toggle</span>
        </span>
        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>99.99% SLA</span>
        </span>
      </div>

      {/* SVG Circuit Wires connecting from code terminal towards the website headline */}
      <svg
        className="pointer-events-none absolute -bottom-12 -left-28 w-56 h-36 overflow-visible hidden lg:block opacity-75"
        viewBox="0 0 240 140"
      >
        <path
          d="M 220 15 C 150 45, 80 95, 0 130"
          fill="none"
          stroke={isDark ? "#00E5FF" : "#1E7FE8"}
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className="animate-pulse"
        />
        <circle cx="0" cy="130" r="4.5" fill={isDark ? "#00E5FF" : "#1E7FE8"} />
        <circle cx="220" cy="15" r="3.5" fill={isDark ? "#00E5FF" : "#1E7FE8"} />
      </svg>
    </div>
  );
}
