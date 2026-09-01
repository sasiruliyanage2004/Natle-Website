"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/prompt-design/components/GlassCard";
import { posts } from "@/prompt-design/lib/data";

const categories = ["All", "Agronomy", "Firmware", "Research", "Field Notes", "Compliance"];

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <section className="container-edge pt-16 pb-10 lg:pt-24 lg:pb-14">
        <p className="font-data text-xs uppercase tracking-wide text-quantum mb-6">Journal</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl">
          Field notes and firmware logs
        </h1>
        <p className="mt-7 text-lg text-ink-soft leading-relaxed max-w-2xl">
          Research findings, agronomy notes and the engineering decisions
          behind FieldOS — written by the people who did the work.
        </p>
      </section>

      <section className="container-edge pb-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the journal"
              className="w-full glass rounded-full px-5 py-3 text-sm placeholder:text-ink-faint focus:outline-none focus:border-quantum"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                  category === c
                    ? "bg-ink text-pearl border-transparent"
                    : "border-line text-ink-soft hover:border-ink/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edge pb-24">
        {filtered.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <p className="text-ink-soft">No entries match that search. Try a different term or category.</p>
          </GlassCard>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <GlassCard key={post.id} className="p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-data text-xs text-emerald">{post.category}</span>
                    <span className="text-xs text-ink-faint">{post.date}</span>
                  </div>
                  <p className="font-display font-semibold text-lg leading-snug mb-3">{post.title}</p>
                  <p className="text-sm text-ink-soft leading-relaxed">{post.excerpt}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
