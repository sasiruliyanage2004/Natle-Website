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
  const giantTextRef = useRef<HTMLDivElement>(null);

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
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top bottom",
                end: "bottom bottom",
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
      <footer className="relative lg:fixed bottom-0 left-0 flex min-h-screen lg:h-screen w-full flex-col justify-end overflow-hidden bg-black text-white pb-0">
        
        {/* 1. MURAL & GLOW */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer-landscape-dark.jpg"
            alt="AI Architecture Data Map"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(30,127,232,0.1)_0%,rgba(18,184,166,0.05)_50%,transparent_70%)] rounded-full blur-[100px] pointer-events-none z-0" />

        {/* 2. MARQUEE STRIP (At the very top of the footer) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden border-b border-white/5 bg-black/40 backdrop-blur-md py-2.5 z-20">
          <div className="flex w-max animate-marquee-fast text-[11px] font-bold tracking-[0.3em] text-white/50 uppercase">
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* 3. DIRECTORY GRID */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mb-8 mt-auto pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start pb-12 border-b border-white/10">
            {/* Column 1: Brand */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="inline-block mb-4">
                  <NatleLogo className="h-8 w-auto" showTagline={false} />
                </div>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
                  Empowering ambitious founders and enterprise teams with scalable, production-ready software systems and AI infrastructure.
                </p>
              </div>

              <div>
                <div className="space-y-2 text-sm font-mono text-white/60">
                  <p className="flex items-center gap-3">
                    <span className="text-cyan-400">»</span>
                    <a href="mailto:info@natle.dev" className="hover:text-white transition-colors">info@natle.dev</a>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-cyan-400">»</span>
                    <a href="tel:+94112507601" className="hover:text-white transition-colors">+94 11 250 7601</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Capabilities */}
            <div className="lg:col-span-3">
              <h4 className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white/40 mb-6">Capabilities</h4>
              <ul className="space-y-3">
                {FOOTER_SERVICES.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-white/70 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 group">
                      <span className="text-xs text-cyan-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">»</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Studio */}
            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white/40 mb-6">Studio</h4>
              <ul className="space-y-3">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-white/70 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 group">
                      <span className="text-xs text-cyan-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">»</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="lg:col-span-3">
              <h4 className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white/40 mb-6">The Letter</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Monthly technical briefings on AI systems, scalable infrastructure, and product engineering.
              </p>

              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-lg bg-white text-black font-bold text-sm hover:bg-cyan-50 transition-colors shrink-0"
                >
                  {subscribed ? "Joined ✓" : "Join"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 4. GIANT NATLE WATERMARK */}
        <div className="relative z-0 flex justify-center pointer-events-none overflow-hidden h-32 sm:h-48 lg:h-64 mt-4">
          <div
            ref={giantTextRef}
            className="absolute bottom-[-10%] sm:bottom-[-15%] lg:bottom-[-20%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[22vw] sm:text-[24vw] lg:text-[26vw] tracking-tight font-black leading-none text-center"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.08)",
            }}
            aria-hidden="true"
          >
            NATLE
          </div>
        </div>

        {/* 5. BOTTOM BAR */}
        <div className="relative z-20 w-full py-6 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black border-t border-white/5">
          <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase order-2 sm:order-1">
            © {new Date().getFullYear()} NATLE. All rights reserved.
          </div>
          
          <Magnetic>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all group order-1 sm:order-2"
              aria-label="Scroll to top"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </Magnetic>

          <div className="order-3 flex gap-6 text-white/40 text-[10px] font-mono uppercase tracking-widest">
            <Link href="/about" className="hover:text-cyan-400 transition-colors">Privacy</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
