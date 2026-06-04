"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Decorative flower in the center of the desktop nav bar that rotates in
 * place as the user scrolls. On case-study pages, clicking it smoothly
 * scrolls the page to the top. Hidden on tablet/mobile (below lg).
 */
export default function FlowerScroll() {
  const pathname = usePathname();
  // /work/<slug> (with optional trailing slash) = case study page
  const isOnCaseStudy = /^\/work\/[^/]+\/?$/.test(pathname);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Drive the rotation via direct DOM writes inside a rAF — avoids a React
  // re-render on every scroll tick.
  useEffect(() => {
    let scheduled = false;
    let rafId = 0;

    const apply = () => {
      scheduled = false;
      if (wrapRef.current) {
        // 0.25deg per scrolled pixel — noticeable on a long case study,
        // restrained on a short page.
        wrapRef.current.style.transform = `rotate(${window.scrollY * 0.25}deg)`;
      }
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = requestAnimationFrame(apply);
    };

    apply(); // initial position (in case the page loaded mid-scroll)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleClick = () => {
    if (!isOnCaseStudy) return;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const flower = (
    <div
      ref={wrapRef}
      style={{ transformOrigin: "center", willChange: "transform" }}
      className="block"
    >
      <Image
        src="/images/blue-button.png"
        alt=""
        width={800}
        height={800}
        priority
        className="block w-[28px] h-[28px] xl:w-[32px] xl:h-[32px]"
      />
    </div>
  );

  // Always absolute-center to viewport (header width), hidden below lg.
  const wrapperClass =
    "hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center";

  if (isOnCaseStudy) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Scroll to top of page"
        className={`${wrapperClass} bg-transparent border-0 p-0 cursor-pointer hover:opacity-75 transition-opacity`}
      >
        {flower}
      </button>
    );
  }

  return (
    <div aria-hidden className={`${wrapperClass} pointer-events-none`}>
      {flower}
    </div>
  );
}
