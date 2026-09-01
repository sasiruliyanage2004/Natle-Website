import Link from "next/link";
import KineticMesh from "@/prompt-design/components/KineticMesh";
import TelemetrySimulator from "@/prompt-design/components/TelemetrySimulator";
import GlassCard from "@/prompt-design/components/GlassCard";
import StatCounter from "@/prompt-design/components/StatCounter";
import SolutionsTabs from "@/prompt-design/components/SolutionsTabs";
import ArchitectureFlow from "@/prompt-design/components/ArchitectureFlow";
import { heroStats, projects } from "@/prompt-design/lib/data";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan/20 to-transparent blur-3xl" />
          <div className="absolute top-40 -left-40 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-mint/25 to-transparent blur-3xl" />
        </div>
        <div className="relative">
          <div className="absolute inset-0">
            <KineticMesh />
          </div>
          <div className="container-edge relative pt-20 pb-16 lg:pt-32 lg:pb-24">
            <div className="max-w-3xl">
              <p className="font-data text-xs uppercase tracking-wide text-quantum mb-6">
                NATLE × Hosma Ceylon — strategic software partnership
              </p>
              <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-semibold tracking-tight">
                Empowering agriculture
                <br />
                with <span className="text-gradient-quantum">next-gen</span> code
              </h1>
              <p className="mt-7 text-lg text-ink-soft leading-relaxed max-w-xl">
                FieldOS, YieldAI and TraceLink turn coconut, tea and hydroponic
                estates into fully instrumented operations — built by engineers
                who grew up around the soil they now monitor.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/prompt-design/contact"
                  className="rounded-full bg-ink text-pearl px-7 py-3.5 text-sm font-medium hover:bg-quantum transition-colors"
                >
                  Book a farm assessment
                </Link>
                <Link
                  href="/prompt-design/products"
                  className="rounded-full border border-ink/15 px-7 py-3.5 text-sm font-medium text-ink hover:border-ink/40 transition-colors"
                >
                  Explore the platform
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STATS STRIP */}
      <section className="container-edge py-10">
        <GlassCard className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-8 lg:p-10">
          {heroStats.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              decimals={s.value % 1 !== 0 ? 1 : 0}
            />
          ))}
        </GlassCard>
      </section>

      {/* TELEMETRY SIMULATOR */}
      <section className="container-edge py-16 lg:py-24">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
            A live probe, before it&apos;s in your soil
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Drag the sliders the way a field agronomist would read a probe —
            watch the projected yield curve and irrigation trigger respond in
            real time.
          </p>
        </div>
        <GlassCard className="p-6 lg:p-10">
          <TelemetrySimulator />
        </GlassCard>
      </section>

      {/* HOSMA CEYLON HERITAGE */}
      <section className="container-edge py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] relative bg-gradient-to-br from-emerald/20 via-mint/10 to-lime/20 border border-line">
              <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="coirBg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#F1F7F4" />
                    <stop offset="1" stopColor="#E5F3EA" />
                  </linearGradient>
                </defs>
                <rect width="400" height="500" fill="url(#coirBg)" />
                <g transform="translate(60,340)">
                  <ellipse cx="140" cy="70" rx="150" ry="26" fill="#059669" opacity="0.12" />
                  {Array.from({ length: 9 }).map((_, i) => (
                    <rect
                      key={i}
                      x={i * 30}
                      y={-i % 2 === 0 ? 40 : 20}
                      width="24"
                      height={i % 2 === 0 ? 110 : 90}
                      rx="4"
                      fill={i % 3 === 0 ? "#84CC16" : i % 3 === 1 ? "#10E599" : "#059669"}
                      opacity="0.85"
                    />
                  ))}
                </g>
                <g transform="translate(150,60)" opacity="0.9">
                  <circle r="34" fill="#0052FF" opacity="0.12" />
                  <path d="M-14 8 L0 -18 L14 8 Z" fill="#0052FF" />
                  <circle cy="16" r="3" fill="#00D2FF" />
                </g>
              </svg>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-data text-xs uppercase tracking-wide text-emerald mb-4">
              Since 2018
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold mb-5 max-w-md">
              Rooted in a working coir estate, not a lab
            </h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              Hosma Ceylon has exported organic coconut coir substrate to
              Dutch and European growers since 2018. NATLE grew out of the
              irrigation guesswork that cost that estate a season — the
              software exists because the problem was ours first.
            </p>
            <p className="text-ink-soft leading-relaxed mb-8">
              Every FieldOS deployment is still tested on Hosma Ceylon soil
              before it reaches a client estate.
            </p>
            <Link
              href="/prompt-design/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink border-b border-ink/30 pb-0.5 hover:border-ink"
            >
              Read the full story
            </Link>
          </div>
        </div>
      </section>

      {/* PRECISION BENTO GRID */}
      <section className="container-edge py-16 lg:py-24">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Precision is everywhere</h2>
          <p className="text-ink-soft leading-relaxed">
            From a single soil probe to a continent-spanning export ledger —
            the same platform, scaled to the estate.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <GlassCard className="lg:col-span-4 p-8 flex flex-col justify-between min-h-[280px]">
            <span className="font-data text-xs uppercase tracking-wide text-quantum">Telemetry mesh</span>
            <div>
              <p className="text-2xl font-display font-semibold mb-2">Self-healing across dense canopy</p>
              <p className="text-sm text-ink-soft max-w-md leading-relaxed">
                When one probe drops offline, the mesh reroutes around it —
                no gap in the moisture record while a technician is dispatched.
              </p>
            </div>
          </GlassCard>
          <GlassCard className="lg:col-span-2 p-8 flex flex-col justify-between min-h-[280px] bg-gradient-to-br from-emerald/5 to-transparent">
            <span className="font-data text-xs uppercase tracking-wide text-emerald">NDVI</span>
            <p className="text-sm text-ink-soft leading-relaxed">
              Weekly canopy health passes, cloud-gap filled by drone.
            </p>
          </GlassCard>
          <GlassCard className="lg:col-span-2 p-8 flex flex-col justify-between min-h-[240px]">
            <span className="font-data text-xs uppercase tracking-wide text-amber">TraceLink</span>
            <p className="text-sm text-ink-soft leading-relaxed">
              Every lot logged from soil to shipment.
            </p>
          </GlassCard>
          <GlassCard className="lg:col-span-4 p-8 flex flex-col justify-between min-h-[240px]">
            <span className="font-data text-xs uppercase tracking-wide text-cyan">YieldAI</span>
            <div>
              <p className="text-2xl font-display font-semibold mb-2">Forecasts with a confidence band</p>
              <p className="text-sm text-ink-soft max-w-md leading-relaxed">
                Six seasons of Ceylon field outcomes, not a generic model — the
                estate that trained it is the one it forecasts best.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* SOLUTIONS TABS */}
      <section className="container-edge py-16 lg:py-24">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">The platform, in three layers</h2>
        </div>
        <SolutionsTabs />
      </section>

      {/* ARCHITECTURE FLOW */}
      <section className="container-edge py-16 lg:py-24">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Soil to shipment, one system</h2>
          <p className="text-ink-soft leading-relaxed">
            Hover a stage to see what it hands off to the next.
          </p>
        </div>
        <ArchitectureFlow />
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="container-edge py-16 lg:py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Estates already running on it</h2>
          </div>
          <Link href="/prompt-design/projects" className="text-sm font-medium text-ink border-b border-ink/30 pb-0.5 hover:border-ink">
            View all case studies
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link key={p.id} href="/prompt-design/projects" className="group">
              <GlassCard className="p-7 h-full flex flex-col justify-between transition-transform group-hover:-translate-y-1.5">
                <div>
                  <p className="text-xs text-ink-faint mb-2">{p.location}</p>
                  <p className="font-display font-semibold text-lg mb-3 leading-snug">{p.name}</p>
                  <p className="text-sm text-ink-soft leading-relaxed">{p.summary}</p>
                </div>
                <div className="mt-6 pt-6 border-t border-line flex gap-6">
                  {p.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <p className="font-data text-xl font-semibold text-emerald">{m.value}</p>
                      <p className="text-xs text-ink-faint">{m.label}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-edge py-16 lg:py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "We stopped irrigating on a calendar and started irrigating on what the soil actually told us. Water use dropped by a third the first season.",
              name: "Estate Manager",
              org: "1,200-Acre Ceylon Coconut Estate",
            },
            {
              quote:
                "TraceLink turned our GlobalG.A.P. audit from a three-week scramble into an afternoon of clicking through a ledger that was already complete.",
              name: "Export Compliance Lead",
              org: "Highland Ceylon Tea Consortium",
            },
            {
              quote:
                "The EC alerts caught a substrate drift two weeks before it would have shown up in the fruit. That's the season, right there.",
              name: "Greenhouse Operations Director",
              org: "Dutch Berry Hydroponics Greenhouse",
            },
          ].map((t) => (
            <GlassCard key={t.name} className="p-8 flex flex-col justify-between">
              <p className="text-ink-soft leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 pt-6 border-t border-line">
                <p className="text-sm font-medium text-ink">{t.name}</p>
                <p className="text-xs text-ink-faint">{t.org}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-edge pb-24">
        <GlassCard strong className="p-10 lg:p-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
            Bring your estate onto FieldOS
          </h2>
          <p className="text-ink-soft max-w-lg mx-auto mb-8">
            A 30-minute call with an agronomist and an engineer — tell us your
            acreage and crop, and leave with a rough deployment timeline.
          </p>
          <Link
            href="/prompt-design/contact"
            className="inline-flex rounded-full bg-ink text-pearl px-8 py-3.5 text-sm font-medium hover:bg-quantum transition-colors"
          >
            Book a farm assessment
          </Link>
        </GlassCard>
      </section>
    </>
  );
}
