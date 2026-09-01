import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import KineticFluidMesh from "@/components/animations/KineticFluidMesh";
import KineticCursor from "@/components/animations/KineticCursor";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2,
  HeartHandshake,
  Zap,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Careers & Opportunities | Join NATLE Tech Lab",
  description: "Join the team shaping the future of global agriculture. We are hiring IoT engineers, Next.js developers, and agronomy researchers in Colombo and remote.",
};

const perks = [
  {
    icon: Zap,
    title: "High-Impact Engineering",
    description: "Build software and hardware deployed on thousands of acres feeding the planet sustainably.",
  },
  {
    icon: GraduationCap,
    title: "Research & Learning Stipend",
    description: "Annual budgets for international AgriTech conferences, cloud certifications, and technical books.",
  },
  {
    icon: HeartHandshake,
    title: "Comprehensive Health & Wellness",
    description: "Full medical coverage for you and your family, flexible hybrid work policy, and wellness days.",
  },
];

const jobs = [
  {
    title: "Senior Embedded / IoT Firmware Engineer",
    department: "Hardware Lab",
    type: "Full-Time",
    location: "Colombo, Sri Lanka (Hybrid)",
    snippet: "Design low-power C/C++ firmware for LoRaWAN environmental probes, Nordic BLE controllers, and solar edge gateways.",
  },
  {
    title: "Full-Stack Next.js / TypeScript Developer",
    department: "Software Engineering",
    type: "Full-Time",
    location: "Colombo or Remote (Global)",
    snippet: "Scale the NATLE FieldOS™ web dashboard and mobile telemetry apps using Next.js 15, Tailwind CSS, and WebSockets.",
  },
  {
    title: "Agronomist & Substrate Research Specialist",
    department: "Hosma R&D Lab",
    type: "Full-Time",
    location: "Kurunegala / Colombo",
    snippet: "Conduct commercial trials on coconut coir aeration, low-EC buffer compaction, and disease suppression for export markets.",
  },
];

export default function CareersPage() {
  return (
    <main className="relative min-h-screen bg-white antialiased selection:bg-emerald-500 selection:text-white">
      <KineticFluidMesh />
      <KineticCursor />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 shadow-sm mb-6">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Join the Future of Agriculture</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] tracking-tight leading-[1.05]">
              Build the Technology that{" "}
              <span className="bg-gradient-to-r from-[#0066FF] via-[#00C0F0] to-[#10B981] bg-clip-text text-transparent">
                Feeds the World.
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
              We are a passionate team of software architects, hardware hackers, and soil scientists building the next generation of autonomous precision farming.
            </p>
          </div>
        </section>

        {/* Perks Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perks.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{p.title}</h3>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed font-normal">{p.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Open Positions Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest">Opportunities</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">Open Engineering &amp; Agri Roles</h2>
          </div>

          <div className="space-y-6">
            {jobs.map((job, i) => (
              <div key={i} className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg hover:shadow-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono font-bold">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{job.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </p>
                  <p className="text-xs text-slate-600 mt-3 max-w-2xl font-normal leading-relaxed">{job.snippet}</p>
                </div>

                <Link
                  href="/contact"
                  className="gradient-btn shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white shadow-md hover:scale-105 transition-transform"
                >
                  <span>Apply For Role</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <CTAFooter />
      </div>
    </main>
  );
}
