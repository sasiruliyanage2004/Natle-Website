"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Search,
  Sparkles
} from "lucide-react";
import clsx from "clsx";
import NatleLogo from "@/components/common/NatleLogo";
import CommandSearch from "@/components/common/CommandSearch";
import ThemeToggle from "@/components/ThemeToggle";

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
      <div className="rounded-full px-5 sm:px-6 py-3 flex items-center justify-between w-full max-w-7xl bg-white/75 dark:bg-slate-950/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all">
        
        {/* 1. Official Pristine Natle Logo */}
        <Link href="/" className="flex items-center">
          <NatleLogo showTagline={true} />
        </Link>

        {/* 2. Navigation Capsule Links (Desktop) */}
        <nav className="hidden lg:flex items-center bg-gray-100/60 dark:bg-slate-900/70 rounded-full px-2 py-1 gap-1 border border-gray-200/60 dark:border-white/10">
          {navRoutes.map((route) => {
            const isActive = isActiveLink(route.path);

            return (
              <Link
                key={route.path}
                href={route.path}
                className={clsx(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-[#007bff] to-[#00d2ff] text-white shadow-md shadow-[#007bff]/30"
                    : "text-slate-600 dark:text-slate-300 hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] hover:bg-white/60 dark:hover:bg-white/10"
                )}
              >
                <span>{route.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* 3. Right Actions: Spotlight Search + Theme Toggle + Request Demo */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Spotlight Command Search */}
          <CommandSearch />

          {/* Sun / Moon Animated Dark Theme Toggle */}
          <ThemeToggle />

          {/* Request Demo Gradient Button */}
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
            className="lg:hidden p-2 rounded-full text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
            className="lg:hidden fixed top-24 inset-x-4 max-w-7xl mx-auto rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 p-6 shadow-2xl backdrop-blur-2xl"
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
                        ? "bg-gradient-to-r from-[#007bff] to-[#00d2ff] text-white shadow-md"
                        : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
