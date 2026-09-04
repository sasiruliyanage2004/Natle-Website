"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import * as THREE from "three";

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 2.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(500, 500);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Neural Network Sphere Geometry
    const nodes: THREE.Vector3[] = [];
    const numNodes = 80;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < numNodes; i++) {
      const y = 1 - (i / (numNodes - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Node Material
    const nodeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.9 });
    
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    nodes.forEach(pos => {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      mesh.position.copy(pos);
      nodeGroup.add(mesh);
    });

    // Edges
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x1a3a8f, transparent: true, opacity: 0.4 });
    const lineGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 0.8) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const lines = new THREE.LineSegments(lineGeometry, edgesMaterial);
    nodeGroup.add(lines);

    // Outer Glow Nodes
    const glowGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x5aec8f, transparent: true, opacity: 0.8 });
    for(let i = 0; i < 12; i++) {
      const mesh = new THREE.Mesh(glowGeometry, glowMaterial);
      mesh.position.copy(nodes[Math.floor(Math.random() * nodes.length)]);
      nodeGroup.add(mesh);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x0ea5e9, 2);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotationX = y * 0.3;
      targetRotationY = x * 0.3;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const render = () => {
      nodeGroup.rotation.y += 0.003;
      nodeGroup.rotation.x += (targetRotationX - nodeGroup.rotation.x) * 0.05;
      nodeGroup.rotation.y += (targetRotationY - nodeGroup.rotation.y) * 0.05;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      edgesMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#070d24] flex items-center pt-24 pb-16 dot-grid-bg">
      {/* Aurora FX */}
      <div className="aurora-blob-blue w-[600px] h-[600px] -top-32 -left-32"></div>
      <div className="aurora-blob-cyan w-[500px] h-[500px] top-10 right-0 opacity-50"></div>
      <div className="aurora-blob-lime w-[400px] h-[400px] bottom-0 left-1/2 -translate-x-1/2 opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0ea5e9] mb-6">
              ?? Enterprise AI Platform
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e8f0fe] leading-tight mb-6">
              Transforming <span className="gradient-text">Industries</span><br className="hidden sm:block"/>
              with Artificial <span className="gradient-text">Intelligence</span>
            </h1>
            
            <p className="text-[#94a3b8] text-lg max-w-2xl leading-relaxed mb-8">
              NATLE delivers intelligent, scalable AI solutions that transform how enterprises operate, compete, and grow across Healthcare, Agriculture, Retail, EdTech, and HR.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link href="/services" className="gradient-btn px-8 py-4 rounded-full w-full sm:w-auto text-sm">
                Explore Our Services
              </Link>
              <Link href="/contact" className="outline-btn px-8 py-4 rounded-full w-full sm:w-auto flex items-center justify-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4" />
                Talk to a Specialist
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-2xl">
              <div>
                <div className="text-2xl font-bold font-mono text-[#e8f0fe]">9+</div>
                <div className="text-xs text-[#64748b] uppercase tracking-wider mt-1">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-[#0ea5e9]">98.2%</div>
                <div className="text-xs text-[#64748b] uppercase tracking-wider mt-1">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-[#5aec8f]">5</div>
                <div className="text-xs text-[#64748b] uppercase tracking-wider mt-1">Continents</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-[#00c9a7]">6</div>
                <div className="text-xs text-[#64748b] uppercase tracking-wider mt-1">Domains</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Neural Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center h-[500px]"
          >
            <div ref={mountRef} className="absolute inset-0 flex items-center justify-center" />
            
            {/* Floating Domain Badges */}
            <motion.div className="absolute top-10 left-0 badge-healthcare px-3 py-1.5 rounded-full text-xs font-bold animate-float" style={{ animationDelay: "0s" }}>
              Healthcare AI
            </motion.div>
            <motion.div className="absolute top-20 right-10 badge-agriculture px-3 py-1.5 rounded-full text-xs font-bold animate-float" style={{ animationDelay: "0.5s" }}>
              AgriTech
            </motion.div>
            <motion.div className="absolute bottom-32 left-10 badge-pos px-3 py-1.5 rounded-full text-xs font-bold animate-float" style={{ animationDelay: "1s" }}>
              POS Systems
            </motion.div>
            <motion.div className="absolute top-1/2 -right-4 badge-education px-3 py-1.5 rounded-full text-xs font-bold animate-float" style={{ animationDelay: "1.5s" }}>
              EdTech
            </motion.div>
            <motion.div className="absolute bottom-10 right-20 badge-hr px-3 py-1.5 rounded-full text-xs font-bold animate-float" style={{ animationDelay: "2s" }}>
              HR Analytics
            </motion.div>
            <motion.div className="absolute bottom-20 left-1/4 badge-custom px-3 py-1.5 rounded-full text-xs font-bold animate-float" style={{ animationDelay: "2.5s" }}>
              Custom AI
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

