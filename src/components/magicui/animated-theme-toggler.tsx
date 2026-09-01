"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export interface AnimatedThemeTogglerProps {
  className?: string;
}

export function AnimatedThemeToggler({ className }: AnimatedThemeTogglerProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/80 text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 cursor-pointer overflow-hidden",
        className
      )}
    >
      {/* Background Soft Glow */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0052FF]/10 to-[#10E599]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-[#00D2FF]/20 dark:to-[#10E599]/20" />

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className="relative flex items-center justify-center text-[#10E599]"
          >
            {/* Custom Animated Moon SVG with Star Twinkle */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(16,229,153,0.6)]"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-1 -right-1 h-1 w-1 rounded-full bg-[#00D2FF]"
            />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className="relative flex items-center justify-center text-[#F59E0B]"
          >
            {/* Custom Animated Sun SVG with Rotating Rays */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default AnimatedThemeToggler;
