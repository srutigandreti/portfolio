"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NOTIFS = [
  "/images/showcase/notif-1.png",
  "/images/showcase/notif-2.png",
  "/images/showcase/notif-3.png",
  "/images/showcase/notif-4.png",
  "/images/showcase/notif-5.png",
];

const HEADSHOTS = Array.from(
  { length: 9 },
  (_, i) => `/images/showcase/headshot-${i + 1}.png`,
);

const PILLARS = [
  "Warmth over urgency",
  "Transparency always",
  "Compatibility over volume",
] as const;

function PillarHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-sans font-medium mb-5 text-center"
      style={{
        fontSize: "clamp(1rem, 1.6vw, 1.35rem)",
        color: "#8b6b41",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h3>
  );
}

function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative aspect-[3/4] overflow-hidden rounded-md"
      style={{ backgroundColor: "#f5f0e6" }}
    >
      {children}
    </div>
  );
}

/** Returns true while the referenced element is intersecting the viewport
 *  past the given threshold. A single section-level observer keeps all
 *  panels' animations in lockstep. */
function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export default function MysaPillars() {
  // Single observer on the whole pillars section — all three panels start their
  // animations on the same tick so transitions stay in sync.
  const [sectionRef, inView] = useInView<HTMLElement>(0.2);

  return (
    <section ref={sectionRef} className="w-full px-6 md:px-10 lg:px-16 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-[1000px] mx-auto">
        {/* ── Panel 1: Warmth over urgency ──────────────────────────────── */}
        <div>
          <PillarHeader>{PILLARS[0]}</PillarHeader>
          <PanelShell>
            <Image
              src="/images/showcase/notif-bg.png"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* 5-notification stack — wrapper fills full panel so translateY(±100%) = full panel height */}
            <div
              className={`absolute inset-0 px-[5%] pt-[4%] ${inView ? "mysa-p1-cards" : ""}`}
            >
              <div className="flex flex-col gap-[10px] md:gap-[12px]">
                {NOTIFS.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt=""
                    width={1200}
                    height={274}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 90vw, 30vw"
                  />
                ))}
              </div>
            </div>

            {/* Single Mysa notification — same full-panel wrapper, content pinned at top */}
            <div
              className={`absolute inset-0 px-[5%] pt-[4%] mysa-p1-mysa-base ${inView ? "mysa-p1-mysa" : ""}`}
            >
              <Image
                src="/images/showcase/mysa-notif.png"
                alt="Mysa notification — Someone worth your time just arrived."
                width={1200}
                height={274}
                className="w-full h-auto"
                sizes="(max-width: 768px) 90vw, 30vw"
              />
            </div>
          </PanelShell>
        </div>

        {/* ── Panel 2: Transparency always ──────────────────────────────── */}
        <div>
          <PillarHeader>{PILLARS[1]}</PillarHeader>
          <PanelShell>
            {/* Layer A: header + 3×3 headshot grid */}
            <div className="absolute inset-0 p-[7%] flex flex-col gap-[4%]">
              <h4
                className={`mysa-p2-upgrade mysa-p2-grid-base font-sans font-medium text-left ${inView ? "mysa-p2-header" : ""}`}
                style={{
                  color: "#1a1a1a",
                  letterSpacing: "-0.005em",
                }}
              >
                Upgrade to see who already liked you.
              </h4>
              <div className="grid grid-cols-3 gap-[4%] flex-1">
                {HEADSHOTS.map((src, i) => (
                  <div
                    key={i}
                    className={`mysa-p2-headshot-base relative ${inView ? "mysa-p2-headshot" : ""}`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 30vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Layer B-1: "Your match this week" header text — smaller, higher up */}
            <div
              className={`absolute inset-x-0 top-[10%] flex justify-start px-[7%] mysa-p2-match-base ${inView ? "mysa-p2-match-header" : ""}`}
            >
              <div
                className="relative w-[55%]"
                style={{ aspectRatio: "1648/236" }}
              >
                <Image
                  src="/images/showcase/match-this-week-text.png"
                  alt="Your match this week"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 55vw, 18vw"
                />
              </div>
            </div>

            {/* Layer B-2: Mysa person card — explicit width + aspect, positioned with breathing room */}
            <div
              className={`absolute inset-x-0 top-[22%] flex justify-center mysa-p2-match-base ${inView ? "mysa-p2-match-card" : ""}`}
            >
              <div
                className="relative"
                style={{ width: "42%", aspectRatio: "1184/1664" }}
              >
                <Image
                  src="/images/showcase/mysa-person-card.png"
                  alt="Match — Gia, 22, Product Manager at Figma"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 18vw"
                />
              </div>
            </div>

            {/* Layer B-3: CSS ellipse — wide oval, ~65% below panel edge, curved-horizon effect */}
            <div
              className={`absolute inset-0 mysa-p2-match-base ${inView ? "mysa-p2-ellipse" : ""}`}
            >
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: "-60%",
                  right: "-60%",
                  height: "75%",
                  bottom: "-47%",
                  borderRadius: "50%",
                  background: "linear-gradient(to bottom, #D1BA7F, #5D5F06)",
                  paddingTop: "6%",
                  paddingLeft: "33%",
                  paddingRight: "33%",
                  gap: "10px",
                }}
              >
                <p
                  className="mysa-ellipse-title"
                  style={{
                    fontFamily: '"GT Super Display", serif',
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.85)",
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  You matched because
                </p>
                <p
                  className="mysa-ellipse-body"
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 500,
                    color: "white",
                    lineHeight: 1.5,
                    textAlign: "center",
                  }}
                >
                  You both described your ideal week the same way.
                  <br />
                  Full of work you care about, no rush, movie nights.
                </p>
              </div>
            </div>
          </PanelShell>
        </div>

        {/* ── Panel 3: Compatibility over volume ────────────────────────── */}
        <div>
          <PillarHeader>{PILLARS[2]}</PillarHeader>
          <PanelShell>
            {/* State A: stacked photocards + "50+" badge with shimmer */}
            <div
              className={`absolute inset-0 flex items-center justify-center mysa-p3-card-base ${inView ? "mysa-p3-card" : ""}`}
            >
              <div className="relative w-[68%] aspect-[1100/969]">
                <Image
                  src="/images/showcase/photocards-50plus.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 60vw, 22vw"
                />
                {/* Badge — centered on the front (white-outlined) card */}
                <div
                  className="absolute overflow-hidden rounded-full"
                  style={{
                    width: "44%",
                    aspectRatio: "600/243",
                    left: "40%",
                    top: "93%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Image
                    src="/images/showcase/badge-50plus.png"
                    alt="50+ likes"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 30vw, 12vw"
                  />
                  {/* Shimmer sweep */}
                  <div
                    className={`absolute inset-y-0 left-0 w-[40%] ${inView ? "mysa-p3-shine" : ""}`}
                    style={{
                      background:
                        "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* State B: orb that fills with yellow + "91% compatibility" text */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 mysa-p3-orb-base ${inView ? "mysa-p3-orb" : ""}`}
            >
              {/* Orb: green bg clipped to circle; yellow fill sits above the clip so when
                  inset(0 0 0 0) is reached the PNG's own wavy top silhouette shows. */}
              <div className="relative w-[40%] aspect-square">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src="/images/showcase/orb-green-bg.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 35vw, 13vw"
                  />
                </div>
                <div
                  className={`absolute inset-0 mysa-p3-fill-base ${inView ? "mysa-p3-orb-fill" : ""}`}
                >
                  <Image
                    src="/images/showcase/orb-yellow-fill.png"
                    alt=""
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 768px) 35vw, 13vw"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[34%] aspect-[300/274]">
                    <Image
                      src="/images/showcase/m-icon.png"
                      alt=""
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 11vw, 5vw"
                    />
                  </div>
                </div>
              </div>

              {/* Compatibility caption — Poppins medium for headline, regular for sub */}
              <div className="text-center mt-1">
                <p
                  className="mysa-p3-compat-title"
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 500,
                    color: "#9CA000",
                    letterSpacing: "-0.01em",
                  }}
                >
                  91% compatibility
                </p>
                <p
                  className="mysa-p3-compat-sub"
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 400,
                    color: "#B7BA01",
                  }}
                >
                  on what matters
                </p>
              </div>
            </div>
          </PanelShell>
        </div>
      </div>
    </section>
  );
}
