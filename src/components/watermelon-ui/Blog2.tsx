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
    <section className="w-full px-4 py-20 sm:px-6 lg:px-8 bg-transparent select-none">
      <div className="mx-auto max-w-7xl">
        <div className="glass-card rounded-[2.5rem] p-8 sm:p-12">
          
          {/* Section Header */}
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-emerald-900/30">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 dark:border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] mb-4 shadow-sm backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#059669] dark:text-[#10E599]" />
                <span>Research &bull; Knowledge Hub</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#071326] dark:text-white leading-tight">
                {heading}
              </h2>

              <p className="mt-4 text-base text-slate-600 dark:text-emerald-100/70 max-w-2xl font-normal leading-relaxed">
                {description}
              </p>
            </div>

            {showViewAll && (
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] hover:text-[#0052FF] transition-colors"
              >
                <span>Explore All Whitepapers</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            )}
          </div>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.title}
                href={post.href}
                className="group block focus:outline-none"
              >
                <article
                  className={cn(
                    "relative flex min-h-[380px] flex-col justify-between rounded-[2rem] border p-7 transition-all duration-300 backdrop-blur-xl shadow-md hover:-translate-y-1.5 hover:shadow-xl bg-white/90 dark:bg-[#070d07]/90 border-slate-200/80 dark:border-emerald-500/20 hover:border-emerald-500/50"
                  )}
                >
                  {/* Upper Meta & Bookmark */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-bold tracking-wider text-[#059669] dark:text-[#10E599] uppercase">
                        {post.meta}
                      </span>
                      <div className="text-slate-400 dark:text-emerald-300/60 group-hover:text-[#059669] dark:group-hover:text-[#10E599] transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-[#071326] dark:text-white leading-snug group-hover:text-[#059669] dark:group-hover:text-[#10E599] transition-colors mb-3">
                      {post.title}
                    </h3>
                  </div>

                  {/* Lower Author Bar */}
                  <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-emerald-900/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-emerald-800/40 shadow-xs"
                      />
                      <div>
                        <p className="text-xs font-black text-[#071326] dark:text-white">
                          {post.author.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-emerald-300/60 font-normal">
                          {post.author.role}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-emerald-950/60 px-3 py-1 text-[11px] font-mono font-bold text-slate-700 dark:text-emerald-200 shadow-xs group-hover:bg-[#059669] group-hover:text-white transition-all">
                      <span>Read</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>

                </article>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
