import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import BeamsBackground from "@/components/animations/BeamsBackground";
import KineticFluidMesh from "@/components/animations/KineticFluidMesh";
import KineticCursor from "@/components/animations/KineticCursor";
import Blog2 from "@/components/watermelon-ui/Blog2";
import { defaultBlogPosts } from "@/data/blogPosts";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Blog & Research | NATLE AgriTech Insights",
  description: "Read the latest research papers, agronomy field findings, and smart farming engineering guides from the NATLE and Hosma Ceylon team.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-[#EDF6F2] antialiased selection:bg-[#059669] selection:text-white">
      {/* Background Luminous Beams */}
      <BeamsBackground intensity="subtle" />
      <KineticFluidMesh />
      <KineticCursor />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-36 pb-16 md:pt-48 md:pb-20 text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-white/80 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] shadow-sm backdrop-blur-md mb-6">
            <BookOpen className="w-4 h-4 text-[#059669]" />
            <span>Agri-Tech Field Notes &bull; Research Lab</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#071326] tracking-tight leading-[1.05]">
            Insights on the Future of{" "}
            <span className="font-serif italic font-normal text-gradient">
              Cultivation.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Explore whitepapers, firmware blueprints, and agronomy research published by our hardware engineers, soil physicists, and AI researchers.
          </p>
        </section>

        {/* Watermelon Blog2 Grid */}
        <Blog2 
          heading="Latest Publications & Field Reports"
          description="Peer-reviewed technical studies on substrate chemistry, LoRaWAN mesh networks, and crop yield machine learning."
          posts={defaultBlogPosts}
          showViewAll={false}
        />

        <CTAFooter />
      </div>
    </main>
  );
}
