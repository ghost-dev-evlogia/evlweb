/* Far-off birds drifting across the hero sky — the pack's own pixel bird
   sprite (wildlife.png row 3), flapping through its 3 flight frames as it
   crosses. Decorative, CSS-only. Clipped to the sky band so it never causes
   horizontal scroll; off under prefers-reduced-motion. */

const BIRDS = [
  { top: "16%", scale: 1, dur: 30, delay: 0, dir: 1 },
  { top: "26%", scale: 0.7, dur: 41, delay: 9, dir: 1 },
  { top: "10%", scale: 0.85, dur: 35, delay: 19, dir: -1 },
];

export function SkyBirds() {
  return (
    <div
      aria-hidden
      className="sky-birds pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
      style={{ height: "48%" }}
    >
      {BIRDS.map((b, i) => (
        <span
          key={i}
          className="sky-bird"
          style={{
            top: b.top,
            transform: `scale(${b.scale})`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            animationDirection: b.dir < 0 ? "reverse" : "normal",
          }}
        >
          {/* sprite faces right; mirror it when the bird travels left */}
          <span className="sky-bird-wings">
            <span className="sky-bird-sprite" style={b.dir < 0 ? { transform: "scaleX(-1)" } : undefined} />
          </span>
        </span>
      ))}
    </div>
  );
}
