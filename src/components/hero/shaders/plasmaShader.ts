import * as THREE from "three";

/**
 * Suspended Glass Orb Internal Plasma Shader
 *
 * Features:
 * - 3D Simplex-style layered noise animating in spherical coordinates
 * - Vertex breathing displacement modulated by noise
 * - Emissive plasma filaments with dynamic temperature color shift
 * - ThemeProgress interpolation (Azure/Teal in dark mode ⟷ Lime/Warm gold in light mode)
 */

export const PlasmaVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uThemeProgress;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  // 3D Noise helpers
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    // Organic breathing displacement
    float pulse = sin(uTime * 1.8) * 0.5 + 0.5;
    float noise = snoise(position * 2.4 + vec3(0.0, uTime * 0.4, 0.0));
    float disp = noise * (0.04 + pulse * 0.02);
    vDisplacement = disp;

    vec3 newPos = position + normal * disp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

export const PlasmaFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uThemeProgress; // 0 = dark, 1 = light
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vec3(0.0, 0.0, 1.0)); // camera view vector approximation

    // Fresnel rim glow
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.2);

    // Dynamic color shifting palette
    // Dark mode: Azure (#1E7FE8) -> Deep Teal (#12B8A6) -> Neon Cyan (#00E5FF)
    vec3 darkCore = vec3(0.07, 0.72, 0.65); // Teal
    vec3 darkRim  = vec3(0.12, 0.50, 0.91); // Azure
    vec3 darkHot  = vec3(0.0, 0.90, 1.0);  // Cyan

    // Light mode: Warm gold (#F59E0B) -> Lime (#6FCF3E) -> Crisp solar white
    vec3 lightCore = vec3(0.43, 0.81, 0.24); // Lime
    vec3 lightRim  = vec3(0.96, 0.62, 0.07); // Warm amber
    vec3 lightHot  = vec3(1.0, 0.95, 0.85);  // White solar

    vec3 cCore = mix(darkCore, lightCore, uThemeProgress);
    vec3 cRim  = mix(darkRim,  lightRim,  uThemeProgress);
    vec3 cHot  = mix(darkHot,  lightHot,  uThemeProgress);

    // Layered plasma waves
    float wave1 = sin(vPosition.y * 8.0 + uTime * 2.5 + vDisplacement * 20.0) * 0.5 + 0.5;
    float wave2 = cos(vPosition.x * 6.0 - uTime * 1.8) * 0.5 + 0.5;
    float corePlasma = smoothstep(0.3, 0.9, wave1 * wave2);

    vec3 finalColor = mix(cCore, cRim, fresnel * 0.75 + wave1 * 0.25);
    finalColor += cHot * corePlasma * 0.65;
    finalColor += cRim * fresnel * 1.2;

    gl_FragColor = vec4(finalColor, 0.92);
  }
`;

export function createPlasmaOrbMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uThemeProgress: { value: 0 },
    },
    vertexShader: PlasmaVertexShader,
    fragmentShader: PlasmaFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}
