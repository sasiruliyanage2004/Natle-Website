import GlassCard from "@/prompt-design/components/GlassCard";
import { projects } from "@/prompt-design/lib/data";

export default function ProjectsPage() {
  return (
    <>
      <section className="container-edge pt-16 pb-14 lg:pt-24 lg:pb-20">
        <p className="font-data text-xs uppercase tracking-wide text-amber mb-6">Projects</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl">
          Case studies from working estates
        </h1>
        <p className="mt-7 text-lg text-ink-soft leading-relaxed max-w-2xl">
          Three deployments, three crops, three very different problems.
          Metrics below are estate-reported and verified against FieldOS logs.
        </p>
      </section>

      <section className="container-edge pb-24 space-y-6">
        {projects.map((p, i) => (
          <GlassCard key={p.id} className="p-8 lg:p-12" strong={i === 0}>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
              <div>
                <p className="text-xs text-ink-faint mb-3">{p.location}</p>
                <h2 className="text-2xl lg:text-3xl font-semibold mb-4 max-w-md">{p.name}</h2>
                <p className="text-ink-soft leading-relaxed max-w-lg">{p.summary}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 content-center border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-10">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-data text-2xl lg:text-3xl font-semibold text-emerald">{m.value}</p>
                    <p className="text-xs text-ink-faint mt-1.5 leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </section>
    </>
  );
}
