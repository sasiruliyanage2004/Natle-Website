"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  ArrowUpRight, 
  Cpu, 
  Leaf, 
  HeartHandshake
} from "lucide-react";
import Link from "next/link";

const jobs = [
  {
    title: "Senior Embedded Firmware Engineer",
    department: "Hardware & IoT",
    location: "Colombo, Sri Lanka / Remote",
    type: "Full-Time",
    snippet: "Design ultra-low-power C/C++ firmware for solar-powered LoRaWAN soil moisture and environmental sensor nodes.",
  },
  {
    title: "Full-Stack Software Architect (Next.js / Go)",
    department: "Cloud Platform",
    location: "Colombo, Sri Lanka / Hybrid",
    type: "Full-Time",
    snippet: "Build high-throughput real-time telemetry pipelines and responsive farmer-facing dashboards for NATLE FieldOS™.",
  },
  {
    title: "AI Solutions Architect (Healthcare & Enterprise)",
    department: "Enterprise Solutions",
    location: "Colombo 05, Sri Lanka / Hybrid",
    type: "Full-Time",
    snippet: "Design and deploy clinical diagnostic vision pipelines, PACS/EHR integrations, and multi-branch retail POS machine learning models.",
  },
  {
    title: "Computer Vision / AI Engineer",
    department: "Applied ML Lab",
    location: "Colombo, Sri Lanka / Remote",
    type: "Full-Time",
    snippet: "Develop convolutional neural networks, PACS lesion detection, and satellite crop NDVI anomaly models using PyTorch.",
  },
];

const perks = [
  {
    icon: Cpu,
    title: "Cutting-Edge Tech Stack",
    description: "Work with PyTorch, CUDA, FHIR healthcare standards, LoRaWAN mesh networks, and high-performance distributed cloud software.",
  },
  {
    icon: Leaf,
    title: "Tangible Global Impact",
    description: "Every line of code directly reduces clinical diagnostic miss rates, saves water across 50,000 hectares, or scales enterprise productivity.",
  },
  {
    icon: HeartHandshake,
    title: "Competitive Equity & Growth",
    description: "Generous compensation, enterprise hardware allowances, and direct mentorship from industry veterans.",
  },
];

export default function CareersPage() {
  return (
    <main className="">
            
      <div >
        
        {/* Hero Header */}
        <section >
          <div >
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              
            >
              <Briefcase  />
              <span>Join the Engineering Movement</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              
            >
              Build the Technology that{" "}
              <span >
                Feeds the World.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              
            >
              We are a passionate team of software architects, hardware hackers, and soil scientists building the next generation of autonomous precision farming.
            </motion.p>
          </div>
        </section>

        {/* Perks Grid */}
        <section >
          <div >
            {perks.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div 
                  key={p.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                  
                >
                  <div >
                    <Icon  />
                  </div>
                  <h3 >{p.title}</h3>
                  <p >{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Open Positions Grid */}
        <section >
          <div >
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              
            >
              Opportunities
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              
            >
              Open Engineering &amp; Agri Roles
            </motion.h2>
          </div>

          <div >
            {jobs.map((job, i) => (
              <motion.div 
                key={job.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
                
              >
                <div>
                  <div >
                    <span >
                      {job.department}
                    </span>
                    <span >
                      {job.type}
                    </span>
                  </div>
                  <h3 >{job.title}</h3>
                  <p >
                    <MapPin  />
                    {job.location}
                  </p>
                  <p >{job.snippet}</p>
                </div>

                <Link
                  href="/contact"
                  
                >
                  <span>Apply For Role</span>
                  <ArrowUpRight  />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

              </div>
    </main>
  );
}
