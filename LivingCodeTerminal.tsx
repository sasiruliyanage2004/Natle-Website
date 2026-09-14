"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";

/* ---------------------------------------------------------------------- */
/*  Sound                                                                  */
/* ---------------------------------------------------------------------- */

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
  } catch {}
}

function playSudoSound() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;
    [0, 0.08, 0.16].forEach((offset, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(440 + i * 220, now + offset);
      gain.gain.setValueAtTime(0.05, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.1);
    });
  } catch {}
}

/* ---------------------------------------------------------------------- */
/*  Typewriter hook — animates only the newest log line                   */
/* ---------------------------------------------------------------------- */

function useTypewriterLogs(logs: string[], speed = 14) {
  const [displayed, setDisplayed] = useState<string[]>(logs);
  const prevLenRef = useRef(logs.length);

  useEffect(() => {
    if (logs.length === 0) return;
    const lastLog = logs[logs.length - 1];
    const isNewBatch = logs.length !== prevLenRef.current;
    prevLenRef.current = logs.length;

    if (!isNewBatch) {
      setDisplayed(logs);
      return;
    }

    setDisplayed((prev) => [...logs.slice(0, -1), ""]);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed((prev) => [...logs.slice(0, -1), lastLog.slice(0, i)]);
      if (i >= lastLog.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs]);

  return displayed;
}

/* ---------------------------------------------------------------------- */
/*  Component                                                              */
/* ---------------------------------------------------------------------- */

type TabType = "engine" | "architecture" | "deploy";
type Particle = { id: number; x: number; y: number; rot: number; char: string };

export default function LivingCodeTerminal() {
  const cardRef = useRef<HTMLDivElement>(null);
  const switchRef = useRef<HTMLButtonElement>(null);

  const [activeTab, setActiveTab] = useState<TabType>("engine");
  const [isDark, setIsDark] = useState(true);
  const [localTime, setLocalTime] = useState("");
  const [isNightTime, setIsNightTime] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    "System ready. Grid connected.",
    "Awaiting developer command...",
  ]);
  const displayedLogs = useTypewriterLogs(logs);
  const [isCompiling, setIsCompiling] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [minimized, setMinimized] = useState(false);

  // Conduit light-node replay key
  const [pulseKey, setPulseKey] = useState(0);

  // Draggable switch
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef(0);

  // Idle hint
  const [showIdleHint, setShowIdleHint] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sudo easter egg
  const sudoBufferRef = useRef("");
  const [particles, setParticles] = useState<Particle[]>([]);

  /* ---- Clock + theme sync ------------------------------------------- */
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setLocalTime(`${hrs}:${mins}:${secs}`);
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

  /* ---- 3D tilt --------------------------------------------------------*/
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let targetRotX = 0,
      targetRotY = 0,
      curRotX = 0,
      curRotY = 0,
      raf = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      targetRotY = dx * 8;
      targetRotX = -dy * 6;

      // Specular sheen position (percent within card bounds)
      const sx = ((e.clientX - rect.left) / rect.width) * 100;
      const sy = ((e.clientY - rect.top) / rect.height) * 100;
      const within =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      card.style.setProperty("--sheen-x", `${Math.max(0, Math.min(100, sx))}%`);
      card.style.setProperty("--sheen-y", `${Math.max(0, Math.min(100, sy))}%`);
      card.style.setProperty("--sheen-o", within ? "1" : "0");
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

  /* ---- Idle hint --------------------------------------------------------*/
  const resetIdleTimer = useCallback(() => {
    setShowIdleHint(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setShowIdleHint(true), 20000);
  }, []);

  useEffect(() => {
    resetIdleTimer();
    const events: (keyof WindowEventMap)[] = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((ev) => window.addEventListener(ev, resetIdleTimer, { passive: true }));
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  /* ---- Toggle lights --------------------------------------------------*/
  const toggleLights = useCallback(() => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    setIsCompiling(true);
    setPulseKey((k) => k + 1);

    playKeystrokeSound(nextDark, soundEnabled);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("natle_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("natle_theme", "light");
    }

    setLogs((prev) => [
      ...prev.slice(-1),
      `> [NATLE] Recompiling illumination: ${nextDark ? '"NIGHT_OPS"' : '"DAYLIGHT"'} → grid stable in 0.8ms`,
    ]);

    window.dispatchEvent(new Event("themechange"));

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

  /* ---- Keyboard shortcuts + sudo easter egg ----------------------------*/
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      if (e.code === "Space" || e.key.toLowerCase() === "t") {
        e.preventDefault();
        toggleLights();
        return;
      }

      if (/^[a-z]$/i.test(e.key)) {
        sudoBufferRef.current = (sudoBufferRef.current + e.key.toLowerCase()).slice(-4);
        if (sudoBufferRef.current === "sudo") {
          sudoBufferRef.current = "";
          playSudoSound();
          setLogs((prev) => [...prev.slice(-1), "> [ROOT] Permission granted. Welcome back, engineer."]);
          const burst: Particle[] = Array.from({ length: 14 }, (_, i) => ({
            id: Date.now() + i,
            x: 40 + Math.random() * 20,
            y: 30 + Math.random() * 20,
            rot: Math.random() * 360,
            char: "{}[]<>/;".charAt(Math.floor(Math.random() * 8)),
          }));
          setParticles(burst);
          setTimeout(() => setParticles([]), 1000);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleLights]);

  /* ---- Draggable switch -------------------------------------------------*/
  const DRAG_THRESHOLD = 28;

  const onSwitchPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragStartRef.current = e.clientX;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onSwitchPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    const delta = e.clientX - dragStartRef.current;
    setDragX(Math.max(-DRAG_THRESHOLD, Math.min(DRAG_THRESHOLD, delta)));
  };

  const onSwitchPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    setDragging(false);
    const dragged = Math.abs(dragX) >= DRAG_THRESHOLD - 4;
    setDragX(0);
    if (dragged) {
      toggleLights();
    } else {
      // Treat as a click if it wasn't a real drag
      toggleLights();
    }
  };

  /* ---- Derived copy ------------------------------------------------------*/
  const uptimeDays = useMemo(() => {
    // Deterministic-ish "days since incident" counter seeded off the date,
    // purely cosmetic — replace with a real value wired to your status page.
    return 214;
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-[530px] select-none mx-auto lg:mx-0">
      {/* Ambient glow */}
      <div
        className={`absolute -inset-1 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none opacity-40 dark:opacity-50 ${
          isDark
            ? "bg-gradient-to-r from-cyan-500/30 via-azure/30 to-purple-600/30"
            : "bg-gradient-to-r from-amber-400/30 via-teal-400/30 to-sky-400/30"
        }`}
        aria-hidden="true"
      />

      <div
        ref={cardRef}
        className={`relative transition-all duration-300 rounded-2xl bg-white/80 dark:bg-[#07090E]/90 backdrop-blur-2xl border border-slate-900/[0.08] dark:border-white/[0.14] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_90px_-20px_rgba(0,229,255,0.18)] overflow-hidden ${
          minimized ? "scale-[0.85] opacity-60" : "scale-100 opacity-100"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Specular sheen layer — follows cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: "var(--sheen-o, 0)",
            background:
              "radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgba(255,255,255,0.14), transparent 42%)",
          }}
          aria-hidden="true"
        />

        {/* Inner top edge highlight */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/25 to-transparent"
          aria-hidden="true"
        />

        {/* Sudo easter-egg particle burst */}
        {particles.length > 0 && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {particles.map((p) => (
              <span
                key={p.id}
                className="absolute font-mono text-xs font-bold text-cyan-400 dark:text-cyan-300 sudo-particle"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: `rotate(${p.rot}deg)`,
                }}
              >
                {p.char}
              </span>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="relative flex items-center justify-between px-3.5 py-2.5 border-b border-slate-900/[0.06] dark:border-white/[0.08] bg-slate-100/60 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setMinimized((v) => !v)}
                className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 transition-transform hover:scale-110 active:scale-90"
                title={minimized ? "Restore" : "Minimize"}
                aria-label={minimized ? "Restore terminal" : "Minimize terminal"}
              />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
            </div>
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
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200/60 dark:bg-white/[0.06] border border-slate-300/50 dark:border-white/10 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              <span>{isNightTime ? "🌙" : "☀️"}</span>
              <span className="font-semibold">{localTime}</span>
            </div>
            <button
              type="button"
              onClick={() => setSoundEnabled((v) => !v)}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              title={soundEnabled ? "Mute keystroke audio" : "Enable keystroke audio"}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>
          </div>
        </div>

        {!minimized && (
          <>
            {/* Tab 1: engine.ts */}
            {activeTab === "engine" && (
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-800 dark:text-slate-200 transition-opacity duration-200">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">1</span>
                  <p>
                    <span className="text-purple-600 dark:text-purple-400">import</span>{" "}
                    <span className="text-slate-800 dark:text-slate-100 font-semibold">{"{ NatleStudio }"}</span>{" "}
                    <span className="text-purple-600 dark:text-purple-400">from</span>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">&quot;@natle/core&quot;</span>;
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 opacity-60">
                  <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">2</span>
                  <p className="text-slate-400 dark:text-slate-500 italic">
                    {"// ⏰ Time-synced environment: "}
                    {localTime} ({isNightTime ? "Night time detected" : "Daylight detected"})
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">3</span>
                  <p>
                    <span className="text-blue-600 dark:text-blue-400">export const</span>{" "}
                    <span className="text-amber-600 dark:text-amber-300 font-semibold">studio</span> ={" "}
                    <span className="text-purple-600 dark:text-purple-400">new</span>{" "}
                    <span className="text-teal-600 dark:text-teal-300 font-semibold">NatleStudio</span>({"{"}
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 pl-4">
                  <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">4</span>
                  <p>
                    <span className="text-slate-600 dark:text-slate-400">client:</span>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">&quot;Series B → Enterprise&quot;</span>,
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 pl-4">
                  <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">5</span>
                  <p>
                    <span className="text-slate-600 dark:text-slate-400">throughput:</span>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">&quot;12M req/day @ p99 0.8ms&quot;</span>,
                  </p>
                </div>

                {/* The Switch Line */}
                <div className="flex items-center gap-3 sm:gap-4 pl-4 my-2 py-2 px-2.5 -mx-2.5 rounded-xl bg-blue-500/10 dark:bg-[#00E5FF]/10 border border-blue-500/25 dark:border-[#00E5FF]/35 shadow-xs transition-all duration-200">
                  <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">6</span>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-blue-700 dark:text-cyan-300 font-bold">lights:</span>
                    <button
                      ref={switchRef}
                      type="button"
                      onPointerDown={onSwitchPointerDown}
                      onPointerMove={onSwitchPointerMove}
                      onPointerUp={onSwitchPointerUp}
                      onPointerCancel={() => {
                        setDragging(false);
                        setDragX(0);
                      }}
                      className={`group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-md cursor-grab active:cursor-grabbing touch-none ${
                        dragging ? "" : "transition-all duration-300"
                      } hover:scale-[1.03] active:scale-[0.96] ${
                        isDark
                          ? "bg-[#08101E] border-cyan-400/60 shadow-[0_0_20px_rgba(0,229,255,0.35)] text-cyan-300"
                          : "bg-amber-50 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.35)] text-amber-900"
                      }`}
                      style={{ transform: `translateX(${dragX}px)` }}
                    >
                      <span
                        className={`flex items-center justify-center w-5 h-5 rounded-full text-xs transition-transform duration-300 shadow-sm ${
                          isDark ? "bg-cyan-400 text-slate-950" : "bg-amber-400 text-slate-950"
                        }`}
                      >
                        {isDark ? "🌙" : "☀️"}
                      </span>
                      <span className="font-bold tracking-wide text-xs">{isDark ? '"NIGHT_OPS"' : '"DAYLIGHT"'}</span>
                      <span className={`h-2 w-2 rounded-full animate-ping ${isDark ? "bg-cyan-400" : "bg-amber-500"}`} />
                      <span className="text-[10px] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white transition-colors">
                        [DRAG OR CLICK]
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 pl-4">
                  <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">7</span>
                  <p>
                    <span className="text-slate-600 dark:text-slate-400">status:</span>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      &quot;ACTIVE_GRID // 0 incidents, {uptimeDays}d&quot;
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">8</span>
                  <p>{"});"}</p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-slate-400 dark:text-slate-600 w-4 text-right shrink-0 select-none">9</span>
                  <p>
                    <span className="text-amber-600 dark:text-amber-300 font-semibold">studio</span>.
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">deploy</span>();
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: architecture.json */}
            {activeTab === "architecture" && (
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 dark:text-slate-200">
                <p className="text-slate-400 dark:text-slate-500 italic mb-2">{"// Production cluster telemetry"}</p>
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
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
                    <span className="text-[10px] text-slate-400 block">DEPLOYS / WEEK</span>
                    <span className="text-amber-400 font-bold text-sm">312</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
                    <span className="text-[10px] text-slate-400 block">MTTR</span>
                    <span className="text-rose-400 font-bold text-sm">4m 12s</span>
                  </div>
                </div>
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

            {/* Mini Console Drawer */}
            <div className="relative px-4 py-2.5 border-t border-slate-900/[0.06] dark:border-white/[0.08] bg-slate-900 text-slate-300 font-mono text-[11px] flex flex-col gap-1">
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
              {displayedLogs.map((log, i) => (
                <p
                  key={i}
                  className={`leading-tight ${
                    i === displayedLogs.length - 1
                      ? isCompiling
                        ? "text-cyan-300 animate-pulse font-semibold"
                        : "text-emerald-300"
                      : "text-slate-400"
                  }`}
                >
                  {log}
                  {i === displayedLogs.length - 1 && <span className="terminal-caret">▍</span>}
                </p>
              ))}
              {showIdleHint && (
                <p className="text-slate-500 italic opacity-80 transition-opacity duration-500">
                  {"// still here? try "}
                  <kbd className="px-1 py-0.5 rounded bg-white/10 border border-white/15 text-[9px]">Space</kbd>
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Helper Shortcut */}
      <div className="mt-2.5 flex items-center justify-between px-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/15 text-[10px]">
            Space
          </kbd>
          <span>drag, click, or press to toggle</span>
        </span>
        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>99.99% SLA</span>
        </span>
      </div>

      {/* SVG Conduits — glowing light node travels only on toggle */}
      <svg
        className="pointer-events-none absolute -bottom-12 -left-28 w-56 h-36 overflow-visible hidden lg:block"
        viewBox="0 0 240 140"
      >
        <defs>
          <filter id="natle-conduit-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          id="natle-conduit-a"
          d="M 220 15 C 150 45, 80 95, 0 130"
          fill="none"
          stroke={isDark ? "#00E5FF" : "#1E7FE8"}
          strokeWidth="1.5"
          strokeOpacity="0.22"
          strokeDasharray="6 4"
        />
        <path
          id="natle-conduit-b"
          d="M 218 26 C 142 58, 70 100, 6 128"
          fill="none"
          stroke={isDark ? "#00E5FF" : "#1E7FE8"}
          strokeWidth="1"
          strokeOpacity="0.12"
          strokeDasharray="4 5"
        />

        <circle cx="220" cy="15" r="3.5" fill={isDark ? "#00E5FF" : "#1E7FE8"} />
        <circle cx="0" cy="130" r="4.5" fill={isDark ? "#00E5FF" : "#1E7FE8"} />

        {/* Traveling node + comet trail — remounted via key on each toggle */}
        {[0, 0.06, 0.12].map((delay, i) => (
          <circle
            key={`${pulseKey}-${i}`}
            r={4 - i}
            fill={isDark ? "#00E5FF" : "#F59E0B"}
            filter="url(#natle-conduit-glow)"
            opacity={0}
          >
            <animateMotion dur="0.9s" begin={`${delay}s`} fill="freeze">
              <mpath href="#natle-conduit-a" />
            </animateMotion>
            <animate
              attributeName="opacity"
              values={`0;${1 - i * 0.3};${1 - i * 0.3};0`}
              keyTimes="0;0.05;0.8;1"
              dur="0.9s"
              begin={`${delay}s`}
              fill="freeze"
            />
          </circle>
        ))}
      </svg>

      <style jsx>{`
        .terminal-caret {
          display: inline-block;
          margin-left: 1px;
          animation: natle-caret-blink 1s steps(1) infinite;
        }
        @keyframes natle-caret-blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        .sudo-particle {
          animation: natle-particle-burst 0.9s ease-out forwards;
        }
        @keyframes natle-particle-burst {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(0deg) scale(0.6);
          }
          15% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx, 12px), -40px) rotate(180deg) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .terminal-caret,
          .sudo-particle {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
