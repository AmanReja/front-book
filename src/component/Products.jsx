import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import cartcontext from "./Context/cartcontext";
import { Bounce } from "react-awesome-reveal";
import { NavLink, useNavigate } from "react-router-dom";
import Getallcart from "./Context/Getallcart";
import Searchcontext from "./Context/Searchcontext";

/* ─── Google Fonts injected once ─────────────────────────────────────────── */
const injectFonts = () => {
  if (document.getElementById("bs-fonts")) return;
  const link = document.createElement("link");
  link.id = "bs-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
  document.head.appendChild(link);
};

/* ─── Inline styles ───────────────────────────────────────────────────────── */
const styles = {
  page: {
    background: "#0f0f0f",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
    color: "#f5f0e8",
  },
  header: {
    textAlign: "center",
    padding: "3rem 1rem 1.5rem",
    borderBottom: "0.5px solid rgba(245,240,232,0.1)",
  },
  headerTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: 400,
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
    color: "#f5f0e8",
  },
  headerSub: {
    fontSize: "12px",
    color: "rgba(245,240,232,0.45)",
    margin: 0,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    maxWidth: "420px",
    margin: "1.75rem auto",
    background: "rgba(245,240,232,0.06)",
    border: "0.5px solid rgba(245,240,232,0.12)",
    borderRadius: "40px",
    padding: "10px 20px",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    color: "#f5f0e8",
    width: "100%",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1.25rem",
    padding: "0 2rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    background: "#1a1a1a",
    border: "0.5px solid rgba(245,240,232,0.1)",
    borderRadius: "16px",
    overflow: "hidden",
    transition: "transform 0.25s, border-color 0.25s",
    cursor: "pointer",
    position: "relative",
  },
  cardImgWrap: {
    width: "100%",
    height: "240px",
    background: "#141414",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s",
  },
  badgeSale: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#c0392b",
    color: "#fff",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    padding: "3px 9px",
    borderRadius: "20px",
  },
  badgeNormal: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "rgba(0,0,0,0.7)",
    color: "#f5f0e8",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    padding: "3px 9px",
    borderRadius: "20px",
    backdropFilter: "blur(4px)",
  },
  cardBody: {
    padding: "1rem 1rem 0.5rem",
  },
  cardTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "17px",
    fontWeight: 400,
    color: "#f5f0e8",
    margin: "0 0 4px",
    lineHeight: 1.3,
  },
  cardAuthor: {
    fontSize: "12px",
    color: "rgba(245,240,232,0.45)",
    margin: 0,
    letterSpacing: "0.02em",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    padding: "10px 1rem",
    borderTop: "0.5px solid rgba(245,240,232,0.08)",
  },
  price: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "22px",
    color: "#f5f0e8",
    lineHeight: 1,
  },
  oldPrice: {
    fontSize: "12px",
    color: "rgba(245,240,232,0.3)",
    textDecoration: "line-through",
    marginTop: "2px",
  },
  actions: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },
  btnCart: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "0.5px solid rgba(245,240,232,0.2)",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f5f0e8",
    transition: "background 0.15s, border-color 0.15s",
    flexShrink: 0,
  },
  btnBuy: {
    height: "36px",
    padding: "0 16px",
    borderRadius: "36px",
    border: "none",
    background: "#f5f0e8",
    color: "#0f0f0f",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "opacity 0.15s",
    whiteSpace: "nowrap",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "1.5rem 0 2.5rem",
  },
  pgBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "0.5px solid rgba(245,240,232,0.15)",
    background: "transparent",
    color: "rgba(245,240,232,0.5)",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
    fontFamily: "'DM Sans', sans-serif",
  },
  pgBtnActive: {
    background: "#f5f0e8",
    color: "#0f0f0f",
    border: "0.5px solid transparent",
    fontWeight: 500,
  },
  pgBtnDisabled: {
    opacity: 0.25,
    cursor: "default",
  },
  empty: {
    textAlign: "center",
    padding: "4rem 0",
    color: "rgba(245,240,232,0.35)",
    fontSize: "15px",
    gridColumn: "1 / -1",
  },
};

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function originalPrice(price, offer) {
  return (price / (1 - offer / 100)).toFixed(2);
}

function CartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,232,0.35)" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  );
}

/* ─── BookCard ────────────────────────────────────────────────────────────── */
function BookCard({ item, onAddToCart }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Bounce delay={0.3}>
      <div
        style={{
          ...styles.card,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          borderColor: hovered
            ? "rgba(245,240,232,0.25)"
            : "rgba(245,240,232,0.1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Cover image */}
        <div style={styles.cardImgWrap}>
          <img
            style={{
              ...styles.cardImg,
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
            src={item.bookimage}
            alt={item.bookname}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <span style={item.offer >= 20 ? styles.badgeSale : styles.badgeNormal}>
            {item.offer}% off
          </span>
        </div>

        {/* Info */}
        <div style={styles.cardBody}>
          <p style={styles.cardTitle}>{item.bookname}</p>
          <p style={styles.cardAuthor}>{item.authore}</p>
        </div>

        {/* Price + Actions */}
        <div style={styles.cardFooter}>
          <div>
            <div style={styles.price}>${item.price}</div>
            <div style={styles.oldPrice}>${originalPrice(item.price, item.offer)}</div>
          </div>
          <div style={styles.actions}>
            <button
              style={styles.btnCart}
              title="Add to cart"
              onClick={() => onAddToCart(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(245,240,232,0.1)";
                e.currentTarget.style.borderColor = "rgba(245,240,232,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(245,240,232,0.2)";
              }}
            >
              <CartIcon />
            </button>
            {/* <NavLink to="/cart" style={{ textDecoration: "none" }}> */}
              <button
                style={styles.btnBuy}
                onClick={() => onAddToCart(item)}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Buy now
              </button>
            {/* </NavLink> */}
          </div>
        </div>
      </div>
    </Bounce>
  );
}

/* ─── Products (main) ─────────────────────────────────────────────────────── */
function Products() {
  const { search } = useContext(Searchcontext);
  const navigate = useNavigate();
  const getAllcart = useContext(Getallcart);
  const base_url = "https://book-backend-ust3.onrender.com";
  useContext(cartcontext);

  const [product, setProducts] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    injectFonts();
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUserdata(JSON.parse(stored));
    } catch (err) {
      console.error("Invalid JSON in localStorage:", err);
      localStorage.removeItem("user");
    }
  }, []);

  const addtoCart = async (item) => {
    if (!localStorage.getItem("user")) {
      Swal.fire({ title: "You have to login first", icon: "warning" });
      navigate("/login");
      return;
    }

    const new_cart = {
      userid: userdata._id,
      itemid: item.id,
      bookname: item.bookname,
      price: item.price,
      bookimage: item.bookimage,
      authore: item.authore,
      offer: item.offer,
    };

    try {
      const response = await fetch(`${base_url}/cart/addCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_cart),
      });
      const data = await response.json();

      if (data._id) {
        Swal.fire({
          title: `${item.bookname} added to cart`,
          icon: "success",
          background: "#1a1a1a",
          color: "#f5f0e8",
          confirmButtonColor: "#f5f0e8",
          confirmButtonText: '<span style="color:#0f0f0f">OK</span>',
        });
        await getAllcart();
      } else {
        toast.error("Failed to add to cart", { theme: "dark" });
      }
    } catch {
      toast.error("Network error", { theme: "dark" });
    }
  };

  async function getProducts() {
    try {
      const response = await fetch(`${base_url}/seller/getAllBooks/${search}`);
      const data = await response.json();
      setProducts(data);
      setCurrentPage(1);
    } catch {
      toast.error("Could not load books", { theme: "dark" });
    }
  }

  useEffect(() => {
    getProducts();
  }, [search]);

  const totalPages = Math.ceil(product.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = product.slice(startIdx, startIdx + POSTS_PER_PAGE);

  return (
    <div style={styles.page}>
      <ToastContainer />

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Our Collection</h1>
        <p style={styles.headerSub}>Curated reads for curious minds</p>
      </div>

      {/* Search bar */}
      <div style={styles.searchWrap}>
        <SearchIcon />
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Search by title or author…"
          value={search}
          readOnly
        />
      </div>

      {/* Book grid */}
      <div style={styles.grid}>
        {currentPosts.length === 0 ? (
          <p style={styles.empty}>No books found.</p>
        ) : (
          currentPosts.map((item, index) => (
            <BookCard key={item.id ?? index} item={item} onAddToCart={addtoCart} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            style={{
              ...styles.pgBtn,
              ...(currentPage === 1 ? styles.pgBtnDisabled : {}),
            }}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              style={{
                ...styles.pgBtn,
                ...(page === currentPage ? styles.pgBtnActive : {}),
              }}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            style={{
              ...styles.pgBtn,
              ...(currentPage === totalPages ? styles.pgBtnDisabled : {}),
            }}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;