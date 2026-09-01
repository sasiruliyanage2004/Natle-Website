"use client";

import React from "react";
import { ArrowRight, ArrowUpRight, Bookmark, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { defaultBlogPosts, type BlogCardItem } from "@/data/blogPosts";

export default function Blog2({
  heading = "AgriTech Insights & Field Findings",
  description = "Explore scientific whitepapers, harvest forecasting algorithms, and organic substrate breakthroughs direct from Ceylon.",
  posts = defaultBlogPosts.slice(0, 3),
  showViewAll = true,
}: {
  heading?: string;
  description?: string;
  posts?: BlogCardItem[];
  showViewAll?: boolean;
}) {
  return (
    <section className="w-full px-4 py-24 sm:px-6 md:py-32 bg-transparent select-none">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 dark:border-emerald-900/30 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 dark:border-emerald-900/30 bg-white/80 dark:bg-[#0a140a]/80 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] mb-4 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
              <span>Research &bull; Knowledge Hub</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#071326] dark:text-emerald-50 leading-tight">
              {heading}
            </h2>

            <p className="mt-4 text-base text-slate-600 dark:text-emerald-200/70 max-w-2xl font-normal leading-relaxed">
              {description}
            </p>
          </div>

          {showViewAll && (
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0052FF] hover:text-[#059669] transition-colors"
            >
              <span>Explore All Whitepapers</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="group block focus:outline-none"
            >
              <article
                className={cn(
                  "relative flex min-h-[400px] flex-col justify-between rounded-[2rem] border bg-gradient-to-br p-7 sm:p-8 transition-all duration-300 backdrop-blur-xl shadow-lg hover:-translate-y-2 hover:shadow-2xl bg-white/90 dark:bg-[#0a140a]/90 dark:border-emerald-900/30",
                  post.badgeColor
                )}
              >
                {/* Upper Meta & Bookmark */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold tracking-wider text-[#071326]/70 dark:text-emerald-200/60 uppercase">
                      {post.meta}
                    </span>
                    <div className="text-slate-400 dark:text-emerald-300/60 group-hover:text-[#0052FF] transition-colors">
                      <Bookmark className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-[#071326] dark:text-emerald-50 leading-snug group-hover:text-[#0052FF] transition-colors mb-4">
                    {post.title}
                  </h3>
                </div>

                {/* Lower Author Bar */}
                <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-emerald-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full object-cover border border-white/80 dark:border-emerald-900/40 shadow-xs"
                    />
                    <div>
                      <p className="text-xs font-black text-[#071326] dark:text-emerald-50">
                        {post.author.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-emerald-300/60 font-normal">
                        {post.author.role}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-white dark:bg-[#0a140a] px-3 py-1 text-[11px] font-mono font-bold text-slate-600 dark:text-emerald-200/70 shadow-xs group-hover:bg-[#0052FF] group-hover:text-white transition-all">
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
