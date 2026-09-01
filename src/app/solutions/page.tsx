import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import KineticFluidMesh from "@/components/animations/KineticFluidMesh";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { 
  Cpu, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight,
  Layers,
  Sparkles,
  Zap,
  Activity,
  Globe2,
  Lock
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Solutions & Architecture | NATLE",
  description: "Explore the NATLE Software Ecosystem: FieldOS™ Autonomous Management, YieldAI™ Harvest Predictor, and TraceLink™ Blockchain Export Verification.",
};

const solutions = [
  {
    id: "field-os",
    name: "NATLE FieldOS™",
    tagline: "Autonomous Farm & Greenhouse Operating System",
    badge: "Core Enterprise Platform",
    description: "FieldOS™ unifies all hardware sensors, solenoid valves, fertilizer dosers, and environmental controllers into a single real-time spatial digital twin of your agricultural estate.",
    features: [
      "Dynamic 2D/3D Estate Field Mapping with Live Sub-Zone Heatmaps",
      "Automated Threshold-Based Closed-Loop Irrigation & Fertigation",
      "Cellular & Satellite Offline-First Edge Sync for Remote Plantations",
      "Role-Based Access Control for Agronomists, Estate Managers & Owners",
    ],
    metric: "40% Less Water & Fertilizer Waste",
    techStack: ["Next.js 15", "TypeScript", "Tailwind v4", "WebSockets", "TimescaleDB"],
  },
  {
    id: "yield-ai",
    name: "NATLE YieldAI™",
    tagline: "Predictive Machine Learning Crop Harvest Predictor",
    badge: "Artificial Intelligence",
    description: "Trained on over 10 million hours of microclimate, soil moisture, and spectral canopy data from Sri Lanka and Europe to forecast weekly harvest yield with 94.2% accuracy.",
    features: [
      "Real-time Crop Biomass & Harvest Date Prediction Curve",
      "Automated Early Fungal & Pest Anomaly Detection via Vision AI",
      "Dynamic Weather Forecast Integration for Pre-Rain Drainage Trigger",
      "Energy & Nutrients Optimization Model based on Market Prices",
    ],
    metric: "+28.4% Average Yield Growth",
    techStack: ["PyTorch", "Python SDK", "Multispectral Computer Vision", "Cloud Edge"],
  },
  {
    id: "tracelink",
    name: "NATLE TraceLink™",
    tagline: "Blockchain & QR-Code Export Compliance Verification",
    badge: "Export Security & Compliance",
    description: "TraceLink™ generates tamper-proof digital passports for every export container of Ceylon cocopeat or commercial crops, embedding complete sensor logs from harvest to port.",
    features: [
      "Instant Buyer-Facing QR Code on Every Substrate Growbag & Pallet",
      "Immutable Farm-to-Port Sensor Telemetry & Chemical Audit Log",
      "Automatic GlobalG.A.P, OMRI & ISO Export Certificate Generation",
      "Live Reefer Container Temperature & Humidity Telemetry Tracking",
    ],
    metric: "100% Export Audit Pass Rate",
    techStack: ["Cryptographic Proofs", "GlobalG.A.P APIs", "Smart Contracts", "REST"],
  },
];

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300">
      <KineticFluidMesh />
      <BeamsBackground intensity="subtle" className="absolute inset-0 z-0 pointer-events-none" />
      <SmoothCursor />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-gradient-to-b from-slate-50 via-white to-white dark:bg-[#050505] dark:from-[#050505] dark:via-[#050505] dark:to-[#050505] border-b border-slate-100 dark:border-emerald-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-[#10E599] shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-[#10E599]" />
              <span>Next-Gen Software Suite</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] dark:text-white tracking-tight leading-[1.05]">
              Intelligent Software for{" "}
              <span className="bg-gradient-to-r from-[#0066FF] via-[#00C0F0] to-[#10B981] bg-clip-text text-transparent">
                Every Harvest Stage.
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 dark:text-emerald-200/70 font-normal leading-relaxed max-w-3xl mx-auto">
              Our trio of proprietary cloud solutions — <strong>FieldOS™</strong>, <strong>YieldAI™</strong>, and <strong>TraceLink™</strong> — turn raw estate telemetry into autonomous, high-yield commercial farming.
            </p>
          </div>
        </section>

        {/* Solutions Deep Dive */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {solutions.map((sol, index) => (
              <div 
                key={sol.id} 
                id={sol.id}
                className="rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#0a140a]/90 p-8 md:p-12 shadow-2xl overflow-hidden relative z-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  
                  {/* Left Column: Solution Detail */}
                  <div className="lg:col-span-7">
                    <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-emerald-950/50 border border-blue-200 dark:border-emerald-800/40 text-xs font-mono font-bold text-blue-700 dark:text-[#10E599] uppercase">
                      {sol.badge}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-4">{sol.name}</h2>
                    <p className="text-base font-bold text-[#0066FF] dark:text-[#10E599] mt-1">{sol.tagline}</p>
                    <p className="mt-4 text-base text-slate-600 dark:text-emerald-200/70 leading-relaxed">{sol.description}</p>

                    <div className="mt-8 space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-emerald-300/60">Architectural Highlights</h4>
                      {sol.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-emerald-50">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#10E599] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-emerald-900/30">
                      {sol.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-emerald-950/40 text-[11px] font-mono text-slate-600 dark:text-emerald-200/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Performance Badge & CTA */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 dark:from-[#080d08] dark:to-[#050505] p-8 rounded-3xl text-white shadow-2xl border border-slate-800 dark:border-emerald-900/40 flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 dark:text-[#10E599]">Measured Impact</span>
                      <p className="text-4xl font-black text-white mt-2">{sol.metric}</p>
                      <p className="text-xs text-slate-400 dark:text-emerald-300/60 mt-2">Verified across commercial coconut and tea estates in Sri Lanka and Europe.</p>
                    </div>

                    <div className="mt-12 pt-6 border-t border-slate-800 dark:border-emerald-900/30">
                      <Link
                        href="/contact"
                        className="w-full gradient-btn flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-lg hover:scale-105 transition-transform"
                      >
                        <span>Schedule {sol.name} Demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        <CTAFooter />
      </div>
    </main>
  );
}

