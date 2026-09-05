import Blog2 from "@/components/watermelon-ui/Blog2";
import { defaultBlogPosts } from "@/data/blogPosts";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Blog & Research | NATLE Enterprise AI Insights",
  description: "Read the latest engineering whitepapers, clinical diagnostic AI breakthroughs, edge IoT telemetry architectures, and enterprise AI ROI analyses from the NATLE engineering team.",
};

export default function BlogPage() {
  return (
    <main className="">
      <div >
        
        {/* Hero Header */}
        <section >
          <div >
            <BookOpen  />
            <span>Enterprise AI &bull; Research &amp; Whitepapers</span>
          </div>

          <h1 >
            Insights on the Future of{" "}
            <span >
              Intelligent Systems.
            </span>
          </h1>

          <p >
            Explore whitepapers, machine learning architectures, edge IoT telemetry blueprints, and enterprise case studies published by our AI researchers and architects.
          </p>
        </section>

        {/* Watermelon Blog2 Grid */}
        <Blog2 
          heading="Latest Publications & Field Reports"
          description="Peer-reviewed technical studies on substrate chemistry, LoRaWAN mesh networks, and crop yield machine learning."
          posts={defaultBlogPosts}
          showViewAll={false}
        />

              </div>
    </main>
  );
}
