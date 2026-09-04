"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NatleLogo from "@/components/common/NatleLogo";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Services", path: "/services", hasDropdown: true },
  { name: "Solutions", path: "/solutions" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 select-none">
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between w-full max-w-7xl rounded-full px-5 py-2.5 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(7, 13, 36, 0.88)"
            : "rgba(14, 20, 50, 0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(14, 165, 233, 0.18)",
          boxShadow: scrolled
            ? "0 8px 40px -10px rgba(0,0,0,0.9), 0 0 0 1px rgba(14,165,233,0.08)"
            : "0 4px 24px -6px rgba(0,0,0,0.5)",
        }}
      >
        {/* ── LEFT: Logo ── */}
        <Link href="/" className="flex items-center shrink-0 mr-6">
          <NatleLogo showTagline={true} />
        </Link>

        {/* ── CENTER: Nav Links (plain text, no inner pill) ── */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: isActive(link.path) ? "#0ea5e9" : "#94a3b8",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#e2e8f0")}
              onMouseLeave={e => (e.currentTarget.style.color = isActive(link.path) ? "#0ea5e9" : "#94a3b8")}
            >
              {link.name}
              {link.hasDropdown && (
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              )}
            </Link>
          ))}
          {/* Contact as plain link too */}
          <Link
            href="/contact"
            className="flex items-center px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ color: isActive("/contact") ? "#0ea5e9" : "#94a3b8" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#e2e8f0")}
            onMouseLeave={e => (e.currentTarget.style.color = isActive("/contact") ? "#0ea5e9" : "#94a3b8")}
          >
            Contact
          </Link>
        </nav>

        {/* ── RIGHT: Ghost Outlined CTA ── */}
        <div className="flex items-center gap-3 shrink-0 ml-6">
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(14, 165, 233, 0.06)",
              border: "1px solid rgba(14, 165, 233, 0.35)",
              color: "#e2e8f0",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(14,165,233,0.14)";
              e.currentTarget.style.borderColor = "rgba(14,165,233,0.65)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(14,165,233,0.06)";
              e.currentTarget.style.borderColor = "rgba(14,165,233,0.35)";
              e.currentTarget.style.color = "#e2e8f0";
            }}
          >
            Request Demo
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-full text-[#94a3b8] hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.06)" }}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="absolute top-20 left-4 right-4 rounded-3xl p-6 shadow-2xl lg:hidden z-50"
            style={{
              background: "rgba(7, 13, 36, 0.96)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(14, 165, 233, 0.2)",
            }}
          >
            <nav className="flex flex-col gap-1">
              <Link href="/" onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{ color: isActive("/") ? "#0ea5e9" : "#94a3b8" }}>
                Home
              </Link>
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path} onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ color: isActive(link.path) ? "#0ea5e9" : "#94a3b8" }}>
                  {link.name}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #1a3a8f 0%, #0ea5e9 55%, #5aec8f 100%)" }}>
                Request Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
