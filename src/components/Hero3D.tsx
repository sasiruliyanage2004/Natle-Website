"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

// ─────────────────────────────────────────────────────────────────────────────
// Scene IDs
// ─────────────────────────────────────────────────────────────────────────────
export type SceneId = "neural" | "earth" | "orb";

const SCENES: { id: SceneId; label: string; icon: string; desc: string }[] = [
  { id: "neural", label: "Neural Net",  icon: "🧠", desc: "AI / Neural Network Sphere" },
  { id: "earth",  label: "Earth",       icon: "🌍", desc: "Photorealistic Living Earth" },
  { id: "orb",    label: "Quantum Orb", icon: "⚡", desc: "Living Quantum Orb" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Scene Switcher Panel (floating control panel)
// ─────────────────────────────────────────────────────────────────────────────
function SceneSwitcher({ current, onChange }: { current: SceneId; onChange: (id: SceneId) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-6 right-5 z-20 flex flex-col items-end gap-2 select-none">
      {/* Expanded Panel */}
      <div
        className={`transition-all duration-300 overflow-hidden ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <div className="mb-2 flex flex-col gap-1.5 bg-white/70 dark:bg-[#07090E]/80 backdrop-blur-xl rounded-2xl border border-black/[0.06] dark:border-white/[0.10] shadow-xl p-3 min-w-[190px]">
          <p className="text-[10px] font-mono font-semibold text-ink/40 dark:text-slate-400 uppercase tracking-widest px-1 pb-1">
            3D Scene
          </p>
          {SCENES.map((s) => {
            const active = s.id === current;
            return (
              <button
                key={s.id}
                onClick={() => { onChange(s.id); setOpen(false); }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all duration-150 text-sm font-medium ${
                  active
                    ? "bg-ink text-white dark:bg-white dark:text-slate-950 shadow-sm"
                    : "text-ink/70 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.08]"
                }`}
              >
                <span className="text-base leading-none">{s.icon}</span>
                <span>{s.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch 3D scene"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/70 dark:bg-[#07090E]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.10] shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-medium text-ink/70 dark:text-slate-300 hover:text-ink dark:hover:text-white"
      >
        <span className="text-base leading-none">
          {SCENES.find((s) => s.id === current)?.icon ?? "🧠"}
        </span>
        <span className="hidden sm:inline">
          {SCENES.find((s) => s.id === current)?.label}
        </span>
        <svg
          className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export — mounts the selected scene + switcher
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero3D() {
  const [scene, setScene] = useState<SceneId>("neural");
  const mountRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((id: SceneId) => {
    setScene(id);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-[1]">
      <SceneSwitcher current={scene} onChange={handleChange} />
      {scene === "neural" && <NeuralNetScene mountRef={mountRef} key="neural" />}
      {scene === "earth"  && <EarthScene  key="earth" />}
      {scene === "orb"    && <QuantumOrbScene key="orb" />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 1 — Neural Network Sphere (main, bloom post-processing)
// ─────────────────────────────────────────────────────────────────────────────
function NeuralNetScene({ mountRef }: { mountRef: React.RefObject<HTMLDivElement> }) {
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = localRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const isDark = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark() ? 1.1 : 0.92;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene3 = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.0);

    // Bloom composer
    const renderTarget = new THREE.WebGLRenderTarget(width, height, { type: THREE.HalfFloatType });
    const composer = new EffectComposer(renderer, renderTarget);
    const renderPass = new RenderPass(scene3, camera);
    renderPass.clearColor = new THREE.Color(0, 0, 0);
    renderPass.clearAlpha = 0;
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      isDark() ? 0.55 : 0.20,  // strength — tight, only bright tips glow
      0.28,                     // radius
      0.36                      // threshold — only genuinely bright elements bloom
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    // Root
    const rootGroup = new THREE.Group();
    scene3.add(rootGroup);
    const setRootPos = () => {
      const desktop = width >= 1024;
      rootGroup.position.set(desktop ? 2.1 : 0, desktop ? 0.05 : 0.3, 0);
      rootGroup.scale.setScalar(desktop ? 1.0 : Math.min(0.88, width / 768));
    };
    setRootPos();

    const neuralGroup = new THREE.Group();
    rootGroup.add(neuralGroup);

    // Fibonacci node distribution
    const SPHERE_R = 1.52;
    const PHI = Math.PI * (3 - Math.sqrt(5));

    const fibSphere = (count: number, radius: number): THREE.Vector3[] => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = PHI * i;
        pts.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
      }
      return pts;
    };

    const outerNodes = fibSphere(120, SPHERE_R);
    const midNodes   = fibSphere(50,  SPHERE_R * 0.74);
    const innerNodes = fibSphere(22,  SPHERE_R * 0.48);
    const allNodes   = [...outerNodes, ...midNodes, ...innerNodes];
    const NODE_COUNT = allNodes.length;

    // Instanced node spheres
    const layerColors = [
      new THREE.Color(0x00e5ff), // cyan — outer
      new THREE.Color(0xffb300), // gold — mid
      new THREE.Color(0xa855f7), // violet — inner
    ];

    const nodeGeo = new THREE.SphereGeometry(0.036, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: 0xffffff,
      emissiveIntensity: isDark() ? 1.8 : 1.1,
      roughness: 0.1, metalness: 0.9,
    });
    const nodeInstanced = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);
    const dummy = new THREE.Object3D();
    const baseNodeColors = new Float32Array(NODE_COUNT * 3);
    allNodes.forEach((pos, idx) => {
      dummy.position.copy(pos);
      dummy.updateMatrix();
      nodeInstanced.setMatrixAt(idx, dummy.matrix);
      const layer = idx < 120 ? 0 : idx < 170 ? 1 : 2;
      const c = layerColors[layer];
      nodeInstanced.setColorAt(idx, c);
      baseNodeColors[idx*3] = c.r; baseNodeColors[idx*3+1] = c.g; baseNodeColors[idx*3+2] = c.b;
    });
    nodeInstanced.instanceMatrix.needsUpdate = true;
    if (nodeInstanced.instanceColor) nodeInstanced.instanceColor.needsUpdate = true;
    neuralGroup.add(nodeInstanced);

    // Neural connection web
    interface NEdge { a: number; b: number }
    const edges: NEdge[] = [];
    const edgePoints: THREE.Vector3[] = [];
    const pushEdge = (i: number, j: number, thresh: number) => {
      if (allNodes[i].distanceTo(allNodes[j]) < thresh) {
        edges.push({ a: i, b: j });
        edgePoints.push(allNodes[i], allNodes[j]);
      }
    };
    for (let i = 0; i < 120; i++)   for (let j = i+1; j < 120; j++) pushEdge(i, j, 0.75);
    for (let i = 120; i < 170; i++) for (let j = i+1; j < 170; j++) pushEdge(i, j, 1.1);
    for (let i = 170; i < NODE_COUNT; i++) for (let j = i+1; j < NODE_COUNT; j++) pushEdge(i, j, 1.5);
    for (let i = 0; i < 120; i++)   for (let j = 120; j < 170; j++) pushEdge(i, j, 0.95);
    for (let i = 120; i < 170; i++) for (let j = 170; j < NODE_COUNT; j++) pushEdge(i, j, 1.2);

    const webGeo = new THREE.BufferGeometry().setFromPoints(edgePoints);
    const webMat = new THREE.LineBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: isDark() ? 0.28 : 0.17, blending: THREE.AdditiveBlending, depthWrite: false });
    neuralGroup.add(new THREE.LineSegments(webGeo, webMat));

    // Impulse packets
    const IMPULSE_COUNT = 45;
    const impulseColors = [new THREE.Color(0x00ffff), new THREE.Color(0xffd54f), new THREE.Color(0xd8b4fe), new THREE.Color(0x6fcf3e), new THREE.Color(0xffffff)];
    interface Impulse { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; edgeIdx: number; t: number; speed: number }
    const impGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const impulses: Impulse[] = [];
    for (let i = 0; i < IMPULSE_COUNT; i++) {
      const col = impulseColors[i % impulseColors.length];
      const mat = new THREE.MeshBasicMaterial({ color: col });
      const mesh = new THREE.Mesh(impGeo, mat);
      neuralGroup.add(mesh);
      impulses.push({ mesh, mat, edgeIdx: Math.floor(Math.random() * edges.length), t: Math.random(), speed: 0.18 + Math.random() * 0.22 });
    }

    // Glass sphere
    const glassGeo = new THREE.SphereGeometry(SPHERE_R, 72, 72);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDark() ? 0x061428 : 0xffffff),
      transmission: 0.93, thickness: 1.3, ior: 1.45, roughness: 0.03, metalness: 0.04,
      clearcoat: 1.0, clearcoatRoughness: 0.02, transparent: true, opacity: isDark() ? 0.82 : 0.68, depthWrite: false,
    });
    neuralGroup.add(new THREE.Mesh(glassGeo, glassMat));

    // Halo
    const haloGeo = new THREE.SphereGeometry(SPHERE_R * 1.06, 48, 48);
    const haloMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec3 vN,vW; void main(){vN=normalize(normalMatrix*normal);vW=(modelMatrix*vec4(position,1.0)).xyz;gl_Position=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.0);}`,
      fragmentShader: `uniform float uTime;varying vec3 vN,vW;void main(){vec3 N=normalize(vN);vec3 V=normalize(cameraPosition-vW);float rim=pow(1.0-max(dot(N,V),0.0),2.6);float p=sin(uTime*1.8)*0.12+0.88;gl_FragColor=vec4(0.0,0.82*p,1.0,rim*0.68);}`,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
    });
    rootGroup.add(new THREE.Mesh(haloGeo, haloMat));

    // Core
    const plasmaSphereGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const plasmaSphereMat = new THREE.MeshStandardMaterial({ color: 0xfff9e0, emissive: new THREE.Color(0xffcc00), emissiveIntensity: isDark() ? 3.2 : 2.0, roughness: 0.0, metalness: 1.0 });
    const plasmaSphere = new THREE.Mesh(plasmaSphereGeo, plasmaSphereMat);
    const coreGroup = new THREE.Group();
    neuralGroup.add(coreGroup);
    coreGroup.add(plasmaSphere);

    const cageGeo1 = new THREE.IcosahedronGeometry(0.62, 1);
    const cageMat1 = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: isDark() ? 0.65 : 0.4 });
    const cageMesh1 = new THREE.Mesh(cageGeo1, cageMat1);
    coreGroup.add(cageMesh1);

    const cageGeo2 = new THREE.OctahedronGeometry(0.42);
    const cageMat2 = new THREE.MeshBasicMaterial({ color: 0xffd54f, wireframe: true, transparent: true, opacity: isDark() ? 0.58 : 0.36 });
    const cageMesh2 = new THREE.Mesh(cageGeo2, cageMat2);
    coreGroup.add(cageMesh2);

    // Stardust
    const STAR_N = 1642;
    const sfPos = new Float32Array(STAR_N * 3);
    const sfCol = new Float32Array(STAR_N * 3);
    const starPal = [new THREE.Color(0x00d2ff), new THREE.Color(0x1e7fe8), new THREE.Color(0xffd54f), new THREE.Color(0x12b8a6), new THREE.Color(0xffffff)];
    const rcx = rootGroup.position.x;
    for (let i = 0; i < 1600; i++) {
      const r = 2.6 + Math.random() * 6.5, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      sfPos[i*3] = rcx + r*Math.sin(ph)*Math.cos(th); sfPos[i*3+1] = r*Math.sin(ph)*Math.sin(th); sfPos[i*3+2] = r*Math.cos(ph);
      const c = starPal[i % starPal.length]; sfCol[i*3] = c.r; sfCol[i*3+1] = c.g; sfCol[i*3+2] = c.b;
    }
    for (let i = 1600; i < STAR_N; i++) {
      sfPos[i*3] = -6.5 + Math.random()*5.8; sfPos[i*3+1] = -3.5 + Math.random()*7.0; sfPos[i*3+2] = -3.0 + Math.random()*4.5;
      const c = starPal[i % starPal.length]; sfCol[i*3] = c.r; sfCol[i*3+1] = c.g; sfCol[i*3+2] = c.b;
    }
    const sfGeo = new THREE.BufferGeometry();
    sfGeo.setAttribute("position", new THREE.BufferAttribute(sfPos, 3));
    sfGeo.setAttribute("color", new THREE.BufferAttribute(sfCol, 3));
    const sfMat = new THREE.PointsMaterial({ size: 0.085, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: isDark() ? 0.82 : 0.40, blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending, depthWrite: false });
    const starfield = new THREE.Points(sfGeo, sfMat);
    scene3.add(starfield);

    // Lights
    const ambientLight = new THREE.AmbientLight(isDark() ? 0x081020 : 0xf0f8ff, isDark() ? 2.0 : 3.5);
    scene3.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, isDark() ? 2.5 : 3.0);
    keyLight.position.set(5, 6, 8); scene3.add(keyLight);
    const lA = new THREE.PointLight(0x00d2ff, isDark() ? 5.5 : 3.8, 16);
    const lB = new THREE.PointLight(0xffb300, isDark() ? 4.8 : 3.2, 14);
    const lC = new THREE.PointLight(0xa855f7, isDark() ? 4.2 : 2.6, 13);
    const lD = new THREE.PointLight(0x12b8a6, isDark() ? 3.8 : 2.4, 13);
    scene3.add(lA, lB, lC, lD);

    // Interaction
    let tarX = 0, tarY = 0, curX = 0, curY = 0;
    let dragging = false, pMX = 0, pMY = 0, velX = 0, velY = 0;
    const onDown = (e: PointerEvent) => { dragging = true; pMX = e.clientX; pMY = e.clientY; velX = velY = 0; };
    const onUp   = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - pMX, dy = e.clientY - pMY;
        pMX = e.clientX; pMY = e.clientY;
        tarY += dx * 0.005; tarX += dy * 0.005; velX = dx * 0.005; velY = dy * 0.005;
      } else {
        tarY = ((e.clientX - window.innerWidth/2) / (window.innerWidth/2)) * 0.24;
        tarX = ((e.clientY - window.innerHeight/2) / (window.innerHeight/2)) * 0.24;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    // Theme sync
    const syncTheme = () => {
      const d = isDark();
      renderer.toneMappingExposure = d ? 1.1 : 0.92;
      bloomPass.strength = d ? 0.55 : 0.20;
      glassMat.color.setHex(d ? 0x061428 : 0xffffff);
      glassMat.opacity = d ? 0.82 : 0.68;
      nodeMat.emissiveIntensity = d ? 1.8 : 1.1;
      plasmaSphereMat.emissiveIntensity = d ? 3.2 : 2.0;
      webMat.opacity = d ? 0.28 : 0.17;
      sfMat.opacity = d ? 0.82 : 0.40;
      sfMat.blending = d ? THREE.AdditiveBlending : THREE.NormalBlending;
      sfMat.needsUpdate = true;
      ambientLight.color.setHex(d ? 0x081020 : 0xf0f8ff);
      ambientLight.intensity = d ? 2.0 : 3.5;
      keyLight.intensity = d ? 2.5 : 3.0;
      lA.intensity = d ? 5.5 : 3.8; lB.intensity = d ? 4.8 : 3.2;
      lC.intensity = d ? 4.2 : 2.6; lD.intensity = d ? 3.8 : 2.4;
    };
    const themeObs = new MutationObserver(syncTheme);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Animation
    const clock = new THREE.Clock();
    let raf = 0, visible = true, tabVisible = !document.hidden;
    const tmpVec = new THREE.Vector3();
    const nodeActivity = new Float32Array(NODE_COUNT);
    const activeColor = new THREE.Color(0xffffff);
    const tmpColor = new THREE.Color();

    const animate = () => {
      if (!visible || !tabVisible) { raf = 0; return; }
      const t = clock.getElapsedTime();
      haloMat.uniforms.uTime.value = t;
      if (!dragging) { tarX += velY; tarY += velX; velX *= 0.93; velY *= 0.93; }
      curX += (tarX - curX) * 0.055;
      curY += (tarY - curY) * 0.055;
      rootGroup.rotation.x = curX; rootGroup.rotation.y = curY;
      neuralGroup.rotation.y = t * 0.11;
      const pulse = 1.0 + Math.sin(t * 2.5) * 0.09;
      plasmaSphere.scale.setScalar(pulse);
      plasmaSphereMat.emissiveIntensity = (isDark() ? 3.2 : 2.0) * (0.9 + Math.sin(t * 2.5) * 0.1);
      cageMesh1.rotation.x = t * 0.38; cageMesh1.rotation.y = -t * 0.28;
      cageMesh2.rotation.x = -t * 0.48; cageMesh2.rotation.z = t * 0.34;
      for (let i = 0; i < NODE_COUNT; i++) nodeActivity[i] *= 0.96;
      const waveIdx = Math.floor(t * 8) % NODE_COUNT;
      nodeActivity[waveIdx] = 1.0;
      for (let i = 0; i < NODE_COUNT; i++) {
        const a = nodeActivity[i];
        if (a > 0.02) {
          tmpColor.r = baseNodeColors[i*3]   + (activeColor.r - baseNodeColors[i*3])   * a;
          tmpColor.g = baseNodeColors[i*3+1] + (activeColor.g - baseNodeColors[i*3+1]) * a;
          tmpColor.b = baseNodeColors[i*3+2] + (activeColor.b - baseNodeColors[i*3+2]) * a;
          nodeInstanced.setColorAt(i, tmpColor);
        }
      }
      if (nodeInstanced.instanceColor) nodeInstanced.instanceColor.needsUpdate = true;
      impulses.forEach((imp) => {
        imp.t += imp.speed * 0.016;
        if (imp.t >= 1.0) { imp.t = 0; imp.edgeIdx = Math.floor(Math.random() * edges.length); nodeActivity[edges[imp.edgeIdx].b] = 1.0; }
        tmpVec.lerpVectors(allNodes[edges[imp.edgeIdx].a], allNodes[edges[imp.edgeIdx].b], imp.t);
        imp.mesh.position.copy(tmpVec);
      });
      const lx = rootGroup.position.x;
      lA.position.set(lx + Math.sin(t * 1.1) * 4.0, Math.cos(t * 0.8) * 2.8, Math.cos(t * 1.1) * 4.0);
      lB.position.set(lx + Math.cos(-t * 0.9) * 4.5, Math.sin(-t * 1.1) * 3.2, Math.sin(t * 0.75) * 3.6);
      lC.position.set(lx + Math.sin(t * 0.75) * 3.8, -Math.cos(t * 0.9) * 3.0, Math.cos(t * 1.15) * 3.8);
      lD.position.set(lx + Math.cos(t * 0.65) * 4.8, Math.sin(t * 0.55) * 3.6, -Math.sin(t * 0.85) * 3.4);
      starfield.rotation.y = -t * 0.008;
      composer.render();
      raf = requestAnimationFrame(animate);
    };

    const start = () => { if (!raf && visible && tabVisible) { clock.start(); raf = requestAnimationFrame(animate); } };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else if (raf) { cancelAnimationFrame(raf); raf = 0; } }, { threshold: 0.05 });
    io.observe(mount);
    const onVis = () => { tabVisible = !document.hidden; if (tabVisible) start(); else if (raf) { cancelAnimationFrame(raf); raf = 0; } };
    document.addEventListener("visibilitychange", onVis);
    start();

    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth; height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height; camera.updateProjectionMatrix();
      renderer.setSize(width, height); composer.setSize(width, height);
      bloomPass.resolution.set(width, height);
      setRootPos();
    };
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect(); themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      [nodeGeo, glassGeo, haloGeo, plasmaSphereGeo, cageGeo1, cageGeo2, impGeo, webGeo, sfGeo].forEach(g => g.dispose());
      [nodeMat, glassMat, haloMat, plasmaSphereMat, cageMat1, cageMat2, sfMat, webMat].forEach(m => m.dispose());
      impulses.forEach(i => i.mat.dispose());
      composer.dispose(); renderTarget.dispose(); renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={localRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing select-none"
      aria-label="3D AI Neural Network Sphere — drag to rotate"
      role="region"
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 2 — Photorealistic Living Earth
// ─────────────────────────────────────────────────────────────────────────────
function EarthScene() {
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = localRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const isDark = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark() ? 1.25 : 1.1;
    mount.appendChild(renderer.domElement);

    const scene3 = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    const rootGroup = new THREE.Group();
    scene3.add(rootGroup);

    const setRootPos = () => {
      const desktop = width >= 1024;
      rootGroup.position.set(desktop ? 2.1 : 0, desktop ? 0.05 : 0.25, 0);
      rootGroup.scale.setScalar(desktop ? 1.0 : Math.min(1.0, width / 768));
    };
    setRootPos();

    const earthTiltGroup = new THREE.Group();
    earthTiltGroup.rotation.z = -23.4 * (Math.PI / 180);
    rootGroup.add(earthTiltGroup);
    const earthSpinGroup = new THREE.Group();
    earthTiltGroup.add(earthSpinGroup);

    const textureLoader = new THREE.TextureLoader();
    const dayTexture    = textureLoader.load("/textures/earth/earth_atmos_2048.jpg");
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    const nightTexture  = textureLoader.load("/textures/earth/earth_lights_2048.png");
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    const normalTexture = textureLoader.load("/textures/earth/earth_normal_2048.jpg");
    const specTexture   = textureLoader.load("/textures/earth/earth_specular_2048.jpg");
    const cloudsTexture = textureLoader.load("/textures/earth/earth_clouds_1024.png");
    cloudsTexture.colorSpace = THREE.SRGBColorSpace;
    const moonTexture   = textureLoader.load("/textures/earth/moon_1024.jpg");
    moonTexture.colorSpace = THREE.SRGBColorSpace;

    const EARTH_RADIUS = 1.88;
    const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64);
    const sunDirection = new THREE.Vector3(4.5, 2.5, 5.0).normalize();

    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        uDayMap:      { value: dayTexture },
        uNightMap:    { value: nightTexture },
        uNormalMap:   { value: normalTexture },
        uSpecularMap: { value: specTexture },
        uSunDirection:{ value: sunDirection },
        uTime:        { value: 0 },
        uDarkMode:    { value: isDark() ? 1.0 : 0.0 },
      },
      vertexShader: `
        varying vec2 vUv; varying vec3 vNormal; varying vec3 vWorldPosition;
        void main(){vUv=uv;vec4 w=modelMatrix*vec4(position,1.0);vWorldPosition=w.xyz;vNormal=normalize((modelMatrix*vec4(normal,0.0)).xyz);gl_Position=projectionMatrix*viewMatrix*w;}
      `,
      fragmentShader: `
        uniform sampler2D uDayMap,uNightMap,uNormalMap,uSpecularMap;
        uniform vec3 uSunDirection; uniform float uTime,uDarkMode;
        varying vec2 vUv; varying vec3 vNormal; varying vec3 vWorldPosition;
        vec3 brandPalette(float t){
          vec3 c0=vec3(0.118,0.498,0.910),c1=vec3(0.071,0.722,0.651),c2=vec3(0.435,0.812,0.243),c3=vec3(0.545,0.361,0.965),c4=vec3(0.0,0.824,1.0),c5=vec3(0.910,0.475,0.980);
          float f=fract(t)*6.0; int i=int(f); float s=fract(f);
          if(i==0)return mix(c0,c1,s); if(i==1)return mix(c1,c2,s); if(i==2)return mix(c2,c3,s); if(i==3)return mix(c3,c4,s); if(i==4)return mix(c4,c5,s); return mix(c5,c0,s);
        }
        void main(){
          vec3 N=normalize(vNormal); vec3 L=normalize(uSunDirection); vec3 V=normalize(cameraPosition-vWorldPosition);
          vec3 nMap=texture2D(uNormalMap,vUv).xyz*2.0-1.0;
          vec3 bumpN=normalize(N+vec3(nMap.x,nMap.y,0.0)*0.25);
          float sunDot=dot(bumpN,L); float dayMix=smoothstep(-0.15,0.25,sunDot);
          vec4 dayColor=texture2D(uDayMap,vUv); vec4 nightColor=texture2D(uNightMap,vUv); vec4 specColor=texture2D(uSpecularMap,vUv);
          vec3 H=normalize(L+V); float specAmount=pow(max(dot(bumpN,H),0.0),32.0)*specColor.r;
          vec3 specularGlint=vec3(1.0,0.95,0.85)*specAmount*1.6*max(sunDot,0.0);
          vec3 dayLit=dayColor.rgb*(max(sunDot,0.0)*0.95+0.22)+specularGlint;
          float nightFactor=1.0-dayMix;
          vec3 cityLights=nightColor.rgb*vec3(2.2,1.6,0.9)*2.8*nightFactor;
          vec3 nightLit=dayColor.rgb*0.04+cityLights;
          vec3 baseEarth=mix(nightLit,dayLit,dayMix);
          float fresnel=pow(1.0-max(dot(N,V),0.0),3.2);
          baseEarth+=vec3(0.12,0.65,1.0)*fresnel*0.65*max(sunDot+0.35,0.12);
          float waveTime=uTime*0.15;
          float wl=sin(vUv.x*6.28318*2.0-waveTime*2.5)*0.5+0.5;
          float wlt=sin(vUv.y*3.14159*3.0+waveTime*1.5)*0.5+0.5;
          float wavePulse=wl*wlt;
          vec3 waveColor=brandPalette(uTime*0.06+vUv.x*0.4+vUv.y*0.2);
          float grid=step(0.975,fract(vUv.x*36.0))*0.3+step(0.975,fract(vUv.y*18.0))*0.3;
          float pulseBreath=sin(uTime*0.9)*0.5+0.5;
          vec3 colorSynthesis=waveColor*(wavePulse*0.4+grid)*(0.25+0.35*pulseBreath);
          baseEarth+=colorSynthesis;
          gl_FragColor=vec4(baseEarth,1.0);
        }
      `,
    });

    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthSpinGroup.add(earthMesh);

    const cloudsGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.012, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({ map: cloudsTexture, transparent: true, opacity: 0.7, blending: THREE.NormalBlending, depthWrite: false, roughness: 0.9 });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    earthSpinGroup.add(cloudsMesh);

    const atmosGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.12, 48, 48);
    const atmosMat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(0x00d2ff) }, uTime: { value: 0 } },
      vertexShader: `varying vec3 vN,vW;void main(){vN=normalize(normalMatrix*normal);vec4 wp=modelMatrix*vec4(position,1.0);vW=wp.xyz;gl_Position=projectionMatrix*viewMatrix*wp;}`,
      fragmentShader: `uniform vec3 uColor;varying vec3 vN,vW;void main(){vec3 N=normalize(vN);vec3 V=normalize(cameraPosition-vW);float rim=pow(1.0-max(dot(N,V),0.0),3.0);vec3 glow=mix(vec3(0.08,0.45,0.95),uColor,rim*0.85);gl_FragColor=vec4(glow,rim*0.72);}`,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
    });
    rootGroup.add(new THREE.Mesh(atmosGeo, atmosMat));

    const moonGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({ map: moonTexture, roughness: 0.9, metalness: 0.05 });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    const moonOrbit = new THREE.Group();
    moonOrbit.rotation.x = 0.35; moonOrbit.rotation.z = 0.25;
    rootGroup.add(moonOrbit);
    moonMesh.position.set(3.38, 2.73, -1.645);
    moonOrbit.add(moonMesh);

    // Stars
    const STAR_N = 2042;
    const sfp = new Float32Array(STAR_N*3), sfc = new Float32Array(STAR_N*3);
    const spal = [new THREE.Color(0xffffff), new THREE.Color(0x99ccff), new THREE.Color(0x00d2ff), new THREE.Color(0x12b8a6)];
    const ecx = rootGroup.position.x;
    for (let i = 0; i < 2000; i++) {
      const r = 2.8 + Math.random()*6.5, th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1);
      sfp[i*3]=ecx+r*Math.sin(ph)*Math.cos(th); sfp[i*3+1]=r*Math.sin(ph)*Math.sin(th); sfp[i*3+2]=r*Math.cos(ph);
      const c=spal[i%spal.length]; sfc[i*3]=c.r; sfc[i*3+1]=c.g; sfc[i*3+2]=c.b;
    }
    for (let i=2000;i<STAR_N;i++){sfp[i*3]=-6.5+Math.random()*5.8;sfp[i*3+1]=-3.5+Math.random()*7.0;sfp[i*3+2]=-3.0+Math.random()*4.5;const c=spal[i%spal.length];sfc[i*3]=c.r;sfc[i*3+1]=c.g;sfc[i*3+2]=c.b;}
    const sfGeo=new THREE.BufferGeometry();
    sfGeo.setAttribute("position",new THREE.BufferAttribute(sfp,3));
    sfGeo.setAttribute("color",new THREE.BufferAttribute(sfc,3));
    const sfMat=new THREE.PointsMaterial({size:0.09,sizeAttenuation:true,vertexColors:true,transparent:true,opacity:isDark()?0.85:0.45,blending:isDark()?THREE.AdditiveBlending:THREE.NormalBlending,depthWrite:false});
    const starfield=new THREE.Points(sfGeo,sfMat); scene3.add(starfield);

    // Lights
    scene3.add(new THREE.AmbientLight(isDark()?0x141828:0xf0f5ff, isDark()?1.4:2.6));
    const sunLight = new THREE.DirectionalLight(0xffffff, isDark()?3.0:3.4);
    sunLight.position.copy(sunDirection.clone().multiplyScalar(10)); scene3.add(sunLight);
    scene3.add(new THREE.DirectionalLight(0x00d2ff, isDark()?1.2:0.8).position.set(-6,-3,-4) && new THREE.DirectionalLight(0x00d2ff, isDark()?1.2:0.8));

    // Interaction
    let tarX=0,tarY=0,curX=0,curY=0,dragging=false,pMX=0,pMY=0,velX=0,velY=0;
    const onDown=(e:PointerEvent)=>{dragging=true;pMX=e.clientX;pMY=e.clientY;velX=velY=0;};
    const onUp=()=>{dragging=false;};
    const onMove=(e:PointerEvent)=>{
      if(dragging){const dx=e.clientX-pMX,dy=e.clientY-pMY;pMX=e.clientX;pMY=e.clientY;tarY+=dx*0.005;tarX+=dy*0.005;velX=dx*0.005;velY=dy*0.005;}
      else{tarY=((e.clientX-window.innerWidth/2)/(window.innerWidth/2))*0.25;tarX=((e.clientY-window.innerHeight/2)/(window.innerHeight/2))*0.25;}
    };
    window.addEventListener("pointermove",onMove,{passive:true});
    mount.addEventListener("pointerdown",onDown);
    window.addEventListener("pointerup",onUp);

    const clock=new THREE.Clock(); let raf=0,visible=true,tabVisible=!document.hidden;
    const animate=()=>{
      if(!visible||!tabVisible){raf=0;return;}
      const t=clock.getElapsedTime();
      earthMat.uniforms.uTime.value=t;
      atmosMat.uniforms.uTime.value=t;
      if(!dragging){tarX+=velY;tarY+=velX;velX*=0.94;velY*=0.94;}
      curX+=(tarX-curX)*0.05; curY+=(tarY-curY)*0.05;
      rootGroup.rotation.x=curX; rootGroup.rotation.y=curY;
      earthSpinGroup.rotation.y=t*0.05;
      cloudsMesh.rotation.y=t*0.065;
      moonOrbit.rotation.y=t*0.025; moonMesh.rotation.y=t*0.04;
      starfield.rotation.y=-t*0.008;
      renderer.render(scene3,camera); raf=requestAnimationFrame(animate);
    };
    const start=()=>{if(!raf&&visible&&tabVisible){clock.start();raf=requestAnimationFrame(animate);}};
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)start();else if(raf){cancelAnimationFrame(raf);raf=0;}},{threshold:0.05});
    io.observe(mount);
    const onVis=()=>{tabVisible=!document.hidden;if(tabVisible)start();else if(raf){cancelAnimationFrame(raf);raf=0;}};
    document.addEventListener("visibilitychange",onVis);
    start();

    const onResize=()=>{if(!mount)return;width=mount.clientWidth;height=mount.clientHeight;if(!width||!height)return;camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);setRootPos();};
    window.addEventListener("resize",onResize); onResize();

    return ()=>{
      if(raf)cancelAnimationFrame(raf); io.disconnect();
      document.removeEventListener("visibilitychange",onVis);
      window.removeEventListener("resize",onResize);
      window.removeEventListener("pointermove",onMove);
      mount.removeEventListener("pointerdown",onDown);
      window.removeEventListener("pointerup",onUp);
      [earthGeo,cloudsGeo,atmosGeo,moonGeo,sfGeo].forEach(g=>g.dispose());
      [earthMat,cloudsMat,atmosMat,moonMat,sfMat].forEach(m=>m.dispose());
      [dayTexture,nightTexture,normalTexture,specTexture,cloudsTexture,moonTexture].forEach(t=>t.dispose());
      renderer.dispose();
      if(mount.contains(renderer.domElement))mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={localRef} className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing select-none" aria-label="Photorealistic Living Earth" role="region" />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 3 — Living Quantum Orb (GLSL vertex morph + 3-ring gimbal)
// ─────────────────────────────────────────────────────────────────────────────
function QuantumOrbScene() {
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = localRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const isDark = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark() ? 1.3 : 0.95;
    mount.appendChild(renderer.domElement);

    const scene3 = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 120);
    camera.position.set(0, 0, 9.0);

    const rootGroup = new THREE.Group();
    scene3.add(rootGroup);

    const setRootPos = () => {
      const desktop = width >= 1024;
      rootGroup.position.set(desktop ? 1.9 : 0, desktop ? 0.1 : 0.3, 0);
      rootGroup.scale.setScalar(desktop ? 1 : Math.min(1, width / 768));
    };
    setRootPos();

    // ── Orb ShaderMaterial (morphing sphere) ──────────────────────────────
    const orbGeo = new THREE.SphereGeometry(1.38, 128, 128);
    const orbMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uMorphAmplitude: { value: 0.18 }, uBrightness: { value: isDark() ? 1.0 : 0.72 } },
      vertexShader: `
        uniform float uTime; uniform float uMorphAmplitude;
        varying vec3 vDisplace; varying vec3 vWorldPos; varying vec3 vNormal;
        float hash(vec3 p){p=fract(p*vec3(443.8,441.4,437.2));p+=dot(p,p.yxz+19.19);return fract((p.x+p.y)*p.z);}
        float noise(vec3 p){vec3 i=floor(p),f=fract(p);vec3 u=f*f*(3.0-2.0*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),u.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),u.x),u.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),u.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),u.x),u.y),u.z);}
        float fbm(vec3 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.1+vec3(1.7,9.2,3.4);a*=0.5;}return v;}
        void main(){
          vec3 p=normalize(position);
          float d=fbm(p*2.8+uTime*0.18)*uMorphAmplitude;
          float d2=fbm(p*5.2-uTime*0.12)*uMorphAmplitude*0.45;
          vec3 displaced=position+normal*(d+d2);
          vDisplace=vec3(d+d2); vWorldPos=(modelMatrix*vec4(displaced,1.0)).xyz;
          vNormal=normalMatrix*normal;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(displaced,1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime; uniform float uBrightness;
        varying vec3 vDisplace; varying vec3 vWorldPos; varying vec3 vNormal;
        #define PI 3.14159265
        vec3 palette(float t){
          vec3 c0=vec3(0.118,0.498,0.910),c1=vec3(0.071,0.722,0.651),c2=vec3(0.435,0.812,0.243),c3=vec3(0.545,0.361,0.965),c4=vec3(0.0,0.824,1.0),c5=vec3(0.910,0.475,0.980);
          float f=fract(t)*6.0; int i=int(f); float s=fract(f);
          if(i==0)return mix(c0,c1,s); if(i==1)return mix(c1,c2,s); if(i==2)return mix(c2,c3,s); if(i==3)return mix(c3,c4,s); if(i==4)return mix(c4,c5,s); return mix(c5,c0,s);
        }
        void main(){
          vec3 N=normalize(vNormal); vec3 V=normalize(cameraPosition-vWorldPos);
          float t=vDisplace.x*4.5+vWorldPos.y*0.28+uTime*0.065;
          vec3 surfaceColor=palette(t)*uBrightness;
          vec3 rimColor=palette(t+0.25)*uBrightness;
          float fresnel=pow(1.0-max(dot(N,V),0.0),2.8);
          float dispGlow=smoothstep(0.06,0.18,vDisplace.x)*0.6;
          vec3 glowColor=palette(t+0.5)*uBrightness;
          vec3 finalColor=surfaceColor+rimColor*fresnel*1.4+glowColor*dispGlow;
          finalColor=pow(finalColor,vec3(0.88));
          gl_FragColor=vec4(finalColor,1.0);
        }
      `,
    });
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);

    // ── Glass outer shell ──────────────────────────────────────────────────
    const glassGeo = new THREE.SphereGeometry(1.52, 64, 64);
    const glassMat2 = new THREE.MeshPhysicalMaterial({ transmission: 0.88, thickness: 1.0, ior: 1.46, roughness: 0.06, metalness: 0.04, clearcoat: 1.0, clearcoatRoughness: 0.04, transparent: true, opacity: 0.22, depthWrite: false });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat2);

    // ── Core pulse ─────────────────────────────────────────────────────────
    const coreGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: new THREE.Color(0x00d2ff), emissiveIntensity: isDark() ? 2.2 : 1.4, roughness: 0.1, metalness: 0.9 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);

    const orbGroup = new THREE.Group();
    orbGroup.add(orbMesh, glassMesh, coreMesh);
    rootGroup.add(orbGroup);

    // ── 3 Atomic orbital rings (clean, at 0°, +60°, -60°) ─────────────────
    const makeRing = (tubeR: number, angle: number, colorHex: number) => {
      const geo = new THREE.TorusGeometry(2.45, tubeR, 200, 200);
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(colorHex), emissive: new THREE.Color(colorHex), emissiveIntensity: isDark() ? 2.2 : 1.3, roughness: 0.1, metalness: 0.9 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = angle * (Math.PI / 180);
      const satGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const satM = new THREE.MeshStandardMaterial({ color: new THREE.Color(colorHex), emissive: new THREE.Color(colorHex), emissiveIntensity: isDark() ? 2.8 : 1.8, roughness: 0.1, metalness: 0.9 });
      const sat = new THREE.Mesh(satGeo, satM);
      const ringGroup = new THREE.Group();
      ringGroup.add(mesh, sat);
      rootGroup.add(ringGroup);
      return { mesh, mat, sat, satM, geo, satGeo, radius: 2.45, ringGroup };
    };
    const ring1 = makeRing(0.022, 0,   0x1e7fe8);
    const ring2 = makeRing(0.018, 60,  0x12b8a6);
    const ring3 = makeRing(0.015, -60, 0x8b5cf6);

    // ── Stars ──────────────────────────────────────────────────────────────
    const STAR_N = 2042;
    const sfp2 = new Float32Array(STAR_N*3), sfc2 = new Float32Array(STAR_N*3);
    const spal2 = [new THREE.Color(0xffffff), new THREE.Color(0x99ccff), new THREE.Color(0x00d2ff), new THREE.Color(0x12b8a6)];
    const ocx = rootGroup.position.x;
    for(let i=0;i<2000;i++){const r=2.8+Math.random()*6.5,th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1);sfp2[i*3]=ocx+r*Math.sin(ph)*Math.cos(th);sfp2[i*3+1]=r*Math.sin(ph)*Math.sin(th);sfp2[i*3+2]=r*Math.cos(ph);const c=spal2[i%spal2.length];sfc2[i*3]=c.r;sfc2[i*3+1]=c.g;sfc2[i*3+2]=c.b;}
    for(let i=2000;i<STAR_N;i++){sfp2[i*3]=-6.5+Math.random()*5.8;sfp2[i*3+1]=-3.5+Math.random()*7.0;sfp2[i*3+2]=-3.0+Math.random()*4.5;const c=spal2[i%spal2.length];sfc2[i*3]=c.r;sfc2[i*3+1]=c.g;sfc2[i*3+2]=c.b;}
    const sfGeo2=new THREE.BufferGeometry();
    sfGeo2.setAttribute("position",new THREE.BufferAttribute(sfp2,3));
    sfGeo2.setAttribute("color",new THREE.BufferAttribute(sfc2,3));
    const sfMat2=new THREE.PointsMaterial({size:0.09,sizeAttenuation:true,vertexColors:true,transparent:true,opacity:isDark()?0.85:0.45,blending:isDark()?THREE.AdditiveBlending:THREE.NormalBlending,depthWrite:false});
    const starfield2=new THREE.Points(sfGeo2,sfMat2); scene3.add(starfield2);

    // ── Lights ─────────────────────────────────────────────────────────────
    const ambLight=new THREE.AmbientLight(isDark()?0x0a0f1e:0xf0f5ff,isDark()?1.4:2.6);
    scene3.add(ambLight);
    const lA2=new THREE.PointLight(0x1e7fe8,isDark()?5.5:3.5,14);
    const lB2=new THREE.PointLight(0x00d2ff,isDark()?5.0:3.2,14);
    const lC2=new THREE.PointLight(0x12b8a6,isDark()?4.2:2.8,12);
    const lD2=new THREE.PointLight(0x8b5cf6,isDark()?4.5:3.0,12);
    const dirLight=new THREE.DirectionalLight(0xffffff,isDark()?2.5:3.0);
    dirLight.position.set(5,6,8); scene3.add(ambLight,lA2,lB2,lC2,lD2,dirLight);

    // ── Interaction ────────────────────────────────────────────────────────
    let tarX=0,tarY=0,curX=0,curY=0,dragging=false,pMX=0,pMY=0,velX=0,velY=0;
    const onDown=(e:PointerEvent)=>{dragging=true;pMX=e.clientX;pMY=e.clientY;velX=velY=0;};
    const onUp=()=>{dragging=false;};
    const onMove=(e:PointerEvent)=>{
      if(dragging){const dx=e.clientX-pMX,dy=e.clientY-pMY;pMX=e.clientX;pMY=e.clientY;tarY+=dx*0.005;tarX+=dy*0.005;velX=dx*0.005;velY=dy*0.005;}
      else{tarY=((e.clientX-window.innerWidth/2)/(window.innerWidth/2))*0.25;tarX=((e.clientY-window.innerHeight/2)/(window.innerHeight/2))*0.25;}
    };
    window.addEventListener("pointermove",onMove,{passive:true});
    mount.addEventListener("pointerdown",onDown);
    window.addEventListener("pointerup",onUp);

    const pal6=[0x1e7fe8,0x12b8a6,0x6fcf3e,0x8b5cf6,0x00d2ff,0xe879f9];
    const colAt=(phase:number)=>{const f=((phase%1)+1)%1,fi=f*6,i=Math.floor(fi)%6,j=(i+1)%6,s=fi-Math.floor(fi);const ca=new THREE.Color(pal6[i]),cb=new THREE.Color(pal6[j]);return ca.lerp(cb,s);};

    const clock=new THREE.Clock(); let raf=0,visible=true,tabVisible=!document.hidden;
    const animate=()=>{
      if(!visible||!tabVisible){raf=0;return;}
      const t=clock.getElapsedTime();
      orbMat.uniforms.uTime.value=t;
      if(!dragging){tarX+=velY;tarY+=velX;velX*=0.94;velY*=0.94;}
      curX+=(tarX-curX)*0.05; curY+=(tarY-curY)*0.05;
      rootGroup.rotation.x=curX+Math.sin(t*0.42)*0.045;
      rootGroup.rotation.y=curY+t*0.10;
      const breathS=1.0+Math.sin(t*1.9)*0.025;
      orbMesh.scale.setScalar(breathS);
      glassMesh.rotation.y=-t*0.04; glassMesh.rotation.z=t*0.028;
      const cp=1.0+Math.sin(t*2.8)*0.12; coreMesh.scale.setScalar(cp);
      const globalPhase=t*0.065;
      const r1col=colAt(globalPhase); ring1.mat.emissive.copy(r1col); ring1.mat.color.copy(r1col); ring1.satM.emissive.copy(r1col); ring1.satM.color.copy(r1col);
      const r2col=colAt(globalPhase+0.33); ring2.mat.emissive.copy(r2col); ring2.mat.color.copy(r2col); ring2.satM.emissive.copy(r2col); ring2.satM.color.copy(r2col);
      const r3col=colAt(globalPhase+0.67); ring3.mat.emissive.copy(r3col); ring3.mat.color.copy(r3col); ring3.satM.emissive.copy(r3col); ring3.satM.color.copy(r3col);
      ring1.mesh.rotation.y=t*0.42; ring1.sat.position.x=Math.cos(t*2.1)*ring1.radius; ring1.sat.position.y=Math.sin(t*2.1)*ring1.radius;
      ring2.mesh.rotation.y=-t*0.31; ring2.sat.position.x=Math.cos(-t*1.7)*ring2.radius; ring2.sat.position.z=Math.sin(-t*1.7)*ring2.radius;
      ring3.mesh.rotation.y=t*0.24; ring3.sat.position.y=Math.cos(t*1.4)*ring3.radius; ring3.sat.position.z=Math.sin(t*1.4)*ring3.radius;
      const lx=rootGroup.position.x;
      lA2.position.set(lx+Math.sin(t*0.8)*4,Math.cos(t*0.6)*3,Math.cos(t*0.8)*4);
      lB2.position.set(lx+Math.cos(-t*0.7)*4.5,Math.sin(-t*0.9)*3.5,Math.sin(t*0.65)*3.8);
      lC2.position.set(lx+Math.sin(t*0.6)*3.8,-Math.cos(t*0.75)*3,Math.cos(t*0.9)*4);
      lD2.position.set(lx+Math.cos(t*0.5)*5,Math.sin(t*0.45)*3.8,-Math.sin(t*0.7)*3.6);
      starfield2.rotation.y=-t*0.012;
      renderer.render(scene3,camera); raf=requestAnimationFrame(animate);
    };
    const start=()=>{if(!raf&&visible&&tabVisible){clock.start();raf=requestAnimationFrame(animate);}};
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)start();else if(raf){cancelAnimationFrame(raf);raf=0;}},{threshold:0.05});
    io.observe(mount);
    const onVis=()=>{tabVisible=!document.hidden;if(tabVisible)start();else if(raf){cancelAnimationFrame(raf);raf=0;}};
    document.addEventListener("visibilitychange",onVis);
    start();

    const onResize=()=>{if(!mount)return;width=mount.clientWidth;height=mount.clientHeight;if(!width||!height)return;camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);setRootPos();};
    window.addEventListener("resize",onResize); onResize();

    return ()=>{
      if(raf)cancelAnimationFrame(raf); io.disconnect();
      document.removeEventListener("visibilitychange",onVis);
      window.removeEventListener("resize",onResize);
      window.removeEventListener("pointermove",onMove);
      mount.removeEventListener("pointerdown",onDown);
      window.removeEventListener("pointerup",onUp);
      [orbGeo,glassGeo,coreGeo,ring1.geo,ring1.satGeo,ring2.geo,ring2.satGeo,ring3.geo,ring3.satGeo,sfGeo2].forEach(g=>g.dispose());
      [orbMat,glassMat2,coreMat,ring1.mat,ring1.satM,ring2.mat,ring2.satM,ring3.mat,ring3.satM,sfMat2].forEach(m=>m.dispose());
      renderer.dispose();
      if(mount.contains(renderer.domElement))mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={localRef} className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing select-none" aria-label="Living Quantum Orb" role="region" />
  );
}
