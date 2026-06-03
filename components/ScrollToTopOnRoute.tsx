"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Forces scroll to the top of the viewport on every route change.
 * Skips when the URL contains a hash so anchor navigation (#work etc.)
 * is preserved.
 *
 * Uses useLayoutEffect so the scroll happens before the browser paints
 * the new route — no visible jump.
 */
export default function ScrollToTopOnRoute() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [pathname]);

  return null;
}
