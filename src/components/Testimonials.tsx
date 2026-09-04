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
    <section className="bg-[#070d24] py-24 relative overflow-hidden border-y border-[#0ea5e9]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold text-[#e8f0fe] mb-4"
          >
            Trusted by <span className="gradient-text">Enterprise Leaders</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card rounded-2xl p-8 flex flex-col relative"
            >
              <Quote className="w-10 h-10 text-[#0ea5e9]/20 absolute top-6 right-6" />
              <p className="text-[#e8f0fe] text-lg leading-relaxed mb-8 flex-grow relative z-10 italic">
                "{t.quote}"
              </p>
              <div className="mt-auto">
                <div className="font-bold text-[#0ea5e9]">{t.author}</div>
                <div className="text-xs text-[#94a3b8]">{t.role} &bull; {t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

