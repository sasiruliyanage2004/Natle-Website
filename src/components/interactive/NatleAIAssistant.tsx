"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Terminal, 
  Leaf, 
  Cpu, 
  HelpCircle 
} from "lucide-react";
import { sound } from "@/lib/sound";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  badge?: string;
  actionCta?: { label: string; href: string };
}

const PRESET_QUESTIONS = [
  "How many LoRaWAN probes do I need for a 150-acre tea estate?",
  "What Hosma substrate mix is recommended for European greenhouse berries?",
  "How does FieldOS connect IoT telemetry to Next.js & Go cloud services?",
  "Calculate water & fertilizer savings for 75 acres of coconut.",
];

export default function NatleAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Hello! I am **NATLE Intelligence** — your agronomy & full-stack systems co-pilot.\n\nAsk me anything about **LoRaWAN probe density**, **Hosma Ceylon organic cocopeat formulas**, or **custom software & AI engineering** for your estate.",
      timestamp: "Just now",
      badge: "NATLE Engine v4.2",
    },
  ]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const generateAIResponse = (userPrompt: string) => {
    setIsTyping(true);
    sound.playHover();

    setTimeout(() => {
      let aiText = "";
      let badge = "FieldOS Agronomy AI";
      let actionCta: { label: string; href: string } | undefined;

      const lower = userPrompt.toLowerCase();

      if (lower.includes("tea") || lower.includes("150") || lower.includes("how many")) {
        aiText = `### Recommendation for 150-Acre Hillside Tea Estate\n\n- **Estimated Probe Density:** **22 - 25 Tri-Depth LoRaWAN Probes** (~1 probe per 6 - 7 acres based on terrace contour variance).\n- **Depth Configuration:** 10cm (Surface root mat), 30cm (Feeder roots), and 60cm (Subsoil drainage).\n- **Gateway Placement:** 1 Solar LoRaWAN Gateway installed at the estate ridge covers a **12km - 15km line-of-sight radius**.\n- **Projected Impact:** **24% reduction in fertilizer nitrogen leaching** and **32% water conservation** during dry seasons.`;
        actionCta = { label: "Schedule 150-Acre Pilot Assessment", href: "/contact" };
      } else if (lower.includes("substrate") || lower.includes("mix") || lower.includes("berr") || lower.includes("greenhouse")) {
        aiText = `### Hosma Ceylon Substrate Specification for Hydroponics\n\n- **Recommended Matrix:** **Hosma 70/30 Cocopeat / Coir Chip Blend**.\n- **Electrical Conductivity (EC):** Ultra-low washed **< 0.4 mS/cm (1:1.5 Dutch extraction method)**.\n- **Air-Filled Porosity (AFP):** **22% - 25%** for rapid capillary drainage and oxygenation.\n- **Water Retention:** **850% by dry weight**, eliminating dry spots around dripper stakes.\n- **Packaging:** Pre-cut, UV-treated coir slabs (100cm × 15cm × 10cm) with pre-punched planting and drainage holes.`;
        actionCta = { label: "Order 40ft Container Substrate Batch", href: "/contact" };
      } else if (lower.includes("software") || lower.includes("next") || lower.includes("go") || lower.includes("cloud")) {
        aiText = `### NATLE Dual-Stack Architecture\n\n- **Edge Gateway:** LoRaWAN 868/915 MHz Packet Forwarder running custom C++ telemetry firmware.\n- **Ingestion Pipeline:** **Go (Golang)** microservice handling **10,000+ packets/sec** with sub-50ms latency.\n- **Database Layer:** **TimescaleDB (PostgreSQL)** for hyper-efficient time-series telemetry querying.\n- **Frontend Command Center:** **Next.js 15 (React 19)** with server-side rendering, streaming WebSockets, and PWA offline caching for field agronomists.`;
        actionCta = { label: "Inquire Custom Software Architecture", href: "/contact" };
      } else if (lower.includes("saving") || lower.includes("coconut") || lower.includes("75")) {
        aiText = `### Feasibility & ROI Calculation (75-Acre Commercial Coconut)\n\n- **Annual Water Conserved:** **~126 Million Liters** via VPD automated drip pulsing.\n- **Fertilizer Runoff Reduction:** **~$29,400 USD / year** saved in un-leached NPK nutrients.\n- **Yield Improvement:** **+28.0% nuts/tree/cycle** due to maintained root moisture curves.\n- **Total Projected ROI:** **+$148,000 USD net gain per harvest year**.`;
        actionCta = { label: "Download Custom ROI Audit", href: "/contact" };
      } else {
        aiText = `Thank you for your inquiry regarding **"${userPrompt}"**!\n\nNATLE integrates **precision LoRaWAN edge hardware**, **Hosma Ceylon organic cocopeat exports**, and **Next.js/Go enterprise cloud software**.\n\nOur engineering agronomists can configure a custom technical specification and ROI feasibility model tailored to your exact estate acreage and crop requirements.`;
        actionCta = { label: "Speak with Lead Agronomist", href: "/contact" };
      }

      const newAiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiText,
        timestamp: "Just now",
        badge,
        actionCta,
      };

      setMessages((prev) => [...prev, newAiMessage]);
      setIsTyping(false);
      sound.playChime();
    }, 850);
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    sound.playClick();
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputVal("");
    generateAIResponse(text);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            sound.playClick();
          }}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-950 text-white border border-emerald-500/50 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl hover:border-emerald-400 transition-all cursor-pointer"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10E599] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10E599]" />
          </span>
          
          <div className="flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-[#10E599]" />
            <span className="text-xs font-mono font-bold text-white tracking-wide">
              NATLE Intelligence
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#10E599] text-[10px] font-mono font-bold border border-emerald-500/30 hidden sm:inline">
            AI Co-Pilot
          </span>
        </motion.button>
      </div>

      {/* AI Assistant Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-22 right-4 sm:right-6 w-[94vw] sm:w-[480px] h-[600px] max-h-[82vh] rounded-3xl bg-slate-950/95 dark:bg-[#070d07]/95 backdrop-blur-2xl border border-emerald-500/40 shadow-2xl z-50 flex flex-col overflow-hidden select-none"
          >
            {/* Header */}
            <div className="p-4 px-6 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#10E599] flex items-center justify-center border border-emerald-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <span>NATLE Intelligence</span>
                    <span className="w-2 h-2 rounded-full bg-[#10E599] animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">Autonomous Agronomy &amp; Software Co-Pilot</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  sound.playClick();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs font-sans">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "ai" && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-[#10E599] flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`p-4 rounded-2xl max-w-[85%] leading-relaxed ${
                      m.sender === "user"
                        ? "bg-[#059669] text-white rounded-tr-xs shadow-md"
                        : "bg-slate-900 border border-white/10 text-slate-200 rounded-tl-xs shadow-md"
                    }`}
                  >
                    {m.badge && (
                      <span className="text-[10px] font-mono text-emerald-400 block mb-2 font-bold uppercase tracking-wider">
                        {m.badge}
                      </span>
                    )}

                    <div className="whitespace-pre-line prose-invert font-normal">
                      {m.text}
                    </div>

                    {m.actionCta && (
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <a
                          href={m.actionCta.href}
                          onClick={() => sound.playClick()}
                          className="gradient-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-950 hover:scale-105 transition-transform"
                        >
                          <span>{m.actionCta.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  {m.sender === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] pl-10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-200" />
                  <span>Computing agronomy formulas...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-3 bg-slate-900/60 border-t border-white/5 overflow-x-auto flex gap-2 no-scrollbar">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/15 text-slate-300 hover:text-[#10E599] border border-white/10 hover:border-emerald-500/30 text-[11px] whitespace-nowrap transition-all cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3.5 bg-slate-900 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask about probes, cocopeat, or custom software..."
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="p-2.5 rounded-xl bg-[#059669] hover:bg-[#10E599] disabled:opacity-40 text-slate-950 font-bold transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
