"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NatleLogo from "./NatleLogo";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Check if user already saw preloader in this session (e.g. Page Refresh)
    try {
      if (sessionStorage.getItem("natle_preloader_seen")) {
        setIsLoading(false);
        document.body.style.overflow = "";
        return;
      }
    } catch {
      // Ignore sessionStorage errors in restricted environments
    }

    // Lock scroll while loading on cold start
    document.body.style.overflow = "hidden";
    
    const duration = 1600;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    let timeoutId: NodeJS.Timeout;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor(100 * (1 - Math.pow(1 - currentStep / steps, 3))));
      setCounter(progress);

      if (currentStep >= steps) {
        clearInterval(interval);
        timeoutId = setTimeout(() => {
          try {
            sessionStorage.setItem("natle_preloader_seen", "true");
          } catch {}
          setIsLoading(false);
          document.body.style.overflow = "";

          // Notify Lenis, GSAP, and ScrollBackground that layout is unlocked
          setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
            window.dispatchEvent(new Event("scroll"));
            if (typeof window !== "undefined" && (window as any).__lenis) {
              (window as any).__lenis.resize();
            }
          }, 100);
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-paper text-ink overflow-hidden"
        >
          
          {/* Centered Animated Logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xs md:max-w-md w-full flex justify-center px-4"
            style={{ maxHeight: "160px" }}
          >
            <NatleLogo className="h-20 sm:h-24 md:h-28 w-auto" showTagline={true} />
          </motion.div>

          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end text-xs sm:text-sm font-semibold text-ink/40 uppercase tracking-widest">
            <span>NATLE STUDIO</span>
            <span className="flex flex-col items-end gap-1">
              <span>LOADING...</span>
              <span className="text-ink text-2xl md:text-3xl font-display">{counter}%</span>
            </span>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
