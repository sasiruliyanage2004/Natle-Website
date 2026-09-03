"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Sun, 
  Moon, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  Layers,
  Activity
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import NatleLogo from "@/components/common/NatleLogo";
import { sound } from "@/lib/sound";

interface CamStop {
  y: number;
  z: number;
  fov: number;
  lookY: number;
  rotY: number;
}

const CAM_STOPS: CamStop[] = [
  { y: 1.4,  z: 6.2, fov: 32, lookY: 1.2,  rotY: 0.35 },  // Stage 0: Hero (whole device)
  { y: 3.0,  z: 2.6, fov: 26, lookY: 3.05, rotY: 0.55 },  // Stage 1: Solar cap
  { y: 2.0,  z: 2.0, fov: 24, lookY: 2.0,  rotY: 0.15 },  // Stage 2: Seal / shell
  { y: 1.1,  z: 1.8, fov: 22, lookY: 1.2,  rotY: -0.25 }, // Stage 3: Polycarbonate tube & PCB
  { y: -0.1, z: 1.9, fov: 22, lookY: -0.25,rotY: 0.3 },   // Stage 4: Stainless 316 collar
  { y: -1.9, z: 2.4, fov: 26, lookY: -2.3, rotY: -0.15 }, // Stage 5: Ceramic prongs & cocopeat
];

const STAGE_LABELS = [
  { idx: 0, label: "00 Overview", short: "Overview" },
  { idx: 1, label: "01 Solar Cap", short: "Solar Cap" },
  { idx: 2, label: "02 Seal Shell", short: "Silicone" },
  { idx: 3, label: "03 Logic Tube", short: "PCB Body" },
  { idx: 4, label: "04 Steel Collar", short: "Collar" },
  { idx: 5, label: "05 Soil Tip", short: "Prongs" },
];

// Smooth cubic easing for settling stops
function catmullSample(stops: CamStop[], t: number, key: keyof CamStop): number {
  const n = stops.length;
  const clampedT = Math.max(0, Math.min(1, t));
  const scaled = clampedT * (n - 1);
  const i0 = Math.max(0, Math.min(n - 2, Math.floor(scaled)));
  const localT = scaled - i0;

  // S-curve cubic easing so camera settles into each stop
  const smoothT = localT < 0.5 
    ? 4 * localT * localT * localT 
    : 1 - Math.pow(-2 * localT + 2, 3) / 2;

  const a = stops[i0][key];
  const b = stops[i0 + 1][key];
  return a + (b - a) * smoothT;
}

// Magnetic Micro-Interaction Wrapper
function MagneticElement({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HardwareScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  // State
  const [activeStage, setActiveStage] = useState<number>(0);
  const [scrollFraction, setScrollFraction] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadPercent, setLoadPercent] = useState<number>(15);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isBlurPulsing, setIsBlurPulsing] = useState<boolean>(false);

  // Dynamic Three.js Theme Updater Ref
  const updateSceneThemeRef = useRef<((isDark: boolean) => void) | null>(null);
  const mouseTiltRef = useRef<{ targetX: number; targetY: number }>({ targetX: 0, targetY: 0 });

  // Sync theme changes with Three.js scene
  useEffect(() => {
    if (updateSceneThemeRef.current) {
      updateSceneThemeRef.current(theme === "dark");
    }
  }, [theme]);

  // Loading Screen Progression
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 250);
          return 100;
        }
        return prev + 25;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Check Mobile Viewport & Reduced Motion
  useEffect(() => {
    const checkCapabilities = () => {
      setIsMobile(window.innerWidth < 768);
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(media.matches);
    };

    checkCapabilities();
    window.addEventListener("resize", checkCapabilities);
    return () => window.removeEventListener("resize", checkCapabilities);
  }, []);

  // Desktop Mouse Parallax Tracker
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      // Normalized coordinates from -1 to 1
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      // Clamp to subtle rotation offset (+/- 0.08 rad)
      mouseTiltRef.current = {
        targetX: Math.max(-0.08, Math.min(0.08, normY * 0.08)),
        targetY: Math.max(-0.08, Math.min(0.08, normX * 0.08)),
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Three.js Scene Setup (Only when not mobile fallback)
  useEffect(() => {
    if (isMobile) {
      setIsLoaded(true);
      return;
    }

    const wrap = canvasWrapRef.current;
    if (!wrap) return;

    const isCurrentDark = theme === "dark";
    const bgLight = new THREE.Color(0xF8FAFC);
    const bgDark = new THREE.Color(0x050505);

    // ---------- SCENE & CAMERA ----------
    const scene = new THREE.Scene();
    const initialBg = isCurrentDark ? bgDark : bgLight;
    scene.background = initialBg.clone();
    scene.fog = new THREE.Fog(initialBg.getHex(), 12, 26);

    const camera = new THREE.PerspectiveCamera(
      32,
      wrap.clientWidth / wrap.clientHeight,
      0.1,
      100
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    wrap.appendChild(renderer.domElement);

    // ---------- LIGHTING ----------
    const key = new THREE.DirectionalLight(0xffffff, isCurrentDark ? 1.7 : 2.4);
    key.position.set(4, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -6; key.shadow.camera.right = 6;
    key.shadow.camera.top = 6; key.shadow.camera.bottom = -6;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x10E599, 1.1); // Neon Spring
    rim.position.set(-5, 3, -4);
    scene.add(rim);

    const fill = new THREE.AmbientLight(0xffffff, isCurrentDark ? 0.32 : 0.55);
    scene.add(fill);

    const groundLight = new THREE.PointLight(0x00D2FF, 0.6, 8); // Cyber Cyan
    groundLight.position.set(0, -3.5, 1.5);
    scene.add(groundLight);

    const brandLight = new THREE.PointLight(0x059669, 0.5, 10); // Flora Emerald
    brandLight.position.set(2.5, 2, 3);
    scene.add(brandLight);

    // ---------- MATERIALS (EXACT SPEC HEX TOKENS) ----------
    const titaniumCap = new THREE.MeshStandardMaterial({ color: 0xC9CDD1, metalness: 1.0, roughness: 0.28 });
    const darkMetal   = new THREE.MeshStandardMaterial({ color: 0x8B9096, metalness: 0.9,  roughness: 0.35 });
    const polycarbonate = new THREE.MeshPhysicalMaterial({
      color: 0xDFE7E4, transparent: true, opacity: 0.28, roughness: 0.05,
      transmission: 0.9, thickness: 0.4, metalness: 0
    });
    const oring       = new THREE.MeshStandardMaterial({ color: 0xE8874A, roughness: 0.6, metalness: 0.05 });
    const siliconPcb   = new THREE.MeshStandardMaterial({ color: 0x2F5D46, roughness: 0.6, metalness: 0.2 });
    const chipDark     = new THREE.MeshStandardMaterial({ color: 0x14140F, roughness: 0.5 });
    const ceramic      = new THREE.MeshStandardMaterial({ color: 0xE9E6DF, roughness: 0.35, metalness: 0.1 });
    const stainless    = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, metalness: 0.95, roughness: 0.2 });
    const ledSpring    = new THREE.MeshStandardMaterial({ color: 0x10E599, emissive: 0x10E599, emissiveIntensity: 1.4, roughness: 0.3 });
    const markerMat    = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0x333333, roughness: 0.2, metalness: 0.4 });
    const cocopeat     = new THREE.MeshStandardMaterial({ color: 0x3A2C22, roughness: 1.0, metalness: 0 });
    const cocopeatDark = new THREE.MeshStandardMaterial({ color: 0x241A14, roughness: 1.0 });

    // ---------- 3D DEVICE GROUP ----------
    const device = new THREE.Group();
    scene.add(device);

    // Titanium Cap
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.55, 32), titaniumCap);
    cap.position.y = 3.05; cap.castShadow = true;
    device.add(cap);

    const capRidge = new THREE.Mesh(new THREE.CylinderGeometry(0.345, 0.345, 0.05, 32), darkMetal);
    capRidge.position.y = 2.79;
    device.add(capRidge);

    // LED
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), ledSpring);
    led.position.y = 3.34;
    device.add(led);

    const ledRing = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.015, 12, 32), darkMetal);
    ledRing.rotation.x = Math.PI / 2; ledRing.position.y = 3.33;
    device.add(ledRing);

    // Top O-Ring
    const ringTop = new THREE.Mesh(new THREE.TorusGeometry(0.335, 0.045, 16, 40), oring);
    ringTop.rotation.x = Math.PI / 2; ringTop.position.y = 2.68;
    device.add(ringTop);

    // Polycarbonate Body
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 2.2, 32, 1, true), polycarbonate);
    tube.position.y = 1.5;
    device.add(tube);

    // Silicon PCB
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.9, 0.4), siliconPcb);
    pcb.position.y = 1.5;
    device.add(pcb);

    const chip = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.22), chipDark);
    chip.position.set(0.03, 1.75, 0);
    device.add(chip);

    for (let i = 0; i < 7; i++) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), darkMetal);
      dot.position.set(0.08, 0.7 + i * 0.22, (i % 2 === 0 ? 0.12 : -0.12));
      device.add(dot);
    }

    const markerPositions = [3.34, 2.05, 1.15, 0.35, -2.3];
    markerPositions.forEach((y) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), markerMat);
      m.position.set(0.31, y, 0.05);
      device.add(m);
    });

    // Lower O-Ring
    const ringBottom = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.045, 16, 40), oring);
    ringBottom.rotation.x = Math.PI / 2; ringBottom.position.y = 0.34;
    device.add(ringBottom);

    // Collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.24, 0.9, 32), stainless);
    collar.position.y = -0.25; collar.castShadow = true;
    device.add(collar);

    const collarRidge = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.245, 0.04, 32), darkMetal);
    collarRidge.position.y = -0.7;
    device.add(collarRidge);

    // Ceramic Prongs
    function makeProng(xOff: number) {
      const prong = new THREE.Mesh(new THREE.ConeGeometry(0.07, 1.05, 16), ceramic);
      prong.position.set(xOff, -1.35, 0);
      prong.castShadow = true;
      return prong;
    }
    device.add(makeProng(-0.09), makeProng(0.09));

    // ---------- SOIL GROUP ----------
    const soilGroup = new THREE.Group();
    scene.add(soilGroup);

    const soilGeo = new THREE.BoxGeometry(2.6, 2.6, 2.6, 6, 6, 6);
    const posAttr = soilGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      const n = (Math.sin(x * 7) + Math.cos(y * 9) + Math.sin(z * 5)) * 0.02;
      posAttr.setXYZ(i, x + n, y + n * 0.6, z + n);
    }
    soilGeo.computeVertexNormals();

    const soilBlock = new THREE.Mesh(soilGeo, cocopeat);
    soilBlock.position.y = -2.9;
    soilBlock.receiveShadow = true; soilBlock.castShadow = true;
    soilGroup.add(soilBlock);

    for (let i = 0; i < 26; i++) {
      const s = 0.03 + Math.random() * 0.07;
      const crumb = new THREE.Mesh(
        new THREE.DodecahedronGeometry(s, 0),
        Math.random() > 0.5 ? cocopeat : cocopeatDark
      );
      const ang = Math.random() * Math.PI * 2;
      const r = 0.9 + Math.random() * 0.5;
      crumb.position.set(Math.cos(ang) * r, -1.6 + Math.random() * 0.15, Math.sin(ang) * r * 0.6);
      crumb.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      crumb.castShadow = true;
      soilGroup.add(crumb);
    }

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.ShadowMaterial({ opacity: isCurrentDark ? 0.25 : 0.12 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -4.2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Theme Updater
    updateSceneThemeRef.current = (dark: boolean) => {
      const targetBg = dark ? bgDark : bgLight;
      scene.background = targetBg.clone();
      scene.fog = new THREE.Fog(targetBg.getHex(), 12, 26);
      fill.intensity = dark ? 0.32 : 0.55;
      key.intensity = dark ? 1.7 : 2.4;
      ground.material.opacity = dark ? 0.25 : 0.12;
    };

    // ---------- RENDER LOOP WITH SPRING SETTLING & TILT ----------
    let scrollProgress = 0;
    let targetProgress = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let lastStage = 0;
    let animId: number;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScroll = container.scrollHeight - window.innerHeight;
      const current = -rect.top;
      const clamped = Math.max(0, Math.min(1, current / totalScroll));
      targetProgress = clamped;
      setScrollFraction(clamped);

      const stage = Math.min(5, Math.floor(clamped * 6));
      if (stage !== lastStage) {
        lastStage = stage;
        setActiveStage(stage);
        sound.playClick();
        
        // Trigger subtle depth-of-field blur pulse on stop change
        setIsBlurPulsing(true);
        setTimeout(() => setIsBlurPulsing(false), 450);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    function updateCamera(t: number) {
      if (prefersReducedMotion) {
        // Static camera for reduced-motion users
        camera.position.set(0.2, CAM_STOPS[0].y, CAM_STOPS[0].z);
        camera.fov = CAM_STOPS[0].fov;
        camera.updateProjectionMatrix();
        camera.lookAt(0, CAM_STOPS[0].lookY, 0);
        return;
      }

      const y = catmullSample(CAM_STOPS, t, "y");
      const z = catmullSample(CAM_STOPS, t, "z");
      const fov = catmullSample(CAM_STOPS, t, "fov");
      const lookY = catmullSample(CAM_STOPS, t, "lookY");
      const rotY = catmullSample(CAM_STOPS, t, "rotY");

      camera.position.set(Math.sin(rotY) * 0.6, y, z);
      camera.fov = fov;
      camera.updateProjectionMatrix();
      camera.lookAt(0, lookY, 0);

      // Smooth cursor parallax tilt
      currentTiltX += (mouseTiltRef.current.targetX - currentTiltX) * 0.08;
      currentTiltY += (mouseTiltRef.current.targetY - currentTiltY) * 0.08;

      device.rotation.x = currentTiltX;
      device.rotation.y = rotY * 0.6 + currentTiltY;
      soilGroup.rotation.y = rotY * 0.6;
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      scrollProgress += (targetProgress - scrollProgress) * 0.09;
      updateCamera(scrollProgress);
      led.material.emissiveIntensity = 1.2 + Math.sin(Date.now() * 0.003) * 0.3;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      if (!wrap) return;
      camera.aspect = wrap.clientWidth / wrap.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (wrap.contains(renderer.domElement)) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, [isMobile, prefersReducedMotion]);

  // Jump to stage via progress rail click
  const scrollToStage = useCallback((stageIdx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const totalScroll = container.scrollHeight - window.innerHeight;
    const targetY = container.offsetTop + (stageIdx / 5) * totalScroll;
    window.scrollTo({ top: targetY, behavior: "smooth" });
    sound.playClick();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hardware-scrollytelling"
      aria-label="3D Interactive Soil Telemetry Probe"
      className="relative h-[600vh] bg-[#F8FAFC] dark:bg-[#050505] text-[#09131F] dark:text-white transition-colors duration-400 select-none font-sans"
    >
      {/* ================= ACCESSIBILITY: SKIP LINK ================= */}
      <a 
        href="#after-hardware-section" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-24 focus:left-6 z-50 px-4 py-2 bg-[#059669] dark:bg-[#10E599] text-white dark:text-slate-950 rounded-full font-mono text-xs font-bold shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Skip 3D Probe Animation &rarr; Next Section
      </a>

      {/* ================= 1. BRANDED PRELOADER SCREEN ================= */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#050505]"
          >
            <div className="flex flex-col items-center max-w-xs text-center space-y-5">
              <NatleLogo showTagline={false} />
              
              {/* Slim Gradient Progress Bar */}
              <div className="w-48 h-1 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#059669] via-[#10E599] to-[#00D2FF]"
                  style={{ width: `${loadPercent}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <span className="font-mono text-[10.5px] tracking-widest uppercase text-slate-500 dark:text-zinc-500">
                Initializing 3D Telemetry Engine...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pinned 100vh Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* ================= 2. THREE.JS 3D CANVAS / MOBILE FALLBACK ================= */}
        {isMobile ? (
          /* Mobile / Low-Power High-End Static Fallback */
          <div className="absolute inset-0 flex items-center justify-center z-10 p-6 pointer-events-none">
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-64 h-80 max-w-full"
            >
              <Image
                src="/images/probe-assembled.jpg"
                alt="NATLE Soil Intelligence Probe"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
              />
            </motion.div>
          </div>
        ) : (
          /* Desktop WebGL Canvas with Fade-in & Depth-of-Field Pulse */
          <div 
            ref={canvasWrapRef} 
            className={`absolute inset-0 w-full h-full z-10 transition-all duration-1000 ${
              isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
            }`} 
          />
        )}

        {/* Optical Depth-of-Field Blur Pulse Overlay on Stop Change */}
        <div 
          className={`absolute inset-0 pointer-events-none z-15 transition-all duration-400 ease-out ${
            isBlurPulsing 
              ? "backdrop-blur-[4px] bg-emerald-500/[0.02]" 
              : "backdrop-blur-none bg-transparent"
          }`} 
        />

        {/* ================= 3. THIN VERTICAL PROGRESS RAIL ================= */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-auto">
          {/* Vertical Track Tube */}
          <div className="relative w-[2px] h-48 sm:h-56 bg-slate-200 dark:bg-white/10 rounded-full">
            {/* Active Emerald-Neon Fill */}
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#059669] via-[#10E599] to-[#00D2FF]"
              style={{ height: `${Math.min(100, scrollFraction * 100)}%` }}
            />
          </div>

          {/* 6 Clickable Stage Dots */}
          <div className="absolute inset-y-0 -left-[5px] flex flex-col justify-between py-1">
            {STAGE_LABELS.map((stage) => {
              const isActive = activeStage === stage.idx;
              return (
                <button
                  key={stage.idx}
                  onClick={() => scrollToStage(stage.idx)}
                  className="group relative flex items-center justify-center w-3 h-3 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-[#059669] dark:focus-visible:ring-[#10E599] focus-visible:outline-none"
                  aria-label={`Jump to stage ${stage.label}`}
                >
                  <span 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#059669] dark:bg-[#10E599] scale-125 shadow-[0_0_8px_#10E599]"
                        : "bg-slate-300 dark:bg-white/25 group-hover:scale-110 group-hover:bg-[#059669]"
                    }`}
                  />
                  {/* Floating Tooltip */}
                  <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-950 whitespace-nowrap shadow-md pointer-events-none">
                    {stage.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 4. TOP FLOATING BAR (NAVBAR CLEARANCE) ================= */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-12 pt-24 sm:pt-28 pb-4 pointer-events-none">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10E599] animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-slate-900 dark:text-white">
              TERRA.SENSE <span className="font-normal text-slate-500 dark:text-slate-400">&bull; NATLE TELEMETRY PROBE</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 pr-6 sm:pr-8">
            <span className="font-mono text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400">
              0{activeStage} / 05
            </span>

            {/* Global Theme Toggle Button with Magnetic Feel */}
            <MagneticElement>
              <button
                onClick={toggleTheme}
                className="pointer-events-auto w-9 h-9 rounded-full border border-slate-200/80 dark:border-emerald-500/20 bg-white/80 dark:bg-[#0A100C]/90 backdrop-blur-xl flex items-center justify-center text-[#059669] dark:text-[#10E599] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#059669] dark:focus-visible:ring-[#10E599] focus-visible:outline-none"
                aria-label="Toggle Theme"
                title="Switch light/dark theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </MagneticElement>
          </div>
        </div>

        {/* ================= 5. OVERLAY COPY STAGES ================= */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto flex items-center justify-between p-6 sm:p-12 pointer-events-none">
          
          {/* STAGE 0: HERO */}
          <div 
            className={`absolute top-[32%] sm:top-[34%] left-6 sm:left-14 max-w-sm transition-all duration-500 ${
              activeStage === 0 ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-[#047857] dark:text-[#10E599] uppercase mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10E599] animate-pulse" />
              <span>soil probe &bull; model 02</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.03] text-slate-900 dark:text-white mb-2">
              Built from{" "}
              <em className="font-serif italic font-normal gradient-text not-italic">
                what
              </em>
              <br />
              it&apos;s buried in.
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal mt-3.5 max-w-xs">
              Every layer of the housing is chosen for a life spent underground &mdash; sealed against moisture, readable by light, tuned to the frequency of roots.
            </p>

            {/* Magnetic CTA Button with Visible Focus States */}
            <div className="mt-6 pointer-events-auto inline-block">
              <MagneticElement>
                <Link
                  href="/contact"
                  className="gradient-btn group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#021A12] shadow-md hover:scale-105 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#059669] dark:focus-visible:ring-[#10E599] focus-visible:outline-none"
                >
                  <span>REQUEST DEMO</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticElement>
            </div>

            <div className="mt-8 flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.14em] text-slate-500 dark:text-slate-400 uppercase font-bold">
              <div className="w-[1px] h-8 bg-gradient-to-b from-[#059669] dark:from-[#10E599] to-transparent opacity-50" />
              <span>scroll to descend</span>
            </div>
          </div>

          {/* STAGE 1: CAP */}
          <div 
            className={`absolute top-[18%] right-8 sm:right-16 max-w-xs text-right transition-all duration-500 ${
              activeStage === 1 ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-[#F59E0B] uppercase mb-2 flex-row-reverse">
              <span>01 &mdash; cap</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              solar.pv cell
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal ml-auto">
              A single photovoltaic disc trickle-charges the internal cell whenever the crown breaks the soil line.
            </p>
          </div>

          {/* STAGE 2: SHELL */}
          <div 
            className={`absolute top-[32%] left-6 sm:left-14 max-w-xs transition-all duration-500 ${
              activeStage === 2 ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-[#00D2FF] uppercase mb-2">
              <span>02 &mdash; shell</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              silicon.seal jacket
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
              Cast silicone sleeve absorbs the shock of insertion and keeps groundwater out of the electronics bay.
            </p>
          </div>

          {/* STAGE 3: BODY */}
          <div 
            className={`absolute top-[42%] right-8 sm:right-16 max-w-xs text-right transition-all duration-500 ${
              activeStage === 3 ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-[#3B82F6] uppercase mb-2 flex-row-reverse">
              <span>03 &mdash; body</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              polycarbonate tube
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal ml-auto">
              Optically clear polycarbonate lets the board&apos;s status lights read through the wall without a window cut.
            </p>
          </div>

          {/* STAGE 4: COLLAR */}
          <div 
            className={`absolute top-[40%] left-6 sm:left-14 max-w-xs transition-all duration-500 ${
              activeStage === 4 ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-[#84CC16] uppercase mb-2">
              <span>04 &mdash; collar</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              stainless.316 band
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
              A marine-grade steel collar anchors the tip assembly and grounds the sensor array against static drift.
            </p>
          </div>

          {/* STAGE 5: TIP & FINAL PANEL */}
          <div 
            className={`absolute top-[28%] sm:top-[30%] right-6 sm:right-14 max-w-sm text-right transition-all duration-500 ${
              activeStage === 5 ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-[#047857] dark:text-[#10E599] uppercase mb-2 flex-row-reverse">
              <span>05 &mdash; tip</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              hosma.ceramic prongs
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal ml-auto mb-5">
              Twin ceramic prongs read moisture and conductivity a few centimetres down, where the roots actually drink.
            </p>

            {/* Glass Card Final Spec Panel */}
            <div className="glass-card rounded-3xl p-5 sm:p-6 text-left shadow-2xl border border-slate-200/90 dark:border-emerald-500/20 backdrop-blur-2xl pointer-events-auto">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-[#047857] dark:text-[#10E599] uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10E599] animate-pulse" />
                <span>field data</span>
              </div>
              
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-1">
                Reads every 4 hours
              </h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-4 font-normal">
                Moisture, temperature and salinity, synced over LoRaWAN to the NATLE FieldOS network.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-200/70 dark:border-white/10 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5 text-slate-600 dark:text-zinc-400">
                  <span>battery life</span>
                  <b className="text-slate-900 dark:text-white font-bold">6 seasons</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5 text-slate-600 dark:text-zinc-400">
                  <span>range</span>
                  <b className="text-slate-900 dark:text-white font-bold">2.1 km LoRa</b>
                </div>
                <div className="flex justify-between py-1 text-slate-600 dark:text-zinc-400">
                  <span>depth</span>
                  <b className="text-slate-900 dark:text-white font-bold">4 &ndash; 12 cm</b>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Anchor target for skip link */}
      <div id="after-hardware-section" className="relative -top-24" />
    </section>
  );
}
