import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { 
  Building2, 
  TrendingUp, 
  Droplets, 
  Leaf, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Projects & Case Studies | NATLE Portfolio",
  description: "Explore real-world commercial case studies where NATLE and Hosma Ceylon delivered quantifiable yield increases and water savings.",
};

const caseStudies = [
  {
    title: "1,200-Acre Ceylon Coconut Estate Modernization",
    client: "Lanka Bio-Agri Commercial Plantations",
    location: "Kurunegala, Sri Lanka (Coconut Triangle)",
    solution: "NATLE FieldOS™ + LoRaWAN Soil Moisture Mesh",
    metrics: [
      { label: "Yield Increase", value: "+28.4%" },
      { label: "Irrigation Savings", value: "34.5%" },
      { label: "Sensor Nodes", value: "148 Probes" },
    ],
    summary: "Replaced manual flood irrigation with closed-loop solar-powered LoRaWAN solenoid automation, optimizing moisture levels in coconut root zones 24/7.",
  },
  {
    title: "High-Tech Berry Hydroponic Greenhouse Complex",
    client: "EuroFlora Hydroponics B.V.",
    location: "Westland, Netherlands",
    solution: "Hosma Easy-Fill Cocopeat Growbags + YieldAI™",
    metrics: [
      { label: "First-Grade Yield", value: "98.2%" },
      { label: "Substrate Salt EC", value: "< 0.4 mS/cm" },
      { label: "Root Health", value: "+42% Biomass" },
    ],
    summary: "Supplied 45 containers of custom low-EC coconut coir growbags paired with weekly YieldAI biomass predictions, outperforming synthetic rockwool substrates.",
  },
  {
    title: "Premium Ceylon Highland Tea Plantation IoT Audit",
    client: "Nuwara Eliya Tea Producers Consortium",
    location: "Central Highlands, Sri Lanka",
    solution: "NATLE TraceLink™ + Drone NDVI Mapping",
    metrics: [
      { label: "Export Pass Rate", value: "100%" },
      { label: "Pest Early Warning", value: "6 Days Earlier" },
      { label: "Export Premium", value: "+18.5%" },
    ],
    summary: "Implemented blockchain export passports for single-origin high-grown black tea, enabling European buyers to verify pesticide-free crop telemetry via QR codes.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300">
      <BeamsBackground intensity="subtle" className="absolute inset-0 z-0 pointer-events-none" />
      <SmoothCursor />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-[#10E599] shadow-sm mb-6">
              <Building2 className="w-4 h-4 text-emerald-600 dark:text-[#10E599]" />
              <span>Proven Commercial Field Deployments</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] dark:text-white tracking-tight leading-[1.05]">
              Real Plantations.{" "}
              <span className="bg-gradient-to-r from-[#0066FF] via-[#00C0F0] to-[#10B981] bg-clip-text text-transparent">
                Proven ROI.
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 dark:text-emerald-200/70 font-normal leading-relaxed max-w-3xl mx-auto">
              Discover how commercial estate owners, greenhouse operators, and international exporters utilize NATLE technology and Hosma Ceylon substrates to transform agricultural output.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <div key={i} className="rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#0a140a]/90 p-8 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all relative z-10">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#0066FF] dark:text-[#10e599] uppercase tracking-wider">
                    {study.location}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{study.title}</h3>
                  <p className="text-xs font-bold text-slate-500 dark:text-emerald-300/60 mt-1">Client: {study.client}</p>
                  <p className="text-xs text-slate-600 dark:text-emerald-200/70 mt-4 leading-relaxed font-normal">{study.summary}</p>

                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-emerald-900/30 space-y-3">
                    <h4 className="text-[10px] font-mono font-bold text-slate-400 dark:text-emerald-300/60 uppercase">Verified Results</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {study.metrics.map((m, mi) => (
                        <div key={mi} className="bg-slate-50 dark:bg-emerald-950/40 p-2.5 rounded-xl text-center border border-slate-100 dark:border-emerald-900/30">
                          <p className="text-base font-black text-emerald-600 dark:text-[#10E599] font-mono">{m.value}</p>
                          <p className="text-[9px] font-bold text-slate-500 dark:text-emerald-300/60 uppercase mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-emerald-50">{study.solution}</span>
                  <Link href="/contact" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-emerald-950/40 flex items-center justify-center text-slate-800 dark:text-emerald-50 hover:bg-[#0066FF] dark:hover:bg-[#10E599] hover:text-white dark:hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
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
