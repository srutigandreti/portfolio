"use client";

import { useEffect, useState } from "react";

// How many pixels of upward scroll from the bottom take the opacity from
// 1 → 0. Larger value = slower / more gradual fade.
const FADE_RANGE_PX = 360;

/**
 * "Back to Top" pill. Rendered in normal page flow — drop it after the
 * last content section and before the Footer in each case study. The pill
 * fades in as the user reaches the bottom of the page and gradually fades
 * back out as they scroll up.
 */
export default function BackToTopButton() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let scheduled = false;
    let rafId = 0;

    const update = () => {
      scheduled = false;
      const docH = document.documentElement.scrollHeight;
      const viewportH = window.innerHeight;
      const maxScroll = Math.max(0, docH - viewportH);
      if (maxScroll === 0) {
        setOpacity(0);
        return;
      }
      const distanceFromBottom = maxScroll - window.scrollY;
      // 1 at the bottom; linearly down to 0 over FADE_RANGE_PX of upward scroll.
      setOpacity(
        Math.max(0, Math.min(1, 1 - distanceFromBottom / FADE_RANGE_PX)),
      );
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const interactive = opacity > 0.05;

  return (
    <div className="flex justify-center py-8 md:py-12">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={interactive ? 0 : -1}
        aria-hidden={!interactive}
        className="text-black border-0 cursor-pointer rounded-full inline-flex items-center hover:opacity-80"
        style={{
          backgroundColor: "rgba(182, 218, 235, 0.5)",
          fontFamily: "var(--font-retrogression), cursive",
          // Single source of truth — everything else is em-based off this.
          fontSize: "clamp(1.1rem, 2.6vw, 1.6rem)",
          lineHeight: 1.2,
          padding: "0.4em 1.2em",
          gap: "0.5em",
          opacity,
          pointerEvents: interactive ? "auto" : "none",
          transition: "opacity 120ms linear",
        }}
      >
        {/* Symmetric stepped-pyramid tree icon — equal steps on each side. */}
        <svg
          aria-hidden
          width="0.65em"
          height="0.7em"
          viewBox="0 0 9 8"
          fill="currentColor"
          shapeRendering="crispEdges"
          style={{ flexShrink: 0 }}
        >
          {/* 5 canopy tiers, each 1 unit tall, widening by 1 step on EACH
              side — perfect triangular pyramid */}
          <rect x="4" y="0" width="1" height="1" />
          <rect x="3" y="1" width="3" height="1" />
          <rect x="2" y="2" width="5" height="1" />
          <rect x="1" y="3" width="7" height="1" />
          <rect x="0" y="4" width="9" height="1" />
          {/* trunk */}
          <rect x="4" y="5" width="1" height="3" />
        </svg>
        <span>Back to Top</span>
      </button>
    </div>
  );
}
