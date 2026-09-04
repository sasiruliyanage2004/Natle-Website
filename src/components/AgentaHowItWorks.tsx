"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Discovery & Architecture",
    desc: "We analyze your operations, identify bottlenecks, and design a custom AI architecture tailored to your enterprise goals.",
    color: "#1a3a8f" // Primary Blue
  },
  {
    icon: Code2,
    title: "2. Model Training & Integration",
    desc: "Our engineers build, train, and seamlessly integrate the AI models into your existing software ecosystem without disruption.",
    color: "#0ea5e9" // Cyan
  },
  {
    icon: Rocket,
    title: "3. Deployment & Scaling",
    desc: "We launch the system to production, providing 24/7 monitoring, continuous learning updates, and scalable infrastructure.",
    color: "#5aec8f" // Lime
  }
];

export default function AgentaHowItWorks() {
  return (
    <section className="bg-transparent py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold text-[#e8f0fe] mb-4"
          >
            Our <span className="gradient-text">Deployment Lifecycle</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#94a3b8] text-lg max-w-2xl mx-auto"
          >
            A proven, three-phase methodology to take your enterprise from AI concept to production-grade deployment.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1a3a8f] via-[#0ea5e9] to-[#5aec8f] -translate-y-1/2 opacity-30"></div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundColor: step.color }}></div>
                    <Icon className="w-10 h-10 relative z-10" style={{ color: step.color }} />
                  </div>
                  
                  <h3 className="font-display font-bold text-xl text-[#e8f0fe] mb-3">{step.title}</h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

