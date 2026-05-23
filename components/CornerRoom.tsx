"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HotSpot {
  id: string;
  label: string;
  sublabel?: string;
  href?: string;
  /* percentage-based position relative to the illustration container */
  top: string;
  left: string;
  width: string;
  height: string;
}

const hotspots: HotSpot[] = [
  {
    id: "photowall",
    label: "Photo Wall",
    href: "/playground/photowall",
    top: "13%",
    left: "57%",
    width: "25%",
    height: "34%",
  },
  {
    id: "potteryshelf",
    label: "Pottery Shelf",
    sublabel: "Coming Soon",
    top: "20%",
    left: "5%",
    width: "30%",
    height: "42%",
  },
];

export default function CornerRoom() {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative block w-full select-none">
      <Image
        src="/images/corner.png"
        alt="Sruti's corner — an isometric cozy room"
        width={640}
        height={620}
        className="w-full h-auto"
        priority
      />

      {hotspots.map((spot) => (
        <div
          key={spot.id}
          className={`absolute ${spot.href ? "cursor-pointer" : "cursor-default"}`}
          style={{
            top: spot.top,
            left: spot.left,
            width: spot.width,
            height: spot.height,
          }}
          onMouseEnter={() => setActive(spot.id)}
          onMouseLeave={() => setActive(null)}
          onClick={() => {
            if (!spot.href) return;
            if ("startViewTransition" in document) {
              (
                document as Document & {
                  startViewTransition: (cb: () => void) => void;
                }
              ).startViewTransition(() => router.push(spot.href!));
            } else {
              router.push(spot.href);
            }
          }}
        >
          {/* Tooltip bubble — centered on the hotspot */}
          <div
            className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              text-white font-sans font-normal text-center
              text-[17px] tracking-[0.04em]
              rounded-[22px]
              transition-all duration-200 ease-out pointer-events-none
              ${active === spot.id ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
            style={{
              background: "rgba(90,46,27,0.8)",
              padding: spot.sublabel ? "8px 22px" : "14px 22px",
              fontFamily:
                '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
            }}
          >
            <span className="block whitespace-nowrap">{spot.label}</span>
            {spot.sublabel && (
              <span
                className="block whitespace-nowrap italic"
                style={{ fontSize: "9px", opacity: 0.8, marginTop: "2px" }}
              >
                {spot.sublabel}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
