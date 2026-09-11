import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import AmbientBackground from "@/components/AmbientBackground";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — NATLE",
  description: "Get in touch with the NATLE team.",
};

const CONTACT_DETAILS = [
  { label: "Email", value: "info@natle.dev" },
  { label: "Phone", value: "+94 70 465 9847 / +94 11 250 7601" },
  { label: "Studio", value: "No. 283 1/1, Ruwan Mawatha, Thimbirigasyaya Road, Colombo 05, Sri Lanka" },
];

export default function ContactPage() {
  return (
    <section className="pt-40 pb-28 bg-mist dark:bg-[#07090E] relative overflow-hidden">
      <AmbientBackground />
      <div className="container-content relative grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
        <Reveal>
          <div className="text-azure text-xs font-mono font-semibold tracking-widest uppercase mb-4">
            CONTACT
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-ink dark:text-white leading-[1.05] mb-6">
            Let&apos;s talk about what you&apos;re building.
          </h1>
          <p className="text-ink/60 dark:text-white/60 leading-relaxed mb-10 max-w-sm">
            Tell us a little about your project and a member of our team will
            get back to you within one business day.
          </p>

          <div className="space-y-6">
            {CONTACT_DETAILS.map((c) => (
              <div key={c.label} className="pb-6 border-b border-ink/8 dark:border-white/10 last:border-0 last:pb-0">
                <p className="text-xs text-ink/40 dark:text-white/40 uppercase tracking-wide mb-1.5">{c.label}</p>
                <p className="text-ink dark:text-white font-medium leading-relaxed">{c.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
