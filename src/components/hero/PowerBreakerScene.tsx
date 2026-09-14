"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ConduitsManager } from "./Conduits";
import { createPlasmaOrbMaterial } from "./shaders/plasmaShader";
import { themeStore } from "./useThemeProgress";

/**
 * Quantum Power Breaker 3D Scene
 *
 * An obsidian-ceramic monolithic terminal with:
 * - CNC beveled monolithic slab (~1:3 aspect ratio)
 * - Upper core aperture exposing a suspended refracting glass orb with living plasma
 * - Recessed milled toggle lever milled into the slab base
 * - Real-time DOM-to-3D anchor tracking via ConduitsManager
 * - Single GSAP master timeline driving:
 *   1. Lever pivot rotation + mechanical relay sound
 *   2. Conduit energy pulse (uProgress 0 -> 1)
 *   3. DOM anchor ignition (staggered headline, logo, CTA blooms)
 *   4. Exact-origin radial theme wipe from switch coordinates
 *   5. Single source of truth themeProgress tweening (0 <-> 1)
 */

// Synthesize crisp mechanical relay click sound via Web Audio API
function playMechanicalRelaySound(isDarkTarget: boolean) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;

    // Sharp mechanical latch click
    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    click.type = "sine";
    click.frequency.setValueAtTime(isDarkTarget ? 1480 : 1850, now);
    click.frequency.exponentialRampToValueAtTime(180, now + 0.045);
    clickGain.gain.setValueAtTime(0.18, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    click.connect(clickGain);
    clickGain.connect(ctx.destination);
    click.start(now);
    click.stop(now + 0.06);

    // Deep hydraulic / power transformer thud
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = "triangle";
    sub.frequency.setValueAtTime(isDarkTarget ? 95 : 190, now + 0.01);
    sub.frequency.exponentialRampToValueAtTime(isDarkTarget ? 190 : 380, now + 0.28);
    subGain.gain.setValueAtTime(0.12, now + 0.01);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    sub.connect(subGain);
    subGain.connect(ctx.destination);
    sub.start(now + 0.01);
    sub.stop(now + 0.32);
  } catch {
    // AudioContext blocked or not supported — silent fallback
  }
}

export default function PowerBreakerScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const isSwitchingRef = useRef(false);

  // References for master GSAP sequence
  const conduitsManagerRef = useRef<ConduitsManager | null>(null);
  const leverMeshRef = useRef<THREE.Group | null>(null);
  const orbLightRef = useRef<THREE.PointLight | null>(null);
  const plasmaMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const slabRigRef = useRef<THREE.Group | null>(null);

  // Calculate exact screen position of the 3D switch for the radial wipe
  const getSwitchScreenCoords = useCallback(() => {
    if (!leverMeshRef.current || !cameraRef.current || !mountRef.current) {
      return { x: window.innerWidth * 0.72, y: window.innerHeight * 0.65 };
    }
    const worldPos = new THREE.Vector3();
    leverMeshRef.current.getWorldPosition(worldPos);

    const projected = worldPos.clone().project(cameraRef.current);
    const screenX = ((projected.x + 1) / 2) * window.innerWidth;
    const screenY = ((-projected.y + 1) / 2) * window.innerHeight;

    return { x: screenX, y: screenY };
  }, []);

  // Master GSAP Timeline Sequence
  const triggerMasterSwitch = useCallback(() => {
    if (isSwitchingRef.current) return;
    isSwitchingRef.current = true;

    const currentDark = themeStore.getState().isDark;
    const targetDark = !currentDark;
    const targetProgress = targetDark ? 0.0 : 1.0;

    // 1. Play mechanical relay sound
    playMechanicalRelaySound(targetDark);

    // 2. Set origin for radial wipe
    const switchPos = getSwitchScreenCoords();
    themeStore.setSwitchPos(switchPos.x, switchPos.y);

    document.documentElement.style.setProperty("--radial-wipe-origin-x", `${switchPos.x}px`);
    document.documentElement.style.setProperty("--radial-wipe-origin-y", `${switchPos.y}px`);

    // Master Timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        isSwitchingRef.current = false;
        themeStore.setTransitioning(false);
      },
    });

    themeStore.setTransitioning(true);

    // Step A: Lever flip on its pivot
    if (leverMeshRef.current) {
      const targetRotX = targetDark ? 0.42 : -0.42;
      tl.to(leverMeshRef.current.rotation, {
        x: targetRotX,
        duration: 0.38,
        ease: "power4.inOut",
      }, 0);
    }

    // Step B: Point of light races along conduits via uProgress
    const routes = conduitsManagerRef.current?.getRoutes() || [];
    routes.forEach((route, i) => {
      if (route.material) {
        route.material.uniforms.uPulseActive.value = 1.0;
        route.material.uniforms.uProgress.value = 0.0;

        tl.to(
          route.material.uniforms.uProgress,
          {
            value: 1.0,
            duration: 0.9,
            ease: "power2.inOut",
            onComplete: () => {
              route.material!.uniforms.uPulseActive.value = 0.0;
            },
          },
          0.12 + i * 0.04
        );
      }
    });

    // Step C: DOM anchors ignite as the pulse arrives
    tl.add(() => {
      const words = document.querySelectorAll('[data-anchor="headline-word"]');
      words.forEach((w, idx) => {
        setTimeout(() => {
          w.classList.add("ignited");
          setTimeout(() => w.classList.remove("ignited"), 600);
        }, idx * 75);
      });

      const logo = document.querySelector('[data-anchor="nav-logo"]');
      if (logo) {
        logo.classList.add("ignited");
        setTimeout(() => logo.classList.remove("ignited"), 700);
      }

      const cta = document.querySelector('[data-anchor="cta-btn"]');
      if (cta) {
        cta.classList.add("ignited");
        setTimeout(() => cta.classList.remove("ignited"), 700);
      }
    }, 0.55);

    // Step D: Full-viewport radial wipe expands from switch coordinates
    const wipeObj = { r: 0 };
    tl.to(
      wipeObj,
      {
        r: 150,
        duration: 0.85,
        ease: "power2.inOut",
        onUpdate: () => {
          document.documentElement.style.setProperty("--radial-wipe-radius", `${wipeObj.r}%`);
        },
        onComplete: () => {
          document.documentElement.style.setProperty("--radial-wipe-radius", `0%`);
        },
      },
      0.35
    );

    // Step E: Smooth themeProgress interpolation driving CSS & WebGL simultaneously
    const progressObj = { p: currentDark ? 0.0 : 1.0 };
    tl.to(
      progressObj,
      {
        p: targetProgress,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: () => {
          themeStore.setProgress(progressObj.p);
          if (plasmaMatRef.current) {
            plasmaMatRef.current.uniforms.uThemeProgress.value = progressObj.p;
          }
        },
        onStart: () => {
          // Halfway through the radial wipe, flip the dark class
          setTimeout(() => {
            themeStore.setDark(targetDark);
          }, 350);
        },
      },
      0.25
    );

    // Step F: Orb internal light color shift
    if (orbLightRef.current) {
      const targetColor = targetDark ? new THREE.Color(0x00e5ff) : new THREE.Color(0xffb300);
      tl.to(
        orbLightRef.current.color,
        {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          duration: 0.8,
        },
        0.25
      );
    }
  }, [getSwitchScreenCoords]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const isDark = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    // ─────────────────────────────────────────────────────────────────────────
    // 1. WEBGL RENDERER
    // ─────────────────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark() ? 1.2 : 1.0;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ─────────────────────────────────────────────────────────────────────────
    // 2. SCENE & CAMERA
    // ─────────────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);
    cameraRef.current = camera;

    // Root container
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const setRootPosition = () => {
      const desktop = width >= 1024;
      // Position terminal on the right half on desktop to balance the hero copy
      rootGroup.position.set(desktop ? 2.15 : 0, desktop ? 0.05 : 0.45, 0);
      rootGroup.scale.setScalar(desktop ? 1.0 : Math.min(0.82, width / 768));
    };
    setRootPosition();

    // Monolithic slab assembly
    const slabRig = new THREE.Group();
    rootGroup.add(slabRig);
    slabRigRef.current = slabRig;

    // ─────────────────────────────────────────────────────────────────────────
    // 3. THE MONOLITHIC SLAB TERMINAL (CNC Chamfered Body)
    // ─────────────────────────────────────────────────────────────────────────
    // Slab dimensions: ~1:3 vertical aspect ratio
    const SLAB_W = 1.46;
    const SLAB_H = 4.2;
    const SLAB_D = 0.38;
    const SLAB_R = 0.16;

    const slabShape = new THREE.Shape();
    const x0 = -SLAB_W / 2;
    const y0 = -SLAB_H / 2;
    slabShape.moveTo(x0 + SLAB_R, y0);
    slabShape.lineTo(x0 + SLAB_W - SLAB_R, y0);
    slabShape.quadraticCurveTo(x0 + SLAB_W, y0, x0 + SLAB_W, y0 + SLAB_R);
    slabShape.lineTo(x0 + SLAB_W, y0 + SLAB_H - SLAB_R);
    slabShape.quadraticCurveTo(x0 + SLAB_W, y0 + SLAB_H, x0 + SLAB_W - SLAB_R, y0 + SLAB_H);
    slabShape.lineTo(x0 + SLAB_R, y0 + SLAB_H);
    slabShape.quadraticCurveTo(x0, y0 + SLAB_H, x0, y0 + SLAB_H - SLAB_R);
    slabShape.lineTo(x0, y0 + SLAB_R);
    slabShape.quadraticCurveTo(x0, y0, x0 + SLAB_R, y0);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: SLAB_D,
      bevelEnabled: true,
      bevelSegments: 8, // CNC machined finish
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const slabGeo = new THREE.ExtrudeGeometry(slabShape, extrudeSettings);
    slabGeo.center();

    // Material: Obsidian ceramic over titanium with clearcoat
    const slabMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDark() ? 0x070b14 : 0xe2e8f0),
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      reflectivity: 0.8,
    });
    const slabMesh = new THREE.Mesh(slabGeo, slabMat);
    slabRig.add(slabMesh);

    // ─────────────────────────────────────────────────────────────────────────
    // 4. CORE APERTURE & SUSPENDED GLASS PLASMA ORB
    // ─────────────────────────────────────────────────────────────────────────
    // Upper third cutout position
    const apertureY = 0.95;

    // Bore lining ring (milled dark metallic collar)
    const boreGeo = new THREE.CylinderGeometry(0.52, 0.52, SLAB_D + 0.1, 48, 1, true);
    boreGeo.rotateX(Math.PI / 2);
    const boreMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      metalness: 0.95,
      roughness: 0.1,
      side: THREE.DoubleSide,
    });
    const boreMesh = new THREE.Mesh(boreGeo, boreMat);
    boreMesh.position.set(0, apertureY, 0);
    slabRig.add(boreMesh);

    // Internal Plasma Core Orb (Icosahedron with noise displacement)
    const plasmaGeo = new THREE.IcosahedronGeometry(0.38, 4);
    const plasmaMat = createPlasmaOrbMaterial();
    plasmaMatRef.current = plasmaMat;
    const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
    plasmaMesh.position.set(0, apertureY, 0);
    slabRig.add(plasmaMesh);

    // Outer Refracting Glass Shell
    const glassShellGeo = new THREE.SphereGeometry(0.44, 48, 48);
    const glassShellMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.93,
      thickness: 0.8,
      ior: 1.52,
      roughness: 0.04,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const glassShellMesh = new THREE.Mesh(glassShellGeo, glassShellMat);
    glassShellMesh.position.set(0, apertureY, 0);
    slabRig.add(glassShellMesh);

    // Suspended Point Light inside the orb
    const orbLight = new THREE.PointLight(isDark() ? 0x00e5ff : 0xffb300, 3.5, 8);
    orbLight.position.set(0, apertureY, 0);
    slabRig.add(orbLight);
    orbLightRef.current = orbLight;

    // ─────────────────────────────────────────────────────────────────────────
    // 5. RECESSED MILLED TOGGLE SWITCH / LEVER (At Base of Slab)
    // ─────────────────────────────────────────────────────────────────────────
    const switchY = -1.35;
    const switchZ = SLAB_D / 2 + 0.02;

    // Recessed milled housing cavity
    const cavityGeo = new THREE.BoxGeometry(0.56, 0.72, 0.12);
    const cavityMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      metalness: 0.95,
      roughness: 0.15,
    });
    const cavityMesh = new THREE.Mesh(cavityGeo, cavityMat);
    cavityMesh.position.set(0, switchY, switchZ - 0.04);
    slabRig.add(cavityMesh);

    // Lever pivot assembly
    const leverGroup = new THREE.Group();
    leverGroup.position.set(0, switchY, switchZ);
    slabRig.add(leverGroup);
    leverMeshRef.current = leverGroup;

    // Lever arm bar
    const leverArmGeo = new THREE.BoxGeometry(0.18, 0.42, 0.07);
    const leverArmMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: new THREE.Color(isDark() ? 0x00e5ff : 0x12b8a6),
      emissiveIntensity: 0.85,
      metalness: 0.9,
      roughness: 0.15,
    });
    const leverArm = new THREE.Mesh(leverArmGeo, leverArmMat);
    leverArm.position.set(0, 0.12, 0.04);
    leverGroup.add(leverArm);

    // Lever knurled handle grip
    const gripGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.22, 16);
    gripGeo.rotateZ(Math.PI / 2);
    const gripMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.2,
    });
    const grip = new THREE.Mesh(gripGeo, gripMat);
    grip.position.set(0, 0.32, 0.06);
    leverGroup.add(grip);

    // Initial lever rotation based on dark/light
    leverGroup.rotation.x = isDark() ? 0.42 : -0.42;

    // Glow border ring around switch cavity
    const seamGeo = new THREE.RingGeometry(0.26, 0.29, 32);
    const seamMat = new THREE.MeshBasicMaterial({
      color: isDark() ? 0x00e5ff : 0x12b8a6,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    const seamMesh = new THREE.Mesh(seamGeo, seamMat);
    seamMesh.position.set(0, switchY, switchZ + 0.01);
    slabRig.add(seamMesh);

    // ─────────────────────────────────────────────────────────────────────────
    // 6. DOM-TO-3D CONDUITS MANAGER
    // ─────────────────────────────────────────────────────────────────────────
    const conduitsManager = new ConduitsManager(camera, rootGroup);
    conduitsManagerRef.current = conduitsManager;

    const updateConduits = () => {
      conduitsManager.setTerminalPosition(rootGroup.position);
      conduitsManager.updateAnchorGeometry();
    };

    // Initial update after DOM renders
    setTimeout(updateConduits, 100);

    // Debounced resize and scroll for anchor recalculation
    let resizeTimer = 0;
    const debouncedUpdateConduits = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        updateConduits();
      }, 150);
    };
    window.addEventListener("resize", debouncedUpdateConduits);
    window.addEventListener("scroll", debouncedUpdateConduits, { passive: true });

    // ─────────────────────────────────────────────────────────────────────────
    // 7. 3-POINT LIGHTING RIG
    // ─────────────────────────────────────────────────────────────────────────
    // Ambient light
    const ambientLight = new THREE.AmbientLight(isDark() ? 0x070b14 : 0xf8fafc, isDark() ? 1.6 : 2.8);
    scene.add(ambientLight);

    // 1. Hard azure rim light (camera-left)
    const azureRimLight = new THREE.DirectionalLight(0x1e7fe8, isDark() ? 3.5 : 2.2);
    azureRimLight.position.set(-6, 3, 4);
    scene.add(azureRimLight);

    // 2. Soft deep-teal fill light (from below, uplighting the aperture)
    const tealFillLight = new THREE.DirectionalLight(0x12b8a6, isDark() ? 2.8 : 1.8);
    tealFillLight.position.set(2, -5, 3);
    scene.add(tealFillLight);

    // Top key light
    const keyLight = new THREE.DirectionalLight(0xffffff, isDark() ? 2.2 : 2.8);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    // ─────────────────────────────────────────────────────────────────────────
    // 8. INTERACTION & RAYCASTING (Hover and Click on Switch)
    // ─────────────────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let tarX = 0, tarY = 0, curX = 0, curY = 0;
    let dragging = false, pMX = 0, pMY = 0, velX = 0, velY = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      pMX = e.clientX;
      pMY = e.clientY;
      velX = velY = 0;
    };

    const onPointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - pMX, e.clientY - pMY);
      // If clicked (short distance)
      if (dist < 8) {
        const rect = mount.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const hits = raycaster.intersectObjects([leverArm, grip, cavityMesh, slabMesh], true);
        if (hits.length > 0) {
          triggerMasterSwitch();
        }
      }
      dragging = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - pMX;
        const dy = e.clientY - pMY;
        pMX = e.clientX;
        pMY = e.clientY;
        tarY += dx * 0.004;
        tarX += dy * 0.004;
        velX = dx * 0.004;
        velY = dy * 0.004;
      } else {
        // Parallax tilt
        const hw = window.innerWidth / 2;
        const hh = window.innerHeight / 2;
        tarY = ((e.clientX - hw) / hw) * 0.18;
        tarX = ((e.clientY - hh) / hh) * 0.14;

        // Hover detection on switch
        const rect = mount.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const hits = raycaster.intersectObjects([leverArm, grip, cavityMesh], true);
        if (hits.length > 0) {
          mount.style.cursor = "pointer";
          leverArmMat.emissiveIntensity = 1.6;
        } else {
          mount.style.cursor = "grab";
          leverArmMat.emissiveIntensity = 0.85;
        }
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // ─────────────────────────────────────────────────────────────────────────
    // 9. ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────────────────
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

      // Slab gentle idle self-rotation (2-3 deg/sec) + parallax
      slabRig.rotation.y = curY + Math.sin(t * 0.4) * 0.06;
      slabRig.rotation.x = curX + 0.04;

      // Update plasma shader time
      plasmaMat.uniforms.uTime.value = t;

      // Orb point light breathing
      orbLight.intensity = 3.0 + Math.sin(t * 3.14159) * 0.8;

      // Conduits idle data packet flow
      const curThemeProgress = themeStore.getState().progress;
      conduitsManager.updateTime(t, curThemeProgress);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const start = () => {
      if (!raf && visible && tabVisible) {
        clock.start();
        raf = requestAnimationFrame(animate);
      }
    };

    // IntersectionObserver to pause when hero is scrolled out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    const onVisibilityChange = () => {
      tabVisible = !document.hidden;
      if (tabVisible) start();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    // ─────────────────────────────────────────────────────────────────────────
    // 10. RESIZE HANDLER
    // ─────────────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      setRootPosition();
      updateConduits();
    };
    window.addEventListener("resize", onResize);
    onResize();

    // ─────────────────────────────────────────────────────────────────────────
    // 11. CLEANUP
    // ─────────────────────────────────────────────────────────────────────────
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", debouncedUpdateConduits);
      window.removeEventListener("scroll", debouncedUpdateConduits);
      window.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);

      slabGeo.dispose();
      slabMat.dispose();
      boreGeo.dispose();
      boreMat.dispose();
      plasmaGeo.dispose();
      plasmaMat.dispose();
      glassShellGeo.dispose();
      glassShellMat.dispose();
      cavityGeo.dispose();
      cavityMat.dispose();
      leverArmGeo.dispose();
      leverArmMat.dispose();
      gripGeo.dispose();
      gripMat.dispose();
      seamGeo.dispose();
      seamMat.dispose();

      conduitsManager.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [triggerMasterSwitch]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto select-none z-[1]">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="Quantum Power Breaker 3D Terminal — Click switch to power website"
        role="button"
        tabIndex={0}
      />

      {/* Floating HUD Tooltip */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-[#07090E]/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-xl text-xs font-mono text-ink/80 dark:text-slate-200">
        <span className="h-2 w-2 rounded-full bg-[#00e5ff] animate-ping" />
        <span>⚡ TOGGLE BREAKER TO POWER SITE</span>
      </div>
    </div>
  );
}
