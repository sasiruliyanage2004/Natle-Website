"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/**
 * Global Anime.js Scroll Reveal Engine
 * Automatically detects sections and cards with data-reveal or data-stagger-group
 * and applies staggered fade-up, scale, and cascading animations on scroll.
 */
export default function AnimeScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target as HTMLElement;

        // 1. Staggered Group (e.g. Card Grids, Bento Boxes, Lists)
        if (target.hasAttribute("data-stagger-group") || target.classList.contains("anime-stagger-group")) {
          const items = target.querySelectorAll(
            "[data-stagger-item], .glass-card, .anime-card, article, .bento-card"
          );

          if (items.length > 0) {
            animate(items, {
              opacity: [0, 1],
              translateY: [36, 0],
              scale: [0.96, 1],
              duration: 750,
              delay: stagger(110, { start: 100 }),
              ease: "outCubic",
            });
          } else {
            animate(target, {
              opacity: [0, 1],
              translateY: [32, 0],
              duration: 700,
              ease: "outCubic",
            });
          }
        } 
        // 2. Section Headings / Banner Elements
        else if (target.hasAttribute("data-reveal-heading") || target.classList.contains("anime-heading")) {
          const headingChildren = target.children;
          if (headingChildren.length > 0) {
            animate(headingChildren, {
              opacity: [0, 1],
              translateY: [28, 0],
              duration: 800,
              delay: stagger(120),
              ease: "outCubic",
            });
          } else {
            animate(target, {
              opacity: [0, 1],
              translateY: [28, 0],
              duration: 750,
              ease: "outCubic",
            });
          }
        }
        // 3. Slide In Left / Right
        else if (target.hasAttribute("data-reveal-left")) {
          animate(target, {
            opacity: [0, 1],
            translateX: [-40, 0],
            duration: 800,
            ease: "outCubic",
          });
        } else if (target.hasAttribute("data-reveal-right")) {
          animate(target, {
            opacity: [0, 1],
            translateX: [40, 0],
            duration: 800,
            ease: "outCubic",
          });
        }
        // 4. Default Fade + Slide Up Reveal
        else {
          animate(target, {
            opacity: [0, 1],
            translateY: [32, 0],
            duration: 700,
            ease: "outCubic",
          });
        }

        // Unobserve after animating once for performance
        observer.unobserve(target);
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.12,
    });

    // Observe all target elements
    const elementsToObserve = document.querySelectorAll(
      "section, [data-stagger-group], [data-reveal], .anime-reveal, .glass-card, [data-reveal-heading]"
    );

    elementsToObserve.forEach((el) => {
      // Set initial state
      if (!el.classList.contains("no-anime-init")) {
        (el as HTMLElement).style.opacity = "0";
      }
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

/**
 * Reusable Anime.js Stagger Wrapper for specific card groups or components
 */
export function AnimeStaggerContainer({
  children,
  staggerMs = 100,
  className = "",
}: {
  children: React.ReactNode;
  staggerMs?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const items = el.querySelectorAll(":scope > *");
        animate(items, {
          opacity: [0, 1],
          translateY: [32, 0],
          scale: [0.96, 1],
          duration: 750,
          delay: stagger(staggerMs, { start: 80 }),
          ease: "outCubic",
        });

        observer.unobserve(el);
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerMs]);

  return (
    <div ref={containerRef} className={`anime-stagger-group ${className}`} style={{ opacity: 1 }}>
      {children}
    </div>
  );
}
