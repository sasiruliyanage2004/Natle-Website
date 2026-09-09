"use client";

import React from "react";

interface TechItem {
  name: string;
  category: string;
  brandColor: string;
  icon: React.ReactNode;
}

const TECH_STACK: TechItem[] = [
  {
    name: "Next.js",
    category: "Full-Stack",
    brandColor: "#0A0A0A",
    icon: (
      <svg viewBox="0 0 128 128" className="w-5 h-5 fill-current">
        <circle cx="64" cy="64" r="64" />
        <path
          d="M104.5 108.5L46.2 36H35V92H45.8V49.7L96.8 113.2C99.6 111.9 102.2 110.3 104.5 108.5Z"
          fill="white"
        />
        <rect x="82" y="36" width="11" height="56" fill="white" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Language",
    brandColor: "#3178C6",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm11.4 10.635h-3.03v9.525H6.945v-9.525H3.915V8.19h8.61zm3.69 7.02c.675.39 1.485.615 2.34.615 1.35 0 2.22-.645 2.22-1.635 0-.915-.6-1.44-1.995-1.995-1.92-.75-3.09-1.605-3.09-3.375 0-2.07 1.695-3.48 4.14-3.48 1.125 0 2.055.27 2.76.675l-.75 2.295c-.6-.345-1.32-.54-2.07-.54-1.185 0-1.89.585-1.89 1.425 0 .87.6 1.335 2.1 1.95 2.055.81 3 1.77 3 3.495 0 2.16-1.695 3.615-4.425 3.615-1.365 0-2.58-.39-3.36-.93l1.02-2.13z" />
      </svg>
    ),
  },
  {
    name: "React",
    category: "UI Library",
    brandColor: "#0284C7",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "AI & Backend",
    brandColor: "#2563EB",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M11.914 0C5.82 0 6.2 2.65 6.2 2.65l.006 2.744h5.814v.825H3.928S0 5.766 0 11.905c0 6.14 3.42 5.922 3.42 5.922h2.043v-2.87s-.11-3.42 3.364-3.42h5.77s3.253.053 3.253-3.199V2.65S18.337 0 11.914 0zm-3.2 1.745a1.07 1.07 0 1 1 0 2.14 1.07 1.07 0 0 1 0-2.14zm3.372 22.255c6.094 0 5.714-2.65 5.714-2.65l-.006-2.744h-5.814v-.825h8.092S24 18.234 24 12.095c0-6.14-3.42-5.922-3.42-5.922h-2.043v2.87s.11 3.42-3.364 3.42H9.403s-3.253-.053-3.253 3.199v5.694S5.663 24 12.086 24zm3.2-1.745a1.07 1.07 0 1 1 0-2.14 1.07 1.07 0 0 1 0 2.14z" />
      </svg>
    ),
  },
  {
    name: "AWS",
    category: "Cloud",
    brandColor: "#D97706",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M6.9 10.3c0-.8.3-1.4.8-2 .5-.6 1.1-.9 2-.9.8 0 1.5.3 2 .9.5.6.7 1.2.7 2 0 .8-.2 1.5-.7 2-.5.6-1.2.9-2 .9-.9 0-1.5-.3-2-.9a3 3 0 0 1-.8-2zm-2.4 0c0 1.4.5 2.6 1.5 3.5 1 1 2.2 1.4 3.6 1.4 1.4 0 2.6-.5 3.6-1.4 1-1 1.5-2.1 1.5-3.5 0-1.4-.5-2.6-1.5-3.5-1-.9-2.2-1.4-3.6-1.4-1.4 0-2.6.5-3.6 1.4-1 .9-1.5 2.1-1.5 3.5zm17.9 6.8c-.3.3-.8.4-1.3.4-.4 0-.9-.1-1.3-.4l-.3.8c.6.3 1.2.5 1.8.5.8 0 1.5-.2 2-.7.4-.5.7-1.1.7-1.9V8h-2.2v1.4c-.5-.5-1-.9-1.7-1.2a5 5 0 0 0-2-.4c-1.4 0-2.6.5-3.6 1.4-1 .9-1.4 2-1.4 3.5 0 1.4.5 2.6 1.5 3.5 1 .9 2.1 1.4 3.5 1.4.8 0 1.4-.1 2.1-.4.6-.3 1.2-.7 1.7-1.2v1.4c0 .4-.1.7-.3.9zM3.2 19c4.4 2.6 9.7 3 14.6.9l.6 1.8C13.1 24 7.1 23.6 2.4 20.8l.8-1.8z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    category: "DevOps",
    brandColor: "#0284C7",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m21.758.82c-.394-.23-1.638-.344-2.61-.17-1.127.202-1.928.918-2.316 1.488-.166-.08-.34-.148-.522-.204a8.97 8.97 0 00-2.825-.378H1.674c-.378 0-.685.308-.685.686 0 2.27.765 4.39 2.155 5.966 1.83 2.073 4.417 3.23 7.29 3.26 6.326.066 11.233-4.484 12.008-10.15.228-.01.996-.06 1.55-.498z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "Database",
    brandColor: "#2563EB",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M11.96 0C5.35 0 0 5.35 0 11.96c0 6.61 5.35 11.96 11.96 11.96 6.61 0 11.96-5.35 11.96-11.96C23.92 5.35 18.57 0 11.96 0zm4.18 17.51c-.67.43-1.46.66-2.27.65-1.16 0-2.25-.48-3.02-1.33-.78-.85-1.19-1.99-1.14-3.15.05-1.16.55-2.25 1.39-3.03.84-.78 1.96-1.21 3.12-1.18 1.04.03 2.04.45 2.79 1.18.3.29.31.78.02 1.08-.29.3-.78.31-1.08.02-.5-.49-1.17-.77-1.87-.79-.79-.02-1.55.27-2.12.8-.57.53-.91 1.27-.94 2.06-.03.79.25 1.56.78 2.14.53.58 1.27.91 2.06.91.56 0 1.11-.16 1.57-.46.36-.23.84-.13 1.07.23.23.36.13.84-.23 1.07z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Runtime",
    brandColor: "#16A34A",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 1.5l10.39 6v12L12 25.5 1.61 19.5v-12L12 1.5zm0 2.31L3.61 8.4v9.6L12 22.81l8.39-4.81v-9.6L12 3.81zm-1.12 4.56c.3 0 .58.16.73.42l2.62 4.54c.15.26.15.58 0 .84l-2.62 4.54a.846.846 0 01-.73.42h-2.24c-.3 0-.58-.16-.73-.42l-2.62-4.54a.846.846 0 010-.84l2.62-4.54c.15-.26.43-.42.73-.42h2.24z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    brandColor: "#0891B2",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "Kubernetes",
    category: "Orchestration",
    brandColor: "#2563EB",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M11.64 0c-.23 0-.46.06-.66.18L2.09 5.31c-.4.23-.65.66-.65 1.12v11.14c0 .46.25.89.65 1.12l8.89 5.13c.4.23.9.23 1.3 0l8.89-5.13c.4-.23.65-.66.65-1.12V6.43c0-.46-.25-.89-.65-1.12L12.28.18c-.19-.12-.42-.18-.64-.18zm.36 2.5l7.5 4.33v8.66l-7.5 4.33-7.5-4.33V6.83L12 2.5zm0 3.32a6.18 6.18 0 100 12.36 6.18 6.18 0 000-12.36zm0 2a4.12 4.12 0 110 8.24 4.12 4.12 0 010-8.24z" />
      </svg>
    ),
  },
  {
    name: "GraphQL",
    category: "API Mesh",
    brandColor: "#DB2777",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2L2 7.77v11.54L12 25l10-5.69V7.77L12 2zm0 2.31l8 4.62v9.24L12 22.79l-8-4.62V8.93l8-4.62zm0 3.69a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
  },
  {
    name: "Redis",
    category: "In-Memory",
    brandColor: "#DC2626",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M2.5 6.25L12 1.75l9.5 4.5v11.5L12 22.25 2.5 17.75V6.25zM12 4.1L5.5 7.15 12 10.2l6.5-3.05L12 4.1zm7.5 4.45l-6.5 3.05v7.1l6.5-3.05V8.55zM11 18.7v-7.1L4.5 8.55v7.1l6.5 3.05z" />
      </svg>
    ),
  },
];

export default function TechMarquee() {
  // Loop twice to create an infinite continuous ticker
  const loop = [...TECH_STACK, ...TECH_STACK];

  return (
    <div
      className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-label="Technologies and frameworks used by NATLE"
    >
      <div className="flex w-max animate-marquee gap-5 py-3 hover:[animation-play-state:paused]">
        {loop.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex items-center gap-3.5 px-4 py-2 rounded-full border border-ink/[0.06] bg-white/70 shadow-[0_2px_8px_-2px_rgba(10,10,10,0.03)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:border-azure/40 hover:shadow-[0_8px_20px_-6px_rgba(30,127,232,0.15)] cursor-pointer select-none"
          >
            {/* Tech SVG Icon with brand hover transition */}
            <div
              className="text-ink/60 transition-colors duration-300"
              style={
                {
                  "--hover-color": tech.brandColor,
                } as React.CSSProperties
              }
            >
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:text-[var(--hover-color)]">
                {tech.icon}
              </div>
            </div>

            {/* Tech Name */}
            <span className="font-display font-medium text-xs sm:text-sm text-ink/80 transition-colors duration-300 group-hover:text-ink whitespace-nowrap">
              {tech.name}
            </span>

            {/* Subtle Category Tag */}
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink/35 bg-ink/[0.03] px-2 py-0.5 rounded-full transition-colors duration-300 group-hover:bg-azure/5 group-hover:text-azure whitespace-nowrap">
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
