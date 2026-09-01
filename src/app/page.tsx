"use client";

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
import Particles from "@/components/magicui/particles";
import SmoothCursor from "@/components/magicui/smooth-cursor";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className="relative min-h-screen bg-[#EDF6F2] dark:bg-black text-slate-900 dark:text-white antialiased selection:bg-[#059669] selection:text-white transition-colors duration-300">
      {/* Kokonut UI Animated Luminous Beams Background */}
      <BeamsBackground intensity="medium" />

      {/* Magic UI Interactive Floating Particles Background */}
      <Particles
        className="fixed inset-0 pointer-events-none z-0"
        quantity={120}
        ease={70}
        size={0.6}
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
