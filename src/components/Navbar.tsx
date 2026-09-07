"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav";
import NatleLogo from "./NatleLogo";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
        scrolled
          ? "bg-paper/90 backdrop-blur-md shadow-[0_1px_0_rgba(11,30,61,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-content flex items-center justify-between h-[76px]">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="NATLE home">
          <NatleLogo className="h-9 w-auto" showTagline={false} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-[15px] font-medium rounded-full transition-colors ${
                  active ? "text-ink" : "text-ink/60 hover:text-ink"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-4 right-4 -bottom-[2px] h-[2px] bg-brand-gradient rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Magnetic>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-ink text-white px-5 py-2.5 text-sm font-semibold hover:bg-ink-soft transition-colors"
            >
              Start a project
            </Link>
          </Magnetic>
        </div>

        <button
          className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block h-[2px] w-6 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-6 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out bg-paper border-t border-ink/5 ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-content flex flex-col py-4">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 text-base font-medium border-b border-ink/5 last:border-0 ${
                pathname === item.href ? "text-azure" : "text-ink/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-ink text-white px-5 py-3 text-sm font-semibold"
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
