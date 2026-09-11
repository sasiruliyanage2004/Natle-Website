"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav";
import NatleLogo from "./NatleLogo";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        scrolled
          ? "bg-white/60 dark:bg-[#07090E]/60 backdrop-blur-2xl border-b border-slate-900/[0.06] dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-white/25 dark:bg-[#07090E]/25 backdrop-blur-xl border-b border-slate-900/[0.04] dark:border-white/[0.05]"
      }`}
    >
      <div className="container-content flex items-center justify-between h-[76px]">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="NATLE home">
          <NatleLogo className="h-9 w-auto" showTagline={false} />
        </Link>

        {/* Floating Glass Capsule Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/40 dark:bg-white/[0.04] backdrop-blur-md px-3 py-1.5 rounded-full border border-black/[0.05] dark:border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`relative px-4 py-1.5 text-[14px] font-medium rounded-full transition-all duration-200 ${
                  active
                    ? "text-ink dark:text-white bg-white/80 dark:bg-white/[0.12] shadow-sm"
                    : "text-ink/70 dark:text-slate-300 hover:text-ink dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/[0.06]"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-3 right-3 -bottom-[1px] h-[2px] bg-brand-gradient rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Magnetic>
            <Link
              href="/contact"
              prefetch={true}
              className="inline-block rounded-full bg-ink text-white px-5 py-2.5 text-sm font-semibold hover:bg-ink-soft dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 transition-colors shadow-sm"
            >
              Start a project
            </Link>
          </Magnetic>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full bg-white/40 dark:bg-white/[0.06] backdrop-blur-md border border-black/[0.04] dark:border-white/[0.08]"
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

      {/* Translucent Frosted Glass Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out bg-white/75 dark:bg-[#07090E]/80 backdrop-blur-2xl border-t border-b border-black/[0.05] dark:border-white/[0.08] shadow-2xl ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-content flex flex-col py-4">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`py-3 text-base font-medium border-b border-ink/5 dark:border-white/10 last:border-0 ${
                pathname === item.href ? "text-azure font-semibold" : "text-ink/80 dark:text-slate-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            prefetch={true}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-ink text-white px-5 py-3 text-sm font-semibold hover:bg-ink-soft dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 transition-colors shadow-sm"
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
