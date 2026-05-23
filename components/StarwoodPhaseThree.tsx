"use client";

import { useEffect, useRef, useState } from "react";

type Key = "provenance" | "uncertainty" | "editable";

const SECTIONS: { title: string; body: string; id: Key }[] = [
  {
    title: "Provenance is a must",
    body: "Accountants reject any value that appears without a trail. Every AI extraction needed a visible citation, including the source document name and exact page number.",
    id: "provenance",
  },
  {
    title: "Show uncertainty",
    body: "Time is of the essence in a busy accountant's day. Confidence scores triage their attention.",
    id: "uncertainty",
  },
  {
    title: "Always editable",
    body: "Every AI extraction is a suggestion, never a final answer. Accountants can override any field by highlighting correct text in the source text or entering manual values. The system never commits without human approval.",
    id: "editable",
  },
];

const NM = '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif';

function ProvenanceVisual() {
  return (
    <div className="flex flex-col items-center gap-0">
      {/* Interest rate bubble — pulses */}
      <div
        className="sw-bubble-pulse rounded-full px-4 py-2.5"
        style={{
          background: "white",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        }}
      >
        <span
          style={{ fontFamily: NM, fontSize: "0.875rem", color: "#2a2a2a" }}
        >
          Interest Rate: 4.5%
        </span>
      </div>

      {/* Dashed line — gap above/below keeps it clear of both bubbles */}
      <div
        className="relative"
        style={{ width: "2px", height: "28px", margin: "6px 0" }}
      >
        {/* Static grey dashes */}
        <div
          style={{
            width: "1.5px",
            height: "100%",
            background:
              "repeating-linear-gradient(to bottom, #b0a898 0px, #b0a898 4px, transparent 4px, transparent 8px)",
          }}
        />
        {/* Traveling light */}
        <div className="sw-line-travel" />
      </div>

      {/* Source Document card — pulses when light arrives */}
      <div
        className="sw-card-pulse flex items-center gap-3 rounded-xl px-4 py-3"
        style={{ background: "#0475BA", minWidth: "240px" }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        <div>
          <p
            style={{
              fontFamily: NM,
              fontWeight: 500,
              fontSize: "0.875rem",
              color: "white",
              lineHeight: 1.3,
            }}
          >
            Source Document
          </p>
          <p
            style={{
              fontFamily: NM,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.3,
            }}
          >
            Credit Agreement.pdf — Page 47
          </p>
        </div>
      </div>
    </div>
  );
}

function UncertaintyVisual() {
  return (
    <div
      className="sw-conf-bubble rounded-full px-5 py-2.5"
      style={{
        background: "white",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontFamily: NM, fontSize: "0.875rem", color: "#2a2a2a" }}>
        Confidence:&nbsp;
      </span>
      <span
        style={{
          fontFamily: NM,
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "#0FA701",
        }}
      >
        97.5%
      </span>
    </div>
  );
}

function EditableVisual() {
  return (
    <div
      className="rounded-xl px-5 py-3 inline-block"
      style={{
        background: "white",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
      }}
    >
      <span
        style={{
          fontFamily: NM,
          fontSize: "0.875rem",
          color: "#2a2a2a",
          position: "relative",
          display: "inline-block",
        }}
      >
        <span className="sw-selection-bar" />
        JPMorgan Chase Bank, N.A.
      </span>
    </div>
  );
}

const VISUALS: Record<Key, React.FC> = {
  provenance: ProvenanceVisual,
  uncertainty: UncertaintyVisual,
  editable: EditableVisual,
};

export default function StarwoodPhaseThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      setActive(Math.min(2, Math.floor(progress * 3)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ height: "300vh" }}>
      <div
        className="sticky top-16 flex items-center overflow-hidden"
        style={{ height: "calc(100vh - 4rem)", background: "#eeebe3" }}
      >
        {/* Constrain to same max-width as page content */}
        <div className="w-full max-w-[1000px] mx-auto px-6 md:px-[60px]">
          <div className="relative" style={{ height: "340px" }}>
            {SECTIONS.map((s, i) => {
              const Visual = VISUALS[s.id];
              const isActive = active === i;
              const isPast = active > i;
              return (
                <div
                  key={s.id}
                  className="absolute inset-0"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `translateY(${isActive ? 0 : isPast ? -20 : 20}px)`,
                    transition: "opacity 500ms ease, transform 500ms ease",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 lg:gap-24 h-full">
                    {/* Left — text */}
                    <div className="flex-1 min-w-0">
                      <h3
                        style={{
                          fontFamily: NM,
                          fontWeight: 400,
                          fontSize: "clamp(1.75rem, 4vw, 3rem)",
                          color: "#8b6b41",
                          lineHeight: 1.1,
                          letterSpacing: "-0.02em",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: NM,
                          fontWeight: 400,
                          fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
                          color: "#5e5e5e",
                          lineHeight: 1.65,
                          maxWidth: "38ch",
                        }}
                      >
                        {s.body}
                      </p>
                    </div>

                    {/* Right — fixed-height anchor so every visual sits in the same zone */}
                    <div
                      className="shrink-0 flex items-center justify-center"
                      style={{ width: "260px", height: "160px" }}
                    >
                      <Visual />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
