"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof NextLink>;

// Thin passthrough over next/link. The page fade-in on navigation is handled
// by PageTransition (it toggles the `.page-ready` class on <body> when the
// route changes), so no per-link logic is needed here.
export default function TransitionLink(props: Props) {
  return <NextLink {...props} />;
}
