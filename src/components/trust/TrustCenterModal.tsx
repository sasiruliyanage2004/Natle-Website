"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  FileText, 
  CheckCircle2, 
  X, 
  Download, 
  ExternalLink,
  Cpu,
  Fingerprint,
  Activity
} from "lucide-react";

interface TrustModalContextType {
  isOpen: boolean;
  activeStandard: string;
  openTrustCenter: (standard?: string) => void;
  closeTrustCenter: () => void;
}

const TrustModalContext = createContext<TrustModalContextType>({
  isOpen: false,
  activeStandard: "soc2",
  openTrustCenter: () => {},
  closeTrustCenter: () => {},
});

export const useTrustCenter = () => useContext(TrustModalContext);

const COMPLIANCE_STANDARDS = [
  {
    id: "soc2",
    name: "SOC 2 Type II",
    shortTitle: "Security & Confidentiality",
    badge: "AICPA SOC 2 Certified",
    icon: ShieldCheck,
    color: "#0ea5e9",
    summary: "Audited by leading independent CPA firms for Trust Services Criteria (Security, Availability, Processing Integrity, Confidentiality).",
    lastAudited: "Q3 2026",
    auditor: "Coalfire Systems Inc.",
    specs: [
      { label: "Encryption at Rest", value: "AES-256-GCM via AWS KMS Hardware Enclaves" },
      { label: "Encryption in Transit", value: "TLS 1.3 with Perfect Forward Secrecy (PFS)" },
      { label: "Access Control", value: "Zero-Trust RBAC with Hardware FIDO2 2FA" },
      { label: "Continuous Auditing", value: "Automated telemetry feeds into continuous SOC 2 monitor" },
    ],
    features: [
      "Annual penetration testing by independent CREST-accredited red teams",
      "Real-time immutable write-once-read-many (WORM) audit logging",
      "Automated secret rotation and short-lived ephemeral credential grants",
      "Daily disaster recovery failover drill with sub-15 minute RTO and RPO",
    ],
  },
  {
    id: "hipaa",
    name: "HIPAA Security Rule",
    shortTitle: "Clinical Health Data Security",
    badge: "HIPAA BAA Eligible",
    icon: Activity,
    color: "#10b981",
    summary: "Architected to process Protected Health Information (PHI) and DICOM medical imaging under strict Business Associate Agreement (BAA) covenants.",
    lastAudited: "Continuous 2026",
    auditor: "MedSec Health Assurance",
    specs: [
      { label: "PHI De-Identification", value: "Automated Safe Harbor / Expert Determination pipelines" },
      { label: "Audit Trails", value: "DICOM & FHIR Level 4 granular access logging" },
      { label: "BAA Guarantees", value: "Standard enterprise BAA execution for healthcare systems" },
      { label: "Storage Segregation", value: "Dedicated VPCs and isolated physical compute clusters" },
    ],
    features: [
      "Zero persistent local caching of clinical radiology scans on client nodes",
      "End-to-end encrypted FHIR R4 & HL7 integration gateways",
      "Role-based privilege separation for clinical researchers and radiologists",
      "Guaranteed air-gapped deployment option for defense and hospital networks",
    ],
  },
  {
    id: "iso27001",
    name: "ISO/IEC 27001:2022",
    shortTitle: "Information Security Management",
    badge: "ISO 27001 Certified ISMS",
    icon: Lock,
    color: "#8b5cf6",
    summary: "Internationally standardized framework governing risk assessment, threat intelligence, personnel security, and physical infrastructure security.",
    lastAudited: "May 2026",
    auditor: "BSI Group International",
    specs: [
      { label: "ISMS Framework", value: "ISO/IEC 27001:2022 Stage 2 Certified" },
      { label: "Threat Intel", value: "Automated SIEM & MITRE ATT&CK alignment" },
      { label: "Vulnerability SLA", value: "Critical CVE patching guaranteed within 24 hours" },
      { label: "Physical Security", value: "SOC 1/2/3 certified Tier-IV data center facilities" },
    ],
    features: [
      "Comprehensive vendor risk management & software supply chain attestation",
      "Cryptographic provenance verification on all trained neural model weights",
      "Documented incident response plan with 30-minute maximum initial response SLA",
      "Annual employee background checks and certified security engineering training",
    ],
  },
  {
    id: "sovereign",
    name: "Air-Gapped Sovereign AI",
    shortTitle: "Hardware-Enclave Privacy",
    badge: "100% Data Sovereignty",
    icon: Server,
    color: "#f59e0b",
    summary: "Enterprise AI runtimes capable of zero external internet dependency. Neural inference runs strictly within customer-owned sovereign hardware enclaves.",
    lastAudited: "Production Verified",
    auditor: "Sovereign Cloud Advisory",
    specs: [
      { label: "Telemetry Leakage", value: "0 bytes transmitted externally (Fully Air-Gapped)" },
      { label: "Model Ownership", value: "Customer retains 100% proprietary ownership of weights & data" },
      { label: "Hardware Support", value: "NVIDIA H100 / L40S on-prem & Apple Silicon Edge" },
      { label: "Runtime Isolation", value: "gVisor sandboxing & AMD SEV-SNP secure memory" },
    ],
    features: [
      "Zero telemetry sent back to public LLM API providers or foundation labs",
      "Full local retrieval-augmented generation (RAG) on customer premise",
      "Deployable on sovereign clouds, government tenancies, or local server racks",
      "Cryptographically tamper-proof model weight checkpoints",
    ],
  },
];

export function TrustCenterProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStandard, setActiveStandard] = useState("soc2");

  const openTrustCenter = (standard = "soc2") => {
    setActiveStandard(standard);
    setIsOpen(true);
  };

  const closeTrustCenter = () => setIsOpen(false);

  const current = COMPLIANCE_STANDARDS.find((s) => s.id === activeStandard) || COMPLIANCE_STANDARDS[0];

  return (
    <TrustModalContext.Provider value={{ isOpen, activeStandard, openTrustCenter, closeTrustCenter }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTrustCenter}
              className="fixed inset-0 bg-[#0a1628]/60 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl rounded-3xl bg-white text-[#0a1628] shadow-[0_25px_70px_-15px_rgba(10,22,60,0.3)] border border-slate-200/80 overflow-hidden z-10 my-8"
            >
              {/* Top Accent Gradient Bar */}
              <div 
                className="h-1.5 w-full"
                style={{ background: `linear-gradient(90deg, #0ea5e9, ${current.color}, #10E599)` }}
              />

              {/* Header */}
              <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3.5">
                  <div 
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm border border-slate-200/60"
                    style={{ background: `${current.color}15`, color: current.color }}
                  >
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-[#0a1628]">
                        Enterprise Trust &amp; Compliance Center
                      </h2>
                      <span className="hidden sm:inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-800">
                        AUDITED &bull; PRODUCTION VERIFIED
                      </span>
                    </div>
                    <p className="text-xs text-[#64748b] mt-0.5">
                      Independent institutional compliance reports &bull; Air-Gapped Sovereign AI guarantees
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeTrustCenter}
                  aria-label="Close modal"
                  className="rounded-full p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex overflow-x-auto border-b border-slate-100 px-6 sm:px-8 bg-white gap-2 scrollbar-none">
                {COMPLIANCE_STANDARDS.map((std) => {
                  const isActive = std.id === activeStandard;
                  const TabIcon = std.icon;
                  return (
                    <button
                      key={std.id}
                      onClick={() => setActiveStandard(std.id)}
                      className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                        isActive
                          ? "border-[#0ea5e9] text-[#0ea5e9]"
                          : "border-transparent text-[#64748b] hover:text-[#0a1628]"
                      }`}
                    >
                      <TabIcon className="w-4 h-4" />
                      <span>{std.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Standard Overview Banner */}
                <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span 
                      className="inline-flex rounded-md px-2.5 py-0.5 text-[11px] font-mono font-bold"
                      style={{ background: `${current.color}15`, color: current.color }}
                    >
                      {current.badge}
                    </span>
                    <h3 className="text-lg font-black text-[#0a1628]">
                      {current.name} — {current.shortTitle}
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed max-w-xl">
                      {current.summary}
                    </p>
                  </div>

                  <div className="text-xs text-right shrink-0 font-mono space-y-1 sm:border-l border-slate-200 sm:pl-5 text-left">
                    <div className="text-[#64748b]">Last Validated: <span className="font-bold text-[#0a1628]">{current.lastAudited}</span></div>
                    <div className="text-[#64748b]">Audited By: <span className="font-bold text-[#0a1628]">{current.auditor}</span></div>
                  </div>
                </div>

                {/* Cryptographic Architecture Specs Grid */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b] mb-3 flex items-center gap-1.5">
                    <Fingerprint className="w-3.5 h-3.5 text-[#0ea5e9]" />
                    <span>Cryptographic &amp; Infrastructure Specifications</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {current.specs.map((spec) => (
                      <div 
                        key={spec.label} 
                        className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-sm space-y-1"
                      >
                        <span className="text-[11px] font-semibold text-[#64748b]">{spec.label}</span>
                        <div className="text-xs font-bold text-[#0a1628] font-mono">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audited Security Controls */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b] mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Enforced Controls &amp; Protocol Guarantees</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#475569]">
                    {current.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer / CTA Bar */}
              <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#64748b]">
                  <FileText className="w-4 h-4 text-[#0ea5e9]" />
                  <span>Full Security Package &bull; NDA Required for Raw Penetration Logs</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="mailto:security@natle.com?subject=Request%20Enterprise%20Security%20Packet"
                    className="clay-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#0a1628] w-full sm:w-auto transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Security Brief (PDF)</span>
                  </a>

                  <a
                    href="/contact"
                    onClick={closeTrustCenter}
                    className="gradient-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white w-full sm:w-auto transition-all"
                  >
                    <span>Request BAA / SOC 2 Report</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </TrustModalContext.Provider>
  );
}
