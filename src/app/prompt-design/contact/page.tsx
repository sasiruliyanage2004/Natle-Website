import GlassCard from "@/prompt-design/components/GlassCard";
import AssessmentForm from "@/prompt-design/components/AssessmentForm";

export default function ContactPage() {
  return (
    <>
      <section className="container-edge pt-16 pb-14 lg:pt-24 lg:pb-20">
        <p className="font-data text-xs uppercase tracking-wide text-quantum mb-6">Contact</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl">
          Tell us your acreage. We&apos;ll do the rest.
        </h1>
        <p className="mt-7 text-lg text-ink-soft leading-relaxed max-w-2xl">
          A 30-minute call with an agronomist and an engineer, ending in a
          rough deployment timeline for your estate.
        </p>
      </section>

      <section className="container-edge pb-24">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <GlassCard strong className="p-8 lg:p-12">
            <AssessmentForm />
          </GlassCard>

          <div className="space-y-6">
            <GlassCard className="p-8">
              <p className="font-data text-xs uppercase tracking-wide text-ink-faint mb-4">
                Colombo headquarters
              </p>
              <div className="rounded-xl overflow-hidden aspect-[4/3] mb-5 relative bg-alabaster border border-line">
                <svg viewBox="0 0 300 220" className="absolute inset-0 w-full h-full">
                  <rect width="300" height="220" fill="#F1F7F4" />
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" x2="300" y1={i * 36} y2={i * 36} stroke="#0052FF" strokeOpacity="0.06" />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 38} x2={i * 38} y1="0" y2="220" stroke="#0052FF" strokeOpacity="0.06" />
                  ))}
                  <circle cx="150" cy="110" r="10" fill="#0052FF" fillOpacity="0.15" />
                  <circle cx="150" cy="110" r="5" fill="#0052FF" />
                  <path d="M150 90 L150 60 M150 60 L145 68 M150 60 L155 68" stroke="#0052FF" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                Level 34, West Tower<br />
                Colombo World Trade Center<br />
                Echelon Square, Colombo 01, Sri Lanka
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <p className="font-data text-xs uppercase tracking-wide text-ink-faint mb-4">
                Direct lines
              </p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-ink-faint text-xs mb-1">General enquiries</p>
                  <p className="text-ink font-medium">hello@natle.io</p>
                </div>
                <div>
                  <p className="text-ink-faint text-xs mb-1">Sales & demos</p>
                  <p className="text-ink font-medium">+94 11 234 5678</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-amber/30">
              <p className="font-data text-xs uppercase tracking-wide text-amber mb-3">
                24/7 emergency support
              </p>
              <p className="text-sm text-ink-soft leading-relaxed mb-3">
                For irrigation failures or probe outages on a live estate.
              </p>
              <p className="font-data text-lg font-semibold text-ink">+94 76 555 0199</p>
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
}
