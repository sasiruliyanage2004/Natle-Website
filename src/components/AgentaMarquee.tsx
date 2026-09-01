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
  { label: "LoRaWAN Sensor Mesh", icon: Radio },
  { label: "Ceylon Cocopeat Growbags", icon: Leaf },
  { label: "FieldOS™ Cloud Platform", icon: CloudCog },
  { label: "YieldAI™ Harvest Predictor", icon: Activity },
  { label: "NDVI Satellite Telemetry", icon: Globe2 },
  { label: "Autonomous Drip Valves", icon: Droplets },
  { label: "TraceLink™ Blockchain", icon: ShieldCheck },
  { label: "100% Organic Substrates", icon: Leaf },
];

const row2 = [
  { label: "Low-EC Washed Peat", icon: Droplets },
  { label: "Sub-50ms API Latency", icon: Zap },
  { label: "GlobalG.A.P Audit Ready", icon: ShieldCheck },
  { label: "OMRI Listed Organic", icon: Leaf },
  { label: "Micro-Climate Mesh", icon: Radio },
  { label: "Yield Boost +28.4%", icon: Activity },
  { label: "40ft Bulk Container Logistics", icon: Globe2 },
  { label: "Next.js Enterprise Telemetry", icon: Cpu },
];

export default function AgentaMarquee() {
  return (
    <section className="relative overflow-hidden py-12 bg-transparent select-none">
      
      {/* Gradient Fades on Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#EDF6F2] dark:from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#EDF6F2] dark:from-[#050505] to-transparent z-10" />

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
