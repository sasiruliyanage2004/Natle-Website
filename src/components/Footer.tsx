"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Magnetic from "./Magnetic";
import NatleLogo from "./NatleLogo";
import { FOOTER_SERVICES, FOOTER_COMPANY } from "@/lib/nav";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Enterprise Architecture</span> <span className="text-lime/60">✦</span>
    <span>Web3 & Blockchain</span> <span className="text-teal/60">✦</span>
    <span>Custom Software</span> <span className="text-lime/60">✦</span>
    <span>AI Integration</span> <span className="text-teal/60">✦</span>
    <span>Scalable Infrastructure</span> <span className="text-lime/60">✦</span>
  </div>
);

export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Desktop Cinematic Curtain & Parallax Animations
      if (window.innerWidth >= 1024) {
        // Parallax upward float for the wide NATLE watermark
        if (giantTextRef.current) {
          gsap.fromTo(
            giantTextRef.current,
            { y: 80, scale: 0.92, opacity: 0.05 },
            {
              y: 0,
              scale: 1,
              opacity: 0.45,
              ease: "power2.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 85%",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        }

        // Staggered upward emergence for heading and buttons
        if (headingRef.current && linksRef.current) {
          gsap.fromTo(
            [headingRef.current, linksRef.current],
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 55%",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        }
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-screen lg:h-screen w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer className="relative lg:fixed bottom-0 left-0 flex min-h-screen lg:h-screen w-full flex-col justify-between overflow-hidden bg-[#090A0F] text-white">
        
        {/* Ambient Aurora Glow */}
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(30,127,232,0.14)_0%,rgba(18,184,166,0.09)_40%,transparent_70%)] rounded-[50%] blur-[100px] pointer-events-none z-0" />
        
        {/* Giant background text - WIDE & EXPANSIVE ("diga karala"), 100% visible above bottom bar */}
        <div
          ref={giantTextRef}
          className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-[18vw] sm:text-[20vw] lg:text-[22vw] tracking-[0.14em] font-black leading-none text-center w-full"
          style={{
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.08)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          NATLE
        </div>

        {/* 1. Diagonal Sleek Kinetic Marquee */}
        <div className="relative lg:absolute top-0 lg:top-4 left-0 w-full overflow-hidden border-y border-white/10 bg-[#090A0F]/80 backdrop-blur-md py-3 z-10 lg:-rotate-1 scale-105 shadow-xl">
          <div className="flex w-max animate-marquee-fast text-xs font-bold tracking-[0.25em] text-white/50 uppercase">
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* 2. Main Content - Compact fluid vertical rhythm */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-16 lg:pt-14 pb-4 w-full max-w-7xl mx-auto">
          
          {/* Top CTA Area */}
          <div className="flex flex-col items-center w-full mb-6 lg:mb-8 text-center">
            <h2
              ref={headingRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-display tracking-tight mb-4 sm:mb-6 max-w-3xl leading-tight"
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.5) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0px 0px 20px rgba(255,255,255,0.12))"
              }}
            >
              Ready to build the future?
            </h2>

            <div ref={linksRef} className="flex flex-wrap justify-center gap-4 w-full">
              <Magnetic>
                <Link 
                  href="/contact" 
                  className="px-8 py-3.5 rounded-full bg-white text-ink hover:bg-white/90 font-semibold text-sm flex items-center gap-2.5 transition-all shadow-lg shadow-white/5"
                >
                  Start a project
                </Link>
              </Magnetic>
              
              <Magnetic>
                <Link 
                  href="/projects" 
                  className="px-8 py-3.5 rounded-full bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold text-sm flex items-center gap-2.5 transition-all backdrop-blur-sm"
                >
                  View our work
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* 4-Column Directory Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full border-t border-white/10 pt-6 lg:pt-8 mb-2">
            <div>
              <div className="bg-white/5 inline-block px-4 py-2 rounded-xl mb-3">
                <NatleLogo className="h-6 w-auto text-white" showTagline={false} />
              </div>
              <p className="text-white/55 text-xs sm:text-sm leading-relaxed max-w-xs">
                Empowering ambitious enterprises with scalable, production-ready AI and software systems.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold text-xs mb-3 tracking-wider uppercase text-white/40">Services</h4>
              <ul className="space-y-2">
                {FOOTER_SERVICES.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs mb-3 tracking-wider uppercase text-white/40">Company</h4>
              <ul className="space-y-2">
                {FOOTER_COMPANY.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs mb-3 tracking-wider uppercase text-white/40">Contact</h4>
              <ul className="space-y-2 text-white/60 text-xs sm:text-sm">
                <li><a href="mailto:info@natle.dev" className="hover:text-white transition-colors">info@natle.dev</a></li>
                <li><a href="tel:+94704659847" className="hover:text-white transition-colors">+94 70 465 9847</a></li>
                <li><a href="tel:+94112507601" className="hover:text-white transition-colors">+94 11 250 7601</a></li>
                <li className="leading-relaxed pt-0.5 text-white/45 text-[11px]">
                  No. 283 1/1, Ruwan Mawatha, Colombo 05, Sri Lanka
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="relative z-20 w-full py-4 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 bg-[#090A0F]/80 backdrop-blur-md">
          <div className="text-white/40 text-xs font-medium tracking-wider uppercase order-2 sm:order-1">
            © {new Date().getFullYear()} NATLE. All rights reserved.
          </div>

          <div className="order-1 sm:order-2 flex gap-6 text-white/40 text-xs font-medium">
             <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

          <Magnetic>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all group order-3"
              aria-label="Scroll to top"
            >
              <svg className="w-3.5 h-3.5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </button>
          </Magnetic>
        </div>
      </footer>
    </div>
  );
}
