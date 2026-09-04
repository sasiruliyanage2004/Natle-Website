"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Target, Layers, Shield, Zap, Lock, CheckCircle } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-First Architecture", desc: "Every solution starts with AI at its core, not as an afterthought. We design intelligent systems from the ground up." },
  { icon: Target, title: "Deep Domain Expertise", desc: "Vertical knowledge across 6 industries means we understand your challenges before you explain them." },
  { icon: Layers, title: "Scalable by Design", desc: "Our architectures grow with your business from pilot deployments to enterprise scale systems handling millions of transactions." },
  { icon: Shield, title: "SOC 2 & HIPAA Compliant", desc: "End-to-end encrypted, GDPR ready. Your data and your clients data is always protected and sovereign." },
  { icon: Zap, title: "Rapid Deployment", desc: "Our pre-built AI modules slash time to market. Go from concept to production in weeks, not months." },
  { icon: Lock, title: "24/7 Enterprise Support", desc: "Dedicated support teams, SLA guarantees, and proactive monitoring ensure your AI systems never sleep." }
];

export default function Features() {
  return (
    <section className="bg-[#0d1535]/40 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Features List */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#e8f0fe] leading-tight mb-4">
                Why Enterprises <span className="gradient-text">Choose NATLE</span>
              </h2>
              <p className="text-[#94a3b8] text-lg">
                We do not just build AI — we become your long term technology partner. Here is what sets us apart from off the shelf vendors.
              </p>
            </motion.div>

            <div className="space-y-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl border border-[#0ea5e9]/10 hover:border-[#0ea5e9]/30 hover:bg-[#0ea5e9]/5 transition-all duration-300"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[#e8f0fe] text-lg mb-1">{f.title}</h3>
                      <p className="text-[#94a3b8] text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Platform Metrics Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-[2rem] p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a8f]/20 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#0ea5e9]/15">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1a3a8f] to-[#0ea5e9] flex items-center justify-center shadow-lg shadow-[#0ea5e9]/20">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">NATLE AI Platform</h3>
                    <div className="text-[#94a3b8] text-xs">v4.2 Production Ready</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#5aec8f]/10 border border-[#5aec8f]/20 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#5aec8f] animate-pulse"></span>
                  <span className="text-[#5aec8f] text-xs font-bold uppercase">Live</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#0ea5e9] font-medium">Model Accuracy</span>
                    <span className="text-white font-bold">98.2%</span>
                  </div>
                  <div className="h-2 bg-[#070d24] rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-[#0ea5e9] rounded-full" style={{ width: "98.2%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#5aec8f] font-medium">Inference Speed</span>
                    <span className="text-white font-bold">&lt; 15ms</span>
                  </div>
                  <div className="h-2 bg-[#070d24] rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-[#5aec8f] rounded-full" style={{ width: "96.8%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#00c9a7] font-medium">Data Security</span>
                    <span className="text-white font-bold">100%</span>
                  </div>
                  <div className="h-2 bg-[#070d24] rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-[#00c9a7] rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#1a3a8f] font-medium">Client Satisfaction</span>
                    <span className="text-white font-bold">100%</span>
                  </div>
                  <div className="h-2 bg-[#070d24] rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-[#1a3a8f] rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {["SOC 2", "GDPR", "ISO 27001", "HIPAA"].map(cert => (
                  <div key={cert} className="badge-healthcare px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {cert}
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

