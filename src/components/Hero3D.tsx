"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform float time;

void main() {
  vUv = uv;
  vPosition = position;
  vec3 pos = position;
  
  pos.z += sin(pos.x * 2.0 + time * 1.5) * 0.15;
  pos.y += cos(pos.z * 2.0 + time * 1.2) * 0.15;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform float time;
uniform vec2 mouse;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  vec3 color1 = vec3(0.117, 0.498, 0.909);
  vec3 color2 = vec3(0.070, 0.721, 0.650);
  vec3 color3 = vec3(0.435, 0.811, 0.243);
  vec3 color4 = vec3(0.960, 0.972, 0.984);
  
  float n1 = snoise(uv * 1.5 + time * 0.2 + mouse * 0.5);
  float n2 = snoise(uv * 2.0 - time * 0.3 - mouse * 0.3);
  
  vec3 finalColor = mix(color4, color1, smoothstep(-0.5, 0.8, n1));
  finalColor = mix(finalColor, color2, smoothstep(0.0, 1.0, n2));
  finalColor = mix(finalColor, color3, smoothstep(0.2, 1.2, n1 * n2));
  
  float alpha = smoothstep(0.0, 0.4, uv.y) * smoothstep(1.0, 0.6, uv.y);
  alpha *= smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x);
  
  gl_FragColor = vec4(finalColor, alpha * 0.85);
}
`;

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2.5, 2.5, 64, 64);
    
    const uniforms = {
      time: { value: 0.0 },
      mouse: { value: new THREE.Vector2(0, 0) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      wireframe: false,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    let mouseX = 0;
    let mouseY = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2.0;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2.0;
    };
    
    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      uniforms.time.value = clock.getElapsedTime();
      
      uniforms.mouse.value.x += (mouseX - uniforms.mouse.value.x) * 0.05;
      uniforms.mouse.value.y += (mouseY - uniforms.mouse.value.y) * 0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      
      const aspect = w / h;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
    };
    
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute right-0 top-0 w-full lg:w-3/4 h-full pointer-events-none opacity-80" 
      style={{ mixBlendMode: 'multiply' }}
      aria-hidden="true" 
    />
  );
}
