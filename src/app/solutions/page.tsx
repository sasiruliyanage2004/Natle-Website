import Reveal from "@/components/Reveal";
import IndustryTabs from "@/components/IndustryTabs";
import Link from "next/link";

export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pb-16 pt-20 md:pt-28">
        <Reveal>
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.1] text-ink md:text-5xl">
            Solutions built for the industries{" "}
            <span className="text-gradient-brand">where mistakes are expensive.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            The same AI system looks different in a hospital, a bank, and a
            warehouse. Pick your industry to see what we actually build.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-white/5 py-16">
        <Reveal>
          <IndustryTabs />
        </Reveal>
      </section>

      <section className="border-t border-white/5 py-20">
        <Reveal>
          <div className="card-glass flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">
                Don't see your industry?
              </h2>
              <p className="mt-2 max-w-md text-ink-muted">
                Most of our build is domain-specific tuning on top of shared
                infrastructure — tell us about your data and we'll scope it.
              </p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              Scope a project
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
