"use client";

// Red: 20 bars  |  Blue: 3 bars
// Layout uses a 20-column CSS grid (1fr each) so the viz scales with its container.
// Clip-path animation reveals/hides bars L→R using percentages, so it stays responsive.

const RED_BARS = 20;
const BLUE_BARS = 3;

// Blue reveals ~4 bar slots out of 20 (3 bars + 1 buffer) → clip right side by ~80%.
// This approximates the original 83% clip but works at any container width.
const BLUE_CLIP_RIGHT = 80;

// Loop: 8 s
// Ghost bars: always visible at low opacity (no animation)
// 0–20%  (0–1.6s)   red fills   L→R
// 20–35% (1.6–2.8s) red holds   full
// 35–55% (2.8–4.4s) red empties R→L  ← fully gone at 55%
// 55–76% (4.4–6.08s) gap — only ghost visible (~1.7 s pause, +0.5 s added)
// 76–81% (6.08–6.48s) blue fills  L→R
// 81–89% (6.48–7.12s) blue holds (3 bars over ghost)
// 89–95% (7.12–7.6s)  blue empties R→L
// 95–100%(7.6–8.0s)   gap → loop

export default function StarwoodReductionViz() {
  const gridStyle = {
    position: "absolute" as const,
    inset: 0,
    display: "grid",
    gridTemplateColumns: `repeat(${RED_BARS}, 1fr)`,
    gap: "clamp(2px, 1.9%, 6px)",
  };

  const barStyle = {
    height: "100%",
    borderRadius: "3px",
  };

  return (
    <>
      <style>{`
        @keyframes sw-red-group {
          0%   { clip-path: inset(0 100% 0 0); opacity: 0.25; animation-timing-function: linear; }
          20%  { clip-path: inset(0 0% 0 0);   opacity: 1;    animation-timing-function: linear; }
          35%  { clip-path: inset(0 0% 0 0);   opacity: 1;    animation-timing-function: linear; }
          55%  { clip-path: inset(0 100% 0 0); opacity: 1; }
          100% { clip-path: inset(0 100% 0 0); opacity: 0.25; }
        }
        @keyframes sw-blue-group {
          0%   { clip-path: inset(0 100% 0 0); opacity: 0.25; }
          76%  { clip-path: inset(0 100% 0 0); opacity: 0.25; animation-timing-function: linear; }
          81%  { clip-path: inset(0 ${BLUE_CLIP_RIGHT}% 0 0); opacity: 1; }
          89%  { clip-path: inset(0 ${BLUE_CLIP_RIGHT}% 0 0); opacity: 1; animation-timing-function: linear; }
          95%  { clip-path: inset(0 100% 0 0); opacity: 1; }
          100% { clip-path: inset(0 100% 0 0); opacity: 0.25; }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "50%",
          }}
        >
          {/* ── Ghost: always-on gray bars, full set ── */}
          <div style={{ ...gridStyle, opacity: 0.18 }}>
            {Array.from({ length: RED_BARS }).map((_, i) => (
              <div key={i} style={{ ...barStyle, background: "#5e5e5e" }} />
            ))}
          </div>

          {/* ── Red group: fills all 20 bars, then empties ── */}
          <div style={{ ...gridStyle, animation: "sw-red-group 8s infinite" }}>
            {Array.from({ length: RED_BARS }).map((_, i) => (
              <div key={i} style={{ ...barStyle, background: "#FF0166" }} />
            ))}
          </div>

          {/* ── Blue group: only 3 bars, occupying first 3 grid cells ── */}
          <div style={{ ...gridStyle, animation: "sw-blue-group 8s infinite" }}>
            {Array.from({ length: BLUE_BARS }).map((_, i) => (
              <div key={i} style={{ ...barStyle, background: "#38bdf8" }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
