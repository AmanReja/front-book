import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── Font injection ───────────────────────────────────────────────────────── */
const injectFonts = () => {
  if (document.getElementById("bs-fonts")) return;
  const link = document.createElement("link");
  link.id = "bs-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
  document.head.appendChild(link);
};

/* ─── Keyframes injected once ──────────────────────────────────────────────── */
const injectKeyframes = () => {
  if (document.getElementById("bs-hero-kf")) return;
  const style = document.createElement("style");
  style.id = "bs-hero-kf";
  style.textContent = `
    @keyframes bs-fade-up {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes bs-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes bs-float {
      0%, 100% { transform: translateY(0px) rotate(-2deg); }
      50%       { transform: translateY(-14px) rotate(-2deg); }
    }
    @keyframes bs-float2 {
      0%, 100% { transform: translateY(0px) rotate(3deg); }
      50%       { transform: translateY(-10px) rotate(3deg); }
    }
    @keyframes bs-float3 {
      0%, 100% { transform: translateY(0px) rotate(-1deg); }
      50%       { transform: translateY(-18px) rotate(-1deg); }
    }
    @keyframes bs-scroll-pulse {
      0%, 100% { opacity: 0.3; transform: translateY(0); }
      50%       { opacity: 0.8; transform: translateY(5px); }
    }
    .bs-hero-tag:hover {
      border-color: rgba(245,240,232,0.3) !important;
      background: rgba(245,240,232,0.08) !important;
    }
  `;
  document.head.appendChild(style);
};

/* ─── Floating book card ───────────────────────────────────────────────────── */
function FloatingBook({ title, author, color, top, left, delay, animName, rotate }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: "120px",
        animation: `${animName} 5s ease-in-out ${delay}s infinite`,
        opacity: 0.18,
        transform: `rotate(${rotate})`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: color,
          borderRadius: "6px",
          padding: "14px 10px",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.4)", marginBottom: "8px" }} />
        <div style={{ width: "70%", height: "2px", background: "rgba(255,255,255,0.25)", marginBottom: "40px" }} />
        <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", marginTop: "2px" }}>{author}</div>
      </div>
    </div>
  );
}

/* ─── Herobanner ───────────────────────────────────────────────────────────── */
function Herobanner() {
  injectFonts();
  injectKeyframes();

  const tags = ["Fiction", "Non-fiction", "Sci-fi", "Biography", "Poetry", "History"];

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "2rem 1rem",
      }}
    >
      {/* ── Subtle grid texture ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(245,240,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* ── Radial glow center ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(245,240,232,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Floating book decorations ── */}
      <FloatingBook title="Dune" author="Frank Herbert" color="#3b4a6b" top="12%" left="5%" delay={0} animName="bs-float3" rotate="-2deg" />
      <FloatingBook title="Sapiens" author="Y. N. Harari" color="#4a3b2a" top="60%" left="3%" delay={1.2} animName="bs-float2" rotate="3deg" />
      <FloatingBook title="The Alchemist" author="Paulo Coelho" color="#2a4a3b" top="15%" left="82%" delay={0.6} animName="bs-float" rotate="-1deg" />
      <FloatingBook title="Atomic Habits" author="James Clear" color="#4a2a3b" top="65%" left="85%" delay={1.8} animName="bs-float2" rotate="2deg" />

      {/* ── Main content ── */}
      <div style={{ maxWidth: "720px", width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>

        {/* Eyebrow */}
        <div
          style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.4)",
            border: "0.5px solid rgba(245,240,232,0.12)",
            borderRadius: "20px",
            padding: "5px 14px",
            marginBottom: "2rem",
            animation: "bs-fade-in 0.6s ease forwards",
          }}
        >
          Welcome to the bookstore
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(36px, 7vw, 68px)",
            fontWeight: 400,
            color: "#f5f0e8",
            lineHeight: 1.1,
            margin: "0 0 1.5rem",
            letterSpacing: "-1px",
            animation: "bs-fade-up 0.7s ease 0.15s both",
          }}
        >
          Every page is<br />
          <span style={{ fontStyle: "italic", color: "rgba(245,240,232,0.55)" }}>
            an adventure
          </span>
        </h1>

        {/* Body copy */}
        <p
          style={{
            fontSize: "16px",
            color: "rgba(245,240,232,0.42)",
            lineHeight: 1.75,
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
            animation: "bs-fade-up 0.7s ease 0.3s both",
          }}
        >
          A sanctuary where the power of words sparks hope and possibility.
          Thousands of curated titles, waiting for your next chapter.
        </p>

        {/* Genre tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "2.5rem",
            animation: "bs-fade-up 0.7s ease 0.42s both",
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="bs-hero-tag"
              style={{
                fontSize: "12px",
                color: "rgba(245,240,232,0.45)",
                border: "0.5px solid rgba(245,240,232,0.12)",
                borderRadius: "20px",
                padding: "5px 12px",
                cursor: "default",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            animation: "bs-fade-up 0.7s ease 0.55s both",
          }}
        >
          <Link to="/products" style={{ textDecoration: "none" }}>
            <button
              style={{
                height: "46px",
                padding: "0 28px",
                background: "#f5f0e8",
                color: "#0f0f0f",
                border: "none",
                borderRadius: "40px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                letterSpacing: "0.01em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Browse collection
            </button>
          </Link>

          <Link to="/about" style={{ textDecoration: "none" }}>
            <button
              style={{
                height: "46px",
                padding: "0 28px",
                background: "transparent",
                color: "#f5f0e8",
                border: "0.5px solid rgba(245,240,232,0.2)",
                borderRadius: "40px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                cursor: "pointer",
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(245,240,232,0.4)";
                e.currentTarget.style.background = "rgba(245,240,232,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(245,240,232,0.2)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Learn more
            </button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            marginTop: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            animation: "bs-fade-in 1s ease 1s both",
          }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.2)" }}>
            Scroll
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(245,240,232,0.25)"
            strokeWidth="1.5"
            style={{ animation: "bs-scroll-pulse 2s ease-in-out infinite" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Herobanner;