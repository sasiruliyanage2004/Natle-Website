"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight, 
} from "lucide-react";
import clsx from "clsx";
import NatleLogo from "@/components/common/NatleLogo";
import CommandSearch from "@/components/common/CommandSearch";
import AnimatedThemeToggler from "@/components/magicui/animated-theme-toggler";

interface NavRoute {
  name: string;
  path: string;
}

const navRoutes: NavRoute[] = [
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
    <header className="fixed top-0 left-0 right-0 z-50 pt-5 px-4 md:px-8 flex justify-center select-none">
      <div className="rounded-full px-5 sm:px-6 py-3 flex items-center justify-between w-full max-w-7xl bg-white/80 dark:bg-[#0a0f0a]/95 backdrop-blur-xl border border-white/70 dark:border-emerald-900/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.8),0_0_60px_-15px_rgba(16,229,153,0.08)] transition-all">
        
        {/* 1. Official Pristine Natle Logo */}
        <Link href="/" className="flex items-center">
          <NatleLogo showTagline={true} />
        </Link>

        {/* 2. Navigation Capsule Links (Desktop) */}
        <nav className="hidden lg:flex items-center bg-gray-100/70 dark:bg-[#0d140d]/90 rounded-full px-2 py-1 gap-1 border border-gray-200/70 dark:border-emerald-900/30">
          {navRoutes.map((route) => {
            const isActive = isActiveLink(route.path);

            return (
              <Link
                key={route.path}
                href={route.path}
                className={clsx(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-[#007bff] to-[#00d2ff] text-white shadow-md shadow-[#007bff]/30 dark:from-[#059669] dark:to-[#10e599] dark:shadow-emerald-500/30"
                    : "text-slate-600 dark:text-emerald-200/70 hover:text-[#0ea5e9] dark:hover:text-[#10e599] hover:bg-white/70 dark:hover:bg-emerald-950/40"
                )}
              >
                <span>{route.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* 3. Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Spotlight Command Search */}
          <CommandSearch />

          {/* Prompt UI Design Switcher */}
          <Link
            href="/prompt-design"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-[#10e599] hover:bg-emerald-500/20 transition-all hover:scale-105"
            title="Explore separate Prompt UI Design Version"
          >
            <span>🎨 Prompt UI</span>
          </Link>

          {/* Magic UI Animated Theme Toggler */}
          <AnimatedThemeToggler />

          {/* Request Demo Button */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #007bff, #00d2ff, #00c9a7)",
            }}
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
            className="lg:hidden fixed top-24 inset-x-4 max-w-7xl mx-auto rounded-3xl border border-slate-200/90 dark:border-emerald-900/40 bg-white/95 dark:bg-[#080d08]/98 p-6 shadow-2xl backdrop-blur-2xl"
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
                        ? "bg-gradient-to-r from-[#007bff] to-[#00d2ff] text-white shadow-md dark:from-[#059669] dark:to-[#10e599]"
                        : "text-slate-800 dark:text-emerald-100/80 hover:bg-slate-100 dark:hover:bg-emerald-950/40"
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
                className="mt-3 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black uppercase tracking-wider text-white shadow-md"
                style={{
                  background: "linear-gradient(135deg, #007bff, #00d2ff, #00c9a7)",
                }}
              >
                <span>Request Assessment Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/prompt-design"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-[#10e599]"
              >
                <span>🎨 View Prompt UI Design Version</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
