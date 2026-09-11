"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

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
    camera.position.set(0, 0, 8.2);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const isDarkMode = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    // --- Interactive 3D Core Group (Positioned on the right on desktop) ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const updateCorePosition = () => {
      const isDesktop = width >= 1024;
      coreGroup.position.x = isDesktop ? 1.85 : 0;
      coreGroup.position.y = isDesktop ? 0 : 0.35;
      const scale = isDesktop ? 1 : Math.min(1, width / 768);
      coreGroup.scale.set(scale, scale, scale);
    };
    updateCorePosition();

    // --- 1. Central Translucent Quantum Crystal (Icosahedron) ---
    const crystalGeo = new THREE.IcosahedronGeometry(1.35, 0);

    const crystalMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.08,
      transmission: 0.88,
      thickness: 1.6,
      ior: 1.55,
      transparent: true,
      opacity: 0.92,
      color: new THREE.Color(isDarkMode() ? 0x0c1b33 : 0xffffff),
      emissive: new THREE.Color(isDarkMode() ? 0x0a2458 : 0x1e7fe8),
      emissiveIntensity: isDarkMode() ? 0.35 : 0.08,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    coreGroup.add(crystalMesh);

    // Glowing Wireframe Cage for the Crystal
    const wireframeGeo = new THREE.WireframeGeometry(crystalGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(isDarkMode() ? 0x00d2ff : 0x1e7fe8),
      transparent: true,
      opacity: isDarkMode() ? 0.85 : 0.55,
      linewidth: 1.5,
    });
    const wireframeLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
    crystalMesh.add(wireframeLines);

    // --- 2. Inner Nested Sacred Octahedron Core ---
    const innerCoreGeo = new THREE.OctahedronGeometry(0.75, 0);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x12b8a6),
      emissive: new THREE.Color(0x12b8a6),
      emissiveIntensity: isDarkMode() ? 0.8 : 0.4,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    crystalMesh.add(innerCore);

    // --- 3. Concentric Holographic Orbital Gimbal Rings ---
    // Ring 1 (Azure Cyan Orbit)
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.02, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1e7fe8),
      emissive: new THREE.Color(0x00d2ff),
      emissiveIntensity: isDarkMode() ? 0.9 : 0.5,
      roughness: 0.1,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    // Ring 1 Satellite Orb
    const sat1Geo = new THREE.SphereGeometry(0.09, 16, 16);
    const sat1Mat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
    ring1.add(sat1);

    // Ring 2 (Emerald / Mint Orbit)
    const ring2Geo = new THREE.TorusGeometry(2.75, 0.016, 16, 140);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x12b8a6),
      emissive: new THREE.Color(0x6fcf3e),
      emissiveIntensity: isDarkMode() ? 0.85 : 0.45,
      roughness: 0.1,
      metalness: 0.9,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    coreGroup.add(ring2);

    // Ring 2 Satellite Orb
    const sat2Geo = new THREE.SphereGeometry(0.08, 16, 16);
    const sat2Mat = new THREE.MeshBasicMaterial({ color: 0x6fcf3e });
    const sat2 = new THREE.Mesh(sat2Geo, sat2Mat);
    ring2.add(sat2);

    // Ring 3 (Deep Violet Orbit)
    const ring3Geo = new THREE.TorusGeometry(3.1, 0.012, 16, 160);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x8b5cf6),
      emissive: new THREE.Color(0xa855f7),
      emissiveIntensity: isDarkMode() ? 0.75 : 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 2.5;
    coreGroup.add(ring3);

    // --- 4. Cosmic Particle Starfield ---
    // Main Core Galaxy: Full 1,200 dense, sparkling stars around the crystal
    // Left Area: Exclusively 38 sparse, delicate dots to eliminate the hard cutoff without clutter
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
      new THREE.Color(0x6fcf3e), // Mint
      new THREE.Color(0xa855f7), // Purple
    ];

    const isDesktop = width >= 1024;
    const coreX = isDesktop ? 1.85 : 0;

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

    // 2. Only in the left area (where they previously cut off): just 38 sparse dots
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
      opacity: isDarkMode() ? 0.72 : 0.42,
      blending: isDarkMode() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 5. Dynamic Spatial Lighting System ---
    const ambientLight = new THREE.AmbientLight(
      isDarkMode() ? 0x081020 : 0xf0f4f8,
      isDarkMode() ? 1.8 : 2.5
    );
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x1e7fe8, isDarkMode() ? 4.5 : 3.0, 14);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00d2ff, isDarkMode() ? 3.8 : 2.5, 14);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x12b8a6, isDarkMode() ? 3.0 : 2.0, 12);
    scene.add(light3);

    const dirLight = new THREE.DirectionalLight(0xffffff, isDarkMode() ? 1.8 : 2.2);
    dirLight.position.set(4, 5, 6);
    scene.add(dirLight);

    // --- 6. Interactive Drag Physics ---
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
        targetRotY = ((e.clientX - halfW) / halfW) * 0.25;
        targetRotX = ((e.clientY - halfH) / halfH) * 0.25;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // --- 7. Theme Synchronizer ---
    const updateThemeMaterials = () => {
      const dark = isDarkMode();
      crystalMat.color.setHex(dark ? 0x0c1b33 : 0xffffff);
      crystalMat.emissive.setHex(dark ? 0x0a2458 : 0x1e7fe8);
      crystalMat.emissiveIntensity = dark ? 0.35 : 0.08;

      wireframeMat.color.setHex(dark ? 0x00d2ff : 0x1e7fe8);
      wireframeMat.opacity = dark ? 0.85 : 0.55;

      innerCoreMat.emissiveIntensity = dark ? 0.8 : 0.4;
      ring1Mat.emissiveIntensity = dark ? 0.9 : 0.5;
      ring2Mat.emissiveIntensity = dark ? 0.85 : 0.45;
      ring3Mat.emissiveIntensity = dark ? 0.75 : 0.35;

      particleMat.opacity = dark ? 0.72 : 0.42;
      particleMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      particleMat.needsUpdate = true;

      ambientLight.color.setHex(dark ? 0x081020 : 0xf0f4f8);
      ambientLight.intensity = dark ? 1.8 : 2.5;

      light1.intensity = dark ? 4.5 : 3.0;
      light2.intensity = dark ? 3.8 : 2.5;
      light3.intensity = dark ? 3.0 : 2.0;
      dirLight.intensity = dark ? 1.8 : 2.2;
    };

    const themeObserver = new MutationObserver(updateThemeMaterials);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- 8. Animation & Render Loop with GPU Sleeping ---
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

      // Inertia & lerp damping
      if (!isDragging) {
        targetRotY += dragVelocityX;
        targetRotX += dragVelocityY;
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
      }

      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      // Rotate core group with user interaction
      coreGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.5) * 0.04;
      coreGroup.rotation.y = currentRotY + elapsed * 0.12;

      // Inner Core Counter-Rotation & Organic Breathing
      innerCore.rotation.x = -elapsed * 0.4;
      innerCore.rotation.y = elapsed * 0.5;
      const breath = 1 + Math.sin(elapsed * 2.2) * 0.08;
      innerCore.scale.set(breath, breath, breath);

      // Rings Independent Spin
      ring1.rotation.z = elapsed * 0.35;
      sat1.position.x = Math.cos(elapsed * 1.8) * 2.35;
      sat1.position.y = Math.sin(elapsed * 1.8) * 2.35;

      ring2.rotation.y = -elapsed * 0.28;
      sat2.position.x = Math.cos(-elapsed * 1.4) * 2.75;
      sat2.position.z = Math.sin(-elapsed * 1.4) * 2.75;

      ring3.rotation.x = elapsed * 0.22;

      // Background Starfield Organic Drift
      particles.rotation.y = -elapsed * 0.015;
      particles.rotation.z = Math.sin(elapsed * 0.08) * 0.02;

      // Orbiting Point Lights around core position
      const cx = coreGroup.position.x;
      light1.position.x = cx + Math.sin(elapsed * 1.2) * 4.2;
      light1.position.z = Math.cos(elapsed * 1.2) * 4.2;
      light1.position.y = Math.sin(elapsed * 0.8) * 2.0;

      light2.position.x = cx + Math.cos(-elapsed * 0.9) * 4.6;
      light2.position.y = Math.sin(-elapsed * 1.1) * 3.5;
      light2.position.z = Math.sin(elapsed * 0.7) * 3.0;

      light3.position.x = cx + Math.sin(elapsed * 0.6) * 3.5;
      light3.position.y = -Math.cos(elapsed * 0.8) * 3.2;
      light3.position.z = Math.cos(elapsed * 1.1) * 4.0;

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

    // --- 9. Responsive Resize Handler ---
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateCorePosition();
    };

    window.addEventListener("resize", onResize);
    onResize();

    // --- 10. Memory & GPU Cleanup ---
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);

      crystalGeo.dispose();
      crystalMat.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
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
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing opacity-90 transition-opacity duration-300 select-none z-[1]"
      aria-label="Interactive 3D Quantum Prism Scene - Click and drag to rotate in 3D"
      role="region"
    />
  );
}
