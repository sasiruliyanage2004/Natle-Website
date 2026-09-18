"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav";
import NatleLogo from "./NatleLogo";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

import {
  Home,
  Info,
  Layers,
  Box,
  FolderGit2,
  Newspaper,
  Users,
  MessageSquare
} from "lucide-react";

const getIconForPath = (path: string) => {
  switch (path) {
    case "/": return Home;
    case "/about": return Info;
    case "/services": return Layers;
    case "/products": return Box;
    case "/projects": return FolderGit2;
    case "/blog": return Newspaper;
    case "/careers": return Users;
    case "/contact": return MessageSquare;
    default: return Box;
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 12);

      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isNearBottom = currentY + windowHeight >= docHeight - 150;

      if (isNearBottom) {
        setVisible(false);
      } else if (currentY > lastY && currentY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-4 left-4 right-4 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:top-6 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`flex items-center justify-between h-[60px] lg:h-[72px] rounded-full px-2.5 lg:px-3.5 transition-all duration-300 shadow-2xl backdrop-blur-2xl border ${
          scrolled
            ? "bg-white/90 dark:bg-[#0B0D14]/90 border-slate-900/10 dark:border-white/10"
            : "bg-white/60 dark:bg-[#0B0D14]/60 border-slate-900/5 dark:border-white/5"
        }`}
      >
        <Link href="/" data-anchor="nav-logo" className="flex items-center gap-2 shrink-0 transition-all duration-300 pl-3 pr-6 lg:pl-4 lg:pr-8" aria-label="NATLE home">
          <NatleLogo className="h-5 lg:h-6 w-auto transition-all duration-300" showTagline={false} />
        </Link>

        {/* Navigation Links inside the Pill (Expanding Icons) */}
        <nav className="hidden lg:flex items-center gap-2 lg:gap-2.5 px-4 lg:px-6 border-l border-slate-900/10 dark:border-white/10">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            const Icon = getIconForPath(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`relative flex items-center justify-center h-[36px] lg:h-[44px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  active
                    ? "px-4 lg:px-5 text-ink dark:text-white bg-slate-900/5 dark:bg-white/[0.08]"
                    : "w-[36px] lg:w-[44px] px-0 text-ink/60 dark:text-slate-400 hover:text-ink dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/[0.04]"
                }`}
                title={!active ? item.label : undefined}
              >
                <Icon className="w-4 h-4 lg:w-[18px] lg:h-[18px] shrink-0 transition-transform duration-500" strokeWidth={active ? 2.5 : 2} />
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center ${
                    active ? "max-w-[120px] lg:max-w-[140px] opacity-100 ml-2 lg:ml-2.5" : "max-w-0 opacity-0 ml-0"
                  }`}
                >
                  <span className="whitespace-nowrap text-[13px] lg:text-[14px] font-semibold">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2 lg:gap-3 pl-4 lg:pl-6 border-l border-slate-900/10 dark:border-white/10">
          <ThemeToggle />
          <Magnetic>
            <Link
              href="/contact"
              prefetch={true}
              className="inline-flex items-center justify-center whitespace-nowrap gap-1.5 rounded-full bg-slate-950 text-white px-5 py-2.5 lg:px-7 lg:py-3.5 text-[14px] lg:text-[15px] font-semibold hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors shadow-sm ml-1 lg:ml-2"
            >
              Start a project ↗
            </Link>
          </Magnetic>
        </div>

        <div className="lg:hidden flex items-center gap-1 pl-4">
          <ThemeToggle />
          <button
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors ml-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`block h-[2px] w-5 bg-ink dark:bg-white transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-5 bg-ink dark:bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-5 bg-ink dark:bg-white transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Translucent Frosted Glass Mobile Menu (Dropdown from the pill) */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out absolute top-[76px] left-0 right-0 bg-white/95 dark:bg-[#07090E]/95 backdrop-blur-3xl rounded-3xl border border-black/[0.05] dark:border-white/[0.08] shadow-2xl ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col py-6 px-6">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`py-3 text-[15px] font-medium border-b border-ink/5 dark:border-white/10 last:border-0 ${
                pathname === item.href ? "text-brand font-semibold" : "text-ink/70 dark:text-slate-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            prefetch={true}
            className="mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-slate-950 text-white px-5 py-3.5 text-[15px] font-semibold hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors shadow-sm"
          >
            Start a project ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}
