import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import { OPEN_ROLES, BENEFITS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers — NATLE",
  description: "Open roles and life at NATLE.",
};

const BENEFIT_ACCENTS: SpotlightAccent[] = ["azure", "teal", "lime", "purple"];

export default function CareersPage() {
  return (
    <>
      <section className="pt-40 pb-20 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground />
        <div className="container-content relative">
          <Reveal className="max-w-2xl">
            <div className="text-azure text-xs font-mono font-semibold tracking-widest uppercase mb-4">
              CAREERS
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-ink dark:text-white leading-[1.05]">
              Build the tools other teams rely on.
            </h1>
            <p className="mt-6 text-lg text-ink/60 dark:text-white/60 leading-relaxed">
              NATLE is a small studio doing work most people only get to touch
              at much bigger companies. If that sounds interesting, we&apos;d
              like to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-paper dark:bg-[#090C12] border-t border-ink/5 dark:border-white/10">
        <div className="container-content">
          <Reveal className="max-w-xl mb-12">
            <h2 className="font-display text-3xl text-ink dark:text-white leading-tight">Life at NATLE</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <SpotlightCard accent={BENEFIT_ACCENTS[i % BENEFIT_ACCENTS.length]} className="h-full">
                  <div className="p-7">
                    <div className="w-9 h-9 rounded-full bg-brand-gradient mb-5" />
                    <h3 className="font-display text-lg text-ink dark:text-white mb-2">{b.title}</h3>
                    <p className="text-ink/60 dark:text-white/60 text-[15px] leading-relaxed">{b.detail}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground variant="reversed" />
        <div className="container-content relative">
          <Reveal className="max-w-xl mb-12">
            <p className="text-azure font-semibold text-sm mb-3">Open roles</p>
            <h2 className="font-display text-3xl text-ink dark:text-white leading-tight">Current openings</h2>
          </Reveal>

          <div className="rounded-3xl border border-ink/8 dark:border-white/10 overflow-hidden bg-white dark:bg-[#0D1118] shadow-sm">
            {OPEN_ROLES.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.04}>
                <Link
                  href="/contact"
                  className="group flex flex-wrap items-center justify-between gap-4 px-7 py-6 border-b border-ink/8 dark:border-white/10 last:border-0 hover:bg-mist dark:hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block w-1.5 h-10 rounded-full bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <h3 className="font-display text-lg text-ink dark:text-white group-hover:text-azure transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-ink/50 dark:text-white/50 text-sm mt-1">
                        {role.team} &middot; {role.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-ink dark:text-white font-semibold text-sm border-b-2 border-lime pb-1 shrink-0 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Apply now <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <p className="text-ink/60 dark:text-white/60">
              Don&apos;t see a fit?{" "}
              <Link href="/contact" className="text-ink dark:text-white font-semibold border-b-2 border-lime pb-0.5">
                Send us your CV anyway
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
