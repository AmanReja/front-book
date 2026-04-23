import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cartcontext from "./Context/cartcontext";
import Swal from "sweetalert2";

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
  if (!document.getElementById("bs-login-kf")) {
    const style = document.createElement("style");
    style.id = "bs-login-kf";
    style.textContent = `
      @keyframes bs-fade-up {
        from { opacity: 0; transform: translateY(22px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes bs-fade-in {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes bs-float {
        0%, 100% { transform: translateY(0px) rotate(-2deg); }
        50%       { transform: translateY(-12px) rotate(-2deg); }
      }
      @keyframes bs-float2 {
        0%, 100% { transform: translateY(0px) rotate(3deg); }
        50%       { transform: translateY(-9px) rotate(3deg); }
      }
      .bs-input-field:focus {
        border-color: rgba(245,240,232,0.4) !important;
        background: rgba(245,240,232,0.08) !important;
      }
      .bs-input-field::placeholder {
        color: rgba(245,240,232,0.2);
      }
      .bs-register-link:hover {
        background: rgba(245,240,232,0.08) !important;
        border-color: rgba(245,240,232,0.3) !important;
      }
      .bs-btn-ghost:hover {
        border-color: rgba(245,240,232,0.35) !important;
        background: rgba(245,240,232,0.05) !important;
      }
    `;
    document.head.appendChild(style);
  }
};

/* ─── Floating book decoration ─────────────────────────────────────────────── */
function FloatingBook({ color, top, left, delay, animName, rotate, title, author }) {
  return (
    <div
      style={{
        position: "absolute",
        top, left,
        width: "100px",
        animation: `${animName} 5.5s ease-in-out ${delay}s infinite`,
        opacity: 0.14,
        transform: `rotate(${rotate})`,
        pointerEvents: "none",
      }}
    >
      <div style={{ background: color, borderRadius: "6px", padding: "12px 9px", boxShadow: "4px 4px 0 rgba(0,0,0,0.4)" }}>
        <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.4)", marginBottom: "7px" }} />
        <div style={{ width: "65%", height: "2px", background: "rgba(255,255,255,0.2)", marginBottom: "32px" }} />
        <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: "6px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", marginTop: "2px" }}>{author}</div>
      </div>
    </div>
  );
}

/* ─── Login ─────────────────────────────────────────────────────────────────── */
function Login() {
  injectAssets();
  useContext(cartcontext);
  const navigate = useNavigate();
  const base_url = "https://book-backend-ust3.onrender.com";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const login_user = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${base_url}/user/loginUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: email, password: pass }),
      });
      const data = await response.json();

      if (data.length !== 0) {
        localStorage.setItem("id", data[0]._id);
        localStorage.setItem("user", JSON.stringify(data[0]));
        Swal.fire({
          title: "Welcome back!",
          icon: "success",
          background: "#1a1a1a",
          color: "#f5f0e8",
          confirmButtonColor: "#f5f0e8",
          confirmButtonText: '<span style="color:#0f0f0f">Continue</span>',
        });
        navigate("/");
      } else {
        Swal.fire({
          title: "Wrong credentials",
          text: "Please check your email and password.",
          icon: "error",
          background: "#1a1a1a",
          color: "#f5f0e8",
          confirmButtonColor: "#f5f0e8",
          confirmButtonText: '<span style="color:#0f0f0f">Try again</span>',
        });
      }
    } catch {
      toast.error("Network error. Please try again.", { theme: "dark" });
    }

    setLoading(false);
  };

  return (
    <>
      <ToastContainer />

      {/* ── Page wrapper ── */}
      <div
        style={{
          minHeight: "100vh",
          background: "#0f0f0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
          padding: "2rem 1rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(245,240,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(245,240,232,0.035) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Floating books */}
        <FloatingBook color="#3b4a6b" top="10%" left="4%"  delay={0}   animName="bs-float"  rotate="-2deg" title="Dune"        author="Frank Herbert" />
        <FloatingBook color="#4a3b2a" top="65%" left="2%"  delay={1.5} animName="bs-float2" rotate="3deg"  title="Sapiens"     author="Y. N. Harari"  />
        <FloatingBook color="#2a4a3b" top="12%" left="84%" delay={0.8} animName="bs-float"  rotate="-1deg" title="1984"         author="George Orwell" />
        <FloatingBook color="#4a2a3b" top="62%" left="87%" delay={2}   animName="bs-float2" rotate="2deg"  title="The Alchemist" author="P. Coelho"     />

        {/* ── Card ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            maxWidth: "820px",
            width: "100%",
            background: "#1a1a1a",
            border: "0.5px solid rgba(245,240,232,0.1)",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
            animation: "bs-fade-up 0.6s ease both",
          }}
        >
          {/* Left panel */}
          <div style={{
            background: "#141414",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem 2rem",
            borderRight: "0.5px solid rgba(245,240,232,0.08)",
            gap: "1.25rem",
          }}>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/login-10299071-8333958.png?f=webp"
              alt="Login illustration"
              style={{ width: "78%", maxWidth: "210px", opacity: 0.88 }}
            />
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "22px",
              fontWeight: 400,
              color: "#f5f0e8",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.25,
            }}>
              Welcome back,<br />
              <span style={{ fontStyle: "italic", color: "rgba(245,240,232,0.45)" }}>reader</span>
            </p>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(245,240,232,0.18)" }} />
            <p style={{
              fontSize: "12px",
              color: "rgba(245,240,232,0.35)",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.65,
              letterSpacing: "0.02em",
            }}>
              Your next great read<br />is waiting for you.
            </p>
          </div>

          {/* Right form panel */}
          <div style={{
            padding: "3rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            animation: "bs-fade-up 0.7s ease 0.1s both",
          }}>
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "26px",
              fontWeight: 400,
              color: "#f5f0e8",
              margin: "0 0 6px",
            }}>
              Sign in
            </h1>
            <p style={{
              fontSize: "13px",
              color: "rgba(245,240,232,0.38)",
              margin: "0 0 2rem",
            }}>
              Enter your credentials to continue
            </p>

            <form onSubmit={login_user}>
              {/* Email */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.38)",
                  marginBottom: "6px",
                }}>
                  Email address
                </label>
                <input
                  className="bs-input-field"
                  required
                  type="text"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    background: "rgba(245,240,232,0.05)",
                    border: "0.5px solid rgba(245,240,232,0.12)",
                    borderRadius: "10px",
                    color: "#f5f0e8",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: "22px" }}>
                <label style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.38)",
                  marginBottom: "6px",
                }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="bs-input-field"
                    required
                    type={showPass ? "text" : "password"}
                    placeholder="Your password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 42px 11px 14px",
                      background: "rgba(245,240,232,0.05)",
                      border: "0.5px solid rgba(245,240,232,0.12)",
                      borderRadius: "10px",
                      color: "#f5f0e8",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                  />
                  {/* Show/hide toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(245,240,232,0.3)",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                    title={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: "#f5f0e8",
                  color: "#0f0f0f",
                  border: "none",
                  borderRadius: "10px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: loading ? "default" : "pointer",
                  marginBottom: "20px",
                  opacity: loading ? 0.6 : 1,
                  transition: "opacity 0.15s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.opacity = "1")}
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>

            {/* Footer link */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontSize: "13px",
              color: "rgba(245,240,232,0.35)",
            }}>
              <span>Don't have an account?</span>
              <Link
                to="/register"
                className="bs-register-link"
                style={{
                  color: "#f5f0e8",
                  fontWeight: 500,
                  textDecoration: "none",
                  fontSize: "13px",
                  padding: "6px 14px",
                  border: "0.5px solid rgba(245,240,232,0.18)",
                  borderRadius: "20px",
                  transition: "background 0.15s, border-color 0.15s",
                }}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;