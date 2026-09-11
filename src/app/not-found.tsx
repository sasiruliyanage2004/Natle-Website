import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-azure/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          Signal Lost &bull; Error 404
        </div>

        <h1 className="font-display text-7xl sm:text-8xl font-black tracking-tight text-ink">
          4<span className="text-azure">0</span>4
        </h1>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            Coordinates Not Found
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            The page you are looking for has been relocated, decommissioned, or never existed in this dimension.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-azure text-white font-medium text-sm shadow-[0_0_20px_rgba(30,127,232,0.4)] hover:brightness-110 active:scale-[0.98] transition-all"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return to Headquarters
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-line hover:border-ink/20 text-ink text-sm font-medium bg-surface/50 hover:bg-surface transition-all"
          >
            Contact Engineering
          </Link>
        </div>
      </div>
    </main>
  );
}
