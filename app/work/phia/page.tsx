import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhiaExtensionDecisions from "@/components/PhiaExtensionDecisions";
import PhiaVotingAnimation from "@/components/PhiaVotingAnimation";

export const metadata: Metadata = {
  title: "Phia",
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
            className="grid grid-cols-2 md:grid-cols-4 gap-y-3 mb-14 border-t border-b py-8"
            style={{
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

          {/* ── The Problem ────────────────────────────────────────────── */}
          <section className="mb-10">
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              The Problem
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              What would it take to never regret an online purchase again?
            </p>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              Flew from SF → NY to pitch my solution answering this question in
              front of the Phia team.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              24 hours. Selected from 50+ submissions. 1 challenge: design an
              end-to-end feature that solves one high-friction moment in online
              shopping.
            </p>
          </section>

          {/* ── Context ─────────────────────────────────────────────────── */}
          <section className="mb-10">
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              Context
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              85% of online shoppers regret an impulse purchase according to
              Investopedia
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              Shopping is currently a broken process. Drowning in
              analysis-paralysis. Second-guessing decisions. Lacking trusted
              opinions when it matters the most.
            </p>
          </section>

          {/* ── Credit card visual ─────────────────────────────────────── */}
          <div className="my-12 flex justify-center">
            <Image
              src="/images/phia-credit-card.png"
              alt="A blue credit card with 'Should I Buy This?' printed where the cardholder name would be"
              width={2163}
              height={1353}
              className="phia-card-float h-auto block"
              style={{ width: "100%", maxWidth: "406px" }}
              quality={95}
            />
          </div>

          {/* ── Bridge ─────────────────────────────────────────────────── */}
          <div className="mb-12">
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              People already ask others before buying. But it&apos;s done across
              several screenshots, texts, and fragmented apps.
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
              There&apos;s no tool that does this seamlessly. So I built it.
            </p>
          </div>

          {/* ── Introducing Circle Vote ───────────────────────────────── */}
          <section className="mb-14">
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              Introducing Circle Vote
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Before you buy something, you ask your inner circle whether you
              should buy it.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              One tap. Trusted people. Real-time votes. Opinions from humans who
              actually care if you regret it.
            </p>
          </section>

          {/* ── New way of Smarter shopping. ───────────────────────────── */}
          <div
            className="my-14"
            style={{
              color: "#084BE7",
              fontFamily: '"PPNeueMontreal", ui-sans-serif, sans-serif',
              fontSize: "clamp(2rem, 5.6vw, 3.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
            }}
          >
            <div className="text-left" style={{ fontWeight: 400 }}>
              New way of
            </div>
            <div className="text-right" style={{ fontSize: "1.35em" }}>
              <span style={{ fontWeight: 500, fontStyle: "italic" }}>
                Smarter
              </span>{" "}
              <span style={{ fontWeight: 400 }}>shopping.</span>
            </div>
          </div>

          {/* ── Video placeholder ──────────────────────────────────────── */}
          <div className="my-12 flex justify-center">
            <div
              className="relative w-full max-w-[500px]"
              style={{ aspectRatio: "1 / 1" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  border: "1.5px dashed rgba(94,94,94,0.35)",
                  backgroundColor: "rgba(94,94,94,0.04)",
                }}
              >
                <span
                  className="font-sans"
                  style={{ fontSize: "0.9rem", color: "#5e5e5e" }}
                >
                  video insert
                </span>
              </div>
            </div>
          </div>

          {/* ── User Understanding ──────────────────────────────────────── */}
          <section className="mb-14">
            <h2
              className="font-display font-bold mb-10"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              User Understanding
            </h2>

            {/* ── Meet Carmen — text left, photo right ────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <h3
                  className="font-display font-normal mb-3"
                  style={{
                    fontSize: "clamp(0.95rem, 1.35vw, 1.1rem)",
                    color: "#8b6b41",
                  }}
                >
                  Meet Carmen, the &ldquo;Overthinker&rdquo;
                </h3>
                <p
                  className="font-sans font-normal leading-relaxed mb-4"
                  style={{
                    fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                    color: "#5e5e5e",
                  }}
                >
                  28, works in tech sales, shops online 3-4x/week
                </p>
                <ul
                  className="font-sans font-normal leading-relaxed list-none pl-0 space-y-2"
                  style={{
                    fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                    color: "#5e5e5e",
                  }}
                >
                  <li className="flex items-start gap-[0.6em]">
                    <Image
                      src="/images/phia-icon-bag.png"
                      alt=""
                      width={42}
                      height={54}
                      className="block flex-shrink-0"
                      style={{
                        width: "0.64em",
                        height: "auto",
                        marginTop: "0.3em",
                      }}
                    />
                    <span>
                      Has 50+ items saved in the carts across multiple sites
                    </span>
                  </li>
                  <li className="flex items-start gap-[0.6em]">
                    <Image
                      src="/images/phia-icon-bag.png"
                      alt=""
                      width={42}
                      height={54}
                      className="block flex-shrink-0"
                      style={{
                        width: "0.64em",
                        height: "auto",
                        marginTop: "0.3em",
                      }}
                    />
                    <span>
                      Screenshots products to friends and hates waiting an
                      unknown amount of time for them to respond
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="phia-photo-card relative w-full max-w-[260px] isolate">
                  {/* Window-tabs icon — right border, just below the top
                      corner curve, shifted further out. BEHIND the photo. */}
                  <Image
                    src="/images/phia-icon-window-tabs.png"
                    alt=""
                    width={228}
                    height={228}
                    className="phia-icon-anim phia-icon-tabs-anim absolute"
                    style={{
                      top: "5%",
                      right: "-17%",
                      width: "24.75%",
                      height: "auto",
                      maxWidth: "none",
                      zIndex: 0,
                    }}
                  />
                  {/* Carmen photo — natural aspect (720×1080) */}
                  <Image
                    src="/images/phia-carmen.png"
                    alt="Carmen, a young woman in a yellow turtleneck"
                    width={720}
                    height={1080}
                    sizes="(max-width: 768px) 260px, 260px"
                    className="block rounded-[18px] relative"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "none",
                      zIndex: 10,
                    }}
                  />
                  {/* Cart icon — left border, just above the bottom corner
                      curve, in FRONT of the photo, drifts left on hover */}
                  <Image
                    src="/images/phia-icon-cart.png"
                    alt=""
                    width={311}
                    height={311}
                    className="phia-icon-anim phia-icon-cart-anim absolute"
                    style={{
                      bottom: "5%",
                      left: "-12.4%",
                      width: "24.75%",
                      height: "auto",
                      maxWidth: "none",
                      zIndex: 20,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Meet Emma — photo left, text right ──────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center md:justify-start order-2 md:order-1">
                <div className="phia-photo-card relative w-full max-w-[260px] isolate">
                  {/* Emma photo — natural aspect (744×1080) */}
                  <Image
                    src="/images/phia-emma.png"
                    alt="Emma, a young woman with auburn hair in a scarf"
                    width={744}
                    height={1080}
                    sizes="(max-width: 768px) 260px, 260px"
                    className="block rounded-[18px] relative"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "none",
                      zIndex: 10,
                    }}
                  />
                  {/* Star icon — left border, just below the top corner
                      curve, drifts left on hover */}
                  <Image
                    src="/images/phia-icon-star.png"
                    alt=""
                    width={238}
                    height={238}
                    className="phia-icon-anim phia-icon-star-anim absolute"
                    style={{
                      top: "5%",
                      left: "-10.7%",
                      width: "21.45%",
                      height: "auto",
                      maxWidth: "none",
                      zIndex: 20,
                    }}
                  />
                  {/* Hanger icon — right border, just above the bottom
                      corner curve, drifts right on hover */}
                  <Image
                    src="/images/phia-icon-hanger.png"
                    alt=""
                    width={224}
                    height={224}
                    className="phia-icon-anim phia-icon-hanger-anim absolute"
                    style={{
                      bottom: "5%",
                      right: "-11.6%",
                      width: "23.1%",
                      height: "auto",
                      maxWidth: "none",
                      zIndex: 20,
                    }}
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3
                  className="font-display font-normal mb-3"
                  style={{
                    fontSize: "clamp(0.95rem, 1.35vw, 1.1rem)",
                    color: "#8b6b41",
                  }}
                >
                  Meet Emma, the &ldquo;Go-to Advisor&rdquo;
                </h3>
                <p
                  className="font-sans font-normal leading-relaxed mb-4"
                  style={{
                    fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                    color: "#5e5e5e",
                  }}
                >
                  29, works in fashion, known for good taste in friend group
                </p>
                <ul
                  className="font-sans font-normal leading-relaxed list-none pl-0 space-y-2"
                  style={{
                    fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                    color: "#5e5e5e",
                  }}
                >
                  <li className="flex items-start gap-[0.6em]">
                    <Image
                      src="/images/phia-icon-bag.png"
                      alt=""
                      width={42}
                      height={54}
                      className="block flex-shrink-0"
                      style={{
                        width: "0.64em",
                        height: "auto",
                        marginTop: "0.3em",
                      }}
                    />
                    <span>
                      Gets 6-10 &ldquo;Do you think I should buy this?&rdquo;
                      texts per week
                    </span>
                  </li>
                  <li className="flex items-start gap-[0.6em]">
                    <Image
                      src="/images/phia-icon-bag.png"
                      alt=""
                      width={42}
                      height={54}
                      className="block flex-shrink-0"
                      style={{
                        width: "0.64em",
                        height: "auto",
                        marginTop: "0.3em",
                      }}
                    />
                    <span>
                      Loves to help but feels overwhelmed with context-switching
                      between messages in different places
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── Phase One: The Extension ───────────────────────────────── */}
          <section className="mb-14">
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              PHASE ONE: The Extension
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              I started with tackling the core design challenge:{" "}
              <span style={{ color: "#8b6b41" }}>
                How to make asking for help effortless?
              </span>
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              Minimizing taps was the main goal. Every extra step in a moment of
              impulse is a potential exit ramp. I had to make it feel like a
              reflex, not an unfamiliar feature.
            </p>

            {/* Interactive extension UI with the 4 decision bubbles */}
            <PhiaExtensionDecisions />

            {/* ── Vote goes live: copy + animated voting-start image ────── */}
            <p
              className="font-sans font-normal leading-relaxed mb-4 mt-12"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Once the vote is live, the sender watches their circle respond in
              real time.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              Comments roll in alongside a live consensus bar showing where the
              circle is leaning.
            </p>

            <div className="mt-10">
              <PhiaVotingAnimation />
            </div>
          </section>

          {/* ── Phase Two: The App ─────────────────────────────────────── */}
          <section className="mb-14">
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              PHASE TWO: The App
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              During the feedback session, the Phia team asked how would this
              translate to the app.
            </p>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              This was not just a resize challenge. This opened the context
              wider, to the device where the circle usually lives. And begs the
              question how do people respond to a vote.
            </p>

            {/* Phia mobile vote UI video — autoplays on loop. Cropped
                with belt-and-suspenders:
                  • overflow:hidden wrapper + width:125% + marginLeft:-12.5%
                    pushes 12.5% of wrapper-width off each side of the
                    wrapper (= 10% of the video element's own width)
                  • clip-path on the video ALSO clips 10% from the right
                    and 5% from the bottom — guarantees the right crop
                    even if a parent's layout/overflow setting interferes
                    with the wrapper's overflow:hidden
                  • mx-auto on the wrapper itself, no outer flex parent,
                    so nothing else can mess with the wrapper's width. */}
            <div
              className="relative mt-10"
              style={{
                // 1.5x size: the cropped result always fills the wrapper, and
                // every crop value below (video width:125%, the translateX
                // shifts, the clip-path insets) is a PERCENTAGE of this
                // wrapper — so rendering the wrapper at 1.5x scales the whole
                // crop proportionally without changing what's visible.
                //
                // This column is only max-w-[1000px] (and w-full would cap us
                // there), so to grow past it we break OUT of the column:
                // width:150% + symmetric negative margins keep it centered on
                // the column while overflowing both sides. height is auto, so
                // the layout still reflows (no overlap) instead of a
                // transform:scale that would overlap neighbours.
                width: "150%",
                marginLeft: "-25%",
                marginRight: "-25%",
                overflow: "hidden",
                transform: "translateX(20%)",
              }}
            >
              <video
                src="/videos/phia-mobile-vote-ui.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  display: "block",
                  // Video element is 25% wider than the wrapper (= 100/80).
                  // It would normally overflow only on the right side.
                  // We shift it left visually with transform:translateX
                  // (NOT marginLeft — keeps the layout box untouched so
                  // mx-auto centering on the wrapper isn't disturbed by
                  // any margin tricks here).
                  // translateX is a % of the ELEMENT'S OWN width, so
                  // -10% of 125% wrapper-width = -12.5% wrapper-width,
                  // splitting the overflow evenly between left and right.
                  width: "125%",
                  transform: "translateX(-20%)",
                  height: "auto",
                  // clip-path explicitly clips the right 10% of the video
                  // element (= 12.5% wrapper, aligning with wrapper's
                  // right edge) plus the bottom 5%. Combined with the
                  // wrapper's overflow:hidden (which clips the left
                  // 12.5% wrapper-width that the translate pushed past
                  // the wrapper's left edge), the final visible content
                  // is the middle 80% × top 95% of the source video.
                  clipPath: "inset(5% 20% 5% 0)",
                }}
              />
            </div>
          </section>
        </main>
      </div>

      <Footer />

      <style>{`
        .phia-card-float {
          animation: phia-card-float 2.7s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes phia-card-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        /* Decorative icons around Carmen / Emma:
           sit still at rest, and gently drift OUTWARD (away from the photo
           center) when the user hovers the photo card. Smooth ease-out so
           the motion settles instead of snapping. */
        .phia-icon-anim {
          transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center;
          will-change: transform;
        }
        /* Translation is in PERCENT of the icon's own size, so the motion
           stays proportional whether the icon renders at 30px on a phone or
           60px on desktop. */
        /* Side-border icons drift purely OUTWARD (horizontal) on hover. */
        .phia-photo-card:hover .phia-icon-cart-anim,
        .phia-photo-card:hover .phia-icon-star-anim {
          transform: translateX(-40%);
        }
        .phia-photo-card:hover .phia-icon-tabs-anim,
        .phia-photo-card:hover .phia-icon-hanger-anim {
          transform: translateX(40%);
        }

        /* "Waiting..." dot fade — each dot fades from dim → full opacity →
           dim, staggered left → right so the ellipses appear to ripple in
           and out. Loops continuously, eased for soft transitions. */
        @keyframes phia-dot-fade {
          0%, 60%, 100% { opacity: 0.2; }
          30%           { opacity: 1; }
        }
        .phia-dot {
          display: inline-block;
          opacity: 0.2;
          animation: phia-dot-fade 1.4s ease-in-out infinite;
        }
        .phia-dot-2 { animation-delay: 0.16s; }
        .phia-dot-3 { animation-delay: 0.32s; }

        @media (prefers-reduced-motion: reduce) {
          .phia-card-float { animation: none; }
          .phia-icon-anim,
          .phia-photo-card:hover .phia-icon-anim {
            transition: none;
            transform: none;
          }
          .phia-dot { animation: none; }
        }
      `}</style>
    </div>
  );
}
