"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("App Error caught by boundary:", error);
  }, [error]);

  return (
    <section className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-500/10 dark:bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-azure/10 dark:bg-azure/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-500 text-xs font-mono uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          Runtime Diagnostic &bull; Error Intercepted
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-ink dark:text-white">
          System Interrupted
        </h1>

        <div className="space-y-2">
          <p className="text-sm sm:text-base text-ink/60 dark:text-white/60 leading-relaxed">
            An unexpected glitch occurred while rendering this interface. Our system has preserved state.
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-ink/40 dark:text-white/40">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-azure text-white font-medium text-sm shadow-[0_0_20px_rgba(30,127,232,0.4)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Re-initialize Interface
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-ink/10 dark:border-white/15 text-ink dark:text-white text-sm font-medium bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all"
          >
            Return to Headquarters
          </Link>
        </div>
      </div>
    </section>
  );
}
