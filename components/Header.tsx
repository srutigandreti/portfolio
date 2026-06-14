import TransitionLink from "@/components/TransitionLink";
import FlowerScroll from "@/components/FlowerScroll";

export default function Header({ bg = "bg-beige/90" }: { bg?: string }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[56px] md:h-[64px] px-4 md:px-8 backdrop-blur-sm ${bg}`}
    >
      <TransitionLink
        href="/"
        className="text-[12px] md:text-[14px] tracking-[0.04em] uppercase text-ink font-normal whitespace-nowrap nav-hover-brown"
      >
        Sruti Gandreti
      </TransitionLink>

      {/* Decorative flower — desktop only. Rotates on scroll; click to
          scroll-to-top when on a case-study page. */}
      <FlowerScroll />
      <nav className="flex items-center gap-4 md:gap-8">
        <TransitionLink
          href="/#work"
          className="text-[12px] md:text-[14px] tracking-[0.04em] uppercase text-ink font-normal nav-hover-brown"
        >
          Work
        </TransitionLink>
        <TransitionLink
          href="/playground"
          className="text-[12px] md:text-[14px] tracking-[0.04em] uppercase text-ink font-normal nav-hover-brown"
        >
          Playground
        </TransitionLink>
        <TransitionLink
          href="/about"
          className="text-[12px] md:text-[14px] tracking-[0.04em] uppercase text-ink font-normal nav-hover-brown"
        >
          About
        </TransitionLink>
      </nav>
    </header>
  );
}
