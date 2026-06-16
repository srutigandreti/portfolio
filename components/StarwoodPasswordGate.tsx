"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const PASSWORD = "s9wc7IjbM7a57ssF";

export default function StarwoodPasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function copyEmail() {
    navigator.clipboard.writeText("sruti.gandreti@gmail.com").then(() => {
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2100);
    });
  }

  function attemptUnlock() {
    if (value === PASSWORD) {
      setUnlocked(true);
      setError(false);
      setValue("");
    } else {
      setError(true);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="max-w-[1000px] mx-auto px-6 md:px-[60px] py-6">
      <div
        className="relative w-full"
        style={{ aspectRatio: "2814 / 1209", containerType: "inline-size" }}
      >
        <Image
          src="/images/password-protected-banner.png"
          alt="This case study is password protected"
          fill
          className="object-contain"
          priority
          quality={95}
          sizes="(max-width: 1000px) 100vw, 880px"
        />

        {/* Want to see it? Contact me. — overlay between heading and input */}
        <p
          className="absolute left-[8%] right-[8%] font-display text-white"
          style={{
            bottom: "42%",
            fontWeight: 300,
            fontSize: "clamp(0.5rem, 2.2cqw, 1rem)",
          }}
        >
          Want to see it?{" "}
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address to clipboard"
            className="relative inline-flex items-baseline gap-[0.2em] text-[#3B2100] transition-colors duration-150 hover:text-[#2563eb] cursor-pointer border-0 bg-transparent p-0"
            style={{
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
            }}
          >
            {copied && (
              <span
                className="absolute left-1/2 pointer-events-none select-none"
                style={{
                  bottom: "calc(100% + 3px)",
                  transform: "translateX(-50%)",
                  fontSize: "0.68em",
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                  fontFamily: '"Unbounded", sans-serif',
                  fontWeight: 400,
                  animation: "fade-in-up 2s ease-out forwards",
                }}
              >
                Copied!
              </span>
            )}
            Email
            {/* copy icon: two stacked rounded rectangles */}
            <svg
              width="0.85em"
              height="0.85em"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              style={{
                display: "inline",
                verticalAlign: "middle",
                marginBottom: "0.1em",
              }}
            >
              {/* back rect */}
              <rect
                x="8"
                y="2"
                width="13"
                height="16"
                rx="3"
                ry="3"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              {/* front rect */}
              <rect
                x="3"
                y="7"
                width="13"
                height="15"
                rx="3"
                ry="3"
                stroke="currentColor"
                strokeWidth="1.75"
                fill="#AD8A59"
              />
            </svg>
          </button>{" "}
          me.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            attemptUnlock();
          }}
          className="absolute left-[8%] right-[8%] bottom-[14.7%]"
        >
          <div
            className="relative rounded-[14px] backdrop-blur-[1px]"
            style={{ backgroundColor: "rgba(241, 241, 241, 0.2)" }}
          >
            <input
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter"
              aria-label="Enter password to view case study"
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-transparent text-white outline-none border-0 pl-3 pr-10 sm:pl-4 sm:pr-11 md:pl-5 md:pr-12 py-[clamp(0.15rem,1.3cqw,1rem)] placeholder:text-white/90"
              style={{
                fontFamily: '"PPNeueMontreal", sans-serif',
                fontWeight: 400,
                fontSize: "clamp(0.85rem, 2.8vw, 1.25rem)",
                letterSpacing: "0.01em",
              }}
            />
            <button
              type="submit"
              aria-label="Submit password"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity p-1"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {error && (
            <p
              className="mt-2 text-center font-sans"
              style={{ fontSize: "0.8rem", color: "#ffffff" }}
            >
              Incorrect password.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
