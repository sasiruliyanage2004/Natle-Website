"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, Sprout, ShoppingBag, GraduationCap, Users, Cpu } from "lucide-react";

const domains = [
  {
    id: "healthcare",
    title: "Healthcare",
    desc: "Intelligent diagnostics, patient management, and EHR integration that reduces errors and improves outcomes.",
    icon: Activity,
    color: "#0ea5e9",
    bgClass: "badge-healthcare",
    borderClass: "hover:border-[#0ea5e9]/40",
    image: "/images/blog/healthcare-ai.jpg"
  },
  {
    id: "agriculture",
    title: "Agriculture AI",
    desc: "Crop analytics, precision weather modeling, and AI powered irrigation for maximum yield and sustainability.",
    icon: Sprout,
    color: "#5aec8f",
    bgClass: "badge-agriculture",
    borderClass: "hover:border-[#5aec8f]/40",
    image: "/images/blog/precision-agriculture.jpg"
  },
  {
    id: "pos",
    title: "Point of Sales",
    desc: "AI driven inventory, smart billing, multi-branch management, and analytics dashboards for retail excellence.",
    icon: ShoppingBag,
    color: "#f97316",
    bgClass: "badge-pos",
    borderClass: "hover:border-[#f97316]/40",
    image: "/images/portfolio/retailmax.jpg"
  },
  {
    id: "education",
    title: "Education Technology",
    desc: "Adaptive learning platforms, intelligent tutoring, and student analytics powering the future of education.",
    icon: GraduationCap,
    color: "#a855f7",
    bgClass: "badge-education",
    borderClass: "hover:border-[#a855f7]/40",
    image: "/images/portfolio/edureachlms.jpg"
  },
  {
    id: "hr",
    title: "Human Resources",
    desc: "Talent acquisition AI, automated payroll, intelligent attendance tracking, and performance analytics.",
    icon: Users,
    color: "#14b8a6",
    bgClass: "badge-hr",
    borderClass: "hover:border-[#14b8a6]/40",
    image: "/images/services/human-resources-hero.jpg"
  },
  {
    id: "custom",
    title: "Custom AI Solutions",
    desc: "Bespoke ML models, NLP pipelines, computer vision systems, and end-to-end AI consulting for any domain.",
    icon: Cpu,
    color: "#f59e0b",
    bgClass: "badge-custom",
    borderClass: "hover:border-[#f59e0b]/40",
    image: "/images/blog/enterprise-ai-roi.jpg"
  }
];

export default function Solutions() {
  return (
    <section className="bg-transparent py-24 relative overflow-hidden" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold text-[#e8f0fe] mb-4"
          >
            AI Solutions for <span className="gradient-text">Every Industry</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#94a3b8] text-lg max-w-2xl mx-auto"
          >
            Six specialized AI domains, each purpose-built to solve your industry's most pressing challenges with measurable results.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/services/${domain.id}`} className="group block h-full">
                  <div className={`glass-card h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${domain.borderClass} hover:-translate-y-2`}>
                    
                    {/* Image Area */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image 
                        src={domain.image} 
                        alt={domain.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#070d24]/60 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1535] via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#070d24]/80 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
                        <Icon size={20} color={domain.color} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow relative">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                           style={{ background: `radial-gradient(circle at center, ${domain.color} 0%, transparent 70%)` }}>
                      </div>
                      
                      <h3 className="font-display font-bold text-xl text-[#e8f0fe] mb-3 group-hover:text-white transition-colors">
                        {domain.title}
                      </h3>
                      <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 flex-grow">
                        {domain.desc}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-auto" style={{ color: domain.color }}>
                        <span className="text-sm font-bold uppercase tracking-wider">Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Bottom Border Accent */}
                    <div className="h-1 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ backgroundColor: domain.color }}></div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

