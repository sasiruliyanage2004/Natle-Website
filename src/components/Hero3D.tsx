"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero3D — Ambient 3D Particle Space & Energy Waves
 *
 * Provides deep atmospheric 3D stardust particles, floating energy nodes,
 * and the exact-origin radial wipe transition overlay behind the Living Code Terminal.
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

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Stardust galaxy particles
    const STAR_COUNT = 1200;
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starCol = new Float32Array(STAR_COUNT * 3);
    const palette = [
      new THREE.Color(0x00e5ff), // Cyan
      new THREE.Color(0x1e7fe8), // Azure
      new THREE.Color(0x12b8a6), // Teal
      new THREE.Color(0xffd54f), // Gold
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 16;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = palette[i % palette.length];
      starCol[i * 3] = c.r;
      starCol[i * 3 + 1] = c.g;
      starCol[i * 3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starCol, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: isDark() ? 0.75 : 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Ambient floating lights
    const l1 = new THREE.PointLight(0x00e5ff, isDark() ? 2.5 : 1.2, 10);
    l1.position.set(3, 2, 2);
    const l2 = new THREE.PointLight(0x1e7fe8, isDark() ? 2.0 : 1.0, 10);
    l2.position.set(-3, -2, 2);
    scene.add(l1, l2);

    // Parallax
    let tarX = 0, tarY = 0, curX = 0, curY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const hw = window.innerWidth / 2;
      const hh = window.innerHeight / 2;
      tarY = ((e.clientX - hw) / hw) * 0.15;
      tarX = ((e.clientY - hh) / hh) * 0.12;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Theme sync
    const syncTheme = () => {
      const d = isDark();
      starMat.opacity = d ? 0.75 : 0.4;
      l1.intensity = d ? 2.5 : 1.2;
      l2.intensity = d ? 2.0 : 1.0;
    };
    const themeObs = new MutationObserver(syncTheme);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Animation Loop
    const clock = new THREE.Clock();
    let raf = 0, visible = true;

    const animate = () => {
      if (!visible) return;
      const t = clock.getElapsedTime();

      curX += (tarX - curX) * 0.05;
      curY += (tarY - curY) * 0.05;

      starPoints.rotation.y = t * 0.02 + curY;
      starPoints.rotation.x = curX;

      l1.position.x = 3 + Math.sin(t * 0.8) * 1.5;
      l1.position.y = 2 + Math.cos(t * 0.6) * 1.2;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(animate);
      else if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(mount);
    raf = requestAnimationFrame(animate);

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

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObs.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
      <div ref={mountRef} className="w-full h-full" />

      {/* Radial wipe transition overlay originating from switch coordinates */}
      <div
        className="pointer-events-none fixed inset-0 radial-wipe-mask bg-[#FCFDFE] dark:bg-[#07090E] opacity-95 transition-opacity duration-300 z-40"
        aria-hidden="true"
      />
    </div>
  );
}
