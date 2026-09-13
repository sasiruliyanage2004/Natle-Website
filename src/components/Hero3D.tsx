"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * NATLE Hero 3D — Photorealistic Living Earth & Cosmic Network
 *
 * Features:
 * - High-resolution photorealistic Earth surface with day diffuse, night city lights,
 *   normal bump mapping, and ocean specular reflections.
 * - Dynamic color wave synthesis: glowing aurora waves in NATLE brand colors (Azure,
 *   Teal, Lime, Violet) sweep across the globe, revealing the Earth from radiant energy.
 * - Independent drifting atmospheric cloud layer.
 * - Ethereal Rayleigh scattering atmospheric glow halo.
 * - Orbiting textured Moon in the upper-right cosmic quadrant (matching reference photo).
 * - Global cybernetic network arcs connecting tech hubs (SF, London, Tokyo, Singapore,
 *   Colombo, Sydney, Frankfurt, Dubai) with moving data pulses and ground beacons.
 * - 2,000 deep space galaxy stars + 42 delicate left-side balance stars.
 * - Full drag-to-rotate with inertia + mouse parallax.
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
    renderer.toneMappingExposure = isDark() ? 1.25 : 1.1;
    mount.appendChild(renderer.domElement);

    // ── 2. Scene & Camera ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    // ── 3. Root Placement ──────────────────────────────────────────────────────
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const setRootPos = () => {
      const desktop = width >= 1024;
      rootGroup.position.set(desktop ? 2.1 : 0, desktop ? 0.05 : 0.25, 0);
      const s = desktop ? 1.0 : Math.min(1.0, width / 768);
      rootGroup.scale.setScalar(s);
    };
    setRootPos();

    // Earth axial tilt group (23.4 degrees)
    const earthTiltGroup = new THREE.Group();
    earthTiltGroup.rotation.z = -23.4 * (Math.PI / 180);
    rootGroup.add(earthTiltGroup);

    // Earth spin group (rotates around tilted axis)
    const earthSpinGroup = new THREE.Group();
    earthTiltGroup.add(earthSpinGroup);

    // ── 4. Texture Loader ──────────────────────────────────────────────────────
    const textureLoader = new THREE.TextureLoader();

    const dayTexture = textureLoader.load("/textures/earth/earth_atmos_2048.jpg");
    dayTexture.colorSpace = THREE.SRGBColorSpace;

    const nightTexture = textureLoader.load("/textures/earth/earth_lights_2048.png");
    nightTexture.colorSpace = THREE.SRGBColorSpace;

    const normalTexture = textureLoader.load("/textures/earth/earth_normal_2048.jpg");
    const specTexture = textureLoader.load("/textures/earth/earth_specular_2048.jpg");

    const cloudsTexture = textureLoader.load("/textures/earth/earth_clouds_1024.png");
    cloudsTexture.colorSpace = THREE.SRGBColorSpace;

    const moonTexture = textureLoader.load("/textures/earth/moon_1024.jpg");
    moonTexture.colorSpace = THREE.SRGBColorSpace;

    // ── 5. Photorealistic Earth Surface with Color Synthesis Shader ───────────
    const EARTH_RADIUS = 1.88;
    const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64);

    const sunDirection = new THREE.Vector3(4.5, 2.5, 5.0).normalize();

    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: dayTexture },
        uNightMap: { value: nightTexture },
        uNormalMap: { value: normalTexture },
        uSpecularMap: { value: specTexture },
        uSunDirection: { value: sunDirection },
        uTime: { value: 0 },
        uDarkMode: { value: isDark() ? 1.0 : 0.0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uDayMap;
        uniform sampler2D uNightMap;
        uniform sampler2D uNormalMap;
        uniform sampler2D uSpecularMap;
        uniform vec3 uSunDirection;
        uniform float uTime;
        uniform float uDarkMode;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        // Smooth 6-hue brand palette
        vec3 brandPalette(float t) {
          vec3 c0 = vec3(0.118, 0.498, 0.910); // Azure #1E7FE8
          vec3 c1 = vec3(0.071, 0.722, 0.651); // Teal #12B8A6
          vec3 c2 = vec3(0.435, 0.812, 0.243); // Lime #6FCF3E
          vec3 c3 = vec3(0.545, 0.361, 0.965); // Violet #8B5CF6
          vec3 c4 = vec3(0.000, 0.824, 1.000); // Cyan #00D2FF
          vec3 c5 = vec3(0.910, 0.475, 0.980); // Magenta #E879F9

          float f = fract(t) * 6.0;
          int i = int(f);
          float s = fract(f);
          if (i == 0) return mix(c0, c1, s);
          if (i == 1) return mix(c1, c2, s);
          if (i == 2) return mix(c2, c3, s);
          if (i == 3) return mix(c3, c4, s);
          if (i == 4) return mix(c4, c5, s);
          return mix(c5, c0, s);
        }

        void main() {
          vec3 N = normalize(vNormal);
          vec3 L = normalize(uSunDirection);
          vec3 V = normalize(cameraPosition - vWorldPosition);

          // Normal map perturbation
          vec3 nMap = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
          vec3 bumpN = normalize(N + vec3(nMap.x, nMap.y, 0.0) * 0.25);

          float sunDot = dot(bumpN, L);
          float dayMix = smoothstep(-0.15, 0.25, sunDot);

          vec4 dayColor = texture2D(uDayMap, vUv);
          vec4 nightColor = texture2D(uNightMap, vUv);
          vec4 specColor = texture2D(uSpecularMap, vUv);

          // Ocean specular highlight from sun
          vec3 H = normalize(L + V);
          float specAmount = pow(max(dot(bumpN, H), 0.0), 32.0) * specColor.r;
          vec3 specularGlint = vec3(1.0, 0.95, 0.85) * specAmount * 1.6 * max(sunDot, 0.0);

          // Daylight rendering with rich natural ocean & vegetation contrast
          vec3 dayLit = dayColor.rgb * (max(sunDot, 0.0) * 0.95 + 0.22) + specularGlint;

          // Night side with golden city lights
          float nightFactor = 1.0 - dayMix;
          vec3 cityLights = nightColor.rgb * vec3(2.2, 1.6, 0.9) * 2.8 * nightFactor;
          vec3 nightLit = dayColor.rgb * 0.04 + cityLights;

          vec3 baseEarth = mix(nightLit, dayLit, dayMix);

          // Atmospheric Fresnel limb on Earth curve
          float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.2);
          vec3 atmosCyan = vec3(0.12, 0.65, 1.0);
          baseEarth += atmosCyan * fresnel * 0.65 * max(sunDot + 0.35, 0.12);

          // ── Dynamic Color Wave Synthesis ────────────────────────────────────
          // A radiant chromatic aurora wave sweeps across continents & oceans
          // synthesizing the Earth from glowing brand colors
          float waveTime = uTime * 0.15;
          float waveLong = sin(vUv.x * 6.28318 * 2.0 - waveTime * 2.5) * 0.5 + 0.5;
          float waveLat  = sin(vUv.y * 3.14159 * 3.0 + waveTime * 1.5) * 0.5 + 0.5;
          float wavePulse = waveLong * waveLat;

          float palPhase = uTime * 0.06 + vUv.x * 0.4 + vUv.y * 0.2;
          vec3 waveColor = brandPalette(palPhase);

          // Cybernetic meridian/equator lines subtly visible during color wave
          float grid = step(0.975, fract(vUv.x * 36.0)) * 0.3 + step(0.975, fract(vUv.y * 18.0)) * 0.3;

          // Smooth pulse envelope (breathes periodically)
          float pulseBreath = sin(uTime * 0.9) * 0.5 + 0.5;
          vec3 colorSynthesis = waveColor * (wavePulse * 0.4 + grid) * (0.25 + 0.35 * pulseBreath);

          baseEarth += colorSynthesis;

          gl_FragColor = vec4(baseEarth, 1.0);
        }
      `,
    });

    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthSpinGroup.add(earthMesh);

    // ── 6. Cloud Layer ─────────────────────────────────────────────────────────
    const cloudsGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.012, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: isDark() ? 0.75 : 0.65,
      blending: THREE.NormalBlending,
      depthWrite: false,
      roughness: 0.9,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    earthSpinGroup.add(cloudsMesh);

    // ── 7. Atmospheric Halo (Rayleigh Scattering Glow) ─────────────────────────
    const atmosGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.12, 48, 48);
    const atmosMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x00d2ff) },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(cameraPosition - vWorldPosition);
          float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);
          vec3 glow = mix(vec3(0.08, 0.45, 0.95), uColor, rim * 0.85);
          gl_FragColor = vec4(glow, rim * 0.72);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    rootGroup.add(atmosMesh);

    // ── 8. Global Cybernetic Data Arcs (replacing old circular rings) ──────────
    const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // Major global technology hubs
    const CITIES = [
      { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
      { name: "New York", lat: 40.7128, lng: -74.006 },
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
      { name: "Dubai", lat: 25.2048, lng: 55.2708 },
      { name: "Colombo", lat: 6.9271, lng: 79.8612 },
      { name: "Singapore", lat: 1.3521, lng: 103.8198 },
      { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
      { name: "Sydney", lat: -33.8688, lng: 151.2093 },
    ];

    // Data connections between cities
    const CONNECTIONS = [
      [0, 1], // SF -> NY
      [1, 2], // NY -> London
      [2, 3], // London -> Frankfurt
      [3, 4], // Frankfurt -> Dubai
      [4, 5], // Dubai -> Colombo
      [5, 6], // Colombo -> Singapore
      [6, 7], // Singapore -> Tokyo
      [7, 8], // Tokyo -> Sydney
      [0, 7], // SF -> Tokyo (trans-pacific)
      [2, 5], // London -> Colombo
    ];

    const arcGeometries: THREE.BufferGeometry[] = [];
    const arcMaterials: THREE.Material[] = [];
    const packetMeshes: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; speed: number; offset: number }[] = [];

    const networkGroup = new THREE.Group();
    earthSpinGroup.add(networkGroup);

    // City ground beacons
    const beaconGeo = new THREE.RingGeometry(0.015, 0.045, 16);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    arcGeometries.push(beaconGeo);
    arcMaterials.push(beaconMat);

    CITIES.forEach((city) => {
      const pos = latLngToVector3(city.lat, city.lng, EARTH_RADIUS * 1.002);
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      beacon.lookAt(pos.clone().multiplyScalar(2));
      networkGroup.add(beacon);
    });

    // Color palette for arcs
    const arcColors = [0x1e7fe8, 0x12b8a6, 0x00d2ff, 0x6fcf3e, 0x8b5cf6];

    CONNECTIONS.forEach(([fromIdx, toIdx], i) => {
      const p1 = latLngToVector3(CITIES[fromIdx].lat, CITIES[fromIdx].lng, EARTH_RADIUS);
      const p2 = latLngToVector3(CITIES[toIdx].lat, CITIES[toIdx].lng, EARTH_RADIUS);

      const distance = p1.distanceTo(p2);
      const altitude = Math.min(0.7, distance * 0.35);

      const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(EARTH_RADIUS + altitude);
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);

      const curvePoints = curve.getPoints(40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const colorHex = arcColors[i % arcColors.length];

      const arcMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: isDark() ? 0.75 : 0.55,
        linewidth: 1,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      networkGroup.add(arcLine);

      arcGeometries.push(arcGeo);
      arcMaterials.push(arcMat);

      // Glowing data packet travelling along arc
      const packetGeo = new THREE.SphereGeometry(0.032, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      networkGroup.add(packetMesh);

      arcGeometries.push(packetGeo);
      arcMaterials.push(packetMat);

      packetMeshes.push({
        mesh: packetMesh,
        curve,
        speed: 0.25 + (i % 3) * 0.1,
        offset: (i * 0.17) % 1.0,
      });
    });

    // ── 9. Orbiting Moon (matching reference image) ───────────────────────────
    const MOON_RADIUS = 0.38;
    const moonGeo = new THREE.SphereGeometry(MOON_RADIUS, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.9,
      metalness: 0.05,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);

    // Position Moon in upper right quadrant like in reference photo
    const moonOrbitGroup = new THREE.Group();
    moonOrbitGroup.rotation.x = 0.35;
    moonOrbitGroup.rotation.z = 0.25;
    rootGroup.add(moonOrbitGroup);

    const MOON_DISTANCE = 4.7;
    moonMesh.position.set(MOON_DISTANCE * 0.72, MOON_DISTANCE * 0.58, -MOON_DISTANCE * 0.35);
    moonOrbitGroup.add(moonMesh);

    // ── 10. Deep Space Galaxy Starfield ───────────────────────────────────────
    const CORE_STARS = 2000;
    const LEFT_STARS = 42;
    const TOTAL_STARS = CORE_STARS + LEFT_STARS;

    const sfGeo = new THREE.BufferGeometry();
    const sfPos = new Float32Array(TOTAL_STARS * 3);
    const sfCol = new Float32Array(TOTAL_STARS * 3);
    const sfSize = new Float32Array(TOTAL_STARS);

    const starPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x99ccff),
      new THREE.Color(0x00d2ff),
      new THREE.Color(0x12b8a6),
      new THREE.Color(0xffd166),
      new THREE.Color(0xd8b4fe),
    ];

    const cx = rootGroup.position.x;

    for (let i = 0; i < CORE_STARS; i++) {
      const r = 2.8 + Math.random() * 6.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      sfPos[i * 3] = cx + r * Math.sin(ph) * Math.cos(th);
      sfPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      sfPos[i * 3 + 2] = r * Math.cos(ph);

      const c = starPalette[Math.floor(Math.random() * starPalette.length)];
      sfCol[i * 3] = c.r;
      sfCol[i * 3 + 1] = c.g;
      sfCol[i * 3 + 2] = c.b;
      sfSize[i] = 0.045 + Math.random() * 0.06;
    }

    for (let i = CORE_STARS; i < TOTAL_STARS; i++) {
      sfPos[i * 3] = -6.5 + Math.random() * 5.8;
      sfPos[i * 3 + 1] = -3.5 + Math.random() * 7.0;
      sfPos[i * 3 + 2] = -3.0 + Math.random() * 4.5;

      const c = starPalette[Math.floor(Math.random() * starPalette.length)];
      sfCol[i * 3] = c.r;
      sfCol[i * 3 + 1] = c.g;
      sfCol[i * 3 + 2] = c.b;
      sfSize[i] = 0.035 + Math.random() * 0.04;
    }

    sfGeo.setAttribute("position", new THREE.BufferAttribute(sfPos, 3));
    sfGeo.setAttribute("color", new THREE.BufferAttribute(sfCol, 3));
    sfGeo.setAttribute("size", new THREE.BufferAttribute(sfSize, 1));

    // Circular soft glow texture
    const starCanvas = document.createElement("canvas");
    starCanvas.width = starCanvas.height = 64;
    const sCtx = starCanvas.getContext("2d")!;
    const sg = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sg.addColorStop(0, "rgba(255,255,255,1)");
    sg.addColorStop(0.3, "rgba(255,255,255,0.85)");
    sg.addColorStop(0.65, "rgba(255,255,255,0.2)");
    sg.addColorStop(1, "rgba(255,255,255,0)");
    sCtx.fillStyle = sg;
    sCtx.fillRect(0, 0, 64, 64);
    const starTex = new THREE.CanvasTexture(starCanvas);

    const sfMat = new THREE.PointsMaterial({
      size: 0.09,
      sizeAttenuation: true,
      vertexColors: true,
      map: starTex,
      transparent: true,
      opacity: isDark() ? 0.85 : 0.45,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const starfield = new THREE.Points(sfGeo, sfMat);
    scene.add(starfield);

    // ── 11. Lighting ───────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(
      isDark() ? 0x141828 : 0xf0f5ff,
      isDark() ? 1.4 : 2.6
    );
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, isDark() ? 3.0 : 3.4);
    sunLight.position.copy(sunDirection.clone().multiplyScalar(10));
    scene.add(sunLight);

    // Subtle rim fill light for realistic space depth
    const rimLight = new THREE.DirectionalLight(0x00d2ff, isDark() ? 1.2 : 0.8);
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    // ── 12. Interaction (Drag-to-rotate with inertia + mouse parallax) ─────────
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
        tarY = ((e.clientX - hw) / hw) * 0.25;
        tarX = ((e.clientY - hh) / hh) * 0.25;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    // ── 13. Theme Sync ─────────────────────────────────────────────────────────
    const syncTheme = () => {
      const d = isDark();
      renderer.toneMappingExposure = d ? 1.25 : 1.1;

      earthMat.uniforms.uDarkMode.value = d ? 1.0 : 0.0;
      cloudsMat.opacity = d ? 0.75 : 0.65;

      sfMat.opacity = d ? 0.85 : 0.45;
      sfMat.blending = d ? THREE.AdditiveBlending : THREE.NormalBlending;
      sfMat.needsUpdate = true;

      ambientLight.color.setHex(d ? 0x141828 : 0xf0f5ff);
      ambientLight.intensity = d ? 1.4 : 2.6;
      sunLight.intensity = d ? 3.0 : 3.4;
      rimLight.intensity = d ? 1.2 : 0.8;
    };

    const themeObs = new MutationObserver(syncTheme);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ── 14. Animation Loop ─────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0, visible = true, tabVisible = !document.hidden;

    const animate = () => {
      if (!visible || !tabVisible) {
        raf = 0;
        return;
      }
      const t = clock.getElapsedTime();

      // Shader time for color wave synthesis
      earthMat.uniforms.uTime.value = t;
      atmosMat.uniforms.uTime.value = t;

      // Inertia & parallax
      if (!dragging) {
        tarX += velY;
        tarY += velX;
        velX *= 0.94;
        velY *= 0.94;
      }
      curX += (tarX - curX) * 0.05;
      curY += (tarY - curY) * 0.05;

      // User drag control on root
      rootGroup.rotation.x = curX;
      rootGroup.rotation.y = curY;

      // Earth spins naturally on its tilted axis
      earthSpinGroup.rotation.y = t * 0.05;

      // Cloud layer drifts independently slightly faster
      cloudsMesh.rotation.y = t * 0.065;

      // Moon slow orbit around Earth
      moonOrbitGroup.rotation.y = t * 0.025;
      moonMesh.rotation.y = t * 0.04;

      // Animate global data packets along network arcs
      packetMeshes.forEach((p) => {
        const progress = ((t * p.speed + p.offset) % 1.0 + 1.0) % 1.0;
        const pos = p.curve.getPoint(progress);
        p.mesh.position.copy(pos);
      });

      // Starfield subtle slow drift
      starfield.rotation.y = -t * 0.008;

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

    // ── 15. Resize ─────────────────────────────────────────────────────────────
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

    // ── 16. Cleanup ────────────────────────────────────────────────────────────
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);

      [earthGeo, cloudsGeo, atmosGeo, moonGeo, sfGeo, ...arcGeometries].forEach((g) => g.dispose());
      [earthMat, cloudsMat, atmosMat, moonMat, sfMat, ...arcMaterials].forEach((m) => m.dispose());

      [dayTexture, nightTexture, normalTexture, specTexture, cloudsTexture, moonTexture, starTex].forEach((t) =>
        t.dispose()
      );

      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing select-none z-[1]"
      aria-label="Interactive 3D Living Earth & Cosmic Network — drag to rotate"
      role="region"
    />
  );
}
