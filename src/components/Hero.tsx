"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let THREE: any;
    let animationFrameId: number;
    let renderer: any;

    const init = async () => {
      try {
        THREE = await import("three");
        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth || 500;
        const height = mountRef.current.clientHeight || 500;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 3;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Sphere group
        const group = new THREE.Group();
        scene.add(group);

        // Create nodes on sphere surface using fibonacci lattice
        const numNodes = 60;
        const phi = Math.PI * (3 - Math.sqrt(5));
        const nodePositions: { x: number; y: number; z: number; distanceTo: (v: any) => number }[] = [];

        for (let i = 0; i < numNodes; i++) {
          const y = 1 - (i / (numNodes - 1)) * 2;
          const r = Math.sqrt(1 - y * y);
          const theta = phi * i;
          const x = Math.cos(theta) * r;
          const z = Math.sin(theta) * r;
          nodePositions.push(new THREE.Vector3(x, y, z));
        }

        // Small nodes
        const nodeGeo = new THREE.SphereGeometry(0.025, 8, 8);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9 });
        nodePositions.forEach(pos => {
          const mesh = new THREE.Mesh(nodeGeo, nodeMat);
          mesh.position.copy(pos as any);
          group.add(mesh);
        });

        // A few brighter accent nodes (lime)
        const accentGeo = new THREE.SphereGeometry(0.045, 8, 8);
        const accentMat = new THREE.MeshBasicMaterial({ color: 0x5aec8f });
        [0, 10, 20, 30, 40, 50].forEach(i => {
          const mesh = new THREE.Mesh(accentGeo, accentMat);
          mesh.position.copy(nodePositions[i] as any);
          group.add(mesh);
        });

        // Thin edges between nearby nodes (navy/cyan)
        const edgeMat = new THREE.LineBasicMaterial({ color: 0x1a3a8f, transparent: true, opacity: 0.45 });
        const edgePositions: number[] = [];
        for (let i = 0; i < nodePositions.length; i++) {
          for (let j = i + 1; j < nodePositions.length; j++) {
            if (nodePositions[i].distanceTo(nodePositions[j]) < 0.65) {
              edgePositions.push(
                nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
                nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
              );
            }
          }
        }
        const edgeGeo = new THREE.BufferGeometry();
        edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(edgePositions, 3));
        group.add(new THREE.LineSegments(edgeGeo, edgeMat));

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        const onMouseMove = (e: MouseEvent) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
        };
        window.addEventListener("mousemove", onMouseMove);

        // Animate
        const render = () => {
          animationFrameId = requestAnimationFrame(render);
          group.rotation.y += 0.004;
          group.rotation.x += (mouseY - group.rotation.x) * 0.03;
          group.rotation.y += (mouseX - group.rotation.y) * 0.01;
          renderer.render(scene, camera);
        };
        render();

        // Cleanup
        return () => {
          window.removeEventListener("mousemove", onMouseMove);
          cancelAnimationFrame(animationFrameId);
          if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
          nodeGeo.dispose();
          nodeMat.dispose();
          accentGeo.dispose();
          accentMat.dispose();
          edgeGeo.dispose();
          edgeMat.dispose();
        };
      } catch (err) {
        console.error("Three.js failed:", err);
      }
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });

    return () => {
      if (cleanup) cleanup();
      else {
        cancelAnimationFrame(animationFrameId);
        if (renderer) renderer.dispose();
      }
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center pt-28 pb-16"
      style={{ background: "#070d24" }}>
      
      {/* Aurora blobs - NATLE Logo Colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[700px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #1a3a8f 0%, #0ea5e9 40%, transparent 70%)", filter: "blur(100px)" }}></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #0ea5e9 0%, #00c9a7 40%, transparent 70%)", filter: "blur(120px)" }}></div>
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #5aec8f 0%, transparent 70%)", filter: "blur(80px)" }}></div>
      </div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none dot-grid-bg"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-start text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-6 border"
              style={{ background: "rgba(14,165,233,0.12)", borderColor: "rgba(14,165,233,0.4)", color: "#0ea5e9" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] animate-pulse"></span>
              Enterprise AI Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display font-bold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Transforming<br />
              <span className="gradient-text">
                Industries
              </span>{" "}with<br />
              Artificial<br />
              Intelligence
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[#94a3b8] text-lg leading-relaxed mb-8 max-w-xl"
            >
              NATLE delivers intelligent, scalable AI solutions that transform how enterprises operate, compete, and grow across Healthcare, Agriculture, Retail, EdTech, and HR.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/services"
                className="gradient-btn flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm"
              >
                Explore Our Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(14,165,233,0.08)",
                  border: "1px solid rgba(14,165,233,0.35)",
                  color: "#38bdf8"
                }}
              >
                <ShieldCheck className="w-4 h-4" /> Talk to a Specialist
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-8"
            >
              {[
                { val: "9+", label: "Projects" },
                { val: "98.2%", label: "Accuracy" },
                { val: "5", label: "Continents" },
                { val: "6", label: "AI Domains" },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold" style={{
                    background: "linear-gradient(90deg, #0ea5e9, #5aec8f)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                  }}>{s.val}</div>
                  <div className="text-[#64748b] text-xs uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Three.js Sphere — properly contained */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ height: "520px" }}
          >
            {/* Canvas container — fixed size, centered */}
            <div
              ref={mountRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ width: "100%", height: "100%" }}
            />

            {/* Outer glow ring behind sphere */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, rgba(14,165,233,0.05) 50%, transparent 70%)", filter: "blur(20px)" }}></div>
            </div>

            {/* Floating domain badges — positioned around sphere */}
            {[
              { label: "Healthcare AI", color: "#0ea5e9", top: "8%", left: "5%" },
              { label: "AgriTech", color: "#5aec8f", top: "18%", right: "2%" },
              { label: "POS Systems", color: "#f97316", bottom: "28%", left: "0%" },
              { label: "EdTech", color: "#c084fc", top: "52%", right: "0%" },
              { label: "HR Analytics", color: "#2dd4bf", bottom: "10%", right: "12%" },
              { label: "Custom AI", color: "#fbbf24", bottom: "18%", left: "18%" },
            ].map((b, i) => (
              <motion.div
                key={b.label}
                className="absolute px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md z-10"
                style={{
                  ...b,
                  background: `${b.color}18`,
                  border: `1px solid ${b.color}55`,
                  color: b.color,
                  animation: `float ${3.5 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              >
                {b.label}
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
