import GlassCard from "@/prompt-design/components/GlassCard";
import { services } from "@/prompt-design/lib/data";

export default function ServicesPage() {
  return (
    <>
      <section className="container-edge pt-16 pb-14 lg:pt-24 lg:pb-20">
        <p className="font-data text-xs uppercase tracking-wide text-quantum mb-6">Services</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl">
          Four disciplines, one estate
        </h1>
        <p className="mt-7 text-lg text-ink-soft leading-relaxed max-w-2xl">
          Hardware, substrate, software and satellite imagery — engineered
          together rather than bolted on, because that&apos;s how a working
          estate actually runs.
        </p>
      </section>

      <section className="container-edge pb-24 space-y-6">
        {services.map((s, i) => (
          <GlassCard key={s.id} className="p-8 lg:p-12" strong={i === 0}>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
              <div>
                <p className="font-data text-xs text-ink-faint mb-3">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </p>
                <h2 className="text-2xl lg:text-3xl font-semibold mb-4 max-w-sm">{s.name}</h2>
                <p className="text-ink-soft leading-relaxed max-w-md">{s.summary}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 content-start border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-10">
                {s.specs.map((spec) => (
                  <div key={spec.k}>
                    <p className="text-xs text-ink-faint uppercase tracking-wide mb-1.5">{spec.k}</p>
                    <p className="font-data text-sm text-ink">{spec.v}</p>
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
