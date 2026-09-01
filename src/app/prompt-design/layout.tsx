import React from "react";
import Link from "next/link";
import Header from "@/prompt-design/components/Header";
import Footer from "@/prompt-design/components/Footer";
import AnimeScrollReveal from "@/components/animations/AnimeScrollReveal";
import "@/prompt-design/prompt-globals.css";

export const metadata = {
  title: "NATLE — Precision Agriculture Software, with Hosma Ceylon (Prompt Design Preview)",
  description:
    "NATLE builds FieldOS, YieldAI and TraceLink in strategic partnership with Hosma Ceylon — IoT telemetry, harvest forecasting and export compliance for coconut, tea and hydroponic estates.",
};

export default function PromptDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafcfc] text-[#071326] antialiased selection:bg-[#0052ff] selection:text-white font-sans">
      {/* Anime.js Staggered Scroll Reveal Engine */}
      <AnimeScrollReveal />
      {/* Top Interactive Version Switcher Bar */}
      <div className="sticky top-0 z-50 bg-[#071326] text-white px-4 py-2.5 flex items-center justify-between text-xs font-mono border-b border-emerald-500/30 shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10e599] animate-pulse" />
          <span className="font-bold text-[#10e599]">Prompt UI Design (Separate Preview)</span>
          <span className="hidden md:inline text-slate-400">&bull; Built from your uploaded natle-website.zip</span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#059669] text-white text-xs font-bold transition-all hover:scale-105"
        >
          <span>&larr; Switch to Live Production Version</span>
        </Link>
      </div>

      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
