"use client";

import React, { useState } from "react";
import { 
 Link as LinkIcon, 
 Share2, 
 Check, 
 MessageCircle 
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Custom Crisp SVG Icons for X (Twitter) and LinkedIn
function TwitterXIcon({ className = "h-4 w-4" }: { className?: string }) {
 return (
 <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
 </svg>
 );
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
 return (
 <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
 <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
 </svg>
 );
}

interface ShareItem {
 icon: React.ElementType;
 label: string;
 action: () => void;
}

export default function SocialShareButton({
 className = "",
}: {
 className?: string;
}) {
 const [isVisible, setIsVisible] = useState(false);
 const [copied, setCopied] = useState(false);
 const [activeIndex, setActiveIndex] = useState<number | null>(null);

 const shareUrl = typeof window !== "undefined" ? window.location.href : "https://natle.tech";
 const shareTitle = "NATLE — Empowering Agriculture with Next-Gen Intelligence";

 const handleCopyLink = () => {
 if (typeof navigator !== "undefined" && navigator.clipboard) {
 navigator.clipboard.writeText(shareUrl);
 setCopied(true);
 setTimeout(() => setCopied(false), 2500);
 }
 };

 const shareItems: ShareItem[] = [
 {
 icon: TwitterXIcon,
 label: "Share on X",
 action: () => {
 window.open(
 `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
 "_blank"
 );
 },
 },
 {
 icon: LinkedInIcon,
 label: "Share on LinkedIn",
 action: () => {
 window.open(
 `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
 "_blank"
 );
 },
 },
 {
 icon: MessageCircle,
 label: "Share on WhatsApp",
 action: () => {
 window.open(
 `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`,
 "_blank"
 );
 },
 },
 {
 icon: copied ? Check : LinkIcon,
 label: copied ? "Link Copied!" : "Copy Link",
 action: handleCopyLink,
 },
 ];

 const handleShareClick = (index: number) => {
 setActiveIndex(index);
 shareItems[index].action();
 setTimeout(() => setActiveIndex(null), 300);
 };

 return (
 <div
 className={cn("relative inline-block select-none", className)}
 onMouseEnter={() => setIsVisible(true)}
 onMouseLeave={() => setIsVisible(false)}
 >
 {/* 1. Default Trigger Button */}
 <motion.button
 type="button"
 animate={{
 opacity: isVisible ? 0 : 1,
 }}
 transition={{ duration: 0.2, ease: "easeInOut" }}
 className="relative flex h-10 min-w-[160px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30"
 >
 <Share2 className="h-4 w-4 text-[#10E599]" />
 <span>{copied ? "Link Copied!" : "Share Platform"}</span>
 </motion.button>

 {/* 2. Expanded Animated Social Strip on Hover */}
 <motion.div
 animate={{
 width: isVisible ? "auto" : 0,
 opacity: isVisible ? 1 : 0,
 }}
 transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
 className="absolute top-0 left-0 flex h-10 overflow-hidden rounded-full border border-white/25 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
 >
 {shareItems.map((item, i) => {
 const Icon = item.icon;
 const isCopiedButton = i === 3 && copied;

 return (
 <motion.button
 key={item.label}
 type="button"
 title={item.label}
 aria-label={item.label}
 onClick={() => handleShareClick(i)}
 animate={{
 opacity: isVisible ? 1 : 0,
 x: isVisible ? 0 : -15,
 }}
 transition={{
 duration: 0.3,
 ease: [0.23, 1, 0.32, 1],
 delay: isVisible ? i * 0.04 : 0,
 }}
 className={cn(
 "relative flex h-10 w-10 items-center justify-center border-r border-white/10 transition-colors last:border-r-0 hover:bg-white/15",
 isCopiedButton ? "bg-emerald-500/20 text-[#10E599]" : "text-white"
 )}
 >
 <motion.div
 animate={{
 scale: activeIndex === i ? 0.82 : 1,
 }}
 transition={{ duration: 0.2 }}
 className="relative z-10"
 >
 <Icon className={cn("h-4 w-4", isCopiedButton ? "text-[#10E599]" : "text-white")} />
 </motion.div>
 </motion.button>
 );
 })}
 </motion.div>
 </div>
 );
}
