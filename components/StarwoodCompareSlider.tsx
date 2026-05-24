"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

export default function StarwoodCompareSlider() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(
      Math.max(((clientX - rect.left) / rect.width) * 100, 0),
      100,
    );
    setPosition(pct);
  }, []);

  // Mouse
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => updatePosition(e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, updatePosition]);

  // Touch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX);
    const onEnd = () => setIsDragging(false);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "3760 / 1700",
        overflow: "hidden",
        borderRadius: "10px",
        userSelect: "none",
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {/* ── Left image: Prototype A — full opacity, centered ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/starwood-prototype-a.png"
          alt="Prototype A"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          draggable={false}
        />
      </div>

      {/* ── Right image: Prototype B — full opacity, centered, clipped ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 0 0 ${position}%)`,
        }}
      >
        <Image
          src="/images/starwood-prototype-b.png"
          alt="Prototype B"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          draggable={false}
        />
      </div>

      {/* ── Divider line: two halves so it doesn't bleed through the handle ── */}
      {/* Top half */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${position}%`,
          width: "2px",
          height: "calc(50% - 24px)",
          background: "rgba(255,255,255,0.9)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      {/* Bottom half */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: `${position}%`,
          width: "2px",
          height: "calc(50% - 24px)",
          background: "rgba(255,255,255,0.9)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* ── Drag handle ── */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          position: "absolute",
          top: "50%",
          left: `${position}%`,
          transform: "translate(-50%, -50%)",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(199,199,199,0.27)",
          cursor: isDragging ? "grabbing" : "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          gap: "4px",
        }}
      >
        {/* Left arrow */}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M6.5 1.5L2.5 5L6.5 8.5"
            stroke="#BDBDBD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Right arrow */}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M3.5 1.5L7.5 5L3.5 8.5"
            stroke="#BDBDBD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ── Labels ── */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "14px",
          background: "rgba(0,0,0,0.6)",
          color: "white",
          fontSize: "0.75rem",
          fontFamily: '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
          fontWeight: 500,
          letterSpacing: "0.02em",
          padding: "5px 12px",
          borderRadius: "999px",
          pointerEvents: "none",
          zIndex: 6,
          backdropFilter: "blur(4px)",
        }}
      >
        Prototype A
      </div>
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          background: "rgba(0,0,0,0.6)",
          color: "white",
          fontSize: "0.75rem",
          fontFamily: '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
          fontWeight: 500,
          letterSpacing: "0.02em",
          padding: "5px 12px",
          borderRadius: "999px",
          pointerEvents: "none",
          zIndex: 6,
          backdropFilter: "blur(4px)",
        }}
      >
        Prototype B
      </div>
    </div>
  );
}
