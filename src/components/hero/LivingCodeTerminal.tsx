"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Living Code Terminal — Time-Aware Interactive Code Switch
 *
 * Features:
 * - Real-world local time detection (detects day vs night automatically)
 * - Clean, beginner-friendly syntax-highlighted TypeScript code
 * - Interactive tactile [ ☀️ DAYLIGHT | 🌙 NIGHT ] switch embedded directly inside the code line
 * - Interactive 3D glass card tilt following mouse cursor (gyroscope/parallax)
 * - Integrated mechanical keyboard "thock" sound via Web Audio API
 * - Mini live compiler log drawer at bottom (> [NATLE] Lights turned ON // 0.8ms)
 * - Synchronous site-wide theme switching (dark/light)
 * - Glowing SVG energy conduit wires branching out to DOM elements
 */

// Synthesize a crisp mechanical keyboard switch sound ("thock")
function playKeystrokeSound(isDarkTarget: boolean) {
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

export default function LivingCodeTerminal() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [localTime, setLocalTime] = useState("");
  const [isNightTime, setIsNightTime] = useState(false);
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
      const hrs = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, "0");
      setLocalTime(`${hrs}:${mins}`);

      // Evening (18:00 - 06:00) is night
      const night = hrs >= 18 || hrs < 6;
      setIsNightTime(night);
    };

    updateTime();
    const timer = setInterval(updateTime, 30000);

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

      targetRotY = dx * 10; // max 10 deg yaw
      targetRotX = -dy * 8; // max 8 deg pitch
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

    playKeystrokeSound(nextDark);

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
  }, [isDark]);

  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-[540px] select-none mx-auto lg:mx-0">
      {/* 3D Floating Glass IDE Window */}
      <div
        ref={cardRef}
        className="transition-shadow duration-300 rounded-2xl bg-white/75 dark:bg-[#07090E]/85 backdrop-blur-2xl border border-slate-900/[0.08] dark:border-white/[0.14] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_70px_-15px_rgba(0,229,255,0.15)] overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Editor Window Header (macOS dots + tab + local time) */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900/[0.06] dark:border-white/[0.08] bg-slate-100/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
            <span className="ml-2 font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span className="text-[#1E7FE8]">⚡</span>
              <span>natle-engine.ts</span>
            </span>
          </div>

          {/* Real-time local time detection badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200/60 dark:bg-white/[0.06] border border-slate-300/50 dark:border-white/10 text-[11px] font-mono text-slate-600 dark:text-slate-300">
            <span>{isNightTime ? "🌙" : "☀️"}</span>
            <span>{localTime} LOCAL</span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className={isNightTime ? "text-cyan-500 dark:text-cyan-400" : "text-amber-500 font-semibold"}>
              {isNightTime ? "NIGHT" : "DAY"}
            </span>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-800 dark:text-slate-200">
          {/* Line 1 */}
          <div className="flex items-center gap-4">
            <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">1</span>
            <p>
              <span className="text-purple-600 dark:text-purple-400">import</span>{" "}
              <span className="text-slate-800 dark:text-slate-100">{"{ NatleStudio }"}</span>{" "}
              <span className="text-purple-600 dark:text-purple-400">from</span>{" "}
              <span className="text-emerald-600 dark:text-emerald-400">&quot;@natle/core&quot;</span>;
            </p>
          </div>

          {/* Line 2 */}
          <div className="flex items-center gap-4 opacity-50">
            <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">2</span>
            <p className="text-slate-400 dark:text-slate-500 italic">
              {"// ⏰ System synced to local time: "}{localTime} ({isNightTime ? "Night time" : "Day time"})
            </p>
          </div>

          {/* Line 3 */}
          <div className="flex items-center gap-4">
            <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">3</span>
            <p>
              <span className="text-blue-600 dark:text-blue-400">export const</span>{" "}
              <span className="text-amber-600 dark:text-amber-300 font-semibold">studio</span> ={" "}
              <span className="text-purple-600 dark:text-purple-400">new</span>{" "}
              <span className="text-teal-600 dark:text-teal-300">NatleStudio</span>({"{"}
            </p>
          </div>

          {/* Line 4 */}
          <div className="flex items-center gap-4 pl-4">
            <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">4</span>
            <p>
              <span className="text-slate-600 dark:text-slate-400">client:</span>{" "}
              <span className="text-emerald-600 dark:text-emerald-400">&quot;Founders & Enterprise&quot;</span>,
            </p>
          </div>

          {/* Line 5 */}
          <div className="flex items-center gap-4 pl-4">
            <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">5</span>
            <p>
              <span className="text-slate-600 dark:text-slate-400">throughput:</span>{" "}
              <span className="text-emerald-600 dark:text-emerald-400">&quot;99.99% SLA&quot;</span>,
            </p>
          </div>

          {/* Line 6 — THE MAGIC INTERACTIVE SWITCH LINE */}
          <div className="flex items-center gap-4 pl-4 my-1.5 py-1.5 px-2 -mx-2 rounded-xl bg-blue-500/10 dark:bg-[#00E5FF]/10 border border-blue-500/20 dark:border-[#00E5FF]/30 transition-all duration-200">
            <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">6</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-blue-700 dark:text-cyan-300 font-semibold">lights:</span>

              {/* The Tactile Toggle Switch Widget inside the code */}
              <button
                type="button"
                onClick={toggleLights}
                className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-md hover:scale-[1.03] active:scale-[0.97] ${
                  isDark
                    ? "bg-[#0A1220] border-cyan-400/50 shadow-[0_0_15px_rgba(0,229,255,0.3)] text-cyan-300"
                    : "bg-amber-50 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.3)] text-amber-900"
                }`}
                title="Click to toggle website lights (Dark / Light mode)"
              >
                {/* Knob */}
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full text-xs transition-transform duration-300 shadow-sm ${
                    isDark
                      ? "bg-cyan-400 text-slate-950 translate-x-0"
                      : "bg-amber-400 text-slate-950 translate-x-0"
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
                  [CLICK TO SWITCH]
                </span>
              </button>
            </div>
          </div>

          {/* Line 7 */}
          <div className="flex items-center gap-4 pl-4">
            <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">7</span>
            <p>
              <span className="text-slate-600 dark:text-slate-400">status:</span>{" "}
              <span className="text-emerald-600 dark:text-emerald-400">&quot;ACTIVE_GRID&quot;</span>
            </p>
          </div>

          {/* Line 8 */}
          <div className="flex items-center gap-4">
            <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">8</span>
            <p>
              {"});"}
            </p>
          </div>

          {/* Line 9 */}
          <div className="flex items-center gap-4">
            <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">9</span>
            <p>
              <span className="text-amber-600 dark:text-amber-300">studio</span>.
              <span className="text-blue-600 dark:text-blue-400">deploy</span>();
            </p>
          </div>
        </div>

        {/* Mini Compiler Terminal Log Drawer */}
        <div className="px-4 py-2.5 border-t border-slate-900/[0.06] dark:border-white/[0.08] bg-slate-900 text-slate-300 font-mono text-[11px] flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase tracking-wider pb-0.5">
            <span>TERMINAL OUTPUT</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE COMPILER</span>
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

      {/* SVG Circuit Wires connecting from code terminal towards the website */}
      <svg
        className="pointer-events-none absolute -bottom-10 -left-20 w-48 h-32 overflow-visible hidden lg:block opacity-70"
        viewBox="0 0 200 120"
      >
        <path
          d="M 180 10 C 120 40, 60 80, 0 110"
          fill="none"
          stroke={isDark ? "#00E5FF" : "#1E7FE8"}
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className="animate-pulse"
        />
        <circle cx="0" cy="110" r="4" fill={isDark ? "#00E5FF" : "#1E7FE8"} />
      </svg>
    </div>
  );
}
