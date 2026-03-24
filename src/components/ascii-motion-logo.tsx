'use client'

import { useEffect, useRef } from 'react'

// Character ramp: sparse → dense (maps to 0 → 1 brightness)
const CHARS = ' .·:!|/+*=&#@'

const COLS = 88
const ROWS = 14

// Canvas scale factor — render at high-res, sample down for quality letterforms
const SX = 10
const SY = 16

export function AsciiMotionLogo() {
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const W = COLS * SX
    const H = ROWS * SY

    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')!

    // White bg, black text — we'll invert so text = bright
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = '#000000'
    ctx.font = `900 ${Math.round(H * 0.74)}px "Arial Black", "Helvetica Neue", Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('EVLOGIA', W / 2, H / 2)

    const pixels = ctx.getImageData(0, 0, W, H).data

    // Build brightness map: 0 = background, 1 = letter interior
    const base: number[][] = Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, (_, c) => {
        let sum = 0
        const x0 = c * SX, x1 = Math.min(x0 + SX, W)
        const y0 = r * SY, y1 = Math.min(y0 + SY, H)
        let n = 0
        for (let py = y0; py < y1; py++) {
          for (let px = x0; px < x1; px++) {
            sum += pixels[(py * W + px) * 4] / 255
            n++
          }
        }
        return 1 - sum / n  // invert: text → 1, bg → 0
      })
    )

    let t = 0
    let raf: number

    function frame() {
      t += 0.038

      const lines: string[] = []
      for (let y = 0; y < ROWS; y++) {
        let row = ''
        for (let x = 0; x < COLS; x++) {
          const b = base[y][x]

          if (b < 0.05) {
            row += ' '
            continue
          }

          // Multi-octave wave: horizontal sweep + vertical pulse + diagonal drift
          const wave =
            Math.sin(x * 0.28 - t * 2.1) * 0.42 +
            Math.sin(y * 0.55 + t * 1.5) * 0.26 +
            Math.sin((x - y) * 0.19 + t * 0.9) * 0.18 +
            Math.sin(x * 0.08 + y * 0.12 - t * 0.6) * 0.14

          const v = Math.max(0, Math.min(1, b + wave * b * 1.1))
          row += CHARS[Math.round(v * (CHARS.length - 1))]
        }
        lines.push(row)
      }

      if (preRef.current) preRef.current.textContent = lines.join('\n')
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <pre
      ref={preRef}
      aria-hidden="true"
      className="font-mono leading-[1.18] select-none pointer-events-none text-black/[0.22] overflow-hidden w-full"
      style={{
        fontSize: 'clamp(6.5px, calc(100vw / 105), 11px)',
        letterSpacing: '0.04em',
      }}
    />
  )
}
