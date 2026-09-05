"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function SmoothCursor() {
 const [isHovered, setIsHovered] = useState(false);
 const [isVisible, setIsVisible] = useState(false);

 const mouseX = useMotionValue(-100);
 const mouseY = useMotionValue(-100);

 // Buttery-smooth spring physics (Magic UI standard)
 const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
 const smoothX = useSpring(mouseX, springConfig);
 const smoothY = useSpring(mouseY, springConfig);

 useEffect(() => {
 // Only enable on non-touch desktop devices
 if (window.matchMedia("(pointer: coarse)").matches) return;

 const handleMouseMove = (e: MouseEvent) => {
 mouseX.set(e.clientX);
 mouseY.set(e.clientY);
 if (!isVisible) setIsVisible(true);
 };

 const handleMouseOver = (e: MouseEvent) => {
 const target = e.target as HTMLElement | null;
 if (!target) return;

 if (
 target.tagName === "A" ||
 target.tagName === "BUTTON" ||
 target.tagName === "INPUT" ||
 target.closest("a") ||
 target.closest("button") ||
 target.classList.contains("interactive-target") ||
 target.classList.contains("cursor-pointer")
 ) {
 setIsHovered(true);
 } else {
 setIsHovered(false);
 }
 };

 const handleMouseLeave = () => {
 setIsVisible(false);
 };

 window.addEventListener("mousemove", handleMouseMove, { passive: true });
 window.addEventListener("mouseover", handleMouseOver, { passive: true });
 document.addEventListener("mouseleave", handleMouseLeave);

 return () => {
 window.removeEventListener("mousemove", handleMouseMove);
 window.removeEventListener("mouseover", handleMouseOver);
 document.removeEventListener("mouseleave", handleMouseLeave);
 };
 }, [mouseX, mouseY, isVisible]);

 if (!isVisible) return null;

 return (
 <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block select-none overflow-hidden">
 
 {/* 1. Smooth Spring Trailing Glow Ring in Ceylon Emerald & Neon Mint */}
 <motion.div
 style={{
 x: smoothX,
 y: smoothY,
 translateX: "-50%",
 translateY: "-50%",
 }}
 className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
 >
 <motion.div
 animate={{
 width: isHovered ? 48 : 28,
 height: isHovered ? 48 : 28,
 borderColor: isHovered ? "#10E599" : "#059669",
 backgroundColor: isHovered ? "rgba(16, 229, 153, 0.15)" : "rgba(5, 150, 105, 0.08)",
 boxShadow: isHovered
 ? "0 0 20px rgba(16, 229, 153, 0.6), 0 0 40px rgba(5, 150, 105, 0.3)"
 : "0 0 12px rgba(5, 150, 105, 0.35)",
 }}
 transition={{ type: "spring", damping: 25, stiffness: 350 }}
 className="rounded-full border border-[#059669] backdrop-blur-[1px]"
 />
 </motion.div>

 {/* 2. Direct Center Emerald Pin */}
 <motion.div
 style={{
 x: mouseX,
 y: mouseY,
 translateX: "-50%",
 translateY: "-50%",
 }}
 animate={{
 scale: isHovered ? 0 : 1,
 opacity: isHovered ? 0 : 1,
 }}
 transition={{ duration: 0.15 }}
 className="fixed top-0 left-0 h-2 w-2 rounded-full bg-[#059669] shadow-[0_0_8px_#10E599] pointer-events-none"
 />

 </div>
 );
}

export default SmoothCursor;
