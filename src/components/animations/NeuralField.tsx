"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

interface NeuralFieldProps {
  funnel?: MotionValue<number>;
}

export default function NeuralField({ funnel }: NeuralFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const updateSize = () => {
      const width = container.clientWidth || 520;
      const height = container.clientHeight || 520;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    updateSize();

    // 2. Geometry & Particles (Fibonacci organic sphere)
    const COUNT = 900;
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const PRIMARY = new THREE.Color("#0ea5e9");   // Cyan
    const SECONDARY = new THREE.Color("#0284c7"); // Deep Sky
    const ACCENT = new THREE.Color("#059669");    // Emerald
    const colorPalette = [PRIMARY, SECONDARY, ACCENT];

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      let x = Math.cos(theta) * radiusAtY;
      let z = Math.sin(theta) * radiusAtY;
      let yy = y;

      // Pseudo noise displacement for organic natural shape
      const warp = 1.35 + 0.35 * Math.sin(x * 2.5 + yy * 2.0 + z * 1.5);
      x *= warp;
      yy *= warp;
      z *= warp;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = yy;
      basePositions[i * 3 + 2] = z;

      positions[i * 3] = x;
      positions[i * 3 + 1] = yy;
      positions[i * 3 + 2] = z;

      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.6 + Math.random() * 0.8;

      const selectedColor = colorPalette[i % colorPalette.length];
      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      sizeAttenuation: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particlesGroup = new THREE.Group();
    const points = new THREE.Points(geometry, material);
    particlesGroup.add(points);
    scene.add(particlesGroup);

    // 3. Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.45;
      targetRotX = -y * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", updateSize);

    // 4. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < COUNT; i++) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        const p = phases[i];
        const sp = speeds[i];

        const breathe = 1 + Math.sin(elapsedTime * 0.6 * sp + p) * 0.07;
        const wave = Math.sin(elapsedTime * 0.8 + bx * 1.5 + p) * 0.08;

        posAttr.setXYZ(i, bx * breathe, by * breathe + wave, bz * breathe);
      }
      posAttr.needsUpdate = true;

      // Smooth mouse rotation
      mouseX += (targetRotX - mouseX) * 0.05;
      mouseY += (targetRotY - mouseY) * 0.05;

      particlesGroup.rotation.x = mouseX;
      particlesGroup.rotation.y = mouseY + elapsedTime * 0.08;

      // Scroll funnel effect if provided
      if (funnel) {
        const sp = funnel.get();
        const scale = Math.max(0.3, 1 - sp * 0.65);
        particlesGroup.scale.setScalar(scale);
        particlesGroup.rotation.z = sp * Math.PI * 0.8;
        particlesGroup.position.z = -sp * 1.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateSize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [funnel]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative flex h-full w-full items-center justify-center"
    >
      <canvas ref={canvasRef} className="h-full w-full max-h-[580px] max-w-[580px]" />
    </div>
  );
}