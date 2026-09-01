"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Zap,
  Leaf
} from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Field Starter",
    badge: "Boutique & Pilot",
    price: "$299",
    period: "/month",
    description: "Ideal for boutique greenhouses and single-estate pilot deployments exploring IoT telemetry.",
    features: [
      "Up to 15 LoRaWAN Soil Probes",
      "FieldOS™ Basic Farm Dashboard",
      "Automated Soil Moisture Alerts",
      "Substrate EC Mapping",
      "Weekly Telemetry Backups",
      "Standard Email Support",
    ],
    popular: false,
    cta: "Start 14-Day Pilot",
  },
  {
    name: "Commercial Pro",
    badge: "Most Popular",
    price: "$799",
    period: "/month",
    description: "Built for commercial plantations, multi-greenhouse facilities, and organic export growers.",
    features: [
      "Up to 80 LoRaWAN Probes",
      "YieldAI™ Harvest Forecast Engine",
      "Autonomous Solenoid Valve Control",
      "Hosma Substrate Compaction Sync",
      "Satellite NDVI Canopy Health (Weekly)",
      "Priority 24/7 Field Engineer Dispatch",
      "TraceLink™ Blockchain Export Logs",
      "Multi-User Agronomist Access",
    ],
    popular: true,
    cta: "Deploy Commercial Pro",
  },
  {
    name: "Global Enterprise",
    badge: "Consortiums & Exporters",
    price: "$1,999",
    period: "/month",
    description: "Ultimate telemetry infrastructure for multinational plantation groups and global export corridors.",
    features: [
      "Unlimited IoT Probes & Gateways",
      "Custom Substrate Husk-to-Peat Ratios",
      "Direct 40ft Container Fleet Tracking",
      "Dedicated Enterprise Agronomy Architect",
      "Sub-50ms Private Cloud Infrastructure",
      "Custom API Integrations & Webhooks",
      "GlobalG.A.P Audit Compliance Suite",
      "SLA 99.99% Telemetry Uptime Guarantee",
    ],
    popular: false,
    cta: "Contact Enterprise Team",
  },
];

export default function AgentaPricing() {
  return (
    <section className="relative py-28 md:py-36 bg-[#EDF6F2] select-none">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0052FF]/20 bg-white/80 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0052FF] mb-4 shadow-sm backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-[#0052FF]" />
            <span>Commercial Plans &bull; Transparent ROI</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071326] leading-tight">
            Choose Your <br />
            <span className="gradient-text">Deployment Tier.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#071326]/70 leading-relaxed font-normal">
            Select the ideal telemetry and substrate management level for your farm. All commercial plans include dedicated Ceylon substrate calibration.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular 
                  ? "border-2 border-[#0052FF] shadow-2xl scale-105 z-10 bg-white/95" 
                  : "hover:-translate-y-1.5 shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D2FF] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-[#071326]">{plan.name}</h3>
                  <span className="px-3 py-0.5 rounded-full bg-slate-100 text-[11px] font-mono font-bold text-slate-600">
                    {plan.badge}
                  </span>
                </div>

                <p className="text-xs text-[#071326]/70 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-100">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-[#071326]">{plan.price}</span>
                  <span className="text-xs font-bold text-slate-400">{plan.period}</span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">What's included:</p>
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-[#071326]/85 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/contact"
                className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? "gradient-btn text-white shadow-xl hover:scale-105"
                    : "bg-slate-900 text-white hover:bg-[#0052FF]"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-12 text-center text-xs text-slate-500 font-mono">
          All commercial tiers include a 14-day calibration guarantee. Need custom 1,000+ acre substrate logistics?{" "}
          <Link href="/contact" className="text-[#0052FF] font-bold underline">
            Request Enterprise Custom Quote &rarr;
          </Link>
        </p>

      </div>
    </section>
  );
}
