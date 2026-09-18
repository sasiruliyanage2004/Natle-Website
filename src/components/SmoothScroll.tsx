"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    (window as any).__lenis = lenis;

    const refreshAll = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", refreshAll);
    const t1 = setTimeout(refreshAll, 150);
    const t2 = setTimeout(refreshAll, 600);
    const t3 = setTimeout(refreshAll, 1500);

    return () => {
      window.removeEventListener("resize", refreshAll);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  // Handle route changes: scroll to top and refresh layout dimensions
  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    const timer = setTimeout(() => {
      if ((window as any).__lenis) {
        (window as any).__lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
