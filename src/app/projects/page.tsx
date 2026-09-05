"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  ArrowUpRight,
  Activity,
  Sprout,
  ShoppingBag,
  GraduationCap,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import CardPattern from "@/components/common/CardPattern";

const caseStudies = [
  {
    id: "healthfirst",
    domain: "Healthcare",
    title: "Diagnostic Vision AI for HealthFirst Hospital",
    client: "HealthFirst Hospital Group",
    summary: "Engineered and deployed a high-precision computer vision diagnostic system deeply integrated with the hospital's existing PACS and FHIR-compliant EHR infrastructure, dramatically augmenting radiological review throughput.",
    metrics: [
      { label: "Fewer Diagnostic Errors", value: "34%" },
      { label: "Faster Image Review", value: "2x" },
      { label: "Annual Clinical Savings", value: "$2.4M" },
    ],
    techStack: ["TensorFlow", "Python", "FHIR / HL7", "React", "Node.js", "Docker"],
    badgeColor: "border-sky-200 text-sky-700 bg-sky-50",
    accentGlow: "rgba(14, 165, 233, 0.15)",
    icon: Activity,
  },
  {
    id: "greenfield",
    domain: "Agriculture",
    title: "Smart Crop Intelligence Platform (FieldOS™)",
    client: "GreenField Agri Corp",
    summary: "Architected a multi-sensor LoRaWAN IoT mesh and edge computer vision intelligence platform delivering real-time soil chemistry, canopy temperature, and predictive harvest modeling across 50,000 hectares.",
    metrics: [
      { label: "Prediction Accuracy", value: "91%" },
      { label: "Water Savings", value: "28%" },
      { label: "Input Cost Reduction", value: "18%" },
    ],
    techStack: ["PyTorch", "AWS IoT Core", "PostgreSQL", "Next.js", "Python", "LoRaWAN"],
    badgeColor: "border-emerald-200 text-emerald-700 bg-emerald-50",
    accentGlow: "rgba(16, 229, 153, 0.15)",
    icon: Sprout,
  },
  {
    id: "retailmax",
    domain: "Retail / POS",
    title: "Multi-Branch POS Intelligence Suite",
    client: "RetailMax Chain",
    summary: "Engineered an end-to-end AI-powered smart Point of Sale and autonomous inventory replenishment engine deployed across 60 retail branches with sub-second barcode indexing and shrinkage detection.",
    metrics: [
      { label: "Waste Reduction", value: "41%" },
      { label: "Faster Checkout Speed", value: "3x" },
      { label: "Uptime SLA", value: "99.9%" },
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "TensorFlow Lite", "Electron", "Redis"],
    badgeColor: "border-orange-200 text-orange-700 bg-orange-50",
    accentGlow: "rgba(249, 115, 22, 0.15)",
    icon: ShoppingBag,
  },
  {
    id: "edureach",
    domain: "Education",
    title: "Adaptive Learning Platform for EduReach",
    client: "EduReach Global",
    summary: "Built an intelligent adaptive LMS featuring dynamic cognitive difficulty calibration and real-time student sentiment modeling serving over 200,000 active learners across 12 countries.",
    metrics: [
      { label: "Retention Increase", value: "+22%" },
      { label: "Faster Skill Acquisition", value: "40%" },
      { label: "Student NPS Rating", value: "4.8/5" },
    ],
    techStack: ["Next.js", "FastAPI", "MongoDB", "PyTorch", "WebRTC", "Tailwind CSS"],
    badgeColor: "border-purple-200 text-purple-700 bg-purple-50",
    accentGlow: "rgba(168, 85, 247, 0.15)",
    icon: GraduationCap,
  },
];

const categories = ["All", "Healthcare", "Agriculture", "Retail / POS", "Education"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? caseStudies
    : caseStudies.filter(p => p.domain === selectedCategory);

  return (
    <main className="">
            
      <div >
        
        {/* Hero Header */}
        <section >
          <div >
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              
              style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.25)", color: "#0369a1" }}
            >
              <Building2  />
              <span>Real AI &bull; Measurable Production Results</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              
              style={{ color: "#0a1628" }}
            >
              Enterprise Case Studies That{" "}
              <span >
                Deliver Quantified ROI.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              
              style={{ color: "#475569" }}
            >
              Explore how NATLE deploys bespoke deep learning pipelines, edge telemetry meshes, and high-concurrency cloud systems to solve industry bottlenecks with audited commercial returns.
            </motion.p>

            {/* Filter Pills */}
            <div >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "clay-btn"
                      : "bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#0ea5e9]"
                  }`}
                  style={{
                    color: selectedCategory === cat ? "#0ea5e9" : "#64748b"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section >
          <div >
            {filteredProjects.map((study, i) => {
              const Icon = study.icon;
              return (
                <motion.div 
                  key={study.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  
                >
                  <CardPattern pattern="circuit" glowColor={study.accentGlow} />

                  <div >
                    <div >
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border`} style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.25)", color: "#0369a1" }}>
                        {study.domain}
                      </span>
                      <span >
                        {study.client}
                      </span>
                    </div>

                    <div >
                      <div  style={{ color: "#0ea5e9" }}>
                        <Icon  />
                      </div>
                      <h3 >
                        {study.title}
                      </h3>
                    </div>

                    <p >
                      {study.summary}
                    </p>

                    {/* Metrics Grid */}
                    <div >
                      {study.metrics.map((m, mi) => (
                        <div key={mi} >
                          <p  style={{ color: "#0ea5e9" }}>{m.value}</p>
                          <p >{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div >
                      {study.techStack.map((tech) => (
                        <span key={tech} >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div >
                    <span  style={{ color: "#0ea5e9" }}>
                      <CheckCircle2  />
                      Audited Production Deployment
                    </span>
                    <Link 
                      href="/contact" 
                      
                    >
                      <span>Inquire Blueprint</span>
                      <ArrowUpRight  />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

              </div>
    </main>
  );
}
