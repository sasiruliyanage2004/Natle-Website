"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Stats() {
  return (
    <section className="bg-transparent py-20 border-t border-[#0ea5e9]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-xs font-bold uppercase tracking-wider mb-4">
            Enterprise Scale
          </div>
          <h2 className="font-display text-3xl font-bold text-[#e8f0fe]">Proven at Enterprise Scale</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center"
          >
            <div className="font-display text-4xl sm:text-5xl font-bold text-[#0ea5e9] mb-2">9+</div>
            <div className="text-[#94a3b8] text-xs uppercase tracking-wider font-semibold">Projects Delivered</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center"
          >
            <div className="font-display text-4xl sm:text-5xl font-bold text-[#5aec8f] mb-2">98.2%</div>
            <div className="text-[#94a3b8] text-xs uppercase tracking-wider font-semibold">Model Accuracy</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center"
          >
            <div className="font-display text-4xl sm:text-5xl font-bold text-[#818cf8] mb-2">5</div>
            <div className="text-[#94a3b8] text-xs uppercase tracking-wider font-semibold">Continents</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center"
          >
            <div className="font-display text-4xl sm:text-5xl font-bold text-[#00c9a7] mb-2">6</div>
            <div className="text-[#94a3b8] text-xs uppercase tracking-wider font-semibold">AI Domains</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

