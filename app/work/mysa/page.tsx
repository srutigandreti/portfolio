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

      {/* ── Page content wrapper: 1000px max, 60px gutter ──────────────── */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-[60px]">
        <main className="pt-14 pb-0">
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
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
              }}
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
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
              }}
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
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
              }}
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
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
              }}
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
        <div className="mt-8">
          <section>
            <h2
              className="font-display font-medium mb-4"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
              }}
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

          {/* ── Logo versions (combined image) ────────────────────── */}
          <div className="mt-10">
            {/* v.1 / v.2 / v.3 labels above */}
            <div className="grid grid-cols-3 mb-3">
              {["v.1", "v.2", "v.3"].map((v) => (
                <span
                  key={v}
                  style={{
                    fontFamily: '"PPNeueMontreal", sans-serif',
                    fontWeight: 400,
                    fontSize: "0.8rem",
                    color: "#5e5e5e",
                  }}
                >
                  {v}
                </span>
              ))}
            </div>

            <Image
              src="/images/mysa-versions.png"
              alt="Mysa logo versions v.1, v.2, v.3"
              width={6734}
              height={1188}
              className="w-full h-auto block"
              unoptimized
            />

            {/* Handwritten notes below */}
            <div className="grid grid-cols-3 mt-3">
              {[
                'tested the heart-shaped "m"',
                'handwritten look? trying to make the "m" more obvious',
                "getting closer but needs more cohesion",
              ].map((note) => (
                <p
                  key={note}
                  style={{
                    fontFamily: "var(--font-grape-nuts), cursive",
                    fontSize: "0.95rem",
                    color: "#5e5e5e",
                    lineHeight: 1.4,
                  }}
                >
                  {note}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── Logo on colors ────────────────────────────────────────────── */}
        <div className="mt-8">
          <Image
            src="/images/mysa-on-colors.png"
            alt="Mysa logo on white, green, and sky"
            width={2808}
            height={1794}
            className="w-full h-auto block"
            unoptimized
          />
        </div>

        {/* ── Typography and Color ───────────────────────────────────────── */}
        <div className="mt-14">
          <section>
            <h2
              className="font-display font-medium mb-6"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
              }}
            >
              Typography and Color
            </h2>
            <p
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
                marginBottom: "0.5rem",
              }}
            >
              Headers &amp; Body: Poppins
            </p>
            <p
              style={{
                fontFamily: '"GT Super Display", serif',
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Accent: GT Super Display (Light Italic)
            </p>

            {/* Primary + secondary cards side by side */}
            <div className="flex gap-4 mt-8">
              <Image
                src="/images/mysa-primary.png"
                alt="Mysa primary card"
                width={4212}
                height={2286}
                className="w-1/2 h-auto block"
                unoptimized
              />
              <Image
                src="/images/mysa-secondary.png"
                alt="Mysa secondary card"
                width={4212}
                height={2286}
                className="w-1/2 h-auto block"
                unoptimized
              />
            </div>

            {/* Business card + ad — flex-grow proportional to native widths
                so both images share the same rendered height */}
            <div className="flex gap-4 mt-4">
              <div style={{ flex: "9 1 0%" }}>
                <Image
                  src="/images/mysa-business-card.png"
                  alt="Mysa business card"
                  width={1802}
                  height={1802}
                  className="w-full h-auto block"
                  unoptimized
                />
              </div>
              <div style={{ flex: "5 1 0%" }}>
                <Image
                  src="/images/mysa-ad.png"
                  alt="Mysa ad"
                  width={1004}
                  height={1802}
                  className="w-full h-auto block"
                  unoptimized
                />
              </div>
            </div>
          </section>
        </div>

        {/* ── Results ───────────────────────────────────────────────────── */}
        <div className="mt-14 pb-20">
          <h2
            className="font-display font-medium mb-10"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "#8b6b41",
            }}
          >
            Results?
          </h2>

          {/* Stats */}
          <div className="flex gap-12 md:gap-20 mb-14">
            <div>
              <p
                className="font-sans font-bold leading-none"
                style={{
                  fontSize: "clamp(2.6rem, 7.5vw, 5rem)",
                  letterSpacing: "-0.025em",
                  color: "#1a1a1a",
                }}
              >
                15k+
              </p>
              <div
                className="mt-2"
                style={{
                  fontSize: "clamp(0.525rem, 1.5vw, 1rem)",
                  color: "#5e5e5e",
                }}
              >
                <p className="font-sans font-normal">sign-ups</p>
                <p className="font-sans font-normal">1 month of launch</p>
              </div>
            </div>

            <div>
              <p
                className="font-sans font-bold leading-none"
                style={{
                  fontSize: "clamp(2.6rem, 7.5vw, 5rem)",
                  letterSpacing: "-0.025em",
                  color: "#1a1a1a",
                }}
              >
                25k+
              </p>
              <div
                className="mt-2"
                style={{
                  fontSize: "clamp(0.525rem, 1.5vw, 1rem)",
                  color: "#5e5e5e",
                }}
              >
                <p className="font-sans font-normal">sign-ups currently</p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <p
            className="font-sans font-bold"
            style={{
              fontSize: "clamp(2.6rem, 7.5vw, 5rem)",
              letterSpacing: "-0.025em",
              lineHeight: "1.05",
              color: "#1a1a1a",
            }}
          >
            &ldquo;Feels different from every other dating app&rdquo;
          </p>
          <p
            className="font-sans font-normal mt-3"
            style={{
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#5e5e5e",
            }}
          >
            repeated user feedback received about Mysa
          </p>
        </div>

        {/* ── Reflections ───────────────────────────────────────────────── */}
        <div className="mt-14 pb-24">
          <h2
            className="font-display font-medium mb-10"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "#8b6b41",
            }}
          >
            Reflections
          </h2>

          <section className="mb-10">
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Building the brand from 0
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              Designing a brand from scratch came with an exciting amount of
              creative freedom but also the pressure of owning every decision.
              With no existing system to build from, I had total responsibility
              over the visual direction, which meant every choice needed to feel
              both beautiful and strategically aligned with Ankitha&apos;s
              vision for the app. It pushed me to think beyond aesthetics and
              design a brand identity that felt emotionally resonant, memorable,
              and purposeful from the ground up.
            </p>
          </section>

          <section>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Art of Collaboration
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              This process involved constant collaboration, feedback loops, and
              refining ideas until they truly clicked. Ankitha and I worked
              closely together throughout the branding process, especially when
              shaping the final logo, balancing her vision with thoughtful
              design decisions that would scale across the product experience.
              The back-and-forth was challenging at times, but it ultimately
              made the outcome feel far more aligned, intentional, and
              rewarding.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
