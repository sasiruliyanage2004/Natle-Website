"use client";

import React, { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global Error caught:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-[#07090E] text-white min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs font-mono uppercase tracking-widest">
            Critical Failure &bull; Fallback Engaged
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Architecture Exception
          </h1>

          <p className="text-sm text-white/60 leading-relaxed">
            A critical failure occurred at the system level. State has been secured.
          </p>

          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1E7FE8] text-white font-medium text-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Recover Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
