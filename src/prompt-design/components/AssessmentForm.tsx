"use client";

import { useState } from "react";

const crops = ["Coconut", "Tea", "Hydroponic berries", "Other"];

export default function AssessmentForm() {
  const [acreage, setAcreage] = useState(150);
  const [crop, setCrop] = useState(crops[0]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <p className="font-display font-semibold text-2xl mb-3">Request received</p>
        <p className="text-ink-soft max-w-sm mx-auto leading-relaxed">
          An agronomist and an engineer will reach out within one business
          day to schedule your {acreage}-acre {crop.toLowerCase()} assessment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-medium text-ink-soft">Full name</label>
          <input
            required
            type="text"
            className="mt-1.5 w-full rounded-xl border border-line bg-pearl/60 px-4 py-3 text-sm focus:outline-none focus:border-quantum"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-soft">Work email</label>
          <input
            required
            type="email"
            className="mt-1.5 w-full rounded-xl border border-line bg-pearl/60 px-4 py-3 text-sm focus:outline-none focus:border-quantum"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-soft">Estate name</label>
        <input
          type="text"
          className="mt-1.5 w-full rounded-xl border border-line bg-pearl/60 px-4 py-3 text-sm focus:outline-none focus:border-quantum"
        />
      </div>

      <div>
        <p className="text-xs font-medium text-ink-soft mb-3">Primary crop</p>
        <div className="flex flex-wrap gap-2">
          {crops.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCrop(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                crop === c
                  ? "bg-ink text-pearl border-transparent"
                  : "border-line text-ink-soft hover:border-ink/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <label htmlFor="acreage" className="text-xs font-medium text-ink-soft">
            Estate size
          </label>
          <span className="font-data text-sm text-emerald">{acreage} acres</span>
        </div>
        <input
          id="acreage"
          type="range"
          min={5}
          max={2000}
          step={5}
          value={acreage}
          onChange={(e) => setAcreage(Number(e.target.value))}
          className="w-full accent-[#059669]"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-ink-soft">What&apos;s slowing you down today?</label>
        <textarea
          rows={3}
          className="mt-1.5 w-full rounded-xl border border-line bg-pearl/60 px-4 py-3 text-sm focus:outline-none focus:border-quantum resize-none"
          placeholder="Irrigation guesswork, export documentation, forecasting..."
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto rounded-full bg-ink text-pearl px-8 py-3.5 text-sm font-medium hover:bg-quantum transition-colors"
      >
        Book my assessment
      </button>
    </form>
  );
}
