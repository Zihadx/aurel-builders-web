"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { cn } from "@/lib/utils";
import type { AfterKind, BeforeKind } from "@/types";


interface Props {
  before: BeforeKind;
  after: AfterKind;
  beforeLabel: string;
  afterLabel: string;
  label: string;
}

const LEN = 11;
const HALF_RUN = 4;
const EAVE_Y = 3.1;
const THETA = Math.atan(7 / 12);
const RIDGE_Y = EAVE_Y + HALF_RUN * Math.tan(THETA);
const SLOPE_LEN = HALF_RUN / Math.cos(THETA);

/* ------------------------------ procedural textures ------------------------------ */
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

function canvasTex(size: number, draw: (g: CanvasRenderingContext2D) => void, repeat: [number, number]) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  draw(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(...repeat);
  t.anisotropy = 8;
  return t;
}

function shingleTex(kind: BeforeKind) {
  const base = { worn: "#6c665c", hail: "#62676a", dated: "#7a7064" }[kind];
  return canvasTex(
    512,
    (g) => {
      g.fillStyle = base;
      g.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 6000; i++) {
        g.fillStyle = `rgba(${Math.random() > 0.5 ? "255,255,255" : "0,0,0"},${rnd(0.02, 0.1)})`;
        g.fillRect(rnd(0, 512), rnd(0, 512), rnd(1, 3), rnd(1, 3));
      }
      for (let row = 0; row < 16; row++) {
        const y = row * 32;
        g.fillStyle = "rgba(0,0,0,0.38)";
        g.fillRect(0, y, 512, 2.5);
        const off = row % 2 ? 32 : 0;
        for (let x = off; x < 512; x += 64) g.fillRect(x, y + 14, 2, 18);
        if (kind !== "hail" && Math.random() > 0.55) {
          g.fillStyle = "rgba(20,16,10,0.22)";
          g.fillRect(rnd(0, 440), y + 2, rnd(30, 90), 28);
        }
      }
      if (kind === "worn") {
        for (let i = 0; i < 9; i++) {
          g.strokeStyle = `rgba(78,98,58,${rnd(0.25, 0.45)})`;
          g.lineWidth = rnd(5, 14);
          const x = rnd(0, 512);
          g.beginPath();
          g.moveTo(x, rnd(0, 120));
          g.lineTo(x + rnd(-20, 20), rnd(260, 512));
          g.stroke();
        }
      }
      if (kind === "hail") {
        for (let i = 0; i < 90; i++) {
          const x = rnd(0, 512);
          const y = rnd(0, 512);
          const r = rnd(4, 11);
          const grd = g.createRadialGradient(x, y, 0, x, y, r);
          grd.addColorStop(0, "rgba(10,12,14,0.75)");
          grd.addColorStop(0.7, "rgba(10,12,14,0.35)");
          grd.addColorStop(1, "rgba(200,205,208,0.25)");
          g.fillStyle = grd;
          g.beginPath();
          g.arc(x, y, r, 0, Math.PI * 2);
          g.fill();
        }
      }
      if (kind === "dated") {
        g.fillStyle = "rgba(255,240,210,0.07)";
        g.fillRect(0, 0, 512, 512);
      }
    },
    [4.6, 1.95]
  );
}

function slateTex() {
  return canvasTex(
    512,
    (g) => {
      g.fillStyle = "#34424b";
      g.fillRect(0, 0, 512, 512);
      for (let row = 0; row < 16; row++) {
        const off = row % 2 ? 32 : 0;
        for (let x = -64 + off; x < 576; x += 64) {
          const l = rnd(-9, 9);
          g.fillStyle = `rgb(${52 + l},${66 + l},${77 + l})`;
          g.fillRect(x + 1.5, row * 32 + 1.5, 61, 29);
          g.fillStyle = "rgba(255,255,255,0.09)";
          g.fillRect(x + 1.5, row * 32 + 1.5, 61, 2);
          g.fillStyle = "rgba(0,0,0,0.3)";
          g.fillRect(x + 1.5, row * 32 + 28, 61, 2.5);
        }
      }
    },
    [4.6, 1.95]
  );
}

function seamTex() {
  return canvasTex(
    512,
    (g) => {
      g.fillStyle = "#2b3841";
      g.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 4; i++) {
        const x = i * 128;
        const grd = g.createLinearGradient(x, 0, x + 128, 0);
        grd.addColorStop(0, "rgba(255,255,255,0.1)");
        grd.addColorStop(0.5, "rgba(255,255,255,0)");
        grd.addColorStop(1, "rgba(0,0,0,0.12)");
        g.fillStyle = grd;
        g.fillRect(x, 0, 128, 512);
        g.fillStyle = "rgba(0,0,0,0.75)";
        g.fillRect(x, 0, 4, 512);
        g.fillStyle = "rgba(255,255,255,0.22)";
        g.fillRect(x + 5, 0, 2, 512);
      }
    },
    [4.6, 1]
  );
}

function wallTex(kind: "plain" | "batten" | "aged") {
  return canvasTex(
    512,
    (g) => {
      g.fillStyle = kind === "aged" ? "#bdb5a7" : kind === "batten" ? "#e6ebe9" : "#cdd4d2";
      g.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 3000; i++) {
        g.fillStyle = `rgba(0,0,0,${rnd(0.01, 0.05)})`;
        g.fillRect(rnd(0, 512), rnd(0, 512), 2, 2);
      }
      if (kind === "batten") {
        for (let x = 0; x < 512; x += 51.2) {
          g.fillStyle = "rgba(0,0,0,0.22)";
          g.fillRect(x, 0, 3, 512);
          g.fillStyle = "rgba(255,255,255,0.5)";
          g.fillRect(x + 3, 0, 1.5, 512);
        }
      }
      if (kind === "aged") {
        for (let i = 0; i < 14; i++) {
          g.fillStyle = "rgba(90,70,45,0.16)";
          g.fillRect(rnd(0, 512), 0, rnd(6, 16), rnd(80, 300));
        }
      }
    },
    [1, 1]
  );
}

/* ------------------------------ looks ------------------------------ */
interface Look {
  roof: THREE.Material;
  cap: THREE.Material;
  fascia: THREE.Material;
  gutter: THREE.Material;
  wall: THREE.Material;
  flash: THREE.Material;
  tarp: boolean;
}

export default function RoofCompare({ before, after, beforeLabel, afterLabel, label }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0.5);
  const [pos, setPos] = useState(0.5);
  const [failed, setFailed] = useState(false);
  const dragging = useRef(false);

  const setBoth = useCallback((v: number) => {
    const c = Math.max(0.04, Math.min(0.96, v));
    posRef.current = c;
    setPos(c);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      queueMicrotask(() => setFailed(true));
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.cssText = "display:block;width:100%;height:100%";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.85;
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    const key = new THREE.DirectionalLight(0xfff2e0, 2.1);
    key.position.set(7, 13, 9);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 40 });
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.03;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x86c5b2, 1);
    rim.position.set(-9, 5, -8);
    scene.add(rim);
    scene.add(new THREE.HemisphereLight(0xdfeaf0, 0x1a2830, 0.35));

    /* ---------- materials & looks ---------- */
    const disposables: Array<{ dispose: () => void }> = [];
    const mat = <T extends THREE.Material>(m: T) => (disposables.push(m), m);

    const beforeTex = shingleTex(before);
    const afterTex = after === "slate" ? slateTex() : seamTex();
    const wallPlain = wallTex("plain");
    const wallAged = wallTex("aged");
    const wallBatten = wallTex("batten");
    disposables.push(beforeTex, afterTex, wallPlain, wallAged, wallBatten);

    const beforeLook: Look = {
      roof: mat(new THREE.MeshStandardMaterial({ map: beforeTex, roughness: 0.96 })),
      cap: mat(new THREE.MeshStandardMaterial({ color: 0x4a443c, roughness: 0.95 })),
      fascia: mat(new THREE.MeshStandardMaterial({ color: before === "dated" ? 0x6b5a45 : 0xb9bfbb, roughness: 0.9 })),
      gutter: mat(new THREE.MeshStandardMaterial({ color: 0x868a86, metalness: 0.4, roughness: 0.75 })),
      wall: mat(new THREE.MeshStandardMaterial({ map: before === "dated" ? wallAged : wallPlain, roughness: 0.95 })),
      flash: mat(new THREE.MeshStandardMaterial({ color: 0x5b4d40, roughness: 0.9 })),
      tarp: before === "hail",
    };
    const afterLook: Look = {
      roof: mat(
        after === "slate"
          ? new THREE.MeshStandardMaterial({ map: afterTex, roughness: 0.55, metalness: 0.12 })
          : new THREE.MeshStandardMaterial({ map: afterTex, roughness: 0.34, metalness: 0.85 })
      ),
      cap: mat(new THREE.MeshStandardMaterial({ color: 0x566a73, metalness: 0.9, roughness: 0.28 })),
      fascia: mat(new THREE.MeshStandardMaterial({ color: 0xe6ebe9, roughness: 0.65 })),
      gutter: mat(new THREE.MeshStandardMaterial({ color: 0xc9d3d0, metalness: 0.92, roughness: 0.26 })),
      wall: mat(new THREE.MeshStandardMaterial({ map: after === "clad" ? wallBatten : wallPlain, roughness: 0.9 })),
      flash: mat(new THREE.MeshStandardMaterial({ color: 0x86c5b2, metalness: 0.9, roughness: 0.3 })),
      tarp: false,
    };

    /* ---------- house ---------- */
    const roles: Record<keyof Omit<Look, "tarp">, THREE.Mesh[]> = { roof: [], cap: [], fascia: [], gutter: [], wall: [], flash: [] };
    const root = new THREE.Group();
    scene.add(root);
    const add = (m: THREE.Mesh, role?: keyof typeof roles) => {
      m.castShadow = m.receiveShadow = true;
      root.add(m);
      if (role) roles[role].push(m);
      return m;
    };
    const fixed = (c: number, r = 0.6, mt = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: mt });
    const glass = fixed(0x7f98a2, 0.05, 0.2);
    const trim = fixed(0xdfe5e3, 0.7);
    const door = fixed(0x2a3a42, 0.5);
    const brick = fixed(0x8a6a58, 0.95);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0x0f1a21, roughness: 0.92, envMapIntensity: 0.25 });
    disposables.push(glass, trim, door, brick, plinthMat);

    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(8.6, 8.9, 0.3, 96), plinthMat);
    plinth.position.y = -0.15;
    plinth.receiveShadow = true;
    root.add(plinth);

    const box = (w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number, role?: keyof typeof roles) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      mesh.position.set(x, y, z);
      return add(mesh, role);
    };
    box(10, EAVE_Y, 7, beforeLook.wall, 0, EAVE_Y / 2, 0, "wall");

    const tri = new THREE.Shape();
    tri.moveTo(-3.5, 0);
    tri.lineTo(3.5, 0);
    tri.lineTo(0, RIDGE_Y - EAVE_Y - 0.28);
    tri.closePath();
    for (const x of [-4.95, 4.95]) {
      const g = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, { depth: 0.1, bevelEnabled: false }), beforeLook.wall);
      g.rotation.y = Math.PI / 2;
      g.position.set(x + 0.05, EAVE_Y, 0);
      add(g, "wall");
    }
    box(1.3, 2.2, 0.08, door, 0, 1.1, 3.54);
    for (const x of [-3.2, 3.2]) {
      box(1.8, 1.5, 0.1, trim, x, 1.75, 3.53);
      box(1.62, 1.32, 0.12, glass, x, 1.75, 3.55);
      box(0.05, 1.32, 0.14, trim, x, 1.75, 3.56);
    }

    // chimney with flashing
    box(0.9, 2.4, 0.9, brick, 2.6, RIDGE_Y - 0.4, -0.9);
    box(1.15, 0.12, 1.15, beforeLook.flash, 2.6, RIDGE_Y - 1.0 - 0.12, -0.9, "flash");

    // roof slabs
    const slab = (side: 1 | -1) => {
      const d = new THREE.Vector3(0, -Math.sin(THETA), side * Math.cos(THETA));
      const n = new THREE.Vector3(0, Math.cos(THETA), side * Math.sin(THETA));
      const m = new THREE.Mesh(new THREE.BoxGeometry(LEN, 0.2, SLOPE_LEN), beforeLook.roof);
      m.position.set(0, RIDGE_Y, 0).addScaledVector(d, SLOPE_LEN / 2).addScaledVector(n, 0.1);
      m.rotation.x = side * THETA;
      add(m, "roof");
      return { d, n };
    };
    const front = slab(1);
    slab(-1);

    // tarp (hail "before" only)
    const tarp = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.04, 2.1), fixed(0x4d6e7c, 0.9));
    tarp.position.set(1.2, RIDGE_Y, 0).addScaledVector(front.d, 2.3).addScaledVector(front.n, 0.24);
    tarp.rotation.x = THETA;
    tarp.rotation.z = 0.05;
    tarp.castShadow = true;
    root.add(tarp);
    disposables.push(tarp.material as THREE.Material);

    // ridge cap
    const tanT = Math.tan(THETA);
    const cs = new THREE.Shape();
    cs.moveTo(-0.85, 0.5 - 0.85 * tanT);
    cs.lineTo(0, 0.5);
    cs.lineTo(0.85, 0.5 - 0.85 * tanT);
    cs.lineTo(0.85, 0.4 - 0.85 * tanT);
    cs.lineTo(0, 0.4);
    cs.lineTo(-0.85, 0.4 - 0.85 * tanT);
    cs.closePath();
    const capGeo = new THREE.ExtrudeGeometry(cs, { depth: LEN, bevelEnabled: false });
    capGeo.translate(0, 0, -LEN / 2);
    capGeo.rotateY(Math.PI / 2);
    const cap = new THREE.Mesh(capGeo, beforeLook.cap);
    cap.position.set(0, RIDGE_Y + 0.02, 0);
    add(cap, "cap");

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
      box(LEN, 0.42, 0.07, beforeLook.fascia, 0, EAVE_Y - 0.12, side * (HALF_RUN + 0.04), "fascia");
      const g = new THREE.Mesh(gGeo, beforeLook.gutter);
      g.scale.z = side;
      g.position.set(0, EAVE_Y + 0.02, side * (HALF_RUN + 0.07));
      add(g, "gutter");
    }
    for (const [x, side] of [[-4.9, 1], [4.9, -1]] as const) {
      const ds = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, EAVE_Y - 0.4, 20), beforeLook.gutter);
      ds.position.set(x, (EAVE_Y - 0.4) / 2 + 0.05, side * (HALF_RUN + 0.3));
      add(ds, "gutter");
    }

    const apply = (look: Look) => {
      (Object.keys(roles) as Array<keyof typeof roles>).forEach((k) => roles[k].forEach((m) => (m.material = look[k])));
      tarp.visible = look.tarp;
    };

    /* ---------- sizing ---------- */
    let w = 1;
    let h = 1;
    const resize = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 1.2 ? 40 : 30;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    /* ---------- loop: render the same frame twice, split by scissor ---------- */
    let visible = true;
    let raf = 0;
    let t = 0;
    let last = performance.now();
    const look = new THREE.Vector3(0, 1.5, 0);
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.25);
      last = now;
      if (!visible || document.hidden) return;
      if (!reduce) t += dt;

      const az = Math.sin(t * 0.28) * 0.3 + 0.62;
      const dist = 25;
      camera.position.set(Math.sin(az) * dist, 10.6, Math.cos(az) * dist);
      camera.lookAt(look);

      const x = Math.round(posRef.current * w);
      renderer.setScissorTest(true);
      renderer.setViewport(0, 0, w, h);
      renderer.setScissor(0, 0, x, h);
      apply(beforeLook);
      renderer.render(scene, camera);
      renderer.setScissor(x, 0, Math.max(w - x, 0), h);
      apply(afterLook);
      renderer.render(scene, camera);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 });
    io.observe(host);
    frame();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      disposables.forEach((d) => d.dispose());
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, [before, after]);

  const onPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setBoth((e.clientX - r.left) / r.width);
  };

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-orientation="horizontal"
      aria-valuemin={4}
      aria-valuemax={96}
      aria-valuenow={Math.round(pos * 100)}
      aria-valuetext={`${Math.round(pos * 100)}% ${beforeLabel}, ${100 - Math.round(pos * 100)}% ${afterLabel}`}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        onPointer(e);
      }}
      onPointerMove={(e) => dragging.current && onPointer(e)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 0.15 : 0.05;
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") setBoth(posRef.current - step);
        else if (e.key === "ArrowRight" || e.key === "ArrowUp") setBoth(posRef.current + step);
        else if (e.key === "Home") setBoth(0.04);
        else if (e.key === "End") setBoth(0.96);
        else return;
        e.preventDefault();
      }}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden border border-rule-deep bg-deeper sm:aspect-[16/10]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_55%,rgb(42_114_98/0.28),transparent)]"
      />
      <div ref={hostRef} className="absolute inset-0" />
      {failed && (
        <p className="absolute inset-0 grid place-items-center px-6 text-center text-mist t-meta">
          The 3D preview needs WebGL, which isn’t available in this browser.
        </p>
      )}

      <span className="t-meta pointer-events-none absolute left-3 top-3 bg-deep/90 px-2.5 py-1 text-chalk">
        Before<span className="hidden sm:inline"> · {beforeLabel}</span>
      </span>
      <span className="t-meta pointer-events-none absolute right-3 top-3 bg-patina px-2.5 py-1 text-chalk">
        After<span className="hidden sm:inline"> · {afterLabel}</span>
      </span>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-chalk" style={{ left: `${pos * 100}%` }}>
        <span className={cn("absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-chalk bg-deep text-chalk")}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
