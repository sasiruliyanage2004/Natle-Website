"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  User, 
  ArrowRight, 
  Mic, 
  MicOff,
  Volume2,
  RefreshCw,
  CornerDownLeft
} from "lucide-react";
import { sound } from "@/lib/sound";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  badge?: string;
  actionCta?: { label: string; href: string };
}

const PRESET_QUESTIONS = [
  "What is the diagnostic accuracy of NATLE Healthcare AI?",
  "How does NATLE ensure zero data leakage for sovereign on-premise AI?",
  "Can NATLE Retail POS operate offline with sub-15ms edge sync?",
  "What are the integration timelines for our legacy enterprise ERP?",
];

export default function NatleAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isHovered || isOpen || inputVal.trim().length > 0 || isListening;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Hello! I am **NATLE Intelligence** — your enterprise AI & systems copilot.\n\nAsk me anything about **Healthcare Diagnostic AI**, **Autonomous Agriculture IoT**, **Retail POS**, **Adaptive EdTech**, or **Sovereign On-Premise architectures**.",
      timestamp: "Just now",
      badge: "NATLE Engine v5.0",
    },
  ]);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Setup Web Speech API (Speech Recognition)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const transcript = Array.from(event.results)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((result: any) => result[0].transcript)
            .join("");
          setInputVal(transcript);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      // If voice recognition is not supported in this browser, focus input
      inputRef.current?.focus();
      setIsOpen(true);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setIsOpen(true);
        sound.playClick();
      } catch {
        setIsListening(false);
      }
    }
  };

  const generateAIResponse = (userPrompt: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "";
      let badge = "NATLE Solutions AI";
      let actionCta: { label: string; href: string } | undefined;

      const lower = userPrompt.toLowerCase();

      if (lower.includes("health") || lower.includes("medic") || lower.includes("pacs") || lower.includes("dicom") || lower.includes("doctor")) {
        aiText = `### NATLE Healthcare Diagnostic AI\n\n- **Clinical Precision:** **98.2% diagnostic accuracy** on emergency CT, MRI, and X-ray triage.\n- **Workload Reduction:** **60% drop** in radiologist triage queues (proven at HealthFirst Hospital Group).\n- **Latency SLA:** **<15ms edge inference** via TensorRT FP8 quantization.\n- **Regulatory Compliance:** **100% HIPAA and SOC 2 Type II certified** with air-gapped VPC and on-premise deployment modes.`;
        actionCta = { label: "Explore Healthcare Case Study", href: "/projects#healthcare" };
      } else if (lower.includes("agri") || lower.includes("tea") || lower.includes("soil") || lower.includes("probe") || lower.includes("farm")) {
        aiText = `### Domain 02: Agriculture AI & IoT Edge Telemetry\n\n- **Edge Hardware:** Tri-depth capacitive ceramic prongs reading root-zone moisture, electrical conductivity (EC), and soil temperature.\n- **Mesh Range:** **15km line-of-sight LoRaWAN** with 5+ year solar-assisted autonomy.\n- **Autonomous Yield AI:** Multispectral satellite integration commanding variable-rate irrigation valves with **38% water conservation**.`;
        actionCta = { label: "Explore Agriculture Platform", href: "/services#agriculture" };
      } else if (lower.includes("pos") || lower.includes("retail") || lower.includes("store") || lower.includes("checkout")) {
        aiText = `### Omnichannel Point of Sales (POS) & Retail AI\n\n- **Sync Throughput:** **Sub-15ms transaction execution** across multi-site supermarket chains.\n- **Loss Prevention:** Real-time AI shrink detection cutting inventory loss by **35%**.\n- **Offline-First:** Localized edge failover keeps checkouts scanning even during complete internet blackout.`;
        actionCta = { label: "Explore POS Solutions", href: "/services#pos" };
      } else if (lower.includes("edtech") || lower.includes("school") || lower.includes("learn") || lower.includes("student")) {
        aiText = `### Education Technology & Adaptive Learning AI\n\n- **Cognitive Knowledge Graphs:** Real-time learner pacing tailored to individual mastery curves.\n- **Global Scale:** Deployed across **140,000+ active students** at EduReach Global.\n- **Engagement Uplift:** **+45% student retention and completion** over traditional LMS platforms.`;
        actionCta = { label: "Explore EdTech Platform", href: "/services#education" };
      } else if (lower.includes("hr") || lower.includes("talent") || lower.includes("hire") || lower.includes("recruit")) {
        aiText = `### Predictive Human Resources Intelligence\n\n- **Candidate Matching:** Skill graph ranking eliminating unconscious bias with **80% faster shortlisting**.\n- **Attrition Forecasting:** Behavioral retention modeling identifying flight risks 90 days in advance.\n- **Privacy:** Strict GDPR and enterprise employment law compliance with zero external data leakage.`;
        actionCta = { label: "Explore HR Solutions", href: "/services#hr" };
      } else {
        aiText = `Thank you for your inquiry regarding **"${userPrompt}"**!\n\nNATLE engineers mission-critical artificial intelligence across 6 core domains with sub-15ms edge inference and 100% sovereign data privacy.\n\nOur solutions architects can configure a custom technical specification and ROI roadmap for your enterprise.`;
        actionCta = { label: "Schedule Architecture Review", href: "/contact" };
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
    }, 750);
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
    setIsOpen(true);
    generateAIResponse(text);
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-8 z-50 select-none">
      
      {/* ================= 1. EXPANDABLE AI CHAT DRAWER ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="absolute bottom-13 sm:bottom-14 right-0 w-[92vw] sm:w-[440px] h-[520px] max-h-[75vh] rounded-3xl bg-slate-950/95 dark:bg-[#070d07]/95 backdrop-blur-2xl border border-white/15 dark:border-emerald-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden mb-2"
          >
            {/* Header */}
            <div className="p-4 px-5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#10E599] flex items-center justify-center border border-emerald-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-2">
                    <span>NATLE Intelligence</span>
                    <span className="w-2 h-2 rounded-full bg-[#10E599] animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">Autonomous Agronomy &amp; Software Co-Pilot</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  sound.playClick();
                }}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs font-sans">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "ai" && (
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-[#10E599] flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      m.sender === "user"
                        ? "bg-[#059669] text-white rounded-tr-xs shadow-md font-medium"
                        : "bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-xs shadow-md"
                    }`}
                  >
                    {m.badge && (
                      <span className="text-[9px] font-mono text-emerald-400 block mb-1.5 font-bold uppercase tracking-wider">
                        {m.badge}
                      </span>
                    )}

                    <div className="whitespace-pre-line font-normal text-xs">
                      {m.text}
                    </div>

                    {m.actionCta && (
                      <div className="mt-3 pt-2.5 border-t border-white/10">
                        <a
                          href={m.actionCta.href}
                          onClick={() => sound.playClick()}
                          className="gradient-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-950 hover:scale-105 transition-transform"
                        >
                          <span>{m.actionCta.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {m.sender === "user" && (
                    <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] pl-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-200" />
                  <span>Computing telemetry equations...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-2.5 bg-slate-900/60 border-t border-white/5 overflow-x-auto flex gap-1.5 no-scrollbar">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/15 text-slate-300 hover:text-[#10E599] border border-white/10 hover:border-emerald-500/30 text-[10px] whitespace-nowrap transition-all cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 2. HOVER/CLICK-EXPANDABLE CIRCULAR AI LOGO ================= */}
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          if (!isOpen && !inputVal.trim() && !isListening) {
            setIsHovered(false);
          }
        }}
        animate={{
          width: isExpanded ? (typeof window !== "undefined" && window.innerWidth < 640 ? 240 : 275) : 46,
          height: 46,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="relative flex items-center justify-end rounded-full bg-[#18181b]/95 dark:bg-[#0c120c]/95 border border-white/20 dark:border-emerald-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden cursor-pointer group"
      >
        {/* State A: Collapsed Round Circle Badge Icon */}
        {!isExpanded && (
          <button
            type="button"
            onClick={() => {
              setIsHovered(true);
              setIsOpen(true);
              sound.playClick();
            }}
            className="w-[46px] h-[46px] flex items-center justify-center text-[#10E599] hover:scale-105 transition-transform shrink-0 relative"
            aria-label="Open NATLE AI Co-Pilot"
            title="NATLE FieldOS AI Co-Pilot"
          >
            <Sparkles className="w-5 h-5 text-[#10E599] drop-shadow-[0_0_8px_#10E599]" />
            <span className="w-2 h-2 rounded-full bg-[#10E599] animate-ping absolute top-2.5 right-2.5" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] absolute top-2.5 right-2.5" />
          </button>
        )}

        {/* State B: Expanded Input Pill */}
        {isExpanded && (
          <div className="flex items-center w-full px-2">
            {/* Subtle Ambient Pulse Dot */}
            <div className="pl-1 pr-1 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onFocus={() => {
                setIsHovered(true);
                setIsOpen(true);
              }}
              placeholder={isListening ? "Listening..." : "Ask anything..."}
              className="flex-1 bg-transparent px-2 text-xs text-white placeholder-slate-400 font-sans outline-none"
              autoFocus={isHovered && isOpen}
            />

            {/* If text is typed, show quick Send button */}
            {inputVal.trim() && (
              <button
                type="submit"
                className="p-1 rounded-full bg-[#059669] hover:bg-[#10E599] text-slate-950 font-bold transition-all mr-1 cursor-pointer"
              >
                <CornerDownLeft className="w-3 h-3" />
              </button>
            )}

            {/* Circular Microphone Button */}
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? "Stop listening" : "Click to speak with voice"}
              className={cn(
                "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm",
                isListening 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-[#f1f1f1] hover:bg-white text-slate-900 hover:scale-105 active:scale-95"
              )}
            >
              {isListening ? (
                <MicOff className="w-3.5 h-3.5" />
              ) : (
                <Mic className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}
      </motion.form>

    </div>
  );
}
