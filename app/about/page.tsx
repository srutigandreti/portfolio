import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
};

const experience = [
  {
    company: "Starwood Property Trust",
    role: "Design Engineer",
    years: "2024 — 2026",
  },
  { company: "Mysa", role: "Design Director", years: "2025" },
  {
    company: "Verizon",
    role: "Full Stack Developer Intern",
    years: "2022, 2023",
  },
  { company: "Georgia Tech VIP", role: "UX Designer", years: "2022 — 2023" },
  {
    company: "Rhodes College",
    role: "Bioinformatics Researcher",
    years: "2019",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-beige min-h-screen flex flex-col">
      <Header bg="bg-beige/90" />

      <main className="flex-1 pt-[56px] md:pt-[64px]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 pb-20">
            {/* ── Badge (left) ───────────────────────────────────────── */}
            <div className="lg:sticky lg:top-[64px] lg:self-start lg:h-[calc(100svh-64px)] lg:flex lg:items-end">
              <Image
                src="/images/badge.png"
                alt="Sruti Gandreti — Creative Technologist badge"
                width={3676}
                height={9212}
                sizes="(min-width: 1024px) 300px, 225px"
                quality={95}
                priority
                className="block h-auto mx-auto lg:mx-0 w-[min(225px,calc((100svh-56px)*0.399))] md:w-[min(225px,calc((100svh-64px)*0.399))] lg:w-[min(300px,calc(100svh*0.399))]"
              />
            </div>

            {/* ── Content (right) ────────────────────────────────────── */}
            <div className="lg:pt-8">
              {/* Greeting */}
              <h1
                className="font-display font-light leading-tight mb-6"
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                  color: "#5e5e5e",
                }}
              >
                Hi, I&apos;m{" "}
                <strong className="font-bold" style={{ color: "#8b6b41" }}>
                  Sruti
                </strong>{" "}
                <span aria-hidden>👋</span>
              </h1>

              {/* Lede */}
              <p
                className="font-sans font-normal leading-relaxed mb-8"
                style={{
                  fontSize: "clamp(1.025rem, 1.75vw, 1.175rem)",
                  color: "#5e5e5e",
                }}
              >
                Designer + engineer crafting experiences that matter.
              </p>

              {/* Body */}
              <div
                className="font-sans font-normal leading-relaxed space-y-5 mb-6"
                style={{
                  fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                  color: "#5e5e5e",
                }}
              >
                <p>
                  With a background in software engineering, I love working at
                  the intersection of tech, design, and people. I collaborate
                  with technical fluency and genuine user empathy to help
                  transform ambiguity into thoughtfully designed, useful
                  products/brands.
                </p>

                <p>
                  Most recently, I worked as a Design Engineer at Starwood
                  Property Trust, designing internal tools and AI-powered
                  workflows in finance.
                </p>
              </div>

              {/* Outside of design list */}
              <div
                className="font-sans font-normal leading-relaxed mb-14"
                style={{
                  fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                  color: "#5e5e5e",
                }}
              >
                <p className="mb-2">Outside of work, I&apos;m probably:</p>
                <ul className="space-y-1">
                  <li className="flex gap-3">
                    <span
                      aria-hidden
                      style={{ color: "#8b6b41" }}
                      className="select-none"
                    >
                      •
                    </span>
                    <span>exploring the outdoors hiking</span>
                  </li>
                  <li className="flex gap-3">
                    <span
                      aria-hidden
                      style={{ color: "#8b6b41" }}
                      className="select-none"
                    >
                      •
                    </span>
                    <span>
                      doing something artsy (pottery, sketching, poetry)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span
                      aria-hidden
                      style={{ color: "#8b6b41" }}
                      className="select-none"
                    >
                      •
                    </span>
                    <span>or stopping to pet every dog I pass ツ</span>
                  </li>
                </ul>
              </div>

              {/* ── Experience ──────────────────────────────────────── */}
              <section
                className="border-t pt-8 mb-12"
                style={{ borderColor: "rgba(94,94,94,0.15)" }}
              >
                <h2
                  className="font-display font-extralight uppercase tracking-widest mb-6"
                  style={{ fontSize: "0.775rem", color: "#8b6b41" }}
                >
                  Experience
                </h2>

                <ul className="space-y-4">
                  {experience.map(({ company, role, years }) => (
                    <li
                      key={company}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1"
                    >
                      <p
                        className="font-sans leading-snug"
                        style={{ fontSize: "0.965rem", color: "#5e5e5e" }}
                      >
                        <span className="font-medium">{company}</span>
                        <span style={{ color: "#8b6b41" }}> / </span>
                        {role}
                      </p>
                      <p
                        className="font-sans leading-snug whitespace-nowrap"
                        style={{ fontSize: "0.85rem", color: "#8b6b41" }}
                      >
                        {years}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* ── Education ───────────────────────────────────────── */}
              <section
                className="border-t pt-8"
                style={{ borderColor: "rgba(94,94,94,0.15)" }}
              >
                <h2
                  className="font-display font-extralight uppercase tracking-widest mb-6"
                  style={{ fontSize: "0.775rem", color: "#8b6b41" }}
                >
                  Education
                </h2>

                <div className="space-y-1">
                  <p
                    className="font-sans leading-snug"
                    style={{ fontSize: "0.965rem", color: "#5e5e5e" }}
                  >
                    <span className="font-medium">
                      Georgia Institute of Technology
                    </span>
                    <span style={{ color: "#8b6b41" }}> / </span>
                    Bachelor of Science in Computer Science
                  </p>
                  <p
                    className="font-sans leading-snug"
                    style={{ fontSize: "0.85rem", color: "#8b6b41" }}
                  >
                    Human-Computer Interaction + Media Threads
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
