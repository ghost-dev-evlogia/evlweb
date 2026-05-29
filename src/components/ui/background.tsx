'use client';

import { useRef, useEffect } from 'react';

type SpriteConfig = {
  src: string;
  width: number;
  height: number;
  baseScale: number;
  fps: number;
  colsWalk: number;
  colsIdle: number;
};

const SPRITE_DATA: Record<string, SpriteConfig> = {
  bull: {
    src: '/data/Bull_animation_with_shadow.png',
    width: 64, height: 64, baseScale: 3, fps: 12, colsWalk: 6, colsIdle: 4,
  },
  sheep: {
    src: '/data/Sheep_animation_with_shadow.png',
    width: 32, height: 32, baseScale: 5, fps: 12, colsWalk: 6, colsIdle: 4,
  },
  pig: {
    src: '/data/Piglet_animation_with_shadow.png',
    width: 32, height: 32, baseScale: 4, fps: 12, colsWalk: 6, colsIdle: 4,
  },
  chick: {
    src: '/data/Chick_animation_with_shadow.png',
    width: 16, height: 16, baseScale: 5, fps: 12, colsWalk: 6, colsIdle: 4,
  },
  turkey: {
    src: '/data/Turkey_animation_with_shadow.png',
    width: 32, height: 32, baseScale: 4, fps: 12, colsWalk: 6, colsIdle: 4,
  },
};

interface AnimalsProps {
  animal?: string;
  speed?: number;
  scale?: number;
  initialX?: number;
  initialY?: number;
  transparent?: boolean;
  backgroundColor?: string;
}

type AutoMode = 'offscreen' | 'entering' | 'wandering' | 'idle' | 'fleeing';

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const Animals = ({
  animal = 'sheep',
  speed = 4,
  scale = 3,
  initialX = 50,
  initialY = 50,
  transparent = true,
  backgroundColor = '#4a7c59',
}: AnimalsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cfg = SPRITE_DATA[animal.toLowerCase()] || SPRITE_DATA['sheep'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = false;
    };
    window.addEventListener('resize', resize);
    resize();

    const img = new Image();
    img.src = cfg.src;
    let loaded = false;
    img.onload = () => { loaded = true; };

    // ── Shared animation state ──────────────────────────────────────────────
    let x = (initialX / 100) * canvas.width;
    let y = (initialY / 100) * canvas.height;
    let targetX = x;
    let targetY = y;
    let frame = 0;
    let dir = 0;
    let isIdle = true;
    let lastTime = 0;
    let timer = 0;
    const frameInterval = 1000 / cfg.fps;
    let currentSpeed = speed;

    // ── Mobile autonomous state machine ────────────────────────────────────
    const isMobile = window.matchMedia('(hover: none)').matches;

    type AutoState = { mode: AutoMode; modeEnd: number };
    const auto: AutoState = { mode: 'offscreen', modeEnd: 0 };

    // Returns a point just outside a random viewport edge
    const edgePoint = (inside = false) => {
      const margin = inside ? -80 : 80;
      const edge = Math.floor(rand(0, 4));
      const W = canvas.width;
      const H = canvas.height;
      switch (edge) {
        case 0: return { x: rand(0, W), y: inside ? rand(80, H - 80) : -margin, edge };   // left
        case 1: return { x: W + margin, y: rand(0, H), edge };                              // right
        case 2: return { x: rand(0, W), y: H + margin, edge };                              // bottom
        default: return { x: -margin, y: rand(0, H), edge };                                // top (repurposed as left edge exit)
      }
    };

    // Random point well inside the viewport
    const innerPoint = () => ({
      x: rand(80, canvas.width - 80),
      y: rand(80, canvas.height - 80),
    });

    // Place sheep off-screen and schedule re-entry
    const goOffscreen = () => {
      const ep = edgePoint(false);
      x = ep.x; y = ep.y;
      auto.mode = 'offscreen';
      auto.modeEnd = performance.now() + rand(1500, 4000);
    };

    // Decide what the sheep does next after reaching its target
    const pickNext = (now: number) => {
      const roll = Math.random();
      if (roll < 0.30) {
        // Idle for a bit
        auto.mode = 'idle';
        auto.modeEnd = now + rand(800, 3500);
        currentSpeed = speed;
      } else if (roll < 0.65) {
        // Wander to a new random spot
        auto.mode = 'wandering';
        const t = innerPoint();
        targetX = t.x; targetY = t.y;
        currentSpeed = speed;
      } else {
        // Bolt for an edge and disappear
        auto.mode = 'fleeing';
        const ep = edgePoint(false);
        targetX = ep.x; targetY = ep.y;
        currentSpeed = speed * 2.8;
      }
    };

    // Start off-screen on mount
    if (isMobile) goOffscreen();

    // ── Desktop: follow cursor ──────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Main loop ──────────────────────────────────────────────────────────
    let rafId: number;

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (!loaded) return;

      const dt = now - lastTime;
      lastTime = now;

      // ── Mobile state machine ──
      if (isMobile) {
        if (auto.mode === 'offscreen') {
          if (now >= auto.modeEnd) {
            // Enter from a random edge
            auto.mode = 'entering';
            const ep = edgePoint(false);
            x = ep.x; y = ep.y;
            const t = innerPoint();
            targetX = t.x; targetY = t.y;
            currentSpeed = speed;
          }
        } else if (auto.mode === 'idle') {
          targetX = x; targetY = y; // stay put
          if (now >= auto.modeEnd) pickNext(now);
        } else {
          // entering / wandering / fleeing — check if we've reached the target
          const dx = targetX - x;
          const dy = targetY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 12) {
            if (auto.mode === 'fleeing') {
              goOffscreen();
            } else {
              // entering or wandering — reached destination
              pickNext(now);
            }
          }
        }
      }

      // ── Movement (shared) ──
      const dx = targetX - x;
      const dy = targetY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const wasIdle = isIdle;

      const threshold = isMobile ? 12 : 10;
      if (dist > threshold && !(isMobile && auto.mode === 'idle')) {
        isIdle = false;
        x += (dx / dist) * currentSpeed;
        y += (dy / dist) * currentSpeed;
        if (Math.abs(dx) > Math.abs(dy)) {
          dir = dx > 0 ? 3 : 2;
        } else {
          dir = dy > 0 ? 0 : 1;
        }
      } else {
        isIdle = true;
      }

      if (wasIdle !== isIdle) frame = 0;

      timer += dt;
      if (timer > frameInterval) {
        timer = 0;
        const maxF = isIdle ? cfg.colsIdle : cfg.colsWalk;
        frame = (frame + 1) % maxF;
      }

      // ── Draw ──
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!transparent) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Don't draw while fully off-screen waiting
      if (isMobile && auto.mode === 'offscreen') return;

      const row = isIdle ? dir + 4 : dir;
      const sx = frame * cfg.width;
      const sy = row * cfg.height;
      const drawW = cfg.width * scale;
      const drawH = cfg.height * scale;

      ctx.drawImage(img, sx, sy, cfg.width, cfg.height, x - drawW / 2, y - drawH / 2, drawW, drawH);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [animal, speed, scale, initialX, initialY, transparent, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        imageRendering: 'pixelated',
      }}
    />
  );
};

export default Animals;
