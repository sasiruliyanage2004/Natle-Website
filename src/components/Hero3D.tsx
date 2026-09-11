"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Concept B: Cybernetic Architectural Monolith / Quantum Matrix
 *
 * - Outer Shell: Faceted crystalline monolith with optical glass transmission and laser-beveled edges.
 * - Inner Lattice: Luminous structural wireframe with brand gradient energy pathways (Azure -> Teal -> Lime).
 * - Emissive Nodes: Pulsing processing junction points firing at lattice intersections.
 * - Singularity Core: Deep quantum dodecahedron radiating energy from within the monolith.
 * - Data Gimbal: 3 concentric gyroscopic rings with orbiting satellite packets.
 * - Particle Field: 1,200 galaxy particles around the core + 38 sparse delicate stars on the left.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    // --- High-Performance WebGL Renderer ---
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

    const isDarkMode = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    // --- Monolith Root Group (Responsive Positioning) ---
    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);

    const updateMonolithPosition = () => {
      const isDesktop = width >= 1024;
      monolithGroup.position.x = isDesktop ? 1.85 : 0;
      monolithGroup.position.y = isDesktop ? 0.15 : 0.35;
      const scale = isDesktop ? 1 : Math.min(1, width / 768);
      monolithGroup.scale.set(scale, scale, scale);
    };
    updateMonolithPosition();

    // =========================================================================
    // 1. OUTER FACETED MONOLITH CRYSTAL SHELL (Glass Physical Transmission)
    // =========================================================================
    const shellGeo = new THREE.IcosahedronGeometry(1.42, 0);

    const shellMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.05,
      transmission: 0.93,
      thickness: 2.2,
      ior: 1.54,
      transparent: true,
      opacity: 0.95,
      color: new THREE.Color(isDarkMode() ? 0x091426 : 0xffffff),
      emissive: new THREE.Color(isDarkMode() ? 0x071e3d : 0x1e7fe8),
      emissiveIntensity: isDarkMode() ? 0.3 : 0.06,
      reflectivity: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      attenuationColor: new THREE.Color(isDarkMode() ? 0x00d2ff : 0x1e7fe8),
      attenuationDistance: 3.8,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    shellMesh.scale.set(1.0, 1.18, 1.0); // Architectural vertical elongation
    monolithGroup.add(shellMesh);

    // Laser-Etched Facet Edges on the Glass Shell
    const shellEdgesGeo = new THREE.EdgesGeometry(shellGeo);
    const shellEdgesMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(isDarkMode() ? 0x00d2ff : 0x1e7fe8),
      transparent: true,
      opacity: isDarkMode() ? 0.8 : 0.45,
      linewidth: 1.5,
    });
    const shellEdges = new THREE.LineSegments(shellEdgesGeo, shellEdgesMat);
    shellMesh.add(shellEdges);

    // =========================================================================
    // 2. INNER LUMINOUS WIREFRAME LATTICE (The Quantum Circuitry Matrix)
    // =========================================================================
    const innerLatticeGeo = new THREE.OctahedronGeometry(0.96, 1);
    const latticeEdgesGeo = new THREE.WireframeGeometry(innerLatticeGeo);

    // Assign Brand Palette Vertex Colors along Circuit Edges (Azure -> Teal -> Lime)
    const edgePositionAttr = latticeEdgesGeo.getAttribute("position");
    const edgeColors = new Float32Array(edgePositionAttr.count * 3);

    const cAzure = new THREE.Color(0x1e7fe8);
    const cTeal = new THREE.Color(0x12b8a6);
    const cLime = new THREE.Color(0x6fcf3e);

    for (let i = 0; i < edgePositionAttr.count; i++) {
      const y = edgePositionAttr.getY(i);
      const normalizedY = (y + 0.96) / (0.96 * 2); // 0 at bottom, 1 at top

      const c = new THREE.Color();
      if (normalizedY < 0.5) {
        c.copy(cAzure).lerp(cTeal, normalizedY * 2);
      } else {
        c.copy(cTeal).lerp(cLime, (normalizedY - 0.5) * 2);
      }

      edgeColors[i * 3] = c.r;
      edgeColors[i * 3 + 1] = c.g;
      edgeColors[i * 3 + 2] = c.b;
    }
    latticeEdgesGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(edgeColors, 3)
    );

    const latticeMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDarkMode() ? 0.92 : 0.68,
      blending: isDarkMode() ? THREE.AdditiveBlending : THREE.NormalBlending,
      linewidth: 1.5,
    });
    const innerLattice = new THREE.LineSegments(latticeEdgesGeo, latticeMat);
    shellMesh.add(innerLattice);

    // =========================================================================
    // 3. EMISSIVE JUNCTION NODES (Pulsing Processing Cores)
    // =========================================================================
    // Extract unique vertex coordinates from the inner lattice
    const rawPos = innerLatticeGeo.getAttribute("position");
    const uniqueMap = new Map<string, THREE.Vector3>();
    for (let i = 0; i < rawPos.count; i++) {
      const v = new THREE.Vector3(rawPos.getX(i), rawPos.getY(i), rawPos.getZ(i));
      const key = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, v);
      }
    }
    const junctionPoints = Array.from(uniqueMap.values());
    const nodeCount = junctionPoints.length;

    const nodeGeo = new THREE.SphereGeometry(0.038, 14, 14);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x00ffff),
      emissive: new THREE.Color(isDarkMode() ? 0x12b8a6 : 0x1e7fe8),
      emissiveIntensity: isDarkMode() ? 2.6 : 1.4,
      roughness: 0.1,
      metalness: 0.9,
    });
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);

    const dummy = new THREE.Object3D();
    junctionPoints.forEach((pt, idx) => {
      dummy.position.copy(pt);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      instancedNodes.setMatrixAt(idx, dummy.matrix);
    });
    instancedNodes.instanceMatrix.needsUpdate = true;
    innerLattice.add(instancedNodes);

    // =========================================================================
    // 4. DEEP QUANTUM SINGULARITY CORE (Radiating Power from Within)
    // =========================================================================
    const coreGeo = new THREE.DodecahedronGeometry(0.44, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x12b8a6),
      emissive: new THREE.Color(isDarkMode() ? 0x6fcf3e : 0x12b8a6),
      emissiveIntensity: isDarkMode() ? 1.4 : 0.8,
      roughness: 0.15,
      metalness: 0.9,
      wireframe: true,
    });
    const singularityCore = new THREE.Mesh(coreGeo, coreMat);
    shellMesh.add(singularityCore);

    // =========================================================================
    // 5. CONCENTRIC CYBERNETIC GIMBAL RINGS
    // =========================================================================
    // Ring 1 (Azure Orbit)
    const ring1Geo = new THREE.TorusGeometry(2.38, 0.018, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1e7fe8),
      emissive: new THREE.Color(0x00d2ff),
      emissiveIntensity: isDarkMode() ? 0.95 : 0.5,
      roughness: 0.1,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    monolithGroup.add(ring1);

    const sat1Geo = new THREE.SphereGeometry(0.08, 16, 16);
    const sat1Mat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
    ring1.add(sat1);

    // Ring 2 (Emerald / Mint Orbit)
    const ring2Geo = new THREE.TorusGeometry(2.8, 0.015, 16, 140);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x12b8a6),
      emissive: new THREE.Color(0x6fcf3e),
      emissiveIntensity: isDarkMode() ? 0.88 : 0.45,
      roughness: 0.1,
      metalness: 0.9,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    monolithGroup.add(ring2);

    const sat2Geo = new THREE.SphereGeometry(0.075, 16, 16);
    const sat2Mat = new THREE.MeshBasicMaterial({ color: 0x6fcf3e });
    const sat2 = new THREE.Mesh(sat2Geo, sat2Mat);
    ring2.add(sat2);

    // Ring 3 (Deep Indigo Polar Orbit)
    const ring3Geo = new THREE.TorusGeometry(3.18, 0.012, 16, 160);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x6366f1),
      emissive: new THREE.Color(0x818cf8),
      emissiveIntensity: isDarkMode() ? 0.8 : 0.35,
      roughness: 0.2,
      metalness: 0.85,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 2.3;
    monolithGroup.add(ring3);

    // =========================================================================
    // 6. PRESERVED STARFIELD: 1,200 Dense Core Stars + Exactly 38 Left Area Dots
    // =========================================================================
    const coreParticleCount = 1200;
    const leftParticleCount = 38;
    const totalParticles = coreParticleCount + leftParticleCount;

    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(totalParticles * 3);
    const colors = new Float32Array(totalParticles * 3);

    const colorPalette = [
      new THREE.Color(0x1e7fe8), // Azure
      new THREE.Color(0x00d2ff), // Cyan
      new THREE.Color(0x12b8a6), // Teal
      new THREE.Color(0x6fcf3e), // Lime
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0xffffff), // White spark
    ];

    const coreX = monolithGroup.position.x;

    // 1. Main Core Galaxy (1,200 rich particles around the 3D crystal core)
    for (let i = 0; i < coreParticleCount; i++) {
      const radius = 2.2 + Math.random() * 5.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = coreX + radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    // 2. Left Area: Exclusively 38 sparse, delicate dots
    for (let i = coreParticleCount; i < totalParticles; i++) {
      positions[i * 3] = -6.2 + Math.random() * 5.8;
      positions[i * 3 + 1] = -3.2 + Math.random() * 6.4;
      positions[i * 3 + 2] = -2.5 + Math.random() * 4.0;

      const chosenColor =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom circular soft glow texture for particles
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.35, "rgba(255,255,255,0.85)");
      gradient.addColorStop(0.7, "rgba(255,255,255,0.2)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.085,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: isDarkMode() ? 0.75 : 0.45,
      blending: isDarkMode() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // =========================================================================
    // 7. DYNAMIC SPATIAL LIGHTING
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(
      isDarkMode() ? 0x081022 : 0xf0f4f8,
      isDarkMode() ? 2.0 : 2.6
    );
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x1e7fe8, isDarkMode() ? 5.0 : 3.2, 15);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00d2ff, isDarkMode() ? 4.2 : 2.8, 15);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x12b8a6, isDarkMode() ? 3.5 : 2.2, 13);
    scene.add(light3);

    const dirLight = new THREE.DirectionalLight(0xffffff, isDarkMode() ? 1.9 : 2.3);
    dirLight.position.set(4, 5, 6);
    scene.add(dirLight);

    // =========================================================================
    // 8. INTERACTIVE DRAG & PARALLAX PHYSICS
    // =========================================================================
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;

        targetRotY += deltaX * 0.005;
        targetRotX += deltaY * 0.005;
        dragVelocityX = deltaX * 0.005;
        dragVelocityY = deltaY * 0.005;
      } else {
        // Subtle mouse parallax
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        targetRotY = ((e.clientX - halfW) / halfW) * 0.28;
        targetRotX = ((e.clientY - halfH) / halfH) * 0.28;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // =========================================================================
    // 9. THEME SYNCHRONIZER (Dynamic Mutation Observer)
    // =========================================================================
    const updateThemeMaterials = () => {
      const dark = isDarkMode();
      shellMat.color.setHex(dark ? 0x091426 : 0xffffff);
      shellMat.emissive.setHex(dark ? 0x071e3d : 0x1e7fe8);
      shellMat.emissiveIntensity = dark ? 0.3 : 0.06;
      shellMat.attenuationColor.setHex(dark ? 0x00d2ff : 0x1e7fe8);

      shellEdgesMat.color.setHex(dark ? 0x00d2ff : 0x1e7fe8);
      shellEdgesMat.opacity = dark ? 0.8 : 0.45;

      latticeMat.opacity = dark ? 0.92 : 0.68;
      latticeMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      latticeMat.needsUpdate = true;

      nodeMat.emissive.setHex(dark ? 0x12b8a6 : 0x1e7fe8);
      nodeMat.emissiveIntensity = dark ? 2.6 : 1.4;

      coreMat.emissive.setHex(dark ? 0x6fcf3e : 0x12b8a6);
      coreMat.emissiveIntensity = dark ? 1.4 : 0.8;

      ring1Mat.emissiveIntensity = dark ? 0.95 : 0.5;
      ring2Mat.emissiveIntensity = dark ? 0.88 : 0.45;
      ring3Mat.emissiveIntensity = dark ? 0.8 : 0.35;

      particleMat.opacity = dark ? 0.75 : 0.45;
      particleMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      particleMat.needsUpdate = true;

      ambientLight.color.setHex(dark ? 0x081022 : 0xf0f4f8);
      ambientLight.intensity = dark ? 2.0 : 2.6;

      light1.intensity = dark ? 5.0 : 3.2;
      light2.intensity = dark ? 4.2 : 2.8;
      light3.intensity = dark ? 3.5 : 2.2;
      dirLight.intensity = dark ? 1.9 : 2.3;
    };

    const themeObserver = new MutationObserver(updateThemeMaterials);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // =========================================================================
    // 10. ANIMATION & RENDER LOOP (60fps with Energy Pulse)
    // =========================================================================
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

      // Damping & inertia
      if (!isDragging) {
        targetRotY += dragVelocityX;
        targetRotX += dragVelocityY;
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
      }

      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      // Monolith core rotation
      monolithGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.45) * 0.04;
      monolithGroup.rotation.y = currentRotY + elapsed * 0.11;

      // Inner Matrix counter-orbit and breathing
      innerLattice.rotation.x = -elapsed * 0.25;
      innerLattice.rotation.y = elapsed * 0.32;
      const latticeBreath = 1.0 + Math.sin(elapsed * 2.4) * 0.035;
      innerLattice.scale.set(latticeBreath, latticeBreath, latticeBreath);

      // Emissive Node Junctions: Dynamic Energy Pulse
      for (let i = 0; i < nodeCount; i++) {
        const pt = junctionPoints[i];
        const pulse = 1.0 + Math.sin(elapsed * 3.6 + i * 0.7) * 0.35;
        dummy.position.copy(pt);
        dummy.scale.set(pulse, pulse, pulse);
        dummy.updateMatrix();
        instancedNodes.setMatrixAt(i, dummy.matrix);
      }
      instancedNodes.instanceMatrix.needsUpdate = true;

      // Central Quantum Singularity Core: Dynamic Pulse & Counter-Spin
      singularityCore.rotation.x = -elapsed * 0.55;
      singularityCore.rotation.y = elapsed * 0.65;
      const corePulse = 1.0 + Math.sin(elapsed * 2.8) * 0.1;
      singularityCore.scale.set(corePulse, corePulse, corePulse);

      // Gyroscopic Rings Spin
      ring1.rotation.z = elapsed * 0.38;
      sat1.position.x = Math.cos(elapsed * 1.9) * 2.38;
      sat1.position.y = Math.sin(elapsed * 1.9) * 2.38;

      ring2.rotation.y = -elapsed * 0.3;
      sat2.position.x = Math.cos(-elapsed * 1.45) * 2.8;
      sat2.position.z = Math.sin(-elapsed * 1.45) * 2.8;

      ring3.rotation.x = elapsed * 0.24;

      // Cosmic Starfield Subtle Drift
      particles.rotation.y = -elapsed * 0.014;
      particles.rotation.z = Math.sin(elapsed * 0.07) * 0.02;

      // Orbiting Dynamic Lights
      const mx = monolithGroup.position.x;
      light1.position.x = mx + Math.sin(elapsed * 1.2) * 4.4;
      light1.position.z = Math.cos(elapsed * 1.2) * 4.4;
      light1.position.y = Math.sin(elapsed * 0.8) * 2.2;

      light2.position.x = mx + Math.cos(-elapsed * 0.95) * 4.8;
      light2.position.y = Math.sin(-elapsed * 1.1) * 3.6;
      light2.position.z = Math.sin(elapsed * 0.7) * 3.2;

      light3.position.x = mx + Math.sin(elapsed * 0.65) * 3.6;
      light3.position.y = -Math.cos(elapsed * 0.85) * 3.4;
      light3.position.z = Math.cos(elapsed * 1.1) * 4.2;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const startAnimate = () => {
      if (!raf && isIntersecting && isTabVisible) {
        clock.start();
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

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startAnimate();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    startAnimate();

    // =========================================================================
    // 11. RESPONSIVE RESIZE HANDLER
    // =========================================================================
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateMonolithPosition();
    };

    window.addEventListener("resize", onResize);
    onResize();

    // =========================================================================
    // 12. CLEANUP & RESOURCE DISPOSAL
    // =========================================================================
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);

      shellGeo.dispose();
      shellMat.dispose();
      shellEdgesGeo.dispose();
      shellEdgesMat.dispose();
      innerLatticeGeo.dispose();
      latticeEdgesGeo.dispose();
      latticeMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      sat1Geo.dispose();
      sat1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      sat2Geo.dispose();
      sat2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing opacity-95 transition-opacity duration-300 select-none z-[1]"
      aria-label="Interactive 3D Cybernetic Monolith - Click and drag to rotate in 3D"
      role="region"
    />
  );
}
