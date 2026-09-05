"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  Cpu, 
  Code2, 
  Laptop, 
  Smartphone, 
  Bot, 
  Radio, 
  Sparkles, 
  ShieldCheck,
  Globe2,
  Activity,
  ShoppingBag,
  GraduationCap,
  Users
} from "lucide-react";
import { sanitizeInput, validateEmail, sanitizeMessage } from "@/lib/security";

type InquiryDomain = "all" | "healthcare" | "agriculture" | "pos" | "edtech" | "hr" | "custom";

export default function ContactPage() {
  const [selectedDomain, setSelectedDomain] = useState<InquiryDomain>("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    platformDomain: "Healthcare AI & Clinical Diagnostics (PACS/EHR)",
    budgetRange: "$10k - $30k",
    timeline: "1 - 3 Months",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Please provide a valid enterprise email address.");
      return;
    }
    // Clean and sanitize all fields
    setFormData((prev) => ({
      ...prev,
      name: sanitizeInput(prev.name),
      email: sanitizeInput(prev.email),
      company: sanitizeInput(prev.company),
      message: sanitizeMessage(prev.message),
    }));
    setSubmitted(true);
  };

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
              <Sparkles  />
              <span>Enterprise AI Consultation &bull; Global Engineering</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              
            >
              Let&apos;s Build Your Next{" "}
              <span >
                Breakthrough AI Solution.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              
            >
              Consult directly with our solution architects and engineering leads to scope your enterprise AI platform, edge telemetry mesh, or custom neural architecture.
            </motion.p>
          </div>
        </section>

        {/* Contact Form & Office Grid */}
        <section >
          <div >
            
            {/* Left Column: Interactive Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              
            >
              <div >
                <span >
                  Architect Consultation
                </span>
                <h2 >
                  Scope Your Implementation
                </h2>
                <p >
                  Guaranteed response from a senior Solution Architect within 4 business hours.
                </p>
              </div>

              {submitted ? (
                <div >
                  <div >
                    <CheckCircle2  />
                  </div>
                  <h3 >Consultation Request Received</h3>
                  <p >
                    Thank you, <strong>{formData.name}</strong>. A NATLE Enterprise Architect has been assigned to your inquiry for <em>{formData.platformDomain}</em> and will reach out via <strong>{formData.email}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} >
                  <div >
                    <div>
                      <label >
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Eleanor Vance"
                        
                      />
                    </div>

                    <div>
                      <label >
                        Enterprise Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eleanor@healthfirst.org"
                        
                      />
                    </div>
                  </div>

                  <div>
                    <label >
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="HealthFirst Hospital Group / RetailMax Corp"
                      
                    />
                  </div>

                  <div>
                    <label >
                      Target AI Platform / Vertical
                    </label>
                    <select
                      value={formData.platformDomain}
                      onChange={(e) => setFormData({ ...formData, platformDomain: e.target.value })}
                      
                    >
                      <option>Healthcare AI &amp; Clinical Diagnostics (PACS / EHR Integration)</option>
                      <option>Agriculture AI &amp; FieldOS™ Edge Telemetry (50k+ Hectares)</option>
                      <option>Point of Sales (POS) &amp; Multi-Branch Retail Intelligence</option>
                      <option>Education Technology &amp; Adaptive Learning LMS (200k+ Students)</option>
                      <option>Human Resources &amp; Automated Payroll AI</option>
                      <option>Custom Enterprise Deep Learning Models (PyTorch / ONNX / LLM)</option>
                    </select>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label >
                      Estimated Project Budget Bracket
                    </label>
                    <div >
                      {["<$10k (Pilot)", "$10k - $30k", "$30k - $80k", "$80k+ (Enterprise)"].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: b })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            formData.budgetRange === b
                              ? "bg-emerald-500/15 border-emerald-500 text-[#0a1628]  shadow-xs"
                              : "bg-slate-50  border-[#e2e8f0] [#e2e8f0] text-[#475569] "
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label >
                      Project Goals &amp; Architecture Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your operational bottleneck, data pipelines, PACS/ERP integrations, or latency requirements..."
                      
                    />
                  </div>

                  <button
                    type="submit"
                    
                  >
                    <span>Submit Enterprise Consultation Request</span>
                    <Send  />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right Column: Global HQ & Regional Delivery Hubs */}
            <div >
              
              {/* Card 1: Colombo Global Headquarters */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55 }}
                
              >
                <div >
                  <div >
                    <Building2  />
                  </div>
                  <div>
                    <span >
                      Global Headquarters
                    </span>
                    <h3 >
                      NATLE Technologies
                    </h3>
                  </div>
                </div>

                <p >
                  Central engineering center, neural model laboratory, and primary international client delivery command.
                </p>

                <div >
                  <div >
                    <MapPin  />
                    <span >
                      No. 283 1/1, Ruwan Mawatha, Thimbirigasyaya Road, Colombo 05, Sri Lanka, 00500
                    </span>
                  </div>
                  <div >
                    <Phone  />
                    <span>+94 70 465 9847 / +94 11 250 7601</span>
                  </div>
                  <div >
                    <Mail  />
                    <span>info@natle.tech / contact@natle.tech</span>
                  </div>
                  <div >
                    <Clock  />
                    <span>Mon - Fri: 08:30 - 18:00 IST (24/7 Priority SLA)</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: International Presence & Compliance */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: 0.1 }}
                
              >
                <div >
                  <div >
                    <Globe2  />
                  </div>
                  <div>
                    <span >
                      Global Expansion
                    </span>
                    <h3 >
                      Regional Operations
                    </h3>
                  </div>
                </div>

                <p >
                  Supporting multinational clients with regional delivery desks in Singapore and Malaysia, scaling towards our $100M global acceleration roadmap.
                </p>

                <div >
                  <div >
                    <p >Singapore</p>
                    <p >APAC Business Hub</p>
                  </div>
                  <div >
                    <p >Malaysia</p>
                    <p >Regional Delivery</p>
                  </div>
                </div>

                <div >
                  <span >
                    <ShieldCheck  />
                    SOC 2 &bull; HIPAA &bull; GDPR
                  </span>
                  <span>Enterprise Security</span>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

              </div>
    </main>
  );
}
