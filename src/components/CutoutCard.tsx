"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card3DTilt from "@/components/Card3DTilt";

// Inverted corner SVG for seamless curved cutouts
export function CutoutCorner({ className, rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M16 0V16H0C8.83656 16 16 8.83656 16 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export interface CutoutCardProps {
  href?: string;
  badge?: string;
  tag?: string;
  title: string;
  description: string;
  image: string;
  authorName?: string;
  authorAvatar?: string;
  metaText?: string;
}

export default function CutoutCard({
  href = "/blog",
  badge = "NEW",
  tag = "FEATURED",
  title,
  description,
  image,
  authorName = "NATLE Studio",
  authorAvatar,
  metaText = "5 min read",
}: CutoutCardProps) {
  return (
    <Card3DTilt maxTilt={8} scale={1.02} className="h-full rounded-[26px]">
      <Link href={href} className="group block h-full">
        <div className="relative h-full flex flex-col rounded-[26px] bg-white dark:bg-[#0E1015] border border-ink/8 dark:border-white/[0.08] hover:border-ink/20 dark:hover:border-white/20 transition-all duration-300 shadow-sm hover:shadow-card dark:shadow-xl overflow-hidden p-3.5">
          
          {/* Top Media Area with Cutouts */}
          <div className="relative h-56 sm:h-60 w-full rounded-[20px] overflow-hidden bg-slate-100 dark:bg-[#181A22]">
            {/* Background Image */}
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

            {/* Top-Right Badge Cutout */}
            {badge && (
              <div className="absolute top-0 right-0 z-10 flex items-start">
                {/* Left inverted curve */}
                <CutoutCorner className="w-4 h-4 text-white dark:text-[#0E1015] -translate-y-px translate-x-[1px]" rotate={270} />
                
                <div className="bg-white dark:bg-[#0E1015] px-3.5 pt-1.5 pb-2 rounded-bl-2xl flex items-center justify-center relative">
                  <span className="bg-ink text-white dark:bg-white dark:text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {badge}
                  </span>
                  {/* Bottom inverted curve */}
                  <CutoutCorner className="absolute right-0 top-full w-4 h-4 text-white dark:text-[#0E1015] -translate-y-[1px]" rotate={270} />
                </div>
              </div>
            )}

            {/* Bottom-Left Tag Cutout */}
            {tag && (
              <div className="absolute bottom-0 left-0 z-10 flex items-end">
                <div className="bg-white dark:bg-[#0E1015] px-4 pt-2.5 pb-1 rounded-tr-2xl flex items-center justify-center relative">
                  <span className="text-[10px] font-extrabold text-ink/80 dark:text-white/90 uppercase tracking-[0.18em]">
                    {tag}
                  </span>
                  {/* Top inverted curve */}
                  <CutoutCorner className="absolute left-0 bottom-full w-4 h-4 text-white dark:text-[#0E1015] translate-y-[1px]" rotate={90} />
                  {/* Right inverted curve */}
                  <CutoutCorner className="absolute left-full bottom-0 w-4 h-4 text-white dark:text-[#0E1015] -translate-x-[1px]" rotate={90} />
                </div>
              </div>
            )}
          </div>

          {/* Card Body Content */}
          <div className="flex-1 flex flex-col p-4 pt-5 text-ink dark:text-white">
            <h3 className="font-display font-bold text-xl leading-snug tracking-tight mb-2.5 group-hover:text-azure transition-colors">
              {title}
            </h3>
            <p className="text-ink/65 dark:text-white/60 text-sm leading-relaxed line-clamp-2 flex-1 mb-6">
              {description}
            </p>

            {/* Card Footer: Author & Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-ink/8 dark:border-white/[0.08] text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#1E7FE8] via-[#12B8A6] to-[#6FCF3E] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  {authorName.charAt(0)}
                </div>
                <span className="font-semibold text-ink/90 dark:text-white/90">{authorName}</span>
              </div>
              <span className="text-ink/40 dark:text-white/40 font-medium">{metaText}</span>
            </div>

          </div>
        </div>
      </Link>
    </Card3DTilt>
  );
}
