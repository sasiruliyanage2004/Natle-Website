import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — NATLE",
  description: "Case studies and portfolio of software NATLE has built.",
};

const ACCENTS: SpotlightAccent[] = ["azure", "teal", "lime", "purple", "blue", "azure"];

export default function ProjectsPage() {
  return (
    <>
      <section className="pt-40 pb-20 bg-mist relative overflow-hidden">
        <AmbientBackground />
        <div className="container-content relative">
          <Reveal className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-azure/10 border border-azure/20 text-azure text-xs font-semibold tracking-wide mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-azure animate-pulse" />
              PROJECTS
            </div>
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

      <section className="py-20 lg:py-24 bg-paper border-t border-ink/5">
        <div className="container-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.06}>
              <SpotlightCard accent={ACCENTS[i % ACCENTS.length]} className="h-full">
                <div className="flex flex-col h-full">
                  <div className="h-44 relative bg-ink-gradient overflow-hidden rounded-t-[23px]">
                    <div
                      className="absolute -inset-6 opacity-70 blur-2xl bg-brand-gradient group-hover:scale-110 transition-transform duration-500"
                      style={{ mixBlendMode: "screen" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl text-white">{p.name}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs font-semibold text-teal mb-2">{p.category}</p>
                    <p className="text-ink/70 text-[15px] leading-relaxed">{p.result}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
