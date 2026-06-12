import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhiaExtensionDecisions from "@/components/PhiaExtensionDecisions";
import PhiaVotingAnimation from "@/components/PhiaVotingAnimation";
import PhiaInviteAnimation from "@/components/PhiaInviteAnimation";
import BackToTopButton from "@/components/BackToTopButton";

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

          {/* Phia mobile vote UI video — autoplays on loop. Cropped
              with belt-and-suspenders:
                • overflow:hidden wrapper + width:150% break-out (1.5x)
                  with symmetric negative margins keeps it centered while
                  overflowing the column on both sides
                • video width:125% + translateX shifts + clip-path clip
                  to the middle 80% × top 95% of the source — all values
                  are proportional, so the 1.5x wrapper scales the crop
                  without changing what's visible. */}
          <div
            className="relative my-12"
            style={{
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
                width: "125%",
                transform: "translateX(-20%)",
                height: "auto",
                clipPath: "inset(5% 20% 5% 0)",
              }}
            />
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
              question of how do people respond to a vote.
            </p>

            {/* Phia voter (side) video — autoplays on loop. Modeled on the
                mobile vote-UI video above: centred and break-out wide.
                Cropped 30% off the left and right (full height kept), which
                trims the black side-bars to a tight portrait frame of the
                phone. Mechanism: an overflow:hidden box capped at maxWidth
                150% whose aspectRatio is the KEPT region — middle 40% width ×
                full height of the 3840×2160 source = 1536 × 2160 — holding a
                centred video blown up to width:250% so its middle 40% fills
                the box (= 30% off each side). */}
            <div
              className="relative my-12"
              style={{
                width: "150%",
                marginLeft: "-25%",
                marginRight: "-25%",
                overflow: "hidden",
                transform: "translateX(33%)",
                borderRadius: "20px",
              }}
            >
              <video
                src="/videos/phia-voter-side.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  display: "block",
                  width: "125%",
                  transform: "translateX(-33%)",
                  height: "auto",
                  clipPath: "inset(0% 33% 1px 0 round 20px)",
                }}
              />
            </div>

            <h2
              className="font-display font-bold mb-4 mt-14"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              The Built-In Growth Loop
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Every time a user sends a vote request, they&apos;re potentially
              funneling people into the Phia ecosystem who may have never heard
              of it.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              If someone in your circle doesn&apos;t have Phia, they get a text.
              The same way you&apos;d hear from a friend. The vote only means
              something if the voter is invested. Filter for people who actually
              care and get a real user out of it.
            </p>

            {/* Looped iMessage visual: blue invite appears, a typing bubble
                rises where the reply will land, then the gray reply pops in. */}
            <div className="my-12">
              <PhiaInviteAnimation />
            </div>
          </section>

          {/* ── Beyond the Competition ──────────────────────────────────── */}
          <section className="mb-10">
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#8b6b41",
                letterSpacing: "-0.01em",
              }}
            >
              Beyond the Competition
            </h2>
            <p
              className="font-sans font-normal leading-relaxed mb-4"
              style={{
                fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                color: "#5e5e5e",
              }}
            >
              Given more time, I&apos;d conduct deeper research and continue
              building out the product.
            </p>
            <p
              className="font-sans font-normal leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                color: "#5e5e5e",
              }}
            >
              I identified five metrics to measure whether Circle Vote actually
              works. The two flows I&apos;d prioritize next: the circle creation
              process and a personal votes dashboard where users can track
              active votes and see how their circle responded.
            </p>

            {/* Five-metric board — 90% of the content column width, centered */}
            <div className="my-12 flex justify-center">
              <Image
                src="/images/phia-metrics.png"
                alt="Five success metrics for Circle Vote: receiver-to-user conversion, time to decision, voting completion rate, post-purchase regret rate, and circle engagement frequency."
                width={2265}
                height={3414}
                sizes="(max-width: 1000px) 90vw, 792px"
                className="block h-auto"
                style={{ width: "60%" }}
                quality={95}
              />
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
              <section className="mb-10">
                <p
                  className="font-sans font-normal leading-relaxed mb-4"
                  style={{
                    fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                    color: "#5e5e5e",
                  }}
                >
                  Prioritizing Progress Over Perfection
                </p>
                <p
                  className="font-sans font-normal leading-relaxed"
                  style={{
                    fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                    color: "#5e5e5e",
                  }}
                >
                  I had to be scrappy and move quickly. With only 24 hours to
                  build a feature that reduced friction in shopping, I started
                  with a problem I knew from my own experience. Whenever I buy
                  clothes online, I usually text friends for their opinions
                  before checking out. That became my focus, and instead of
                  getting stuck thinking through every edge case, I designed the
                  simplest version first. A browser extension where people could
                  send items to friends and collect votes. Having something
                  tangible to show during feedback helped the conversation stay
                  grounded in the product and led people to ask how the
                  experience would work on mobile and across different screen
                  sizes.
                </p>
              </section>

              <section className="mb-10">
                <p
                  className="font-sans font-normal leading-relaxed mb-4"
                  style={{
                    fontSize: "clamp(1rem, 1.625vw, 1.125rem)",
                    color: "#5e5e5e",
                  }}
                >
                  Taking the Unconventional Route
                </p>
                <p
                  className="font-sans font-normal leading-relaxed"
                  style={{
                    fontSize: "clamp(0.875rem, 1.325vw, 0.975rem)",
                    color: "#5e5e5e",
                  }}
                >
                  I flew from San Francisco to New York for this experience
                  without knowing anyone there. Most of the designers came from
                  the New York and Boston area, and I was the only participant
                  from the West Coast. The chance to spend a weekend building
                  alongside talented designers felt too interesting to pass up.
                  I left with new connections, a feature I&apos;m genuinely
                  proud of, and more confidence in saying yes to opportunities
                  that don&apos;t follow the expected path.
                </p>
              </section>
            </div>
          </section>
        </main>
      </div>

      <BackToTopButton />
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
