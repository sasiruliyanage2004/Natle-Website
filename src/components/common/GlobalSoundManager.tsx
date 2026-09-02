"use client";

import { useEffect } from "react";
import { sound } from "@/lib/sound";

export default function GlobalSoundManager() {
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if clicked element or its parent is interactive
      const isInteractive = target.closest(
        "button, a, input[type='range'], [role='button'], .cursor-pointer"
      );

      if (isInteractive) {
        sound.playClick();
      }
    };

    window.addEventListener("click", handleDocumentClick, { capture: true, passive: true });

    return () => {
      window.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, []);

  return null;
}
