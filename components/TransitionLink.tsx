"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof NextLink>;

export default function TransitionLink(props: Props) {
  return <NextLink {...props} />;
}
