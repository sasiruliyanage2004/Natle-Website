"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";
import NatleLogo from "@/components/common/NatleLogo";
import Link from "next/link";
import { validateEmail, sanitizeInput } from "@/lib/security";

export default function CTAFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    const sanitizedEmail = sanitizeInput(email);
    if (!validateEmail(sanitizedEmail)) {
      setStatus("error");
      setErrorMsg("Please enter a valid corporate email address.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <footer className="relative bg-[#070d24] overflow-hidden pt-24 pb-12 border-t border-[#0ea5e9]/20">
      {/* Background Aurora */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#1a3a8f]/20 to-transparent blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top CTA Section */}
        <div className="glass-card rounded-[2.5rem] p-8 md:p-16 mb-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a3a8f]/20 border border-[#1a3a8f]/40 text-[#0ea5e9] text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4" />
              Secure Enterprise Deployment
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to <span className="gradient-text">Scale with AI?</span>
            </h2>
            
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto mb-10">
              Join industry leaders who trust NATLE to transform their operations. Get a custom architecture assessment for your enterprise today.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email"
                  className="w-full bg-[#070d24]/50 border border-[#0ea5e9]/20 rounded-full py-4 pl-12 pr-4 text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#0ea5e9]/60 focus:ring-1 focus:ring-[#0ea5e9]/60 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="gradient-btn px-8 py-4 rounded-full flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
              >
                {status === "loading" ? (
                  "Processing..."
                ) : status === "success" ? (
                  "Assessment Requested ?"
                ) : (
                  <>
                    Request Assessment <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            {status === "error" && <p className="text-red-400 text-xs mt-2">{errorMsg}</p>}
            
            <div className="flex items-center justify-center gap-6 mt-8 text-[#64748b] text-xs font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#0ea5e9]" /> SOC 2 Certified</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#5aec8f]" /> HIPAA Compliant</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <NatleLogo showTagline={false} />
            <p className="mt-6 text-[#64748b] text-sm leading-relaxed">
              NATLE Technologies delivers intelligent, scalable AI solutions that transform how enterprises operate, compete, and grow.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Platforms</h4>
            <ul className="space-y-3">
              <li><Link href="/services#healthcare" className="text-[#94a3b8] hover:text-[#0ea5e9] text-sm transition-colors">Healthcare AI</Link></li>
              <li><Link href="/services#agriculture" className="text-[#94a3b8] hover:text-[#5aec8f] text-sm transition-colors">Agriculture AI</Link></li>
              <li><Link href="/services#pos" className="text-[#94a3b8] hover:text-[#f97316] text-sm transition-colors">Retail POS</Link></li>
              <li><Link href="/services#education" className="text-[#94a3b8] hover:text-[#a855f7] text-sm transition-colors">EdTech Systems</Link></li>
              <li><Link href="/services#hr" className="text-[#94a3b8] hover:text-[#14b8a6] text-sm transition-colors">HR Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[#94a3b8] hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="text-[#94a3b8] hover:text-white text-sm transition-colors">Case Studies</Link></li>
              <li><Link href="/careers" className="text-[#94a3b8] hover:text-white text-sm transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-[#94a3b8] hover:text-white text-sm transition-colors">Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact HQ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <span className="text-[#94a3b8] text-sm">Level 4, Access Towers II,<br/>Colombo 02, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                <span className="text-[#94a3b8] text-sm">+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                <span className="text-[#94a3b8] text-sm">enterprise@natle.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748b] text-xs">
            &copy; {new Date().getFullYear()} NATLE Technologies (Pvt) Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[#64748b] hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#64748b] hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

