import Link from "next/link";
import { Globe, Link as LinkIcon, Mail } from "lucide-react";

const COLUMNS = [
 {
 heading: "Product",
 links: [
 { label: "Services", href: "/services" },
 { label: "Solutions", href: "/solutions" },
 { label: "Pricing", href: "/pricing" },
 ],
 },
 {
 heading: "Company",
 links: [
 { label: "About", href: "/about" },
 { label: "Careers", href: "/careers" },
 { label: "Contact", href: "/contact" },
 ],
 },
 {
 heading: "Resources",
 links: [
 { label: "Documentation", href: "/docs" },
 { label: "Security", href: "/security" },
 { label: "Status", href: "/status" },
 ],
 },
];

export default function Footer() {
 return (
 <footer className="relative z-10 border-t border-accent-lime/10 bg-base/80 backdrop-blur-xl">
 <div className="mx-auto max-w-6xl px-6 py-16">
 <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
 <div>
 <Link href="/" className="font-display text-lg font-bold text-ink">
 NATLE<span className="text-accent-lime">.</span>
 </Link>
 <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
 Enterprise AI systems, engineered for production â€” not demos.
 </p>
 <div className="mt-6 flex gap-4 text-ink-muted">
 <a href="#" aria-label="GitHub" className="transition-colors hover:text-accent-lime">
 <Globe size={18} />
 </a>
 <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-accent-lime">
 <LinkIcon size={18} />
 </a>
 <a href="#" aria-label="Twitter" className="transition-colors hover:text-accent-lime">
 <Mail size={18} />
 </a>
 </div>
 </div>

 {COLUMNS.map((col) => (
 <div key={col.heading}>
 <h3 className="font-display text-sm font-semibold text-ink">
 {col.heading}
 </h3>
 <ul className="mt-4 space-y-3">
 {col.links.map((link) => (
 <li key={link.href}>
 <Link
 href={link.href}
 className="text-sm text-ink-muted transition-colors hover:text-accent-lime"
 >
 {link.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>

 <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-ink-muted md:flex-row">
 <p>Â© {new Date().getFullYear()} NATLE Technologies. All rights reserved.</p>
 <div className="flex gap-6">
 <Link href="/privacy" className="hover:text-ink">Privacy</Link>
 <Link href="/terms" className="hover:text-ink">Terms</Link>
 </div>
 </div>
 </div>
 </footer>
 );
}

