"use client";

import { useState } from "react";
import NEmblem from "./NEmblem";

const CHARS = "01ΔΞ#%&$XZ";
const WORD = "ATLE";

function scrambleChar(target: string) {
  if (target === " ") return " ";
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function Wordmark({ size = "text-xl" }: { size?: string }) {
  const [display, setDisplay] = useState(WORD);
  const [hovering, setHovering] = useState(false);

  function decode() {
    if (hovering) return;
    setHovering(true);
    let frame = 0;
    const totalFrames = 10;
    const interval = setInterval(() => {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * WORD.length);
      const next = WORD.split("")
        .map((ch, i) => (i < revealCount ? ch : scrambleChar(ch)))
        .join("");
      setDisplay(next);
      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplay(WORD);
        setHovering(false);
      }
    }, 35);
  }

  return (
    <span
      className={`flex items-center gap-2 font-display font-semibold ${size} text-ink`}
      onMouseEnter={decode}
    >
      <NEmblem size={size === "text-xl" ? 30 : 36} />
      <span className="tracking-tight">
        N<span className="font-data">{display}</span>
      </span>
    </span>
  );
}
