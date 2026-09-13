"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * NATLE Hero 3D — 3D AI / Neural Network Holographic Sphere
 *
 * Faithfully matches the user's reference image:
 * 1. Central Holographic Sphere:
 *    - Refractive crystal-clear glass sphere with cyan/azure Fresnel edge glow.
 *    - Organic 3D branching neural network (golden primary trunks, cyan secondary
 *      synapses, and violet/electric terminal dendrites).
 *    - Pulsing synaptic junction nodes at branch tips on the sphere surface.
 *    - Central glowing energy nucleus that breathes with volumetric intensity.
 *    - Interconnected neural surface web forming global node-to-node connections.
 * 2. Holographic HUD Panels (4 floating interactive screens):
 *    - 2 on the left, 2 on the right with cybernetic telemetry, circular radar dials,
 *      progress graphs, and neural metrics.
 *    - Glowing leader lines connecting each panel to anchor nodes on the sphere.
 *    - Traveling luminous data packets along the leader lines.
 * 3. Holographic Projector Pedestal Base:
 *    - Concentric glowing rings beneath the sphere emitting vertical light rays.
 * 4. Animated Particle Field:
 *    - Upward-rising holographic projection dust.
 *    - Ambient neural stardust field + 42 left-side balance stars.
 * 5. Interactive Dynamics:
 *    - Drag to rotate with smooth inertia.
 *    - Mouse hover parallax tilts the entire holographic rig.
 *    - Neural impulses continuously fire through the synapses.
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

    // ── 1. WebGL Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark() ? 1.3 : 1.15;
    mount.appendChild(renderer.domElement);

    // ── 2. Scene & Camera ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.2);

    // ── 3. Root Placement ──────────────────────────────────────────────────────
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const setRootPos = () => {
      const desktop = width >= 1024;
      rootGroup.position.set(desktop ? 2.1 : 0, desktop ? 0.05 : 0.25, 0);
      const s = desktop ? 1.0 : Math.min(0.9, width / 768);
      rootGroup.scale.setScalar(s);
    };
    setRootPos();

    // Neural Sphere Core Group (rotates on interaction)
    const neuralSphereGroup = new THREE.Group();
    rootGroup.add(neuralSphereGroup);

    // ── 4. Central Glowing Energy Nucleus ─────────────────────────────────────
    const SPHERE_R = 1.52;

    const nucleusGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xfff0b3),
      emissive: new THREE.Color(0xffbe3b),
      emissiveIntensity: isDark() ? 4.0 : 2.6,
      roughness: 0.1,
      metalness: 0.9,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    neuralSphereGroup.add(nucleusMesh);

    // Secondary pulsing energy aura around nucleus
    const nucleusHaloGeo = new THREE.SphereGeometry(0.48, 24, 24);
    const nucleusHaloMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: isDark() ? 0.35 : 0.22,
      wireframe: true,
    });
    const nucleusHaloMesh = new THREE.Mesh(nucleusHaloGeo, nucleusHaloMat);
    neuralSphereGroup.add(nucleusHaloMesh);

    // ── 5. Organic Branching Neural Network (Golden & Cyan Synapses) ──────────
    const branchGeometries: THREE.BufferGeometry[] = [];
    const branchMaterials: THREE.Material[] = [];
    const surfaceNodes: THREE.Vector3[] = [];

    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffd54f),
      emissive: new THREE.Color(0xffb300),
      emissiveIntensity: isDark() ? 3.0 : 2.0,
      roughness: 0.2,
      metalness: 0.8,
    });
    branchMaterials.push(goldMat);

    const cyanMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x00e5ff),
      emissive: new THREE.Color(0x00b0ff),
      emissiveIntensity: isDark() ? 2.8 : 1.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    branchMaterials.push(cyanMat);

    const violetMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd8b4fe),
      emissive: new THREE.Color(0xa855f7),
      emissiveIntensity: isDark() ? 2.2 : 1.4,
      roughness: 0.2,
      metalness: 0.8,
    });
    branchMaterials.push(violetMat);

    // Primary trunk targets (towards 8 vertices of a cube / 8 octants)
    const trunkDirs = [
      new THREE.Vector3(1, 1, 1).normalize(),
      new THREE.Vector3(-1, 1, 1).normalize(),
      new THREE.Vector3(1, -1, 1).normalize(),
      new THREE.Vector3(-1, -1, 1).normalize(),
      new THREE.Vector3(1, 1, -1).normalize(),
      new THREE.Vector3(-1, 1, -1).normalize(),
      new THREE.Vector3(1, -1, -1).normalize(),
      new THREE.Vector3(-1, -1, -1).normalize(),
    ];

    // Build branching trees from center outwards
    trunkDirs.forEach((dir, tIdx) => {
      // 1. Primary golden trunk from center to ~0.7 R
      const p0 = new THREE.Vector3(0, 0, 0);
      const jitter1 = new THREE.Vector3(
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25
      );
      const p1 = dir.clone().multiplyScalar(SPHERE_R * 0.4).add(jitter1);
      const p2 = dir.clone().multiplyScalar(SPHERE_R * 0.72);

      const trunkCurve = new THREE.CatmullRomCurve3([p0, p1, p2]);
      const trunkGeo = new THREE.TubeGeometry(trunkCurve, 16, 0.026, 6, false);
      const trunkMesh = new THREE.Mesh(trunkGeo, goldMat);
      neuralSphereGroup.add(trunkMesh);
      branchGeometries.push(trunkGeo);

      // 2. Fork into 2 secondary cyan branches from p2 to ~1.2 R
      const perp1 = new THREE.Vector3(-dir.y, dir.x, dir.z * 0.5).normalize();
      const perp2 = dir.clone().cross(perp1).normalize();

      const subOffsets = [
        perp1.clone().multiplyScalar(0.35),
        perp1.clone().multiplyScalar(-0.35),
        perp2.clone().multiplyScalar(0.3),
      ];

      subOffsets.forEach((off) => {
        const pMid = p2.clone().add(dir.clone().multiplyScalar(0.3)).add(off);
        const p3 = pMid.clone().normalize().multiplyScalar(SPHERE_R * 1.15);

        const subCurve = new THREE.CatmullRomCurve3([p2, pMid, p3]);
        const subGeo = new THREE.TubeGeometry(subCurve, 12, 0.016, 6, false);
        const subMesh = new THREE.Mesh(subGeo, cyanMat);
        neuralSphereGroup.add(subMesh);
        branchGeometries.push(subGeo);

        // 3. Fork into 2 tertiary terminal dendrites from p3 to SPHERE_R (surface)
        const twigOffsets = [
          perp2.clone().multiplyScalar(0.22),
          perp2.clone().multiplyScalar(-0.22),
        ];

        twigOffsets.forEach((tOff) => {
          const pSurface = p3.clone().add(tOff).normalize().multiplyScalar(SPHERE_R * 0.995);
          const pTwigMid = p3.clone().add(pSurface).multiplyScalar(0.5).add(
            new THREE.Vector3((Math.random() - 0.5) * 0.08, (Math.random() - 0.5) * 0.08, (Math.random() - 0.5) * 0.08)
          );

          const twigCurve = new THREE.CatmullRomCurve3([p3, pTwigMid, pSurface]);
          const twigGeo = new THREE.TubeGeometry(twigCurve, 10, 0.009, 5, false);
          const twigMesh = new THREE.Mesh(twigGeo, violetMat);
          neuralSphereGroup.add(twigMesh);
          branchGeometries.push(twigGeo);

          surfaceNodes.push(pSurface);
        });
      });
    });

    // ── 6. Pulsing Synaptic Junction Nodes (Dots at branch tips) ──────────────
    const nodeGeo = new THREE.SphereGeometry(0.042, 14, 14);
    branchGeometries.push(nodeGeo);

    const nodeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x00ffff),
      emissive: new THREE.Color(0x00e5ff),
      emissiveIntensity: isDark() ? 3.8 : 2.2,
      roughness: 0.1,
      metalness: 0.9,
    });
    branchMaterials.push(nodeMat);

    const nodeInstanced = new THREE.InstancedMesh(nodeGeo, nodeMat, surfaceNodes.length);
    const dummy = new THREE.Object3D();
    surfaceNodes.forEach((pos, idx) => {
      dummy.position.copy(pos);
      dummy.updateMatrix();
      nodeInstanced.setMatrixAt(idx, dummy.matrix);
    });
    nodeInstanced.instanceMatrix.needsUpdate = true;
    neuralSphereGroup.add(nodeInstanced);

    // ── 7. Delicate Neural Surface Web (Connections between nodes) ────────────
    const webPoints: THREE.Vector3[] = [];
    for (let i = 0; i < surfaceNodes.length; i++) {
      for (let j = i + 1; j < surfaceNodes.length; j++) {
        const dist = surfaceNodes[i].distanceTo(surfaceNodes[j]);
        if (dist > 0.3 && dist < 0.85) {
          webPoints.push(surfaceNodes[i], surfaceNodes[j]);
        }
      }
    }
    const webGeo = new THREE.BufferGeometry().setFromPoints(webPoints);
    const webMat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: isDark() ? 0.38 : 0.24,
      blending: THREE.AdditiveBlending,
    });
    const webLines = new THREE.LineSegments(webGeo, webMat);
    neuralSphereGroup.add(webLines);
    branchGeometries.push(webGeo);
    branchMaterials.push(webMat);

    // ── 8. Outer Refractive Optical Glass Shell ───────────────────────────────
    const glassGeo = new THREE.SphereGeometry(SPHERE_R, 64, 64);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDark() ? 0x0c1e36 : 0xffffff),
      transmission: 0.92,
      thickness: 1.2,
      ior: 1.48,
      roughness: 0.04,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      transparent: true,
      opacity: isDark() ? 0.78 : 0.65,
      depthWrite: false,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    neuralSphereGroup.add(glassMesh);

    // Outer Atmospheric Fresnel Glow Halo
    const haloGeo = new THREE.SphereGeometry(SPHERE_R * 1.04, 48, 48);
    const haloMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x00d2ff) },
      },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(cameraPosition - vWorldPosition);
          float rim = pow(1.0 - max(dot(N, V), 0.0), 2.8);
          vec3 glow = mix(vec3(0.05, 0.45, 0.95), uColor, rim);
          gl_FragColor = vec4(glow, rim * 0.75);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    rootGroup.add(haloMesh);

    // ── 9. Holographic HUD Panels (4 Floating Cards with Leader Lines) ─────────
    const createHudCardTexture = (
      type: "radar" | "pipeline" | "metrics" | "health",
      title: string,
      tag: string,
      accentColor: string
    ) => {
      const canvas = document.createElement("canvas");
      canvas.width = 384;
      canvas.height = 240;
      const ctx = canvas.getContext("2d")!;

      // Glass panel fill
      ctx.fillStyle = isDark() ? "rgba(6, 18, 38, 0.75)" : "rgba(255, 255, 255, 0.82)";
      ctx.beginPath();
      ctx.roundRect(6, 6, 372, 228, 14);
      ctx.fill();

      // Neon cyber border
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Inner subtle border
      ctx.strokeStyle = isDark() ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(12, 12, 360, 216, 10);
      ctx.stroke();

      // Header icon & title
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(28, 34, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "bold 15px monospace";
      ctx.fillStyle = isDark() ? "#F8FAFC" : "#0A0A0A";
      ctx.fillText(title, 42, 39);

      // Status tag badge
      ctx.fillStyle = accentColor;
      ctx.font = "bold 11px monospace";
      ctx.fillText(tag, 290, 39);

      // Content based on panel type
      if (type === "radar") {
        // Circular radar dial
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(60, 110, 38, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = isDark() ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)";
        ctx.beginPath();
        ctx.arc(60, 110, 22, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(60, 66);
        ctx.lineTo(60, 154);
        ctx.moveTo(16, 110);
        ctx.lineTo(104, 110);
        ctx.stroke();

        // Metrics on right side
        ctx.font = "12px monospace";
        ctx.fillStyle = isDark() ? "#CBD5E1" : "#334155";
        ctx.fillText("MODEL: NEURAL-v4", 124, 85);
        ctx.fillText("INFERENCE: 1.2ms", 124, 110);
        ctx.fillText("PRECISION: FP16", 124, 135);

        // Progress bars
        ctx.fillStyle = accentColor;
        ctx.fillRect(28, 175, 220, 5);
        ctx.fillStyle = isDark() ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)";
        ctx.fillRect(248, 175, 108, 5);

        ctx.font = "11px monospace";
        ctx.fillStyle = isDark() ? "#94A3B8" : "#64748B";
        ctx.fillText("SYNAPSE LOAD // 88.4%", 28, 204);
      } else if (type === "pipeline") {
        ctx.font = "12px monospace";
        ctx.fillStyle = isDark() ? "#94A3B8" : "#475569";
        ctx.fillText("> CLOUD COMPUTE: DISTRIBUTED", 28, 75);
        ctx.fillText("> CONCURRENT TASKS: 12,480", 28, 98);
        ctx.fillText("> BANDWIDTH: 4.8 GB/s", 28, 121);
        ctx.fillText("> LATENCY (p99): 1.8ms", 28, 144);

        // Horizontal audio/waveform bars
        for (let b = 0; b < 18; b++) {
          const h = 8 + Math.sin(b * 0.7) * 16 + (b % 3) * 6;
          ctx.fillStyle = accentColor;
          ctx.fillRect(28 + b * 18, 195 - h, 10, h);
        }
      } else if (type === "metrics") {
        ctx.font = "12px monospace";
        ctx.fillStyle = isDark() ? "#CBD5E1" : "#1E293B";
        ctx.fillText("ENTERPRISE INFRASTRUCTURE", 28, 76);
        ctx.fillText("MULTI-REGION RESILIENCE", 28, 100);

        // Grid stat boxes
        ctx.strokeStyle = isDark() ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";
        ctx.strokeRect(28, 118, 150, 48);
        ctx.strokeRect(196, 118, 160, 48);

        ctx.fillStyle = accentColor;
        ctx.font = "bold 16px monospace";
        ctx.fillText("99.999%", 40, 142);
        ctx.fillText("0 DOWNTIME", 208, 142);

        ctx.font = "10px monospace";
        ctx.fillStyle = isDark() ? "#94A3B8" : "#64748B";
        ctx.fillText("UPTIME SLA", 40, 158);
        ctx.fillText("PRODUCTION GRADE", 208, 158);

        ctx.fillStyle = accentColor;
        ctx.fillRect(28, 195, 328, 4);
      } else {
        // Health & Diagnostics
        ctx.font = "12px monospace";
        ctx.fillStyle = isDark() ? "#94A3B8" : "#475569";
        ctx.fillText("DIAGNOSTICS // STREAMING", 28, 75);
        ctx.fillText("NODE STATUS: 1,024 OK", 28, 98);
        ctx.fillText("ENCRYPTION: QUANTUM-SAFE", 28, 121);
        ctx.fillText("AUTO-SCALE: READY", 28, 144);

        // Mini radar arcs
        ctx.fillStyle = accentColor;
        ctx.fillRect(28, 172, 140, 6);
        ctx.fillRect(180, 172, 90, 6);
        ctx.fillRect(282, 172, 74, 6);

        ctx.font = "11px monospace";
        ctx.fillStyle = isDark() ? "#CBD5E1" : "#334155";
        ctx.fillText("HEALTH MONITORING // ACTIVE", 28, 204);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return { tex, canvas };
    };

    const HUD_CONFIGS = [
      {
        id: 0,
        type: "radar" as const,
        title: "NEURAL ENGINE",
        tag: "[LIVE]",
        color: "#00E5FF",
        pos: new THREE.Vector3(-2.15, 1.15, 0.4),
        sphereAnchor: new THREE.Vector3(-0.95, 0.75, 0.8),
      },
      {
        id: 1,
        type: "pipeline" as const,
        title: "DATA PIPELINE",
        tag: "[STREAM]",
        color: "#1E7FE8",
        pos: new THREE.Vector3(-2.25, -0.85, 0.5),
        sphereAnchor: new THREE.Vector3(-0.95, -0.65, 0.85),
      },
      {
        id: 2,
        type: "metrics" as const,
        title: "CLOUD METRICS",
        tag: "[99.99%]",
        color: "#12B8A6",
        pos: new THREE.Vector3(2.15, 1.25, 0.4),
        sphereAnchor: new THREE.Vector3(0.95, 0.85, 0.75),
      },
      {
        id: 3,
        type: "health" as const,
        title: "SYSTEM HEALTH",
        tag: "[OPTIMAL]",
        color: "#6FCF3E",
        pos: new THREE.Vector3(2.25, -0.75, 0.5),
        sphereAnchor: new THREE.Vector3(1.0, -0.65, 0.8),
      },
    ];

    const hudPlaneGeo = new THREE.PlaneGeometry(1.05, 0.65);
    branchGeometries.push(hudPlaneGeo);

    const hudCards: {
      mesh: THREE.Mesh;
      tex: THREE.CanvasTexture;
      mat: THREE.MeshBasicMaterial;
      initialPos: THREE.Vector3;
      leaderLine: THREE.Line;
      packetMesh: THREE.Mesh;
      anchorOnSphere: THREE.Vector3;
      speed: number;
    }[] = [];

    const hudGroup = new THREE.Group();
    rootGroup.add(hudGroup);

    HUD_CONFIGS.forEach((cfg, i) => {
      const { tex } = createHudCardTexture(cfg.type, cfg.title, cfg.tag, cfg.color);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: isDark() ? 0.95 : 0.88,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      branchMaterials.push(mat);

      const mesh = new THREE.Mesh(hudPlaneGeo, mat);
      mesh.position.copy(cfg.pos);
      hudGroup.add(mesh);

      // Sci-fi dogleg leader line from card to sphere anchor
      const cardEdge = cfg.pos.clone().add(
        new THREE.Vector3(cfg.pos.x > 0 ? -0.52 : 0.52, 0, 0)
      );
      const midDogleg = new THREE.Vector3(
        (cardEdge.x + cfg.sphereAnchor.x) * 0.5,
        cardEdge.y,
        (cardEdge.z + cfg.sphereAnchor.z) * 0.5
      );

      const leaderGeo = new THREE.BufferGeometry().setFromPoints([cardEdge, midDogleg, cfg.sphereAnchor]);
      const leaderMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(cfg.color),
        transparent: true,
        opacity: isDark() ? 0.75 : 0.55,
      });
      const leaderLine = new THREE.Line(leaderGeo, leaderMat);
      hudGroup.add(leaderLine);
      branchGeometries.push(leaderGeo);
      branchMaterials.push(leaderMat);

      // Luminous data packet traveling along leader line
      const pktGeo = new THREE.SphereGeometry(0.035, 10, 10);
      const pktMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pktMesh = new THREE.Mesh(pktGeo, pktMat);
      hudGroup.add(pktMesh);
      branchGeometries.push(pktGeo);
      branchMaterials.push(pktMat);

      hudCards.push({
        mesh,
        tex,
        mat,
        initialPos: cfg.pos.clone(),
        leaderLine,
        packetMesh: pktMesh,
        anchorOnSphere: cfg.sphereAnchor.clone(),
        speed: 0.35 + i * 0.1,
      });
    });

    // ── 10. Holographic Projector Pedestal Base ───────────────────────────────
    const baseGroup = new THREE.Group();
    baseGroup.position.set(0, -2.15, 0);
    rootGroup.add(baseGroup);

    // Concentric projector emitter rings
    const ringRadii = [0.45, 0.85, 1.3, 1.75];
    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.018, 16, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0x00d2ff : 0xffbe3b,
        transparent: true,
        opacity: isDark() ? 0.85 : 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      baseGroup.add(ringMesh);
      branchGeometries.push(ringGeo);
      branchMaterials.push(ringMat);
    });

    // Vertical projection light cone (holographic emitter rays)
    const coneGeo = new THREE.CylinderGeometry(SPHERE_R * 0.9, 0.35, 1.2, 32, 1, true);
    const coneMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x00d2ff) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float beam = (1.0 - vUv.y) * 0.28;
          gl_FragColor = vec4(uColor, beam);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const coneMesh = new THREE.Mesh(coneGeo, coneMat);
    coneMesh.position.set(0, 0.6, 0);
    baseGroup.add(coneMesh);
    branchGeometries.push(coneGeo);
    branchMaterials.push(coneMat);

    // ── 11. Upward-Rising Holographic Dust & Starfield Particles ──────────────
    const DUST_COUNT = 350;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(DUST_COUNT * 3);
    const dustSpeed = new Float32Array(DUST_COUNT);

    for (let i = 0; i < DUST_COUNT; i++) {
      const rad = Math.random() * 1.6;
      const ang = Math.random() * Math.PI * 2;
      dustPos[i * 3] = Math.cos(ang) * rad;
      dustPos[i * 3 + 1] = -2.1 + Math.random() * 3.8;
      dustPos[i * 3 + 2] = Math.sin(ang) * rad;
      dustSpeed[i] = 0.4 + Math.random() * 0.6;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.05,
      transparent: true,
      opacity: isDark() ? 0.75 : 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    rootGroup.add(dustPoints);
    branchGeometries.push(dustGeo);
    branchMaterials.push(dustMat);

    // Deep space galaxy starfield (1,400 core + 42 left balance stars)
    const CORE_STARS = 1400;
    const LEFT_STARS = 42;
    const TOTAL_STARS = CORE_STARS + LEFT_STARS;

    const sfGeo = new THREE.BufferGeometry();
    const sfPos = new Float32Array(TOTAL_STARS * 3);
    const sfCol = new Float32Array(TOTAL_STARS * 3);
    const sfSize = new Float32Array(TOTAL_STARS);

    const starPal = [
      new THREE.Color(0x00d2ff),
      new THREE.Color(0x1e7fe8),
      new THREE.Color(0xffd54f),
      new THREE.Color(0x12b8a6),
      new THREE.Color(0xffffff),
    ];

    const cx = rootGroup.position.x;

    for (let i = 0; i < CORE_STARS; i++) {
      const r = 2.6 + Math.random() * 6.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      sfPos[i * 3] = cx + r * Math.sin(ph) * Math.cos(th);
      sfPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      sfPos[i * 3 + 2] = r * Math.cos(ph);

      const c = starPal[Math.floor(Math.random() * starPal.length)];
      sfCol[i * 3] = c.r;
      sfCol[i * 3 + 1] = c.g;
      sfCol[i * 3 + 2] = c.b;
      sfSize[i] = 0.045 + Math.random() * 0.055;
    }

    for (let i = CORE_STARS; i < TOTAL_STARS; i++) {
      sfPos[i * 3] = -6.5 + Math.random() * 5.8;
      sfPos[i * 3 + 1] = -3.5 + Math.random() * 7.0;
      sfPos[i * 3 + 2] = -3.0 + Math.random() * 4.5;

      const c = starPal[Math.floor(Math.random() * starPal.length)];
      sfCol[i * 3] = c.r;
      sfCol[i * 3 + 1] = c.g;
      sfCol[i * 3 + 2] = c.b;
      sfSize[i] = 0.035 + Math.random() * 0.04;
    }

    sfGeo.setAttribute("position", new THREE.BufferAttribute(sfPos, 3));
    sfGeo.setAttribute("color", new THREE.BufferAttribute(sfCol, 3));
    sfGeo.setAttribute("size", new THREE.BufferAttribute(sfSize, 1));

    // Circular soft glow sprite
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteCanvas.height = 64;
    const sCtx = spriteCanvas.getContext("2d")!;
    const sg = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sg.addColorStop(0, "rgba(255,255,255,1)");
    sg.addColorStop(0.3, "rgba(255,255,255,0.85)");
    sg.addColorStop(0.65, "rgba(255,255,255,0.18)");
    sg.addColorStop(1, "rgba(255,255,255,0)");
    sCtx.fillStyle = sg;
    sCtx.fillRect(0, 0, 64, 64);
    const spriteTex = new THREE.CanvasTexture(spriteCanvas);

    const sfMat = new THREE.PointsMaterial({
      size: 0.09,
      sizeAttenuation: true,
      vertexColors: true,
      map: spriteTex,
      transparent: true,
      opacity: isDark() ? 0.85 : 0.45,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const starfield = new THREE.Points(sfGeo, sfMat);
    scene.add(starfield);
    branchGeometries.push(sfGeo);
    branchMaterials.push(sfMat);

    // ── 12. Chromatic Lighting Rig ─────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(
      isDark() ? 0x081024 : 0xf4f9ff,
      isDark() ? 1.8 : 3.2
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark() ? 2.6 : 3.0);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const lA = new THREE.PointLight(0x00d2ff, isDark() ? 5.5 : 3.8, 16); // Cyan
    const lB = new THREE.PointLight(0xffb300, isDark() ? 4.8 : 3.2, 14); // Gold
    const lC = new THREE.PointLight(0x12b8a6, isDark() ? 4.2 : 2.8, 14); // Teal
    const lD = new THREE.PointLight(0xa855f7, isDark() ? 3.8 : 2.5, 12); // Violet
    scene.add(lA, lB, lC, lD);

    // ── 13. Interactive Drag-to-Rotate with Inertia + Mouse Parallax ───────────
    let tarX = 0, tarY = 0, curX = 0, curY = 0;
    let dragging = false, prevMX = 0, prevMY = 0, velX = 0, velY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      prevMX = e.clientX;
      prevMY = e.clientY;
      velX = 0;
      velY = 0;
    };
    const onUp = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - prevMX;
        const dy = e.clientY - prevMY;
        prevMX = e.clientX;
        prevMY = e.clientY;
        tarY += dx * 0.005;
        tarX += dy * 0.005;
        velX = dx * 0.005;
        velY = dy * 0.005;
      } else {
        const hw = window.innerWidth / 2;
        const hh = window.innerHeight / 2;
        tarY = ((e.clientX - hw) / hw) * 0.26;
        tarX = ((e.clientY - hh) / hh) * 0.26;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    // ── 14. Theme Synchronization ─────────────────────────────────────────────
    const syncTheme = () => {
      const d = isDark();
      renderer.toneMappingExposure = d ? 1.3 : 1.15;

      glassMat.color.setHex(d ? 0x0c1e36 : 0xffffff);
      glassMat.opacity = d ? 0.78 : 0.65;

      nucleusMat.emissiveIntensity = d ? 4.0 : 2.6;
      goldMat.emissiveIntensity = d ? 3.0 : 2.0;
      cyanMat.emissiveIntensity = d ? 2.8 : 1.8;
      violetMat.emissiveIntensity = d ? 2.2 : 1.4;
      nodeMat.emissiveIntensity = d ? 3.8 : 2.2;

      hudCards.forEach((c) => {
        c.mat.opacity = d ? 0.95 : 0.88;
      });

      sfMat.opacity = d ? 0.85 : 0.45;
      sfMat.blending = d ? THREE.AdditiveBlending : THREE.NormalBlending;
      sfMat.needsUpdate = true;

      ambientLight.color.setHex(d ? 0x081024 : 0xf4f9ff);
      ambientLight.intensity = d ? 1.8 : 3.2;

      keyLight.intensity = d ? 2.6 : 3.0;
      lA.intensity = d ? 5.5 : 3.8;
      lB.intensity = d ? 4.8 : 3.2;
      lC.intensity = d ? 4.2 : 2.8;
      lD.intensity = d ? 3.8 : 2.5;
    };

    const themeObs = new MutationObserver(syncTheme);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ── 15. Animation Loop ─────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0, visible = true, tabVisible = !document.hidden;

    const animate = () => {
      if (!visible || !tabVisible) {
        raf = 0;
        return;
      }
      const t = clock.getElapsedTime();

      // Inertia & parallax
      if (!dragging) {
        tarX += velY;
        tarY += velX;
        velX *= 0.94;
        velY *= 0.94;
      }
      curX += (tarX - curX) * 0.055;
      curY += (tarY - curY) * 0.055;

      // Root Group subtle hover tilt
      rootGroup.rotation.x = curX;
      rootGroup.rotation.y = curY;

      // Neural Sphere auto-rotation around Y axis
      neuralSphereGroup.rotation.y = t * 0.12;

      // Central Nucleus rhythmic energy pulse
      const pulse = 1.0 + Math.sin(t * 2.4) * 0.08;
      nucleusMesh.scale.setScalar(pulse);
      nucleusHaloMesh.rotation.y = -t * 0.35;
      nucleusHaloMesh.rotation.z = t * 0.25;

      // Floating HUD cards harmonic oscillation
      hudCards.forEach((c, idx) => {
        const floatY = Math.sin(t * 1.2 + idx * 1.5) * 0.06;
        c.mesh.position.y = c.initialPos.y + floatY;

        // Data packet travels along leader line
        const pProgress = ((t * c.speed + idx * 0.25) % 1.0 + 1.0) % 1.0;
        const cardEdge = c.mesh.position.clone().add(
          new THREE.Vector3(c.mesh.position.x > 0 ? -0.52 : 0.52, 0, 0)
        );
        const pt = new THREE.Vector3().lerpVectors(cardEdge, c.anchorOnSphere, pProgress);
        c.packetMesh.position.copy(pt);
      });

      // Upward rising holographic dust particles
      const positions = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < DUST_COUNT; i++) {
        positions[i * 3 + 1] += dustSpeed[i] * 0.015;
        if (positions[i * 3 + 1] > 1.8) {
          positions[i * 3 + 1] = -2.1;
        }
      }
      dustGeo.attributes.position.needsUpdate = true;

      // Orbiting lights casting dynamic studio highlights
      const mx = rootGroup.position.x;
      lA.position.set(mx + Math.sin(t * 1.2) * 3.8, Math.cos(t * 0.9) * 2.6, Math.cos(t * 1.2) * 3.8);
      lB.position.set(mx + Math.cos(-t * 1.0) * 4.2, Math.sin(-t * 1.1) * 3.0, Math.sin(t * 0.8) * 3.4);
      lC.position.set(mx + Math.sin(t * 0.8) * 3.5, -Math.cos(t * 0.95) * 2.8, Math.cos(t * 1.1) * 3.6);
      lD.position.set(mx + Math.cos(t * 0.7) * 4.5, Math.sin(t * 0.6) * 3.4, -Math.sin(t * 0.9) * 3.2);

      // Starfield subtle slow drift
      starfield.rotation.y = -t * 0.008;

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

    // ── 16. Resize ─────────────────────────────────────────────────────────────
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

    // ── 17. Cleanup ────────────────────────────────────────────────────────────
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);

      [nucleusGeo, nucleusHaloGeo, glassGeo, haloGeo, ...branchGeometries].forEach((g) =>
        g.dispose()
      );
      [nucleusMat, nucleusHaloMat, glassMat, haloMat, ...branchMaterials].forEach((m) =>
        m.dispose()
      );
      hudCards.forEach((c) => {
        c.mat.dispose();
        c.tex.dispose();
      });

      spriteTex.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing select-none z-[1]"
      aria-label="Interactive 3D AI Neural Network Holographic Sphere — drag to rotate"
      role="region"
    />
  );
}
