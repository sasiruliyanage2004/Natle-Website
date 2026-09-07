"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NatleLogo from "./NatleLogo";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";
    
    const duration = 1800;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    let timeoutId: NodeJS.Timeout;

    const interval = setInterval(() => {
      currentStep++;
      // Easing function for counter (fast start, slow end)
      const progress = Math.min(100, Math.floor(100 * (1 - Math.pow(1 - currentStep / steps, 3))));
      setCounter(progress);

      if (currentStep >= steps) {
        clearInterval(interval);
        timeoutId = setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 400);
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
          >
            <NatleLogo className="h-24 md:h-32 w-auto scale-125 md:scale-150" showTagline={true} />
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
