"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const body = document.body;

    // The hidden starting state (opacity: 0) is defined entirely by the
    // render-blocking <head> CSS — never set here. This effect only ever ADDS
    // the `.page-ready` class, which CSS transitions TO opacity: 1.
    //
    // Initial load:  browser already painted at opacity 0 (inline CSS) →
    //                adding the class transitions it up to 1.
    // Client nav:    removing the class drops opacity back to the CSS base (0)
    //                with no transition (the transition lives only on
    //                `.page-ready`); the forced reflow commits that 0; re-adding
    //                the class then transitions the new page up to 1. Because
    //                this runs in useLayoutEffect (before paint), the new page's
    //                first painted frame is already at opacity 0 — no flash.
    body.classList.remove("page-ready");
    void body.offsetWidth; // force reflow so the 0 state is committed
    body.classList.add("page-ready");
  }, [pathname]);

  return <>{children}</>;
}
