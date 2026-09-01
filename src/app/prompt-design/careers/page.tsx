import GlassCard from "@/prompt-design/components/GlassCard";
import RolesList from "@/prompt-design/components/RolesList";
import { perks } from "@/prompt-design/lib/data";

export default function CareersPage() {
  return (
    <>
      <section className="container-edge pt-16 pb-14 lg:pt-24 lg:pb-20">
        <p className="font-data text-xs uppercase tracking-wide text-lime mb-6">Careers</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl">
          Engineers who visit the field
        </h1>
        <p className="mt-7 text-lg text-ink-soft leading-relaxed max-w-2xl">
          Everyone on the team, from firmware to frontend, spends time on an
          active estate. Code that never meets the soil tends to miss the point.
        </p>
      </section>

      <section className="container-edge py-10 lg:py-14">
        <div className="grid sm:grid-cols-2 gap-5">
          {perks.map((perk) => (
            <GlassCard key={perk} className="p-6 flex items-start gap-4">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-lime shrink-0" />
              <p className="text-sm text-ink-soft leading-relaxed">{perk}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="container-edge py-10 lg:py-14 pb-24">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Open roles</h2>
        </div>
        <RolesList />
      </section>
    </>
  );
}
