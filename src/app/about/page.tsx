"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Target, 
  Globe, 
  CheckCircle2, 
  ShieldCheck, 
  Brain, 
  Users, 
  Zap, 
  Heart,
  Award
} from "lucide-react";

export const milestones = [
  {
    year: "2024 Q1",
    title: "Clinical Diagnostic AI Breakthrough",
    description: "Architected clinical diagnostic vision AI integrated with hospital PACS/EHR infrastructure, slashing radiological miss rates by 34%.",
  },
  {
    year: "2024 Q3",
    title: "AgriTech & Edge IoT Telemetry",
    description: "Deployed FieldOS™ multi-depth LoRaWAN sensor networks and computer vision crop stress models across 50,000 hectares.",
  },
  {
    year: "2025",
    title: "RetailMax & EduReach Scale",
    description: "Scaled intelligent POS suites across 60 retail branches and powered adaptive learning architectures for 200,000+ students in 12 nations.",
  },
  {
    year: "2026-2027",
    title: "Global Acceleration & Enterprise Mesh",
    description: "Executing $100M global acceleration roadmap, expanding Singapore and Malaysia operations, and achieving full SOC 2, HIPAA, and ISO 27001 certifications.",
  },
];

export const executiveBoard = [
  {
    name: "Prof. Henrik von Scheel",
    role: "Strategic Advisor",
    tag: "Originator of Industry 4.0",
    bio: "Globally recognized as the originator of Industry 4.0 and a leading authority on digital transformation and industrial AI. Prof. Henrik brings decades of strategic leadership to guide NATLE's global enterprise trajectory.",
    linkedin: "https://www.linkedin.com/in/vonscheel/",
    initials: "HvS",
    highlight: true,
  },
  {
    name: "Shamilar Shammi",
    role: "Chairman",
    tag: "Executive Board",
    bio: "Visionary entrepreneur and business strategist driving NATLE's mission to democratize enterprise AI across emerging and global markets, with deep expertise in sustainable innovation and technological leadership.",
    linkedin: "https://www.linkedin.com/in/shamilar-shammi-4820b883/",
    initials: "SS",
    highlight: false,
  },
  {
    name: "Rajkumar Kuvadas",
    role: "Vice Chairman",
    tag: "Executive Board",
    bio: "Distinguished technology leader championing NATLE's operational excellence, governance, and institutional growth across multi-industry AI software verticals.",
    linkedin: "https://www.linkedin.com/in/rajkumar-kuvadas-8118b440b/",
    initials: "RK",
    highlight: false,
  },
  {
    name: "Sasiru Liyanage",
    role: "Founder & Chief Architect",
    tag: "Architecture & Systems",
    bio: "Pioneering the synthesis of deep neural architectures, distributed edge telemetry, and enterprise-grade cloud ecosystems to solve mission-critical industry challenges.",
    linkedin: "https://www.linkedin.com/company/natletech",
    initials: "SL",
    highlight: false,
  },
];

export const coreTeam = [
  {
    name: "Dilan Kanushka",
    role: "Head of Business Development",
    specialty: "Enterprise Partnerships & Strategy",
    initials: "DK",
  },
  {
    name: "Dileepa Haripriya",
    role: "Solution Architect",
    specialty: "Distributed Systems & Cloud AI",
    initials: "DH",
  },
  {
    name: "Kokila Wanigasundara",
    role: "Senior Manager — QA",
    specialty: "Test Automation & Compliance",
    initials: "KW",
  },
  {
    name: "Tharushi Fernando",
    role: "Software Engineer",
    specialty: "Full-Stack AI & Neural Workflows",
    initials: "TF",
  },
];

export const operatingPrinciples = [
  {
    title: "Innovation First",
    desc: "We build AI at the foundational layer — developing custom neural pipelines rather than wrapping off-the-shelf APIs.",
    icon: Zap,
  },
  {
    title: "Trust & Absolute Security",
    desc: "Every line of code and model pipeline strictly adheres to SOC 2, HIPAA, GDPR, and ISO 27001 zero-trust cryptographic standards.",
    icon: ShieldCheck,
  },
  {
    title: "Client Partnership",
    desc: "We do not sell boxed software; we engineer bespoke production systems as dedicated long-term co-architects.",
    icon: Users,
  },
  {
    title: "Global Scalability",
    desc: "Architectures designed from day one to handle high-frequency transactions, multi-region clusters, and microsecond latency.",
    icon: Globe,
  },
  {
    title: "Execution Excellence",
    desc: "Rapid deployment sprints that take models from concept to audited clinical/industrial production in under 90 days.",
    icon: Target,
  },
  {
    title: "Human-Centered Intelligence",
    desc: "AI engineered to empower clinicians, agronomists, retailers, and educators — amplifying human judgment rather than replacing it.",
    icon: Heart,
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300 select-none">
      <SmoothCursor />
      <BeamsBackground intensity="subtle" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-[#10E599] shadow-xs mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#059669] dark:text-[#10E599]" />
              <span>Democratizing Enterprise Intelligence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]"
            >
              We Build the AI That{" "}
              <span className="gradient-text">
                Moves Industries.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-xl text-slate-600 dark:text-emerald-100/70 font-normal leading-relaxed max-w-3xl mx-auto"
            >
              Founded in 2024, <strong>NATLE</strong> was born from a fundamental belief: Enterprise AI should be practical, accessible, and high-impact for core real-world industries — not confined to Big Tech laboratories.
            </motion.p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55 }}
              className="glass-card rounded-3xl p-8 md:p-10 shadow-xl flex flex-col justify-between border border-emerald-500/20 dark:border-emerald-500/20"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#059669] dark:text-[#10E599] border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Our Mission</h2>
                <p className="mt-4 text-base text-slate-600 dark:text-emerald-100/70 leading-relaxed">
                  To democratize enterprise-grade AI by delivering actionable, mission-critical intelligent technology across Healthcare, Agriculture, Retail, Education, Human Resources, and Custom ML workflows.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center gap-4 text-xs font-mono font-bold text-[#059669] dark:text-[#10E599]">
                <span>PRACTICAL AI</span> &bull; <span>MEASURABLE ROI</span> &bull; <span>ZERO FLUFF</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="glass-card rounded-3xl p-8 md:p-10 shadow-xl flex flex-col justify-between border border-cyan-500/20 dark:border-cyan-500/20"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Our Vision</h2>
                <p className="mt-4 text-base text-slate-600 dark:text-emerald-100/70 leading-relaxed">
                  A world where every enterprise — from a regional diagnostic hospital to a 50,000-hectare agricultural network — has access to AI systems as reliable as electricity and as transformative as the internet.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center gap-4 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                <span>GLOBAL REACH</span> &bull; <span>INDUSTRY 4.0</span> &bull; <span>2027 ACCELERATION</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Corporate Narrative */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl space-y-6 text-slate-700 dark:text-zinc-300 text-lg leading-relaxed">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#059669] dark:text-[#10E599]">
              <Brain className="w-4 h-4" />
              <span>From Vision to Global Impact</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              The Genesis of NATLE Intelligence
            </h3>
            <p>
              NATLE was founded in 2024 by a coalition of software architects and domain researchers who recognized a critical industry bottleneck: the most potent AI advancements remained trapped behind enterprise licensing walls and research labs, out of reach for vital operational industries.
            </p>
            <p>
              We initiated our first engagement in clinical healthcare — engineering a diagnostic computer vision platform for a hospital group. Within twelve months, the system reduced diagnostic imaging miss rates by <strong>34%</strong> and saved <strong>$2.4M annually</strong>. That clinical validation proved our core thesis: customized, vertically integrated AI generates exponential value.
            </p>
            <p>
              From clinical diagnostics, we engineered solutions across Agriculture AI (FieldOS™ managing 50,000 hectares), Point of Sales (60-store RetailMax chain), EdTech (EduReach serving 200,000+ students), HR Tech, and custom deep learning workflows. By 2027, NATLE is executing a <strong>$100M global expansion</strong> across Southeast Asia, Europe, and the Middle East.
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">
              Headquartered in Colombo 05, Sri Lanka, NATLE combines world-class software engineering with rigorous SOC 2, HIPAA, and GDPR compliance to serve clients globally.
            </p>
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-widest">
              Execution Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
              Milestones &amp; Evolution
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <motion.div 
                key={m.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-card rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-emerald-500/50 flex flex-col justify-between transition-all"
              >
                <div>
                  <span className="text-2xl font-black text-[#059669] dark:text-[#10E599] font-mono">{m.year}</span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-2">{m.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-emerald-100/70 mt-2 leading-relaxed">{m.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center gap-2 text-[11px] font-bold text-[#059669] dark:text-[#10E599]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Executive Leadership & Strategic Advisory */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-widest">
              Governance &amp; Strategy
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
              Leadership &amp; Strategic Advisory Board
            </h2>
            <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2">
              Guided by seasoned executives and the originator of Industry 4.0 to drive sustainable global scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {executiveBoard.map((member, i) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`glass-card rounded-3xl p-8 shadow-xl flex flex-col justify-between transition-all ${
                  member.highlight ? "border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-950/20 via-transparent to-transparent" : "border border-white/10"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#059669] to-[#10E599] text-slate-950 flex items-center justify-center text-xl font-black shadow-md shrink-0">
                        {member.initials}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">{member.name}</h3>
                        <p className="text-xs font-bold text-[#059669] dark:text-[#10E599] mt-0.5">{member.role}</p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded mt-1">
                          <Award className="w-3 h-3" />
                          {member.tag}
                        </span>
                      </div>
                    </div>
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 transition-colors shrink-0"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-zinc-300 mt-4 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Engineering Leadership */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-widest">
              Engineering &amp; Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Core Technical Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreTeam.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 text-center border border-white/10 hover:border-emerald-500/40 transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-200 dark:bg-zinc-800 text-[#059669] dark:text-[#10E599] flex items-center justify-center font-bold text-lg">
                  {member.initials}
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-xs font-semibold text-[#059669] dark:text-[#10E599] mt-0.5">{member.role}</p>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-2">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Operating Principles */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10E599] uppercase tracking-widest">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
              What We Stand For
            </h2>
            <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2">
              The operational standards governing every model architecture, deployment sprint, and enterprise SLA.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {operatingPrinciples.map((op, i) => {
              const Icon = op.icon;
              return (
                <div key={op.title} className="glass-card rounded-2xl p-7 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 text-[#059669] dark:text-[#10E599]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{op.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{op.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <CTAFooter />
      </div>
    </main>
  );
}
