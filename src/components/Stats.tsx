"use client";

import { motion } from "framer-motion";

export default function Stats() {
  return (
    <section className="py-20 relative" style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #f8faff 100%)", borderTop: "1px solid rgba(14,165,233,0.1)", borderBottom: "1px solid rgba(14,165,233,0.1)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-3 border"
            style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.25)", color: "#0369a1" }}>
            Enterprise Scale
          </div>
          <h2 className="font-display text-3xl font-black" style={{ color: "#0a1628" }}>Proven at Enterprise Scale</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { val: "9+", label: "Projects Delivered", color: "#0ea5e9" },
            { val: "98.2%", label: "Model Accuracy", color: "#5aec8f" },
            { val: "5", label: "Continents Served", color: "#0d9488" },
            { val: "6", label: "AI Domains", color: "#1a3a8f" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="rounded-2xl p-6 text-center border"
              style={{ background: "#ffffff", borderColor: "rgba(14,165,233,0.12)", boxShadow: "0 4px 20px -4px rgba(10,22,60,0.07)" }}
            >
              <div
                className="font-display text-4xl sm:text-5xl font-black mb-2"
                style={{ background: `linear-gradient(135deg, ${s.color}, #0ea5e9)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >{s.val}</div>
              <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#64748b" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
