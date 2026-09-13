"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * NATLE Hero 3D — The Neural Kinetic Engine (Living Quantum Glass Core)
 *
 * An Awwwards-grade, high-performance 3D visual centerpiece:
 * 1. Outer Sculptural Shell: Endless topological Torus Knot rendered in pure
 *    refractive optical glass (MeshPhysicalMaterial with high transmission,
 *    subtle chromatic dispersion, and razor-sharp studio specular glints).
 * 2. Inner Quantum Synapse Lattice: High-speed counter-rotating neural wireframe
 *    radiating in NATLE brand energy (Azure -> Teal -> Lime -> Violet).
 * 3. Central Singularity Core: Deep pulsing quantum core at the epicenter.
 * 4. Neural Impulses: Luminous data packets traversing along the parametric spine.
 * 5. Holographic Data Wafers: 4 floating translucent micro-interface panels
 *    orbiting the engine displaying live architecture & engine metrics.
 * 6. Chromatic 4-Light Rig: Orbiting Azure, Teal, Lime, and Violet lights
 *    casting dynamic caustics and edge highlights across the glass.
 * 7. Cosmic Stardust: 1,600 neural particles + 42 left-side balance stars.
 * 8. Full mouse/touch drag-with-inertia + hover parallax.
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

    // ── 1. Renderer ────────────────────────────────────────────────────────────
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
    camera.position.set(0, 0, 8.6);

    // ── 3. Root Placement & Responsiveness ─────────────────────────────────────
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const setRootPos = () => {
      const desktop = width >= 1024;
      rootGroup.position.set(desktop ? 2.05 : 0, desktop ? 0.05 : 0.25, 0);
      const s = desktop ? 1.0 : Math.min(1.0, width / 768);
      rootGroup.scale.setScalar(s);
    };
    setRootPos();

    // Engine Assembly Group (holds all rotating elements)
    const engineGroup = new THREE.Group();
    rootGroup.add(engineGroup);

    // ── 4. Outer Refractive Optical Glass Knot ─────────────────────────────────
    const glassGeo = new THREE.TorusKnotGeometry(1.44, 0.38, 220, 48, 2, 3);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDark() ? 0x081324 : 0xffffff),
      transmission: 0.95,
      thickness: 1.7,
      ior: 1.54,
      roughness: 0.03,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.9,
      attenuationColor: new THREE.Color(isDark() ? 0x1e7fe8 : 0x12b8a6),
      attenuationDistance: 1.6,
      transparent: true,
      opacity: isDark() ? 0.92 : 0.85,
      depthWrite: false,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    engineGroup.add(glassMesh);

    // ── 5. Inner Quantum Synapse Lattice (Counter-Rotating Neural Mesh) ───────
    const innerKnotGeo = new THREE.TorusKnotGeometry(1.44, 0.16, 120, 24, 2, 3);
    const innerKnotMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x12b8a6),
      emissive: new THREE.Color(0x1e7fe8),
      emissiveIntensity: isDark() ? 2.4 : 1.6,
      wireframe: true,
      transparent: true,
      opacity: isDark() ? 0.85 : 0.65,
      roughness: 0.1,
      metalness: 0.9,
    });
    const innerKnotMesh = new THREE.Mesh(innerKnotGeo, innerKnotMat);
    engineGroup.add(innerKnotMesh);

    // ── 6. Central Singularity Quantum Core ───────────────────────────────────
    const coreGroup = new THREE.Group();
    engineGroup.add(coreGroup);

    // Inner plasma sphere
    const plasmaGeo = new THREE.SphereGeometry(0.58, 32, 32);
    const plasmaMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x00d2ff),
      emissive: new THREE.Color(isDark() ? 0x1e7fe8 : 0x12b8a6),
      emissiveIntensity: isDark() ? 3.5 : 2.2,
      roughness: 0.0,
      metalness: 0.95,
    });
    const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
    coreGroup.add(plasmaMesh);

    // Faceted geodesic core cage
    const cageGeo = new THREE.IcosahedronGeometry(0.78, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x6fcf3e),
      emissive: new THREE.Color(0x8b5cf6),
      emissiveIntensity: isDark() ? 2.0 : 1.2,
      wireframe: true,
      transparent: true,
      opacity: isDark() ? 0.75 : 0.5,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageMesh);

    // ── 7. Neural Impulses (Traveling Energy Packets along the Knot) ──────────
    const IMPULSE_COUNT = 16;
    const impulseGeo = new THREE.SphereGeometry(0.048, 16, 16);
    const impulseMeshes: { mesh: THREE.Mesh; tOffset: number; speed: number; mat: THREE.MeshBasicMaterial }[] = [];

    const impulseColors = [
      new THREE.Color(0x00d2ff),
      new THREE.Color(0x12b8a6),
      new THREE.Color(0x6fcf3e),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0xffffff),
    ];

    // Sample points along the Torus Knot path
    const getTorusKnotPoint = (u: number, p = 2, q = 3, r = 1.44, tubeR = 0): THREE.Vector3 => {
      const phi = u * Math.PI * 2;
      const r_xy = r * (0.5 * (2 + Math.sin(q * phi)));
      const x = r_xy * Math.cos(p * phi);
      const y = r_xy * Math.sin(p * phi);
      const z = r * Math.cos(q * phi);
      return new THREE.Vector3(x, y, z);
    };

    for (let i = 0; i < IMPULSE_COUNT; i++) {
      const col = impulseColors[i % impulseColors.length];
      const mat = new THREE.MeshBasicMaterial({ color: col });
      const mesh = new THREE.Mesh(impulseGeo, mat);
      engineGroup.add(mesh);
      impulseMeshes.push({
        mesh,
        tOffset: i / IMPULSE_COUNT,
        speed: 0.08 + (i % 3) * 0.03,
        mat,
      });
    }

    // ── 8. Holographic Floating Data Wafers (Architecture Micro-Panels) ────────
    const createDataWaferTexture = (
      title: string,
      metric1: string,
      metric2: string,
      accentHex: string
    ) => {
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 160;
      const ctx = canvas.getContext("2d")!;

      // Glass card background
      ctx.fillStyle = isDark() ? "rgba(8, 16, 32, 0.72)" : "rgba(255, 255, 255, 0.75)";
      ctx.beginPath();
      ctx.roundRect(4, 4, 312, 152, 16);
      ctx.fill();

      // Border glow
      ctx.strokeStyle = accentHex;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Status indicator dot
      ctx.fillStyle = accentHex;
      ctx.beginPath();
      ctx.arc(24, 30, 5, 0, Math.PI * 2);
      ctx.fill();

      // Title
      ctx.font = "bold 15px monospace";
      ctx.fillStyle = isDark() ? "#F8FAFC" : "#0A0A0A";
      ctx.fillText(title, 38, 35);

      // Metrics
      ctx.font = "13px monospace";
      ctx.fillStyle = isDark() ? "rgba(226, 232, 240, 0.85)" : "rgba(26, 26, 26, 0.85)";
      ctx.fillText(metric1, 24, 76);
      ctx.fillText(metric2, 24, 104);

      // Mini waveform / throughput bar
      ctx.fillStyle = accentHex;
      ctx.fillRect(24, 126, 180, 5);
      ctx.fillStyle = isDark() ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(208, 126, 88, 5);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return { tex, canvas };
    };

    const WAFERS_DATA = [
      {
        title: "ENGINE // ACTIVE",
        m1: "Throughput: 4.8 GB/s",
        m2: "Latency: 1.2ms [p99]",
        color: "#1E7FE8",
        orbitR: 2.7,
        orbitSpeed: 0.18,
        orbitAngle: 0,
        tilt: 0.25,
      },
      {
        title: "NEURAL MESH v4.2",
        m1: "Microservices: 120+ Online",
        m2: "Architecture: Reactive",
        color: "#12B8A6",
        orbitR: 3.1,
        orbitSpeed: -0.14,
        orbitAngle: Math.PI * 0.55,
        tilt: -0.32,
      },
      {
        title: "CLOUD COMPUTE",
        m1: "Cluster: Multi-Region",
        m2: "Health: 99.999% Optimal",
        color: "#6FCF3E",
        orbitR: 2.9,
        orbitSpeed: 0.16,
        orbitAngle: Math.PI * 1.1,
        tilt: 0.18,
      },
      {
        title: "QUANTUM PIPELINE",
        m1: "Zero-Downtime Deploy",
        m2: "Observability: Real-Time",
        color: "#8B5CF6",
        orbitR: 3.3,
        orbitSpeed: -0.12,
        orbitAngle: Math.PI * 1.65,
        tilt: -0.22,
      },
    ];

    const waferPlaneGeo = new THREE.PlaneGeometry(0.85, 0.425);
    const waferMeshes: {
      mesh: THREE.Mesh;
      tex: THREE.CanvasTexture;
      mat: THREE.MeshBasicMaterial;
      orbitR: number;
      orbitSpeed: number;
      orbitAngle: number;
      tilt: number;
    }[] = [];

    const waferGroup = new THREE.Group();
    rootGroup.add(waferGroup);

    WAFERS_DATA.forEach((w) => {
      const { tex } = createDataWaferTexture(w.title, w.m1, w.m2, w.color);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: isDark() ? 0.92 : 0.82,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(waferPlaneGeo, mat);
      waferGroup.add(mesh);

      waferMeshes.push({
        mesh,
        tex,
        mat,
        orbitR: w.orbitR,
        orbitSpeed: w.orbitSpeed,
        orbitAngle: w.orbitAngle,
        tilt: w.tilt,
      });
    });

    // ── 9. Orbiting Chromatic Studio Lights ────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(
      isDark() ? 0x081020 : 0xf4f8fd,
      isDark() ? 1.8 : 3.2
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark() ? 2.6 : 3.0);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const lA = new THREE.PointLight(0x1e7fe8, isDark() ? 5.8 : 4.0, 16); // Azure
    const lB = new THREE.PointLight(0x12b8a6, isDark() ? 5.2 : 3.8, 16); // Teal
    const lC = new THREE.PointLight(0x6fcf3e, isDark() ? 4.2 : 2.8, 14); // Lime
    const lD = new THREE.PointLight(0x8b5cf6, isDark() ? 4.8 : 3.2, 14); // Violet
    scene.add(lA, lB, lC, lD);

    // ── 10. Cosmic Stardust Particle Field ─────────────────────────────────────
    const CORE_PARTICLES = 1600;
    const LEFT_PARTICLES = 42;
    const TOTAL_PARTICLES = CORE_PARTICLES + LEFT_PARTICLES;

    const sfGeo = new THREE.BufferGeometry();
    const sfPos = new Float32Array(TOTAL_PARTICLES * 3);
    const sfCol = new Float32Array(TOTAL_PARTICLES * 3);
    const sfSize = new Float32Array(TOTAL_PARTICLES);

    const brandPalette = [
      new THREE.Color(0x1e7fe8),
      new THREE.Color(0x00d2ff),
      new THREE.Color(0x12b8a6),
      new THREE.Color(0x6fcf3e),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0xffffff),
    ];

    const cx = rootGroup.position.x;

    for (let i = 0; i < CORE_PARTICLES; i++) {
      const r = 2.4 + Math.random() * 6.2;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      sfPos[i * 3] = cx + r * Math.sin(ph) * Math.cos(th);
      sfPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      sfPos[i * 3 + 2] = r * Math.cos(ph);

      const c = brandPalette[Math.floor(Math.random() * brandPalette.length)];
      sfCol[i * 3] = c.r;
      sfCol[i * 3 + 1] = c.g;
      sfCol[i * 3 + 2] = c.b;
      sfSize[i] = 0.05 + Math.random() * 0.065;
    }

    for (let i = CORE_PARTICLES; i < TOTAL_PARTICLES; i++) {
      sfPos[i * 3] = -6.5 + Math.random() * 5.8;
      sfPos[i * 3 + 1] = -3.5 + Math.random() * 7.0;
      sfPos[i * 3 + 2] = -3.0 + Math.random() * 4.5;

      const c = brandPalette[Math.floor(Math.random() * brandPalette.length)];
      sfCol[i * 3] = c.r;
      sfCol[i * 3 + 1] = c.g;
      sfCol[i * 3 + 2] = c.b;
      sfSize[i] = 0.038 + Math.random() * 0.04;
    }

    sfGeo.setAttribute("position", new THREE.BufferAttribute(sfPos, 3));
    sfGeo.setAttribute("color", new THREE.BufferAttribute(sfCol, 3));
    sfGeo.setAttribute("size", new THREE.BufferAttribute(sfSize, 1));

    // Circular soft radial glow sprite
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
      size: 0.1,
      sizeAttenuation: true,
      vertexColors: true,
      map: spriteTex,
      transparent: true,
      opacity: isDark() ? 0.85 : 0.48,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const stardust = new THREE.Points(sfGeo, sfMat);
    scene.add(stardust);

    // ── 11. Interactive Drag-to-Rotate + Inertia + Mouse Parallax ─────────────
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
        tarY = ((e.clientX - hw) / hw) * 0.28;
        tarX = ((e.clientY - hh) / hh) * 0.28;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    // ── 12. Theme Synchronization ─────────────────────────────────────────────
    const syncTheme = () => {
      const d = isDark();
      renderer.toneMappingExposure = d ? 1.3 : 1.15;

      glassMat.color.setHex(d ? 0x081324 : 0xffffff);
      glassMat.attenuationColor.setHex(d ? 0x1e7fe8 : 0x12b8a6);
      glassMat.opacity = d ? 0.92 : 0.85;

      innerKnotMat.emissiveIntensity = d ? 2.4 : 1.6;
      plasmaMat.emissiveIntensity = d ? 3.5 : 2.2;
      cageMat.emissiveIntensity = d ? 2.0 : 1.2;

      waferMeshes.forEach((w) => {
        w.mat.opacity = d ? 0.92 : 0.82;
      });

      sfMat.opacity = d ? 0.85 : 0.48;
      sfMat.blending = d ? THREE.AdditiveBlending : THREE.NormalBlending;
      sfMat.needsUpdate = true;

      ambientLight.color.setHex(d ? 0x081020 : 0xf4f8fd);
      ambientLight.intensity = d ? 1.8 : 3.2;

      keyLight.intensity = d ? 2.6 : 3.0;
      lA.intensity = d ? 5.8 : 4.0;
      lB.intensity = d ? 5.2 : 3.8;
      lC.intensity = d ? 4.2 : 2.8;
      lD.intensity = d ? 4.8 : 3.2;
    };

    const themeObs = new MutationObserver(syncTheme);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ── 13. Animation Loop ─────────────────────────────────────────────────────
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

      // Root Group: slow auto-spin + user drag
      rootGroup.rotation.x = curX + Math.sin(t * 0.35) * 0.04;
      rootGroup.rotation.y = curY + t * 0.08;

      // Outer Glass Knot continuous organic topological rotation
      glassMesh.rotation.x = t * 0.18;
      glassMesh.rotation.y = t * 0.24;
      glassMesh.rotation.z = Math.sin(t * 0.4) * 0.15;

      // Subtle breathing scale
      const breath = 1.0 + Math.sin(t * 1.8) * 0.025;
      glassMesh.scale.setScalar(breath);

      // Inner Quantum Lattice counter-rotates for hypnotic refraction depth
      innerKnotMesh.rotation.x = -t * 0.22;
      innerKnotMesh.rotation.y = -t * 0.30;
      innerKnotMesh.rotation.z = Math.cos(t * 0.5) * 0.18;

      // Singularity Core pulse
      const cp = 1.0 + Math.sin(t * 2.6) * 0.12;
      coreGroup.scale.setScalar(cp);
      cageMesh.rotation.x = t * 0.45;
      cageMesh.rotation.y = -t * 0.38;

      // Animate Neural Impulses traveling along the knot spine
      impulseMeshes.forEach((imp) => {
        const progress = ((t * imp.speed + imp.tOffset) % 1.0 + 1.0) % 1.0;
        const pt = getTorusKnotPoint(progress, 2, 3, 1.44, 0);
        imp.mesh.position.copy(pt);
      });

      // Orbiting Holographic Data Wafers
      waferMeshes.forEach((w) => {
        const angle = w.orbitAngle + t * w.orbitSpeed;
        const x = Math.cos(angle) * w.orbitR;
        const z = Math.sin(angle) * w.orbitR;
        const y = Math.sin(t * 0.8 + w.orbitAngle) * 0.45;

        w.mesh.position.set(x, y, z);
        // Face camera with subtle futuristic tilt
        w.mesh.lookAt(camera.position);
        w.mesh.rotation.z = w.tilt + Math.sin(t * 0.6) * 0.05;
      });

      // Orbiting Chromatic Lights (casting moving refractions through the glass)
      const mx = rootGroup.position.x;
      lA.position.set(mx + Math.sin(t * 1.1) * 4.2, Math.cos(t * 0.8) * 2.8, Math.cos(t * 1.1) * 4.2);
      lB.position.set(mx + Math.cos(-t * 0.9) * 4.8, Math.sin(-t * 1.2) * 3.4, Math.sin(t * 0.7) * 3.8);
      lC.position.set(mx + Math.sin(t * 0.7) * 3.6, -Math.cos(t * 0.9) * 3.2, Math.cos(t * 1.2) * 4.0);
      lD.position.set(mx + Math.cos(t * 0.6) * 5.0, Math.sin(t * 0.5) * 3.8, -Math.sin(t * 0.8) * 3.6);

      // Cosmic stardust slow drift
      stardust.rotation.y = -t * 0.01;
      stardust.rotation.z = Math.sin(t * 0.05) * 0.015;

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

    // ── 14. Resize ─────────────────────────────────────────────────────────────
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

    // ── 15. Cleanup ────────────────────────────────────────────────────────────
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);

      [glassGeo, innerKnotGeo, plasmaGeo, cageGeo, impulseGeo, waferPlaneGeo, sfGeo].forEach(
        (g) => g.dispose()
      );
      [glassMat, innerKnotMat, plasmaMat, cageMat, sfMat].forEach((m) => m.dispose());
      impulseMeshes.forEach((imp) => imp.mat.dispose());
      waferMeshes.forEach((w) => {
        w.mat.dispose();
        w.tex.dispose();
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
      aria-label="Interactive 3D Neural Kinetic Engine — drag to rotate"
      role="region"
    />
  );
}
