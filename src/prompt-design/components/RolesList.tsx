"use client";

import { useState } from "react";
import GlassCard from "./GlassCard";
import { roles } from "@/prompt-design/lib/data";

export default function RolesList() {
  const [openRole, setOpenRole] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const active = roles.find((r) => r.id === openRole);

  function close() {
    setOpenRole(null);
    setSubmitted(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-5">
        {roles.map((role) => (
          <GlassCard key={role.id} className="p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-data text-xs text-quantum">{role.team}</span>
                <span className="text-xs text-ink-faint">{role.location}</span>
              </div>
              <p className="font-display font-semibold text-lg mb-3">{role.title}</p>
              <p className="text-sm text-ink-soft leading-relaxed mb-6">{role.summary}</p>
            </div>
            <button
              onClick={() => setOpenRole(role.id)}
              className="self-start rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium hover:border-ink/40 transition-colors"
            >
              Apply
            </button>
          </GlassCard>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="glass-strong rounded-3xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 h-8 w-8 rounded-full flex items-center justify-center hover:bg-ink/5 text-ink-faint"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <p className="font-data text-xs text-quantum mb-2">{active.team}</p>
                <h3 className="text-xl font-semibold mb-5">{active.title}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-ink-soft">Full name</label>
                    <input
                      required
                      type="text"
                      className="mt-1.5 w-full rounded-xl border border-line bg-pearl/60 px-4 py-2.5 text-sm focus:outline-none focus:border-quantum"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ink-soft">Email</label>
                    <input
                      required
                      type="email"
                      className="mt-1.5 w-full rounded-xl border border-line bg-pearl/60 px-4 py-2.5 text-sm focus:outline-none focus:border-quantum"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ink-soft">Link to CV or portfolio</label>
                    <input
                      type="url"
                      placeholder="https://"
                      className="mt-1.5 w-full rounded-xl border border-line bg-pearl/60 px-4 py-2.5 text-sm focus:outline-none focus:border-quantum"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-ink text-pearl py-3 text-sm font-medium hover:bg-quantum transition-colors"
                  >
                    Submit application
                  </button>
                </form>
              </>
            ) : (
              <div className="py-6 text-center">
                <p className="font-display font-semibold text-lg mb-2">Application received</p>
                <p className="text-sm text-ink-soft">
                  We&apos;ll follow up within a week for the {active.title} role.
                </p>
                <button
                  onClick={close}
                  className="mt-6 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium hover:border-ink/40"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
