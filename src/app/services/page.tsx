import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import KineticFluidMesh from "@/components/animations/KineticFluidMesh";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { 
  Cpu, 
  Layers, 
  Globe2, 
  Cloud, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  Droplets,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Services & Capabilities | NATLE & Hosma Ceylon",
  description: "Explore our 4 core services: Wireless IoT Telemetry, Full-Stack Cloud Engineering, Tailored Ceylon Substrates, and Multispectral Satellite Mapping.",
};

const servicesList = [
  {
    icon: Cpu,
    id: "iot",
    title: "Wireless IoT Telemetry Mesh",
    badge: "Hardware & Edge",
    description: "Industrial-grade wireless sensor nodes with multi-depth soil moisture, electrical conductivity (EC), pH, and ambient canopy probes over long-range LoRaWAN networks.",
    specs: ["5-Year Battery Life", "15km LoRaWAN Range", "IP68 Waterproof Submersible", "Sub-Minute Telemetry Ingestion"],
    deliverables: ["Custom Sensor Enclosures", "Solar Gateway Stations", "Edge Calibration Firmware", "Real-Time Mobile Alerts"],
  },
  {
    icon: Layers,
    id: "substrates",
    title: "Custom Ceylon Substrate Manufacturing",
    badge: "Hosma Ceylon Agri",
    description: "Tailored 100% natural coconut coir growbags, 5kg compacted blocks, and easy-fill disks engineered to exact physical and chemical specifications for global commercial growers.",
    specs: ["Triple Washed EC < 0.5 mS/cm", "800-900% Water Retention", "Optimum 5.8 - 6.5 pH", "Custom Peat-to-Chip Ratios (70/30, 50/50)"],
    deliverables: ["Bulk 40ft Container Shipping", "Pre-drilled Drip Hole Growbags", "OMRI & GlobalG.A.P Certification", "Custom Brand Packaging"],
  },
  {
    icon: Cloud,
    id: "cloud",
    title: "Enterprise Cloud & Edge Software",
    badge: "Next.js & Distributed Systems",
    description: "High-throughput cloud architecture designed to ingest millions of telemetry data points per second with zero latency, providing predictive dashboards and automated valve control.",
    specs: ["99.99% Guaranteed Uptime", "End-to-End Encrypted Data", "Sub-50ms API Response", "REST & GraphQL Telemetry APIs"],
    deliverables: ["NATLE FieldOS™ Web Dashboard", "iOS & Android Grower App", "SCADA Irrigation Integration", "Multi-Estate Role Management"],
  },
  {
    icon: Globe2,
    id: "satellite",
    title: "Satellite NDVI & Drone Multispectral Telemetry",
    badge: "Computer Vision & AI",
    description: "High-resolution satellite imaging combined with autonomous multispectral drone surveys to calculate Normalized Difference Vegetation Index (NDVI) and detect crop stress before visual symptoms appear.",
    specs: ["0.5m/pixel Drone Resolution", "5-Day Satellite Revisit Cycle", "Thermal Moisture Mapping", "Automated Pest Stress Heatmaps"],
    deliverables: ["Weekly Canopy Health Reports", "Variable Rate Fertilizer Maps", "Zonal Biomass Forecasting", "GIS Boundary Integration"],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300">
      <KineticFluidMesh />
      <SmoothCursor />
      <BeamsBackground intensity="subtle" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-gradient-to-b from-slate-50 via-white to-white dark:bg-[#050505] dark:from-[#050505] dark:via-[#050505] dark:to-[#050505] border-b border-slate-100 dark:border-emerald-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300 dark:border-emerald-800/40 bg-blue-50 dark:bg-emerald-950/50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-blue-800 dark:text-[#10E599] shadow-sm mb-6">
              <Zap className="w-4 h-4 text-[#0066FF] dark:text-[#10e599]" />
              <span>Full-Stack Agri-Tech Capabilities</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] dark:text-white tracking-tight leading-[1.05]">
              Engineered for Complete{" "}
              <span className="bg-gradient-to-r from-[#0066FF] via-[#00C0F0] to-[#10B981] bg-clip-text text-transparent">
                Agricultural Control.
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 dark:text-emerald-200/70 font-normal leading-relaxed max-w-3xl mx-auto">
              From raw Ceylon organic coconut husks to cloud machine learning algorithms, explore the 4 foundational pillars powering modern commercial plantations worldwide.
            </p>
          </div>
        </section>

        {/* Services List Grid */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {servicesList.map((srv, index) => {
              const Icon = srv.icon;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={srv.id} 
                  id={srv.id}
                  className="rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#0a140a]/90 p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Info */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
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
                    <div className="lg:col-span-5 bg-slate-950 dark:bg-[#0a140a]/90 p-6 md:p-8 rounded-2xl text-white shadow-xl border border-slate-800 dark:border-emerald-900/40">
                      <h4 className="text-xs font-mono font-bold text-cyan-400 dark:text-[#10e599] uppercase tracking-widest mb-4">
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
                          className="gradient-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white hover:scale-105 transition-transform"
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
