import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — NATLE",
  description: "Product engineering, cloud & DevOps, data & AI, design, and consulting services from NATLE.",
};

const ACCENTS: SpotlightAccent[] = ["azure", "teal", "lime", "purple", "blue", "azure"];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-40 pb-20 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground />
        <div className="container-content relative">
          <Reveal className="max-w-2xl">
            <div className="text-azure text-xs font-mono font-semibold tracking-widest uppercase mb-4">
              SERVICES
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-ink dark:text-white leading-[1.05]">
              Six ways we help you build.
            </h1>
            <p className="mt-6 text-lg text-ink/60 dark:text-white/60 leading-relaxed">
              Whichever stage you&apos;re at — first product, scaling pains,
              or a legacy system holding you back — we plug in where you need
              us most.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-paper dark:bg-[#07090E] relative overflow-hidden border-t border-ink/5 dark:border-white/10">
        <div className="container-content grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.06}>
              <SpotlightCard accent={ACCENTS[i]} id={s.slug} className="h-full">
                <div className="p-8 md:p-9 flex flex-col h-full">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="font-mono text-xs text-ink/40 dark:text-white/40">0{i + 1}</span>
                    <div className="w-10 h-10 rounded-full bg-brand-gradient" />
                  </div>
                  <h2 className="font-display text-2xl text-ink dark:text-white mb-3">{s.name}</h2>
                  <p className="text-ink/60 dark:text-white/60 leading-relaxed mb-7">{s.detail}</p>
                  <ul className="space-y-3 mt-auto pt-6 border-t border-ink/5 dark:border-white/10">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-ink/75 dark:text-white/80 text-[15px]">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 bg-ink-gradient text-white">
        <div className="container-content text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">
              Not sure which service fits your problem?
            </h2>
            <p className="text-white/70 mt-5 max-w-lg mx-auto">
              That&apos;s fine — most projects touch more than one. Tell us
              what you&apos;re working on and we&apos;ll map it out together.
            </p>
            <div className="mt-9 flex justify-center">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-brand-gradient text-slate-950 font-bold hover:brightness-105 px-8 py-4 text-[15px] shadow-md transition-all"
                >
                  Book a discovery call
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
