"use client";

import React from "react";
import { ArrowRight, ArrowUpRight, Bookmark, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
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
 
 {/* Section Header */}
 <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80 ">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 >
 <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] ] mb-4 shadow-sm backdrop-blur-md">
 <Sparkles className="w-3.5 h-3.5 text-[#059669] ]" />
 <span>Research &bull; Knowledge Hub</span>
 </div>

 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#071326] leading-tight">
 {heading}
 </h2>

 <p className="mt-4 text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
 {description}
 </p>
 </motion.div>

 {showViewAll && (
 <motion.div
 initial={{ opacity: 0, x: 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.1 }}
 >
 <Link
 href="/blog"
 className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] ] hover:text-[#0052FF] transition-colors"
 >
 <span>Explore All Whitepapers</span>
 <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
 </Link>
 </motion.div>
 )}
 </div>

 {/* 3-Column Card Grid with Rich Animations */}
 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
 {posts.map((post, index) => (
 <motion.div
 key={post.title}
 initial={{ opacity: 0, y: 32 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-40px" }}
 transition={{ duration: 0.5, delay: index * 0.12 }}
 whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
 whileTap={{ scale: 0.98 }}
 className="group block focus:outline-none cursor-pointer"
 >
 <Link href={post.href}>
 <article
 className={cn(
 "relative flex min-h-[380px] flex-col justify-between rounded-[2rem] border p-7 transition-all duration-300 backdrop-blur-xl shadow-md group-hover:shadow-2xl bg-white/90 border-slate-200/80 group-hover:border-emerald-500/50"
 )}
 >
 {/* Upper Meta & Bookmark */}
 <div>
 <div className="flex items-center justify-between mb-5">
 <span className="text-xs font-mono font-bold tracking-wider text-[#059669] ] uppercase">
 {post.meta}
 </span>
 <div className="text-slate-400 group-hover:text-[#059669] ] transition-colors">
 <Bookmark className="h-4 w-4" />
 </div>
 </div>

 {/* Title */}
 <h3 className="text-xl font-black text-[#071326] leading-snug group-hover:text-[#059669] ] transition-colors mb-3">
 {post.title}
 </h3>
 </div>

 {/* Lower Author Bar */}
 <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <img
 src={post.author.avatar}
 alt={post.author.name}
 className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-xs"
 />
 <div>
 <p className="text-xs font-black text-[#071326] ">
 {post.author.name}
 </p>
 <p className="text-[11px] text-slate-500 font-normal">
 {post.author.role}
 </p>
 </div>
 </div>

 <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-mono font-bold text-slate-700 shadow-xs group-hover:bg-[#059669] group-hover:text-white transition-all">
 <span>Read</span>
 <ArrowRight className="h-3 w-3" />
 </span>
 </div>

 </article>
 </Link>
 </motion.div>
 ))}
 </div>

 </div>
 </section>
 );
}
