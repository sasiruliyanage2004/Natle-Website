import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CutoutCard from "@/components/CutoutCard";
import { BLOG_POSTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog & News — NATLE",
  description: "Notes on engineering, design, and building software from the NATLE team.",
};

const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format&fit=crop",
];

const BLOG_AUTHORS = ["Ishan Perera", "Sarah Chen", "Devon Vance"];

export default function BlogPage() {
  return (
    <>
      <section className="pt-40 pb-20 bg-mist">
        <div className="container-content">
          <Reveal className="max-w-2xl">
            <p className="text-azure font-semibold text-sm mb-4">Blog & News</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-[1.05]">
              Notes from the studio floor.
            </h1>
            <p className="mt-6 text-lg text-ink/60 leading-relaxed">
              What we&apos;re learning while building software for clients
              across industries — written by the engineers and designers
              doing the work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.06}>
              <CutoutCard
                href="/blog"
                badge={i === 0 ? "NEW" : i === 1 ? "POPULAR" : "INSIGHT"}
                tag={post.category.toUpperCase()}
                title={post.title}
                description={post.excerpt}
                image={BLOG_IMAGES[i % BLOG_IMAGES.length]}
                authorName={BLOG_AUTHORS[i % BLOG_AUTHORS.length]}
                metaText={post.readTime}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
