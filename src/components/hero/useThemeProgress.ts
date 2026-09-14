"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Quantum Power Breaker — Global Theme & Progress Store
 *
 * Single source of truth for:
 * - Current theme state (isDark)
 * - Continuous themeProgress value (0.0 = dark, 1.0 = light) driven by GSAP
 * - Switch screen coordinates (for exact origin of the radial wipe circle)
 * - Triggering master transition sequence
 */

type ThemeListener = (isDark: boolean, progress: number) => void;

class ThemeProgressStore {
  private static instance: ThemeProgressStore;
  private isDark: boolean = false;
  private progress: number = 0;
  private switchPos: { x: number; y: number } = { x: 0, y: 0 };
  private isTransitioning: boolean = false;
  private listeners: Set<ThemeListener> = new Set();

  private constructor() {
    if (typeof window !== "undefined") {
      this.isDark = document.documentElement.classList.contains("dark");
      this.progress = this.isDark ? 0.0 : 1.0;
    }
  }

  public static getInstance(): ThemeProgressStore {
    if (!ThemeProgressStore.instance) {
      ThemeProgressStore.instance = new ThemeProgressStore();
    }
    return ThemeProgressStore.instance;
  }

  public getState() {
    return {
      isDark: this.isDark,
      progress: this.progress,
      switchPos: this.switchPos,
      isTransitioning: this.isTransitioning,
    };
  }

  public setProgress(p: number) {
    this.progress = p;
    this.notify();
  }

  public setSwitchPos(x: number, y: number) {
    this.switchPos = { x, y };
  }

  public setTransitioning(val: boolean) {
    this.isTransitioning = val;
    this.notify();
  }

  public setDark(val: boolean) {
    this.isDark = val;
    this.progress = val ? 0.0 : 1.0;
    if (typeof document !== "undefined") {
      if (val) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("natle_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("natle_theme", "light");
      }
    }
    this.notify();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("themechange"));
    }
  }

  public subscribe(fn: ThemeListener) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isDark, this.progress));
  }
}

export const themeStore = ThemeProgressStore.getInstance();

export function useThemeProgress() {
  const [state, setState] = useState(() => themeStore.getState());

  useEffect(() => {
    const unsub = themeStore.subscribe((isDark, progress) => {
      setState({
        isDark,
        progress,
        switchPos: themeStore.getState().switchPos,
        isTransitioning: themeStore.getState().isTransitioning,
      });
    });
    return unsub;
  }, []);

  const toggleTheme = useCallback(() => {
    const nextDark = !themeStore.getState().isDark;
    themeStore.setDark(nextDark);
  }, []);

  return {
    ...state,
    toggleTheme,
    setSwitchPos: (x: number, y: number) => themeStore.setSwitchPos(x, y),
    setProgress: (p: number) => themeStore.setProgress(p),
    setTransitioning: (v: boolean) => themeStore.setTransitioning(v),
  };
}
