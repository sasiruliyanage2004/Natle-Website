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
  Command as CommandIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface CommandItem {
  id: string;
  title: string;
  section: "Platform & Substrates" | "Navigation" | "Quick Actions";
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
        icon: <Building className="h-4 w-4 text-[#0052FF]" />,
        shortcut: "H",
        path: "/",
      },
      {
        id: "nav-about",
        title: "About & Hosma Heritage",
        section: "Navigation",
        icon: <Leaf className="h-4 w-4 text-[#059669]" />,
        shortcut: "A",
        path: "/about",
      },
      {
        id: "nav-services",
        title: "Services & Substrates",
        section: "Navigation",
        icon: <Cpu className="h-4 w-4 text-[#0052FF]" />,
        shortcut: "S",
        path: "/services",
      },
      {
        id: "nav-solutions",
        title: "Products & FieldOS™",
        section: "Navigation",
        icon: <Sparkles className="h-4 w-4 text-[#059669]" />,
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
        icon: <BookOpen className="h-4 w-4 text-[#059669]" />,
        path: "/blog",
      },
      {
        id: "nav-careers",
        title: "Careers & Culture",
        section: "Navigation",
        icon: <Briefcase className="h-4 w-4 text-[#0052FF]" />,
        path: "/careers",
      },
      {
        id: "nav-contact",
        title: "Contact & Demo Booking",
        section: "Navigation",
        icon: <PhoneCall className="h-4 w-4 text-[#059669]" />,
        shortcut: "C",
        path: "/contact",
      },

      // Platform & Substrates
      {
        id: "feat-fieldos",
        title: "NATLE FieldOS™ Operating System",
        section: "Platform & Substrates",
        icon: <Cpu className="h-4 w-4 text-[#0052FF]" />,
        path: "/solutions#field-os",
      },
      {
        id: "feat-yieldai",
        title: "YieldAI™ Harvest Predictor",
        section: "Platform & Substrates",
        icon: <Sparkles className="h-4 w-4 text-[#F59E0B]" />,
        path: "/solutions#yield-ai",
      },
      {
        id: "feat-substrates",
        title: "Hosma Ceylon Organic Cocopeat Growbags",
        section: "Platform & Substrates",
        icon: <Leaf className="h-4 w-4 text-[#059669]" />,
        path: "/services#substrates",
      },
      {
        id: "feat-iot",
        title: "LoRaWAN Sensor Probes & Mesh",
        section: "Platform & Substrates",
        icon: <Radio className="h-4 w-4 text-[#00D2FF]" />,
        path: "/services#iot",
      },

      // Quick Actions
      {
        id: "act-demo",
        title: "Request Farm Assessment Demo",
        section: "Quick Actions",
        icon: <ArrowRight className="h-4 w-4 text-[#059669]" />,
        path: "/contact",
      },
      {
        id: "act-wtc",
        title: "Colombo World Trade Center HQ",
        section: "Quick Actions",
        icon: <MapPin className="h-4 w-4 text-[#0052FF]" />,
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
            className="fixed inset-0 z-50 bg-[#071326]/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative z-50">
        {/* Trigger Pill Button in Navbar */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex h-9 items-center gap-2 rounded-full border border-slate-200/90 bg-slate-100/80 px-3.5 text-xs font-semibold text-[#071326]/70 shadow-sm backdrop-blur-md transition-all hover:border-[#0052FF]/50 hover:bg-white"
        >
          <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0052FF]" />
          <span className="hidden lg:inline-block">Quick Search...</span>
          <span className="lg:hidden">Search</span>
          <kbd className="rounded-md border border-slate-300/80 bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-500 shadow-xs">
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
                className="pointer-events-auto flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/90 bg-white/95 shadow-2xl backdrop-blur-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Search Input Bar */}
                <div className="flex items-center border-b border-slate-100 px-5 py-4">
                  <Search className="h-5 w-5 text-[#0052FF] mr-3 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search pages, IoT telemetry, substrates..."
                    className="w-full bg-transparent text-sm font-semibold text-[#071326] placeholder:text-slate-400 outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <kbd className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-bold text-slate-500">
                    Esc
                  </kbd>
                </div>

                {/* Results List */}
                <div className="max-h-[380px] overflow-y-auto p-3">
                  {filteredItems.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400 font-medium">
                      No matching records found for "{query}"
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sections.map((section) => (
                        <div key={section.name} className="space-y-1">
                          <h3 className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">
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
                                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all ${
                                    isActive
                                      ? "bg-[#0052FF]/10 text-[#0052FF] font-bold"
                                      : "text-[#071326] hover:bg-slate-50"
                                  }`}
                                  onMouseEnter={() => setActiveIndex(globalIndex)}
                                  onClick={() => handleSelectItem(item)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200/80 shadow-xs">
                                      {item.icon}
                                    </div>
                                    <span className="text-xs font-semibold">
                                      {item.title}
                                    </span>
                                  </div>

                                  {item.shortcut && (
                                    <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400">
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
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-4 py-2 text-[11px] text-slate-400 font-mono">
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
