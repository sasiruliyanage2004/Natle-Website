"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeDirectly(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const body = document.body;

  if (t === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.setAttribute("data-theme", "dark");
    root.style.colorScheme = "dark";
    if (body) {
      body.classList.add("dark");
      body.classList.remove("light");
      body.setAttribute("data-theme", "dark");
    }
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
    root.style.colorScheme = "light";
    if (body) {
      body.classList.remove("dark");
      body.classList.add("light");
      body.setAttribute("data-theme", "light");
    }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("natle-theme") as Theme | null;
      const initial: Theme = saved === "light" ? "light" : "dark";
      setThemeState(initial);
      applyThemeDirectly(initial);
    } catch {
      applyThemeDirectly("dark");
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("natle-theme", newTheme);
    } catch {
      // localStorage disabled/restricted
    }
    applyThemeDirectly(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => {
      const nextTheme: Theme = prevTheme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("natle-theme", nextTheme);
      } catch {
        // ignore
      }
      applyThemeDirectly(nextTheme);
      return nextTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark" as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return context;
}
