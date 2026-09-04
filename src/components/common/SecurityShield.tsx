"use client";

import { useEffect } from "react";

/**
 * SecurityShield Component
 * Protects against casual inspection, right-click scraping, and shortcut inspection.
 * Note: Only active in production mode to preserve developer experience during local development.
 */
export function SecurityShield() {
  useEffect(() => {
    // Only activate in production build
    if (process.env.NODE_ENV !== "production") return;

    // 1. Prevent Right-Click Context Menu (except on form inputs where user might paste)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
    };

    // 2. Intercept DevTools Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow standard shortcuts in inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl+Shift+I / Cmd+Opt+I (Inspect)
      // Ctrl+Shift+J / Cmd+Opt+J (Console)
      // Ctrl+Shift+C / Cmd+Opt+C (Element select)
      if (cmdOrCtrl && e.shiftKey && ["I", "i", "J", "j", "C", "c"].includes(e.key)) {
        e.preventDefault();
        return;
      }

      // Ctrl+U / Cmd+Opt+U (View Source)
      if (cmdOrCtrl && ["U", "u"].includes(e.key)) {
        e.preventDefault();
        return;
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}

export default SecurityShield;
