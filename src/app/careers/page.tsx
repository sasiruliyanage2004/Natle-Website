import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { OPEN_ROLES, BENEFITS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers — NATLE",
  description: "Open roles and life at NATLE.",
};

export default function CareersPage() {
  return (
    <>
      <section className="pt-40 pb-20 bg-mist">
        <div className="container-content">
          <Reveal className="max-w-2xl">
            <p className="text-azure font-semibold text-sm mb-4">Careers</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-[1.05]">
              Build the tools other teams rely on.
            </h1>
            <p className="mt-6 text-lg text-ink/60 leading-relaxed">
              NATLE is a small studio doing work most people only get to touch
              at much bigger companies. If that sounds interesting, we&apos;d
              like to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-content">
          <Reveal className="max-w-xl mb-12">
            <h2 className="font-display text-3xl text-ink leading-tight">Life at NATLE</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} className="rounded-2xl border border-ink/8 p-7">
                <div className="w-8 h-8 rounded-full bg-brand-gradient mb-5" />
                <h3 className="font-display text-lg text-ink mb-2">{b.title}</h3>
                <p className="text-ink/60 text-[15px] leading-relaxed">{b.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-mist">
        <div className="container-content">
          <Reveal className="max-w-xl mb-12">
            <p className="text-azure font-semibold text-sm mb-3">Open roles</p>
            <h2 className="font-display text-3xl text-ink leading-tight">Current openings</h2>
          </Reveal>

          <div className="rounded-2xl border border-ink/8 overflow-hidden bg-paper">
            {OPEN_ROLES.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.04}>
                <Link
                  href="/contact"
                  className="flex flex-wrap items-center justify-between gap-4 px-7 py-6 border-b border-ink/8 last:border-0 hover:bg-mist transition-colors"
                >
                  <div>
                    <h3 className="font-display text-lg text-ink">{role.title}</h3>
                    <p className="text-ink/50 text-sm mt-1">
                      {role.team} &middot; {role.location}
                    </p>
                  </div>
                  <span className="text-ink font-semibold text-sm border-b-2 border-lime pb-1 shrink-0">
                    Apply now
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <p className="text-ink/60">
              Don&apos;t see a fit?{" "}
              <Link href="/contact" className="text-ink font-semibold border-b-2 border-lime pb-0.5">
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
