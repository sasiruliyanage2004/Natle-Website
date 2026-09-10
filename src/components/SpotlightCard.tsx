"use client";

import React, { useRef } from "react";

const ACCENTS = {
  azure: "rgba(30, 127, 232,",
  teal: "rgba(18, 184, 166,",
  lime: "rgba(111, 207, 62,",
  purple: "rgba(168, 85, 247,",
  blue: "rgba(59, 130, 246,",
} as const;

export type SpotlightAccent = keyof typeof ACCENTS;

export default function SpotlightCard({
  children,
  accent = "azure",
  className = "",
  as: Tag = "div",
  href,
  id,
}: {
  children: React.ReactNode;
  accent?: SpotlightAccent;
  className?: string;
  as?: "div" | "article";
  href?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rgb = ACCENTS[accent];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const content = (
    <div
      ref={ref}
      id={id}
      onMouseMove={handleMouseMove}
      className={`spotlight-card group relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300 scroll-mt-28 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${rgb}0.4), transparent 60%)`,
        }}
      />
      <div className="relative h-full w-full rounded-[23px] bg-white dark:bg-[#0D1118] border border-ink/8 dark:border-white/[0.08] overflow-hidden shadow-sm group-hover:shadow-card transition-shadow">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${rgb}0.05), transparent 50%)`,
          }}
        />
        <Tag className="relative h-full flex flex-col">{children}</Tag>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}
