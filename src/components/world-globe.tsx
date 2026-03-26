"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Notable client-geography cities [lat, lng]
const DOTS: [number, number][] = [
  [40.7, -74.0],   // New York
  [37.8, -122.4],  // San Francisco
  [51.5, -0.1],    // London
  [48.9, 2.4],     // Paris
  [52.5, 13.4],    // Berlin
  [25.2, 55.3],    // Dubai
  [19.1, 72.9],    // Mumbai
  [1.3, 103.8],    // Singapore
  [35.7, 139.7],   // Tokyo
  [-33.9, 151.2],  // Sydney
  [-23.5, -46.6],  // São Paulo
  [55.8, 37.6],    // Moscow
];

interface WorldGlobeProps {
  className?: string;
  size?: number;
  lineOpacity?: number;
  dotOpacity?: number;
  rotationSpeed?: number;
}

export function WorldGlobe({
  className,
  size = 560,
  lineOpacity = 0.07,
  dotOpacity = 0.28,
  rotationSpeed = 0.0004,
}: WorldGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx; // narrowed non-null alias

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    c.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.44;

    let rotation = 0;
    let raf: number;

    function point3D(lat: number, lng: number) {
      const φ = (lat * Math.PI) / 180;
      const λ = ((lng + (rotation * 180) / Math.PI) * Math.PI) / 180;
      return {
        x: Math.cos(φ) * Math.cos(λ),
        y: Math.sin(φ),
        z: Math.cos(φ) * Math.sin(λ),
      };
    }

    function draw() {
      c.clearRect(0, 0, size, size);

      // Sphere outline
      c.beginPath();
      c.arc(cx, cy, r, 0, Math.PI * 2);
      c.strokeStyle = `rgba(0,0,0,${lineOpacity * 1.2})`;
      c.lineWidth = 0.75;
      c.stroke();

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        c.beginPath();
        let drawing = false;
        for (let lng = -180; lng <= 180; lng += 2) {
          const { x, y, z } = point3D(lat, lng);
          if (z < 0) { drawing = false; continue; }
          const px = cx + x * r;
          const py = cy - y * r;
          if (!drawing) { c.moveTo(px, py); drawing = true; }
          else c.lineTo(px, py);
        }
        c.strokeStyle = `rgba(0,0,0,${lineOpacity})`;
        c.lineWidth = 0.5;
        c.stroke();
      }

      // Longitude lines
      for (let lng = 0; lng < 360; lng += 30) {
        c.beginPath();
        let drawing = false;
        for (let lat = -90; lat <= 90; lat += 2) {
          const { x, y, z } = point3D(lat, lng);
          if (z < 0) { drawing = false; continue; }
          const px = cx + x * r;
          const py = cy - y * r;
          if (!drawing) { c.moveTo(px, py); drawing = true; }
          else c.lineTo(px, py);
        }
        c.strokeStyle = `rgba(0,0,0,${lineOpacity})`;
        c.lineWidth = 0.5;
        c.stroke();
      }

      // Client location dots
      for (const [lat, lng] of DOTS) {
        const { x, y, z } = point3D(lat, lng);
        if (z < 0.05) continue;
        // Fade dots in from edge of sphere
        const fade = Math.min(1, (z - 0.05) / 0.25);
        const px = cx + x * r;
        const py = cy - y * r;

        // Outer ring
        c.beginPath();
        c.arc(px, py, 5, 0, Math.PI * 2);
        c.strokeStyle = `rgba(0,0,0,${dotOpacity * 0.25 * fade})`;
        c.lineWidth = 0.75;
        c.stroke();

        // Core dot
        c.beginPath();
        c.arc(px, py, 2, 0, Math.PI * 2);
        c.fillStyle = `rgba(0,0,0,${dotOpacity * fade})`;
        c.fill();
      }

      rotation += rotationSpeed;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, [size, lineOpacity, dotOpacity, rotationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden
    />
  );
}
