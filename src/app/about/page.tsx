import Reveal from "@/components/Reveal";
import Link from "next/link";

const STATS = [
  { value: "40+", label: "enterprise deployments" },
  { value: "99.98%", label: "average uptime SLA" },
  { value: "6", label: "regulated industries served" },
];

const VALUES = [
  {
    title: "Ship into production, not a demo",
    body: "We measure our work by what survives contact with real traffic, real data, and real incident reviews — not by how a prototype looks in a pitch meeting.",
    span: "md:col-span-2",
  },
  {
    title: "Evidence over intuition",
    body: "Every model we put in front of a customer is backed by an evaluation suite we can show you, not a vibe.",
    span: "",
  },
  {
    title: "Security is a feature, not a phase",
    body: "Access control, audit trails, and data isolation are designed in from the first architecture review.",
    span: "",
  },
  {
    title: "Plain answers about what AI can't do yet",
    body: "We'll tell you when a rules engine will outperform a model, and when a human should stay in the loop. That honesty is part of the product.",
    span: "md:col-span-2",
  },
];

const MILESTONES = [
  { year: "2021", text: "Founded by a team of infrastructure engineers from three different fintech outages — the good kind of origin story." },
  { year: "2022", text: "First production deployment: a fraud-review copilot processing 2M+ transactions a day for a payments client." },
  { year: "2023", text: "Opened our evaluation practice — independent red-teaming and benchmark design for enterprise model rollouts." },
  { year: "2025", text: "Crossed 40 enterprise deployments across banking, healthcare, and logistics." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero — asymmetric: headline left, stat stack right */}
      <section className="grid gap-12 pb-20 pt-20 md:grid-cols-[1.3fr_1fr] md:pt-28">
        <Reveal>
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-[#0a1628] md:text-5xl">
            We build the AI systems that sit behind the decisions{" "}
            <span className="gradient-text">you can't afford to get wrong.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#475569]">
            NATLE Technologies designs, deploys, and operates AI infrastructure for
            enterprises where failure has a cost — finance, healthcare, and
            logistics. We're not a lab. We're the team on call at 2am.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="clay-card border-none flex h-full flex-col justify-center gap-6 p-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold gradient-text">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[#475569]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Narrative */}
      <section className="border-t border-[#e2e8f0] py-20">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[240px_1fr]">
            <h2 className="font-display text-2xl font-bold text-[#0a1628] md:sticky md:top-28 md:self-start">
              How we <span className="gradient-text">got here</span>
            </h2>
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-[#475569]">
              <p>
                NATLE started because three of our founders were paged during
                the same week in 2021 — three different companies, three
                different outages, all caused by AI systems that had never
                been tested against the traffic patterns of a bad day.
              </p>
              <p>
                We built the company we wished we could have called: engineers
                who understand both the model and the pager rotation. Today
                that means we own the whole stack for our clients — data
                pipelines, evaluation, deployment, and the on-call rotation
                that keeps it running.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Values — bento grid, deliberately uneven spans */}
      <section className="border-t border-[#e2e8f0] py-20">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-[#0a1628] md:text-3xl">
            What we <span className="gradient-text">optimize for</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.05} className={value.span}>
              <div className="clay-card border-none h-full p-7">
                <h3 className="font-display text-lg font-semibold text-[#0a1628]">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Milestones — genuine chronological sequence, numbered by year */}
      <section className="border-t border-[#e2e8f0] py-20">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-[#0a1628] md:text-3xl">
            Four years, <span className="gradient-text">in short</span>
          </h2>
        </Reveal>
        <div className="mt-10 space-y-0">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.05}>
              <div className="grid grid-cols-[80px_1fr] gap-6 border-t border-[#e2e8f0] py-6 first:border-t-0 md:grid-cols-[120px_1fr]">
                <span className="font-display text-xl font-bold text-[#0ea5e9]">
                  {m.year}
                </span>
                <p className="text-[#475569]">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-[#e2e8f0] py-20">
        <Reveal>
          <div className="clay-card border-none flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0a1628]">
                Want the team, not just the platform?
              </h2>
              <p className="mt-2 max-w-md text-[#475569]">
                Talk to an engineer about what you're trying to ship.
              </p>
            </div>
            <Link href="/contact" className="clay-btn px-6 py-2.5 rounded-full shrink-0">
              Book a call
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
