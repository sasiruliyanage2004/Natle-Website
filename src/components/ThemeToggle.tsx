"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:border-[#0052FF]/50 hover:bg-white hover:scale-105 active:scale-95 dark:border-white/15 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-[#10E599]/50"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center text-[#10E599]"
          >
            <Moon className="h-4 w-4" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center text-[#F59E0B]"
          >
            <Sun className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
