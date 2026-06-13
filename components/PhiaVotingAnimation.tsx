"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Loop timing
const COUNTDOWN_HOURS = 6;
const COUNTDOWN_MS = 3000; // 6→0 over 3 seconds (500ms per tick)
const END_HOLD_MS = 2000; // hold the end image for 2s before looping
// When hours hit this value the image swaps from 'start' to 'middle'
// (the middle PNG then stays until the countdown reaches 0).
const MIDDLE_AT_HOURS = 3;
const MIDDLE_SWITCH_MS =
  COUNTDOWN_MS * ((COUNTDOWN_HOURS - MIDDLE_AT_HOURS) / COUNTDOWN_HOURS); // 1500ms

// SVG ring geometry (units inside the viewBox; rendered via em so it scales
// with the surrounding text)
const RING_RADIUS = 8;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function PhiaVotingAnimation() {
  const [phase, setPhase] = useState<"start" | "middle" | "end">("start");
  const [hours, setHours] = useState(COUNTDOWN_HOURS);
  const [ringDepleted, setRingDepleted] = useState(false);

  // Loop driver runs ONCE on mount and uses a setTimeout chain so the
  // countdown ticker keeps running uninterrupted as `phase` transitions
  // from start → middle (the ring depletion is a single CSS transition
  // over the full COUNTDOWN_MS, and the tick interval must not reset at
  // the start→middle boundary or the hours would skip).
  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const runCycle = () => {
      if (cancelled) return;

      // Reset everything for a fresh cycle
      setPhase("start");
      setHours(COUNTDOWN_HOURS);
      setRingDepleted(false);

      // Kick the ring transition off on a second frame so the browser
      // sees a state change to interpolate against.
      const raf1 = window.requestAnimationFrame(() => {
        const raf2 = window.requestAnimationFrame(() => {
          if (!cancelled) setRingDepleted(true);
        });
        timers.push(raf2);
      });
      timers.push(raf1);

      // Tick hours down every 500ms across BOTH start and middle phases.
      const tickInterval = COUNTDOWN_MS / COUNTDOWN_HOURS;
      const tick = window.setInterval(() => {
        if (cancelled) {
          window.clearInterval(tick);
          return;
        }
        setHours((h) => Math.max(0, h - 1));
      }, tickInterval);

      // Swap to the middle image at the half-way mark (3 hrs left).
      const middleTimer = window.setTimeout(() => {
        if (!cancelled) setPhase("middle");
      }, MIDDLE_SWITCH_MS);
      timers.push(middleTimer);

      // When the countdown hits 0, stop ticking and swap to end image.
      const endTimer = window.setTimeout(() => {
        if (cancelled) return;
        window.clearInterval(tick);
        setPhase("end");
      }, COUNTDOWN_MS);
      timers.push(endTimer);

      // After the end-hold, restart the whole cycle.
      const loopTimer = window.setTimeout(() => {
        runCycle();
      }, COUNTDOWN_MS + END_HOLD_MS);
      timers.push(loopTimer);
    };

    runCycle();

    return () => {
      cancelled = true;
      // Clear every scheduled timer / animation frame (both types share
      // the numeric handle space on web, so a best-effort clear of both
      // is safe — wrong-type calls are no-ops).
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
        window.cancelAnimationFrame(t);
      });
    };
  }, []);

  return (
    <div
      className="relative w-full max-w-[640px] mx-auto"
      // Container query context — lets the blue-bar font size scale with
      // THIS wrapper's width (cqw) instead of viewport width (vw). Result:
      // identical look on desktop, tablet, and phone because the bar text
      // is sized relative to the bar's own container, not the screen.
      style={{ containerType: "inline-size" }}
    >
      <Image
        src={
          phase === "start"
            ? "/images/phia-voting-start-v11.png"
            : phase === "middle"
              ? "/images/phia-voting-middle-v4.png"
              : "/images/phia-voting-end-v8.png"
        }
        alt="Phia voting state — circle responses arriving in real time"
        width={1971}
        height={2625}
        sizes="(max-width: 768px) 100vw, 640px"
        className="block w-full h-auto"
        style={{ maxWidth: "none" }}
      />

      {/* Live countdown timer — a short blue pill anchored to the RIGHT end
          of the baked-in bar (not a full-width cover), so the bar's baked-in
          "Your circle is leaning yes" / "says: get it" text stays visible.
          Its background is the exact bar blue (#084BE7) and it sits within
          the bar's height, so it blends seamlessly — only the white ring +
          "X hrs remaining" reads on top. At the end it shows the check.
          Vertically centred on the bar (bar centre ≈ 77.9% of the image). */}
      <div
        className="absolute flex items-center"
        style={{
          top: "77.89%",
          right: "16.5%",
          transform: "translateY(-50%)",
          // No background — the label sits directly on the baked-in blue bar,
          // so there's no pill to poke past the bar's rounded bottom edge.
          // Slightly muted white so the live label sits a touch softer than
          // the baked-in text rather than glaring pure-white.
          color: "rgba(255,255,255,0.78)",
          fontFamily: '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
          // 400 → PPNeueMontreal-Regular.otf. Anything outside 400/500 with
          // font-synthesis:none falls back to ui-sans-serif (much heavier).
          fontWeight: 400,
          // PURE cqw (no rem clamp): the font is a fixed % of the wrapper
          // width, exactly like the baked-in bar, so the text scales in
          // lockstep with the bar across all window sizes. Sized to the
          // baked-in bar text: Figma 12px in the 657px design frame = 1.83cqw.
          fontSize: "1.83cqw",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {/* Countdown + ring (start/middle) OR "Voting complete" + check (end). */}
        <div
          className="flex items-center"
          style={{
            gap: "0.45em",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              transition: "opacity 250ms ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
              // Matches the baked-in bar text exactly (1em = 1.83cqw = 12px).
              fontSize: "1em",
            }}
          >
            {phase === "end" ? "Voting complete" : `${hours} hrs remaining`}
          </span>
          {phase !== "end" ? (
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 20 20"
              style={{ transform: "rotate(-90deg)", display: "block" }}
              aria-hidden
            >
              {/* Inner disc — sized so its outer edge meets the ring
                  stroke's INNER edge (ring r=8, strokeWidth=1.8 → inner
                  edge at r=7.1). No gap between the lighter-blue disc
                  and the white ring. */}
              <circle
                cx="10"
                cy="10"
                r="7.1"
                fill="white"
                fillOpacity={0.3}
                stroke="none"
              />
              {/* Depleting arc — full → empty over the countdown */}
              <circle
                cx="10"
                cy="10"
                r={RING_RADIUS}
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={ringDepleted ? RING_CIRCUMFERENCE : 0}
                style={{
                  transition: ringDepleted
                    ? `stroke-dashoffset ${COUNTDOWN_MS}ms linear`
                    : "none",
                }}
              />
            </svg>
          ) : (
            // White-ring + lighter-blue inner disc + white check.
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 20 20"
              style={{ display: "block" }}
              aria-hidden
            >
              {/* Inner disc — outer edge meets the ring stroke's inner
                  edge (no gap, matches the attachment). */}
              <circle cx="10" cy="10" r="7.1" fill="white" fillOpacity={0.3} />
              {/* Outer white ring */}
              <circle
                cx="10"
                cy="10"
                r={RING_RADIUS}
                fill="none"
                stroke="white"
                strokeWidth="1.8"
              />
              {/* Check — sized to fit within the inner disc */}
              <path
                d="M7 10.4l2 2L13 8"
                fill="none"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
