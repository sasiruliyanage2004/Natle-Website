"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, ChevronDown } from "lucide-react";

interface CamStop {
  y: number;
  z: number;
  fov: number;
  lookY: number;
  rotY: number;
}

const CAM_STOPS: CamStop[] = [
  { y: 1.4,  z: 6.2, fov: 32, lookY: 1.2,  rotY: 0.35 },  // hero: whole device
  { y: 3.0,  z: 2.6, fov: 26, lookY: 3.05, rotY: 0.55 },  // cap
  { y: 2.0,  z: 2.0, fov: 24, lookY: 2.0,  rotY: 0.15 },  // seal / shell
  { y: 1.1,  z: 1.8, fov: 22, lookY: 1.2,  rotY: -0.25 }, // pcb / tube
  { y: -0.1, z: 1.9, fov: 22, lookY: -0.25,rotY: 0.3 },   // collar
  { y: -1.9, z: 2.4, fov: 26, lookY: -2.3, rotY: -0.15 }, // tip / soil
];

function catmullSample(stops: CamStop[], t: number, key: keyof CamStop): number {
  const n = stops.length;
  const scaled = Math.max(0, Math.min(1, t)) * (n - 1);
  const i0 = Math.max(0, Math.min(n - 2, Math.floor(scaled)));
  const localT = scaled - i0;
  const a = stops[i0][key];
  const b = stops[i0 + 1][key];
  return a + (b - a) * localT;
}

export default function HardwareScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    const wrap = canvasWrapRef.current;
    if (!wrap) return;

    // Detect dark mode
    const isDark = document.documentElement.classList.contains("dark");
    const bgColor = isDark ? 0x050505 : 0xf8fafc;

    // ---------- SCENE & CAMERA ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.Fog(bgColor, 12, 26);

    const camera = new THREE.PerspectiveCamera(
      32,
      wrap.clientWidth / wrap.clientHeight,
      0.1,
      100
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    wrap.appendChild(renderer.domElement);

    // ---------- LIGHTING ----------
    const key = new THREE.DirectionalLight(0xffffff, isDark ? 3.0 : 2.4);
    key.position.set(4, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -6; key.shadow.camera.right = 6;
    key.shadow.camera.top = 6; key.shadow.camera.bottom = -6;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x9fd8c8, isDark ? 1.5 : 1.1);
    rim.position.set(-5, 3, -4);
    scene.add(rim);

    const fill = new THREE.AmbientLight(0xffffff, isDark ? 0.35 : 0.55);
    scene.add(fill);

    const groundLight = new THREE.PointLight(0xe8874a, 0.6, 8);
    groundLight.position.set(0, -3.5, 1.5);
    scene.add(groundLight);

    // ---------- MATERIALS ----------
    const metal = new THREE.MeshStandardMaterial({ color: 0xc9cdd1, metalness: 1, roughness: 0.28 });
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x8b9096, metalness: 0.9, roughness: 0.35 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0xdfe7e4, transparent: true, opacity: 0.28, roughness: 0.05,
      transmission: 0.9, thickness: 0.4, metalness: 0
    });
    const rubber = new THREE.MeshStandardMaterial({ color: 0xe8874a, roughness: 0.6, metalness: 0.05 });
    const pcbGreen = new THREE.MeshStandardMaterial({ color: 0x2f5d46, roughness: 0.6, metalness: 0.2 });
    const chipDark = new THREE.MeshStandardMaterial({ color: 0x14140f, roughness: 0.5 });
    const ceramic = new THREE.MeshStandardMaterial({ color: 0xe9e6df, roughness: 0.35, metalness: 0.1 });
    const ledOrange = new THREE.MeshStandardMaterial({ color: 0xff9c4a, emissive: 0xff8a3d, emissiveIntensity: 1.4, roughness: 0.3 });
    const markerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x333333, roughness: 0.2, metalness: 0.4 });
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x3a2c22, roughness: 1, metalness: 0 });
    const soilMatDark = new THREE.MeshStandardMaterial({ color: 0x241a14, roughness: 1 });

    // ---------- DEVICE 3D GROUP ----------
    const device = new THREE.Group();
    scene.add(device);

    // Top Cap
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.55, 32), metal);
    cap.position.y = 3.05;
    cap.castShadow = true;
    device.add(cap);

    const capRidge = new THREE.Mesh(new THREE.CylinderGeometry(0.345, 0.345, 0.05, 32), darkMetal);
    capRidge.position.y = 2.79;
    device.add(capRidge);

    // LED on top
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), ledOrange);
    led.position.y = 3.34;
    device.add(led);

    const ledRing = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.015, 12, 32), darkMetal);
    ledRing.rotation.x = Math.PI / 2;
    ledRing.position.y = 3.33;
    device.add(ledRing);

    // Top rubber ring
    const ringTop = new THREE.Mesh(new THREE.TorusGeometry(0.335, 0.045, 16, 40), rubber);
    ringTop.rotation.x = Math.PI / 2;
    ringTop.position.y = 2.68;
    device.add(ringTop);

    // Glass tube body
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 2.2, 32, 1, true), glass);
    tube.position.y = 1.5;
    device.add(tube);

    // PCB inside
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.9, 0.4), pcbGreen);
    pcb.position.y = 1.5;
    device.add(pcb);

    const chip = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.22), chipDark);
    chip.position.set(0.03, 1.75, 0);
    device.add(chip);

    // Small SMD components on PCB
    for (let i = 0; i < 7; i++) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), darkMetal);
      dot.position.set(0.08, 0.7 + i * 0.22, (i % 2 === 0 ? 0.12 : -0.12));
      device.add(dot);
    }

    // White contact markers (telemetry nodes)
    const markerPositions = [3.34, 2.05, 1.15, 0.35, -2.3];
    markerPositions.forEach((y) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), markerMat);
      m.position.set(0.31, y, 0.05);
      device.add(m);
    });

    // Bottom rubber ring
    const ringBottom = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.045, 16, 40), rubber);
    ringBottom.rotation.x = Math.PI / 2;
    ringBottom.position.y = 0.34;
    device.add(ringBottom);

    // Lower metal collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.24, 0.9, 32), metal);
    collar.position.y = -0.25;
    collar.castShadow = true;
    device.add(collar);

    const collarRidge = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.245, 0.04, 32), darkMetal);
    collarRidge.position.y = -0.7;
    device.add(collarRidge);

    // Ceramic prong tip (two prongs)
    function makeProng(xOff: number) {
      const prong = new THREE.Mesh(new THREE.ConeGeometry(0.07, 1.05, 16), ceramic);
      prong.position.set(xOff, -1.35, 0);
      prong.castShadow = true;
      return prong;
    }
    const prongL = makeProng(-0.09);
    const prongR = makeProng(0.09);
    device.add(prongL, prongR);

    // ---------- SOIL BLOCK ----------
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

    const soilBlock = new THREE.Mesh(soilGeo, soilMat);
    soilBlock.position.y = -2.9;
    soilBlock.receiveShadow = true;
    soilBlock.castShadow = true;
    soilGroup.add(soilBlock);

    // Soil crumbs
    for (let i = 0; i < 26; i++) {
      const s = 0.03 + Math.random() * 0.07;
      const crumb = new THREE.Mesh(
        new THREE.DodecahedronGeometry(s, 0),
        Math.random() > 0.5 ? soilMat : soilMatDark
      );
      const ang = Math.random() * Math.PI * 2;
      const r = 0.9 + Math.random() * 0.5;
      crumb.position.set(Math.cos(ang) * r, -1.6 + Math.random() * 0.15, Math.sin(ang) * r * 0.6);
      crumb.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      crumb.castShadow = true;
      soilGroup.add(crumb);
    }

    // Ground plane shadow catcher
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.ShadowMaterial({ opacity: isDark ? 0.3 : 0.12 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -4.2;
    ground.receiveShadow = true;
    scene.add(ground);



    // ---------- CAMERA & ANIMATION LOOP ----------
    let scrollProgress = 0;
    let targetProgress = 0;
    let animId: number;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScroll = container.scrollHeight - window.innerHeight;
      const current = -rect.top;
      targetProgress = Math.max(0, Math.min(1, current / totalScroll));
      
      const stage = Math.min(5, Math.floor(targetProgress * 6));
      setActiveStage(stage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    function updateCamera(t: number) {
      const y = catmullSample(CAM_STOPS, t, "y");
      const z = catmullSample(CAM_STOPS, t, "z");
      const fov = catmullSample(CAM_STOPS, t, "fov");
      const lookY = catmullSample(CAM_STOPS, t, "lookY");
      const rotY = catmullSample(CAM_STOPS, t, "rotY");

      camera.position.set(Math.sin(rotY) * 0.6, y, z);
      camera.fov = fov;
      camera.updateProjectionMatrix();
      camera.lookAt(0, lookY, 0);

      device.rotation.y = rotY * 0.6;
      soilGroup.rotation.y = rotY * 0.6;
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      scrollProgress += (targetProgress - scrollProgress) * 0.08;
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
  }, []);

  return (
    <section
      ref={containerRef}
      id="hardware-scrollytelling"
      className="relative h-[600vh] bg-[#F8FAFC] dark:bg-[#050505] text-[#14140F] dark:text-white transition-colors duration-300"
    >
      {/* Pinned 100vh Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Three.js 3D WebGL Canvas */}
        <div ref={canvasWrapRef} className="absolute inset-0 w-full h-full z-10" />

        {/* Top Minimal Telemetry Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-6 sm:px-12 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3aa383] animate-pulse" />
            <span className="font-mono text-xs tracking-wider uppercase opacity-80">
              terra.sense &bull; natle telemetry probe
            </span>
          </div>
          <div className="font-mono text-xs tracking-widest opacity-80">
            0{activeStage} / 05
          </div>
        </div>

        {/* Overlay Copy Stages (Fade in based on activeStage) */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto flex items-center justify-between p-6 sm:p-12 pointer-events-none">
          
          {/* STAGE 0: HERO (Whole Device) */}
          <div 
            className={`absolute top-[35%] left-6 sm:left-14 max-w-sm transition-all duration-500 ${
              activeStage === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <span className="text-xs font-mono text-[#3aa383] tracking-widest uppercase block mb-3">
              Soil Probe &bull; Model 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Built from what <br />
              <span className="text-[#3aa383]">it&apos;s buried in.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every layer of the housing is chosen for a life spent underground — sealed against moisture, readable by light, tuned to the frequency of roots.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs font-mono text-slate-400">
              <ChevronDown className="w-4 h-4 text-[#3aa383] animate-bounce" />
              <span>Scroll to descend</span>
            </div>
          </div>

          {/* STAGE 1: CAP (Solar PV Cell) */}
          <div 
            className={`absolute top-[20%] right-6 sm:right-14 max-w-xs text-right transition-all duration-500 ${
              activeStage === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <span className="text-xs font-mono text-[#e8874a] tracking-widest uppercase block mb-2">
              01 &mdash; Cap
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-2">solar.pv cell</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed ml-auto">
              A single photovoltaic disc trickle-charges the internal cell whenever the crown breaks the soil line.
            </p>
          </div>

          {/* STAGE 2: SHELL (Silicon Seal Jacket) */}
          <div 
            className={`absolute top-[32%] left-6 sm:left-14 max-w-xs transition-all duration-500 ${
              activeStage === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <span className="text-xs font-mono text-[#e8874a] tracking-widest uppercase block mb-2">
              02 &mdash; Shell
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-2">silicon.seal jacket</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Cast silicone sleeve absorbs the shock of insertion and keeps groundwater out of the electronics bay.
            </p>
          </div>

          {/* STAGE 3: BODY (Polycarbonate Tube) */}
          <div 
            className={`absolute top-[42%] right-6 sm:right-14 max-w-xs text-right transition-all duration-500 ${
              activeStage === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <span className="text-xs font-mono text-[#e8874a] tracking-widest uppercase block mb-2">
              03 &mdash; Body
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-2">polycarbonate tube</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed ml-auto">
              Optically clear polycarbonate lets the board&apos;s status lights read through the wall without a window cut.
            </p>
          </div>

          {/* STAGE 4: COLLAR (Stainless 316 Band) */}
          <div 
            className={`absolute top-[40%] left-6 sm:left-14 max-w-xs transition-all duration-500 ${
              activeStage === 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <span className="text-xs font-mono text-[#e8874a] tracking-widest uppercase block mb-2">
              04 &mdash; Collar
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-2">stainless.316 band</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A marine-grade steel collar anchors the tip assembly and grounds the sensor array against static drift.
            </p>
          </div>

          {/* STAGE 5: TIP (Hosma Ceramic Prongs & Field Data) */}
          <div 
            className={`absolute top-[32%] right-6 sm:right-14 max-w-sm text-right transition-all duration-500 ${
              activeStage === 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <span className="text-xs font-mono text-[#e8874a] tracking-widest uppercase block mb-2">
              05 &mdash; Tip
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-2">hosma.ceramic prongs</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed ml-auto mb-6">
              Twin ceramic prongs read moisture and conductivity a few centimetres down, where the roots actually drink.
            </p>

            {/* Spec Box */}
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg text-left text-xs font-mono space-y-2">
              <div className="text-[10px] text-[#e8874a] uppercase font-bold tracking-wider mb-2">Field Telemetry</div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-400">
                <span>Battery Life</span>
                <span className="font-bold text-slate-900 dark:text-white">6 seasons</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-400">
                <span>Wireless Range</span>
                <span className="font-bold text-slate-900 dark:text-white">2.1 km LoRa</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600 dark:text-slate-400">
                <span>Reading Depth</span>
                <span className="font-bold text-slate-900 dark:text-white">4 &ndash; 12 cm</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
