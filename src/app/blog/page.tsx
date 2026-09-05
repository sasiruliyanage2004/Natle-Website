import Blog2 from "@/components/watermelon-ui/Blog2";
import { defaultBlogPosts } from "@/data/blogPosts";
import { BookOpen } from "lucide-react";

export const metadata = {
 title: "Blog & Research | NATLE Enterprise AI Insights",
 description: "Read the latest engineering whitepapers, clinical diagnostic AI breakthroughs, edge IoT telemetry architectures, and enterprise AI ROI analyses from the NATLE engineering team.",
};

export default function BlogPage() {
 return (
 <div className="relative min-h-screen bg-transparent text-[#0a1628] antialiased selection:bg-[#0ea5e9] selection:text-white transition-colors duration-300">
 {/* Background Luminous Beams */}
 
 <div className="relative z-10">
        {/* Hero Header */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 max-w-6xl mx-auto px-6 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-white/80 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#059669] shadow-sm backdrop-blur-md mb-6">
              <BookOpen className="w-4 h-4 text-[#059669]" />
              <span>Enterprise AI &bull; Research &amp; Whitepapers</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#0a1628] tracking-tight leading-[1.1]">
              Insights on the Future of{" "}
              <span className="gradient-text">
                Intelligent Systems.
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-[#475569] font-normal leading-relaxed">
              Explore whitepapers, machine learning architectures, edge IoT telemetry blueprints, and enterprise case studies published by our AI researchers and architects.
            </p>
          </div>
        </section>

 {/* Watermelon Blog2 Grid */}
 <Blog2 
 heading="Latest Publications & Field Reports"
 description="Peer-reviewed technical studies on substrate chemistry, LoRaWAN mesh networks, and crop yield machine learning."
 posts={defaultBlogPosts}
 showViewAll={false}
 />

 </div>
 </div>
 );
}
