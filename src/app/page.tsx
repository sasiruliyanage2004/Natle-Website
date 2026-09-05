"use client";

import Hero from "@/components/Hero";
import AgentaMarquee from "@/components/AgentaMarquee";
import Stats from "@/components/Stats";
import Solutions from "@/components/Solutions";
import Features from "@/components/Features";
import AgentaHowItWorks from "@/components/AgentaHowItWorks";
import Testimonials from "@/components/Testimonials";
import AgentaFAQ from "@/components/AgentaFAQ";

export default function Home() {
 return (
 <main className="relative min-h-screen">
 <Hero />
 <AgentaMarquee />
 <Stats />
 <Solutions />
 <Features />
 <AgentaHowItWorks />
 <Testimonials />
 <AgentaFAQ />
 </main>
 );
}
