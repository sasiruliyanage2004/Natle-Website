"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
 { href: "/about", label: "About" },
 { href: "/services", label: "Services" },
 { href: "/solutions", label: "Solutions" },
 { href: "/projects", label: "Projects" },
 { href: "/blog", label: "Blog" },
 { href: "/careers", label: "Careers" },
 { href: "/contact", label: "Contact" },
];

export default function Navbar() {
 const pathname = usePathname();
 const [scrolled, setScrolled] = useState(false);
 const [open, setOpen] = useState(false);

 useEffect(() => {
 const onScroll = () => setScrolled(window.scrollY > 20);
 onScroll();
 window.addEventListener("scroll", onScroll, { passive: true });
 return () => window.removeEventListener("scroll", onScroll);
 }, []);

 return (
 <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-6 px-6 pointer-events-none">
 <nav
 className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl rounded-full transition-all duration-300 px-6 py-3 ${scrolled ? 'clay-card' : ''}`}
 style={{
 background: scrolled ? "#ffffff" : "rgba(255,255,255,0.4)",
 backdropFilter: scrolled ? "none" : "blur(24px)",
 }}
 >
 <Link href="/" className="font-display text-xl font-black tracking-tight" style={{ color: "#0a1628" }}>
 NATLE<span style={{ color: "#0ea5e9" }}>.</span>
 </Link>

 <ul className="hidden lg:flex items-center gap-7">
 {LINKS.map((link) => {
 const active = pathname === link.href;
 return (
 <li key={link.href}>
 <Link
 href={link.href}
 className="relative text-sm font-semibold transition-colors duration-200"
 style={{ color: active ? "#0ea5e9" : "#475569" }}
 onMouseEnter={(e) => (e.currentTarget.style.color = "#0ea5e9")}
 onMouseLeave={(e) => (e.currentTarget.style.color = active ? "#0ea5e9" : "#475569")}
 >
 {link.label}
 {active && (
 <motion.span
 layoutId="nav-pill"
 className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
 style={{ background: "linear-gradient(90deg, #1a3a8f, #0ea5e9)" }}
 />
 )}
 </Link>
 </li>
 );
 })}
 </ul>

 <div className="hidden lg:block">
 <Link
 href="/contact"
 className="clay-btn flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold"
 >
 Talk to sales
 </Link>
 </div>

 <button
 className="lg:hidden"
 onClick={() => setOpen((v) => !v)}
 style={{ color: "#0a1628" }}
 >
 {open ? <X size={22} /> : <Menu size={22} />}
 </button>
 </nav>

 {/* Mobile Menu */}
 <AnimatePresence>
 {open && (
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 className="absolute top-24 left-6 right-6 rounded-3xl overflow-hidden pointer-events-auto clay-card lg:hidden"
 >
 <ul className="flex flex-col p-4 gap-2">
 {LINKS.map((link) => (
 <li key={link.href}>
 <Link
 href={link.href}
 onClick={() => setOpen(false)}
 className="block px-4 py-3 rounded-xl font-bold text-sm"
 style={{ color: "#0a1628", background: "rgba(14,165,233,0.04)" }}
 >
 {link.label}
 </Link>
 </li>
 ))}
 <li className="pt-2 mt-2 border-t" style={{ borderColor: "rgba(14,165,233,0.1)" }}>
 <Link
 href="/contact"
 onClick={() => setOpen(false)}
 className="gradient-btn flex items-center justify-center w-full py-3 rounded-xl font-bold text-sm"
 >
 Talk to sales
 </Link>
 </li>
 </ul>
 </motion.div>
 )}
 </AnimatePresence>
 </header>
 );
}
