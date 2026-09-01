import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import KineticGlobalMesh from "@/components/animations/KineticGlobalMesh";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import BeamsBackground from "@/components/animations/BeamsBackground";
import { 
  Sprout, 
  Cpu, 
  Globe2, 
  Award, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  TrendingUp,
  Leaf
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | NATLE & Hosma Ceylon Heritage",
  description: "Learn about NATLE's mission bridging sustainable Sri Lankan coconut agriculture with Silicon-Valley grade software engineering and IoT telemetry.",
};

const milestones = [
  {
    year: "2018",
    title: "Hosma Ceylon Founded",
    description: "Established premier organic coconut coir manufacturing facilities in Sri Lanka's coconut triangle, exporting low-EC cocopeat to high-tech Dutch greenhouses.",
  },
  {
    year: "2021",
    title: "Birth of NATLE Tech Lab",
    description: "Formed a dedicated engineering team to build LoRaWAN wireless telemetry probes to monitor moisture, EC, and nitrogen in coconut growbags in real-time.",
  },
  {
    year: "2024",
    title: "NATLE FieldOS™ & YieldAI™",
    description: "Deployed cloud-native predictive farm operating system across 500+ commercial agricultural estates, achieving an average +28.4% harvest boost.",
  },
  {
    year: "2026 & Beyond",
    title: "Global Autonomous Agriculture",
    description: "Expanding autonomous irrigation, satellite multispectral NDVI mapping, and blockchain export verification across Europe, Asia-Pacific, and the Americas.",
  },
];

const team = [
  {
    name: "Dhananjaya Senanayake",
    role: "Chief Technology Officer & Architect",
    specialty: "Cloud Architecture & Scalable Distributed Systems",
    bio: "Ex-enterprise systems lead specializing in Next.js, high-throughput IoT telemetry pipelines, and edge device orchestration.",
  },
  {
    name: "Susantha Saman Kumara",
    role: "Head of Agronomy & Operations",
    specialty: "Substrate Soil Physics & Commercial Cultivation",
    bio: "Over 20 years leading sustainable coconut plantation management, GlobalG.A.P certifications, and export quality control.",
  },
  {
    name: "Dr. Kanishka Perera",
    role: "Lead AI Researcher (YieldAI™)",
    specialty: "Machine Learning & Multispectral NDVI Computer Vision",
    bio: "PhD in Agri-Informatics. Designs real-time microclimate crop biomass forecasting models trained on Sri Lankan and European datasets.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300">
      <KineticGlobalMesh />
      <SmoothCursor />
      <BeamsBackground intensity="subtle" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-[#10E599] shadow-sm mb-6">
              <Sprout className="w-4 h-4 text-emerald-600 dark:text-[#10e599]" />
              <span>Our Vision &bull; Innovate &bull; Build &bull; Grow</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] dark:text-white tracking-tight leading-[1.05]">
              Where Sustainable Soil Meets{" "}
              <span className="bg-gradient-to-r from-[#0066FF] via-[#00C0F0] to-[#10B981] bg-clip-text text-transparent">
                Intelligent Code.
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 dark:text-emerald-200/70 font-normal leading-relaxed max-w-3xl mx-auto">
              NATLE is the dual-power fusion of <strong>Hosma Ceylon</strong> (<a href="https://hosmaceylon.com" target="_blank" rel="noreferrer" className="text-[#0066FF] dark:text-[#10e599] font-bold hover:underline">hosmaceylon.com</a>), premier organic coconut substrate exporter, and cutting-edge software engineering. We empower growers globally with automated telemetry, predictive algorithms, and organic Sri Lankan substrates.
            </p>
          </div>
        </section>

        {/* Dual Core Pillars */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#0a140a]/90 p-8 md:p-10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-[#10e599] flex items-center justify-center mb-6">
                  <Leaf className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Hosma Ceylon Substrates</h2>
                <p className="mt-3 text-base text-slate-600 dark:text-emerald-200/70 leading-relaxed">
                  100% natural, triple-washed coconut coir substrates with ultra-low sodium EC (&lt; 0.5 mS/cm). Specially compacted for European hydroponics, Japanese berry farms, and commercial greenhouses worldwide.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/30 flex items-center gap-4 text-xs font-mono font-bold text-emerald-700 dark:text-[#10e599]">
                <span>OMRI LISTED</span> &bull; <span>ISO 9001:2015</span> &bull; <span>GLOBALG.A.P</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 bg-slate-950 dark:bg-[#0a140a]/90 p-8 md:p-10 text-white shadow-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-600/30 dark:bg-blue-950/40 text-cyan-400 dark:text-[#10e599] border border-blue-500/30 dark:border-emerald-900/30 flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">NATLE Software &amp; IoT Lab</h2>
                <p className="mt-3 text-base text-slate-300 dark:text-emerald-200/70 leading-relaxed">
                  Silicon-Valley standard full-stack engineering, long-range LoRaWAN sensor networks, satellite NDVI crop biomass tracking, and automated cloud edge triggers for commercial agriculture.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800 dark:border-emerald-900/30 flex items-center gap-4 text-xs font-mono font-bold text-cyan-400 dark:text-[#10e599]">
                <span>FIELDOS™ v4.2</span> &bull; <span>YIELD AI™</span> &bull; <span>99.9% UPTIME</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Milestones Timeline */}
        <section className="py-24 bg-slate-50/70 dark:bg-emerald-950/40 border-y border-slate-200/70 dark:border-emerald-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold text-[#0066FF] dark:text-[#10e599] uppercase tracking-widest">Our Journey</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">Pioneering Smart Agriculture</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {milestones.map((m, i) => (
                <div key={i} className="rounded-2xl bg-white dark:bg-[#0a140a]/90 p-6 border border-slate-200/80 dark:border-emerald-900/40 shadow-md flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-black text-[#0066FF] dark:text-[#10e599] font-mono">{m.year}</span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-emerald-50 mt-2">{m.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-emerald-200/70 mt-2 leading-relaxed">{m.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center gap-2 text-[11px] font-bold text-emerald-600 dark:text-[#10e599]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed Milestone</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-[#10e599] uppercase tracking-widest">Leadership &amp; Engineering</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">The Minds Behind NATLE</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#0a140a]/90 p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-white flex items-center justify-center text-xl font-black mb-4 shadow-md">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs font-bold text-[#0066FF] dark:text-[#10e599] mt-0.5">{member.role}</p>
                  <p className="text-[11px] font-mono text-emerald-700 dark:text-[#10e599] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md mt-2 inline-block">
                    {member.specialty}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-emerald-200/70 mt-4 leading-relaxed">{member.bio}</p>
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
