import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarwoodPhaseThree from "@/components/StarwoodPhaseThree";
import StarwoodReductionViz from "@/components/StarwoodReductionViz";
import StarwoodCompareSlider from "@/components/StarwoodCompareSlider";
import StarwoodRadarChart from "@/components/StarwoodRadarChart";
import StarwoodPMNotified from "@/components/StarwoodPMNotified";

export const metadata: Metadata = {
  title: "Starwood",
  description:
    "Accountants were spending 90 minutes per loan boarding deals by hand. This is the AI-assisted validation system that cut that time by 83–89%.",
};

const meta = [
  { label: "Timeline", value: "Jan – April 2026" },
  { label: "Role", value: "Design Engineer" },
  {
    label: "With",
    value: "Vladimir Subbotin\nHanumantha Evuri\nSIF Accounting Team",
  },
  {
    label: "Disciplines",
    value:
      "AI Workflow Design\nInteraction Design\nUX Research\nUsability Testing",
  },
];

export default function StarwoodCaseStudy() {
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
            src="/images/starwood-banner-v2.png"
            alt="Starwood"
            fill
            className="object-contain"
            priority
            quality={95}
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>
      </div>

      {/* ── Page content wrapper ────────────────────────────────────────── */}
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
            Bringing AI Into{" "}
            <strong className="font-bold" style={{ color: "#8b6b41" }}>
              Starwood&apos;s
            </strong>{" "}
            Loan Boarding Workflow
          </h1>

          {/* Lede */}
          <p
            className="font-sans font-normal leading-relaxed mb-12"
            style={{
              fontSize: "clamp(1.025rem, 1.75vw, 1.175rem)",
              color: "#5e5e5e",
            }}
          >
            Accountants were spending 90 minutes per loan boarding deals by
            hand. This is the AI-assisted validation system I researched and
            designed that cut that time by 83–89%, while keeping 100% accuracy
            and every decision in the accountant&apos;s control.
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

          {/* ── Main Starwood video ─────────────────────────────────────── */}
          <video
            src="/videos/starwood-main.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full rounded-md mb-14 block"
          />

          {/* ── The Brief ───────────────────────────────────────────────── */}
          <section className="mb-10">
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              The Brief
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Every time Starwood closes a new infrastructure loan, loan
              boarding kicks off.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              The Starwood Infrastructure Finance accounting team receives a
              100-300 page legal binder and manually extracts 50+ data fields
              from 3 document types (
              <span style={{ color: "#FF0162" }}>Credit Agreement</span>,{" "}
              <span style={{ color: "#0FA701" }}>Assignment Agreement</span>,{" "}
              <span style={{ color: "#0475BA" }}>Funding Memo</span>) into
              spreadsheets, later migrated into an internal database.
            </p>
          </section>

          {/* ── Old Process image ────────────────────────────────────────── */}
          <div className="mt-10 mb-8">
            <Image
              src="/images/starwood-old-process.png"
              alt="Old loan boarding process"
              width={8442}
              height={4230}
              className="w-full h-auto block"
              unoptimized
            />
          </div>

          {/* ── Brief continuation ───────────────────────────────────────── */}
          <div className="mb-14">
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              Every value is entered by hand, and accuracy is non-negotiable. A
              single error cascades into payment miscalculations, compliance
              failures, and incorrect financial reporting.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              The team wanted AI to help them automate a critical extraction
              workflow, and my role was to turn that into a system they could
              reliably depend on.{" "}
              <span
                style={{
                  fontFamily:
                    '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                  fontWeight: 500,
                }}
              >
                This was a high-visibility initiative, closely observed by
                executive leadership.
              </span>
            </p>
          </div>

          {/* ── Phase One: Discovery ─────────────────────────────────────── */}
          <section className="mb-0">
            <h2
              className="font-display font-bold mb-6"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              PHASE ONE:{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                Discovery
              </span>
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              I started by observing. Three contextual inquiry sessions. One for
              each document type.
            </p>
            <p
              className="font-sans font-normal leading-relaxed mb-10"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              I shadowed an accounting manager as they boarded a real loan,
              asked minimal questions, and paid attention to everything: what
              they clicked, what they said, when they hesitated, when they
              reached for verification.
            </p>

            <h3
              style={{
                fontFamily:
                  '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: "1.125rem",
                color: "#8b6b41",
              }}
            >
              What I Found
            </h3>
          </section>

          {/* ── Discovery Stats image ─────────────────────────────────────── */}
          <div className="mt-8 mb-14">
            <Image
              src="/images/starwood-discovery-stats.png"
              alt="Discovery research statistics"
              width={8361}
              height={2997}
              className="w-full h-auto block"
              unoptimized
            />
          </div>

          {/* ── Artifact Analysis ─────────────────────────────────────────── */}
          <section className="mb-14">
            <h2
              className="mb-4"
              style={{
                fontFamily:
                  '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: "1.125rem",
                color: "#8b6b41",
              }}
            >
              Artifact Analysis
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Alongside the shadowing sessions, I reviewed the actual tools
              accountants worked with.
            </p>
            <ul
              className="mb-6"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
                paddingLeft: "1.25rem",
                listStyleType: "disc",
              }}
            >
              <li className="font-sans font-normal leading-relaxed mb-1">
                Loan Boarding Screen.xlsm — the primary input file
              </li>
              <li className="font-sans font-normal leading-relaxed mb-1">
                SPT Lenders List.xlsx — entity reference data
              </li>
              <li className="font-sans font-normal leading-relaxed">
                Sample Credit Agreements, Assignment Agreements, &amp; Funding
                Memos
              </li>
            </ul>
            <p
              className="font-sans font-normal leading-relaxed mb-6"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              This surfaced inconsistent naming conventions, so any AI
              extraction would need normalization. Reviewing sample docs
              revealed structural differences between US and UK loans, meaning a
              one-size extraction logic would fail.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontFamily:
                  '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              What looked like a data entry problem was actually an
              orchestration problem.
            </p>
          </section>

          {/* ── Phase Two: Specification ──────────────────────────────────── */}
          <section className="mb-0">
            <h2
              className="font-display font-bold mb-6"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              PHASE TWO:{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                Specification
              </span>
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Before I designed a single screen, I had to become a subject
              matter expert.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              I synthesized everything from Phase 1 into a 56-field
              deterministic Extraction Rulebook, the document that bridged UX
              research and engineering.
            </p>

            {/* ── Extraction Rulebook image — 50% width, centered ────────── */}
            <div className="mt-10 mb-10 mx-auto" style={{ maxWidth: "50%" }}>
              <Image
                src="/images/starwood-rulebook.png"
                alt="Extraction Rulebook"
                width={5112}
                height={4221}
                className="w-full h-auto block"
                unoptimized
              />
            </div>

            {/* ── Rulebook fields intro + staggered cards ────────────────── */}
            <p
              className="font-sans font-normal leading-relaxed mb-8"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              For every field the accountants needed to extract, the rulebook
              specified:
            </p>

            <div className="flex flex-col gap-3">
              {[
                { src: "/images/starwood-source-pattern-1.png", mdIndent: "" },
                {
                  src: "/images/starwood-source-pattern-2.png",
                  mdIndent: "md:ml-[15%]",
                },
                {
                  src: "/images/starwood-source-pattern-3.png",
                  mdIndent: "md:ml-[30%]",
                },
              ].map(({ src, mdIndent }, i) => (
                <div key={i} className={mdIndent}>
                  <Image
                    src={src}
                    alt={`Source pattern ${i + 1}`}
                    width={5249}
                    height={540}
                    className="sw-source-pattern h-auto block"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ── Phase Three heading + intro ───────────────────────────────── */}
          <section className="mt-10 mb-2">
            <h2
              className="font-display font-bold mb-6"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              PHASE THREE:{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                Design Exploration
              </span>
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              I had to establish what trust actually required when crafting
              solutions.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              My UX research unveiled three major principles that every design
              variant had to include.
            </p>
          </section>
        </main>
      </div>

      {/* ── Phase Three scroll animation — full bleed, outside content wrapper */}
      <StarwoodPhaseThree />

      {/* ── Design question + Venn diagram ──────────────────────────────── */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-[60px] py-16">
        <p
          className="font-sans font-normal leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
            color: "#5e5e5e",
          }}
        >
          With trust mechanisms locked in as baseline, the real design question
          emerged:
        </p>
        <p
          className="font-sans font-normal leading-relaxed mb-8"
          style={{
            fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
            color: "#8b6b41",
          }}
        >
          How should the information flow feel like?
        </p>
        <p
          className="font-sans font-normal leading-relaxed mb-10"
          style={{
            fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
            color: "#5e5e5e",
          }}
        >
          Talking to accountants revealed two competing user needs.
        </p>

        {/* Venn diagram — SVG scales with container */}
        <svg
          viewBox="0 0 760 420"
          width="100%"
          style={{ display: "block", overflow: "visible" }}
          aria-label="Venn diagram: speed and control overlap at high confidence"
        >
          <defs>
            {/* Blue: light on outer-left → dark towards center-right */}
            <linearGradient
              id="sw-venn-blue"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#CDECFF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#088FE0" stopOpacity="0.90" />
            </linearGradient>
            {/* Pink: dark on outer-left/center-left → light on right edge */}
            <linearGradient
              id="sw-venn-pink"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#FF0162" stopOpacity="0.90" />
              <stop offset="100%" stopColor="#FFAFCE" stopOpacity="0.75" />
            </linearGradient>
          </defs>

          {/* Blue circle — speed */}
          <circle cx="278" cy="218" r="188" fill="url(#sw-venn-blue)" />
          {/* Pink circle — control */}
          <circle cx="490" cy="218" r="188" fill="url(#sw-venn-pink)" />

          {/* "high confidence" in overlap center ≈ x=384 */}
          <text
            x="384"
            y="208"
            textAnchor="middle"
            fontFamily='"PPNeueMontreal", sans-serif'
            fontWeight="500"
            fontStyle="italic"
            fontSize="17"
            fill="white"
          >
            high
          </text>
          <text
            x="384"
            y="230"
            textAnchor="middle"
            fontFamily='"PPNeueMontreal", sans-serif'
            fontWeight="500"
            fontStyle="italic"
            fontSize="17"
            fill="white"
          >
            confidence
          </text>

          {/* "speed" label — inside left circle */}
          <text
            x="130"
            y="196"
            fontFamily='"PPNeueMontreal", sans-serif'
            fontSize="16"
            fill="#044E82"
          >
            speed
          </text>

          {/* "control" label — inside right circle */}
          <text
            x="582"
            y="256"
            fontFamily='"PPNeueMontreal", sans-serif'
            fontSize="16"
            fill="#9B0042"
          >
            control
          </text>
        </svg>

        <p
          className="font-sans font-normal leading-relaxed mt-8"
          style={{
            fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
            color: "#5e5e5e",
          }}
        >
          This lead me to explore two interaction models for testing.
        </p>

        {/* ── Prototype A ──────────────────────────────────────────────── */}
        <div className="mt-16">
          <h2
            className="mb-3"
            style={{
              fontFamily:
                '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: "1.125rem",
              color: "#8b6b41",
            }}
          >
            Prototype A: Document-by-Document
          </h2>
          <p
            className="font-sans font-normal leading-relaxed mb-1"
            style={{
              fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
              color: "#5e5e5e",
            }}
          >
            Mirrors existing mental model, validating one document at a time
          </p>
          <p
            className="font-sans font-normal leading-relaxed mb-6"
            style={{
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#5e5e5e",
            }}
          >
            <span style={{ fontWeight: 500 }}>Hypothesis:</span> Familiarity
            reduces cognitive load and onboarding friction
          </p>
          <video
            src="/videos/prototype-a.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full rounded-md block"
          />
        </div>

        {/* ── Prototype B ──────────────────────────────────────────────── */}
        <div className="mt-16">
          <h2
            className="mb-3"
            style={{
              fontFamily:
                '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: "1.125rem",
              color: "#8b6b41",
            }}
          >
            Prototype B: Consolidated All-in-One
          </h2>
          <p
            className="font-sans font-normal leading-relaxed mb-1"
            style={{
              fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
              color: "#5e5e5e",
            }}
          >
            Eliminate context switching, centralizing all extractions and
            documents in one space
          </p>
          <p
            className="font-sans font-normal leading-relaxed mb-6"
            style={{
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#5e5e5e",
            }}
          >
            <span style={{ fontWeight: 500 }}>Hypothesis:</span> Reducing
            navigation overhead enables faster conflict resolution
          </p>
          <video
            src="/videos/prototype-b.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full rounded-md block"
          />
        </div>

        {/* ── Phase Four: Evaluative Testing ───────────────────────────── */}
        <section className="mt-16 mb-0">
          <h2
            className="font-display font-bold mb-6"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "#8b6b41",
              letterSpacing: "-0.01em",
            }}
          >
            PHASE FOUR:{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>
              Evaluative Testing
            </span>
          </h2>
          <p
            className="font-sans font-normal leading-relaxed mb-4"
            style={{
              fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
              color: "#5e5e5e",
            }}
          >
            I conducted a counterbalanced mixed design study with two domain
            experts via Teams.
          </p>
          <p
            className="font-sans font-normal leading-relaxed mb-10"
            style={{
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#5e5e5e",
            }}
          >
            Each accounting manager validated four deals using both Prototype A
            and Prototype B, which I built with{" "}
            <span style={{ fontWeight: 700 }}>v0, Claude Code, </span> and{" "}
            <span style={{ fontWeight: 700 }}>React</span>. The prototypes were
            tested in a counterbalanced order to minimize order effects and
            better isolate the impact of the design changes.
          </p>
          <Image
            src="/images/starwood-study-design.png"
            alt="Study design"
            width={2000}
            height={1000}
            className="w-full h-auto block"
            unoptimized
          />
        </section>

        {/* ── Outcomes section ─────────────────────────────────────────── */}
        <section className="mt-16 mb-0">
          <p
            className="font-sans font-normal leading-relaxed mb-4"
            style={{
              fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
              color: "#5e5e5e",
            }}
          >
            Both prototypes delivered significant gains over the 90 minute
            manual workflow.
          </p>
          <p
            className="font-sans font-normal leading-relaxed mb-8"
            style={{
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#5e5e5e",
            }}
          >
            Three validation approaches, three timed outcomes:
          </p>
          <Image
            src="/images/starwood-outcomes.png"
            alt="Outcomes visual: Manual 90 min, Prototype A 20–25 min, Prototype B 10–15 min"
            width={1292}
            height={622}
            className="w-full h-auto block"
            unoptimized
          />
          <p
            className="font-sans font-normal leading-relaxed mt-6"
            style={{
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#5e5e5e",
            }}
          >
            Prototype B was 40–50% faster than Prototype A, cutting an
            already-optimized workflow nearly in half.
          </p>
        </section>

        {/* ── Reduction callout + viz ───────────────────────────────────── */}
        <div className="mt-16 flex items-stretch gap-10">
          {/* Left: stat text — its natural height sets the row height */}
          <div className="w-1/2 flex items-center">
            <p
              style={{
                fontFamily:
                  '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: "clamp(1.4rem, 3.2vw, 2rem)",
                color: "#8b6b41",
                lineHeight: 1.2,
              }}
            >
              Prototype B reduced validation time by 83–89%.
            </p>
          </div>
          {/* Right: bars stretch to match text height */}
          <div className="w-1/2">
            <StarwoodReductionViz />
          </div>
        </div>

        {/* ── How did this happen? ──────────────────────────────────────── */}
        <section className="mt-16 mb-0">
          <h2
            className="mb-6"
            style={{
              fontFamily:
                '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: "1.125rem",
              color: "#8b6b41",
            }}
          >
            How did this happen?
          </h2>
          <p
            className="font-sans font-normal leading-relaxed mb-4"
            style={{
              fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
              color: "#5e5e5e",
            }}
          >
            I realized in the shadowed sessions that accountants spent most of
            their time hunting for document conflicts. In Prototype A, this
            meant:
          </p>
          <ol
            className="mb-6"
            style={{
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#5e5e5e",
              paddingLeft: "1.25rem",
              listStyleType: "decimal",
            }}
          >
            {[
              "Validate first Assignment Agreement (v1) → review closing date",
              "Validate second Assignment Agreement (v2) → review different closing date",
              "System determines latest version based on document metadata",
              "Accept final value",
            ].map((item, i) => (
              <li
                key={i}
                className="font-sans font-normal leading-relaxed mb-1"
              >
                {item}
              </li>
            ))}
          </ol>
          <p
            className="font-sans font-normal leading-relaxed"
            style={{
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#5e5e5e",
            }}
          >
            <span style={{ fontWeight: 700 }}>
              Prototype B eliminated steps 1–2.
            </span>{" "}
            Conflicts were flagged automatically, with the most recent value
            surfaced.
          </p>
        </section>

        {/* ── Prototype comparison slider ───────────────────────────────── */}
        <div className="mt-16">
          <StarwoodCompareSlider />
        </div>

        {/* ── 100% error detection ─────────────────────────────────────── */}
        <section className="mt-20 mb-0">
          {/* Top row: large stat + gradient image */}
          <div className="flex items-start gap-10 mb-8">
            {/* Left: heading */}
            <div className="w-1/2">
              <p
                style={{
                  fontFamily:
                    '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "#8b6b41",
                  lineHeight: 1.1,
                }}
              >
                100%{" "}
                <span style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>
                  error detection rate across both prototypes
                </span>
              </p>
            </div>
            {/* Right: gradient bar image */}
            <div className="w-1/2 flex flex-col justify-start">
              <Image
                src="/images/starwood-error-gradient.png"
                alt="100% error detection rate gradient"
                width={1200}
                height={200}
                className="w-full h-auto block"
                unoptimized
              />
            </div>
          </div>

          {/* Body */}
          <p
            className="font-sans font-normal leading-relaxed mb-6"
            style={{
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#5e5e5e",
            }}
          >
            Every seeded error was caught. Both proposed workflows made boarding
            complexity manageable.
          </p>

          {/* Checklist */}
          <ul className="mb-8" style={{ listStyle: "none", padding: 0 }}>
            {[
              "8-10 seeded errors per each deal",
              "All 75 errors detected by accountants",
              "0 false acceptances",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 mb-3"
                style={{
                  fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                  color: "#5e5e5e",
                }}
              >
                {/* Blue checkmark */}
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  style={{ flexShrink: 0, marginLeft: "2.5rem" }}
                >
                  <path
                    d="M1.5 7L6.5 12L16.5 1.5"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-sans font-normal">{item}</span>
              </li>
            ))}
          </ul>

          {/* NASA-TLX callout */}
          <p
            className="font-sans leading-relaxed mb-3"
            style={{
              fontStyle: "italic",
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#8b6b41",
            }}
          >
            NASA-TLX ratings revealed the cognitive shift.
          </p>

          {/* Quote */}
          <p
            className="font-sans font-normal leading-relaxed"
            style={{
              fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
              color: "#5e5e5e",
            }}
          >
            &ldquo;I really like how I&apos;m in review mode and not doing the
            grunt work.&rdquo; – Accounting Manager
          </p>
        </section>

        {/* ── NASA-TLX Radar Chart ──────────────────────────────────────── */}
        <div className="mt-16">
          <StarwoodRadarChart />
        </div>

        {/* ── Bonus: PM Notifications ──────────────────────────────────── */}
        <section className="mt-20">
          {/* Top row: text left, pill right */}
          <div className="flex items-start gap-10 mb-8">
            <div className="w-1/2">
              <h2
                className="mb-5"
                style={{
                  fontFamily:
                    '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: "#8b6b41",
                  letterSpacing: "-0.01em",
                }}
              >
                Bonus: PM Notifications
              </h2>
              <p
                className="font-sans font-normal leading-relaxed"
                style={{
                  fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                  color: "#5e5e5e",
                }}
              >
                When accountants weren&apos;t drowning in tab-switching, they
                had headspace to spot a new pattern: they always notify a
                Portfolio Manager (PM) after a loan is boarded. If the system
                could auto-ping, that&apos;s another 5–10 minutes saved.
              </p>
            </div>
            <div className="w-1/2 flex items-center justify-center pt-2">
              <StarwoodPMNotified />
            </div>
          </div>

          <p
            className="font-sans leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
              color: "#5e5e5e",
              fontWeight: 700,
            }}
          >
            This insight didn&apos;t come from interview questions. It emerged
            because the workflow removed friction.
          </p>
        </section>

        {/* ── Phase Six: Implementation & Impact ───────────────────────── */}
        <section className="mt-16 mb-0">
          <h2
            className="font-display font-bold mb-6"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "#8b6b41",
              letterSpacing: "-0.01em",
            }}
          >
            PHASE FIVE:{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>
              Implementation &amp; Impact
            </span>
          </h2>

          <p
            className="font-sans font-normal leading-relaxed mb-8"
            style={{
              fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
              color: "#5e5e5e",
            }}
          >
            Recommendation to Engineering:{" "}
            <span style={{ fontWeight: 700 }}>Ship the Consolidated View</span>
          </p>

          {/* Implementation roadmap — vertical timeline */}
          <div className="relative" style={{ marginTop: "32px" }}>
            {/* Central vertical line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "20px",
                bottom: "20px",
                width: "1px",
                background: "#a8a39d",
                transform: "translateX(-50%)",
              }}
            />

            {/* ── PHASE 1 — left side ────────────────────────────────────── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                marginBottom: "64px",
              }}
            >
              <div style={{ position: "relative", paddingTop: "12px" }}>
                {/* Circle marker — purple for Q1 */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "8px",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#7C3AED",
                    color: "#f4ede1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily:
                      '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    zIndex: 2,
                  }}
                >
                  1
                </div>

                {/* Dashed connector — purple → gray gradient */}
                <div
                  style={{
                    position: "absolute",
                    left: "52px",
                    right: "0",
                    top: "30px",
                    height: "1px",
                    backgroundImage:
                      "linear-gradient(to right, #7C3AED, #a8a39d)",
                    WebkitMaskImage:
                      "repeating-linear-gradient(to right, #000 0 5px, transparent 5px 10px)",
                    maskImage:
                      "repeating-linear-gradient(to right, #000 0 5px, transparent 5px 10px)",
                  }}
                />

                {/* Connector dot at center line */}
                <div
                  style={{
                    position: "absolute",
                    right: "-4px",
                    top: "26px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#a8a39d",
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    paddingTop: "64px",
                    paddingLeft: "52px",
                    paddingRight: "24px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily:
                        '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                      fontSize: "clamp(0.75rem, 1.05vw, 0.82rem)",
                      fontWeight: 500,
                      color: "#6D28D9",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Q2
                  </p>
                  <h3
                    style={{
                      fontFamily:
                        '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                      fontSize: "clamp(1.1rem, 1.9vw, 1.4rem)",
                      fontWeight: 700,
                      color: "#7C3AED",
                      lineHeight: 1.2,
                      marginBottom: "14px",
                    }}
                  >
                    Phase 1 (MVP)
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {[
                      "Consolidated validation screen",
                      "Per-field source transparency",
                      "Inline editing",
                    ].map((item) => (
                      <p
                        key={item}
                        style={{
                          fontFamily:
                            '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                          fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
                          color: "#5e5e5e",
                          lineHeight: 1.45,
                        }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              {/* Right column empty */}
              <div />
            </div>

            {/* ── PHASE 2 — right side ───────────────────────────────────── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                marginBottom: "20px",
              }}
            >
              {/* Left column empty */}
              <div />
              <div style={{ position: "relative", paddingTop: "12px" }}>
                {/* Dashed connector — gray → blue gradient */}
                <div
                  style={{
                    position: "absolute",
                    left: "0",
                    right: "52px",
                    top: "30px",
                    height: "1px",
                    backgroundImage:
                      "linear-gradient(to right, #a8a39d, #088FE0)",
                    WebkitMaskImage:
                      "repeating-linear-gradient(to right, #000 0 5px, transparent 5px 10px)",
                    maskImage:
                      "repeating-linear-gradient(to right, #000 0 5px, transparent 5px 10px)",
                  }}
                />

                {/* Connector dot at center line */}
                <div
                  style={{
                    position: "absolute",
                    left: "-4px",
                    top: "26px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#a8a39d",
                  }}
                />

                {/* Circle marker — blue for Q2 */}
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "8px",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#088FE0",
                    color: "#f4ede1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily:
                      '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    zIndex: 2,
                  }}
                >
                  2
                </div>

                {/* Content */}
                <div
                  style={{
                    paddingTop: "64px",
                    paddingRight: "52px",
                    paddingLeft: "24px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily:
                        '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                      fontSize: "clamp(0.75rem, 1.05vw, 0.82rem)",
                      fontWeight: 500,
                      color: "#0073BD",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Q3
                  </p>
                  <h3
                    style={{
                      fontFamily:
                        '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                      fontSize: "clamp(1.1rem, 1.9vw, 1.4rem)",
                      fontWeight: 700,
                      color: "#088FE0",
                      lineHeight: 1.2,
                      marginBottom: "14px",
                    }}
                  >
                    Phase 2 (Add-ons)
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {[
                      "Confidence score determination",
                      "Automated PM notifications",
                    ].map((item) => (
                      <p
                        key={item}
                        style={{
                          fontFamily:
                            '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                          fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
                          color: "#5e5e5e",
                          lineHeight: 1.45,
                        }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── What difference does this make? ──────────────────────────── */}
        <section className="mt-20 mb-0">
          <p
            style={{
              fontFamily:
                '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: "1.125rem",
              color: "#8b6b41",
              marginBottom: "32px",
            }}
          >
            What difference does this make?
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { stat: "~82 mins", label: "saved per loan" },
              { stat: "$20k", label: "in reclaimed accountant capacity" },
              { stat: "210–350 hrs", label: "annual time savings" },
            ].map(({ stat, label }) => (
              <div
                key={stat}
                style={{
                  borderTop: "1px solid rgba(94,94,94,0.12)",
                  paddingTop: "12px",
                  paddingBottom: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily:
                      '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                    fontWeight: 300,
                    fontSize: "clamp(3.5rem, 8vw, 6rem)",
                    color: "#1a1a1a",
                    lineHeight: 1.0,
                    marginBottom: "4px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat}
                </p>
                <p
                  style={{
                    fontFamily:
                      '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: "clamp(0.8rem, 1.25vw, 0.875rem)",
                    color: "#5e5e5e",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(94,94,94,0.12)" }} />
          </div>
        </section>

        {/* ── Reflections ───────────────────────────────────────────────── */}
        <section className="mt-20 mb-0">
          <h2
            className="font-display font-bold mb-10"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "#8b6b41",
              letterSpacing: "-0.01em",
            }}
          >
            Reflections
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            {/* Reflection 1 */}
            <section className="mb-10">
              <p
                className="font-sans font-normal leading-relaxed mb-4"
                style={{
                  fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                  color: "#5e5e5e",
                }}
              >
                Designing at the Speed of Thought
              </p>
              <p
                className="font-sans font-normal leading-relaxed"
                style={{
                  fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                  color: "#5e5e5e",
                }}
              >
                I learned so much experimenting with using AI for prototyping.
                Leveraging v0, Claude Code, and React allowed me to bring ideas
                to life far faster than a traditional Figma-only workflow.
                Faster prototyping meant quicker feedback loops, reduced design
                waste, and narrowed focus on what actually works for users. It
                made me more hopeful of design not being the bottleneck to
                problem-solving as AI becomes an accelerant for exploration.
              </p>
            </section>

            {/* Reflection 2 */}
            <section className="mb-10">
              <p
                className="font-sans font-normal leading-relaxed mb-4"
                style={{
                  fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                  color: "#5e5e5e",
                }}
              >
                Trust-building in Traditional Finance Systems
              </p>
              <p
                className="font-sans font-normal leading-relaxed"
                style={{
                  fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                  color: "#5e5e5e",
                }}
              >
                The unique challenge here was not convincing users to use AI but
                was designing enough trust into the system so that they
                don&apos;t revert to their old workflow. I spent time
                understanding emotional and operational safeguards needed during
                the design process. Studying user behavior closely to see how
                they validated info manually helped me ideate ways to mirror
                those behaviors with the product experience. This experience
                will always remind me that AI products built on giving users
                confidence will be the most successful.
              </p>
            </section>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
