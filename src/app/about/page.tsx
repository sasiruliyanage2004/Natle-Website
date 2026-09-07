import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { TEAM, VALUES } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — NATLE",
  description: "The story, mission, and people behind NATLE.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-24 bg-mist">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="text-azure font-semibold text-sm mb-4">About NATLE</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-[1.05]">
              We started NATLE because good software shouldn&apos;t be rare.
            </h1>
            <p className="mt-7 text-lg text-ink/60 leading-relaxed max-w-2xl">
              Founded in Colombo, NATLE builds digital products and internal
              systems for companies who are tired of choosing between fast and
              well-built. We believe you can have both.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-ink/10 pt-10">
            <div>
              <div className="font-display text-3xl text-ink"><Counter to={120} suffix="+" /></div>
              <div className="text-sm text-ink/50 mt-1">Projects delivered</div>
            </div>
            <div>
              <div className="font-display text-3xl text-ink"><Counter to={60} suffix="+" /></div>
              <div className="text-sm text-ink/50 mt-1">Clients served</div>
            </div>
            <div>
              <div className="font-display text-3xl text-ink"><Counter to={8} /></div>
              <div className="text-sm text-ink/50 mt-1">Industries</div>
            </div>
            <div>
              <div className="font-display text-3xl text-ink"><Counter to={7} /></div>
              <div className="text-sm text-ink/50 mt-1">Years building</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Reveal className="rounded-2xl border border-ink/8 p-9">
            <h2 className="font-display text-2xl text-ink mb-4">Our mission</h2>
            <p className="text-ink/60 leading-relaxed">
              To give growing companies access to the same quality of software
              engineering and design that only large enterprises could
              previously afford — without the enterprise overhead.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-ink/8 p-9">
            <h2 className="font-display text-2xl text-ink mb-4">Our vision</h2>
            <p className="text-ink/60 leading-relaxed">
              A future where every ambitious team, regardless of size or
              location, can turn a good idea into reliable, well-designed
              software.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-ink-gradient text-white">
        <div className="container-content grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <Reveal>
            <p className="text-lime font-semibold text-sm mb-4">Our story</p>
            <h2 className="font-display text-4xl leading-tight mb-6">
              From one client to a full studio.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-white/70 leading-relaxed">
            <p>
              NATLE began as a two-person team building a booking system for a
              local retailer. That first project taught us something we still
              hold onto: the best software is built close to the people who
              use it, not designed in the abstract.
            </p>
            <p>
              From that first engagement, we grew one referral at a time —
              into retail, healthcare, agriculture, and financial services.
              Each new industry brought constraints we hadn&apos;t seen
              before, and made the next product better.
            </p>
            <p>
              Today, NATLE is a full studio of engineers, designers, and
              delivery leads working with founders and enterprise teams alike
              — still holding to the same principle we started with.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-28">
        <div className="container-content">
          <Reveal className="max-w-xl mb-14">
            <p className="text-azure font-semibold text-sm mb-3">Leadership</p>
            <h2 className="font-display text-4xl text-ink leading-tight">
              The people steering NATLE.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TEAM.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.06}>
                <div className="aspect-square rounded-2xl bg-brand-gradient-soft border border-ink/8 mb-4 flex items-center justify-center">
                  <span className="font-display text-3xl text-ink/30">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-display text-base text-ink">{person.name}</h3>
                <p className="text-ink/50 text-sm">{person.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-mist">
        <div className="container-content">
          <Reveal className="max-w-xl mb-14">
            <p className="text-azure font-semibold text-sm mb-3">What we stand for</p>
            <h2 className="font-display text-4xl text-ink leading-tight">
              Operating principles, not slogans.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="flex gap-5">
                <div className="w-1.5 shrink-0 rounded-full bg-brand-gradient" />
                <div>
                  <h3 className="font-display text-lg text-ink mb-1.5">{v.title}</h3>
                  <p className="text-ink/60 text-[15px] leading-relaxed">{v.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
