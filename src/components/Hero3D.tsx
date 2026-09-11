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

    // --- Main 3D Interactive Group ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const isDarkMode = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    // --- 1. Central Translucent Quantum Crystal (Icosahedron) ---
    const crystalGeo = new THREE.IcosahedronGeometry(1.35, 0);

    // Faceted Crystal Material
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
    mainGroup.add(crystalMesh);

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

    // --- 3. Dual Concentric Holographic Orbital Gimbal Rings ---
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
    mainGroup.add(ring1);

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
    mainGroup.add(ring2);

    // Ring 2 Satellite Orb
    const sat2Geo = new THREE.SphereGeometry(0.08, 16, 16);
    const sat2Mat = new THREE.MeshBasicMaterial({ color: 0x6fcf3e });
    const sat2 = new THREE.Mesh(sat2Geo, sat2Mat);
    ring2.add(sat2);

    // Ring 3 (Deep Purple / Violet Orbit)
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
    mainGroup.add(ring3);

    // --- 4. 3D Depth Particle Constellation Galaxy (1,200 Star Vertices) ---
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x1e7fe8), // Azure
      new THREE.Color(0x00d2ff), // Cyan
      new THREE.Color(0x12b8a6), // Teal
      new THREE.Color(0x6fcf3e), // Lime
      new THREE.Color(0xa855f7), // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral spherical distribution with depth
      const radius = 2.4 + Math.random() * 5.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

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
      size: 0.09,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: isDarkMode() ? 0.75 : 0.45,
      blending: isDarkMode() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // --- 5. Dynamic Spatial Lighting System ---
    const ambientLight = new THREE.AmbientLight(
      isDarkMode() ? 0x081020 : 0xf0f4f8,
      isDarkMode() ? 1.8 : 2.5
    );
    scene.add(ambientLight);

    // Light 1: Electric Azure Point Light
    const light1 = new THREE.PointLight(0x1e7fe8, isDarkMode() ? 4.5 : 3.0, 14);
    scene.add(light1);

    // Light 2: Radiant Cyan Point Light
    const light2 = new THREE.PointLight(0x00d2ff, isDarkMode() ? 3.8 : 2.5, 14);
    scene.add(light2);

    // Light 3: Emerald Glow Point Light
    const light3 = new THREE.PointLight(0x12b8a6, isDarkMode() ? 3.0 : 2.0, 12);
    scene.add(light3);

    // Directional specular kicker
    const dirLight = new THREE.DirectionalLight(0xffffff, isDarkMode() ? 1.8 : 2.2);
    dirLight.position.set(4, 5, 6);
    scene.add(dirLight);

    // --- 6. Interactive Mouse Tracking & Free Drag Physics ---
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

        dragVelocityX = deltaX * 0.005;
        dragVelocityY = deltaY * 0.005;

        targetRotY += dragVelocityX;
        targetRotX += dragVelocityY;

        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      } else {
        // Subtle mouse parallax tilt when not dragging
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        targetRotY = ((e.clientX - halfW) / halfW) * 0.45;
        targetRotX = ((e.clientY - halfH) / halfH) * 0.35;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    if (mount) {
      mount.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointerup", onPointerUp);
    }

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

      particleMat.opacity = dark ? 0.75 : 0.45;
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

      // Group rotation from user drag and subtle organic float
      mainGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.5) * 0.05;
      mainGroup.rotation.y = currentRotY + elapsed * 0.15;

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

      // Particles Constellation Drift
      particles.rotation.y = -elapsed * 0.035;
      particles.rotation.z = Math.sin(elapsed * 0.1) * 0.05;

      // Dynamic Orbiting Point Lights
      light1.position.x = Math.sin(elapsed * 1.2) * 4.2;
      light1.position.z = Math.cos(elapsed * 1.2) * 4.2;
      light1.position.y = Math.sin(elapsed * 0.8) * 2.0;

      light2.position.x = Math.cos(-elapsed * 0.9) * 4.6;
      light2.position.y = Math.sin(-elapsed * 1.1) * 3.5;
      light2.position.z = Math.sin(elapsed * 0.7) * 3.0;

      light3.position.x = Math.sin(elapsed * 0.6) * 3.5;
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

    // IntersectionObserver to sleep WebGL loop when hero is scrolled past
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

    // Tab visibility handling
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
      if (mount) {
        mount.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", onPointerUp);
      }

      // Dispose all 3D geometries and materials
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
      className="absolute right-0 top-0 w-full lg:w-3/4 h-full pointer-events-auto cursor-grab active:cursor-grabbing opacity-90 transition-opacity duration-300 select-none z-[1]"
      aria-label="Interactive 3D Quantum Prism Scene - Click and drag to rotate in 3D"
      role="region"
    />
  );
}
