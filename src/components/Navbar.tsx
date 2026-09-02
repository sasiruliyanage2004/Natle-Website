"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import NatleLogo from "@/components/common/NatleLogo";
import CommandSearch from "@/components/common/CommandSearch";
import AnimatedThemeToggler from "@/components/magicui/animated-theme-toggler";
import SoundToggle from "@/components/common/SoundToggle";

const navRoutes = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Solutions", path: "/solutions" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-8 flex justify-center select-none">
      <div className="rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between w-full max-w-7xl bg-white/85 dark:bg-[#070d07]/90 backdrop-blur-xl border border-slate-200/80 dark:border-emerald-500/20 shadow-[0_8px_32px_0_rgba(7,19,38,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.8),0_0_50px_-15px_rgba(16,229,153,0.08)] transition-all">
        
        {/* ================= ZONE 1: LOGO ================= */}
        <Link href="/" className="flex items-center shrink-0">
          <NatleLogo showTagline={true} />
        </Link>

        {/* ================= ZONE 2: CENTER NAV CAPSULE (DESKTOP) ================= */}
        <nav className="hidden lg:flex items-center bg-slate-100/70 dark:bg-white/[0.05] rounded-full p-1 gap-1 border border-slate-200/70 dark:border-emerald-500/15">
          {navRoutes.map((route) => {
            const isActive = isActiveLink(route.path);

            return (
              <Link
                key={route.path}
                href={route.path}
                className={clsx(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
                  isActive
                    ? "bg-[#059669] text-white shadow-sm shadow-emerald-600/30 dark:bg-[#059669] dark:text-white"
                    : "text-slate-600 dark:text-emerald-100/70 hover:text-[#059669] dark:hover:text-[#10e599] hover:bg-white/80 dark:hover:bg-white/10"
                )}
              >
                <span>{route.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* ================= ZONE 3: RIGHT ACTIONS (ALIGNED & CLUTTER-FREE) ================= */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* 1. Harmonized Spotlight Command Search */}
          <CommandSearch />

          {/* 2. Magic UI Animated Theme Toggler */}
          <AnimatedThemeToggler />

          {/* 3. Bespoke Tactile Sound Toggle */}
          <SoundToggle />

          {/* 4. Primary Emerald Action CTA Button */}
          <Link
            href="/contact"
            className="gradient-btn hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Request Demo</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 rounded-3xl bg-white/95 dark:bg-[#080d08]/95 backdrop-blur-2xl border border-slate-200 dark:border-emerald-900/50 p-6 shadow-2xl lg:hidden z-50 text-slate-900 dark:text-white"
          >
            <nav className="flex flex-col gap-2">
              {navRoutes.map((route) => {
                const isActive = isActiveLink(route.path);
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all",
                      isActive
                        ? "bg-[#059669]/10 text-[#059669] dark:text-[#10e599]"
                        : "text-slate-700 dark:text-emerald-100/80 hover:bg-slate-50 dark:hover:bg-emerald-950/40"
                    )}
                  >
                    <span>{route.name}</span>
                    {isActive && <ArrowRight className="h-4 w-4" />}
                  </Link>
                );
              })}
              
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="gradient-btn mt-3 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md"
              >
                <span>Request Assessment Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
