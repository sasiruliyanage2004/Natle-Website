"use client";

import React from "react";
import { motion } from "framer-motion";

const technologies = [
  "TensorFlow", "PyTorch", "OpenAI", "Anthropic", "Azure AI", 
  "AWS SageMaker", "React Native", "Next.js", "Docker", "Kubernetes",
  "HIPAA", "SOC 2 Type II", "GDPR", "ISO 27001", "HL7 FHIR"
];

export default function AgentaMarquee() {
  return (
    <div className="w-full bg-[#f8faff] border-y border-[#e2e8f0] py-6 overflow-hidden flex items-center relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f8faff] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f8faff] to-transparent z-10"></div>
      
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="flex whitespace-nowrap gap-12 px-6 items-center"
      >
        {[...technologies, ...technologies, ...technologies].map((tech, i) => (
          <span key={i} className="text-sm font-mono font-bold tracking-wider uppercase" style={{ color: "#94a3b8" }}>
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

