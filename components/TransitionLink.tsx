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

    const navigate = () => {
      router.push(url);
      // Reset scroll to top on every navigation — without this, view transitions
      // preserve the previous page's scroll position. Skip when jumping to an
      // anchor (e.g. /#work) since Next handles that scroll itself.
      if (!url.includes("#")) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant" as ScrollBehavior,
        });
      }
    };

    if (!("startViewTransition" in document)) {
      navigate();
      return;
    }

    (
      document as Document & { startViewTransition: (cb: () => void) => void }
    ).startViewTransition(navigate);
  };

  return (
    <NextLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  );
}
