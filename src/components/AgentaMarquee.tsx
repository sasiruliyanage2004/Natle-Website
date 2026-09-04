"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Leaf, 
  Radio, 
  Activity, 
  CloudCog, 
  ShieldCheck, 
  Globe2, 
  Droplets,
  Zap
} from "lucide-react";

const row1 = [
  { label: "Healthcare Diagnostic AI", icon: Activity },
  { label: "Autonomous Agriculture IoT", icon: Leaf },
  { label: "FieldOS™ Edge Telemetry", icon: Radio },
  { label: "Omnichannel Retail POS", icon: Zap },
  { label: "Adaptive EdTech Engines", icon: Globe2 },
  { label: "Predictive Human Resources", icon: CloudCog },
  { label: "Sovereign On-Premises LLMs", icon: Cpu },
  { label: "SOC 2 Type II Certified", icon: ShieldCheck },
];

const row2 = [
  { label: "HIPAA Compliant Vision", icon: ShieldCheck },
  { label: "Sub-15ms Edge Latency", icon: Zap },
  { label: "98.2% Diagnostic Accuracy", icon: Activity },
  { label: "LoRaWAN 15km Sensor Mesh", icon: Radio },
  { label: "Industry 4.0 Architecture", icon: Cpu },
  { label: "Real-Time Fraud Prevention", icon: ShieldCheck },
  { label: "100% Data Sovereignty", icon: CloudCog },
  { label: "Next.js Enterprise Cloud", icon: Globe2 },
];

export default function AgentaMarquee() {
  return (
    <section className="relative overflow-hidden py-6 select-none">
      
      {/* Gradient Fades on Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#F8FAFC] dark:from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#F8FAFC] dark:from-[#050505] to-transparent z-10" />

      <div className="flex flex-col gap-4">
        
        {/* Row 1: Moving Left */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center gap-4 pr-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {[...row1, ...row1, ...row1, ...row1].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`row1-${index}`}
                  className="flex items-center gap-2 rounded-full border border-white/90 dark:border-emerald-900/40 bg-white/90 dark:bg-[#0a140a]/90 px-5 py-2 text-xs font-bold text-[#071326] dark:text-emerald-50 shadow-sm hover:border-[#0052FF] hover:shadow-md transition-all"
                >
                  <Icon className="h-3.5 w-3.5 text-[#0052FF]" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Row 2: Moving Right */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center gap-4 pr-4"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          >
            {[...row2, ...row2, ...row2, ...row2].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`row2-${index}`}
                  className="flex items-center gap-2 rounded-full border border-white/90 dark:border-emerald-900/40 bg-white/90 dark:bg-[#0a140a]/90 px-5 py-2 text-xs font-bold text-[#071326] dark:text-emerald-50 shadow-sm hover:border-[#059669] hover:shadow-md transition-all"
                >
                  <Icon className="h-3.5 w-3.5 text-[#059669]" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
