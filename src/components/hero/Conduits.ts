import * as THREE from "three";
import { createConduitMaterial } from "./shaders/conduitShader";

/**
 * Conduits Manager — DOM-to-3D Anchor Tracking
 *
 * Maps actual HTML elements in the DOM to 3D world coordinates via camera.unproject(),
 * routing organic CatmullRom curves from the monolithic breaker ports to each UI anchor.
 */

export interface ConduitRoute {
  id: string;
  selector: string;
  subIndex?: number; // if multiple elements match
  startOffset: THREE.Vector3; // port offset on monolithic slab
  baseColor: number;
  surgeColor: number;
  curve?: THREE.CatmullRomCurve3;
  mesh?: THREE.Mesh;
  material?: THREE.ShaderMaterial;
}

export class ConduitsManager {
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Group;
  private routes: ConduitRoute[];
  private terminalWorldPos: THREE.Vector3;

  constructor(camera: THREE.PerspectiveCamera, parentGroup: THREE.Group) {
    this.camera = camera;
    this.scene = new THREE.Group();
    parentGroup.add(this.scene);
    this.terminalWorldPos = new THREE.Vector3(0, 0, 0);

    this.routes = [
      {
        id: "nav-logo",
        selector: '[data-anchor="nav-logo"]',
        startOffset: new THREE.Vector3(-0.35, -1.8, 0.1),
        baseColor: 0x00e5ff, // Cyan
        surgeColor: 0xffffff,
      },
      {
        id: "headline-top",
        selector: '[data-anchor="headline-word"]',
        subIndex: 0, // "Ideas,"
        startOffset: new THREE.Vector3(-0.6, -1.5, 0.15),
        baseColor: 0x1e7fe8, // Azure
        surgeColor: 0x38bdf8,
      },
      {
        id: "headline-bot",
        selector: '[data-anchor="headline-word"]',
        subIndex: 3, // "growth."
        startOffset: new THREE.Vector3(-0.45, -1.6, 0.12),
        baseColor: 0x12b8a6, // Teal
        surgeColor: 0x6ee7b7,
      },
      {
        id: "cta-btn",
        selector: '[data-anchor="cta-btn"]',
        startOffset: new THREE.Vector3(-0.2, -1.9, 0.1),
        baseColor: 0x6fcf3e, // Lime
        surgeColor: 0xffffff,
      },
      {
        id: "stats-metric",
        selector: '[data-anchor="stats"]',
        startOffset: new THREE.Vector3(0.2, -1.9, 0.08),
        baseColor: 0x1e7fe8, // Azure
        surgeColor: 0x00e5ff,
      },
    ];

    this.initConduits();
  }

  public setTerminalPosition(pos: THREE.Vector3) {
    this.terminalWorldPos.copy(pos);
  }

  private initConduits() {
    this.routes.forEach((route) => {
      const mat = createConduitMaterial(route.baseColor, route.surgeColor);
      route.material = mat;
    });
  }

  /**
   * Projects a 2D DOM element's screen center into 3D world space at targetZ
   */
  public projectDOMToWorld(el: Element, targetZ: number = 0.0): THREE.Vector3 | null {
    if (typeof window === "undefined") return null;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const screenX = rect.left + rect.width / 2;
    const screenY = rect.top + rect.height / 2;

    const ndcX = (screenX / window.innerWidth) * 2 - 1;
    const ndcY = -(screenY / window.innerHeight) * 2 + 1;

    const rayPoint = new THREE.Vector3(ndcX, ndcY, 0.5);
    rayPoint.unproject(this.camera);

    const dir = rayPoint.sub(this.camera.position).normalize();
    if (Math.abs(dir.z) < 0.0001) return null;

    const distance = (targetZ - this.camera.position.z) / dir.z;
    return this.camera.position.clone().add(dir.multiplyScalar(distance));
  }

  /**
   * Recalculates CatmullRom curves and regenerates tube geometries
   * Called on mount and debounced resize/scroll
   */
  public updateAnchorGeometry() {
    if (typeof document === "undefined") return;

    this.routes.forEach((route) => {
      let targetEl: Element | null = null;
      if (route.subIndex !== undefined) {
        const els = document.querySelectorAll(route.selector);
        targetEl = els[route.subIndex] || null;
      } else {
        targetEl = document.querySelector(route.selector);
      }

      const startPt = this.terminalWorldPos.clone().add(route.startOffset);
      let endPt: THREE.Vector3 | null = null;

      if (targetEl) {
        endPt = this.projectDOMToWorld(targetEl, 0.0);
      }

      // Fallback world positions if DOM element not yet rendered
      if (!endPt) {
        if (route.id === "nav-logo") endPt = new THREE.Vector3(-4.5, 3.2, 0.0);
        else if (route.id === "headline-top") endPt = new THREE.Vector3(-3.8, 1.2, 0.0);
        else if (route.id === "headline-bot") endPt = new THREE.Vector3(-3.6, -0.2, 0.0);
        else if (route.id === "cta-btn") endPt = new THREE.Vector3(-4.0, -1.8, 0.0);
        else endPt = new THREE.Vector3(-3.0, -2.4, 0.0);
      }

      // Generate organic smooth curve with mid-flight control points
      const mid1 = new THREE.Vector3(
        startPt.x + (endPt.x - startPt.x) * 0.25,
        startPt.y - 0.45,
        (startPt.z + endPt.z) * 0.5 + 0.35
      );
      const mid2 = new THREE.Vector3(
        startPt.x + (endPt.x - startPt.x) * 0.65,
        endPt.y + 0.3,
        (startPt.z + endPt.z) * 0.5 + 0.2
      );

      const curve = new THREE.CatmullRomCurve3([startPt, mid1, mid2, endPt], false, "centripetal", 0.5);
      route.curve = curve;

      // Dispose old geometry if exists
      if (route.mesh) {
        route.mesh.geometry.dispose();
        route.mesh.geometry = new THREE.TubeGeometry(curve, 54, 0.034, 10, false);
      } else {
        const tubeGeo = new THREE.TubeGeometry(curve, 54, 0.034, 10, false);
        const mesh = new THREE.Mesh(tubeGeo, route.material);
        this.scene.add(mesh);
        route.mesh = mesh;
      }
    });
  }

  public updateTime(time: number, themeProgress: number) {
    this.routes.forEach((r) => {
      if (r.material) {
        r.material.uniforms.uTime.value = time;
        r.material.uniforms.uThemeProgress.value = themeProgress;
      }
    });
  }

  public getRoutes() {
    return this.routes;
  }

  public dispose() {
    this.routes.forEach((r) => {
      if (r.mesh) {
        r.mesh.geometry.dispose();
        this.scene.remove(r.mesh);
      }
      if (r.material) {
        r.material.dispose();
      }
    });
    if (this.scene.parent) {
      this.scene.parent.remove(this.scene);
    }
  }
}
