"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AgentaMarquee from "@/components/AgentaMarquee";
import HosmaHeritage from "@/components/HosmaHeritage";
import SubstrateConfigurator from "@/components/SubstrateConfigurator";
import SubstrateROICalculator from "@/components/interactive/SubstrateROICalculator";
import HardwareScrollytelling from "@/components/interactive/HardwareScrollytelling";
import HorizontalEstateJourney from "@/components/interactive/HorizontalEstateJourney";
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
import BioluminescentField from "@/components/common/BioluminescentField";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#050505] text-slate-900 dark:text-emerald-50 antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300">
      {/* Kokonut UI Animated Luminous Beams Background */}
      <BeamsBackground intensity="medium" />

      {/* Global Bioluminescent Background Layer (Single instance, fixed full-viewport, continuous across scroll) */}
      <BioluminescentField className="fixed inset-0 z-0 pointer-events-none hidden dark:block" intensity="medium" />

      {/* Main Page Flow Architecture */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AgentaMarquee />
        <HosmaHeritage />
        <HardwareScrollytelling />
        <HorizontalEstateJourney />
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
      </div>
    </main>
  );
}
