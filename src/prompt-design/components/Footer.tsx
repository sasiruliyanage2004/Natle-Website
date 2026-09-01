"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/prompt-design/lib/data";
import NEmblem from "./NEmblem";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
  }

  return (
    <footer className="relative mt-32">
      {/* full-bleed landscape fading into footer */}
      <div className="relative h-[280px] lg:h-[360px] overflow-hidden -mb-px">
        <svg
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#EAF6FF" />
              <stop offset="1" stopColor="#F1F7F4" />
            </linearGradient>
            <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#84CC16" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#059669" />
              <stop offset="1" stopColor="#04543f" />
            </linearGradient>
            <linearGradient id="fadeOut" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#04543f" stopOpacity="0" />
              <stop offset="1" stopColor="#071326" stopOpacity="1" />
            </linearGradient>
          </defs>
          <rect width="1440" height="360" fill="url(#sky)" />
          <path
            d="M0,180 C240,120 400,200 640,150 C880,100 1080,190 1440,140 L1440,360 L0,360 Z"
            fill="url(#hill1)"
            opacity="0.55"
          />
          <path
            d="M0,240 C260,190 460,260 720,210 C980,160 1180,250 1440,200 L1440,360 L0,360 Z"
            fill="url(#hill2)"
          />
          <g opacity="0.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <circle
                key={i}
                cx={60 + i * 105}
                cy={250 + (i % 3) * 14}
                r="3.5"
                fill="#00D2FF"
              />
            ))}
          </g>
          <rect width="1440" height="360" fill="url(#fadeOut)" />
        </svg>
      </div>

      <div className="bg-ink text-pearl/90 pt-14 pb-10">
        <div className="container-edge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-pearl/10">
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-2">
                <NEmblem size={30} />
                <span className="font-display font-semibold text-lg text-pearl">
                  NATLE
                </span>
              </div>
              <p className="text-sm text-pearl/60 max-w-xs leading-relaxed">
                Software engineered in strategic partnership with Hosma Ceylon,
                bridging organic coconut coir estates and precision agriculture code.
              </p>
              <form onSubmit={handleSubmit} className="max-w-xs">
                <label className="text-xs font-medium text-pearl/50 uppercase tracking-wide">
                  Field notes, monthly
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@estate.com"
                    className="flex-1 min-w-0 bg-pearl/5 border border-pearl/15 rounded-full px-4 py-2.5 text-sm text-pearl placeholder:text-pearl/35 focus:outline-none focus:border-cyan"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-cyan text-ink text-sm font-medium px-4 py-2.5 hover:bg-mint transition-colors shrink-0"
                  >
                    Join
                  </button>
                </div>
                {subscribed && (
                  <p className="mt-2 text-xs text-mint">You&apos;re on the list.</p>
                )}
              </form>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs font-medium text-pearl/40 uppercase tracking-wide mb-4">
                Company
              </p>
              <ul className="space-y-3 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-pearl/70 hover:text-pearl">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs font-medium text-pearl/40 uppercase tracking-wide mb-4">
                Platform
              </p>
              <ul className="space-y-3 text-sm">
                <li><Link href="/prompt-design/products#fieldos" className="text-pearl/70 hover:text-pearl">FieldOS™</Link></li>
                <li><Link href="/prompt-design/products#yieldai" className="text-pearl/70 hover:text-pearl">YieldAI™</Link></li>
                <li><Link href="/prompt-design/products#tracelink" className="text-pearl/70 hover:text-pearl">TraceLink™</Link></li>
                <li><Link href="/prompt-design/contact" className="text-pearl/70 hover:text-pearl">Book a demo</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <p className="text-xs font-medium text-pearl/40 uppercase tracking-wide mb-4">
                Colombo headquarters
              </p>
              <p className="text-sm text-pearl/70 leading-relaxed">
                Level 34, West Tower<br />
                Colombo World Trade Center<br />
                Echelon Square, Colombo 01, Sri Lanka
              </p>
              <p className="mt-4 text-sm text-pearl/70">
                +94 11 234 5678<br />
                hello@natle.io
              </p>
              <p className="mt-4 text-xs text-amber">
                24/7 emergency support: +94 76 555 0199
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-pearl/40">
            <p>© 2026 NATLE, in partnership with Hosma Ceylon. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="#" className="hover:text-pearl/70">Privacy</Link>
              <Link href="#" className="hover:text-pearl/70">Terms</Link>
              <a href="https://hosmaceylon.com" target="_blank" rel="noopener noreferrer" className="hover:text-pearl/70">
                hosmaceylon.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
