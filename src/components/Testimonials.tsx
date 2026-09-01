"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "NATLE FieldOS transformed our 1,200-acre tea & fruit estate. Water and fertilizer costs dropped by 28% in the very first quarter.",
    author: "Anura Jayasundara",
    role: "Managing Director",
    company: "Lanka Bio-Agri Plantations",
    avatar: "AJ",
    rating: 5,
    metrics: "28% Cost Reduction"
  },
  {
    quote: "The satellite NDVI analysis in YieldAI caught a fungal infestation two weeks before it was visible to field inspectors. Saved an entire crop cycle.",
    author: "Dr. Rohitha Perera",
    role: "Chief Agronomist",
    company: "Apex Agro Exports Ltd",
    avatar: "RP",
    rating: 5,
    metrics: "$120k Yield Saved"
  },
  {
    quote: "TraceLink made international compliance effortless. European buyers can scan our QR code and see verified real-time sustainability metrics.",
    author: "Menaka Wijesinghe",
    role: "Head of Supply Chain",
    company: "GreenHorizon Commodities",
    avatar: "MW",
    rating: 5,
    metrics: "100% Export Pass Rate"
  }
];

export default function Testimonials() {
  return (
    <section className="relative bg-[#F8FAFC] py-28 border-t border-slate-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Case Studies
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Commercial <br className="hidden sm:block" />
            Growers &amp; Exporters
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            See how enterprise agriculture operations leverage NATLE to boost yield, reduce input costs, and automate compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                    {t.metrics}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-slate-200 mb-4" />
                <p className="text-base text-slate-700 leading-relaxed font-normal italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.author}</h4>
                  <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
