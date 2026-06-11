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

// Blue of the "Your circle is leaning yes" bar in the voting-start image.
// Tweak if it doesn't perfectly match — used to cover the baked-in
// "6 hrs remaining" text and ring so the live, animated version replaces it.
const BAR_BLUE = "#084BE7";

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
            ? "/images/phia-voting-start-v9.png"
            : phase === "middle"
              ? "/images/phia-voting-middle-v2.png"
              : "/images/phia-voting-end-v6.png"
        }
        alt="Phia voting state — circle responses arriving in real time"
        width={1971}
        height={3240}
        sizes="(max-width: 768px) 100vw, 640px"
        className="block w-full h-auto"
        style={{ maxWidth: "none" }}
      />

      {/* Full blue banner overlay — covers the baked-in bar in BOTH
          images. Spans the bar's full width, renders the live left-side
          headline + right-side state (countdown ring during start,
          completion check during end). */}
      <div
        className="absolute flex items-center justify-between"
        style={{
          top: "76%",
          left: "15%",
          right: "15%",
          paddingTop: ".55em",
          paddingBottom: ".55em",
          paddingLeft: "0.9em",
          paddingRight: "0.5em",
          backgroundColor: BAR_BLUE,
          color: "white",
          fontFamily: '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
          // 400 → PPNeueMontreal-Regular.otf. Anything outside 400/500 with
          // font-synthesis:none falls back to ui-sans-serif (much heavier).
          fontWeight: 400,
          // Container-query based: 2.4cqw = 2.4% of the parent wrapper's
          // width (NOT viewport). On every viewport ≥ ~700px the wrapper
          // hits its 640px cap, so 2.4cqw resolves to ~15.4px — clamped at
          // 0.94rem so it stays exactly the same as the desktop look.
          // On narrower mobile viewports the wrapper shrinks proportionally,
          // and so does the font — the bar/text ratio stays identical at
          // every size for a unified responsive look. Floor at 0.7rem
          // (~11px) so the text never drops below readability on tiny
          // phones.
          fontSize: "clamp(0.7rem, 2.4cqw, 0.94rem)",
          lineHeight: 1,
          borderRadius: "999px",
          whiteSpace: "nowrap",
        }}
      >
        {/* Left headline. The mood word ("yes" / "get it") is medium-
            weight (500) so it pops against the regular-weight setup.
            min-width:0 lets it shrink below its content's min-content size
            if the bar is narrow, but whiteSpace:nowrap keeps it on a
            single line (overflowing the pill is preferable to wrapping). */}
        <span
          style={{
            transition: "opacity 250ms ease",
            whiteSpace: "nowrap",
            minWidth: 0,
          }}
        >
          {phase === "end" ? (
            <>
              Your circle says: <span style={{ fontWeight: 500 }}>get it</span>
            </>
          ) : (
            <>
              Your circle is leaning{" "}
              <span style={{ fontWeight: 500 }}>yes</span>
            </>
          )}
        </span>

        {/* Right side: countdown + ring (start) OR "Voting complete" + check (end).
            flex-shrink:0 so this group never collapses below its natural
            width — the headline (which CAN shrink) absorbs any tight fit. */}
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
              // ~2pt smaller than the headline (same ratio used on the
              // Decision bubble subtext where -4pt = 0.8em).
              fontSize: "0.9em",
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
