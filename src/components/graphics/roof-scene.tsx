"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { RoofPart } from "@/types";

type PartId = RoofPart["id"];

interface Props {
  activeId: PartId;
  onSelect: (id: PartId) => void;
  onFail?: () => void;
}

/* ----------------------------------------------------------------------------
   Geometry constants — a gable house on a plinth, 7:12 roof pitch
   ---------------------------------------------------------------------------- */
const LEN = 11; // roof length along x (includes gable overhang)
const HALF_RUN = 4; // horizontal run from ridge to eave
const EAVE_Y = 3.1;
const THETA = Math.atan(7 / 12);
const RIDGE_Y = EAVE_Y + HALF_RUN * Math.tan(THETA);
const SLOPE_LEN = HALF_RUN / Math.cos(THETA);

/** Each view: where the camera looks from (direction only), what it looks at,
 *  and the radius of the region that must stay fully in frame. The camera
 *  distance is derived from the radius and the canvas shape, so the model is
 *  never cut off on any screen. */
interface View {
  dir: [number, number, number];
  target: [number, number, number];
  radius: number;
  explode: number;
}
const FOCUS: Record<PartId, View> = {
  ridge: { dir: [6.5, 4.9, 12], target: [0, 4.6, 0], radius: 4.8, explode: 0 },
  panel: { dir: [10.6, 5.9, 12.8], target: [1.4, 3.7, 1.2], radius: 6.2, explode: 0.55 },
  deck: { dir: [10.3, 4.3, 10.9], target: [2.2, 3.1, 1.6], radius: 6, explode: 0.55 },
  eave: { dir: [-1.3, 2.2, 10.7], target: [-2.2, 2.6, 3.8], radius: 4.6, explode: 0 },
};
const HOME: View = { dir: [14.2, 8.1, 16], target: [0, 1.3, 0], radius: 8.2, explode: 0 };

interface Item {
  mesh: THREE.Mesh;
  kind: "layer" | "ridge" | "eave";
  part: PartId;
  base: THREE.Vector3;
  n: THREE.Vector3;
  idx: number;
  side: number;
}

function woodTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#c8a173";
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 90; i++) {
    g.strokeStyle = `rgba(110,72,36,${0.05 + Math.random() * 0.12})`;
    g.lineWidth = 0.6 + Math.random() * 1.4;
    const y = Math.random() * 256;
    g.beginPath();
    g.moveTo(0, y);
    g.bezierCurveTo(80, y + (Math.random() - 0.5) * 8, 170, y + (Math.random() - 0.5) * 8, 256, y);
    g.stroke();
  }
  g.strokeStyle = "rgba(60,40,20,0.35)";
  g.lineWidth = 1.5;
  g.strokeRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

export default function RoofScene({ activeId, onSelect, onFail }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<PartId>(activeId);
  const selectRef = useRef(onSelect);
  const engagedRef = useRef(false);
  const focusRequest = useRef(0);

  // Keep latest callbacks / selection without recreating the scene
  useEffect(() => {
    selectRef.current = onSelect;
  }, [onSelect]);
  useEffect(() => {
    if (activeRef.current !== activeId) {
      activeRef.current = activeId;
      engagedRef.current = true;
      focusRequest.current++;
    }
  }, [activeId]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      onFail?.();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.touchAction = "pan-y";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.9;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(...HOME.target);
    const fitDist = (r: number) => {
      const halfV = THREE.MathUtils.degToRad(camera.fov) / 2;
      const halfH = Math.atan(Math.tan(halfV) * camera.aspect);
      return (r / Math.sin(Math.min(halfV, halfH))) * 1.05;
    };
    const viewPos = (v: View, out: THREE.Vector3) =>
      out.set(...v.dir).normalize().multiplyScalar(fitDist(v.radius)).add(tmpT.set(...v.target));
    const tmpT = new THREE.Vector3();
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.enableZoom = false; // keep the mouse wheel for page scrolling
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.rotateSpeed = 0.7;
    /* camera is placed after the first resize, once the canvas shape is known */

    /* ---------------- lights ---------------- */
    const key = new THREE.DirectionalLight(0xfff2e0, 2.1);
    key.position.set(7, 13, 9);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    const sc = key.shadow.camera;
    sc.left = -10; sc.right = 10; sc.top = 10; sc.bottom = -10; sc.near = 1; sc.far = 40;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.03;
    key.shadow.radius = 4;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x86c5b2, 1.1);
    rim.position.set(-9, 5, -8);
    scene.add(rim);
    scene.add(new THREE.HemisphereLight(0xdfeaf0, 0x1a2830, 0.35));

    /* ---------------- materials ---------------- */
    const wood = woodTexture();
    const M = {
      metal: new THREE.MeshStandardMaterial({ color: 0x3b4d57, metalness: 0.92, roughness: 0.3 }),
      cap: new THREE.MeshStandardMaterial({ color: 0x566a73, metalness: 0.9, roughness: 0.28 }),
      deck: new THREE.MeshStandardMaterial({ map: wood, roughness: 0.82 }),
      rafter: new THREE.MeshStandardMaterial({ color: 0xb48b5c, roughness: 0.85 }),
      under: new THREE.MeshStandardMaterial({ color: 0x20272b, roughness: 0.95 }),
      ice: new THREE.MeshStandardMaterial({ color: 0x3f7a6b, roughness: 0.6, metalness: 0.1 }),
      wall: new THREE.MeshStandardMaterial({ color: 0xc9d1cf, roughness: 0.95 }),
      trim: new THREE.MeshStandardMaterial({ color: 0xdfe5e3, roughness: 0.7 }),
      gutter: new THREE.MeshStandardMaterial({ color: 0xc4cfcc, metalness: 0.9, roughness: 0.28 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x7f98a2, metalness: 0.2, roughness: 0.05, envMapIntensity: 1.6 }),
      door: new THREE.MeshStandardMaterial({ color: 0x2a3a42, roughness: 0.5 }),
      plinth: new THREE.MeshStandardMaterial({ color: 0x0f1a21, roughness: 0.92, envMapIntensity: 0.25 }),
    };
    const partMats: Record<PartId, THREE.MeshStandardMaterial[]> = {
      ridge: [M.cap],
      panel: [M.metal, M.ice],
      deck: [M.deck, M.rafter, M.under],
      eave: [M.gutter],
    };

    const root = new THREE.Group();
    scene.add(root);
    const items: Item[] = [];
    const pickables: THREE.Object3D[] = [];

    const track = (mesh: THREE.Mesh, it: Omit<Item, "mesh" | "base">) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      items.push({ ...it, mesh, base: mesh.position.clone() });
      mesh.userData.part = it.part;
      pickables.push(mesh);
    };

    /* ---------------- static house ---------------- */
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(8.6, 8.9, 0.3, 96), M.plinth);
    plinth.position.y = -0.15;
    plinth.receiveShadow = true;
    root.add(plinth);

    const walls = new THREE.Mesh(new THREE.BoxGeometry(10, EAVE_Y, 7), M.wall);
    walls.position.y = EAVE_Y / 2;
    walls.castShadow = walls.receiveShadow = true;
    root.add(walls);

    // gable ends (triangles tucked under the rafters)
    const tri = new THREE.Shape();
    tri.moveTo(-3.5, 0);
    tri.lineTo(3.5, 0);
    tri.lineTo(0, RIDGE_Y - EAVE_Y - 0.28);
    tri.closePath();
    for (const x of [-4.95, 4.95]) {
      const g = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, { depth: 0.1, bevelEnabled: false }), M.wall);
      g.rotation.y = Math.PI / 2;
      g.position.set(x + 0.05, EAVE_Y, 0);
      g.castShadow = g.receiveShadow = true;
      root.add(g);
    }

    // door, windows, trim on the front (+z) face
    const box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      m.castShadow = m.receiveShadow = true;
      root.add(m);
      return m;
    };
    box(1.3, 2.2, 0.08, M.door, 0, 1.1, 3.54);
    for (const x of [-3.2, 3.2]) {
      box(1.8, 1.5, 0.1, M.trim, x, 1.75, 3.53);
      box(1.62, 1.32, 0.12, M.glass, x, 1.75, 3.55);
      box(0.05, 1.32, 0.14, M.trim, x, 1.75, 3.56);
    }
    for (const x of [-2.4, 2.4]) {
      box(1.2, 1.1, 0.1, M.trim, x, 1.75, -3.53);
      box(1.04, 0.94, 0.12, M.glass, x, 1.75, -3.55);
    }

    /* ---------------- roof layers ---------------- */
    const slab = (
      side: 1 | -1,
      x0: number,
      x1: number,
      from: number,
      to: number,
      thick: number,
      off: number,
      mat: THREE.Material,
      part: PartId,
      idx: number
    ) => {
      const len = to - from;
      const w = x1 - x0;
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, thick, len), mat);
      const c = (from + to) / 2;
      const d = new THREE.Vector3(0, -Math.sin(THETA), side * Math.cos(THETA));
      const n = new THREE.Vector3(0, Math.cos(THETA), side * Math.sin(THETA));
      mesh.position.set((x0 + x1) / 2, RIDGE_Y, 0).addScaledVector(d, c).addScaledVector(n, off);
      mesh.rotation.x = side * THETA;
      root.add(mesh);
      track(mesh, { kind: "layer", part, n, idx, side });
    };

    // Each layer: [thickness, offset, material, part, index, fraction kept on the peeled half]
    type Layer = [number, number, THREE.Material, PartId, number, number];
    const layers: Layer[] = [
      [0.12, 0.06, M.deck, "deck", 1, 1],
      [0.02, 0.13, M.under, "deck", 2, 0.88],
      [0.03, 0.155, M.ice, "panel", 3, 0.72],
      [0.05, 0.195, M.metal, "panel", 4, 0.5],
    ];

    for (const side of [1, -1] as const) {
      // rafters
      for (let x = -4.8; x <= 4.81; x += 0.8) {
        slab(side, x - 0.06, x + 0.06, 0, SLOPE_LEN, 0.22, -0.11, M.rafter, "deck", 0);
      }
      for (const [thick, off, mat, part, idx, frac] of layers) {
        if (side === 1) {
          // front slope: left half complete, right half peeled back in stages
          slab(side, -LEN / 2, 0, 0, SLOPE_LEN, thick, off, mat, part, idx);
          slab(side, 0, LEN / 2, 0, SLOPE_LEN * frac, thick, off, mat, part, idx);
        } else {
          slab(side, -LEN / 2, LEN / 2, 0, SLOPE_LEN, thick, off, mat, part, idx);
        }
      }
      // standing-seam ribs
      for (let x = -5.2; x <= 5.21; x += 0.55) {
        const rightHalf = x > 0 && side === 1;
        slab(side, x - 0.03, x + 0.03, 0, rightHalf ? SLOPE_LEN * 0.5 : SLOPE_LEN, 0.07, 0.195 + 0.06, M.metal, "panel", 5);
      }
    }

    // ridge cap + vent baffle
    const capShape = new THREE.Shape();
    const tanT = Math.tan(THETA);
    capShape.moveTo(-0.85, 0.62 - 0.85 * tanT);
    capShape.lineTo(0, 0.62);
    capShape.lineTo(0.85, 0.62 - 0.85 * tanT);
    capShape.lineTo(0.85, 0.54 - 0.85 * tanT);
    capShape.lineTo(0, 0.54);
    capShape.lineTo(-0.85, 0.54 - 0.85 * tanT);
    capShape.closePath();
    const capGeo = new THREE.ExtrudeGeometry(capShape, { depth: LEN, bevelEnabled: false });
    capGeo.translate(0, 0, -LEN / 2);
    capGeo.rotateY(Math.PI / 2);
    const cap = new THREE.Mesh(capGeo, M.cap);
    cap.position.set(0, RIDGE_Y + 0.06, 0);
    root.add(cap);
    track(cap, { kind: "ridge", part: "ridge", n: new THREE.Vector3(0, 1, 0), idx: 0, side: 0 });

    const vent = new THREE.Mesh(new THREE.BoxGeometry(LEN - 0.3, 0.05, 0.5), M.under);
    vent.position.set(0, RIDGE_Y + 0.28, 0);
    root.add(vent);
    track(vent, { kind: "ridge", part: "ridge", n: new THREE.Vector3(0, 1, 0), idx: 0, side: 0 });

    // fascia, gutters, downspouts
    const gp = new THREE.Shape();
    gp.moveTo(0, 0);
    gp.lineTo(0, -0.26);
    gp.quadraticCurveTo(0, -0.34, 0.08, -0.34);
    gp.lineTo(0.3, -0.34);
    gp.quadraticCurveTo(0.38, -0.34, 0.38, -0.26);
    gp.lineTo(0.38, 0.06);
    gp.lineTo(0.35, 0.06);
    gp.lineTo(0.35, -0.25);
    gp.quadraticCurveTo(0.35, -0.31, 0.3, -0.31);
    gp.lineTo(0.08, -0.31);
    gp.quadraticCurveTo(0.03, -0.31, 0.03, -0.25);
    gp.lineTo(0.03, 0);
    gp.closePath();
    const gGeo = new THREE.ExtrudeGeometry(gp, { depth: LEN - 0.6, bevelEnabled: false });
    gGeo.translate(0, 0, -(LEN - 0.6) / 2);
    gGeo.rotateY(Math.PI / 2);

    for (const side of [1, -1] as const) {
      const fascia = new THREE.Mesh(new THREE.BoxGeometry(LEN, 0.42, 0.07), M.trim);
      fascia.position.set(0, EAVE_Y - 0.12, side * (HALF_RUN + 0.04));
      root.add(fascia);
      track(fascia, { kind: "eave", part: "eave", n: new THREE.Vector3(0, 0, side), idx: 0, side });

      const gutter = new THREE.Mesh(gGeo, M.gutter);
      gutter.scale.z = side; // mirrors across z for the back side
      gutter.position.set(0, EAVE_Y + 0.02, side * (HALF_RUN + 0.07));
      root.add(gutter);
      track(gutter, { kind: "eave", part: "eave", n: new THREE.Vector3(0, 0, side), idx: 0, side });
    }
    for (const [x, side] of [[-4.9, 1], [4.9, -1]] as const) {
      const ds = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, EAVE_Y - 0.4, 20), M.gutter);
      ds.position.set(x, (EAVE_Y - 0.4) / 2 + 0.05, side * (HALF_RUN + 0.3));
      root.add(ds);
      track(ds, { kind: "eave", part: "eave", n: new THREE.Vector3(0, 0, side), idx: 0, side });
    }

    /* ---------------- interaction ---------------- */
    const ray = new THREE.Raycaster();
    const ptr = new THREE.Vector2();
    let hover: PartId | null = null;
    let down: { x: number; y: number } | null = null;
    let idle = !reduce;
    let following = false;
    let lastFocus = 0;
    let userMoved = false;

    const pick = (e: PointerEvent): PartId | null => {
      const r = canvas.getBoundingClientRect();
      ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ptr, camera);
      const hit = ray.intersectObjects(pickables, false)[0];
      return hit ? (hit.object.userData.part as PartId) : null;
    };
    const onMove = (e: PointerEvent) => {
      if (down) return;
      hover = pick(e);
      canvas.style.cursor = hover ? "pointer" : "grab";
    };
    const onDown = (e: PointerEvent) => {
      down = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = "grabbing";
    };
    const onUp = (e: PointerEvent) => {
      if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 6) {
        const p = pick(e);
        if (p) selectRef.current(p);
      }
      down = null;
      canvas.style.cursor = hover ? "pointer" : "grab";
    };
    canvas.style.cursor = "grab";
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", () => (hover = null));
    controls.addEventListener("start", () => {
      idle = false;
      following = false;
      userMoved = true;
    });

    /* ---------------- sizing ---------------- */
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole house in frame on narrow viewports
      camera.fov = w / h < 1 ? 46 : 32;
      camera.updateProjectionMatrix();
      // until the visitor takes over, keep the whole house framed for this shape
      if (!engagedRef.current && !userMoved) {
        const dir = camera.position.lengthSq() > 0 ? camera.position.clone().sub(controls.target).normalize() : new THREE.Vector3(...HOME.dir).normalize();
        camera.position.copy(controls.target).addScaledVector(dir, fitDist(HOME.radius));
        controls.update();
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    /* ---------------- animation ---------------- */
    const state = { ex: reduce ? 0 : 1, rl: 0, eo: 0 };
    const hl: Record<PartId, number> = { ridge: 0, panel: 0, deck: 0, eave: 0 };
    const desired = new THREE.Vector3();
    const desiredT = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    let last = performance.now();
    let elapsed = 0;
    let visible = true;
    let raf = 0;
    const lam = reduce ? 1000 : 3.2;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.25);
      last = now;
      elapsed += dt;
      if (!visible || document.hidden) return;

      // selection changed → fly the camera to that part
      if (focusRequest.current !== lastFocus) {
        lastFocus = focusRequest.current;
        following = true;
        idle = false;
      }
      const engaged = engagedRef.current;
      const act = activeRef.current;
      const f = FOCUS[act];

      if (following) {
        const view = engaged ? f : HOME;
        viewPos(view, desired);
        desiredT.set(...view.target);
        camera.position.x = THREE.MathUtils.damp(camera.position.x, desired.x, lam, dt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, desired.y, lam, dt);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, desired.z, lam, dt);
        controls.target.x = THREE.MathUtils.damp(controls.target.x, desiredT.x, lam, dt);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, desiredT.y, lam, dt);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, desiredT.z, lam, dt);
      } else if (idle) {
        // slow showcase orbit until the visitor takes over
        tmp.copy(camera.position).sub(controls.target);
        const a = dt * 0.12;
        const cx = tmp.x * Math.cos(a) - tmp.z * Math.sin(a);
        const cz = tmp.x * Math.sin(a) + tmp.z * Math.cos(a);
        camera.position.set(controls.target.x + cx, camera.position.y, controls.target.z + cz);
      }

      // explode / lift / gutter targets
      const tEx = !engaged && !reduce && elapsed < 0.9 ? 1 : engaged ? f.explode : 0;
      state.ex = THREE.MathUtils.damp(state.ex, tEx, reduce ? 1000 : 2.4, dt);
      state.rl = THREE.MathUtils.damp(state.rl, engaged && act === "ridge" ? 1 : 0, reduce ? 1000 : 3, dt);
      state.eo = THREE.MathUtils.damp(state.eo, engaged && act === "eave" ? 1 : 0, reduce ? 1000 : 3, dt);

      for (const it of items) {
        const p = it.mesh.position.copy(it.base);
        if (it.kind === "layer") p.addScaledVector(it.n, state.ex * it.idx * 0.6);
        else if (it.kind === "ridge") p.y += state.rl * 0.85;
        else p.addScaledVector(it.n, state.eo * 0.6).y -= state.eo * 0.22;
      }

      // highlight the active (or hovered) part
      (Object.keys(partMats) as PartId[]).forEach((id) => {
        const on = (engaged && act === id) || hover === id;
        hl[id] = THREE.MathUtils.damp(hl[id], on ? 1 : 0, 8, dt);
        for (const m of partMats[id]) {
          m.emissive.set(0x2a7262);
          m.emissiveIntensity = hl[id] * 0.5;
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 });
    io.observe(host);
    frame();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      controls.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      Object.values(M).forEach((m) => m.dispose());
      wood.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, [onFail]);

  return <div ref={hostRef} className="h-full w-full" />;
}
