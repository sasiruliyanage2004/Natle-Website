import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — NATLE",
  description: "Case studies and portfolio of software NATLE has built.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="pt-40 pb-20 bg-mist">
        <div className="container-content">
          <Reveal className="max-w-2xl">
            <p className="text-azure font-semibold text-sm mb-4">Projects</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-[1.05]">
              Work we&apos;re proud to put our name on.
            </h1>
            <p className="mt-6 text-lg text-ink/60 leading-relaxed">
              A sample of products and platforms NATLE has designed, built,
              and shipped across industries.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.06}>
              <div className="rounded-2xl overflow-hidden border border-ink/8 group h-full flex flex-col">
                <div className="h-48 relative bg-ink-gradient overflow-hidden">
                  <div
                    className="absolute -inset-6 opacity-70 blur-2xl bg-brand-gradient group-hover:scale-110 transition-transform duration-500"
                    style={{ mixBlendMode: "screen" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-2xl text-white">{p.name}</span>
                  </div>
                </div>
                <div className="p-6 bg-paper flex-1 flex flex-col">
                  <p className="text-xs font-semibold text-teal mb-2">{p.category}</p>
                  <p className="text-ink/70 text-[15px] leading-relaxed">{p.result}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
