import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — NATLE",
  description: "Product engineering, cloud & DevOps, data & AI, design, and consulting services from NATLE.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-40 pb-20 bg-mist">
        <div className="container-content">
          <Reveal className="max-w-2xl">
            <p className="text-azure font-semibold text-sm mb-4">Services</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-[1.05]">
              Six ways we help you build.
            </h1>
            <p className="mt-6 text-lg text-ink/60 leading-relaxed">
              Whichever stage you&apos;re at — first product, scaling pains,
              or a legacy system holding you back — we plug in where you need
              us most.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-content space-y-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.05}>
              <div
                id={s.slug}
                className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 rounded-3xl border border-ink/8 p-8 lg:p-12 scroll-mt-28"
              >
                <div>
                  <div className="w-11 h-11 rounded-full bg-brand-gradient mb-6" />
                  <h2 className="font-display text-3xl text-ink mb-4">{s.name}</h2>
                  <p className="text-ink/60 leading-relaxed">{s.detail}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <ul className="space-y-4">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-ink/75">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
            <Link
              href="/contact"
              className="inline-flex items-center justify-center mt-9 rounded-full bg-brand-gradient text-ink px-8 py-4 text-[15px] font-semibold"
            >
              Book a discovery call
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
