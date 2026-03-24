'use client'

import { useEffect, useRef } from 'react'

// Restrained ramp: 8 levels, sparse → dense
// Chosen to feel organic without being too loud
const CHARS = ' ·.:+*=#'

// Grid dimensions — COLS:ROWS ≈ 1.82:1 so monospace chars (~0.55 w/h) render ~square
const COLS = 40
const ROWS = 22

export function AsciiMotionLogo() {
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    let raf: number
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      // Square canvas — logo is 1:1, clear to transparent so alpha channel is clean
      const SIZE = 400
      const canvas = document.createElement('canvas')
      canvas.width = SIZE
      canvas.height = SIZE
      const ctx = canvas.getContext('2d')!
      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.drawImage(img, 0, 0, SIZE, SIZE)

      const pixels = ctx.getImageData(0, 0, SIZE, SIZE).data

      // Build mask by averaging alpha per cell
      // alpha=0 → transparent background, alpha=255 → logo stroke
      const CW = SIZE / COLS
      const CH = SIZE / ROWS
      const mask: number[][] = Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => {
          let sum = 0, n = 0
          const x0 = Math.floor(c * CW), x1 = Math.min(Math.ceil((c + 1) * CW), SIZE)
          const y0 = Math.floor(r * CH), y1 = Math.min(Math.ceil((r + 1) * CH), SIZE)
          for (let py = y0; py < y1; py++) {
            for (let px = x0; px < x1; px++) {
              sum += pixels[(py * SIZE + px) * 4 + 3] / 255  // alpha channel
              n++
            }
          }
          return n > 0 ? sum / n : 0
        })
      )

      let t = 0

      function frame() {
        t += 0.036

        const lines: string[] = []
        for (let y = 0; y < ROWS; y++) {
          let row = ''
          for (let x = 0; x < COLS; x++) {
            const b = mask[y][x]

            if (b < 0.07) {
              row += ' '
              continue
            }

            // Multi-frequency wave — only modulates within the logo silhouette
            const wave =
              Math.sin(x * 0.30 - t * 2.0) * 0.40 +
              Math.sin(y * 0.52 + t * 1.4) * 0.28 +
              Math.sin((x + y) * 0.18 - t * 0.8) * 0.18 +
              Math.sin(x * 0.09 - y * 0.13 + t * 0.55) * 0.14

            const v = Math.max(0, Math.min(1, b + wave * b))
            row += CHARS[Math.round(v * (CHARS.length - 1))]
          }
          lines.push(row)
        }

        if (preRef.current) preRef.current.textContent = lines.join('\n')
        raf = requestAnimationFrame(frame)
      }

      raf = requestAnimationFrame(frame)
    }

    img.src = '/evlogia-logomark-.png'

    return () => {
      cancelAnimationFrame(raf)
      img.onload = null
    }
  }, [])

  return (
    <pre
      ref={preRef}
      aria-hidden="true"
      className="font-mono leading-[1.0] select-none pointer-events-none text-black/[0.28]"
      style={{
        fontSize: '5.8px',
        letterSpacing: '0.03em',
        // Constrain to roughly the same visual footprint as the original logo block
        width: '148px',
        overflow: 'hidden',
      }}
    />
  )
}
