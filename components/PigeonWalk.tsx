"use client";

import { useEffect, useRef, useState } from "react";

// Six frames: a right-facing and a left-facing set, each a 3-pose walk cycle.
// All are stacked and cross-toggled by opacity (loaded up front) so neither the
// leg cycle nor the direction swap ever flickers from a lazy-loaded src.
const FRAMES = {
  r: [
    "/images/pigeon-both-down-r-v6.png",
    "/images/pigeon-left-leg-up-r-v6.png",
    "/images/pigeon-right-leg-up-r-v6.png",
  ],
  l: [
    "/images/pigeon-both-down-l-v6.png",
    "/images/pigeon-left-leg-up-l-v6.png",
    "/images/pigeon-right-leg-up-l-v6.png",
  ],
} as const;

// Gait order: neutral (both down) between each stride for a believable waddle.
const SEQUENCE = [0, 1, 0, 2];
const FRAME_MS = 160; // leg-pose swap interval
const CYCLE_MS = 16000; // full there-and-back trip

export default function PigeonWalk() {
  const [{ pose, dir }, setState] = useState<{ pose: number; dir: "r" | "l" }>({
    pose: 0,
    dir: "r",
  });
  const moverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    const start = performance.now();
    let lastPose = -1;
    let lastDir: "r" | "l" = "r";

    const tick = (now: number) => {
      const elapsed = now - start;
      // phase 0→1 across one full trip; the first half moves right, the second
      // half moves left. progress is a 0→1→0 triangle = the bird's position.
      const phase = (elapsed % CYCLE_MS) / CYCLE_MS;
      const progress = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
      const dir: "r" | "l" = phase < 0.5 ? "r" : "l";
      const pose = SEQUENCE[Math.floor(elapsed / FRAME_MS) % SEQUENCE.length];

      // Position every frame via the CSS var (responsive, no React re-render).
      moverRef.current?.style.setProperty("--progress", String(progress));

      // Facing + pose come from the SAME clock, so they can't drift out of sync
      // with the motion. Only re-render when one of them actually changes.
      if (dir !== lastDir || pose !== lastPose) {
        lastDir = dir;
        lastPose = pose;
        setState({ pose, dir });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    // Track spans the footer's content width (inset to match its 7% gutter),
    // pinned to the bottom. The mover walks left→right→left inside it; the
    // facing direction switches between the -r and -l frame sets.
    <div className="pigeon-track" aria-hidden="true">
      <div className="pigeon-mover" ref={moverRef}>
        {(["r", "l"] as const).map((d) =>
          FRAMES[d].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className="pigeon-img"
              style={{ opacity: dir === d && pose === i ? 1 : 0 }}
            />
          )),
        )}
      </div>
    </div>
  );
}
