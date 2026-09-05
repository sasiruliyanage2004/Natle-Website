import Reveal from "@/components/Reveal";
import Link from "next/link";
import {
  Workflow,
  ShieldCheck,
  Gauge,
  Database,
  Boxes,
  Radar,
} from "lucide-react";

const SERVICES = [
  {
    icon: Workflow,
    title: "Agent & pipeline engineering",
    body: "We design multi-step AI workflows — retrieval, tool use, and human handoff — and build the orchestration layer that keeps them observable when something goes wrong at 2am.",
    points: ["Tool-calling & agent orchestration", "Retrieval pipelines tuned to your data", "Human-in-the-loop escalation paths"],
  },
  {
    icon: Gauge,
    title: "Evaluation & red-teaming",
    body: "Before a model touches production traffic, it goes through an evaluation suite built for your domain — not a generic leaderboard.",
    points: ["Domain-specific benchmark design", "Adversarial & jailbreak testing", "Regression suites tied to your release cycle"],
  },
  {
    icon: ShieldCheck,
    title: "Deployment & operations",
    body: "We run what we build. That includes the on-call rotation, the incident reviews, and the uncomfortable conversations about what needs to be rolled back.",
    points: ["Production monitoring & alerting", "Cost and latency optimization", "SOC 2-aligned access controls"],
  },
];

const CAPABILITIES = [
  { icon: Database, title: "Data infrastructure", body: "Pipelines that get the right context to the model without leaking the wrong data." },
  { icon: Boxes, title: "Model selection", body: "We stay model-agnostic and pick the smallest model that meets your accuracy bar." },
  { icon: Radar, title: "Ongoing monitoring", body: "Drift detection and alerting so a quiet failure doesn't stay quiet." },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pb-16 pt-20 md:pt-28">
        <Reveal>
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.1] text-[#0a1628] md:text-5xl">
            Three services. <span className="gradient-text">One team that owns the outcome.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#475569]">
            Most AI vendors hand you a model and a Slack channel. We stay
            attached to the system we build until it's boring — in the good,
            reliable sense.
          </p>
        </Reveal>
      </section>

      {/* Alternating service rows */}
      <section className="space-y-6 border-t border-[#e2e8f0] py-16">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          const reversed = i % 2 === 1;
          return (
            <Reveal key={service.title} delay={i * 0.05}>
              <div className="clay-card border-none grid gap-8 p-8 md:grid-cols-[280px_1fr] md:p-10">
                <div className={`flex flex-col justify-center ${reversed ? "md:order-2" : ""}`}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0ea5e9]/10">
                    <Icon size={26} className="text-[#0ea5e9]" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-[#0a1628]">
                    {service.title}
                  </h2>
                </div>
                <div className={reversed ? "md:order-1" : ""}>
                  <p className="text-base leading-relaxed text-[#475569]">
                    {service.body}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-[#0a1628]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-lime" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* Capabilities strip */}
      <section className="border-t border-[#e2e8f0] py-16">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-[#0a1628] md:text-3xl">
            Underneath every engagement
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <Reveal key={cap.title} delay={i * 0.05}>
                <div className="clay-card border-none h-full p-7">
                  <Icon size={22} className="text-[#0ea5e9]" />
                  <h3 className="mt-4 font-display text-base font-semibold text-[#0a1628]">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                    {cap.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[#e2e8f0] py-20">
        <Reveal>
          <div className="clay-card border-none flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0a1628]">
                Not sure which service you need?
              </h2>
              <p className="mt-2 max-w-md text-[#475569]">
                Tell us what's breaking and we'll tell you where to start.
              </p>
            </div>
            <Link href="/contact" className="clay-btn px-6 py-2.5 rounded-full shrink-0">
              Get a recommendation
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
