import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

/* ─── Google Fonts ─────────────────────────────────────────────────────────── */
const injectFonts = () => {
  if (document.getElementById("bs-fonts")) return;
  const link = document.createElement("link");
  link.id = "bs-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
  document.head.appendChild(link);
};

/* ─── Styles ───────────────────────────────────────────────────────────────── */
const S = {
  page: {
    minHeight: "100vh",
    background: "#0f0f0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    padding: "2rem 1rem",
  },
  card: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    maxWidth: "860px",
    width: "100%",
    background: "#1a1a1a",
    border: "0.5px solid rgba(245,240,232,0.1)",
    borderRadius: "20px",
    overflow: "hidden",
  },
  leftPanel: {
    background: "#141414",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 2rem",
    borderRight: "0.5px solid rgba(245,240,232,0.08)",
    gap: "1.5rem",
  },
  leftTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "28px",
    fontWeight: 400,
    color: "#f5f0e8",
    margin: 0,
    lineHeight: 1.2,
    textAlign: "center",
  },
  leftSub: {
    fontSize: "13px",
    color: "rgba(245,240,232,0.38)",
    margin: 0,
    textAlign: "center",
    lineHeight: 1.6,
    letterSpacing: "0.02em",
  },
  illustration: {
    width: "80%",
    maxWidth: "220px",
    opacity: 0.85,
  },
  dividerDot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "rgba(245,240,232,0.2)",
  },
  rightPanel: {
    padding: "3rem 2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0",
  },
  heading: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "26px",
    fontWeight: 400,
    color: "#f5f0e8",
    margin: "0 0 6px",
  },
  subheading: {
    fontSize: "13px",
    color: "rgba(245,240,232,0.38)",
    margin: "0 0 2rem",
  },
  fieldWrap: {
    marginBottom: "14px",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(245,240,232,0.4)",
    marginBottom: "6px",
  },
  input: {
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
  },
  inputFocus: {
    borderColor: "rgba(245,240,232,0.4)",
    background: "rgba(245,240,232,0.08)",
  },
  btnPrimary: {
    width: "100%",
    padding: "13px",
    background: "#f5f0e8",
    color: "#0f0f0f",
    border: "none",
    borderRadius: "10px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    marginTop: "8px",
    marginBottom: "20px",
    transition: "opacity 0.15s",
    letterSpacing: "0.01em",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontSize: "13px",
    color: "rgba(245,240,232,0.38)",
  },
  loginLink: {
    color: "#f5f0e8",
    fontWeight: 500,
    textDecoration: "none",
    fontSize: "13px",
    padding: "6px 14px",
    border: "0.5px solid rgba(245,240,232,0.2)",
    borderRadius: "20px",
    transition: "background 0.15s",
  },
};

/* ─── Controlled input with focus ring ─────────────────────────────────────── */
function Field({ label, type = "text", placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={S.fieldWrap}>
      <label style={S.label}>{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...S.input,
          ...(focused ? S.inputFocus : {}),
        }}
      />
    </div>
  );
}

/* ─── Register ──────────────────────────────────────────────────────────────── */
function Register() {
  const navigate = useNavigate();
  const base_url = "https://book-backend-ust3.onrender.com";

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  injectFonts();

  async function register(e) {
    e.preventDefault();
    setLoading(true);

    const new_user = { userid: email, contact: number, password: pass };

    try {
      const response = await fetch(`${base_url}/user/addUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_user),
      });
      const data = await response.json();

      if (data._id != null) {
        Swal.fire({
                 title: "Welcome back!",
                 icon: "success",
                 background: "#1a1a1a",
                 color: "#f5f0e8",
                 confirmButtonColor: "#f5f0e8",
                 confirmButtonText: '<span style="color:#0f0f0f">Continue</span>',
               });
        setTimeout(() => navigate("/"), 1200);
         localStorage.setItem("id", data[0]._id);
        localStorage.setItem("user", JSON.stringify(data[0]));
      } 
    } catch {
     
    }

    setEmail("");
    setNumber("");
    setPass("");
    setLoading(false);
  }

  return (
    <>
      <ToastContainer />
      <div style={S.page}>
        <div style={S.card}>

          {/* ── Left decorative panel ── */}
          <div style={S.leftPanel}>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/login-10299071-8333958.png?f=webp"
              alt="Register illustration"
              style={S.illustration}
            />
            <div>
              <p style={S.leftTitle}>Join our bookstore</p>
            </div>
            <div style={S.dividerDot} />
            <p style={S.leftSub}>
              Discover thousands of titles,<br />
              curated just for you.
            </p>
          </div>

          {/* ── Right form panel ── */}
          <div style={S.rightPanel}>
            <h1 style={S.heading}>Create account</h1>
            <p style={S.subheading}>Fill in your details to get started</p>

            <form onSubmit={register}>
              <Field
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Field
                label="Phone number"
                type="tel"
                placeholder="+91 00000 00000"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <Field
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                style={{ ...S.btnPrimary, opacity: loading ? 0.6 : 1 }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.opacity = "1")}
              >
                {loading ? "Creating account…" : "Create account"}
              </button>
            </form>

            <div style={S.footer}>
              <span>Already have an account?</span>
              <Link
                to="/login"
                style={S.loginLink}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,240,232,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Sign in
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Register;