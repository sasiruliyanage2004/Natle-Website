"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  type KeyboardEvent,
  type FC,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Leaf,
  Cpu,
  Radio,
  Building,
  Briefcase,
  BookOpen,
  PhoneCall,
  MapPin,
  Sparkles,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface CommandItem {
  id: string;
  title: string;
  section: "Platforms & AI" | "Navigation" | "Quick Actions";
  icon: React.ReactNode;
  shortcut?: string;
  path?: string;
  action?: () => void;
}

export const CommandSearch: FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: "nav-home",
        title: "Home",
        section: "Navigation",
        icon: <Building className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />,
        shortcut: "H",
        path: "/",
      },
      {
        id: "nav-about",
        title: "About & Leadership",
        section: "Navigation",
        icon: <Leaf className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />,
        shortcut: "A",
        path: "/about",
      },
      {
        id: "nav-services",
        title: "AI Services & Platforms",
        section: "Navigation",
        icon: <Cpu className="h-4 w-4 text-[#0052FF] dark:text-cyan-400" />,
        shortcut: "S",
        path: "/services",
      },
      {
        id: "nav-solutions",
        title: "Products & FieldOS™",
        section: "Navigation",
        icon: <Sparkles className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />,
        shortcut: "P",
        path: "/solutions",
      },
      {
        id: "nav-projects",
        title: "Commercial Projects",
        section: "Navigation",
        icon: <Radio className="h-4 w-4 text-[#00D2FF]" />,
        path: "/projects",
      },
      {
        id: "nav-blog",
        title: "AgriTech Blog & Research",
        section: "Navigation",
        icon: <BookOpen className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />,
        path: "/blog",
      },
      {
        id: "nav-careers",
        title: "Careers & Culture",
        section: "Navigation",
        icon: <Briefcase className="h-4 w-4 text-[#0052FF] dark:text-cyan-400" />,
        path: "/careers",
      },
      {
        id: "nav-contact",
        title: "Contact Colombo Headquarters",
        section: "Navigation",
        icon: <Mail className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />,
        shortcut: "C",
        path: "/contact",
      },

      // Platforms & AI
      {
        id: "feat-telemetry",
        title: "FieldOS™ Edge IoT Telemetry Node",
        section: "Platforms & AI",
        icon: <Radio className="h-4 w-4 text-[#0052FF] dark:text-cyan-400" />,
        path: "/solutions#field-os",
      },
      {
        id: "feat-yieldai",
        title: "YieldAI™ Neural Harvest Predictor",
        section: "Platforms & AI",
        icon: <Sparkles className="h-4 w-4 text-[#F59E0B]" />,
        path: "/solutions#yield-ai",
      },
      {
        id: "feat-healthcare",
        title: "Healthcare Diagnostic AI & PACS Vision",
        section: "Platforms & AI",
        icon: <Sparkles className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />,
        path: "/services#healthcare",
      },
      {
        id: "feat-configurator",
        title: "AI Solution Architecture Configurator",
        section: "Platforms & AI",
        icon: <Sparkles className="h-4 w-4 text-[#10E599]" />,
        path: "/#configurator",
      },

      // Quick Actions
      {
        id: "act-demo",
        title: "Schedule Enterprise AI Consultation",
        section: "Quick Actions",
        icon: <ArrowRight className="h-4 w-4 text-[#059669] dark:text-[#10E599]" />,
        path: "/contact",
      },
      {
        id: "act-wtc",
        title: "Colombo 05 Headquarters",
        section: "Quick Actions",
        icon: <MapPin className="h-4 w-4 text-[#0052FF] dark:text-cyan-400" />,
        path: "/contact#headquarters",
      },
    ],
    []
  );

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      // Open on 'F' or 'Ctrl+K' / 'Cmd+K'
      if (
        ((e.key.toLowerCase() === "f" && !e.ctrlKey && !e.metaKey) ||
          (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey))) &&
        !isOpen &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  useEffect(() => {
    requestAnimationFrame(() => setActiveIndex(0));
  }, [query]);

  const sections = useMemo(() => {
    const groups: { [key: string]: CommandItem[] } = {};
    filteredItems.forEach((item) => {
      if (!groups[item.section]) groups[item.section] = [];
      groups[item.section].push(item);
    });

    return Object.entries(groups).map(([name, items]) => ({
      name,
      items,
    }));
  }, [filteredItems]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
      );
    } else if (e.key === "Enter") {
      const selectedItem = filteredItems[activeIndex];
      if (selectedItem) {
        if (selectedItem.path) {
          router.push(selectedItem.path);
        } else if (selectedItem.action) {
          selectedItem.action();
        }
        setIsOpen(false);
      }
    }
  };

  const handleSelectItem = (item: CommandItem) => {
    if (item.path) {
      router.push(item.path);
    } else if (item.action) {
      item.action();
    }
    setIsOpen(false);
  };

  const sharedTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#071326]/60 dark:bg-black/75 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative z-50">
        {/* Trigger Pill Button in Navbar (Harmonized Glass Style) */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex h-9 items-center gap-2 rounded-full border border-slate-200/80 dark:border-emerald-500/20 bg-white/80 dark:bg-white/[0.06] px-3 text-xs font-semibold text-slate-700 dark:text-emerald-100/70 shadow-xs backdrop-blur-md transition-all hover:border-emerald-500/50 hover:bg-white dark:hover:bg-white/10 cursor-pointer"
        >
          <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#059669] dark:group-hover:text-[#10E599]" />
          <span className="hidden lg:inline-block">Quick Search...</span>
          <span className="lg:hidden">Search</span>
          <kbd className="rounded border border-slate-200 dark:border-emerald-500/30 bg-slate-100 dark:bg-emerald-950/60 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-500 dark:text-[#10E599]">
            F
          </kbd>
        </button>

        {/* Modal Popup */}
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={sharedTransition}
                className="pointer-events-auto flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/90 dark:border-emerald-500/30 bg-white/95 dark:bg-[#09110a]/95 shadow-2xl backdrop-blur-2xl text-slate-900 dark:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Search Input Bar */}
                <div className="flex items-center border-b border-slate-100 dark:border-emerald-900/30 px-5 py-4">
                  <Search className="h-5 w-5 text-[#059669] dark:text-[#10E599] mr-3 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search enterprise AI, platforms, case studies..."
                    className="w-full bg-transparent text-sm font-semibold text-[#071326] dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-300/40 outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <kbd className="rounded-md border border-slate-200 dark:border-emerald-900/50 bg-slate-100 dark:bg-emerald-950/60 px-2 py-0.5 text-[11px] font-mono font-bold text-slate-500 dark:text-[#10E599]">
                    Esc
                  </kbd>
                </div>

                {/* Results List */}
                <div className="max-h-[380px] overflow-y-auto p-3">
                  {filteredItems.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400 dark:text-emerald-300/50 font-medium">
                      No matching records found for "{query}"
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sections.map((section) => (
                        <div key={section.name} className="space-y-1">
                          <h3 className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 dark:text-emerald-300/50">
                            {section.name}
                          </h3>
                          <div className="space-y-1">
                            {section.items.map((item) => {
                              const globalIndex = filteredItems.findIndex(
                                (fi) => fi.id === item.id
                              );
                              const isActive = globalIndex === activeIndex;

                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${
                                    isActive
                                      ? "bg-emerald-500/15 text-[#059669] dark:text-[#10E599] font-bold"
                                      : "text-slate-800 dark:text-emerald-100/90 hover:bg-slate-50 dark:hover:bg-white/5"
                                  }`}
                                  onMouseEnter={() => setActiveIndex(globalIndex)}
                                  onClick={() => handleSelectItem(item)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white dark:bg-emerald-950/60 border border-slate-200/80 dark:border-emerald-800/40 shadow-xs">
                                      {item.icon}
                                    </div>
                                    <span className="text-xs font-semibold">
                                      {item.title}
                                    </span>
                                  </div>

                                  {item.shortcut && (
                                    <kbd className="rounded border border-slate-200 dark:border-emerald-800/50 bg-white dark:bg-emerald-950/60 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 dark:text-emerald-300">
                                      {item.shortcut}
                                    </kbd>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer instructions */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-emerald-900/30 bg-slate-50/80 dark:bg-emerald-950/40 px-4 py-2 text-[11px] text-slate-400 dark:text-emerald-300/60 font-mono">
                  <div className="flex items-center gap-2">
                    <span>Use &uarr; &darr; to navigate</span>
                    <span>&bull;</span>
                    <span>[Enter] to select</span>
                  </div>
                  <span>NATLE Spotlight</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CommandSearch;
