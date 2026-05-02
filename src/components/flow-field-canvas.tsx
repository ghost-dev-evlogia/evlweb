"use client";

import { useEffect, useRef } from "react";

/**
 * Generative flow-field canvas for the hero section.
 *
 * A 2D perlin-noise vector field drives a swarm of particles. Each particle
 * draws a 1px hairline along its current velocity vector each frame and is
 * recycled when it leaves the canvas or after a max lifetime. Background
 * is overdrawn each frame at low alpha to slowly fade trails — this is what
 * gives the "drifting calligraphy" texture without unbounded buildup.
 *
 * Visual brief: cream + dark hairlines. No saturation. The hero stays in the
 * brand's tonal range (page bg #f5f4f0) but the surface is alive.
 *
 * Performance: single 2D canvas, ~1200 particles, ~28 KB/s of drawing on
 * desktop. Pauses via IntersectionObserver when off-screen and via
 * matchMedia('(prefers-reduced-motion: reduce)') when the OS asks.
 */
export function FlowFieldCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx2d = canvasEl.getContext("2d", { alpha: false });
    if (!ctx2d) return;
    // Aliases narrow to non-null and stay narrowed inside the closures below
    // (TS does not propagate top-level narrowing through nested function decls).
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ─── State ──────────────────────────────────────────────────────────
    const PAGE_BG = "#f5f4f0";
    const STROKE = "rgba(10, 10, 10, 0.055)";

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let frameId = 0;
    let running = false;
    let t = 0; // animation time, used for slow field morph

    // ─── Perlin-ish noise (Stefan Gustavson simplex-style hash) ──────────
    // Lightweight gradient noise; not strict perlin but visually equivalent
    // for our purpose (smooth low-freq angle field).
    const perm = new Uint8Array(512);
    {
      const p = new Uint8Array(256);
      for (let i = 0; i < 256; i++) p[i] = i;
      // Deterministic shuffle (we don't want every reload to look different)
      let seed = 1373;
      for (let i = 255; i > 0; i--) {
        seed = (seed * 16807) % 2147483647;
        const j = seed % (i + 1);
        const tmp = p[i];
        p[i] = p[j];
        p[j] = tmp;
      }
      for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    }
    const fade = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
    const grad = (hash: number, x: number, y: number, z: number) => {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };
    function noise3(x: number, y: number, z: number): number {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
      const u = fade(x);
      const v = fade(y);
      const w = fade(z);
      const A = perm[X] + Y;
      const AA = perm[A] + Z;
      const AB = perm[A + 1] + Z;
      const B = perm[X + 1] + Y;
      const BA = perm[B] + Z;
      const BB = perm[B + 1] + Z;
      const lerp = (a: number, b: number, t: number) => a + t * (b - a);
      return lerp(
        lerp(
          lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u),
          lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u),
          v
        ),
        lerp(
          lerp(grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1), u),
          lerp(grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1), u),
          v
        ),
        w
      );
    }

    // ─── Particle state ─────────────────────────────────────────────────
    type P = { x: number; y: number; life: number; max: number };
    const particles: P[] = [];
    let particleCount = 0;

    function recalcCount() {
      // Density target: ~1 particle per 1100 device-pixels of viewport area.
      // Caps so phones don't spawn 4000 particles.
      const area = w * h;
      particleCount = Math.min(1500, Math.max(450, Math.floor(area / 1100)));
    }

    function seedParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          life: Math.random() * 220,
          max: 180 + Math.random() * 240,
        });
      }
    }

    // ─── Resize ─────────────────────────────────────────────────────────
    function resize() {
      const r = canvas.getBoundingClientRect();
      w = Math.floor(r.width * dpr);
      h = Math.floor(r.height * dpr);
      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = PAGE_BG;
      ctx.fillRect(0, 0, w, h);
      recalcCount();
      seedParticles();
    }

    // ─── Frame loop ─────────────────────────────────────────────────────
    function frame() {
      // Soft trail fade — overdraw bg at low alpha
      ctx.fillStyle = "rgba(245, 244, 240, 0.045)";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = STROKE;
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();

      const fieldScale = 0.0014; // lower = larger swirls
      const speed = 1.6 * dpr;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const n = noise3(p.x * fieldScale, p.y * fieldScale, t);
        // Map noise to angle. Two full rotations across noise range gives
        // visually rich curl without too-tight loops.
        const angle = n * Math.PI * 2.4;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        const nx = p.x + vx;
        const ny = p.y + vy;

        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);

        p.x = nx;
        p.y = ny;
        p.life++;

        // Recycle if particle leaves canvas or expires
        if (
          p.x < -10 ||
          p.x > w + 10 ||
          p.y < -10 ||
          p.y > h + 10 ||
          p.life > p.max
        ) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.life = 0;
          p.max = 180 + Math.random() * 240;
        }
      }
      ctx.stroke();

      t += 0.0007; // slow morph cycle (~24 minutes for full noise traversal,
                  //  but visually distinct shifts every ~10s)

      frameId = requestAnimationFrame(frame);
    }

    function renderStaticFrame() {
      // For prefers-reduced-motion: render a single dense pass so the hero
      // still has texture, but no animation.
      ctx.fillStyle = PAGE_BG;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = STROKE;
      ctx.lineWidth = 1 * dpr;
      const passes = 80;
      for (let pass = 0; pass < passes; pass++) {
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const n = noise3(p.x * 0.0014, p.y * 0.0014, 0);
          const angle = n * Math.PI * 2.4;
          const nx = p.x + Math.cos(angle) * 1.6 * dpr;
          const ny = p.y + Math.sin(angle) * 1.6 * dpr;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(nx, ny);
          p.x = nx;
          p.y = ny;
          if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
            p.x = Math.random() * w;
            p.y = Math.random() * h;
          }
        }
        ctx.stroke();
      }
    }

    function start() {
      if (running) return;
      running = true;
      if (reduceMotion) {
        renderStaticFrame();
      } else {
        frame();
      }
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frameId);
    }

    // ─── Wire up ────────────────────────────────────────────────────────
    resize();
    start();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newDpr = Math.min(window.devicePixelRatio || 1, 2);
        if (newDpr !== dpr) dpr = newDpr;
        resize();
      }, 120);
    };
    window.addEventListener("resize", onResize);

    // Pause when off-screen
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block" }}
    />
  );
}
