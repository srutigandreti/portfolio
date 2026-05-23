import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarwoodPhaseThree from "@/components/StarwoodPhaseThree";

export const metadata: Metadata = {
  title: "Starwood — AI-Assisted Loan Boarding",
  description:
    "Accountants were spending 90 minutes per loan boarding deals by hand. This is the AI-assisted validation system that cut that time by 83–89%.",
};

const meta = [
  { label: "Timeline", value: "Jan – April 2026" },
  { label: "Role", value: "Design Engineer" },
  {
    label: "With",
    value: "Vladimir Subbotin\nHanumantha Evuri\nSIF Accounting team",
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
            Designing AI Workflow at{" "}
            <strong className="font-bold" style={{ color: "#8b6b41" }}>
              Starwood
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

          {/* ── Video placeholder ───────────────────────────────────────── */}
          <div
            className="w-full rounded-md mb-14"
            style={{ aspectRatio: "16/9", backgroundColor: "#d0cdc5" }}
          />

          {/* ── The Brief ───────────────────────────────────────────────── */}
          <section className="mb-10">
            <h2
              className="font-display font-medium mb-4"
              style={{ fontSize: "1rem", color: "#8b6b41" }}
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
              className="font-display font-medium mb-4"
              style={{ fontSize: "1rem", color: "#8b6b41" }}
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
      </div>

      <Footer />
    </div>
  );
}
