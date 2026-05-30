"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";

type Project = {
  slug: string;
  src: string;
  back: string;
  alt: string;
  width: number;
  height: number;
  backWidth: number;
  backHeight: number;
  tilt: number;
};

const CARD_SIZES = "(max-width: 767px) 90vw, (max-width: 1023px) 480px, 580px";

export default function MobileProjectCardList({
  projects,
}: {
  projects: Project[];
}) {
  // Only one card may be flipped at a time so the back faces don't compete
  // for the user's attention on a small screen.
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null);

  return (
    <div
      id="work-mobile"
      className="flex flex-col items-center gap-16 px-5 md:gap-24"
      style={{ scrollMarginTop: "72px" }}
    >
      {projects.map((p, i) => {
        const isFlipped = flippedSlug === p.slug;
        const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
          if (!isFlipped) {
            // First tap reveals the back — second tap navigates.
            e.preventDefault();
            setFlippedSlug(p.slug);
          }
        };
        return (
          <TransitionLink
            key={p.slug}
            href={`/work/${p.slug}`}
            onClick={handleClick}
            data-flipped={isFlipped ? "true" : "false"}
            aria-expanded={isFlipped}
            className="block group drop-shadow-lg w-full max-w-[480px]"
            style={{ transform: `rotate(${p.tilt}deg)` }}
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
                    priority={i === 0}
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
      })}
    </div>
  );
}
