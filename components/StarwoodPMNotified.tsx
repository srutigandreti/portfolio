"use client";

export default function StarwoodPMNotified() {
  return (
    <>
      <style>{`
        @keyframes bell-swing {
          0%,  55%, 100% { transform: rotate(0deg); }
          10%            { transform: rotate(-14deg); }
          20%            { transform: rotate(14deg); }
          30%            { transform: rotate(-10deg); }
          40%            { transform: rotate(10deg); }
          50%            { transform: rotate(-4deg); }
        }
        .sw-bell {
          transform-origin: 50% 4px;
          animation: bell-swing 2.8s ease-in-out infinite;
          animation-delay: 0.4s;
          display: inline-block;
        }
      `}</style>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 24px",
          borderRadius: "999px",
          border: "2px solid #22c55e",
          background: "rgba(34,197,94,0.1)",
          whiteSpace: "nowrap",
        }}
      >
        {/* Bell icon */}
        <span className="sw-bell">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </span>

        <span
          style={{
            fontFamily:
              '"PPNeueMontreal", ui-sans-serif, system-ui, sans-serif',
            fontWeight: 500,
            fontSize: "1rem",
            color: "#22c55e",
            letterSpacing: "0.01em",
          }}
        >
          PM Notified
        </span>
      </div>
    </>
  );
}
