import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AgentaMarquee from "@/components/AgentaMarquee";
import HosmaHeritage from "@/components/HosmaHeritage";
import Features from "@/components/Features";
import AgentaHowItWorks from "@/components/AgentaHowItWorks";
import Solutions from "@/components/Solutions";
import AgentaUseCases from "@/components/AgentaUseCases";
import Stats from "@/components/Stats";
import Blog2 from "@/components/watermelon-ui/Blog2";
import AgentaFAQ from "@/components/AgentaFAQ";
import Testimonials from "@/components/Testimonials";
import CTAFooter from "@/components/CTAFooter";
import BeamsBackground from "@/components/animations/BeamsBackground";
import KineticFluidMesh from "@/components/animations/KineticFluidMesh";
import SmoothCursor from "@/components/magicui/smooth-cursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-black text-slate-900 dark:text-white antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300">
      {/* Kokonut UI Animated Luminous Beams Background */}
      <BeamsBackground intensity="medium" />

      {/* Kinetic Fluid Particle Mesh */}
      <KineticFluidMesh />

      {/* Magic UI Smooth Cursor in Ceylon Emerald & Neon Mint */}
      <SmoothCursor />

      {/* Main Page Flow Architecture */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AgentaMarquee />
        <HosmaHeritage />
        <Features />
        <AgentaHowItWorks />
        <Solutions />
        <AgentaUseCases />
        <Stats />
        <Blog2 />
        <AgentaFAQ />
        <Testimonials />
        <CTAFooter />
      </div>
    </main>
  );
}
