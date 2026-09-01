import GlassCard from "@/prompt-design/components/GlassCard";
import MilestoneRoadmap from "@/prompt-design/components/MilestoneRoadmap";
import { certifications, leadership } from "@/prompt-design/lib/data";

export default function AboutPage() {
  return (
    <>
      <section className="container-edge pt-16 pb-14 lg:pt-24 lg:pb-20">
        <p className="font-data text-xs uppercase tracking-wide text-emerald mb-6">About</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl">
          Coconut roots, Silicon Valley-grade engineering
        </h1>
        <p className="mt-7 text-lg text-ink-soft leading-relaxed max-w-2xl">
          NATLE exists because a coir estate lost a season to guesswork. We
          build the software we wished we had, in the same soil we started in.
        </p>
      </section>

      <section className="container-edge py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          <GlassCard className="p-8 lg:p-10">
            <p className="font-data text-xs uppercase tracking-wide text-emerald mb-4">Hosma Ceylon</p>
            <h2 className="text-2xl font-semibold mb-4">Where the problem started</h2>
            <p className="text-ink-soft leading-relaxed">
              Since 2018, Hosma Ceylon has exported organic coconut coir
              substrate from the Southern Province to Dutch and European
              greenhouse growers. Fixed irrigation schedules and paper-based
              export records worked, until a drought season made clear they
              weren&apos;t enough.
            </p>
          </GlassCard>
          <GlassCard className="p-8 lg:p-10">
            <p className="font-data text-xs uppercase tracking-wide text-quantum mb-4">NATLE</p>
            <h2 className="text-2xl font-semibold mb-4">Where the software spun out</h2>
            <p className="text-ink-soft leading-relaxed">
              What began as twelve soil probes on a pilot plot became FieldOS
              in 2022 — a platform built first for our own estate, then opened
              to coconut, tea and hydroponic operations that share the same
              problem.
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="container-edge py-14 lg:py-20">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">2018 to 2026</h2>
          <p className="text-ink-soft leading-relaxed">Select a year to read what changed.</p>
        </div>
        <MilestoneRoadmap />
      </section>

      <section className="container-edge py-14 lg:py-20">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Leadership</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {leadership.map((person) => (
            <GlassCard key={person.name} className="p-6">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-quantum/20 to-emerald/20 border border-line mb-5 flex items-center justify-center font-display font-semibold text-ink">
                {person.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <p className="font-display font-semibold text-base mb-1">{person.name}</p>
              <p className="text-xs text-emerald mb-3">{person.role}</p>
              <p className="text-sm text-ink-faint leading-relaxed">{person.bio}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="container-edge py-14 lg:py-24">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Certifications</h2>
          <p className="text-ink-soft leading-relaxed">
            What we&apos;re independently audited against, on both the substrate and software sides.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((c) => (
            <GlassCard key={c.name} className="p-6">
              <p className="font-display font-semibold text-lg mb-2">{c.name}</p>
              <p className="text-sm text-ink-faint leading-relaxed">{c.detail}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
