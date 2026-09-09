import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import AmbientBackground from "@/components/AmbientBackground";

export const metadata: Metadata = {
  title: "Contact — NATLE",
  description: "Get in touch with the NATLE team.",
};

const CONTACT_DETAILS = [
  { label: "Email", value: "info@natle.dev" },
  { label: "Phone", value: "+94 70 465 9847 / +94 11 250 7601" },
  { label: "Studio", value: "No. 283 1/1, Ruwan Mawatha, Thimbirigasyaya Road, Colombo 05, Sri Lanka" },
];

const inputClass =
  "w-full rounded-xl border border-ink/15 px-4 py-3 text-ink placeholder:text-ink/30 outline-none transition-shadow focus:border-azure focus:ring-4 focus:ring-azure/10";

export default function ContactPage() {
  return (
    <section className="pt-40 pb-28 bg-mist relative overflow-hidden">
      <AmbientBackground />
      <div className="container-content relative grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-azure/10 border border-azure/20 text-azure text-xs font-semibold tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-azure animate-pulse" />
            CONTACT
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-[1.05] mb-6">
            Let&apos;s talk about what you&apos;re building.
          </h1>
          <p className="text-ink/60 leading-relaxed mb-10 max-w-sm">
            Tell us a little about your project and a member of our team will
            get back to you within one business day.
          </p>

          <div className="space-y-6">
            {CONTACT_DETAILS.map((c) => (
              <div key={c.label} className="pb-6 border-b border-ink/8 last:border-0 last:pb-0">
                <p className="text-xs text-ink/40 uppercase tracking-wide mb-1.5">{c.label}</p>
                <p className="text-ink font-medium leading-relaxed">{c.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="rounded-3xl bg-paper border border-ink/8 shadow-card p-8 lg:p-10 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-ink/70 mb-2" htmlFor="name">
                  Full name
                </label>
                <input id="name" name="name" type="text" placeholder="Jane Silva" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink/70 mb-2" htmlFor="email">
                  Email
                </label>
                <input id="email" name="email" type="email" placeholder="jane@company.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 mb-2" htmlFor="company">
                Company
              </label>
              <input id="company" name="company" type="text" placeholder="Company name" className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 mb-2" htmlFor="budget">
                Estimated budget
              </label>
              <select id="budget" name="budget" className={`${inputClass} bg-paper`} defaultValue="">
                <option value="" disabled>
                  Select a range
                </option>
                <option>Under $10,000</option>
                <option>$10,000 – $50,000</option>
                <option>$50,000 – $150,000</option>
                <option>$150,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 mb-2" htmlFor="message">
                Tell us about your project
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="What are you trying to build?"
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-ink text-white px-8 py-4 text-[15px] font-semibold hover:bg-ink-soft active:scale-[0.98] transition-all"
            >
              Send message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
