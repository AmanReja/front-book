/* ─── Font + keyframe injection ────────────────────────────────────────────── */
const injectAssets = () => {
  if (!document.getElementById("bs-fonts")) {
    const link = document.createElement("link");
    link.id = "bs-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
    document.head.appendChild(link);
  }
  if (!document.getElementById("bs-mid-kf")) {
    const style = document.createElement("style");
    style.id = "bs-mid-kf";
    style.textContent = `
      @keyframes bs-fade-up {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .bs-tcard {
        background: #1a1a1a;
        border: 0.5px solid rgba(245,240,232,0.08);
        border-radius: 14px;
        padding: 1.25rem;
        transition: border-color 0.2s, transform 0.2s;
        text-decoration: none;
        display: block;
        cursor: pointer;
      }
      .bs-tcard:hover {
        border-color: rgba(245,240,232,0.2);
        transform: translateY(-3px);
      }
      .bs-tcard:hover .bs-quote-mark {
        opacity: 0.4;
      }
    `;
    document.head.appendChild(style);
  }
};

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const testimonials = [
  {
    name: "Kanye West",
    role: "Rapper & Entrepreneur",
    avatar: "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    quote: "Find God.",
    href: "https://twitter.com/kanyewest",
    initials: "KW",
  },
  {
    name: "Tim Cook",
    role: "CEO of Apple",
    avatar: "https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg",
    quote:
      "Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.",
    href: "https://twitter.com/tim_cook",
    initials: "TC",
  },
  {
    name: "Parag Agrawal",
    role: "CEO of Twitter",
    avatar: "https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg",
    quote:
      "Enim neque volutpat ac tincidunt vitae semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam pellentesque nec.",
    href: "https://twitter.com/paraga",
    initials: "PA",
  },
  {
    name: "Satya Nadella",
    role: "CEO of Microsoft",
    avatar: "https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg",
    quote:
      "Tortor dignissim convallis aenean et tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi.",
    href: "https://twitter.com/satyanadella",
    initials: "SN",
  },
  {
    name: "Dan Schulman",
    role: "CEO of PayPal",
    avatar: "https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg",
    quote:
      "Quam pellentesque nec nam aliquam sem et tortor consequat id. Enim sit amet venenatis urna cursus eget nunc.",
    href: "https://twitter.com/dan_schulman",
    initials: "DS",
  },
  {
    name: "Elon Musk",
    role: "CEO of Tesla & SpaceX",
    avatar: "https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg",
    quote:
      "Reading is the foundation of everything. The more you read, the more you can imagine — and the more you can imagine, the more you can build.",
    href: "https://twitter.com/elonmusk",
    initials: "EM",
  },
];

/* ─── Testimonial card ──────────────────────────────────────────────────────── */
function TCard({ name, role, avatar, quote, href, initials, delay }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bs-tcard"
      style={{ animation: `bs-fade-up 0.5s ease ${delay}s both` }}
    >
      {/* Quote mark */}
      <div
        className="bs-quote-mark"
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "48px",
          lineHeight: 1,
          color: "rgba(245,240,232,0.15)",
          marginBottom: "4px",
          transition: "opacity 0.2s",
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.7,
          color: "rgba(245,240,232,0.55)",
          margin: "0 0 1.25rem",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {quote}
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={avatar}
            alt={name}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid rgba(245,240,232,0.12)",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback avatar */}
          <div
            style={{
              display: "none",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(245,240,232,0.1)",
              border: "1px solid rgba(245,240,232,0.12)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(245,240,232,0.5)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {initials}
          </div>
        </div>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 500,
              color: "#f5f0e8",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {name}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              color: "rgba(245,240,232,0.3)",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            {role}
          </p>
        </div>
      </div>
    </a>
  );
}

/* ─── Midfooter ─────────────────────────────────────────────────────────────── */
function Midfooter() {
  injectAssets();

  /* Split into 3 columns masonry-style */
  const col1 = [testimonials[0], testimonials[3]];
  const col2 = [testimonials[1], testimonials[4]];
  const col3 = [testimonials[2], testimonials[5]];

  return (
    <section
      style={{
        background: "#0f0f0f",
        padding: "5rem 1.5rem",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top border accent */}
      <div style={{
        position: "absolute",
        top: 0, left: "10%", right: "10%",
        height: "0.5px",
        background: "linear-gradient(90deg, transparent, rgba(245,240,232,0.12), transparent)",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
            animation: "bs-fade-up 0.5s ease both",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.35)",
              border: "0.5px solid rgba(245,240,232,0.1)",
              borderRadius: "20px",
              padding: "4px 14px",
              marginBottom: "1.25rem",
            }}
          >
            Words from others
          </span>

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(28px, 5vw, 46px)",
              fontWeight: 400,
              color: "#f5f0e8",
              margin: "0 0 12px",
              letterSpacing: "-0.5px",
            }}
          >
            It's not just us.
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "rgba(245,240,232,0.38)",
              margin: 0,
              maxWidth: "380px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.65,
            }}
          >
            Here's what others have to say about their experience with us.
          </p>
        </div>

        {/* Masonry grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          {/* Column 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {col1.map((t, i) => (
              <TCard key={t.name + i} {...t} delay={0.1 + i * 0.1} />
            ))}
          </div>

          {/* Column 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {col2.map((t, i) => (
              <TCard key={t.name + i} {...t} delay={0.2 + i * 0.1} />
            ))}
          </div>

          {/* Column 3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {col3.map((t, i) => (
              <TCard key={t.name + i} {...t} delay={0.3 + i * 0.1} />
            ))}
          </div>
        </div>

        {/* Bottom caption */}
        <p
          style={{
            textAlign: "center",
            marginTop: "3rem",
            fontSize: "12px",
            color: "rgba(245,240,232,0.2)",
            letterSpacing: "0.06em",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Trusted by readers worldwide
        </p>
      </div>
    </section>
  );
}

export default Midfooter;