import { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import cartcontext from "./Context/cartcontext";
import userpng from "../assets/icons/user.png";
import Searchcontext from "./Context/Searchcontext";
import Loginbtn from "./Loginbtn";

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
  if (!document.getElementById("bs-nav-kf")) {
    const style = document.createElement("style");
    style.id = "bs-nav-kf";
    style.textContent = `
      @keyframes bs-dropdown-in {
        from { opacity: 0; transform: translateY(-8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes bs-mobile-in {
        from { opacity: 0; transform: translateY(-6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes bs-search-expand {
        from { width: 0; opacity: 0; }
        to   { width: 200px; opacity: 1; }
      }
      .bs-nav-link {
        font-size: 13px;
        color: rgba(245,240,232,0.45);
        text-decoration: none;
        padding: 5px 12px;
        border-radius: 20px;
        border: 0.5px solid transparent;
        transition: color 0.15s, background 0.15s, border-color 0.15s;
        font-family: 'DM Sans', sans-serif;
        font-weight: 400;
        letter-spacing: 0.02em;
        white-space: nowrap;
      }
      .bs-nav-link:hover {
        color: #f5f0e8 !important;
        background: rgba(245,240,232,0.07);
        border-color: rgba(245,240,232,0.12);
      }
      .bs-nav-link.active {
        color: #f5f0e8 !important;
        background: rgba(245,240,232,0.09);
        border-color: rgba(245,240,232,0.14);
      }
      .bs-dropdown-item {
        width: 100%;
        background: none;
        border: none;
        text-align: left;
        padding: 8px 12px;
        font-size: 13px;
        font-family: 'DM Sans', sans-serif;
        color: rgba(245,240,232,0.55);
        cursor: pointer;
        border-radius: 8px;
        transition: background 0.15s, color 0.15s;
        text-decoration: none;
        display: block;
      }
      .bs-dropdown-item:hover {
        background: rgba(245,240,232,0.07);
        color: #f5f0e8;
      }
      .bs-search-input {
        background: rgba(245,240,232,0.07);
        border: 0.5px solid rgba(245,240,232,0.15);
        border-radius: 8px;
        color: #f5f0e8;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        padding: 7px 12px;
        outline: none;
        transition: border-color 0.2s, background 0.2s;
        animation: bs-search-expand 0.2s ease;
      }
      .bs-search-input::placeholder { color: rgba(245,240,232,0.25); }
      .bs-search-input:focus {
        border-color: rgba(245,240,232,0.35);
        background: rgba(245,240,232,0.1);
      }
      .bs-mobile-link {
        display: block;
        padding: 10px 14px;
        font-size: 14px;
        font-family: 'DM Sans', sans-serif;
        color: rgba(245,240,232,0.55);
        text-decoration: none;
        border-radius: 10px;
        transition: background 0.15s, color 0.15s;
      }
      .bs-mobile-link:hover { background: rgba(245,240,232,0.07); color: #f5f0e8; }
    `;
    document.head.appendChild(style);
  }
};

/* ─── Cart badge ────────────────────────────────────────────────────────────── */
function CartBadge({ count }) {
  if (!count) return null;
  return (
    <span style={{
      position: "absolute",
      top: "-5px", right: "-5px",
      background: "#c0392b",
      color: "#fff",
      fontSize: "10px",
      fontWeight: 600,
      width: "17px", height: "17px",
      borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      border: "1.5px solid #0f0f0f",
    }}>
      {count > 9 ? "9+" : count}
    </span>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────────── */
function Navbar() {
  injectAssets();
  const { search, setSearch } = useContext(Searchcontext);
  const value = useContext(cartcontext);
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [flag, setFlag] = useState(true);
  const [user, setUser] = useState({});
  const base_url = "https://book-backend-ust3.onrender.com";
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getoneuser = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    try {
      const parsed = JSON.parse(storedUser);
      const id = parsed?._id;
      if (!id) return;
      const res = await fetch(`${base_url}/user/getUser/${id}`);
      if (!res.ok) return;
      setUser(await res.json());
    } catch { /* silent */ }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        JSON.parse(storedUser);
        setFlag(false);
      } catch { /* silent */ }
    }
    getoneuser();
  }, [flag]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setDropdownOpen(false);
    window.location.reload();
  };

  return (
    <>
      <nav style={{
        background: "rgba(15,15,15,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(245,240,232,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "22px",
              fontWeight: 400,
              color: "#f5f0e8",
              letterSpacing: "-0.3px",
            }}>
              Nov<span style={{ fontStyle: "italic", color: "rgba(245,240,232,0.4)" }}>elity</span>
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            flex: 1,
            justifyContent: "center",
          }}
            className="bs-desktop-links"
          >
            {[
              { label: "Home", path: "/" },
              { label: "Dashboard", path: "/adminlogin" },
              // { label: "Contact", path: "/contact" },
            ].map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`bs-nav-link${isActive(path) ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right cluster ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>

            {/* Search */}
            <div ref={searchRef} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {searchOpen && (
                <input
                  autoFocus
                  className="bs-search-input"
                  placeholder="Search books…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: "180px" }}
                />
              )}
              <button
                onClick={() => setSearchOpen((p) => !p)}
                style={{
                  width: "34px", height: "34px",
                  borderRadius: "50%",
                  border: "0.5px solid rgba(245,240,232,0.12)",
                  background: searchOpen ? "rgba(245,240,232,0.1)" : "transparent",
                  color: "rgba(245,240,232,0.55)",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.15s, border-color 0.15s",
                }}
                title="Search"
              >
                {searchOpen ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Cart */}
            <Link to="/cart" style={{ textDecoration: "none", position: "relative" }}>
              <button style={{
                width: "34px", height: "34px",
                borderRadius: "50%",
                border: "0.5px solid rgba(245,240,232,0.12)",
                background: "transparent",
                color: "rgba(245,240,232,0.55)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s, color 0.15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,240,232,0.08)"; e.currentTarget.style.color = "#f5f0e8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(245,240,232,0.55)"; }}
                title="Cart"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <CartBadge count={value.cart.length} />
              </button>
            </Link>

            {/* Profile / Login */}
            {flag ? (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Loginbtn />
              </Link>
            ) : (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setDropdownOpen((p) => !p)}
                  style={{
                    width: "34px", height: "34px",
                    borderRadius: "50%",
                    border: `1.5px solid ${dropdownOpen ? "rgba(245,240,232,0.4)" : "rgba(245,240,232,0.15)"}`,
                    padding: 0,
                    cursor: "pointer",
                    overflow: "hidden",
                    background: "#2a2a2a",
                    transition: "border-color 0.2s",
                  }}
                  title="Profile"
                >
                  <img
                    src={user?.image || userpng}
                    alt="user"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    width: "180px",
                    background: "#1a1a1a",
                    border: "0.5px solid rgba(245,240,232,0.12)",
                    borderRadius: "12px",
                    padding: "6px",
                    animation: "bs-dropdown-in 0.18s ease both",
                    zIndex: 200,
                  }}>
                    {/* User info */}
                    <div style={{
                      padding: "8px 12px 10px",
                      borderBottom: "0.5px solid rgba(245,240,232,0.08)",
                      marginBottom: "4px",
                    }}>
                      <p style={{ margin: 0, fontSize: "12px", color: "rgba(245,240,232,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
                        Signed in
                      </p>
                    </div>

                    <Link to="/profile" className="bs-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      Profile settings
                    </Link>
                    <button className="bs-dropdown-item">
                      Customer service
                    </button>

                    <div style={{ borderTop: "0.5px solid rgba(245,240,232,0.08)", marginTop: "4px", paddingTop: "4px" }}>
                      <button
                        className="bs-dropdown-item"
                        onClick={handleLogout}
                        style={{ color: "rgba(220,80,80,0.75)" }}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              style={{
                display: "none",
                width: "34px", height: "34px",
                border: "0.5px solid rgba(245,240,232,0.12)",
                borderRadius: "8px",
                background: "transparent",
                cursor: "pointer",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
              id="bs-hamburger"
              title="Menu"
            >
              <span style={{ width: "16px", height: "1.5px", background: "#f5f0e8", borderRadius: "2px", transition: "transform 0.2s", transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ width: "16px", height: "1.5px", background: "#f5f0e8", borderRadius: "2px", opacity: mobileOpen ? 0 : 1, transition: "opacity 0.2s" }} />
              <span style={{ width: "16px", height: "1.5px", background: "#f5f0e8", borderRadius: "2px", transition: "transform 0.2s", transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div style={{
            borderTop: "0.5px solid rgba(245,240,232,0.08)",
            background: "#141414",
            padding: "12px 1rem 16px",
            animation: "bs-mobile-in 0.2s ease both",
          }}>
            {[
              { label: "Home", path: "/" },
              { label: "Dashboard", path: "/adminlogin" },
              { label: "Cart", path: "/cart" },
              // { label: "Admin login", path: "/adminlogin" },
              { label: "Contact us", path: "/contact" },
            ].map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="bs-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {label}
                {path === "/cart" && value.cart.length > 0 && (
                  <span style={{
                    marginLeft: "8px",
                    background: "#c0392b",
                    color: "#fff",
                    fontSize: "10px",
                    padding: "1px 6px",
                    borderRadius: "10px",
                  }}>
                    {value.cart.length}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Responsive hide/show for desktop links + hamburger */}
      <style>{`
        @media (max-width: 640px) {
          .bs-desktop-links { display: none !important; }
          #bs-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;