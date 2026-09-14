"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

/**
 * NATLE Hero 3D — Cyber Smart Device & Wired Grid Controller
 *
 * An interactive 3D Smart Device / Phone Terminal running a custom environment control app:
 * - 3D Smartphone chassis with beveled metallic frame, glass display & camera island.
 * - Dynamic 2D Canvas OS interface ("NATLE OS // GRID CONTROLLER") rendered to high-res texture.
 * - Interactive tactile Theme Switch on the phone screen that toggles Dark / Light mode site-wide.
 * - Glowing 3D braided cyber cables (wires) physically emerging from phone ports and
 *   connecting across 3D space into the website's Navbar, Headline, and Stats sections.
 * - Real-time electrical energy sparks / packets pulsing continuously along the cables.
 * - Power Surge wave effect on toggle: energetic light pulse races down all cables into the site.
 * - Synthesized sci-fi relay click audio feedback via Web Audio API (no external assets needed).
 * - Drag-to-rotate + responsive mouse parallax tilt.
 */

// Synthesize a clean, subtle sci-fi relay click sound
function playRelayClickSound(isDarkTarget: boolean) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Transient click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(isDarkTarget ? 880 : 1320, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);

    // Warm power-surge hum
    const hum = ctx.createOscillator();
    const humGain = ctx.createGain();
    hum.type = "triangle";
    hum.frequency.setValueAtTime(isDarkTarget ? 110 : 220, now + 0.02);
    hum.frequency.exponentialRampToValueAtTime(isDarkTarget ? 220 : 440, now + 0.22);
    humGain.gain.setValueAtTime(0.08, now + 0.02);
    humGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    hum.connect(humGain);
    humGain.connect(ctx.destination);
    hum.start(now + 0.02);
    hum.stop(now + 0.25);
  } catch {
    // AudioContext blocked or not supported — silent fallback
  }
}

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDarkState, setIsDarkState] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  // Sync state with DOM dark class
  useEffect(() => {
    const checkDark = () => document.documentElement.classList.contains("dark");
    setIsDarkState(checkDark());

    const obs = new MutationObserver(() => {
      setIsDarkState(checkDark());
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Master function to toggle theme site-wide
  const triggerThemeToggle = useCallback(() => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    const nextDark = !isCurrentlyDark;

    playRelayClickSound(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("natle_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("natle_theme", "light");
    }

    setIsDarkState(nextDark);
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 900);

    // Dispatch global event for sync
    window.dispatchEvent(new Event("themechange"));
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const isDark = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    // ─────────────────────────────────────────────────────────────────────────
    // 1. RENDERER & SCENE SETUP
    // ─────────────────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark() ? 1.15 : 1.0;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.6);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const setRootPos = () => {
      const desktop = width >= 1024;
      // Position phone gracefully on the right half on desktop, centered on mobile
      rootGroup.position.set(desktop ? 2.15 : 0, desktop ? 0.05 : 0.4, 0);
      rootGroup.scale.setScalar(desktop ? 1.0 : Math.min(0.85, width / 768));
    };
    setRootPos();

    // Phone assembly group (rotates with drag & parallax)
    const phoneRig = new THREE.Group();
    phoneRig.rotation.y = -0.22; // slight angle towards camera
    phoneRig.rotation.x = 0.08;
    rootGroup.add(phoneRig);

    // ─────────────────────────────────────────────────────────────────────────
    // 2. PROCEDURAL 3D SMARTPHONE CHASSIS
    // ─────────────────────────────────────────────────────────────────────────
    const PHONE_W = 1.62;
    const PHONE_H = 3.32;
    const PHONE_R = 0.22;
    const PHONE_D = 0.13;

    // Rounded rectangle shape for phone body
    const phoneShape = new THREE.Shape();
    const x0 = -PHONE_W / 2;
    const y0 = -PHONE_H / 2;
    phoneShape.moveTo(x0 + PHONE_R, y0);
    phoneShape.lineTo(x0 + PHONE_W - PHONE_R, y0);
    phoneShape.quadraticCurveTo(x0 + PHONE_W, y0, x0 + PHONE_W, y0 + PHONE_R);
    phoneShape.lineTo(x0 + PHONE_W, y0 + PHONE_H - PHONE_R);
    phoneShape.quadraticCurveTo(x0 + PHONE_W, y0 + PHONE_H, x0 + PHONE_W - PHONE_R, y0 + PHONE_H);
    phoneShape.lineTo(x0 + PHONE_R, y0 + PHONE_H);
    phoneShape.quadraticCurveTo(x0, y0 + PHONE_H, x0, y0 + PHONE_H - PHONE_R);
    phoneShape.lineTo(x0, y0 + PHONE_R);
    phoneShape.quadraticCurveTo(x0, y0, x0 + PHONE_R, y0);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: PHONE_D,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    const chassisGeo = new THREE.ExtrudeGeometry(phoneShape, extrudeSettings);
    chassisGeo.center();

    // Phone body material: titanium/ceramic with high-specular chamfer
    const chassisMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(isDark() ? 0x0f172a : 0xe2e8f0),
      metalness: 0.92,
      roughness: 0.22,
      envMapIntensity: 1.5,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    phoneRig.add(chassisMesh);

    // Camera bump on back
    const camPillGeo = new THREE.CapsuleGeometry(0.18, 0.42, 8, 16);
    const camPillMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      metalness: 0.95,
      roughness: 0.1,
    });
    const camPill = new THREE.Mesh(camPillGeo, camPillMat);
    camPill.position.set(-0.45, 1.05, -PHONE_D / 2 - 0.03);
    phoneRig.add(camPill);

    // ─────────────────────────────────────────────────────────────────────────
    // 3. DYNAMIC SCREEN OS DISPLAY (CanvasTexture)
    // ─────────────────────────────────────────────────────────────────────────
    const SCREEN_W = 1.54;
    const SCREEN_H = 3.22;
    const screenGeo = new THREE.PlaneGeometry(SCREEN_W, SCREEN_H);

    const cv = document.createElement("canvas");
    cv.width = 512;
    cv.height = 1024;
    const ctx = cv.getContext("2d")!;

    const screenTexture = new THREE.CanvasTexture(cv);
    screenTexture.colorSpace = THREE.SRGBColorSpace;

    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: true,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = PHONE_D / 2 + 0.036;
    phoneRig.add(screenMesh);

    // Front protective glass cover (subtle reflection & clearcoat)
    const glassCoverGeo = new THREE.PlaneGeometry(SCREEN_W, SCREEN_H);
    const glassCoverMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 0.35,
      transparent: true,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1.0,
      depthWrite: false,
    });
    const glassCover = new THREE.Mesh(glassCoverGeo, glassCoverMat);
    glassCover.position.z = PHONE_D / 2 + 0.039;
    phoneRig.add(glassCover);

    // Dynamic Island pill at top
    const islandGeo = new THREE.CapsuleGeometry(0.045, 0.22, 6, 12);
    const islandMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.rotation.z = Math.PI / 2;
    islandMesh.position.set(0, 1.45, PHONE_D / 2 + 0.041);
    phoneRig.add(islandMesh);

    // Tiny green camera indicator LED inside island
    const ledGeo = new THREE.CircleGeometry(0.015, 8);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0.12, 1.45, PHONE_D / 2 + 0.042);
    phoneRig.add(ledMesh);

    // Switch animation progress: 0 = Light Mode, 1 = Dark Mode
    let switchAnimProgress = isDark() ? 1.0 : 0.0;
    let switchTarget = isDark() ? 1.0 : 0.0;

    // Draw the high-tech mobile UI on the 2D canvas
    const drawScreenUI = (time: number, powerSurge: number) => {
      const dark = isDark();

      // Background gradient
      if (dark) {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
        bgGrad.addColorStop(0, "#070B14");
        bgGrad.addColorStop(0.5, "#0A1224");
        bgGrad.addColorStop(1, "#03060D");
        ctx.fillStyle = bgGrad;
      } else {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
        bgGrad.addColorStop(0, "#F1F5F9");
        bgGrad.addColorStop(0.5, "#E2E8F0");
        bgGrad.addColorStop(1, "#CBD5E1");
        ctx.fillStyle = bgGrad;
      }
      ctx.fillRect(0, 0, 512, 1024);

      // Subtle cyber grid pattern on screen
      ctx.strokeStyle = dark ? "rgba(30, 127, 232, 0.07)" : "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= 512; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }
      for (let y = 0; y <= 1024; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // 1. Status Bar (Time, 5G, Battery)
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");

      ctx.fillStyle = dark ? "#F8FAFC" : "#0F172A";
      ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${hrs}:${mins}`, 42, 60);

      // 5G & Battery icon on right
      ctx.textAlign = "right";
      ctx.font = "bold 16px monospace";
      ctx.fillText("5G  100%", 470, 60);

      // Battery outline
      ctx.strokeStyle = dark ? "#94A3B8" : "#475569";
      ctx.lineWidth = 2;
      ctx.strokeRect(476, 46, 26, 14);
      ctx.fillStyle = "#10B981";
      ctx.fillRect(478, 48, 22, 10);

      // 2. OS Header & Logo Badge
      ctx.textAlign = "center";
      ctx.fillStyle = dark ? "rgba(30, 127, 232, 0.15)" : "rgba(30, 127, 232, 0.10)";
      ctx.beginPath();
      ctx.roundRect(136, 100, 240, 36, 18);
      ctx.fill();
      ctx.strokeStyle = "#1E7FE8";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#1E7FE8";
      ctx.font = "bold 13px monospace";
      ctx.fillText("● NATLE OS // v3.4", 256, 123);

      // Title
      ctx.fillStyle = dark ? "#FFFFFF" : "#0F172A";
      ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("GRID CONTROLLER", 256, 180);

      ctx.fillStyle = dark ? "#64748B" : "#475569";
      ctx.font = "14px monospace";
      ctx.fillText("ENVIRONMENT POWER & THEME", 256, 206);

      // 3. THE MASTER THEME TOGGLE SWITCH CARD (The Hero Element)
      const cardY = 240;
      const cardH = 340;

      // Card background
      ctx.fillStyle = dark ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.90)";
      ctx.beginPath();
      ctx.roundRect(32, cardY, 448, cardH, 24);
      ctx.fill();

      // Card border with glow
      ctx.strokeStyle = dark
        ? "rgba(0, 229, 255, " + (0.4 + powerSurge * 0.5) + ")"
        : "rgba(30, 127, 232, " + (0.3 + powerSurge * 0.5) + ")";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = dark ? "#00E5FF" : "#1E7FE8";
      ctx.shadowBlur = 12 * (1 + powerSurge * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Card Header
      ctx.fillStyle = dark ? "#38BDF8" : "#0284C7";
      ctx.font = "bold 15px monospace";
      ctx.textAlign = "left";
      ctx.fillText("MASTER POWER SWITCH", 60, cardY + 45);

      ctx.fillStyle = dark ? "#94A3B8" : "#64748B";
      ctx.font = "13px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("Tap phone to toggle website theme", 60, cardY + 70);

      // THE INTERACTIVE SWITCH TRACK
      const switchTrackY = cardY + 105;
      const switchTrackW = 392;
      const switchTrackH = 110;
      const switchTrackX = 60;

      // Switch track background gradient based on switchAnimProgress
      const trackGrad = ctx.createLinearGradient(switchTrackX, 0, switchTrackX + switchTrackW, 0);
      if (dark) {
        trackGrad.addColorStop(0, "#08162e");
        trackGrad.addColorStop(1, "#034078");
      } else {
        trackGrad.addColorStop(0, "#bae6fd");
        trackGrad.addColorStop(1, "#fef08a");
      }
      ctx.fillStyle = trackGrad;
      ctx.beginPath();
      ctx.roundRect(switchTrackX, switchTrackY, switchTrackW, switchTrackH, 55);
      ctx.fill();

      // Track border
      ctx.strokeStyle = dark ? "rgba(0, 229, 255, 0.6)" : "rgba(234, 179, 8, 0.8)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Labels inside track
      ctx.font = "bold 16px monospace";
      ctx.fillStyle = dark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.45)";
      ctx.textAlign = "left";
      ctx.fillText("☀️ LIGHT", switchTrackX + 32, switchTrackY + 62);
      ctx.textAlign = "right";
      ctx.fillText("🌙 DARK", switchTrackX + switchTrackW - 32, switchTrackY + 62);

      // THE SLIDING KNOB
      const knobR = 46;
      const knobMinX = switchTrackX + 55;
      const knobMaxX = switchTrackX + switchTrackW - 55;
      const knobCurX = knobMinX + (knobMaxX - knobMinX) * switchAnimProgress;
      const knobCurY = switchTrackY + switchTrackH / 2;

      // Knob glow shadow
      ctx.shadowColor = dark ? "#00E5FF" : "#F59E0B";
      ctx.shadowBlur = 18;

      ctx.fillStyle = dark ? "#00E5FF" : "#FFFFFF";
      ctx.beginPath();
      ctx.arc(knobCurX, knobCurY, knobR, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Icon inside knob
      ctx.textAlign = "center";
      ctx.font = "32px sans-serif";
      ctx.fillText(dark ? "🌙" : "☀️", knobCurX, knobCurY + 11);

      // Status pill under switch
      const statusPillY = cardY + 250;
      ctx.fillStyle = dark ? "rgba(16, 185, 129, 0.15)" : "rgba(30, 127, 232, 0.12)";
      ctx.beginPath();
      ctx.roundRect(60, statusPillY, switchTrackW, 52, 14);
      ctx.fill();

      ctx.fillStyle = dark ? "#10B981" : "#1E7FE8";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      const statusText = dark
        ? "⚡ NIGHT OPS ACTIVE // WIRED TO SITE"
        : "☀️ DAYLIGHT GRID ACTIVE // WIRED TO SITE";
      ctx.fillText(statusText, 256, statusPillY + 32);

      // 4. TELEMETRY CARDS (Active Wires & Grid Output)
      const statY = 610;

      // Left sub-card
      ctx.fillStyle = dark ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.roundRect(32, statY, 216, 110, 16);
      ctx.fill();
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.fillStyle = dark ? "#94A3B8" : "#64748B";
      ctx.font = "12px monospace";
      ctx.fillText("ACTIVE CONDUITS", 50, statY + 34);

      ctx.fillStyle = "#10B981";
      ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("4 / 4 ONLINE", 50, statY + 68);

      ctx.fillStyle = dark ? "#64748B" : "#94A3B8";
      ctx.font = "11px monospace";
      ctx.fillText("● 100% FLOW STABLE", 50, statY + 92);

      // Right sub-card
      ctx.fillStyle = dark ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.roundRect(264, statY, 216, 110, 16);
      ctx.fill();
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
      ctx.stroke();

      ctx.fillStyle = dark ? "#94A3B8" : "#64748B";
      ctx.font = "12px monospace";
      ctx.fillText("GRID VOLTAGE", 282, statY + 34);

      ctx.fillStyle = "#1E7FE8";
      ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("1.21 GW", 282, statY + 68);

      ctx.fillStyle = dark ? "#64748B" : "#94A3B8";
      ctx.font = "11px monospace";
      ctx.fillText("LATENCY: 1.2ms", 282, statY + 92);

      // 5. LIVE SINE WAVE OSCILLOSCOPE (Bottom of phone screen)
      const waveBoxY = 744;
      const waveBoxH = 140;
      ctx.fillStyle = dark ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.roundRect(32, waveBoxY, 448, waveBoxH, 16);
      ctx.fill();
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
      ctx.stroke();

      ctx.fillStyle = dark ? "#38BDF8" : "#0284C7";
      ctx.font = "bold 12px monospace";
      ctx.fillText("LIVE ENERGY CONDUIT PULSE", 50, waveBoxY + 30);

      // Draw sine wave
      ctx.beginPath();
      ctx.strokeStyle = dark ? "#00E5FF" : "#1E7FE8";
      ctx.lineWidth = 2.5;
      const waveCenterY = waveBoxY + 85;
      for (let x = 50; x <= 462; x += 4) {
        const rad = (x * 0.035) + time * 4.0;
        const y = waveCenterY + Math.sin(rad) * 22 * (1 + powerSurge * 0.8);
        if (x === 50) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 6. Home Indicator Bar
      ctx.fillStyle = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
      ctx.beginPath();
      ctx.roundRect(176, 985, 160, 6, 3);
      ctx.fill();

      screenTexture.needsUpdate = true;
    };

    // Initial draw
    drawScreenUI(0, 0);

    // ─────────────────────────────────────────────────────────────────────────
    // 4. PHYSICAL 3D WIRES / CONDUITS CONNECTING TO WEBSITE ("wires magin sambanda")
    // ─────────────────────────────────────────────────────────────────────────
    // We define 4 3D Spline Curves emerging from the phone and branching into the site:
    // Cable 1: Towards top-left (Navbar & NATLE logo)
    // Cable 2: Towards center-left (Hero headline "Ideas, engineered into growth")
    // Cable 3: Towards bottom-left (CTA Buttons & Metrics 120+ Products)
    // Cable 4: Loops downward into a grounding holographic base ring

    const CABLE_CURVES = [
      // Cable 1: To Navbar / Top-Left
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, -PHONE_H / 2, 0.0),
        new THREE.Vector3(-0.3, -1.9, 0.15),
        new THREE.Vector3(-1.0, -1.4, 0.45),
        new THREE.Vector3(-2.2, 0.4, 0.35),
        new THREE.Vector3(-3.4, 1.8, 0.1),
        new THREE.Vector3(-4.8, 2.8, -0.2),
      ]),
      // Cable 2: To Hero Text / Center-Left
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-PHONE_W / 2 + 0.1, -1.2, 0.0),
        new THREE.Vector3(-1.2, -1.0, 0.35),
        new THREE.Vector3(-2.4, -0.4, 0.25),
        new THREE.Vector3(-3.6, -0.2, 0.15),
        new THREE.Vector3(-5.2, -0.25, -0.1),
      ]),
      // Cable 3: To CTA Buttons & Stats / Bottom-Left
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.18, -PHONE_H / 2, 0.0),
        new THREE.Vector3(-0.1, -2.1, 0.2),
        new THREE.Vector3(-1.2, -2.3, 0.3),
        new THREE.Vector3(-2.8, -2.0, 0.15),
        new THREE.Vector3(-4.6, -2.1, -0.1),
      ]),
      // Cable 4: To Ground Power Ring / Downward
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(PHONE_W / 2 - 0.1, -1.0, 0.0),
        new THREE.Vector3(1.2, -1.5, 0.2),
        new THREE.Vector3(1.0, -2.4, 0.1),
        new THREE.Vector3(0.2, -2.6, -0.1),
        new THREE.Vector3(-0.4, -2.5, -0.2),
      ]),
    ];

    const cableColors = [
      0x00e5ff, // Cyan conduit (to Navbar)
      0x1e7fe8, // Azure conduit (to Headline)
      0x10b981, // Emerald conduit (to Stats/CTA)
      0xffb300, // Gold conduit (grounding)
    ];

    const cableGroup = new THREE.Group();
    rootGroup.add(cableGroup);

    const cableMeshes: THREE.Mesh[] = [];
    const cableMaterials: THREE.MeshStandardMaterial[] = [];

    CABLE_CURVES.forEach((curve, i) => {
      // 3D Tube geometry for physical cable
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.038, 12, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(cableColors[i]),
        emissive: new THREE.Color(cableColors[i]),
        emissiveIntensity: isDark() ? 0.7 : 0.35,
        roughness: 0.25,
        metalness: 0.8,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      cableGroup.add(tubeMesh);
      cableMeshes.push(tubeMesh);
      cableMaterials.push(tubeMat);

      // Port collar plug where cable inserts into the phone
      const startPt = curve.getPoint(0);
      const collarGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.12, 16);
      const collarMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.95,
        roughness: 0.1,
      });
      const collar = new THREE.Mesh(collarGeo, collarMat);
      collar.position.copy(startPt);
      phoneRig.add(collar);
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 5. ENERGY PACKETS / SPARKS TRAVELING CONTINUOUSLY ALONG THE WIRES
    // ─────────────────────────────────────────────────────────────────────────
    // Multiple luminous energy pulses gliding down the cables into the website
    const PACKETS_PER_CABLE = 6;
    interface EnergyPacket {
      mesh: THREE.Mesh;
      cableIdx: number;
      t: number;
      speed: number;
    }

    const packetGeo = new THREE.SphereGeometry(0.062, 10, 10);
    const energyPackets: EnergyPacket[] = [];

    CABLE_CURVES.forEach((curve, cableIdx) => {
      for (let p = 0; p < PACKETS_PER_CABLE; p++) {
        const pMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
        });
        const pMesh = new THREE.Mesh(packetGeo, pMat);
        cableGroup.add(pMesh);
        energyPackets.push({
          mesh: pMesh,
          cableIdx,
          t: p / PACKETS_PER_CABLE,
          speed: 0.25 + Math.random() * 0.15,
        });
      }
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 6. HOLOGRAPHIC GROUND RING & DOCKING BASE
    // ─────────────────────────────────────────────────────────────────────────
    const baseGroup = new THREE.Group();
    baseGroup.position.set(0, -2.6, 0);
    rootGroup.add(baseGroup);

    [0.6, 1.1, 1.6].forEach((r, idx) => {
      const g = new THREE.TorusGeometry(r, 0.016, 16, 64);
      const m = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x00e5ff : 0x1e7fe8,
        transparent: true,
        opacity: isDark() ? 0.6 : 0.35,
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.x = Math.PI / 2;
      baseGroup.add(mesh);
    });

    // Upward holographic floating dust particles
    const DUST_N = 180;
    const dustPos = new Float32Array(DUST_N * 3);
    const dustV = new Float32Array(DUST_N);
    for (let i = 0; i < DUST_N; i++) {
      dustPos[i * 3] = -2.5 + Math.random() * 5.0;
      dustPos[i * 3 + 1] = -2.5 + Math.random() * 5.0;
      dustPos[i * 3 + 2] = -1.5 + Math.random() * 3.0;
      dustV[i] = 0.2 + Math.random() * 0.4;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.042,
      transparent: true,
      opacity: isDark() ? 0.65 : 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    rootGroup.add(new THREE.Points(dustGeo, dustMat));

    // ─────────────────────────────────────────────────────────────────────────
    // 7. LIGHTING SETUP
    // ─────────────────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(isDark() ? 0x0f172a : 0xf8fafc, isDark() ? 1.8 : 3.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark() ? 2.8 : 3.2);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    // Colored accent point lights reflecting off the phone chassis
    const cyanLight = new THREE.PointLight(0x00e5ff, isDark() ? 3.5 : 2.2, 12);
    cyanLight.position.set(2, 2, 4);
    const azureLight = new THREE.PointLight(0x1e7fe8, isDark() ? 3.0 : 2.0, 10);
    azureLight.position.set(-2, -1, 3);
    scene.add(cyanLight, azureLight);

    // ─────────────────────────────────────────────────────────────────────────
    // 8. INTERACTION (Raycaster for click + Drag rotation & Parallax)
    // ─────────────────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    let tarX = 0, tarY = 0, curX = 0, curY = 0;
    let dragging = false, pMX = 0, pMY = 0, velX = 0, velY = 0;
    let powerSurgeIntensity = 0.0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      pMX = e.clientX;
      pMY = e.clientY;
      velX = velY = 0;
    };

    const onUp = (e: PointerEvent) => {
      // Check if this was a click (not a long drag)
      const dist = Math.hypot(e.clientX - pMX, e.clientY - pMY);
      if (dist < 8) {
        // Raycast against the phone screen
        const rect = mount.getBoundingClientRect();
        mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouseCoord, camera);

        const hits = raycaster.intersectObjects([screenMesh, glassCover, chassisMesh], true);
        if (hits.length > 0) {
          // User clicked the phone! Toggle theme!
          triggerThemeToggle();
        }
      }
      dragging = false;
    };

    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - pMX;
        const dy = e.clientY - pMY;
        pMX = e.clientX;
        pMY = e.clientY;
        tarY += dx * 0.005;
        tarX += dy * 0.005;
        velX = dx * 0.005;
        velY = dy * 0.005;
      } else {
        // Subtle mouse parallax tilt
        const hw = window.innerWidth / 2;
        const hh = window.innerHeight / 2;
        tarY = ((e.clientX - hw) / hw) * 0.22;
        tarX = ((e.clientY - hh) / hh) * 0.18;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    // ─────────────────────────────────────────────────────────────────────────
    // 9. THEME SYNC LISTENER
    // ─────────────────────────────────────────────────────────────────────────
    const syncThemeColors = () => {
      const d = isDark();
      switchTarget = d ? 1.0 : 0.0;
      powerSurgeIntensity = 1.0; // trigger power surge down wires

      renderer.toneMappingExposure = d ? 1.15 : 1.0;
      chassisMat.color.setHex(d ? 0x0f172a : 0xe2e8f0);
      ambientLight.color.setHex(d ? 0x0f172a : 0xf8fafc);
      ambientLight.intensity = d ? 1.8 : 3.0;
      keyLight.intensity = d ? 2.8 : 3.2;

      cableMaterials.forEach((mat) => {
        mat.emissiveIntensity = d ? 1.4 : 0.6; // surge
      });
    };

    const themeObs = new MutationObserver(syncThemeColors);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("themechange", syncThemeColors);

    // ─────────────────────────────────────────────────────────────────────────
    // 10. ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0, visible = true, tabVisible = !document.hidden;

    const animate = () => {
      if (!visible || !tabVisible) {
        raf = 0;
        return;
      }
      const t = clock.getElapsedTime();

      // Inertia & parallax tilt
      if (!dragging) {
        tarX += velY;
        tarY += velX;
        velX *= 0.94;
        velY *= 0.94;
      }
      curX += (tarX - curX) * 0.06;
      curY += (tarY - curY) * 0.06;

      // Phone gentle floating levitation
      phoneRig.position.y = Math.sin(t * 1.5) * 0.08;
      phoneRig.rotation.x = 0.08 + curX;
      phoneRig.rotation.y = -0.22 + curY;

      // Smooth interpolation of switch knob
      switchAnimProgress += (switchTarget - switchAnimProgress) * 0.12;

      // Decay power surge
      if (powerSurgeIntensity > 0.01) {
        powerSurgeIntensity *= 0.94;
      } else {
        powerSurgeIntensity = 0.0;
      }

      // Redraw phone screen UI (throttled to smooth updates)
      drawScreenUI(t, powerSurgeIntensity);

      // Advance energy packets along the 3D cables
      const surgeMultiplier = 1.0 + powerSurgeIntensity * 2.5;
      energyPackets.forEach((p) => {
        p.t += (p.speed * 0.016 * surgeMultiplier);
        if (p.t >= 1.0) {
          p.t = 0.0;
        }
        const curve = CABLE_CURVES[p.cableIdx];
        const pt = curve.getPoint(p.t);
        p.mesh.position.copy(pt);

        // Scale spark up during surge
        p.mesh.scale.setScalar(1.0 + powerSurgeIntensity * 0.8);
      });

      // Cable emission pulse
      cableMaterials.forEach((mat) => {
        const baseEmissive = isDark() ? 0.7 : 0.35;
        mat.emissiveIntensity = baseEmissive + powerSurgeIntensity * 1.8;
      });

      // Ground rings rotation
      baseGroup.rotation.y = t * 0.05;

      // Dust particles rise
      const dp = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < DUST_N; i++) {
        dp[i * 3 + 1] += dustV[i] * 0.015;
        if (dp[i * 3 + 1] > 2.5) dp[i * 3 + 1] = -2.5;
      }
      dustGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const start = () => {
      if (!raf && visible && tabVisible) {
        clock.start();
        raf = requestAnimationFrame(animate);
      }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }, { threshold: 0.05 });
    io.observe(mount);

    const onVis = () => {
      tabVisible = !document.hidden;
      if (tabVisible) start();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    start();

    // ─────────────────────────────────────────────────────────────────────────
    // 11. RESIZE HANDLER
    // ─────────────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      setRootPos();
    };
    window.addEventListener("resize", onResize);
    onResize();

    // ─────────────────────────────────────────────────────────────────────────
    // 12. CLEANUP
    // ─────────────────────────────────────────────────────────────────────────
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("themechange", syncThemeColors);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);

      chassisGeo.dispose();
      chassisMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenTexture.dispose();
      glassCoverGeo.dispose();
      glassCoverMat.dispose();
      islandGeo.dispose();
      islandMat.dispose();
      ledGeo.dispose();
      ledMat.dispose();
      camPillGeo.dispose();
      camPillMat.dispose();
      packetGeo.dispose();
      dustGeo.dispose();
      dustMat.dispose();

      cableMeshes.forEach((m) => m.geometry.dispose());
      cableMaterials.forEach((m) => m.dispose());
      energyPackets.forEach((p) => (p.mesh.material as THREE.Material).dispose());

      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [triggerThemeToggle]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto select-none z-[1]">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-pointer active:cursor-grabbing"
        aria-label="Interactive 3D Smart Device — Tap to toggle website theme"
        role="button"
        tabIndex={0}
      />

      {/* Floating Interactive Badge Hint */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 dark:bg-[#07090E]/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-xl text-xs font-mono text-ink/80 dark:text-slate-200 animate-pulse">
        <span className="h-2 w-2 rounded-full bg-[#10b981] animate-ping" />
        <span>⚡ TAP PHONE SWITCH TO TOGGLE THEME</span>
      </div>

      {/* Pulse surge flash overlay when switch is flipped */}
      {pulseActive && (
        <div
          className="pointer-events-none absolute inset-0 bg-[#00e5ff]/10 dark:bg-[#1e7fe8]/15 transition-opacity duration-700 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
