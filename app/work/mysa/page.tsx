import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MysaPillars from "@/components/MysaPillars";

export const metadata: Metadata = {
  title: "Mysa — Building Visual Identity",
  description:
    "Mysa reached 15,000 signups in its first month — driven mostly by social marketing. This is the brand I built from scratch that made it possible.",
};

const meta = [
  { label: "Timeline", value: "Aug – Dec 2025" },
  { label: "Role", value: "Creative Director" },
  { label: "With", value: "Ankitha Chinthalgattu\n(Founder)" },
  {
    label: "Disciplines",
    value: "Brand Identity\nCreative Direction\nUX Design\nVisual Storytelling",
  },
];

export default function MysaCaseStudy() {
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
            src="/images/mysa-banner-v4.png"
            alt="Mysa"
            fill
            className="object-contain"
            priority
            quality={95}
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>
      </div>

      {/* ── Page content wrapper: 1400px max, 60px gutter ──────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
        {/* ── Text content: narrows to 850px, centered ──────────────────── */}
        <main className="max-w-[850px] mx-auto pt-14 pb-0">
          {/* Title */}
          <h1
            className="font-display font-light leading-tight mb-6"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              color: "#5e5e5e",
            }}
          >
            Building Visual Identity at{" "}
            <strong className="font-bold" style={{ color: "#8b6b41" }}>
              Mysa
            </strong>
          </h1>

          {/* Lede */}
          <p
            className="font-sans font-normal leading-relaxed mb-12"
            style={{
              fontSize: "clamp(1.025rem, 1.75vw, 1.175rem)",
              color: "#5e5e5e",
            }}
          >
            Mysa reached 15,000 signups in its first month — driven mostly by
            social marketing. This is the brand I built from scratch that made
            it possible.
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

          {/* ── The Challenge ───────────────────────────────────────── */}
          <section className="mb-0">
            <h2
              className="font-display font-medium mb-4"
              style={{ fontSize: "1rem", color: "#8b6b41" }}
            >
              The Challenge
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              You pour everything into your career. So why should finding
              connection feel like even more work?
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Ambitious singles already give everything to their work. Dating
              should be the one place that shouldn&apos;t drain them. Mysa is an
              early-stage AI dating startup built for people who don&apos;t have
              time to waste, designed from the ground up to feel like a soft
              place to land.
            </p>
          </section>

          {/* ── Challenge Visual ────────────────────────────────────── */}
          <div className="mt-14">
            <Image
              src="/images/mysa-popup-2.png"
              alt="You have 12 new matches today"
              width={7598}
              height={1601}
              className="w-full"
              style={{ maxWidth: "640px" }}
              unoptimized
            />
            <p
              className="font-sans font-bold text-black pt-8 pb-10"
              style={{
                fontSize: "clamp(2.6rem, 7.5vw, 5rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.025em",
              }}
            >
              but you have no time.
            </p>
          </div>

          {/* ── What does Mysa mean? ────────────────────────────────── */}
          <section className="mt-10 mb-12">
            <h2
              className="font-display font-medium mb-4"
              style={{ fontSize: "1rem", color: "#8b6b41" }}
            >
              What does Mysa mean?
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Pronounced &ldquo;mee-sah,&rdquo; Mysa comes from the Swedish
              concept of coziness, comfort, and emotional warmth.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              It&apos;s the feeling of being safe, understood, and completely at
              ease. That feeling sits at the heart of how we think dating should
              feel.
            </p>
          </section>

          {/* ── Owning Design ───────────────────────────────────────── */}
          <section className="mt-10 mb-12">
            <h2
              className="font-display font-medium mb-4"
              style={{ fontSize: "1rem", color: "#8b6b41" }}
            >
              Owning Design
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <p
                className="font-sans font-normal leading-relaxed"
                style={{
                  fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                  color: "#5e5e5e",
                }}
              >
                I was brought in as the sole designer to build Mysa&apos;s brand
                from zero.
              </p>
              <Image
                src="/images/person-icon.png"
                alt=""
                width={228}
                height={228}
                className="shrink-0"
                style={{ width: "36px", height: "36px" }}
                unoptimized
                aria-hidden="true"
              />
            </div>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              Starting from a blank canvas, I translated Ankitha&apos;s vision
              for what Mysa should feel like into every visual decision. Working
              directly with Ankitha, I ran weekly alignment sessions to
              pressure-test creative direction against her product goals.
            </p>
          </section>

          {/* ── Brand Strategy ──────────────────────────────────────── */}
          <section className="mb-0">
            <h2
              className="font-display font-medium mb-4"
              style={{ fontSize: "1rem", color: "#8b6b41" }}
            >
              Brand Strategy
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Most dating apps are built around volume and retention. More
              swipes, more matches, more time on the app. Mysa has the exact
              opposite goal.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              Featuring fewer distractions, deeper compatibility, and a brand
              that earns trust before it asks for vulnerability.
            </p>
          </section>
        </main>

        {/* ── Three-panel: escapes the 60px gutter via negative margin ──── */}
        <div className="mt-6 -mx-6 md:-mx-[60px]">
          <MysaPillars />
        </div>

        {/* ── Visual System ─────────────────────────────────────────────── */}
        <div className="max-w-[850px] mx-auto mt-8">
          <section>
            <h2
              className="font-display font-medium mb-4"
              style={{ fontSize: "1rem", color: "#8b6b41" }}
            >
              Visual System
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              The logo needed to embody safety. Warmth while standing out from
              competitors.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              I tested various directions, narrowing toward a mark that had
              strong legibility, cohesion, and softness.
            </p>
          </section>

          {/* ── Logo version grid ─────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-10 mt-10">
            {[
              {
                v: "v.1",
                src: "/images/mysa-logo-v1.png",
                note: 'tested the heart-shaped "m"',
              },
              {
                v: "v.2",
                src: "/images/mysa-logo-v2.png",
                note: 'handwritten look? trying to make the "m" more obvious',
              },
              {
                v: "v.3",
                src: "/images/mysa-logo-v3.png",
                note: "getting closer but needs more cohesion",
              },
            ].map(({ v, src, note }) => (
              <div key={v} className="flex flex-col">
                <span
                  style={{
                    fontFamily: '"PPNeueMontreal", sans-serif',
                    fontWeight: 400,
                    fontSize: "0.8rem",
                    color: "#5e5e5e",
                    marginBottom: "0.6rem",
                  }}
                >
                  {v}
                </span>
                <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={src}
                    alt={`Mysa logo ${v}`}
                    fill
                    className="object-contain object-left"
                    sizes="(max-width: 768px) 90vw, 28vw"
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-grape-nuts), cursive",
                    fontSize: "0.95rem",
                    color: "#5e5e5e",
                    lineHeight: 1.4,
                    marginTop: "0.6rem",
                  }}
                >
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
