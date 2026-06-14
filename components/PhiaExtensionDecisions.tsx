"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";

type Decision = {
  id: 1 | 2 | 3 | 4;
  title: string;
  info: string[]; // paragraphs
  position: CSSProperties;
};

// Layout switches to a single-slide carousel below this viewport width
// (tablet + phone). Above it, the desktop overlay-bubble layout is used.
const MOBILE_BREAKPOINT = 1250;

const DECISIONS: Decision[] = [
  {
    id: 1,
    title: "Product context always visible",
    info: [
      "Product image, price, and brand stay in view entire time. No switching screens, no losing context.",
    ],
    // Top-right, aligned with the product card area
    position: { top: "18%", right: "-3%" },
  },
  {
    id: 2,
    title: "Make personal context optional",
    info: [
      "Sender's note gives the circle better signal to vote. But requiring it can kill the momentum of the moment.",
    ],
    // Aligned with the "Your comment (optional)" label, pushed further off
    // the right edge so it overlaps less with the comment input.
    // Nudged up + right by ~50% of the bubble's own height (~2.2em).
    position: { top: "calc(39% - 2.2em)", right: "calc(-20% - 2.2em)" },
  },
  {
    id: 3,
    title: "Default everyone in, allow opt out",
    info: [
      "Your full circle is toggled on by default. Removing someone is a lighter action than adding them. Fewer taps, faster send.",
    ],
    // Pushed to the complete left side of the extension so the compact title
    // sits in the grid-background area and doesn't intersect any extension
    // text. Anchored top-RIGHT (right: 86% mirrors the prior left: -30% rest
    // position) → bubble grows bottom-LEFT when expanded.
    position: { top: "50%", right: "86%" },
  },
  {
    id: 4,
    title: "Let sender set the urgency",
    info: [
      "Not every purchase has the same timeline. Sender controls the pressure so that the circle knows exactly how fast their opinion is needed.",
    ],
    // Lower section; anchored top-right so the bubble grows down-and-left
    // (title sits near the original spot, info unfurls toward bottom-left)
    position: { top: "70%", right: "-25%" },
  },
];

export default function PhiaExtensionDecisions() {
  // Desktop: free interaction — click bubbles to expand/collapse
  const [activeId, setActiveId] = useState<number | null>(null);
  // Mobile/tablet: carousel — 0 = landing (no bubble), 1–4 = decision slides
  const [carouselIdx, setCarouselIdx] = useState(0);
  // Viewport detection. Starts false → matches SSR; updated on mount.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Which decision's overlay PNG should be visible on the extension image.
  // Desktop: whichever bubble the user has clicked open.
  // Mobile: whichever carousel slide is showing (none on landing).
  const overlayActiveId = isMobile
    ? carouselIdx === 0
      ? null
      : carouselIdx
    : activeId;

  return (
    <div className="my-12">
      <div className="relative w-full max-w-[480px] mx-auto">
        {/* Base: whole extension UI */}
        <Image
          src="/images/phia-extension-whole.png"
          alt="Phia browser extension showing the Circle Vote interface"
          width={1995}
          height={3264}
          sizes="(max-width: 768px) 100vw, 480px"
          priority
          className="block w-full h-auto"
          style={{ maxWidth: "none" }}
        />

        {/* Cross-fade overlay: per-decision expanded PNG */}
        {DECISIONS.map((dec) => (
          <Image
            key={`png-${dec.id}`}
            src={`/images/phia-extension-decision-${dec.id}.png`}
            alt=""
            width={1995}
            height={3264}
            sizes="(max-width: 768px) 100vw, 480px"
            aria-hidden
            className="absolute inset-0 w-full h-auto transition-opacity duration-500 ease-out"
            style={{
              maxWidth: "none",
              opacity: overlayActiveId === dec.id ? 1 : 0,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Desktop: interactive bubble overlays.
            When any bubble is active, the others fade out completely so the
            spotlight stays on the chosen decision. */}
        {!isMobile &&
          DECISIONS.map((dec) => (
            <DecisionBubble
              key={`bubble-${dec.id}`}
              decision={dec}
              isActive={activeId === dec.id}
              isHidden={activeId !== null && activeId !== dec.id}
              onToggle={() =>
                setActiveId((cur) => (cur === dec.id ? null : dec.id))
              }
            />
          ))}

        {/* Mobile: carousel navigation arrows pinned to the image edges */}
        {isMobile && (
          <>
            <CarouselArrow
              direction="left"
              disabled={carouselIdx === 0}
              onClick={() => setCarouselIdx((i) => Math.max(0, i - 1))}
            />
            <CarouselArrow
              direction="right"
              disabled={carouselIdx === DECISIONS.length}
              onClick={() =>
                setCarouselIdx((i) => Math.min(DECISIONS.length, i + 1))
              }
            />
          </>
        )}

        {/* Mobile: decision explanation overlaps the bottom ~20% of the
            extension image (anchored to the image's bottom edge) instead of
            sitting below it. The bubble is scaled compact so it stays within
            that bottom band. */}
        {isMobile && carouselIdx > 0 && (
          <div
            className="absolute left-[4%] right-[4%] bottom-[3%]"
            aria-live="polite"
          >
            <MobileDecisionBubble
              // Re-mount on slide change so the dissolve-in animation replays
              key={carouselIdx}
              decision={DECISIONS[carouselIdx - 1]}
            />
          </div>
        )}
      </div>

      {/* Mobile: instruction text hugs the bottom of the extension image */}
      {isMobile && (
        <p
          className="text-center mt-2 px-4"
          style={{
            fontStyle: "italic",
            fontSize: "0.875rem",
            color: "#8F8F8F",
            fontFamily:
              '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
            fontWeight: 400,
          }}
        >
          Click the arrows on either side to see the decisions made
        </p>
      )}
    </div>
  );
}

function MobileDecisionBubble({ decision }: { decision: Decision }) {
  return (
    <div
      style={{
        backgroundColor: "#000",
        // Sized to sit within the bottom ~30% of the extension image it now
        // overlaps.
        padding: "0.85em 1em 0.95em",
        borderRadius: "13px",
        fontFamily: '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
        fontWeight: 500,
        fontSize: "clamp(0.72rem, 2.5vw, 0.95rem)",
        lineHeight: 1.25,
        color: "#fff",
        boxShadow: "0 6px 14px rgba(0,0,0,0.22), 0 18px 38px rgba(0,0,0,0.18)",
        // Whole bubble dissolves in each time it's re-mounted (parent uses
        // key={carouselIdx} so every arrow click triggers a fresh mount).
        animation: "dissolve-in 500ms ease-out both",
      }}
    >
      <div>
        <p style={{ fontWeight: 500, fontSize: "0.8em", color: "#8F8F8F" }}>
          Decision {decision.id}
        </p>
        <p style={{ fontWeight: 400, color: "#F0F0F0" }}>{decision.title}</p>
      </div>
      <div
        className="font-sans"
        style={{
          paddingTop: "0.8em",
          fontWeight: 400,
          lineHeight: 1.35,
          color: "#B7B7B7",
          fontFamily: '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {decision.info.map((para, i) => (
          <p
            key={i}
            className="font-sans"
            style={{
              marginTop: i === 0 ? 0 : "1em",
              fontFamily:
                '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
              fontWeight: 400,
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous decision" : "Next decision"}
      className="absolute top-1/2"
      style={{
        [direction === "left" ? "left" : "right"]: "8px",
        transform: "translateY(-50%)",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        color: "white",
        border: "none",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.25 : 1,
        zIndex: 40,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
        transition: "opacity 200ms ease",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {direction === "left" ? (
          <path d="M10 12L6 8l4-4" />
        ) : (
          <path d="M6 12l4-4-4-4" />
        )}
      </svg>
    </button>
  );
}

function DecisionBubble({
  decision,
  isActive,
  isHidden,
  onToggle,
}: {
  decision: Decision;
  isActive: boolean;
  isHidden: boolean;
  onToggle: () => void;
}) {
  // Bubbles anchored to the bottom should grow UPWARD (info appears above the
  // title so the title stays pinned where it was originally clicked).
  const growsUp = decision.position.bottom !== undefined;

  const titleRow = (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p
          style={{
            fontWeight: 500,
            fontSize: "0.8em",
            color: "#8F8F8F",
          }}
        >
          Decision {decision.id}
        </p>
        <p
          style={{
            fontWeight: 400,
            color: "#F0F0F0",
          }}
        >
          {decision.title}
        </p>
      </div>
      <span
        aria-hidden
        className="flex-shrink-0"
        style={{ marginTop: "0.1em" }}
      >
        {isActive ? <CollapseIcon /> : <ExpandIcon />}
      </span>
    </div>
  );

  const infoReveal = (
    // grid-template-rows: 0fr → 1fr animates from 0 to the content's NATURAL
    // height (not an arbitrary max). That makes the visible height change
    // track the transition curve frame-for-frame, so height + width collapse
    // along a true diagonal — not "width shrinks, then height clips at the
    // end" (which is what max-height: 480 → 0 produces, since most of the
    // animation is spent above the actual content height).
    <div
      className="font-sans"
      style={{
        display: "grid",
        gridTemplateRows: isActive ? "1fr" : "0fr",
        opacity: isActive ? 1 : 0,
        // Same easing + duration as the button's width transition so they
        // animate as a single diagonal motion. Opacity is delayed on expand
        // (text fades in after the box opens) and quick on collapse (text
        // disappears before clipping is visible).
        transition: isActive
          ? "grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease-out 100ms"
          : "grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease-out",
        // Regular (400) so it visually reads as the same PP Neue used in body
        // text — the parent button is Medium (500), which can read as a
        // different typeface to the eye.
        fontWeight: 400,
        lineHeight: 1.35,
        color: "#B7B7B7",
        fontFamily: '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
      }}
    >
      <div style={{ overflow: "hidden", minHeight: 0 }}>
        <div
          style={growsUp ? { paddingBottom: "1.1em" } : { paddingTop: "1.1em" }}
        >
          {decision.info.map((para, i) => (
            <p
              key={i}
              className="font-sans"
              style={{
                marginTop: i === 0 ? 0 : "1em",
                fontFamily:
                  '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                fontWeight: 400,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isActive}
      aria-hidden={isHidden}
      tabIndex={isHidden ? -1 : 0}
      aria-label={`Decision ${decision.id}: ${decision.title}. ${
        isActive ? "Collapse" : "Expand"
      }`}
      className="absolute text-left text-white rounded-[14px] border-0 cursor-pointer"
      style={{
        ...decision.position,
        backgroundColor: "#000",
        padding: "1em 1.15em 1.1em",
        fontFamily: '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
        fontWeight: 500,
        fontSize: "clamp(0.7rem, 1.55vw, 0.9rem)",
        lineHeight: 1.25,
        // Width AND height grow when expanded. Because each bubble's
        // position anchors one corner (top+right, top+left, or bottom+left),
        // the opposite corner moves out — bubble unfurls diagonally away
        // from its anchor (e.g. Decision 1 anchored top-right grows toward
        // the bottom-left).
        width: isActive ? "min(82%, 360px)" : "min(60%, 280px)",
        boxShadow: "0 6px 14px rgba(0,0,0,0.22), 0 18px 38px rgba(0,0,0,0.18)",
        zIndex: isActive ? 30 : 20,
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? "none" : "auto",
        transition:
          "width 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease-out",
      }}
    >
      {growsUp ? (
        <>
          {infoReveal}
          {titleRow}
        </>
      ) : (
        <>
          {titleRow}
          {infoReveal}
        </>
      )}
    </button>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Two diagonal arrows pointing outward (up-right / down-left) */}
      <path d="M9 2h5v5" />
      <path d="M14 2L9 7" />
      <path d="M7 14H2v-5" />
      <path d="M2 14l5-5" />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Two diagonal arrows pointing inward (toward center) */}
      <path d="M14 2L9 7M9 7V2.5M9 7h4.5" />
      <path d="M2 14l5-5M7 9v4.5M7 9H2.5" />
    </svg>
  );
}
