import GlassCard from "@/prompt-design/components/GlassCard";
import HardwareShowcase from "@/prompt-design/components/HardwareShowcase";
import { FieldOSBlueprint, YieldAIBlueprint, TraceLinkBlueprint } from "@/prompt-design/components/ProductBlueprints";

export default function ProductsPage() {
  return (
    <>
      <section className="container-edge pt-16 pb-14 lg:pt-24 lg:pb-20">
        <p className="font-data text-xs uppercase tracking-wide text-cyan mb-6">Products</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl">
          The platform, layer by layer
        </h1>
        <p className="mt-7 text-lg text-ink-soft leading-relaxed max-w-2xl">
          Three products, one data model. Everything a probe measures flows
          through the same pipeline into forecasting and compliance.
        </p>
      </section>

      <section id="fieldos" className="container-edge py-10 scroll-mt-28">
        <GlassCard strong className="p-8 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-data text-xs uppercase tracking-wide text-quantum mb-3">Operating system</p>
            <h2 className="text-3xl font-semibold mb-4">FieldOS™</h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              A mesh network of probes, gateways and irrigation controllers,
              unified under one command layer. Field managers see every
              reading and can act on it without a laptop.
            </p>
            <ul className="space-y-3">
              {[
                "Self-healing mesh, no single point of failure",
                "Offline-first controller keeps irrigating through outages",
                "Role-based dashboards for owners, managers and agronomists",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-quantum shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-pearl/60 border border-line p-4">
            <FieldOSBlueprint />
          </div>
        </GlassCard>
      </section>

      <section id="yieldai" className="container-edge py-10 scroll-mt-28">
        <GlassCard strong className="p-8 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div className="lg:order-2">
            <p className="font-data text-xs uppercase tracking-wide text-emerald mb-3">Machine learning</p>
            <h2 className="text-3xl font-semibold mb-4">YieldAI™</h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              Trained on six seasons of Ceylon field outcomes, YieldAI
              forecasts harvest volume eight weeks out — with a stated
              confidence band, because a single false-precise number is
              worse than no forecast at all.
            </p>
            <ul className="space-y-3">
              {[
                "Confidence-banded forecast, not a black-box figure",
                "Flags stress zones for early agronomist visits",
                "Retrains on your estate's own outcomes each harvest",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-pearl/60 border border-line p-4 lg:order-1">
            <YieldAIBlueprint />
          </div>
        </GlassCard>
      </section>

      <section id="tracelink" className="container-edge py-10 pb-20 scroll-mt-28">
        <GlassCard strong className="p-8 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-data text-xs uppercase tracking-wide text-amber mb-3">Compliance ledger</p>
            <h2 className="text-3xl font-semibold mb-4">TraceLink™</h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              Every harvest lot, substrate origin and processing step is
              written to an immutable ledger the moment it happens — so
              export documentation exists before the audit, not because of it.
            </p>
            <ul className="space-y-3">
              {[
                "One-tap export packet for customs and buyer audits",
                "Chain-of-custody visible to your export partner in real time",
                "Cuts documentation turnaround from weeks to same-day",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-pearl/60 border border-line p-4 flex items-center">
            <TraceLinkBlueprint />
          </div>
        </GlassCard>
      </section>

      <section className="container-edge py-14 lg:py-20">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">The hardware underneath</h2>
          <p className="text-ink-soft leading-relaxed">
            FieldOS ships with its own field-tested hardware line, engineered
            for tropical humidity and multi-year battery life.
          </p>
        </div>
        <HardwareShowcase />
      </section>
    </>
  );
}
