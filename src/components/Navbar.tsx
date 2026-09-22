"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav";
import NatleLogo from "./NatleLogo";
import Magnetic from "./Magnetic";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter links for the main desktop nav (we don't need Home/Contact in the center usually)
  const desktopLinks = NAV_LINKS.filter(
    (link) => link.href !== "/" && link.href !== "/contact"
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-[101] flex items-center gap-2 group outline-none"
            aria-label="Home"
          >
            <div className="w-8 h-8 md:w-9 md:h-9">
              <NatleLogo />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-white/80 transition-colors">
              NATLE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {desktopLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-[101]">
            <div className="hidden md:block">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2.5 text-sm font-bold whitespace-nowrap hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                >
                  Start a project
                </Link>
              </Magnetic>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -mr-2 text-white/80 hover:text-white transition-colors outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl transition-all duration-500 lg:hidden flex flex-col justify-center px-8 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6 text-center">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-display text-3xl font-bold tracking-tight transition-colors ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-8 pt-8 border-t border-white/10 flex justify-center">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-4 text-lg font-bold w-full max-w-sm"
            >
              Start a project
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
