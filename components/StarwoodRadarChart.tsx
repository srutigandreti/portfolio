// Server component — pure SVG + static HTML, no client state needed

const CX = 300;
const CY = 260;
const MAX_R = 170;

const AXES = [
  "Mental demand", // 0 — top
  "Physical demand", // 1 — top-right
  "Temporal demand", // 2 — bottom-right
  "Performance", // 3 — bottom
  "Effort", // 4 — bottom-left
  "Frustration", // 5 — top-left
];

// NASA-TLX scores — matched to screenshot shape
// axes: Mental, Physical, Temporal, Performance, Effort, Frustration
const MANUAL: number[] = [88, 20, 85, 14, 68, 54];
const PROTO_B: number[] = [45, 14, 38, 10, 40, 22];

const RINGS = [20, 60, 100];

const STAT_CARDS = [
  { label: "Mental demand", pct: 45, from: 82, to: 45 },
  { label: "Temporal demand", pct: 55, from: 85, to: 38 },
  { label: "Effort", pct: 46, from: 78, to: 42 },
];

// ── helpers ──────────────────────────────────────────────────────────────────

function angle(i: number) {
  return (-90 + i * 60) * (Math.PI / 180);
}

function pt(value: number, i: number) {
  const r = (value / 100) * MAX_R;
  return { x: CX + r * Math.cos(angle(i)), y: CY + r * Math.sin(angle(i)) };
}

function polygon(values: number[]) {
  return values
    .map((v, i) => {
      const p = pt(v, i);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

function ringPoly(pct: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const r = pct * MAX_R;
    return `${CX + r * Math.cos(angle(i))},${CY + r * Math.sin(angle(i))}`;
  }).join(" ");
}

function labelPt(i: number) {
  const r = MAX_R * 1.24;
  return { x: CX + r * Math.cos(angle(i)), y: CY + r * Math.sin(angle(i)) };
}

function anchor(i: number) {
  if (i === 0 || i === 3) return "middle";
  if (i === 1 || i === 2) return "start";
  return "end";
}

// ── component ─────────────────────────────────────────────────────────────────

export default function StarwoodRadarChart() {
  return (
    <div>
      <svg
        viewBox="0 0 600 510"
        width="100%"
        style={{ display: "block", overflow: "visible" }}
        aria-label="NASA-TLX radar chart: Manual Workflow vs Prototype B"
      >
        {/* ── Grid rings ── */}
        {RINGS.map((v) => (
          <polygon
            key={v}
            points={ringPoly(v / 100)}
            fill="none"
            stroke="rgba(94,94,94,0.18)"
            strokeWidth="1"
          />
        ))}

        {/* ── Axis spokes ── */}
        {AXES.map((_, i) => {
          const end = pt(100, i);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={end.x}
              y2={end.y}
              stroke="rgba(94,94,94,0.18)"
              strokeWidth="1"
            />
          );
        })}

        {/* ── Ring value labels (offset right of the top spoke) ── */}
        {RINGS.map((v) => {
          const p = pt(v, 0);
          return (
            <text
              key={v}
              x={p.x + 7}
              y={p.y + 4}
              textAnchor="start"
              fontSize="10"
              fill="rgba(94,94,94,0.45)"
              fontFamily='"PPNeueMontreal", sans-serif'
            >
              {v}
            </text>
          );
        })}

        {/* ── Manual Workflow (red) ── */}
        <polygon
          points={polygon(MANUAL)}
          fill="#FF0166"
          fillOpacity="0.10"
          stroke="#FF0166"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {MANUAL.map((v, i) => {
          const p = pt(v, i);
          return <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#FF0166" />;
        })}

        {/* ── Prototype B (blue) ── */}
        <polygon
          points={polygon(PROTO_B)}
          fill="#088FE0"
          fillOpacity="0.14"
          stroke="#088FE0"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {PROTO_B.map((v, i) => {
          const p = pt(v, i);
          return <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#088FE0" />;
        })}

        {/* ── Axis labels ── */}
        {AXES.map((label, i) => {
          const { x, y } = labelPt(i);
          const a = anchor(i);
          const words = label.split(" ");
          const isTwo = words.length === 2;
          return (
            <text
              key={i}
              textAnchor={a}
              fontSize="12"
              fill="#5e5e5e"
              fontFamily='"PPNeueMontreal", sans-serif'
              fontWeight="400"
            >
              {isTwo ? (
                <>
                  <tspan x={x} y={y - 6}>
                    {words[0]}
                  </tspan>
                  <tspan x={x} dy="15">
                    {words[1]}
                  </tspan>
                </>
              ) : (
                <tspan x={x} y={y + 4}>
                  {label}
                </tspan>
              )}
            </text>
          );
        })}
      </svg>

      {/* ── Legend ── */}
      <div
        style={{
          display: "flex",
          gap: "28px",
          justifyContent: "center",
          marginTop: "-8px",
          marginBottom: "28px",
        }}
      >
        {[
          { color: "#FF0166", label: "Manual Workflow" },
          { color: "#088FE0", label: "Prototype B" },
        ].map(({ color, label }) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <div
              style={{
                width: "13px",
                height: "13px",
                borderRadius: "2px",
                background: color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily:
                  '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                fontSize: "0.85rem",
                color: "#5e5e5e",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Stat cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {STAT_CARDS.map(({ label, pct, from, to }) => (
          <div
            key={label}
            style={{
              background: "rgba(94,94,94,0.05)",
              borderRadius: "8px",
              padding: "16px 20px",
            }}
          >
            <p
              style={{
                fontFamily:
                  '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                fontSize: "0.8rem",
                color: "#5e5e5e",
                marginBottom: "6px",
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontFamily:
                  '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                fontSize: "1.9rem",
                fontWeight: 500,
                color: "#088FE0",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              ↓{pct}%
            </p>
            <p
              style={{
                fontFamily:
                  '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                fontSize: "0.8rem",
                color: "rgba(94,94,94,0.55)",
              }}
            >
              {from} → {to}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
