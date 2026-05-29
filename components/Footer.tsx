"use client";

import { useRef, useEffect } from "react";
import TransitionLink from "@/components/TransitionLink";

// ─── Noise helpers ────────────────────────────────────────────────────────────
function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}
function valueNoise(x: number, y: number) {
  const ix = Math.floor(x),
    iy = Math.floor(y);
  const fx = smoothstep(x - ix),
    fy = smoothstep(y - iy);
  return (
    hash(ix, iy) * (1 - fx) * (1 - fy) +
    hash(ix + 1, iy) * fx * (1 - fy) +
    hash(ix, iy + 1) * (1 - fx) * fy +
    hash(ix + 1, iy + 1) * fx * fy
  );
}
function fbm(x: number, y: number) {
  return (
    valueNoise(x, y) * 0.5 +
    valueNoise(x * 2, y * 2) * 0.25 +
    valueNoise(x * 4, y * 4) * 0.125
  );
}

// ─── Paper texture only (used for grain overlay — no grid lines) ──────────────
function buildPaper(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const sc = 3.2 / Math.max(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const grain =
        hash(x * 2.3, y * 1.9) * 0.55 + hash(x * 5.1, y * 4.3) * 0.45;
      const coarse = fbm(x * sc, y * sc);
      const v = grain * 0.28 + coarse * 0.72;
      const br = (v - 0.5) * 13;
      d[i] = Math.min(255, Math.max(0, 238 + br));
      d[i + 1] = Math.min(255, Math.max(0, 235 + br));
      d[i + 2] = Math.min(255, Math.max(0, 227 + br));
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

// ─── Static base: paper texture + graph grid ─────────────────────────────────
function buildBase(
  w: number,
  h: number,
  cs: number,
  paper: HTMLCanvasElement,
): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  ctx.drawImage(paper, 0, 0);

  const cols = Math.ceil(w / cs) + 1;
  const rows = Math.ceil(h / cs) + 1;

  // All grid lines share identical color, opacity, and thickness.
  // Pixel-aligned (+0.5) to prevent sub-pixel blur asymmetry.
  ctx.strokeStyle = "rgba(163,155,143,0.20)";
  ctx.lineWidth = 0.5;

  for (let col = 0; col <= cols; col++) {
    const x = Math.round(col * cs) + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let row = 0; row <= rows; row++) {
    const y = Math.round(row * cs) + 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  return c;
}

// ─── Draw one sunk cell ───────────────────────────────────────────────────────
function drawSunkCell(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  depth: number,
) {
  const D = depth * 15; // max visual depth in px
  if (D < 0.25) return;

  const inset = D * 0.22;
  const fx = cx + inset,
    fy = cy + inset;
  const fw = size - inset * 2,
    fh = size - inset * 2;
  const p = depth; // shorthand for alpha calculations

  // ── Floor ──────────────────────────────────────────────────────────
  ctx.fillStyle = `rgba(168,160,146,${p * 0.18})`;
  ctx.fillRect(fx, fy, fw, fh);

  // Floor ambient occlusion vignette
  const gs = ctx.createRadialGradient(
    fx + fw * 0.5,
    fy + fh * 0.5,
    0,
    fx + fw * 0.5,
    fy + fh * 0.5,
    size * 0.62,
  );
  gs.addColorStop(0, `rgba(148,140,126,${p * 0.04})`);
  gs.addColorStop(1, `rgba(105, 97, 83,${p * 0.22})`);
  ctx.fillStyle = gs;
  ctx.fillRect(fx, fy, fw, fh);

  // ── Top wall (lit — light source top-left) ─────────────────────────
  const gt = ctx.createLinearGradient(cx, cy, cx, fy);
  gt.addColorStop(0, `rgba(250,245,235,0)`);
  gt.addColorStop(1, `rgba(198,190,176,${p * 0.34})`);
  ctx.fillStyle = gt;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + size, cy);
  ctx.lineTo(fx + fw, fy);
  ctx.lineTo(fx, fy);
  ctx.closePath();
  ctx.fill();

  // ── Left wall (lit) ────────────────────────────────────────────────
  const gl = ctx.createLinearGradient(cx, cy, fx, cy);
  gl.addColorStop(0, `rgba(250,245,235,0)`);
  gl.addColorStop(1, `rgba(208,200,186,${p * 0.26})`);
  ctx.fillStyle = gl;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(fx, fy);
  ctx.lineTo(fx, fy + fh);
  ctx.lineTo(cx, cy + size);
  ctx.closePath();
  ctx.fill();

  // ── Bottom wall (shadow) ───────────────────────────────────────────
  const gb = ctx.createLinearGradient(cx, cy + size, cx, fy + fh);
  gb.addColorStop(0, `rgba(250,245,235,0)`);
  gb.addColorStop(1, `rgba(128,120,106,${p * 0.52})`);
  ctx.fillStyle = gb;
  ctx.beginPath();
  ctx.moveTo(cx, cy + size);
  ctx.lineTo(cx + size, cy + size);
  ctx.lineTo(fx + fw, fy + fh);
  ctx.lineTo(fx, fy + fh);
  ctx.closePath();
  ctx.fill();

  // ── Right wall (shadow) ────────────────────────────────────────────
  const gr = ctx.createLinearGradient(cx + size, cy, fx + fw, cy);
  gr.addColorStop(0, `rgba(250,245,235,0)`);
  gr.addColorStop(1, `rgba(138,130,116,${p * 0.44})`);
  ctx.fillStyle = gr;
  ctx.beginPath();
  ctx.moveTo(cx + size, cy);
  ctx.lineTo(cx + size, cy + size);
  ctx.lineTo(fx + fw, fy + fh);
  ctx.lineTo(fx + fw, fy);
  ctx.closePath();
  ctx.fill();
}

// ─── Spring physics config ────────────────────────────────────────────────────
const STIFFNESS = 0.11;
const DAMPING = 0.78;
const FALLOFF = 135; // px — cursor influence radius

// ─── Component ────────────────────────────────────────────────────────────────
export default function Footer({ bg: _bg }: { bg?: string }) {
  const footerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sRef = useRef({
    mx: -1,
    my: -1,
    cols: 0,
    rows: 0,
    cs: 32,
    base: null as HTMLCanvasElement | null,
    paper: null as HTMLCanvasElement | null,
    cells: [] as Array<{ depth: number; vel: number }>,
    raf: 0,
    t: 0,
  });

  useEffect(() => {
    const footer = footerRef.current;
    const canvas = canvasRef.current;
    if (!footer || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    const s = sRef.current;

    function setup() {
      const w = footer!.offsetWidth;
      const h = footer!.offsetHeight;
      if (!w || !h) return;
      canvas!.width = w;
      canvas!.height = h;

      // Cell size scales with viewport: ~36 px on wide screens, ~26 px on mobile
      const cs = Math.max(26, Math.min(38, Math.round(w / 36)));
      s.cs = cs;
      s.cols = Math.ceil(w / cs) + 1;
      s.rows = Math.ceil(h / cs) + 1;
      s.paper = buildPaper(w, h);
      s.base = buildBase(w, h, cs, s.paper);

      const total = s.cols * s.rows;
      const prev = s.cells;
      s.cells = Array.from(
        { length: total },
        (_, i) => prev[i] ?? { depth: 0, vel: 0 },
      );
    }

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(footer);

    function onMove(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      s.mx = e.clientX - r.left;
      s.my = e.clientY - r.top;
    }
    function onLeave() {
      s.mx = -1;
      s.my = -1;
    }
    footer.addEventListener("mousemove", onMove);
    footer.addEventListener("mouseleave", onLeave);

    function draw(t: number) {
      s.raf = requestAnimationFrame(draw);
      s.t = t;
      const W = canvas!.width,
        H = canvas!.height;
      if (!s.base || !W || !H) return;

      const { mx, my, cols, rows, cs } = s;
      const hasCursor = mx >= 0;

      // ── Update springs ─────────────────────────────────────────────
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = s.cells[r * cols + c];
          if (!cell) continue;

          const ccx = c * cs + cs * 0.5;
          const ccy = r * cs + cs * 0.5;

          // Subtle idle breath — each cell offset slightly for organic feel
          const idle =
            (Math.sin(t * 0.00055 + c * 0.38 + r * 0.55) * 0.5 + 0.5) * 0.016;

          let target = idle;

          if (hasCursor) {
            const dx = ccx - mx,
              dy = ccy - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < FALLOFF) {
              const prox = 1 - dist / FALLOFF;
              // Gaussian-ish falloff: center fully sunk, edges barely dimple
              target = Math.max(target, Math.pow(prox, 1.7));
            }
          }

          const force = (target - cell.depth) * STIFFNESS;
          cell.vel = cell.vel * DAMPING + force;
          cell.depth = Math.max(0, Math.min(1, cell.depth + cell.vel));
        }
      }

      // ── Composite ─────────────────────────────────────────────────
      // 1. Paper + grid base (grid drawn once, pixel-aligned, uniform)
      ctx.drawImage(s.base, 0, 0);

      // 2. Depth cells
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = s.cells[r * cols + c];
          if (!cell || cell.depth < 0.018) continue;
          drawSunkCell(ctx, c * cs, r * cs, cs, cell.depth);
        }
      }

      // 3. Paper grain only — no grid lines re-stamped on top
      if (s.paper) {
        ctx.globalAlpha = 0.1;
        ctx.drawImage(s.paper, 0, 0);
        ctx.globalAlpha = 1;
      }
    }

    s.raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      footer.removeEventListener("mousemove", onMove);
      footer.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative px-[7%] pt-8 pb-16 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block", pointerEvents: "none" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-x-16 gap-y-6">
        <div className="self-start">
          <p className="font-script text-tagline italic leading-[1.15] text-[1.25rem] lg:text-[1.75rem]">
            The best stuff lives beneath
            <br />
            the surface
          </p>
          <p className="font-sans text-[10px] tracking-[0.04em] text-ink-muted mt-3">
            Handcrafted with Next.js + homemade matcha
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-14 gap-y-3 shrink-0 self-start">
          <TransitionLink
            href="/#work"
            className="font-sans font-normal text-[11px] tracking-[0.04em] uppercase text-ink hover:text-brown transition-colors"
          >
            Work
          </TransitionLink>
          <TransitionLink
            href="https://linkedin.com/in/srutigandreti"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-normal text-[11px] tracking-[0.04em] uppercase text-ink hover:text-brown transition-colors"
          >
            LinkedIn
          </TransitionLink>
          <TransitionLink
            href="/playground"
            className="font-sans font-normal text-[11px] tracking-[0.04em] uppercase text-ink hover:text-brown transition-colors"
          >
            Playground
          </TransitionLink>
          <TransitionLink
            href="https://drive.google.com/file/d/1e28HLgJMvz5ABegmsbyONla9EcvL7629/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-normal text-[11px] tracking-[0.04em] uppercase text-ink hover:text-brown transition-colors"
          >
            Resume
          </TransitionLink>
          <TransitionLink
            href="/about"
            className="font-sans font-normal text-[11px] tracking-[0.04em] uppercase text-ink hover:text-brown transition-colors"
          >
            About
          </TransitionLink>
          <TransitionLink
            href="mailto:sruti.gandreti@gmail.com"
            className="font-sans font-normal text-[11px] tracking-[0.04em] uppercase text-ink hover:text-brown transition-colors"
          >
            Contact
          </TransitionLink>
        </nav>
      </div>
    </footer>
  );
}
