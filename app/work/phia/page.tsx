import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Phia — Reimagining Decision Confidence While Shopping",
  description:
    "Shoppers waste hours deciding whether to buy. This is the trust-based voting system I researched and designed in 24 hours that transforms solo shopping into collaborative decision-making, keeping every choice in the shopper's control while creating a new growth engine.",
};

const meta = [
  { label: "Timeline", value: "April 2026" },
  { label: "Role", value: "Product Designer" },
  { label: "With", value: "Phia Team\nDesign Meetup" },
  {
    label: "Disciplines",
    value:
      "Product Design\nInteraction Design\nVisual Design\nPrototyping\nStakeholder Presentation",
  },
];

export default function PhiaCaseStudy() {
  return (
    <div className="bg-beige min-h-screen">
      <Header bg="bg-beige/90" />

      {/* ── Banner ─────────────────────────────────────────────────────── */}
      <div className="w-full mt-[56px] md:mt-[64px] px-6 md:px-12 lg:px-20">
        <div
          className="relative w-full max-w-[1400px] mx-auto"
          style={{ aspectRatio: "2.5/1" }}
        >
          <Image
            src="/images/phia-banner.png"
            alt="Phia"
            fill
            className="object-contain"
            priority
            quality={95}
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>
      </div>

      {/* ── Page content wrapper: 1000px max, 60px gutter ──────────────── */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-[60px]">
        <main className="pt-14 pb-20">
          {/* Title */}
          <h1
            className="font-display font-light leading-tight mb-6"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              color: "#5e5e5e",
            }}
          >
            Reimagining Decision Confidence in{" "}
            <strong className="font-bold" style={{ color: "#8b6b41" }}>
              Phia&apos;s
            </strong>{" "}
            Shopping Experience
          </h1>

          {/* Lede */}
          <p
            className="font-sans font-normal leading-relaxed mb-12"
            style={{
              fontSize: "clamp(1.025rem, 1.75vw, 1.175rem)",
              color: "#5e5e5e",
            }}
          >
            Shoppers waste hours deciding whether to buy. This is the
            trust-based voting system I researched and designed in 24 hours that
            transforms solo shopping into collaborative decision-making, keeping
            every choice in the shopper&apos;s control while creating a new
            growth engine.
          </p>

          {/* Meta table */}
          <div
            className="grid gap-y-3 mb-14 border-t border-b py-8"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              borderColor: "rgba(94,94,94,0.15)",
            }}
          >
            {meta.map(({ label, value }) => (
              <div key={label} className="pr-4">
                <p
                  className="font-display font-extralight uppercase tracking-widest mb-2"
                  style={{ fontSize: "0.775rem", color: "#8b6b41" }}
                >
                  {label}
                </p>
                {value.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className="font-sans font-normal leading-snug"
                    style={{ fontSize: "0.905rem", color: "#5e5e5e" }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* ── Under Construction ─────────────────────────────────────── */}
          <div className="phia-glow-wrap relative">
            <Image
              src="/images/phia-under-construction.png"
              alt="Under construction"
              width={2000}
              height={1000}
              className="w-full h-auto block relative z-10"
              unoptimized
            />
          </div>
        </main>
      </div>

      <Footer />

      <style>{`
        @property --phia-glow-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .phia-glow-wrap::before,
        .phia-glow-wrap::after {
          content: '';
          position: absolute;
          top: -2px;
          left: calc(0.422% - 2px);
          right: calc(0.422% - 2px);
          bottom: calc(2.95% - 2px);
          border-radius: 2.1% / 7.3%;
          padding: 2px;
          pointer-events: none;
          background: conic-gradient(
            from var(--phia-glow-angle),
            transparent 0deg,
            transparent 140deg,
            rgba(212, 165, 96, 0.35) 165deg,
            rgba(244, 208, 130, 0.95) 180deg,
            rgba(255, 235, 175, 1) 185deg,
            rgba(244, 208, 130, 0.95) 195deg,
            rgba(212, 165, 96, 0.35) 215deg,
            transparent 240deg,
            transparent 360deg
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
          animation: phia-glow-trace 4s linear infinite;
        }

        .phia-glow-wrap::before {
          filter: blur(2px);
          z-index: 11;
        }

        .phia-glow-wrap::after {
          top: -6px;
          left: calc(0.422% - 6px);
          right: calc(0.422% - 6px);
          bottom: calc(2.95% - 6px);
          padding: 6px;
          border-radius: 2.4% / 8.5%;
          filter: blur(10px);
          opacity: 0.75;
          z-index: 9;
        }

        @keyframes phia-glow-trace {
          to { --phia-glow-angle: 360deg; }
        }

        @media (prefers-reduced-motion: reduce) {
          .phia-glow-wrap::before,
          .phia-glow-wrap::after {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
