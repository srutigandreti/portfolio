"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type Props = ComponentProps<typeof NextLink>;

export default function TransitionLink({
  href,
  onClick,
  children,
  ...props
}: Props) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const url = href.toString();
    if (url.startsWith("http") || url.startsWith("mailto")) return;

    e.preventDefault();

    if (!("startViewTransition" in document)) {
      router.push(url);
      return;
    }

    (
      document as Document & { startViewTransition: (cb: () => void) => void }
    ).startViewTransition(() => router.push(url));
  };

  return (
    <NextLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  );
}
