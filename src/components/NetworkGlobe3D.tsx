"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HubNode {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  latency: string;
  status: string;
  role: string;
}

const HUBS: HubNode[] = [
  { id: "cmbo", name: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612, latency: "4ms", status: "PRIMARY LAB", role: "NATLE HQ & Core R&D" },
  { id: "sin", name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, latency: "14ms", status: "ONLINE", role: "APAC Edge Cluster" },
  { id: "tok", name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, latency: "28ms", status: "ONLINE", role: "East Asia Gateway" },
  { id: "lon", name: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278, latency: "18ms", status: "ONLINE", role: "Europe West DC" },
  { id: "fra", name: "Frankfurt", country: "Germany", lat: 50.1109, lng: 8.6821, latency: "16ms", status: "ONLINE", role: "Central EU Backbone" },
  { id: "iad", name: "N. Virginia", country: "United States", lat: 38.9072, lng: -77.0369, latency: "22ms", status: "ONLINE", role: "US-East Hyperscale" },
  { id: "sfo", name: "San Francisco", country: "United States", lat: 37.7749, lng: -122.4194, latency: "34ms", status: "ONLINE", role: "US-West Silicon Valley" },
  { id: "syd", name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, latency: "48ms", status: "ONLINE", role: "Oceania Edge" },
];

const CONNECTIONS: [string, string][] = [
  ["cmbo", "sin"],
  ["sin", "tok"],
  ["cmbo", "lon"],
  ["lon", "fra"],
  ["fra", "iad"],
  ["iad", "sfo"],
  ["sfo", "tok"],
  ["sin", "syd"],
  ["lon", "iad"],
  ["cmbo", "fra"],
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function NetworkGlobe3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHub, setActiveHub] = useState<HubNode>(HUBS[0]);
  const [networkStats, setNetworkStats] = useState({
    totalNodes: 8,
    activeRoutes: 10,
    p99Latency: "14.2ms",
    throughput: "98.4 GB/s",
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    const globeRadius = 2.4;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Initial slight tilt
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.y = -1.2;

    const isDarkMode = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    // --- 1. Holographic Dot Matrix Sphere (Fibonacci Sphere) ---
    const dotCount = 850;
    const dotPositions = new Float32Array(dotCount * 3);
    const dotSizes = new Float32Array(dotCount);

    const phiGolden = Math.PI * (3 - Math.sqrt(5)); // ~2.3999632

    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiGolden * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      dotPositions[i * 3] = x * globeRadius;
      dotPositions[i * 3 + 1] = y * globeRadius;
      dotPositions[i * 3 + 2] = z * globeRadius;

      dotSizes[i] = Math.random() * 2.0 + 1.5;
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute("size", new THREE.BufferAttribute(dotSizes, 1));

    // Custom circular glow particle texture
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(0, 210, 255, 0.85)");
        grad.addColorStop(0.7, "rgba(30, 127, 232, 0.35)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const dotTexture = createCircleTexture();

    const dotMat = new THREE.PointsMaterial({
      size: 0.085,
      map: dotTexture,
      transparent: true,
      opacity: isDarkMode() ? 0.75 : 0.45,
      blending: isDarkMode() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      color: new THREE.Color(isDarkMode() ? 0x00d2ff : 0x1e7fe8),
    });

    const dotMesh = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotMesh);

    // --- 2. Inner Translucent Wireframe Core ---
    const innerGeo = new THREE.SphereGeometry(globeRadius * 0.985, 28, 28);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isDarkMode() ? 0x1e7fe8 : 0x0088cc),
      wireframe: true,
      transparent: true,
      opacity: isDarkMode() ? 0.08 : 0.05,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerWireMat);
    globeGroup.add(innerSphere);

    // --- 3. Equatorial & Orbital Data Rings ---
    const ringGeo = new THREE.TorusGeometry(globeRadius * 1.08, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x12b8a6),
      transparent: true,
      opacity: isDarkMode() ? 0.45 : 0.25,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.3;
    globeGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(globeRadius * 1.15, 0.008, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00d2ff),
      transparent: true,
      opacity: isDarkMode() ? 0.35 : 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    globeGroup.add(ring2);

    // --- 4. Hub Markers (Beacons & Pulsing Rings) ---
    const hubVectors = new Map<string, THREE.Vector3>();
    const beaconGroup = new THREE.Group();
    globeGroup.add(beaconGroup);

    const beaconGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00d2ff),
    });

    const beaconPulseGeo = new THREE.RingGeometry(0.06, 0.14, 24);
    const beaconPulseMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x6fcf3e),
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });

    const pulseMeshes: { mesh: THREE.Mesh; baseScale: number }[] = [];

    HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, globeRadius * 1.01);
      hubVectors.set(hub.id, pos);

      // Core beacon dot
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      beaconGroup.add(beacon);

      // Normal orienting ring
      const pulseRing = new THREE.Mesh(beaconPulseGeo, beaconPulseMat);
      pulseRing.position.copy(pos.clone().multiplyScalar(1.002));
      pulseRing.lookAt(pos.clone().multiplyScalar(2));
      beaconGroup.add(pulseRing);

      pulseMeshes.push({ mesh: pulseRing, baseScale: 1 });
    });

    // --- 5. Curved Data Arcs (Quadratic Splines) & Traveling Photons ---
    const arcCurves: THREE.QuadraticBezierCurve3[] = [];
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    const photonGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const photonMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffffff),
    });

    interface Photon {
      mesh: THREE.Mesh;
      curve: THREE.QuadraticBezierCurve3;
      progress: number;
      speed: number;
    }

    const photons: Photon[] = [];

    CONNECTIONS.forEach(([fromId, toId]) => {
      const v1 = hubVectors.get(fromId);
      const v2 = hubVectors.get(toId);
      if (!v1 || !v2) return;

      const distance = v1.distanceTo(v2);
      // Midpoint pulled outward above globe surface proportional to distance
      const mid = v1
        .clone()
        .add(v2)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(globeRadius + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      arcCurves.push(curve);

      // Sample curve points for glowing tube/line
      const points = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(0x1e7fe8),
        transparent: true,
        opacity: isDarkMode() ? 0.6 : 0.4,
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      arcGroup.add(arcLine);

      // Add a photon light packet traveling along the arc
      const photonMesh = new THREE.Mesh(photonGeo, photonMat);
      arcGroup.add(photonMesh);
      photons.push({
        mesh: photonMesh,
        curve,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.005,
      });
    });

    // --- 6. Ambient Atmosphere Glow & Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode() ? 1.2 : 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00d2ff, 1.5);
    dirLight.position.set(5, 4, 6);
    scene.add(dirLight);

    // --- 7. Interactive Mouse & Drag Physics ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = globeGroup.rotation.y;
    let targetRotX = globeGroup.rotation.x;
    let currentRotY = globeGroup.rotation.y;
    let currentRotX = globeGroup.rotation.x;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotY += deltaX * 0.006;
        targetRotX += deltaY * 0.006;
        dragVelocityX = deltaX * 0.006;
        dragVelocityY = deltaY * 0.006;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // --- 8. Theme Sync ---
    const updateTheme = () => {
      const dark = isDarkMode();
      dotMat.color.setHex(dark ? 0x00d2ff : 0x1e7fe8);
      dotMat.opacity = dark ? 0.75 : 0.45;
      dotMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      dotMat.needsUpdate = true;

      innerWireMat.color.setHex(dark ? 0x1e7fe8 : 0x0088cc);
      innerWireMat.opacity = dark ? 0.08 : 0.05;

      ringMat.opacity = dark ? 0.45 : 0.25;
      ring2Mat.opacity = dark ? 0.35 : 0.2;
      ambientLight.intensity = dark ? 1.2 : 2.0;
    };

    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- 9. Render Loop with GPU Sleeping ---
    const clock = new THREE.Clock();
    let raf = 0;
    let isIntersecting = true;
    let isTabVisible = !document.hidden;

    const animate = () => {
      if (!isIntersecting || !isTabVisible) {
        raf = 0;
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Inertia & rotation
      if (!isDragging) {
        targetRotY += 0.0025 + dragVelocityX;
        targetRotX += dragVelocityY;
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
      }

      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      globeGroup.rotation.x = currentRotX;
      globeGroup.rotation.y = currentRotY;

      // Pulse beacon rings
      pulseMeshes.forEach((item, idx) => {
        const p = ((elapsed * 2 + idx * 0.4) % 2) / 2; // 0 to 1
        const scale = 1 + p * 1.8;
        item.mesh.scale.set(scale, scale, scale);
        (item.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.85 * (1 - p));
      });

      // Animate photons along routes
      photons.forEach((photon) => {
        photon.progress = (photon.progress + photon.speed) % 1;
        const pt = photon.curve.getPoint(photon.progress);
        photon.mesh.position.copy(pt);
      });

      // Rings independent spin
      ring1.rotation.z = elapsed * 0.12;
      ring2.rotation.z = -elapsed * 0.08;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const startAnimate = () => {
      if (!raf && isIntersecting && isTabVisible) {
        raf = requestAnimationFrame(animate);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startAnimate();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startAnimate();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    startAnimate();

    // --- 10. Resize Handler ---
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Dynamic latency telemetry jitter
    const interval = setInterval(() => {
      setNetworkStats((prev) => ({
        ...prev,
        p99Latency: (13.8 + Math.random() * 0.8).toFixed(1) + "ms",
        throughput: (97.8 + Math.random() * 1.5).toFixed(1) + " GB/s",
      }));
    }, 2800);

    // --- 11. Cleanup ---
    return () => {
      clearInterval(interval);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);

      dotGeo.dispose();
      dotMat.dispose();
      dotTexture.dispose();
      innerGeo.dispose();
      innerWireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      beaconPulseGeo.dispose();
      beaconPulseMat.dispose();
      photonGeo.dispose();
      photonMat.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full rounded-3xl bg-slate-900/95 dark:bg-[#090C12] border border-ink/10 dark:border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl">
      {/* Background Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-azure/20 dark:bg-azure/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal/20 dark:bg-teal/25 blur-3xl"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Info & Live Telemetry HUD */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-azure/10 dark:bg-azure/20 border border-azure/20 text-azure dark:text-azure-light text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            LIVE DISTRIBUTED TOPOLOGY
          </div>

          <div>
            <h3 className="font-display text-2xl md:text-4xl text-white font-medium tracking-tight leading-tight">
              Global Anycast Edge &amp; High-Speed Mesh
            </h3>
            <p className="mt-3 text-white/70 text-sm md:text-base leading-relaxed">
              Every NATLE deployment runs across an ultra-low latency mesh interconnecting 8 worldwide strategic zones. Traffic is routed via anycast BGP to the geographically nearest node with sub-15ms p99 latency.
            </p>
          </div>

          {/* Real-Time Metrics HUD */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
              <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider">Global P99 Ping</div>
              <div className="font-display text-2xl text-emerald-400 mt-1 font-semibold">
                {networkStats.p99Latency}
              </div>
              <div className="text-[10px] text-white/40 mt-0.5">Optimized BGP routes</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
              <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider">Mesh Throughput</div>
              <div className="font-display text-2xl text-azure-light mt-1 font-semibold">
                {networkStats.throughput}
              </div>
              <div className="text-[10px] text-white/40 mt-0.5">Active data ingress</div>
            </div>
          </div>

          {/* Active Nodes Selector */}
          <div className="pt-2">
            <div className="text-xs font-mono text-white/60 mb-2.5 uppercase tracking-wider flex items-center justify-between">
              <span>Strategic Metro Hubs</span>
              <span className="text-[10px] text-emerald-400 font-bold">100% HEALTHY</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {HUBS.map((hub) => {
                const isSelected = activeHub.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHub(hub)}
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-azure text-white shadow-[0_0_16px_rgba(30,127,232,0.5)] font-bold scale-105"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-white" : "bg-emerald-400"
                      }`}
                    />
                    {hub.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focused Hub Telemetry Card */}
          <div className="rounded-2xl border border-azure/30 bg-azure/10 p-4 font-mono text-xs text-white/90 space-y-1.5">
            <div className="flex items-center justify-between text-azure-light font-bold">
              <span>{activeHub.name} ({activeHub.country})</span>
              <span className="text-emerald-400">{activeHub.status}</span>
            </div>
            <div className="text-white/70 text-[11px]">{activeHub.role}</div>
            <div className="flex items-center justify-between text-[11px] text-white/50 pt-1 border-t border-white/10">
              <span>Edge Round-Trip:</span>
              <span className="text-white font-semibold">{activeHub.latency}</span>
            </div>
          </div>
        </div>

        {/* Right Col: 3D Holographic Globe Canvas */}
        <div className="lg:col-span-7 relative h-[420px] md:h-[540px] flex items-center justify-center">
          {/* 3D WebGL Canvas Container */}
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            aria-label="Interactive 3D Network Globe - Click and drag to rotate the globe"
            role="region"
          />

          {/* User Hint Pill */}
          <div className="pointer-events-none absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-white/75 backdrop-blur-md flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-azure animate-pulse" />
            <span>Drag to rotate 3D mesh</span>
          </div>
        </div>
      </div>
    </div>
  );
}
