"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOOTER_SERVICES, FOOTER_COMPANY } from "@/lib/nav";
import NatleLogo from "./NatleLogo";
import Magnetic from "./Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Enterprise Architecture</span> <span className="text-white/20">•</span>
    <span>Web3 & Blockchain</span> <span className="text-white/20">•</span>
    <span>Custom Software</span> <span className="text-white/20">•</span>
    <span>AI Integration</span> <span className="text-white/20">•</span>
    <span>Scalable Infrastructure</span> <span className="text-white/20">•</span>
  </div>
);

export default function Footer() {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);
  const landscapeRef = useRef<HTMLDivElement>(null);

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      if (window.innerWidth >= 1024) {
        if (giantTextRef.current) {
          gsap.fromTo(
            giantTextRef.current,
            { y: 150, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top bottom",
                end: "center center",
                scrub: 1.5,
              },
            }
          );
        }
      }
    }, wrapperRef);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-screen lg:h-screen w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer
        ref={footerRef}
        className="relative lg:fixed bottom-0 left-0 flex min-h-screen lg:h-screen w-full flex-col justify-between overflow-hidden bg-black text-white transition-colors duration-500"
      >
        {/* 1. MURAL & GLOW */}
        <div
          ref={landscapeRef}
          className="absolute inset-x-0 bottom-0 h-[58%] sm:h-[62%] lg:h-[64%] pointer-events-none overflow-hidden select-none z-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer-landscape-dark.jpg"
            alt="AI Architecture Data Map"
            className="w-full h-full object-cover object-top opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="absolute left-1/2 top-1/3 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(30,127,232,0.08)_0%,rgba(18,184,166,0.05)_40%,transparent_70%)] rounded-full blur-[100px] pointer-events-none z-0" />

        {/* 2. GIANT NATLE WATERMARK */}
        <div className="absolute inset-x-0 bottom-0 z-0 flex justify-center pointer-events-none overflow-hidden">
          <div
            ref={giantTextRef}
            className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap z-[1] pointer-events-none select-none text-[18vw] sm:text-[20vw] lg:text-[22vw] tracking-[0.14em] font-black leading-none text-center w-full"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.05)",
            }}
            aria-hidden="true"
          >
            NATLE
          </div>
        </div>

        {/* 3. MARQUEE STRIP */}
        <div className="relative lg:absolute top-0 lg:top-[68px] left-0 w-full overflow-hidden border-y border-white/5 bg-black/60 backdrop-blur-xl py-2 z-20 shadow-xs">
          <div className="flex w-max animate-marquee-fast text-[11px] font-bold tracking-[0.3em] text-white/50 uppercase">
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* 4. DIRECTORY GRID */}
        <div
          ref={directoryRef}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 sm:pt-28 lg:pt-32 pb-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start pb-6 border-b border-white/10">
            {/* Column 1: Brand */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="inline-block mb-3">
                  <NatleLogo className="h-7 w-auto" showTagline={false} />
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm mb-4">
                  Empowering ambitious founders and enterprise teams with scalable, production-ready software systems.
                </p>
              </div>

              <div>
                <div className="space-y-1.5 text-xs font-mono text-slate-300 pb-2 mb-2">
                  <p className="flex items-center gap-2">
                    <span className="text-azure font-bold">»</span>
                    <a href="mailto:info@natle.dev" className="hover:text-cyan-400 transition-colors font-medium">info@natle.dev</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-teal font-bold">»</span>
                    <a href="tel:+94112507601" className="hover:text-cyan-400 transition-colors">+94 11 250 7601</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Capabilities */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 mb-3">Capabilities</h4>
              <ul className="space-y-2">
                {FOOTER_SERVICES.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-xs sm:text-sm text-slate-300 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 group">
                      <span className="text-xs text-azure opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">»</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Studio */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 mb-3">Studio</h4>
              <ul className="space-y-2">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-xs sm:text-sm text-slate-300 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 group">
                      <span className="text-xs text-azure opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">»</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 mb-3">The Letter</h4>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                Monthly technical briefings on AI systems, scalable infrastructure, and product engineering.
              </p>

              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2 rounded-full text-xs font-mono bg-white/[0.08] border border-white/15 text-white placeholder:text-slate-400 focus:outline-none focus:border-azure transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-white text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shrink-0 shadow-sm"
                >
                  {subscribed ? "Joined ✓" : "Join"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 5. BOTTOM BAR */}
        <div className="relative z-20 w-full py-4 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.10] bg-black/80 backdrop-blur-md">
          <div className="text-white/50 text-[10px] font-mono tracking-wider uppercase order-2 sm:order-1">
            © {new Date().getFullYear()} NATLE. All rights reserved.
          </div>
          <div className="order-1 sm:order-2 flex gap-6 text-white/50 text-[10px] font-mono uppercase tracking-wider">
            <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
