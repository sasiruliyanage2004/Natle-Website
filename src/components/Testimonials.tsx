"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "NATLE's Healthcare AI platform reduced our patient diagnostic errors by 14% within the first three months. Their deployment was seamless and fully HIPAA compliant.",
    author: "Dr. Amanda Wickramasinghe",
    role: "Chief Medical Officer",
    company: "Colombo General"
  },
  {
    quote: "The FieldOS Edge Telemetry system transformed our 5,000-acre estate. We now have real-time soil and root matrix data that optimized our yield by 22%.",
    author: "David Perera",
    role: "Director of Operations",
    company: "AgriTech Holdings"
  },
  {
    quote: "Their Custom AI model for our retail POS reduced inventory shrinkage to near zero. It's not just software; it's a complete operational upgrade.",
    author: "Sarah Jenkins",
    role: "Head of Retail",
    company: "Nexus Supermarkets"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-[#f0f7ff] py-24 relative overflow-hidden border-y border-[#e2e8f0]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)" }}></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(90,236,143,0.2) 0%, transparent 70%)" }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.25)", color: "#0369a1" }}>
            Client Success
          </div>
          <h2 className="font-display text-4xl font-black mb-4" style={{ color: "#0a1628" }}>
            Trusted by Enterprises
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1"
              style={{ background: "#ffffff", borderColor: "rgba(14,165,233,0.12)", boxShadow: "0 4px 20px -4px rgba(10,22,60,0.05)" }}
            >
              <Quote className="w-8 h-8 mb-6" style={{ color: "#0ea5e9" }} />
              <p className="text-[#475569] leading-relaxed mb-8 italic">"{test.quote}"</p>
              <div>
                <h4 className="font-display font-bold text-sm" style={{ color: "#0a1628" }}>{test.author}</h4>
                <p className="text-xs mt-1 font-semibold" style={{ color: "#0ea5e9" }}>{test.role}</p>
                <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{test.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

