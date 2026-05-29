import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnvelopeHero from "@/components/EnvelopeHero";

const projects = [
  {
    slug: "mysa",
    src: "/images/mysa-front-2.png",
    back: "/images/mysa-back-2.png",
    alt: "Mysa",
    width: 2031,
    height: 1302,
    backWidth: 2031,
    backHeight: 1302,
    tilt: -6,
  },
  {
    slug: "starwood",
    src: "/images/starwood-front-2.png",
    back: "/images/starwood-back-2.png",
    alt: "Starwood Property Trust",
    width: 2031,
    height: 1302,
    backWidth: 2031,
    backHeight: 1302,
    tilt: 10,
  },
  {
    slug: "phia",
    src: "/images/phia-front-2.png",
    back: "/images/phia-back-2.png",
    alt: "Phia",
    width: 2031,
    height: 1302,
    backWidth: 2031,
    backHeight: 1302,
    tilt: 2,
  },
];

const CARD_SIZES = "(max-width: 767px) 90vw, (max-width: 1023px) 480px, 580px";

function ProjectCard({
  p,
  className = "",
  style,
  priority = false,
}: {
  p: (typeof projects)[number];
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}) {
  return (
    <TransitionLink
      href={`/work/${p.slug}`}
      className={`block group drop-shadow-xl ${className}`}
      style={{ ...style, transform: `rotate(${p.tilt}deg)` }}
    >
      <div style={{ perspective: "2000px" }}>
        <div className="flip-inner">
          <div className="flip-front">
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes={CARD_SIZES}
              priority={priority}
              className="w-full h-auto block"
            />
          </div>
          <div className="flip-back">
            <Image
              src={p.back}
              alt={`${p.alt} — back`}
              width={p.backWidth}
              height={p.backHeight}
              unoptimized
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
    </TransitionLink>
  );
}

export default function HomePage() {
  return (
    <div className="bg-beige">
      <Header />

      {/* ─── Desktop  ≥ 1024 px ──────────────────────────────────── */}
      <div className="hidden lg:block">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-[5%] overflow-x-hidden">
          <div className="flex flex-row items-center justify-center gap-[20px]">
            <div className="shrink-0 text-left">
              <p className="font-script text-brown italic leading-none mb-2 text-[1.5rem] lg:text-[2rem]">
                Hi, I&apos;m
              </p>
              <h1 className="font-display font-normal text-brown text-[48px] lg:text-[64px] leading-[0.92]">
                Sruti
                <br />
                Gandreti
              </h1>
            </div>

            <EnvelopeHero>
              <div
                className="absolute transition-transform duration-300 ease-out hover:rotate-[7deg] cursor-pointer"
                style={{ top: "6%", right: "-12px", width: "25%" }}
              >
                <Image
                  src="/images/gt-stamp.png"
                  alt="Georgia Tech 2024 stamp"
                  width={230}
                  height={245}
                  className="w-full h-auto"
                />
              </div>
            </EnvelopeHero>
          </div>
        </section>

        {/* Cards — original absolute layout, intact at 1024 px+ */}
        <section
          id="work"
          className="relative pb-20 min-h-[1130px] lg:min-h-[1540px]"
          style={{ scrollMarginTop: "72px" }}
        >
          <ProjectCard
            p={projects[0]}
            className="absolute w-[450px] lg:w-[580px] top-[30px] lg:top-[60px]"
            style={{ left: "8%" }}
            priority
          />
          <ProjectCard
            p={projects[1]}
            className="absolute w-[450px] lg:w-[580px] top-[375px] lg:top-[520px]"
            style={{ right: "8%" }}
          />
          <ProjectCard
            p={projects[2]}
            className="absolute w-[450px] lg:w-[580px] top-[720px] lg:top-[980px]"
            style={{ left: "20%" }}
          />
        </section>
      </div>

      {/* ─── Mobile + Tablet  < 1024 px ──────────────────────────── */}
      <main className="lg:hidden pt-[60px] pb-10">
        <div className="pt-10 pb-6 text-center px-5">
          <p className="font-script text-brown italic leading-none text-[2.2rem] mb-2">
            Hi, I&apos;m
          </p>
          <h1
            className="font-display font-normal text-brown leading-[0.9]"
            style={{ fontSize: "3.8rem" }}
          >
            Sruti
            <br />
            Gandreti
          </h1>
        </div>

        <div className="relative w-[80vw] max-w-[375px] mx-auto mb-12">
          <Image
            src="/images/envelope.png"
            alt="A letter from Sruti"
            width={540}
            height={680}
            className="w-full h-auto drop-shadow-xl"
            priority
          />
          <div className="absolute top-[6%] right-[3%] w-[22%]">
            <Image
              src="/images/gt-stamp.png"
              alt="Georgia Tech 2024 stamp"
              width={230}
              height={245}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Stacked cards — centered, capped at 480 px on tablet */}
        <div
          id="work-mobile"
          className="flex flex-col items-center gap-16 px-5 md:gap-24"
          style={{ scrollMarginTop: "72px" }}
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              p={p}
              className="drop-shadow-lg w-full max-w-[480px]"
              priority={i === 0}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
