"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

export default function EnvelopeHero({
  children,
}: {
  children: React.ReactNode;
}) {
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotated, setRotated] = useState(false);

  const getAlpha = useCallback((e: React.MouseEvent): number => {
    const wrapper = imgWrapperRef.current;
    if (!wrapper) return 0;
    const img = wrapper.querySelector("img") as HTMLImageElement | null;
    if (!img?.complete || !img.naturalWidth) return 0;

    if (!canvasRef.current || canvasRef.current.width !== img.naturalWidth) {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      try {
        c.getContext("2d")?.drawImage(img, 0, 0);
      } catch {
        return 0;
      }
      canvasRef.current = c;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return 0;
    const rect = img.getBoundingClientRect();
    const px = Math.floor(
      (e.clientX - rect.left) * (img.naturalWidth / rect.width),
    );
    const py = Math.floor(
      (e.clientY - rect.top) * (img.naturalHeight / rect.height),
    );
    if (px < 0 || py < 0 || px >= img.naturalWidth || py >= img.naturalHeight)
      return 0;
    return ctx.getImageData(px, py, 1, 1).data[3];
  }, []);

  return (
    <div className="hero-envelope shrink-0 relative">
      {/* Mouse events only on the image — stamp (children) is a sibling so it won't trigger this */}
      <div
        ref={imgWrapperRef}
        onMouseMove={(e) => setRotated(getAlpha(e) > 20)}
        onMouseLeave={() => setRotated(false)}
      >
        <Image
          src="/images/envelope.png"
          alt="A letter from Sruti"
          width={540}
          height={680}
          className="w-full h-auto drop-shadow-xl cursor-pointer transition-transform duration-300 ease-out"
          style={{ transform: rotated ? "rotate(-3deg)" : undefined }}
          priority
        />
      </div>
      {children}
    </div>
  );
}
