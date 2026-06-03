"use client";

import { useState } from "react";
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
      <div className="relative w-full" style={{ aspectRatio: "2814 / 1209" }}>
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
            bottom: "40%",
            fontWeight: 300,
            fontSize: "clamp(0.96rem, 1.68vw, 1.14rem)",
          }}
        >
          Want to see it?{" "}
          <a
            href="mailto:sruti.gandreti@gmail.com"
            aria-label="Email Sruti to request password"
            className="text-[#3B2100]! transition-colors duration-150 hover:text-[#2563eb]!"
          >
            Contact
          </a>{" "}
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
              className="w-full bg-transparent text-white outline-none border-0 pl-5 pr-12 py-3 sm:py-3.5 md:py-4 placeholder:text-white/90"
              style={{
                fontFamily: '"PPNeueMontreal", sans-serif',
                fontWeight: 400,
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
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
