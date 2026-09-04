"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 select-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between w-full max-w-7xl rounded-full px-4 py-2.5 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10, 10, 30, 0.85)"
            : "rgba(13, 11, 46, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          boxShadow: scrolled
            ? "0 8px 40px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.1)"
            : "0 4px 20px -5px rgba(0,0,0,0.5)"
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <NatleLogo showTagline={true} />
        </Link>

        {/* Center Nav — Desktop */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {navRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 text-[#94a3b8] hover:text-white"
              style={isActive(route.path) ? {
                background: "linear-gradient(135deg, rgba(26,58,143,0.5) 0%, rgba(14,165,233,0.4) 100%)",
                border: "1px solid rgba(14,165,233,0.5)",
                color: "#e0f2fe"
              } : {}}
            >
              {route.name}
              {isActive(route.path) && (
                <span className="absolute inset-x-3 -bottom-0.5 h-px rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent, #818cf8, transparent)" }}></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <CommandSearch />

          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #1a3a8f 0%, #0ea5e9 55%, #5aec8f 100%)",
              boxShadow: "0 4px 20px -4px rgba(14,165,233,0.5)"
            }}
          >
            Request Demo
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 rounded-3xl p-6 shadow-2xl lg:hidden z-50"
            style={{
              background: "rgba(10, 10, 30, 0.96)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(99,102,241,0.2)"
            }}
          >
            <nav className="flex flex-col gap-2">
              {navRoutes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all"
                  style={isActive(route.path) ? {
                    background: "rgba(99,102,241,0.15)",
                    color: "#a5b4fc"
                  } : { color: "#94a3b8" }}
                >
                  {route.name}
                  {isActive(route.path) && <ArrowRight className="w-4 h-4" />}
                </Link>
              ))}

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7)" }}
              >
                Request Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
