import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { 
  Radio, 
  Cpu, 
  Leaf, 
  Plane, 
  Droplets, 
  ShieldCheck, 
  ArrowRight, 
  ArrowUpRight,
  CheckCircle2, 
  Sparkles,
  Zap 
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Services & Agronomy | NATLE Precision Agriculture",
  description: "Explore our full suite of precision IoT telemetry, closed-loop irrigation automation, and custom Ceylon cocopeat substrate formulations.",
};

interface ServiceItem {
  id: string;
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  specs: string[];
  deliverables: string[];
}

const servicesList: ServiceItem[] = [
  {
    id: "iot",
    icon: Radio,
    badge: "Hardware & Edge",
    title: "Precision Telemetry & Soil Sensing",
    description: "Multi-depth capacitive probes measuring root-zone moisture, electrical conductivity (EC), and temperature at 10cm, 30cm, and 60cm depths.",
    specs: ["5-Year Battery Life", "15km LoRaWAN Mesh Range", "IP68 Submersible Enclosure", "Sub-10s Telemetry Frequency"],
    deliverables: ["LoRaWAN Gateway Installation", "Multi-Depth Soil Probes", "Weather Micro-Station", "Real-Time Cloud Dashboard"],
  },
  {
    id: "substrates",
    icon: Leaf,
    badge: "Hosma Ceylon Export",
    title: "Tailored Organic Cocopeat Substrates",
    description: "Export-grade 100% organic coconut coir growbags, buffered slabs, and open-top blocks washed to ultra-low EC (<0.5 mS/cm) Dutch greenhouse standards.",
    specs: ["Triple Washed EC < 0.5 mS/cm", "800-900% Water Retention", "Optimum 5.8 - 6.5 pH", "Custom 70/30 or 50/50 Ratios"],
    deliverables: ["Custom Growbag Sizing (100x15x10cm)", "OMRI / GlobalG.A.P Certification", "Direct 40ft Container Freight", "Dedicated Agronomist Support"],
  },
  {
    id: "automation",
    icon: Droplets,
    badge: "Closed-Loop Control",
    title: "Automated Fertigation & Drip Valve Control",
    description: "Cloud-triggered solenoid valves that pulse irrigation only when VPD and soil suction thresholds demand it, reducing nutrient runoff to near zero.",
    specs: ["35% Water Conservation", "22% Fertilizer Runoff Cut", "<50ms Solenoid Response", "Fail-Safe Cloud Override"],
    deliverables: ["Solenoid Valve Controllers", "Solar-Powered Pressure Nodes", "Automated Dosing Rules Engine", "Fail-Safe Cloud Override"],
  },
  {
    id: "drones",
    icon: Plane,
    badge: "Aerial Analytics",
    title: "Drone Multispectral & Satellite NDVI",
    description: "High-resolution multispectral imagery converted into calibrated NDVI maps to detect crop stress, nitrogen deficiency, and pest hot spots.",
    specs: ["2cm/px Spatial Resolution", "<6 hrs Analysis Turnaround", "500 Acres/Day Aerial Coverage", "GIS Boundary Integration"],
    deliverables: ["Weekly Canopy Health Reports", "Variable Rate Fertilizer Maps", "Zonal Biomass Forecasting", "GIS Boundary Integration"],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300">
      <SmoothCursor />
      <BeamsBackground intensity="subtle" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300 dark:border-emerald-800/40 bg-blue-50 dark:bg-emerald-950/50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-blue-800 dark:text-[#10E599] shadow-sm mb-6">
              <Zap className="w-4 h-4 text-[#0066FF] dark:text-[#10e599]" />
              <span>Full-Stack Agronomy &bull; Hardware to Substrates</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              Comprehensive Solutions for{" "}
              <span className="font-serif italic font-normal gradient-text">
                Every Stage.
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
              From raw Ceylon organic coconut husks to cloud machine learning algorithms, explore the 4 foundational pillars powering modern commercial plantations worldwide.
            </p>
          </div>
        </section>

        {/* Services List Grid */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {servicesList.map((srv, index) => {
              const Icon = srv.icon;

              return (
                <div 
                  key={srv.id} 
                  id={srv.id}
                  className="rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 bg-white/90 dark:bg-[#0a140a]/90 p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Info */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#059669] to-[#10E599] text-white flex items-center justify-center shadow-md">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-emerald-950/40 text-xs font-mono font-bold text-slate-700 dark:text-[#10e599] uppercase border border-transparent dark:border-emerald-900/30">
                          {srv.badge}
                        </span>
                      </div>

                      <h2 className="text-3xl font-black text-slate-900 dark:text-white">{srv.title}</h2>
                      <p className="mt-4 text-base text-slate-600 dark:text-emerald-200/70 leading-relaxed font-normal">
                        {srv.description}
                      </p>

                      <div className="mt-8">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-emerald-300/60 mb-3">Key Technical Specifications</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {srv.specs.map((sp, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-emerald-50 bg-slate-50 dark:bg-emerald-950/40 px-3 py-2 rounded-xl border border-slate-100 dark:border-emerald-900/30">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#10e599] shrink-0" />
                              <span>{sp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Deliverables Card */}
                    <div className="lg:col-span-5 bg-slate-950 dark:bg-[#070e07] p-6 md:p-8 rounded-2xl text-white shadow-xl border border-slate-800 dark:border-emerald-900/40">
                      <h4 className="text-xs font-mono font-bold text-[#10e599] uppercase tracking-widest mb-4">
                        Production Deliverables
                      </h4>
                      <ul className="space-y-3">
                        {srv.deliverables.map((del, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300 dark:text-emerald-200/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-[#10e599]" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 pt-6 border-t border-slate-800 dark:border-emerald-900/30 flex items-center justify-between">
                        <span className="text-xs text-slate-400 dark:text-emerald-300/50">Ready for Global Deployment</span>
                        <Link
                          href="/contact"
                          className="gradient-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 hover:scale-105 transition-transform"
                        >
                          <span>Request Spec Sheet</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

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
