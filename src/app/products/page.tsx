import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import { PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products & Solutions — NATLE",
  description: "NATLE's suite of ready-to-deploy software products.",
};

const ACCENTS: SpotlightAccent[] = ["azure", "teal", "lime", "purple"];

export default function ProductsPage() {
  return (
    <>
      <section className="pt-40 pb-20 bg-mist relative overflow-hidden">
        <AmbientBackground variant="reversed" />
        <div className="container-content relative">
          <Reveal className="max-w-2xl">
            <div className="text-teal text-xs font-mono font-semibold tracking-widest uppercase mb-4">
              PRODUCTS &amp; SOLUTIONS
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-[1.05]">
              Software we&apos;ve already built, ready to adapt.
            </h1>
            <p className="mt-6 text-lg text-ink/60 leading-relaxed">
              Not every problem needs custom software from scratch. These are
              NATLE products already running in production, configured to fit
              your workflow.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-paper border-t border-ink/5">
        <div className="container-content grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.08}>
              <SpotlightCard accent={ACCENTS[i % ACCENTS.length]} className="h-full">
                <div className="p-8 md:p-9 flex flex-col h-full">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-azure text-xs font-mono font-semibold tracking-wider uppercase">
                      {p.tag}
                    </span>
                    <span className="font-mono text-xs text-ink/30">
                      NATLE / 0{i + 1}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl text-ink mb-3">{p.name}</h2>
                  <p className="text-ink/60 leading-relaxed flex-1">{p.description}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center mt-7 pt-6 border-t border-ink/5 text-ink font-semibold text-sm gap-1.5 group-hover:gap-2.5 transition-all"
                  >
                    Request a demo <span aria-hidden>→</span>
                  </Link>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 bg-mist">
        <div className="container-content">
          <Reveal className="rounded-3xl bg-brand-gradient-soft border border-ink/8 px-8 py-16 lg:px-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-ink max-w-xl mx-auto leading-tight">
              Need something none of these quite cover?
            </h2>
            <p className="text-ink/60 mt-4 max-w-md mx-auto">
              We also build fully custom solutions — that&apos;s where most of
              our work starts.
            </p>
            <div className="mt-8 flex justify-center">
              <Magnetic>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full bg-ink text-white px-8 py-4 text-[15px] font-semibold hover:bg-ink-soft transition-colors"
                >
                  See custom services
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
