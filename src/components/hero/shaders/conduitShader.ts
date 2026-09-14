import * as THREE from "three";

/**
 * High-Tech Conduit Tube Emissive Shader
 *
 * Features:
 * - Idle state: subtle dashed/dotted emissive pattern moving along the tube length (data packets)
 * - Switch state: leading-edge photonic energy pulse controlled by uProgress (0 -> 1)
 * - Intense bloom head at the wave front with realistic exponential falloff
 * - Color modulation tied to NATLE palette (Azure #1E7FE8, Teal #12B8A6, Lime #6FCF3E)
 */

export const ConduitVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const ConduitFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;      // 0.0 to 1.0 (surge wave position along tube)
  uniform float uPulseActive;   // 0.0 to 1.0 (surge intensity)
  uniform float uThemeProgress; // 0 = dark, 1 = light
  uniform vec3 uBaseColor;
  uniform vec3 uSurgeColor;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    float lengthCoord = vUv.x; // 0 at terminal base, 1 at DOM anchor

    // 1. Idle state: Subtle moving dashed data-packets
    float idleSpeed = uTime * 0.45;
    float dash = sin((lengthCoord * 32.0 - idleSpeed * 8.0) * 3.14159) * 0.5 + 0.5;
    float idlePacket = pow(dash, 6.0) * 0.45;

    // Base conduit sheath
    vec3 baseCol = mix(uBaseColor * 0.25, uBaseColor * 0.65, idlePacket);

    // 2. High-energy surge pulse wave
    // Pulse center sits at uProgress
    float distToPulse = abs(lengthCoord - uProgress);
    
    // Asymmetrical tail: bright head, trailing light decay
    float pulseHead = smoothstep(0.08, 0.0, distToPulse);
    float pulseTail = 0.0;
    if (lengthCoord < uProgress) {
      pulseTail = exp(-(uProgress - lengthCoord) * 14.0) * 0.75;
    }
    float pulseShape = (pulseHead * 1.5 + pulseTail) * uPulseActive;

    // Intense photonic white core at the head
    vec3 surgeCore = vec3(1.0, 1.0, 1.0);
    vec3 surgeGlow = uSurgeColor;
    vec3 pulseCol = mix(surgeGlow, surgeCore, smoothstep(0.03, 0.0, distToPulse) * uPulseActive);

    // Combine idle and surge
    vec3 finalColor = baseCol + pulseCol * pulseShape * 2.8;

    // Edge rim glow
    vec3 V = normalize(cameraPosition - vWorldPos);
    float rim = pow(1.0 - max(dot(vNormal, V), 0.0), 2.5) * 0.5;
    finalColor += uBaseColor * rim;

    float alpha = 0.65 + pulseShape * 0.35 + idlePacket * 0.2;

    gl_FragColor = vec4(finalColor, min(alpha, 1.0));
  }
`;

export function createConduitMaterial(baseColorHex: number, surgeColorHex: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uPulseActive: { value: 0 },
      uThemeProgress: { value: 0 },
      uBaseColor: { value: new THREE.Color(baseColorHex) },
      uSurgeColor: { value: new THREE.Color(surgeColorHex) },
    },
    vertexShader: ConduitVertexShader,
    fragmentShader: ConduitFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}
