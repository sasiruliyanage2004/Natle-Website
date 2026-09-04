"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import NatleLogo from "@/components/common/NatleLogo";
import CommandSearch from "@/components/common/CommandSearch";

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
      <div className="rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between w-full max-w-7xl bg-[#0d1535]/80 backdrop-blur-2xl border border-[#0ea5e9]/15 shadow-[0_8px_40px_-10px_rgba(0,0,0,0.8)] transition-all">
        
        {/* ================= ZONE 1: LOGO ================= */}
        <Link href="/" className="flex items-center shrink-0">
          <NatleLogo showTagline={true} />
        </Link>

        {/* ================= ZONE 2: CENTER NAV CAPSULE (DESKTOP) ================= */}
        <nav className="hidden lg:flex items-center bg-[#111c45]/50 rounded-full p-1 gap-1 border border-[#0ea5e9]/10">
          {navRoutes.map((route) => {
            const isActive = isActiveLink(route.path);

            return (
              <Link
                key={route.path}
                href={route.path}
                className={clsx(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[#1a3a8f] to-[#0ea5e9] text-white shadow-sm shadow-[#0ea5e9]/20"
                    : "text-[#94a3b8] hover:text-[#0ea5e9] hover:bg-white/5"
                )}
              >
                <span>{route.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* ================= ZONE 3: RIGHT ACTIONS ================= */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          <CommandSearch />

          <Link
            href="/contact"
            className="gradient-btn hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider shadow-md transition-all duration-300 shrink-0"
          >
            <span>Request Demo</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
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
            className="absolute top-20 left-4 right-4 rounded-3xl bg-[#0d1535]/95 backdrop-blur-2xl border border-[#0ea5e9]/20 p-6 shadow-2xl lg:hidden z-50 text-white"
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
                        ? "bg-[#0ea5e9]/10 text-[#0ea5e9]"
                        : "text-[#94a3b8] hover:bg-[#111c45]/50"
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
                className="gradient-btn mt-3 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black uppercase tracking-wider shadow-md"
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

