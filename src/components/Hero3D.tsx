"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

/**
 * NATLE Hero 3D — World-Class AI / Neural Network Holographic Sphere
 *
 * Enterprise-grade visual engineering:
 * - Fibonacci mathematical node distribution (120 outer + 50 inner nodes)
 * - 3-layer depth architecture (Core 0.5R / Processing 0.75R / Interface 1.0R)
 * - UnrealBloomPass HDR glow post-processing for luminous neon depth
 * - Dense neural web of 300+ connections with depth-faded opacity
 * - 45 simultaneously-traveling luminous neural impulse packets
 * - Node activity waves: periodic synapse firing cascades
 * - MeshPhysicalMaterial crystal glass outer sphere (IOR 1.45, 93% transmission)
 * - 4-layer depth inner neural architecture + central plasma icosahedron core
 * - Animated outer Fresnel atmosphere halo
 * - 4 Holographic HUD panels (with live telemetry) + sci-fi dogleg leader lines
 * - Holographic pedestal base with concentric emitter rings + beam shader
 * - 380 upward-rising holographic dust particles
 * - 1,600 galaxy stardust + 42 left-side balance stars
 * - Full drag-rotate with smooth inertia + mouse parallax
 * - GPU-efficient: single LineSegments buffer, InstancedMesh nodes, RAF pause on blur
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const isDark = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    // ─────────────────────────────────────────────────────────────────────────
    // 1. RENDERER
    // ─────────────────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark() ? 1.2 : 0.9;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ─────────────────────────────────────────────────────────────────────────
    // 2. SCENE & CAMERA
    // ─────────────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.0);

    // ─────────────────────────────────────────────────────────────────────────
    // 3. BLOOM POST-PROCESSING
    // ─────────────────────────────────────────────────────────────────────────
    const renderTarget = new THREE.WebGLRenderTarget(width, height, {
      type: THREE.HalfFloatType,
      colorSpace: THREE.SRGBColorSpace,
    });
    const composer = new EffectComposer(renderer, renderTarget);

    const renderPass = new RenderPass(scene, camera);
    renderPass.clearColor = new THREE.Color(0, 0, 0);
    renderPass.clearAlpha = 0;
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      isDark() ? 1.85 : 0.8,   // strength
      0.42,                      // radius
      0.06                       // threshold — low so all neon glows
    );
    composer.addPass(bloomPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // ─────────────────────────────────────────────────────────────────────────
    // 4. ROOT PLACEMENT
    // ─────────────────────────────────────────────────────────────────────────
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const setRootPos = () => {
      const desktop = width >= 1024;
      rootGroup.position.set(desktop ? 2.1 : 0, desktop ? 0.05 : 0.3, 0);
      rootGroup.scale.setScalar(desktop ? 1.0 : Math.min(0.88, width / 768));
    };
    setRootPos();

    // The neural sphere assembly rotates with drag
    const neuralGroup = new THREE.Group();
    rootGroup.add(neuralGroup);

    // ─────────────────────────────────────────────────────────────────────────
    // 5. FIBONACCI NODE DISTRIBUTION (mathematical perfection)
    // ─────────────────────────────────────────────────────────────────────────
    const SPHERE_R = 1.52;
    const PHI = Math.PI * (3 - Math.sqrt(5)); // golden angle ≈ 2.399 rad

    const fibSphere = (count: number, radius: number): THREE.Vector3[] => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = PHI * i;
        pts.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
      }
      return pts;
    };

    // Three concentric layers: interface (outer), processing (mid), core
    const outerNodes = fibSphere(120, SPHERE_R);            // interface layer
    const midNodes   = fibSphere(50,  SPHERE_R * 0.74);     // processing layer
    const innerNodes = fibSphere(22,  SPHERE_R * 0.48);     // core layer

    const allNodes = [...outerNodes, ...midNodes, ...innerNodes];
    const NODE_COUNT = allNodes.length;

    // ─────────────────────────────────────────────────────────────────────────
    // 6. NEURAL NODE INSTANCED SPHERES (GPU-efficient)
    // ─────────────────────────────────────────────────────────────────────────
    // Color map per layer
    const layerColors = [
      new THREE.Color(0x00e5ff),  // outer: cyan
      new THREE.Color(0xffb300),  // mid: gold
      new THREE.Color(0xa855f7),  // inner: violet
    ];

    const nodeGeo = new THREE.SphereGeometry(0.036, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: isDark() ? 3.2 : 2.0,
      roughness: 0.1,
      metalness: 0.9,
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
      baseNodeColors[idx * 3]     = c.r;
      baseNodeColors[idx * 3 + 1] = c.g;
      baseNodeColors[idx * 3 + 2] = c.b;
    });

    nodeInstanced.instanceMatrix.needsUpdate = true;
    if (nodeInstanced.instanceColor) nodeInstanced.instanceColor.needsUpdate = true;
    neuralGroup.add(nodeInstanced);

    // ─────────────────────────────────────────────────────────────────────────
    // 7. DENSE NEURAL CONNECTION WEB (single LineSegments buffer)
    // ─────────────────────────────────────────────────────────────────────────
    interface NeuralEdge { a: number; b: number; da: number }
    const edges: NeuralEdge[] = [];
    const edgePoints: THREE.Vector3[] = [];

    const pushEdgeIfClose = (i: number, j: number, threshold: number) => {
      const d = allNodes[i].distanceTo(allNodes[j]);
      if (d < threshold) {
        edges.push({ a: i, b: j, da: d });
        edgePoints.push(allNodes[i], allNodes[j]);
      }
    };

    // Within layer: connect neighbors
    for (let i = 0; i < outerNodes.length; i++) {
      for (let j = i + 1; j < outerNodes.length; j++) {
        pushEdgeIfClose(i, j, 0.75);
      }
    }
    for (let i = 120; i < 170; i++) {
      for (let j = i + 1; j < 170; j++) {
        pushEdgeIfClose(i, j, 1.1);
      }
    }
    for (let i = 170; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        pushEdgeIfClose(i, j, 1.5);
      }
    }
    // Cross-layer connections (outer <-> mid, mid <-> inner)
    for (let i = 0; i < outerNodes.length; i++) {
      for (let j = 120; j < 170; j++) {
        pushEdgeIfClose(i, j, 0.95);
      }
    }
    for (let i = 120; i < 170; i++) {
      for (let j = 170; j < NODE_COUNT; j++) {
        pushEdgeIfClose(i, j, 1.2);
      }
    }

    const webGeo = new THREE.BufferGeometry().setFromPoints(edgePoints);
    const webMat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: isDark() ? 0.28 : 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const webLines = new THREE.LineSegments(webGeo, webMat);
    neuralGroup.add(webLines);

    // ─────────────────────────────────────────────────────────────────────────
    // 8. NEURAL IMPULSE PACKETS (45 traveling light signals)
    // ─────────────────────────────────────────────────────────────────────────
    const IMPULSE_COUNT = 45;
    const impulseColors = [
      new THREE.Color(0x00ffff),
      new THREE.Color(0xffd54f),
      new THREE.Color(0xd8b4fe),
      new THREE.Color(0x6fcf3e),
      new THREE.Color(0xffffff),
    ];

    interface Impulse {
      mesh: THREE.Mesh;
      mat: THREE.MeshBasicMaterial;
      edgeIdx: number;
      t: number;
      speed: number;
    }

    const impGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const impulses: Impulse[] = [];

    for (let i = 0; i < IMPULSE_COUNT; i++) {
      const col = impulseColors[i % impulseColors.length];
      const mat = new THREE.MeshBasicMaterial({ color: col });
      const mesh = new THREE.Mesh(impGeo, mat);
      neuralGroup.add(mesh);
      impulses.push({
        mesh,
        mat,
        edgeIdx: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.18 + Math.random() * 0.22,
      });
    }

    // Node activity pulse state (0=idle, 1=firing)
    const nodeActivity = new Float32Array(NODE_COUNT);
    const tmpColor = new THREE.Color();

    // ─────────────────────────────────────────────────────────────────────────
    // 9. CRYSTAL GLASS OUTER SPHERE
    // ─────────────────────────────────────────────────────────────────────────
    const glassGeo = new THREE.SphereGeometry(SPHERE_R, 72, 72);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDark() ? 0x061428 : 0xffffff),
      transmission: 0.93,
      thickness: 1.3,
      ior: 1.45,
      roughness: 0.03,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transparent: true,
      opacity: isDark() ? 0.82 : 0.68,
      depthWrite: false,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    neuralGroup.add(glassMesh);

    // ─────────────────────────────────────────────────────────────────────────
    // 10. OUTER FRESNEL ATMOSPHERE HALO
    // ─────────────────────────────────────────────────────────────────────────
    const haloGeo = new THREE.SphereGeometry(SPHERE_R * 1.06, 48, 48);
    const haloMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */`
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * viewMatrix * (modelMatrix * vec4(position, 1.0));
        }
      `,
      fragmentShader: /* glsl */`
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(cameraPosition - vWorldPos);
          float rim = pow(1.0 - max(dot(N, V), 0.0), 2.6);
          float pulse = sin(uTime * 1.8) * 0.15 + 0.85;
          vec3 cyanBlue = vec3(0.0, 0.82, 1.0) * pulse;
          gl_FragColor = vec4(cyanBlue, rim * 0.72);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    rootGroup.add(haloMesh);

    // ─────────────────────────────────────────────────────────────────────────
    // 11. INNER CORE: Plasma nucleus + nested geodesic cage
    // ─────────────────────────────────────────────────────────────────────────
    const coreGroup = new THREE.Group();
    neuralGroup.add(coreGroup);

    const plasmaSphereGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const plasmaSphereMat = new THREE.MeshStandardMaterial({
      color: 0xfff9e0,
      emissive: new THREE.Color(0xffcc00),
      emissiveIntensity: isDark() ? 5.5 : 3.2,
      roughness: 0.0,
      metalness: 1.0,
    });
    const plasmaSphere = new THREE.Mesh(plasmaSphereGeo, plasmaSphereMat);
    coreGroup.add(plasmaSphere);

    // Outer geodesic cage (icosahedron wireframe)
    const cageGeo1 = new THREE.IcosahedronGeometry(0.62, 1);
    const cageMat1 = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: isDark() ? 0.72 : 0.45,
    });
    const cageMesh1 = new THREE.Mesh(cageGeo1, cageMat1);
    coreGroup.add(cageMesh1);

    // Inner geodesic cage
    const cageGeo2 = new THREE.OctahedronGeometry(0.42);
    const cageMat2 = new THREE.MeshBasicMaterial({
      color: 0xffd54f,
      wireframe: true,
      transparent: true,
      opacity: isDark() ? 0.65 : 0.4,
    });
    const cageMesh2 = new THREE.Mesh(cageGeo2, cageMat2);
    coreGroup.add(cageMesh2);

    // ─────────────────────────────────────────────────────────────────────────
    // 12. HOLOGRAPHIC HUD PANELS (4 floating cards with leader lines)
    // ─────────────────────────────────────────────────────────────────────────
    const makePanelTexture = (
      title: string,
      tag: string,
      accent: string,
      lines: string[],
      barFills: number[]
    ) => {
      const cv = document.createElement("canvas");
      cv.width = 400; cv.height = 256;
      const cx = cv.getContext("2d")!;

      // Glass base
      cx.fillStyle = isDark() ? "rgba(4, 14, 32, 0.80)" : "rgba(255,255,255,0.85)";
      cx.beginPath();
      cx.roundRect(5, 5, 390, 246, 14);
      cx.fill();

      // Neon border + subtle inner glow
      cx.strokeStyle = accent;
      cx.lineWidth = 2.5;
      cx.shadowBlur = 8;
      cx.shadowColor = accent;
      cx.stroke();
      cx.shadowBlur = 0;

      // Header: status dot + title + tag
      cx.fillStyle = accent;
      cx.beginPath();
      cx.arc(26, 34, 5, 0, Math.PI * 2);
      cx.fill();

      cx.font = "bold 14px monospace";
      cx.fillStyle = isDark() ? "#F0F9FF" : "#0C0C0C";
      cx.fillText(title, 40, 39);

      cx.font = "bold 11px monospace";
      cx.fillStyle = accent;
      cx.textAlign = "right";
      cx.fillText(tag, 385, 39);
      cx.textAlign = "left";

      // Divider
      cx.strokeStyle = accent + "44";
      cx.lineWidth = 1;
      cx.beginPath();
      cx.moveTo(18, 52); cx.lineTo(382, 52);
      cx.stroke();

      // Content lines
      cx.font = "12px monospace";
      cx.fillStyle = isDark() ? "#94A3B8" : "#475569";
      lines.forEach((line, i) => cx.fillText(line, 20, 72 + i * 22));

      // Progress bars at bottom
      barFills.forEach((fill, i) => {
        const y = 192 + i * 22;
        cx.fillStyle = isDark() ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
        cx.fillRect(20, y, 360, 8);
        cx.fillStyle = accent;
        cx.fillRect(20, y, 360 * fill, 8);
      });

      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    };

    const PANELS = [
      {
        title: "NEURAL ENGINE",      tag: "[LIVE]",     accent: "#00E5FF",
        lines: ["> Inference latency: 1.2ms (p99)", "> Active synapses:  48,960", "> Precision:        FP16/BF16"],
        bars: [0.82, 0.91],
        pos: new THREE.Vector3(-2.2,  1.1, 0.5),
        anchor: new THREE.Vector3(-SPHERE_R * 0.85, SPHERE_R * 0.6, SPHERE_R * 0.4),
      },
      {
        title: "DATA PIPELINE",      tag: "[STREAM]",   accent: "#1E7FE8",
        lines: ["> Throughput:     4.8 GB/s", "> Microservices:  128 online", "> Architecture:   Reactive"],
        bars: [0.74, 0.88],
        pos: new THREE.Vector3(-2.3, -0.9, 0.5),
        anchor: new THREE.Vector3(-SPHERE_R * 0.85, -SPHERE_R * 0.55, SPHERE_R * 0.45),
      },
      {
        title: "CLOUD COMPUTE",      tag: "[99.999%]",  accent: "#12B8A6",
        lines: ["> Regions:  Multi-Zone HA", "> Uptime:   99.999% SLA", "> Deploys:  Zero-Downtime"],
        bars: [0.96, 0.79],
        pos: new THREE.Vector3( 2.2,  1.2, 0.5),
        anchor: new THREE.Vector3( SPHERE_R * 0.85, SPHERE_R * 0.65, SPHERE_R * 0.38),
      },
      {
        title: "SYSTEM HEALTH",      tag: "[OPTIMAL]",  accent: "#6FCF3E",
        lines: ["> Nodes:     1,024 healthy", "> Encryption: Quantum-safe", "> Alerts:    0 critical"],
        bars: [0.99, 0.88],
        pos: new THREE.Vector3( 2.3, -0.8, 0.5),
        anchor: new THREE.Vector3( SPHERE_R * 0.88, -SPHERE_R * 0.55, SPHERE_R * 0.42),
      },
    ];

    const panelPlaneGeo = new THREE.PlaneGeometry(1.08, 0.68);
    const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [panelPlaneGeo];

    const hudGroup = new THREE.Group();
    rootGroup.add(hudGroup);

    const panelData: {
      mesh: THREE.Mesh;
      mat: THREE.MeshBasicMaterial;
      tex: THREE.CanvasTexture;
      baseY: number;
      packetMesh: THREE.Mesh;
      anchor: THREE.Vector3;
      speed: number;
    }[] = [];

    PANELS.forEach((p, i) => {
      const tex = makePanelTexture(p.title, p.tag, p.accent, p.lines, p.bars);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: isDark() ? 0.95 : 0.90, side: THREE.DoubleSide, depthWrite: false });
      const mesh = new THREE.Mesh(panelPlaneGeo, mat);
      mesh.position.copy(p.pos);
      hudGroup.add(mesh);

      // Dogleg leader line
      const edge = p.pos.clone().add(new THREE.Vector3(p.pos.x > 0 ? -0.54 : 0.54, 0, 0));
      const knee = new THREE.Vector3((edge.x + p.anchor.x) * 0.52, edge.y, (edge.z + p.anchor.z) * 0.5);
      const leaderGeo = new THREE.BufferGeometry().setFromPoints([edge, knee, p.anchor]);
      const leaderMat = new THREE.LineBasicMaterial({ color: new THREE.Color(p.accent), transparent: true, opacity: isDark() ? 0.7 : 0.5 });
      const leaderLine = new THREE.Line(leaderGeo, leaderMat);
      hudGroup.add(leaderLine);

      // Data packet on leader line
      const pktGeo = new THREE.SphereGeometry(0.038, 10, 10);
      const pktMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pktMesh = new THREE.Mesh(pktGeo, pktMat);
      hudGroup.add(pktMesh);

      disposables.push(leaderGeo, leaderMat, pktGeo, pktMat, mat, tex);
      panelData.push({ mesh, mat, tex, baseY: p.pos.y, packetMesh: pktMesh, anchor: p.anchor.clone(), speed: 0.3 + i * 0.07 });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 13. HOLOGRAPHIC PROJECTOR PEDESTAL BASE
    // ─────────────────────────────────────────────────────────────────────────
    const baseGroup = new THREE.Group();
    baseGroup.position.set(0, -2.18, 0);
    rootGroup.add(baseGroup);

    [0.38, 0.72, 1.1, 1.5].forEach((r, idx) => {
      const g = new THREE.TorusGeometry(r, 0.015, 16, 80);
      const m = new THREE.MeshBasicMaterial({ color: idx % 2 === 0 ? 0x00d2ff : 0xffbe3b, transparent: true, opacity: isDark() ? 0.9 : 0.6 });
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.x = Math.PI / 2;
      baseGroup.add(mesh);
      disposables.push(g, m);
    });

    const coneGeo = new THREE.CylinderGeometry(SPHERE_R * 0.85, 0.28, 1.3, 32, 1, true);
    const coneMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */`
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */`
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float beam = (1.0 - vUv.y) * 0.3 * (0.8 + sin(uTime * 2.1) * 0.2);
          gl_FragColor = vec4(0.0, 0.82, 1.0, beam);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const coneMesh = new THREE.Mesh(coneGeo, coneMat);
    coneMesh.position.set(0, 0.65, 0);
    baseGroup.add(coneMesh);
    disposables.push(coneGeo, coneMat);

    // ─────────────────────────────────────────────────────────────────────────
    // 14. ANIMATED PARTICLE SYSTEMS
    // ─────────────────────────────────────────────────────────────────────────
    // Upward rising holographic dust
    const DUST_N = 380;
    const dustPos = new Float32Array(DUST_N * 3);
    const dustV   = new Float32Array(DUST_N);
    for (let i = 0; i < DUST_N; i++) {
      const r = Math.random() * 1.65;
      const a = Math.random() * Math.PI * 2;
      dustPos[i*3]   = Math.cos(a) * r;
      dustPos[i*3+1] = -2.1 + Math.random() * 4.0;
      dustPos[i*3+2] = Math.sin(a) * r;
      dustV[i] = 0.35 + Math.random() * 0.55;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.046, transparent: true, opacity: isDark() ? 0.72 : 0.42, blending: THREE.AdditiveBlending, depthWrite: false });
    rootGroup.add(new THREE.Points(dustGeo, dustMat));
    disposables.push(dustGeo, dustMat);

    // Galaxy stardust (1,600 core + 42 left balance)
    const STAR_N = 1642;
    const sfPos = new Float32Array(STAR_N * 3);
    const sfCol = new Float32Array(STAR_N * 3);
    const starPal = [new THREE.Color(0x00d2ff), new THREE.Color(0x1e7fe8), new THREE.Color(0xffd54f), new THREE.Color(0x12b8a6), new THREE.Color(0xffffff)];
    const rcx = rootGroup.position.x;
    for (let i = 0; i < 1600; i++) {
      const r = 2.6 + Math.random() * 6.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      sfPos[i*3]   = rcx + r * Math.sin(ph) * Math.cos(th);
      sfPos[i*3+1] = r * Math.sin(ph) * Math.sin(th);
      sfPos[i*3+2] = r * Math.cos(ph);
      const c = starPal[i % starPal.length];
      sfCol[i*3] = c.r; sfCol[i*3+1] = c.g; sfCol[i*3+2] = c.b;
    }
    for (let i = 1600; i < STAR_N; i++) {
      sfPos[i*3] = -6.5 + Math.random() * 5.8;
      sfPos[i*3+1] = -3.5 + Math.random() * 7.0;
      sfPos[i*3+2] = -3.0 + Math.random() * 4.5;
      const c = starPal[i % starPal.length];
      sfCol[i*3] = c.r; sfCol[i*3+1] = c.g; sfCol[i*3+2] = c.b;
    }

    const spriteCV = document.createElement("canvas");
    spriteCV.width = spriteCV.height = 64;
    const spCtx = spriteCV.getContext("2d")!;
    const spg = spCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    spg.addColorStop(0, "rgba(255,255,255,1)");
    spg.addColorStop(0.3, "rgba(255,255,255,0.85)");
    spg.addColorStop(0.65, "rgba(255,255,255,0.18)");
    spg.addColorStop(1, "rgba(255,255,255,0)");
    spCtx.fillStyle = spg;
    spCtx.fillRect(0, 0, 64, 64);
    const spriteTex = new THREE.CanvasTexture(spriteCV);

    const sfGeo = new THREE.BufferGeometry();
    sfGeo.setAttribute("position", new THREE.BufferAttribute(sfPos, 3));
    sfGeo.setAttribute("color", new THREE.BufferAttribute(sfCol, 3));
    const sfMat = new THREE.PointsMaterial({ size: 0.088, sizeAttenuation: true, vertexColors: true, map: spriteTex, transparent: true, opacity: isDark() ? 0.85 : 0.42, blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending, depthWrite: false });
    const starfield = new THREE.Points(sfGeo, sfMat);
    scene.add(starfield);
    disposables.push(sfGeo, sfMat, spriteTex);

    // ─────────────────────────────────────────────────────────────────────────
    // 15. CHROMATIC STUDIO LIGHTS
    // ─────────────────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(isDark() ? 0x081020 : 0xf0f8ff, isDark() ? 2.0 : 3.5);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, isDark() ? 2.5 : 3.0);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);
    const lA = new THREE.PointLight(0x00d2ff, isDark() ? 6.0 : 4.0, 18);
    const lB = new THREE.PointLight(0xffb300, isDark() ? 5.2 : 3.5, 15);
    const lC = new THREE.PointLight(0xa855f7, isDark() ? 4.5 : 3.0, 14);
    const lD = new THREE.PointLight(0x12b8a6, isDark() ? 4.0 : 2.8, 14);
    scene.add(lA, lB, lC, lD);

    // ─────────────────────────────────────────────────────────────────────────
    // 16. INTERACTION — drag-to-rotate with inertia + mouse parallax
    // ─────────────────────────────────────────────────────────────────────────
    let tarX = 0, tarY = 0, curX = 0, curY = 0;
    let dragging = false, pMX = 0, pMY = 0, velX = 0, velY = 0;

    const onDown = (e: PointerEvent) => { dragging = true; pMX = e.clientX; pMY = e.clientY; velX = velY = 0; };
    const onUp   = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - pMX, dy = e.clientY - pMY;
        pMX = e.clientX; pMY = e.clientY;
        tarY += dx * 0.005; tarX += dy * 0.005;
        velX = dx * 0.005; velY = dy * 0.005;
      } else {
        const hw = window.innerWidth / 2, hh = window.innerHeight / 2;
        tarY = ((e.clientX - hw) / hw) * 0.26;
        tarX = ((e.clientY - hh) / hh) * 0.26;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    // ─────────────────────────────────────────────────────────────────────────
    // 17. THEME SYNC
    // ─────────────────────────────────────────────────────────────────────────
    const syncTheme = () => {
      const d = isDark();
      renderer.toneMappingExposure = d ? 1.2 : 0.9;
      bloomPass.strength = d ? 1.85 : 0.8;
      glassMat.color.setHex(d ? 0x061428 : 0xffffff);
      glassMat.opacity = d ? 0.82 : 0.68;
      nodeMat.emissiveIntensity = d ? 3.2 : 2.0;
      plasmaSphereMat.emissiveIntensity = d ? 5.5 : 3.2;
      webMat.opacity = d ? 0.28 : 0.18;
      dustMat.opacity = d ? 0.72 : 0.42;
      sfMat.opacity = d ? 0.85 : 0.42;
      sfMat.blending = d ? THREE.AdditiveBlending : THREE.NormalBlending;
      sfMat.needsUpdate = true;
      panelData.forEach(p => { p.mat.opacity = d ? 0.95 : 0.90; });
      ambientLight.color.setHex(d ? 0x081020 : 0xf0f8ff);
      ambientLight.intensity = d ? 2.0 : 3.5;
      keyLight.intensity = d ? 2.5 : 3.0;
      lA.intensity = d ? 6.0 : 4.0;
      lB.intensity = d ? 5.2 : 3.5;
      lC.intensity = d ? 4.5 : 3.0;
      lD.intensity = d ? 4.0 : 2.8;
    };

    const themeObs = new MutationObserver(syncTheme);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // ─────────────────────────────────────────────────────────────────────────
    // 18. ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0, visible = true, tabVisible = !document.hidden;
    const tmpVec = new THREE.Vector3();
    const activeColor = new THREE.Color(0xffffff);

    const animate = () => {
      if (!visible || !tabVisible) { raf = 0; return; }
      const t = clock.getElapsedTime();

      // Halo + cone time uniforms
      haloMat.uniforms.uTime.value = t;
      coneMat.uniforms.uTime.value = t;

      // Inertia & parallax
      if (!dragging) { tarX += velY; tarY += velX; velX *= 0.93; velY *= 0.93; }
      curX += (tarX - curX) * 0.055;
      curY += (tarY - curY) * 0.055;

      // Root tilt + neural group auto-spin
      rootGroup.rotation.x = curX;
      rootGroup.rotation.y = curY;
      neuralGroup.rotation.y = t * 0.11;

      // Inner core animation
      const pulse = 1.0 + Math.sin(t * 2.5) * 0.09;
      plasmaSphere.scale.setScalar(pulse);
      plasmaSphereMat.emissiveIntensity = (isDark() ? 5.5 : 3.2) * (0.9 + Math.sin(t * 2.5) * 0.1);
      cageMesh1.rotation.x = t * 0.38; cageMesh1.rotation.y = -t * 0.28;
      cageMesh2.rotation.x = -t * 0.48; cageMesh2.rotation.z = t * 0.34;

      // Node activity decay + flicker
      for (let i = 0; i < NODE_COUNT; i++) {
        nodeActivity[i] *= 0.96;
      }

      // Periodic synapse firing cascade wave
      const waveIdx = Math.floor(t * 8) % NODE_COUNT;
      if (waveIdx >= 0 && waveIdx < NODE_COUNT) nodeActivity[waveIdx] = 1.0;

      // Update instanced node colors based on activity
      for (let i = 0; i < NODE_COUNT; i++) {
        const a = nodeActivity[i];
        if (a > 0.02) {
          tmpColor.r = baseNodeColors[i*3]     + (activeColor.r - baseNodeColors[i*3])     * a;
          tmpColor.g = baseNodeColors[i*3+1]   + (activeColor.g - baseNodeColors[i*3+1])   * a;
          tmpColor.b = baseNodeColors[i*3+2]   + (activeColor.b - baseNodeColors[i*3+2])   * a;
          nodeInstanced.setColorAt(i, tmpColor);
        }
      }
      if (nodeInstanced.instanceColor) nodeInstanced.instanceColor.needsUpdate = true;

      // Advance neural impulse packets
      impulses.forEach((imp) => {
        imp.t += imp.speed * 0.016;
        if (imp.t >= 1.0) {
          imp.t = 0;
          imp.edgeIdx = Math.floor(Math.random() * edges.length);
          // Fire arrival node
          const arrNodeIdx = edges[imp.edgeIdx].b;
          nodeActivity[arrNodeIdx] = 1.0;
        }
        const e = edges[imp.edgeIdx];
        tmpVec.lerpVectors(allNodes[e.a], allNodes[e.b], imp.t);
        imp.mesh.position.copy(tmpVec);
      });

      // HUD panel float animation + data packet
      panelData.forEach((p, i) => {
        p.mesh.position.y = p.baseY + Math.sin(t * 1.2 + i * 1.57) * 0.065;
        const pp = ((t * p.speed + i * 0.25) % 1.0 + 1.0) % 1.0;
        const edge = p.mesh.position.clone().add(new THREE.Vector3(p.mesh.position.x > 0 ? -0.54 : 0.54, 0, 0));
        p.packetMesh.position.lerpVectors(edge, p.anchor, pp);
      });

      // Dust particles rise
      const dp = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < DUST_N; i++) {
        dp[i*3+1] += dustV[i] * 0.014;
        if (dp[i*3+1] > 1.85) dp[i*3+1] = -2.1;
      }
      dustGeo.attributes.position.needsUpdate = true;

      // Orbiting studio lights
      const lx = rootGroup.position.x;
      lA.position.set(lx + Math.sin(t * 1.1) * 4.0, Math.cos(t * 0.8) * 2.8,  Math.cos(t * 1.1) * 4.0);
      lB.position.set(lx + Math.cos(-t * 0.9) * 4.5, Math.sin(-t * 1.1) * 3.2, Math.sin(t * 0.75) * 3.6);
      lC.position.set(lx + Math.sin(t * 0.75) * 3.8, -Math.cos(t * 0.9) * 3.0, Math.cos(t * 1.15) * 3.8);
      lD.position.set(lx + Math.cos(t * 0.65) * 4.8, Math.sin(t * 0.55) * 3.6, -Math.sin(t * 0.85) * 3.4);

      // Starfield drift
      starfield.rotation.y = -t * 0.008;

      // Render via bloom composer
      composer.render();
      raf = requestAnimationFrame(animate);
    };

    const start = () => { if (!raf && visible && tabVisible) { clock.start(); raf = requestAnimationFrame(animate); } };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0.05 });
    io.observe(mount);

    const onVis = () => {
      tabVisible = !document.hidden;
      if (tabVisible) start();
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    document.addEventListener("visibilitychange", onVis);
    start();

    // ─────────────────────────────────────────────────────────────────────────
    // 19. RESIZE
    // ─────────────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth; height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
      bloomPass.resolution.set(width, height);
      setRootPos();
    };
    window.addEventListener("resize", onResize);
    onResize();

    // ─────────────────────────────────────────────────────────────────────────
    // 20. CLEANUP
    // ─────────────────────────────────────────────────────────────────────────
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);

      [nodeGeo, glassGeo, haloGeo, plasmaSphereGeo, cageGeo1, cageGeo2, impGeo, webGeo, ...disposables].forEach(g => g.dispose());
      [nodeMat, glassMat, haloMat, plasmaSphereMat, cageMat1, cageMat2].forEach(m => m.dispose());
      impulses.forEach(i => { i.mat.dispose(); });
      composer.dispose();
      renderTarget.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing select-none z-[1]"
      aria-label="Interactive 3D AI Neural Network Sphere — drag to rotate"
      role="region"
    />
  );
}
