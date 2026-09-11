"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * NATLE Hero 3D — Living Quantum Orb / Neural Nexus
 *
 * A mesmerizing, organically-morphing energy sphere with:
 * - Custom GLSL vertex shader that drives sinusoidal surface displacement (morphing organic feel)
 * - Iridescent MeshPhysical outer glass shell with chromatic dispersion
 * - Inner plasma core with pulsing volumetric glow
 * - 4 luminous holographic gimbal rings with satellite data packets
 * - 2,000 galaxy starfield particles (branded Azure/Teal/Lime/Violet palette)
 * - Dynamic orbiting multi-color point lights
 * - Cursor parallax + drag-inertia interaction
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

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark() ? 1.25 : 1.0;
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 120);
    camera.position.set(0, 0, 9.0);

    // ── Root Group (responsive positioning) ──────────────────────────────────
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const setRootPos = () => {
      const desktop = width >= 1024;
      rootGroup.position.set(desktop ? 1.9 : 0, desktop ? 0.1 : 0.3, 0);
      const s = desktop ? 1 : Math.min(1, width / 768);
      rootGroup.scale.setScalar(s);
    };
    setRootPos();

    // =========================================================================
    // 1.  VERTEX-SHADER MORPHING ORB — the hero object
    //     High-poly sphere with custom GLSL that undulates the surface using
    //     overlapping sine waves — produces an organic, living, alien-blob feel.
    // =========================================================================
    const orbGeo = new THREE.SphereGeometry(1.38, 128, 128);

    // We'll store original positions so the shader can displace from rest
    const orbVerts = orbGeo.getAttribute("position") as THREE.BufferAttribute;
    const originalPos = new Float32Array(orbVerts.array);
    orbGeo.setAttribute(
      "originalPosition",
      new THREE.BufferAttribute(originalPos, 3)
    );

    const orbMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:          { value: 0 },
        uMorphAmplitude:{ value: isDark() ? 0.18 : 0.13 },
        uEnvStrength:   { value: isDark() ? 1.0 : 0.7 },
        uBrightness:    { value: isDark() ? 1.0 : 0.82 },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uMorphAmplitude;

        attribute vec3 originalPosition;

        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying float vDisplace;

        float wave(vec3 p, float f, float speed) {
          return sin(p.x * f + uTime * speed)
               * sin(p.y * f * 0.87 + uTime * speed * 1.13)
               * sin(p.z * f * 1.3  + uTime * speed * 0.77);
        }

        void main() {
          vec3 p = originalPosition;

          float d = wave(p, 2.0, 0.6)  * 1.0
                  + wave(p, 4.1, 0.45) * 0.55
                  + wave(p, 7.3, 0.35) * 0.28
                  + wave(p, 12.7,0.25) * 0.14;

          d *= uMorphAmplitude;
          vDisplace = d;

          vec3 displaced = p + normalize(p) * d;
          vNormal = normalMatrix * normalize(p);
          vWorldPos = (modelMatrix * vec4(displaced, 1.0)).xyz;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uEnvStrength;
        uniform float uBrightness;
        uniform float uTime;

        varying vec3  vNormal;
        varying vec3  vWorldPos;
        varying float vDisplace;

        // ── NATLE brand palette (Azure, Teal, Lime, Violet, Cyan, Magenta) ──
        vec3 palette(float t) {
          // Smooth cyclic blend through 6 brand hues
          vec3 azure   = vec3(0.118, 0.498, 0.910); // #1E7FE8
          vec3 teal    = vec3(0.071, 0.722, 0.651); // #12B8A6
          vec3 lime    = vec3(0.435, 0.812, 0.243); // #6FCF3E
          vec3 violet  = vec3(0.545, 0.361, 0.965); // #8B5CF6
          vec3 cyan    = vec3(0.000, 0.824, 1.000); // #00D2FF
          vec3 magenta = vec3(0.910, 0.475, 0.980); // #E879F9

          // 6-stop smooth cycle  (t goes 0..1 -> loops)
          float f  = fract(t) * 6.0;
          int   i  = int(f);
          float s  = fract(f);

          if      (i == 0) return mix(azure,   teal,    s);
          else if (i == 1) return mix(teal,    lime,    s);
          else if (i == 2) return mix(lime,    violet,  s);
          else if (i == 3) return mix(violet,  cyan,    s);
          else if (i == 4) return mix(cyan,    magenta, s);
          else             return mix(magenta, azure,   s);
        }

        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(cameraPosition - vWorldPos);

          // Fresnel rim
          float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.2);

          // Global hue shift (slow cycle across the whole orb)
          float globalShift = uTime * 0.065;

          // Surface hue: varies with displacement + vertical position + time
          float surfaceT = vDisplace * 4.5 + vWorldPos.y * 0.28 + globalShift;
          vec3 col = palette(surfaceT);

          // Rim colour slightly offset hue for iridescence
          vec3 rimCol = palette(surfaceT + 0.25);

          // Specular hotspot
          vec3 L = normalize(vec3(3.0, 5.0, 6.0));
          float spec = pow(max(dot(reflect(-L, N), V), 0.0), 52.0) * uEnvStrength;

          // Combine: base colour + fresnel rim blend + specular
          vec3 final = mix(col * 0.88, rimCol, fresnel * 0.68);
          final += vec3(1.0) * spec * 0.9;
          final += col * 0.25; // self-illumination

          // Displacement glow peaks
          float glow = smoothstep(0.04, 0.20, vDisplace) * 0.55;
          final += palette(surfaceT + 0.5) * glow;

          gl_FragColor = vec4(final * uBrightness, 0.90);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
    });

    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    rootGroup.add(orbMesh);

    // ── 1b. Glass outer shell (thin, refractive, barely visible) ─────────────
    const glassGeo = new THREE.SphereGeometry(1.52, 64, 64);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDark() ? 0x0a1628 : 0xffffff),
      transmission: 0.92,
      thickness: 1.1,
      ior: 1.35,
      roughness: 0.03,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.85,
      transparent: true,
      opacity: isDark() ? 0.55 : 0.35,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    rootGroup.add(glassMesh);

    // ── 1c. Inner plasma core ─────────────────────────────────────────────────
    const coreGeo = new THREE.SphereGeometry(0.72, 48, 48);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1e7fe8),
      emissive: new THREE.Color(isDark() ? 0x1e7fe8 : 0x12b8a6),
      emissiveIntensity: isDark() ? 3.2 : 2.0,
      roughness: 0.0,
      metalness: 1.0,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // =========================================================================
    // 2.  HOLOGRAPHIC GIMBAL RINGS — clean atomic orbital model
    //     3 rings, each tilted 60° from the next = perfect gyroscope geometry.
    //     Thicker tubes, stronger glow, no visual chaos.
    // =========================================================================
    const makeRing = (
      radius: number,
      tube: number,
      colorHex: number,
      emissHex: number,
      emissI: number,
      rotX: number,
      rotZ: number
    ) => {
      const geo = new THREE.TorusGeometry(radius, tube, 24, 200);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        emissive: new THREE.Color(emissHex),
        emissiveIntensity: isDark() ? emissI : emissI * 0.45,
        roughness: 0.05,
        metalness: 0.9,
        transparent: true,
        opacity: isDark() ? 0.95 : 0.72,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(rotX, 0, rotZ);
      rootGroup.add(mesh);

      // Satellite data packet (glowing orb on the ring)
      const satG = new THREE.SphereGeometry(0.09, 16, 16);
      const satM = new THREE.MeshStandardMaterial({
        color: new THREE.Color(emissHex),
        emissive: new THREE.Color(emissHex),
        emissiveIntensity: isDark() ? 4.0 : 2.5,
        roughness: 0.0,
        metalness: 1.0,
      });
      const sat = new THREE.Mesh(satG, satM);
      mesh.add(sat);

      return { mesh, mat, sat, radius, geo, satG, satM };
    };

    // Ring 1 — Azure equatorial (flat, no tilt) — most visible anchor ring
    const ring1 = makeRing(2.45, 0.022, 0x1e7fe8, 0x00d2ff, 1.3, 0,              0);
    // Ring 2 — Teal-Lime — tilted 60° on X
    const ring2 = makeRing(2.45, 0.018, 0x12b8a6, 0x5effd8, 1.15, Math.PI / 3,   0);
    // Ring 3 — Violet-Purple — tilted 120° on X (= -60° the other way)
    const ring3 = makeRing(2.45, 0.015, 0x8b5cf6, 0xe879f9, 1.0, -Math.PI / 3,  0);

    // =========================================================================
    // 3.  STARFIELD — 2,000 galaxy + 42 left-side subtle stars
    // =========================================================================
    const CORE_N  = 2000;
    const LEFT_N  = 42;
    const TOTAL   = CORE_N + LEFT_N;

    const sfGeo  = new THREE.BufferGeometry();
    const sfPos  = new Float32Array(TOTAL * 3);
    const sfCol  = new Float32Array(TOTAL * 3);
    const sfSize = new Float32Array(TOTAL);

    const pal = [
      new THREE.Color(0x1e7fe8),
      new THREE.Color(0x00d2ff),
      new THREE.Color(0x12b8a6),
      new THREE.Color(0x6fcf3e),
      new THREE.Color(0xa855f7),
      new THREE.Color(0xf0abfc),
      new THREE.Color(0xffffff),
    ];

    const cx = rootGroup.position.x;

    for (let i = 0; i < CORE_N; i++) {
      const r = 2.4 + Math.random() * 6.0;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      sfPos[i * 3]     = cx + r * Math.sin(ph) * Math.cos(th);
      sfPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      sfPos[i * 3 + 2] = r * Math.cos(ph);
      const c = pal[Math.floor(Math.random() * pal.length)];
      sfCol[i * 3] = c.r; sfCol[i * 3 + 1] = c.g; sfCol[i * 3 + 2] = c.b;
      sfSize[i] = 0.055 + Math.random() * 0.07;
    }

    for (let i = CORE_N; i < TOTAL; i++) {
      sfPos[i * 3]     = -6.5 + Math.random() * 5.8;
      sfPos[i * 3 + 1] = -3.5 + Math.random() * 7.0;
      sfPos[i * 3 + 2] = -3.0 + Math.random() * 4.5;
      const c = pal[Math.floor(Math.random() * pal.length)];
      sfCol[i * 3] = c.r; sfCol[i * 3 + 1] = c.g; sfCol[i * 3 + 2] = c.b;
      sfSize[i] = 0.04 + Math.random() * 0.045;
    }

    sfGeo.setAttribute("position", new THREE.BufferAttribute(sfPos, 3));
    sfGeo.setAttribute("color",    new THREE.BufferAttribute(sfCol, 3));
    sfGeo.setAttribute("size",     new THREE.BufferAttribute(sfSize, 1));

    // Soft glow sprite texture
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteCanvas.height = 64;
    const sCtx = spriteCanvas.getContext("2d")!;
    const sg = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sg.addColorStop(0,    "rgba(255,255,255,1)");
    sg.addColorStop(0.3,  "rgba(255,255,255,0.8)");
    sg.addColorStop(0.65, "rgba(255,255,255,0.15)");
    sg.addColorStop(1,    "rgba(255,255,255,0)");
    sCtx.fillStyle = sg;
    sCtx.fillRect(0, 0, 64, 64);
    const spriteTex = new THREE.CanvasTexture(spriteCanvas);

    const sfMat = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      vertexColors: true,
      map: spriteTex,
      transparent: true,
      opacity: isDark() ? 0.82 : 0.48,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(sfGeo, sfMat);
    scene.add(stars);

    // =========================================================================
    // 4.  LIGHTING — theatrical multi-light setup
    // =========================================================================
    const ambient = new THREE.AmbientLight(
      isDark() ? 0x080c18 : 0xf0f4fc,
      isDark() ? 1.8 : 3.0
    );
    scene.add(ambient);

    const lA = new THREE.PointLight(0x1e7fe8, isDark() ? 5.5 : 3.5, 18); scene.add(lA);
    const lB = new THREE.PointLight(0x00d2ff, isDark() ? 4.5 : 3.0, 18); scene.add(lB);
    const lC = new THREE.PointLight(0x12b8a6, isDark() ? 3.8 : 2.5, 14); scene.add(lC);
    const lD = new THREE.PointLight(0xa855f7, isDark() ? 3.0 : 1.8, 12); scene.add(lD);

    const dir = new THREE.DirectionalLight(0xffffff, isDark() ? 2.0 : 2.6);
    dir.position.set(5, 6, 7);
    scene.add(dir);

    // =========================================================================
    // 5.  INTERACTION — drag inertia + parallax
    // =========================================================================
    let tarX = 0, tarY = 0, curX = 0, curY = 0;
    let dragging = false, prevMX = 0, prevMY = 0, velX = 0, velY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      prevMX = e.clientX; prevMY = e.clientY;
      velX = velY = 0;
    };
    const onUp = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - prevMX, dy = e.clientY - prevMY;
        prevMX = e.clientX; prevMY = e.clientY;
        tarY += dx * 0.005; tarX += dy * 0.005;
        velX = dx * 0.005; velY = dy * 0.005;
      } else {
        const hw = window.innerWidth / 2, hh = window.innerHeight / 2;
        tarY = ((e.clientX - hw) / hw) * 0.3;
        tarX = ((e.clientY - hh) / hh) * 0.3;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    // =========================================================================
    // 6.  THEME SYNC
    // =========================================================================
    const syncTheme = () => {
      const d = isDark();
      renderer.toneMappingExposure = d ? 1.25 : 1.0;

      orbMat.uniforms.uMorphAmplitude.value = d ? 0.18 : 0.13;
      orbMat.uniforms.uEnvStrength.value    = d ? 1.0  : 0.7;
      orbMat.uniforms.uBrightness.value     = d ? 1.0  : 0.82;

      glassMat.color.setHex(d ? 0x0a1628 : 0xffffff);
      glassMat.opacity = d ? 0.55 : 0.35;

      coreMat.emissive.setHex(d ? 0x1e7fe8 : 0x12b8a6);
      coreMat.emissiveIntensity = d ? 3.2 : 2.0;

      for (const [r, dI, lI] of [
        [ring1, 1.3, 0.58] as const,
        [ring2, 1.15, 0.52] as const,
        [ring3, 1.0, 0.45] as const,
      ]) {
        r.mat.emissiveIntensity = d ? dI : lI;
      }

      sfMat.opacity = d ? 0.82 : 0.48;
      sfMat.blending = d ? THREE.AdditiveBlending : THREE.NormalBlending;
      sfMat.needsUpdate = true;

      ambient.color.setHex(d ? 0x080c18 : 0xf0f4fc);
      ambient.intensity = d ? 1.8 : 3.0;
      lA.intensity = d ? 5.5 : 3.5;
      lB.intensity = d ? 4.5 : 3.0;
      lC.intensity = d ? 3.8 : 2.5;
      lD.intensity = d ? 3.0 : 1.8;
      dir.intensity = d ? 2.0 : 2.6;
    };

    const themeObs = new MutationObserver(syncTheme);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // =========================================================================
    // 7.  ANIMATION LOOP
    // =========================================================================
    const clock = new THREE.Clock();
    let raf = 0, visible = true, tabVisible = !document.hidden;

    const animate = () => {
      if (!visible || !tabVisible) { raf = 0; return; }
      const t = clock.getElapsedTime();

      // Shader time
      orbMat.uniforms.uTime.value = t;

      // Drag inertia
      if (!dragging) { tarX += velY; tarY += velX; velX *= 0.93; velY *= 0.93; }
      curX += (tarX - curX) * 0.055;
      curY += (tarY - curY) * 0.055;

      // Root group — slow auto-spin + user control
      rootGroup.rotation.x = curX + Math.sin(t * 0.42) * 0.045;
      rootGroup.rotation.y = curY + t * 0.10;

      // ── JS-side brand colour cycler (matches GLSL palette) ─────────────────
      // 6-stop palette matching the shader
      const pal6 = [0x1e7fe8, 0x12b8a6, 0x6fcf3e, 0x8b5cf6, 0x00d2ff, 0xe879f9];
      const colAt = (phase: number) => {
        const f = ((phase % 1) + 1) % 1; // ensure 0..1
        const fi = f * 6;
        const i = Math.floor(fi) % 6;
        const j = (i + 1) % 6;
        const s = fi - Math.floor(fi);
        const ca = new THREE.Color(pal6[i]);
        const cb = new THREE.Color(pal6[j]);
        return ca.lerp(cb, s);
      };
      const globalPhase = t * 0.065;

      // Orb mesh subtle breathing scale
      const breathS = 1.0 + Math.sin(t * 1.9) * 0.025;
      orbMesh.scale.setScalar(breathS);

      // Glass shell slight counter-rotate for dispersion illusion
      glassMesh.rotation.y = t * -0.04;
      glassMesh.rotation.z = t * 0.028;

      // Inner plasma core — colour-cycle + pulse
      const cp = 1.0 + Math.sin(t * 2.8) * 0.12;
      coreMesh.scale.setScalar(cp);
      const coreCol = colAt(globalPhase + 0.1);
      coreMat.emissive.copy(coreCol);
      coreMat.color.copy(coreCol);
      coreMat.emissiveIntensity = (isDark() ? 3.2 : 2.0) * (0.85 + Math.sin(t * 2.8) * 0.15);

      // Ring 1 — spins on Y; colour-cycles with offset
      ring1.mesh.rotation.y = t * 0.42;
      ring1.sat.position.x = Math.cos(t * 2.1) * ring1.radius;
      ring1.sat.position.y = Math.sin(t * 2.1) * ring1.radius;
      const r1col = colAt(globalPhase + 0.0);
      ring1.mat.emissive.copy(r1col);
      ring1.mat.color.copy(r1col);
      ring1.satM.emissive.copy(r1col);
      ring1.satM.color.copy(r1col);

      // Ring 2 — Teal 60° tilt: spins on its own Y axis
      ring2.mesh.rotation.y = -t * 0.31;
      ring2.sat.position.x = Math.cos(-t * 1.7) * ring2.radius;
      ring2.sat.position.z = Math.sin(-t * 1.7) * ring2.radius;
      const r2col = colAt(globalPhase + 0.33);
      ring2.mat.emissive.copy(r2col);
      ring2.mat.color.copy(r2col);
      ring2.satM.emissive.copy(r2col);
      ring2.satM.color.copy(r2col);

      // Ring 3 — Violet -60° tilt: spins the other way
      ring3.mesh.rotation.y = t * 0.24;
      ring3.sat.position.y = Math.cos(t * 1.4) * ring3.radius;
      ring3.sat.position.z = Math.sin(t * 1.4) * ring3.radius;
      const r3col = colAt(globalPhase + 0.67);
      ring3.mat.emissive.copy(r3col);
      ring3.mat.color.copy(r3col);
      ring3.satM.emissive.copy(r3col);
      ring3.satM.color.copy(r3col);

      // Starfield subtle drift
      stars.rotation.y = -t * 0.012;
      stars.rotation.z =  Math.sin(t * 0.06) * 0.015;

      // Orbiting dynamic lights
      const mx = rootGroup.position.x;
      lA.position.set(mx + Math.sin(t * 1.15) * 4.5, Math.sin(t * 0.82) * 2.4, Math.cos(t * 1.15) * 4.5);
      lB.position.set(mx + Math.cos(-t * 0.9) * 5.0, Math.sin(-t * 1.1)  * 3.8, Math.sin(t * 0.72) * 3.4);
      lC.position.set(mx + Math.sin(t * 0.65) * 3.8, -Math.cos(t * 0.85) * 3.5, Math.cos(t * 1.1)  * 4.4);
      lD.position.set(mx + Math.cos(t * 0.5)  * 5.5,  Math.sin(t * 0.6)  * 4.2, -Math.sin(t * 0.9) * 3.8);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const start = () => {
      if (!raf && visible && tabVisible) { clock.start(); raf = requestAnimationFrame(animate); }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start(); else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0.05 });
    io.observe(mount);

    const onVis = () => {
      tabVisible = !document.hidden;
      if (tabVisible) start(); else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    document.addEventListener("visibilitychange", onVis);
    start();

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth; height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      setRootPos();
    };
    window.addEventListener("resize", onResize);
    onResize();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);

      [orbGeo, glassGeo, coreGeo,
       ring1.geo, ring1.satG,
       ring2.geo, ring2.satG,
       ring3.geo, ring3.satG,
       sfGeo
      ].forEach(g => g.dispose());

      [orbMat, glassMat, coreMat,
       ring1.mat, ring1.satM,
       ring2.mat, ring2.satM,
       ring3.mat, ring3.satM,
       sfMat
      ].forEach(m => m.dispose());

      spriteTex.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing select-none z-[1]"
      aria-label="Interactive 3D Living Quantum Orb — drag to rotate"
      role="region"
    />
  );
}
