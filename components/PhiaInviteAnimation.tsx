"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ── Loop timing (ms) ─────────────────────────────────────────────────────
// blue in → (gap) → typing in → (typing hold) → gray in (typing out) → hold → loop
const BLUE_IN = 250;
const TYPING_IN = 2000;
const GRAY_IN = 3900;
const LOOP_RESTART = 6600;

// iMessage incoming-bubble gray (sampled from the gray-text PNG) and the
// medium gray used for the animated typing dots.
const BUBBLE_GRAY = "#E5E5EA";
const DOT_GRAY = "#93939B";

// Natural pixel sizes of the two exported bubble PNGs.
const BLUE = { w: 1832, h: 636 };
const GRAY = { w: 1380, h: 275 };

// "Pop" used by every bubble as it enters — fade + slight rise + scale with a
// gentle overshoot, anchored to the bubble's own tail corner.
function pop(shown: boolean, origin: string) {
  return {
    opacity: shown ? 1 : 0,
    transform: shown
      ? "scale(1) translateY(0)"
      : "scale(0.82) translateY(10px)",
    transformOrigin: origin,
    transition:
      "opacity 320ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)",
    willChange: "opacity, transform",
  } as const;
}

export default function PhiaInviteAnimation() {
  const [blueIn, setBlueIn] = useState(false);
  const [typingIn, setTypingIn] = useState(false);
  const [grayIn, setGrayIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(() => !cancelled && fn(), ms));
    };

    const run = () => {
      if (cancelled) return;
      // fresh cycle
      setBlueIn(false);
      setTypingIn(false);
      setGrayIn(false);

      at(BLUE_IN, () => setBlueIn(true));
      at(TYPING_IN, () => setTypingIn(true));
      at(GRAY_IN, () => {
        setTypingIn(false);
        setGrayIn(true);
      });
      at(LOOP_RESTART, run);
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none">
      {/* Row 1 — blue invite, right-aligned */}
      <div className="flex justify-end">
        <div style={{ width: "76%", ...pop(blueIn, "bottom right") }}>
          <Image
            src="/images/phia-imessage-blue.png"
            alt="Text invite: Inviting you to Phia, a shopping app that tells you if you're getting a good deal."
            width={BLUE.w}
            height={BLUE.h}
            sizes="(max-width: 768px) 76vw, 426px"
            className="block w-full h-auto"
          />
        </div>
      </div>

      {/* Row 2 — gray reply, left-aligned. The gray PNG is always in flow so
          the row always reserves its height (no layout jump); the typing
          bubble is overlaid at the very same bottom-left origin and only the
          two opacities cross-fade. */}
      <div className="relative mt-3">
        {/* Gray reply (reserves the row height even while hidden) */}
        <div style={{ width: "54%", ...pop(grayIn, "bottom left") }}>
          <Image
            src="/images/phia-imessage-gray.png"
            alt="Reply: Ooh the app seems cool. Thanks for sharing Priya!"
            width={GRAY.w}
            height={GRAY.h}
            sizes="(max-width: 768px) 54vw, 302px"
            className="block w-full h-auto"
          />
        </div>

        {/* Typing bubble — pinned to the gray bubble's bottom-left corner so
            it sits exactly where the reply will land. */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            width: "15%",
            minWidth: "62px",
            maxWidth: "86px",
            ...pop(typingIn, "bottom left"),
          }}
          aria-hidden={!typingIn}
        >
          <svg viewBox="0 0 88 64" className="block w-full h-auto">
            {/* tail: small detached dot + larger blob (matches the gray PNG) */}
            <circle cx="6" cy="56" r="4" fill={BUBBLE_GRAY} />
            <circle cx="15" cy="45" r="11" fill={BUBBLE_GRAY} />
            {/* bubble body */}
            <rect
              x="12"
              y="4"
              width="70"
              height="44"
              rx="22"
              fill={BUBBLE_GRAY}
            />
            {/* three pulsing dots */}
            {[33, 47, 61].map((cx, i) => (
              <circle
                key={cx}
                cx={cx}
                cy="26"
                r="6"
                fill={DOT_GRAY}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: `phia-typing 1.2s ${i * 0.18}s ease-in-out infinite`,
                }}
              />
            ))}
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes phia-typing {
          0%, 60%, 100% { opacity: 0.35; transform: translateY(0) scale(0.9); }
          30% { opacity: 1; transform: translateY(-3px) scale(1); }
        }
      `}</style>
    </div>
  );
}
