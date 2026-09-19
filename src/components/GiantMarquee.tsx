"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GiantMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Duplicate the text to make it infinite
    const clone = textRef.current.cloneNode(true);
    containerRef.current?.appendChild(clone);

    gsap.to(containerRef.current?.children as HTMLCollection, {
      xPercent: -100,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden flex items-center py-20 bg-black border-y border-white/[0.02]">
      <div 
        ref={containerRef}
        className="flex whitespace-nowrap opacity-[0.03] dark:opacity-[0.04] select-none pointer-events-none"
      >
        <div ref={textRef} className="flex shrink-0">
          <h2 className="text-[12vw] md:text-[8vw] font-display font-bold text-white px-8 uppercase tracking-tighter">
            WE BUILD SYSTEMS THAT SCALE â€¢ 
          </h2>
          <h2 className="text-[12vw] md:text-[8vw] font-display font-bold text-white px-8 uppercase tracking-tighter">
            ZERO TECH DEBT â€¢ 
          </h2>
          <h2 className="text-[12vw] md:text-[8vw] font-display font-bold text-white px-8 uppercase tracking-tighter">
            ENGINEERING EXCELLENCE â€¢ 
          </h2>
        </div>
      </div>
    </div>
  );
}
