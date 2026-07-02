"use client";

import { useEffect, useRef, useState } from "react";

/* Throwaway smoke test: verifies PixiJS v8 boots under Turbopack with the
   'use client' + useEffect pattern (NOT next/dynamic ssr:false), that HMR
   survives, and that StrictMode double-mount doesn't leak a WebGL context. */
export function PixiSmoke() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("booting…");

  useEffect(() => {
    let destroyed = false;
    let app: import("pixi.js").Application | null = null;

    (async () => {
      const { Application, Assets, Sprite, TextureStyle } = await import(
        "pixi.js"
      );
      if (destroyed || !hostRef.current) return;

      TextureStyle.defaultOptions.scaleMode = "nearest";

      const a = new Application();
      await a.init({
        width: 480,
        height: 270,
        background: "#8cbfc2",
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        roundPixels: true,
      });
      if (destroyed) {
        a.destroy(
          { removeView: true },
          { children: true, texture: true, textureSource: true, context: true }
        );
        return;
      }
      app = a;
      hostRef.current.appendChild(a.canvas);
      a.canvas.style.imageRendering = "pixelated";

      const tex = await Assets.load("/farm/sprites/chicken.png");
      if (destroyed) return;
      const chick = new Sprite(tex);
      chick.scale.set(4);
      chick.position.set(200, 100);
      a.stage.addChild(chick);

      let t = 0;
      a.ticker.add((tick) => {
        t += tick.deltaTime;
        chick.y = 100 + Math.round(Math.sin(t / 20) * 8);
      });

      setStatus(`ok — pixi ${a.renderer.name} renderer, chicken bobbing`);
    })();

    return () => {
      destroyed = true;
      if (app) {
        app.destroy(
          { removeView: true },
          { children: true, texture: true, textureSource: true, context: true }
        );
        app = null;
      }
    };
  }, []);

  return (
    <div>
      <p data-testid="pixi-status" className="mb-3 font-mono text-sm">
        {status}
      </p>
      <div ref={hostRef} />
    </div>
  );
}
