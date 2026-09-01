"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AgentaMarquee from "@/components/AgentaMarquee";
import HosmaHeritage from "@/components/HosmaHeritage";
import NDVIScanner from "@/components/interactive/NDVIScanner";
import SubstrateConfigurator from "@/components/SubstrateConfigurator";
import SubstrateROICalculator from "@/components/interactive/SubstrateROICalculator";
import Features from "@/components/Features";
import AgentaHowItWorks from "@/components/AgentaHowItWorks";
import Solutions from "@/components/Solutions";
import GlobalExportMap from "@/components/interactive/GlobalExportMap";
import AgentaUseCases from "@/components/AgentaUseCases";
import Stats from "@/components/Stats";
import Blog2 from "@/components/watermelon-ui/Blog2";
import AgentaFAQ from "@/components/AgentaFAQ";
import Testimonials from "@/components/Testimonials";
import CTAFooter from "@/components/CTAFooter";
import BeamsBackground from "@/components/animations/BeamsBackground";
import Particles from "@/components/magicui/particles";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300">
      {/* Kokonut UI Animated Luminous Beams Background */}
      <BeamsBackground intensity="medium" />

      {/* Magic UI Interactive Floating Particles Background */}
      <Particles
        className="fixed inset-0 pointer-events-none z-0"
        quantity={70}
        ease={70}
        size={0.5}
        color={isDark ? "#10E599" : "#059669"}
        refresh
      />

      {/* Magic UI Smooth Cursor in Ceylon Emerald */}
      <SmoothCursor />

      {/* Main Page Flow Architecture */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AgentaMarquee />
        <HosmaHeritage />
        <NDVIScanner />
        <SubstrateConfigurator />
        <SubstrateROICalculator />
        <Features />
        <AgentaHowItWorks />
        <Solutions />
        <GlobalExportMap />
        <AgentaUseCases />
        <Stats />
        <Blog2 />
        <AgentaFAQ />
        <Testimonials />
        <CTAFooter />

        {/* Floating Prompt Design Switcher Pill */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="/prompt-design"
            className="group flex items-center gap-2.5 rounded-full border border-emerald-500/60 bg-[#071326]/95 text-white px-4 py-2.5 shadow-2xl backdrop-blur-xl hover:scale-105 transition-all duration-300 hover:border-emerald-400"
          >
            <span className="w-2 h-2 rounded-full bg-[#10e599] animate-ping" />
            <span className="text-xs font-mono font-bold text-[#10e599]">🎨 Explore Prompt UI Version</span>
            <span className="text-xs text-white group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
