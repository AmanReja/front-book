const injectAssets = () => {
  if (!document.getElementById("bs-fonts")) {
    const link = document.createElement("link");
    link.id = "bs-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
    document.head.appendChild(link);
  }
  if (!document.getElementById("bs-loader-kf")) {
    const style = document.createElement("style");
    style.id = "bs-loader-kf";
    style.textContent = `
      @keyframes bs-page-turn {
        0%   { transform: rotateY(0deg);   opacity: 1; }
        50%  { transform: rotateY(-90deg); opacity: 0.3; }
        100% { transform: rotateY(0deg);   opacity: 1; }
      }
      @keyframes bs-fade-pulse {
        0%, 100% { opacity: 0.2; }
        50%       { opacity: 0.6; }
      }
      @keyframes bs-dot-bounce {
        0%, 80%, 100% { transform: translateY(0);    opacity: 0.3; }
        40%            { transform: translateY(-8px); opacity: 1;   }
      }
      @keyframes bs-shimmer {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(100%);  }
      }
      .bs-book-page {
        animation: bs-page-turn 1.4s ease-in-out infinite;
        transform-origin: left center;
        transform-style: preserve-3d;
      }
      .bs-book-page:nth-child(2) { animation-delay: 0.2s; }
      .bs-book-page:nth-child(3) { animation-delay: 0.4s; }
      .bs-dot { animation: bs-dot-bounce 1.2s ease-in-out infinite; }
      .bs-dot:nth-child(2) { animation-delay: 0.15s; }
      .bs-dot:nth-child(3) { animation-delay: 0.3s;  }
    `;
    document.head.appendChild(style);
  }
};

function Loader() {
  injectAssets();

  return (
    <div
      style={{
        background: "#0f0f0f",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(245,240,232,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* ── Animated open book ── */}
      <div style={{ perspective: "400px", position: "relative" }}>
        <svg
          width="80"
          height="60"
          viewBox="0 0 80 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Book spine */}
          <rect x="37" y="8" width="6" height="44" rx="1" fill="rgba(245,240,232,0.15)" />

          {/* Left cover */}
          <path
            d="M37 10 C20 10 8 14 4 20 L4 52 C8 46 20 44 37 44 Z"
            fill="rgba(245,240,232,0.08)"
            stroke="rgba(245,240,232,0.2)"
            strokeWidth="0.5"
          />

          {/* Right cover */}
          <path
            d="M43 10 C60 10 72 14 76 20 L76 52 C72 46 60 44 43 44 Z"
            fill="rgba(245,240,232,0.08)"
            stroke="rgba(245,240,232,0.2)"
            strokeWidth="0.5"
          />

          {/* Animated pages — left side */}
          <g style={{ transformOrigin: "37px 27px" }} className="bs-book-page">
            <path
              d="M37 14 C26 14 14 17 8 22 L8 48 C14 43 26 41 37 41 Z"
              fill="rgba(245,240,232,0.05)"
              stroke="rgba(245,240,232,0.12)"
              strokeWidth="0.5"
            />
          </g>
          <g style={{ transformOrigin: "37px 27px", animationDelay: "0.2s" }} className="bs-book-page">
            <path
              d="M37 16 C27 16 16 19 10 24 L10 46 C16 41 27 39 37 39 Z"
              fill="rgba(245,240,232,0.04)"
              stroke="rgba(245,240,232,0.09)"
              strokeWidth="0.5"
            />
          </g>

          {/* Animated pages — right side */}
          <g style={{ transformOrigin: "43px 27px", animationDelay: "0.1s" }} className="bs-book-page">
            <path
              d="M43 14 C54 14 66 17 72 22 L72 48 C66 43 54 41 43 41 Z"
              fill="rgba(245,240,232,0.05)"
              stroke="rgba(245,240,232,0.12)"
              strokeWidth="0.5"
            />
          </g>
          <g style={{ transformOrigin: "43px 27px", animationDelay: "0.3s" }} className="bs-book-page">
            <path
              d="M43 16 C53 16 64 19 70 24 L70 46 C64 41 53 39 43 39 Z"
              fill="rgba(245,240,232,0.04)"
              stroke="rgba(245,240,232,0.09)"
              strokeWidth="0.5"
            />
          </g>

          {/* Text lines on right page */}
          <line x1="48" y1="22" x2="68" y2="24" stroke="rgba(245,240,232,0.15)" strokeWidth="1" strokeLinecap="round" />
          <line x1="48" y1="27" x2="66" y2="29" stroke="rgba(245,240,232,0.1)"  strokeWidth="1" strokeLinecap="round" />
          <line x1="48" y1="32" x2="64" y2="34" stroke="rgba(245,240,232,0.1)"  strokeWidth="1" strokeLinecap="round" />
          <line x1="48" y1="37" x2="60" y2="39" stroke="rgba(245,240,232,0.07)" strokeWidth="1" strokeLinecap="round" />

          {/* Text lines on left page */}
          <line x1="12" y1="22" x2="32" y2="24" stroke="rgba(245,240,232,0.15)" strokeWidth="1" strokeLinecap="round" />
          <line x1="12" y1="27" x2="34" y2="29" stroke="rgba(245,240,232,0.1)"  strokeWidth="1" strokeLinecap="round" />
          <line x1="14" y1="32" x2="32" y2="34" stroke="rgba(245,240,232,0.1)"  strokeWidth="1" strokeLinecap="round" />
          <line x1="16" y1="37" x2="30" y2="39" stroke="rgba(245,240,232,0.07)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Wordmark ── */}
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "24px",
          fontWeight: 400,
          color: "#f5f0e8",
          margin: "0 0 4px",
          letterSpacing: "-0.3px",
          animation: "bs-fade-pulse 2s ease-in-out infinite",
        }}>
          Nov<span style={{ fontStyle: "italic", color: "rgba(245,240,232,0.35)" }}>elity</span>
        </p>
        <p style={{
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(245,240,232,0.25)",
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Loading your collection
        </p>
      </div>

      {/* ── Bouncing dots ── */}
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="bs-dot"
            style={{
              display: "block",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "rgba(245,240,232,0.4)",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div style={{
        width: "140px",
        height: "1px",
        background: "rgba(245,240,232,0.08)",
        borderRadius: "1px",
        overflow: "hidden",
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent, rgba(245,240,232,0.5), transparent)",
          animation: "bs-shimmer 1.6s ease-in-out infinite",
        }} />
      </div>
    </div>
  );
}

export default Loader;