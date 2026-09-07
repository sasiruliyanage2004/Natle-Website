import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products & Solutions — NATLE",
  description: "NATLE's suite of ready-to-deploy software products.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="pt-40 pb-20 bg-mist">
        <div className="container-content">
          <Reveal className="max-w-2xl">
            <p className="text-azure font-semibold text-sm mb-4">Products & Solutions</p>
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

      <section className="py-20 lg:py-24">
        <div className="container-content grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.08}>
              <div className="h-full rounded-3xl border border-ink/8 p-9 flex flex-col">
                <span className="text-xs font-semibold text-teal mb-4 uppercase tracking-wide">
                  {p.tag}
                </span>
                <h2 className="font-display text-2xl text-ink mb-3">{p.name}</h2>
                <p className="text-ink/60 leading-relaxed flex-1">{p.description}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center mt-7 text-ink font-semibold text-sm border-b-2 border-lime pb-1 w-fit"
                >
                  Request a demo
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-content">
          <Reveal className="rounded-3xl bg-brand-gradient-soft border border-ink/8 px-8 py-16 lg:px-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-ink max-w-xl mx-auto leading-tight">
              Need something none of these quite cover?
            </h2>
            <p className="text-ink/60 mt-4 max-w-md mx-auto">
              We also build fully custom solutions — that&apos;s where most of
              our work starts.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center justify-center mt-8 rounded-full bg-ink text-white px-8 py-4 text-[15px] font-semibold"
            >
              See custom services
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
