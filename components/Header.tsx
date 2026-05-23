import TransitionLink from "@/components/TransitionLink";

export default function Header({ bg = "bg-beige/90" }: { bg?: string }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-4 backdrop-blur-sm ${bg}`}
    >
      <TransitionLink
        href="/"
        className="text-[12px] md:text-[14px] tracking-[0.04em] uppercase text-ink font-normal whitespace-nowrap"
      >
        Sruti Gandreti
      </TransitionLink>
      <nav className="flex items-center gap-4 md:gap-8">
        <TransitionLink
          href="/#work"
          className="text-[12px] md:text-[14px] tracking-[0.04em] uppercase text-ink font-normal hover:text-ink-muted transition-colors"
        >
          Work
        </TransitionLink>
        <TransitionLink
          href="/playground"
          className="text-[12px] md:text-[14px] tracking-[0.04em] uppercase text-ink font-normal hover:text-ink-muted transition-colors"
        >
          Playground
        </TransitionLink>
        <TransitionLink
          href="/about"
          className="text-[12px] md:text-[14px] tracking-[0.04em] uppercase text-ink font-normal hover:text-ink-muted transition-colors"
        >
          About
        </TransitionLink>
      </nav>
    </header>
  );
}
