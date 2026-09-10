import Link from "next/link";
import Hero3D from "@/components/Hero3D";
import HeroContent from "@/components/HeroContent";
import TechMarquee from "@/components/TechMarquee";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import CutoutCard from "@/components/CutoutCard";
import SpotlightBento from "@/components/SpotlightBento";
import ArchitecturePipeline from "@/components/ArchitecturePipeline";
import ScrollBackground from "@/components/ScrollBackground";
import { PROJECTS, BLOG_POSTS } from "@/lib/data";

const WHY_US = [
  {
    title: "Senior teams only",
    detail: "No trainee-led projects. Every engagement is staffed by senior engineers and designers.",
  },
  {
    title: "Fixed communication rhythm",
    detail: "Weekly demos and a shared board, so you always see real, working software — not slide decks.",
  },
  {
    title: "Built for handover",
    detail: "Clean code, documentation, and infrastructure your own team can pick up on day one.",
  },
  {
    title: "Fast, not rushed",
    detail: "We move quickly on the things that matter and slow down on the decisions that are hard to reverse.",
  },
];

export default function Home() {
  return (
    <>
      {/* Scroll-driven fluid ambient background layer */}
      <ScrollBackground />

      {/* Hero */}
      <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-mist">
        <Hero3D />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-mist/0 via-mist/0 to-mist" />
        <div className="container-content relative">
          <HeroContent />
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="border-y border-ink/5 py-10 bg-paper/75 backdrop-blur-sm relative">
        <div className="container-content mb-6">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-xs font-mono tracking-widest uppercase text-azure font-semibold mb-2">
              Technology Stack
            </span>
            <p className="text-xs sm:text-sm font-medium text-ink/50 max-w-lg">
              Powering modern enterprise platforms with industry-leading frameworks &amp; cloud infrastructure
            </p>
          </div>
        </div>
        <TechMarquee />
      </section>

      {/* Services - Spotlight Bento */}
      <section className="py-28 lg:py-32 bg-transparent relative overflow-hidden border-t border-ink/5">
        <div className="container-content relative z-10">
          <Reveal className="max-w-2xl mb-14">
            <p className="text-azure font-semibold text-sm mb-3 tracking-wide">WHAT WE DO</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight">
              One team, from first sketch to production system.
            </h2>
          </Reveal>

          <SpotlightBento />
        </div>
      </section>

      {/* Scroll-Driven Architecture Pipeline */}
      <ArchitecturePipeline />

      {/* Why us + platform panel */}
      <section className="py-28 lg:py-32 bg-ink-gradient text-white relative overflow-hidden">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <p className="text-lime font-semibold text-sm mb-3">Why NATLE</p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-10">
                We don&apos;t just deliver tickets. We become your engineering partner.
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-9">
              {WHY_US.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <h3 className="font-display text-lg mb-2">{item.title}</h3>
                  <p className="text-white/60 text-[15px] leading-relaxed">{item.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:sticky lg:top-32">
            <div className="rounded-3xl bg-white/[0.06] border border-white/10 p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-lg">NATLE Delivery Metrics</span>
                <span className="flex items-center gap-2 text-xs text-lime">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="font-display text-3xl">
                    <Counter to={98.4} decimals={1} suffix="%" />
                  </div>
                  <div className="text-white/50 text-sm mt-1">On-time delivery</div>
                </div>
                <div>
                  <div className="font-display text-3xl">
                    <Counter to={99.9} decimals={1} suffix="%" />
                  </div>
                  <div className="text-white/50 text-sm mt-1">Platform uptime</div>
                </div>
                <div>
                  <div className="font-display text-3xl">
                    <Counter to={120} suffix="+" />
                  </div>
                  <div className="text-white/50 text-sm mt-1">Products shipped</div>
                </div>
                <div>
                  <div className="font-display text-3xl">
                    <Counter to={6} suffix=" wks" />
                  </div>
                  <div className="text-white/50 text-sm mt-1">Avg. time to first release</div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-2">
                {["ISO 27001", "SOC 2", "GDPR ready"].map((b) => (
                  <span key={b} className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/70">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-28 lg:py-32">
        <div className="container-content">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <p className="text-azure font-semibold text-sm mb-3">Selected work</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight">
                Real products, real results.
              </h2>
            </div>
            <Link href="/projects" className="text-ink font-semibold text-sm border-b-2 border-lime pb-1">
              View all projects
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="rounded-2xl overflow-hidden border border-ink/8 group">
                  <div className="h-44 bg-brand-gradient-soft relative">
                    <div className="absolute inset-0 bg-ink-gradient opacity-90 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl text-white/90">{p.name}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-paper">
                    <p className="text-xs font-semibold text-teal mb-2">{p.category}</p>
                    <p className="text-ink/70 text-[15px] leading-relaxed">{p.result}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-28 lg:py-32 bg-mist/60 backdrop-blur-sm relative">
        <div className="container-content">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <p className="text-azure font-semibold text-sm mb-3">From the studio</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight">
                Notes on building good software.
              </h2>
            </div>
            <Link href="/blog" className="text-ink font-semibold text-sm border-b-2 border-lime pb-1">
              Read the blog
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <CutoutCard
                  href="/blog"
                  badge={i === 0 ? "NEW" : i === 1 ? "POPULAR" : "INSIGHT"}
                  tag={post.category.toUpperCase()}
                  title={post.title}
                  description={post.excerpt}
                  image={
                    i === 0
                      ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                      : i === 1
                      ? "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop"
                      : "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format&fit=crop"
                  }
                  authorName={i === 0 ? "Ishan Perera" : i === 1 ? "Sarah Chen" : "Devon Vance"}
                  metaText={post.readTime}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-paper relative z-10">
        <div className="container-content">
          <Reveal className="rounded-3xl bg-brand-gradient px-8 py-16 lg:px-16 lg:py-20 text-center relative overflow-hidden">
            <h2 className="font-display text-3xl md:text-5xl text-white max-w-2xl mx-auto leading-tight">
              Have a product idea worth building well?
            </h2>
            <p className="text-white/85 mt-5 max-w-lg mx-auto">
              Tell us what you&apos;re trying to build. We&apos;ll tell you honestly whether we&apos;re the right fit.
            </p>
            <div className="mt-9 flex justify-center">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-block rounded-full bg-ink text-white px-8 py-4 text-[15px] font-semibold hover:bg-ink-soft transition-colors"
                >
                  Start the conversation
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
