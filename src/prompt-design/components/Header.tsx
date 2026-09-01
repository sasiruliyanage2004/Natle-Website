"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/prompt-design/lib/data";
import Wordmark from "./Wordmark";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="pt-3 px-3 lg:pt-4 lg:px-4">
        <div className="container-edge !px-0">
          <div className="glass-strong rounded-2xl px-4 lg:px-6 h-16 flex items-center justify-between">
            <Link href="/prompt-design" onClick={() => setOpen(false)} aria-label="NATLE home">
              <Wordmark />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                      active
                        ? "bg-ink text-pearl"
                        : "text-ink-soft hover:text-ink hover:bg-ink/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:block">
              <Link
                href="/prompt-design/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-pearl text-sm font-medium px-5 py-2.5 hover:bg-quantum transition-colors"
              >
                Book a demo
              </Link>
            </div>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink/5"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5 items-center">
                <span
                  className={`block h-[1.5px] w-5 bg-ink transition-transform ${
                    open ? "translate-y-[3.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-5 bg-ink transition-transform ${
                    open ? "-translate-y-[3.5px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {open && (
            <div className="glass-strong rounded-2xl mt-2 p-3 lg:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-ink-soft hover:bg-ink/5 hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/prompt-design/contact"
                onClick={() => setOpen(false)}
                className="block mt-1 px-4 py-3 rounded-xl text-sm font-medium bg-ink text-pearl text-center"
              >
                Book a demo
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
