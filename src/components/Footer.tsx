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
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 95%",
                end: "bottom bottom",
                scrub: 1.2,
              },
            }
          );
        }
        if (directoryRef.current) {
          gsap.fromTo(
            directoryRef.current,
            { y: 20 },
            {
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 95%",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        }
        if (landscapeRef.current) {
          gsap.fromTo(
            landscapeRef.current,
            { y: 25 },
            {
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 95%",
                end: "bottom bottom",
                scrub: 1,
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
        className="relative lg:fixed bottom-0 left-0 flex min-h-screen lg:h-screen w-full flex-col justify-between overflow-hidden bg-black text-white"
      >
        {/* 1. MURAL & GLOW */}
        <div
          ref={landscapeRef}
          className="absolute inset-x-0 bottom-0 h-[64%] pointer-events-none overflow-hidden select-none z-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer-landscape-dark.jpg"
            alt="AI Architecture Data Map"
            className="w-full h-full object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="absolute left-1/2 top-1/3 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(30,127,232,0.08)_0%,rgba(18,184,166,0.05)_40%,transparent_70%)] rounded-full blur-[100px] pointer-events-none z-0" />

        {/* 2. GIANT NATLE WATERMARK */}
        <div className="absolute inset-x-0 bottom-0 z-[1] flex justify-center pointer-events-none overflow-hidden">
          <div
            ref={giantTextRef}
            className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap text-[18vw] sm:text-[20vw] lg:text-[22vw] tracking-[0.14em] font-black leading-none text-center w-full"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)",
            }}
            aria-hidden="true"
          >
            NATLE
          </div>
        </div>

        {/* 3. MARQUEE STRIP (At the very top of the footer) */}
        {/* The navbar is fixed top-0. To ensure the marquee is visible, we place it exactly below it (top-[68px]) */}
        <div className="relative lg:absolute top-0 lg:top-[68px] left-0 w-full overflow-hidden border-y border-white/5 bg-black/60 backdrop-blur-xl py-2.5 z-[100] shadow-xs">
          <div className="flex w-max animate-marquee-fast text-[11px] font-bold tracking-[0.3em] text-white/50 uppercase">
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* 4. DIRECTORY GRID */}
        <div
          ref={directoryRef}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start pb-6 border-b border-white/5">
            {/* Column 1: Brand & Contact Info */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="inline-block mb-3">
                  <NatleLogo className="h-7 w-auto" showTagline={false} />
                </div>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-sm mb-4">
                  Empowering ambitious founders and enterprise teams with scalable, production-ready software systems, high-velocity cloud architecture, and AI infrastructure.
                </p>
              </div>

              <div>
                <div className="space-y-1.5 text-xs font-mono text-white/60 pb-2 mb-2">
                  <p className="flex items-center gap-2">
                    <span className="text-cyan-500 font-bold">»</span>
                    <a href="mailto:info@natle.dev" className="hover:text-cyan-400 transition-colors font-medium">info@natle.dev</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-cyan-500 font-bold">»</span>
                    <a href="tel:+94112507601" className="hover:text-cyan-400 transition-colors">+94 11 250 7601</a>
                    <span className="text-white/20">•</span>
                    <a href="tel:+94704659847" className="hover:text-cyan-400 transition-colors">+94 70 465 9847</a>
                  </p>
                  <p className="flex items-start gap-2 text-white/50 text-[11px]">
                    <span className="text-cyan-500 font-bold">»</span>
                    <span>No. 283 1/1, Ruwan Mawatha, Colombo 05, Sri Lanka</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Capabilities */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white/40 mb-3">Capabilities</h4>
              <ul className="space-y-2">
                {FOOTER_SERVICES.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-xs sm:text-sm text-white/70 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 group">
                      <span className="text-xs text-cyan-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">»</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Studio */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white/40 mb-3">Studio</h4>
              <ul className="space-y-2">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-xs sm:text-sm text-white/70 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 group">
                      <span className="text-xs text-cyan-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">»</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: The Letter */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white/40 mb-3">The Letter</h4>
              <p className="text-white/60 text-xs leading-relaxed mb-3">
                Monthly technical briefings on AI systems, scalable infrastructure, and product engineering.
              </p>

              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs hover:opacity-90 transition-opacity shrink-0 shadow-sm"
                >
                  {subscribed ? "Joined ✓" : "Join"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 5. BOTTOM COPYRIGHT BAR */}
        <div className="relative z-20 w-full py-4 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 bg-black/60 backdrop-blur-md">
          <div className="text-white/40 text-[10px] font-mono tracking-wider uppercase order-2 sm:order-1">
            © {new Date().getFullYear()} NATLE. All rights reserved.
          </div>

          <div className="order-1 sm:order-2 flex gap-6 text-white/40 text-[10px] font-mono uppercase">
            <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

          <Magnetic>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all group order-3 shadow-xs"
              aria-label="Scroll to top"
            >
              <svg
                className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </footer>
    </div>
  );
}
