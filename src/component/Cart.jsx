import { useContext, useEffect, useState } from "react";
import cartcontext from "./Context/cartcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import Getallcart from "./Context/Getallcart";

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
  if (!document.getElementById("bs-cart-kf")) {
    const style = document.createElement("style");
    style.id = "bs-cart-kf";
    style.textContent = `
      @keyframes bs-fade-up {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes bs-slide-in {
        from { opacity: 0; transform: translateX(24px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes bs-modal-in {
        from { opacity: 0; transform: translateY(20px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      .bs-cart-item { animation: bs-fade-up 0.4s ease both; }
      .bs-qty-btn:hover { background: rgba(245,240,232,0.15) !important; }
      .bs-icon-btn:hover { background: rgba(245,240,232,0.08) !important; border-color: rgba(245,240,232,0.25) !important; }
      .bs-remove-btn:hover { color: #e05555 !important; border-color: rgba(224,85,85,0.3) !important; }
      .bs-view-btn:hover  { background: rgba(245,240,232,0.12) !important; }
      .bs-pay-btn:hover   { opacity: 0.88 !important; }
    `;
    document.head.appendChild(style);
  }
};

/* ─── Icons ─────────────────────────────────────────────────────────────────── */
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
const EyeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const TruckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3" />
  </svg>
);

/* ─── Empty state ────────────────────────────────────────────────────────────── */
function EmptyCart() {
  return (
    <div style={{ textAlign: "center", padding: "6rem 2rem", animation: "bs-fade-up 0.5s ease both" }}>
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,232,0.15)" strokeWidth="1" style={{ marginBottom: "1.5rem" }}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#f5f0e8", margin: "0 0 8px" }}>
        Your cart is empty
      </p>
      <p style={{ fontSize: "13px", color: "rgba(245,240,232,0.35)", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
        Browse our collection and add some books
      </p>
    </div>
  );
}

/* ─── Cart ───────────────────────────────────────────────────────────────────── */
function Cart() {
  injectAssets();
  const getAllcart = useContext(Getallcart);
  const value = useContext(cartcontext);
  const base_url = "https://book-backend-ust3.onrender.com";

  const [rezPayid, setRezPayid] = useState("");
  const [details, setDetails] = useState(false);
  const [successdetails, setSuccessdetails] = useState([]);
  const [buy, setbuy] = useState(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const date = new Date();
  const formatdate = date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  const calculatetotalprice = value.cart.reduce((acc, item) => {
    return acc + item.items[0].price * item.items[0].quantity;
  }, 0);

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  useEffect(() => { loadScript("https://checkout.razorpay.com/v1/checkout.js"); }, []);

  const handelpay = async () => {
    const addpayment = {
      userid: value.cart[0].userid,
      amount: calculatetotalprice,
      brandname: "Online Shopping",
      quantity: value.cart.length,
      brandimage: "https://images.shiksha.com/mediadata/images/1626695443phppjGnqq.jpeg",
      razorpayid: "",
    };
    const response = await fetch(`${base_url}/pay/createPayment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addpayment),
    });
    const data = await response.json();
    setSuccessdetails(data);

    const options = {
      key: "rzp_test_ND81BEh4gRO77Q",
      amount: calculatetotalprice * 100,
      currency: "INR",
      name: "Novelity Book Shop",
      description: `${value.cart.length} item(s)`,
      image: "https://images.shiksha.com/mediadata/images/1626695443phppjGnqq.jpeg",
      handler: (response) => {
        setRezPayid(response.razorpay_payment_id);
        paySuccess(response.razorpay_payment_id, data._id, data.amount);
      },
    };
    new window.Razorpay(options).open();
  };

  const paySuccess = async (rid, _id, amount) => {
    const response = await fetch(`${base_url}/pay/sucessPayment/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ razorpayid: rid, status: "Success" }),
    });
    if (response.ok) {
      Swal.fire({ title: "Payment successful!", icon: "success", background: "#1a1a1a", color: "#f5f0e8", confirmButtonColor: "#f5f0e8", confirmButtonText: '<span style="color:#0f0f0f">Continue</span>' })
        .then(async () => {
          const items = value.cart.map((item) => ({
            bookname: item.items[0].bookname,
            price: item.items[0].price,
            quantity: item.items[0].quantity,
            bookimage: item.items[0].bookimage,
            authore: item.items[0].authore,
            offer: item.items[0].offer,
          }));
          try {
            const res = await axios.post(`${base_url}/order/addOrder`, {
              userid: value.cart[0].userid,
              totalamount: amount,
              itemquantity: value.cart.length,
              items,
            });
            if (res.data) window.location.reload();
          } catch (e) { console.error(e); }
        });
    }
    const utterance = new SpeechSynthesisUtterance(`${amount} rupees has been sent.`);
    window.speechSynthesis.speak(utterance);
  };

  const handelremove = async (p) => {
    Swal.fire({
      title: "Remove this book?",
      text: "It will be removed from your cart.",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Keep it",
      background: "#1a1a1a",
      color: "#f5f0e8",
      confirmButtonColor: "#c0392b",
      cancelButtonColor: "rgba(245,240,232,0.1)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`${base_url}/cart/deleteCartitem/${p._id}`, {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
        });
        if (!response.ok) { toast.error("Failed to remove item", { theme: "dark" }); return; }
        await getAllcart();
      }
    });
  };

  const updateQty = async (cart, delta) => {
    const newQty = cart.items[0].quantity + delta;
    if (newQty < 1) return;
    try {
      await fetch(`${base_url}/cart/updateCartitem/${cart._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: cart.items[0]._id, quantity: newQty }),
      });
      await getAllcart();
    } catch { toast.error("Update failed", { theme: "dark" }); }
  };

  return (
    <>
      <ToastContainer />
      <div style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
      }}>
        {/* Grid texture */}
        <div style={{
          position: "fixed", inset: 0,
          backgroundImage: "linear-gradient(rgba(245,240,232,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem", position: "relative", zIndex: 1 }}>

          {/* ── Page header ── */}
          <div style={{ marginBottom: "2.5rem", animation: "bs-fade-up 0.4s ease both" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", margin: "0 0 8px" }}>
              Your selection
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <h1 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(28px, 5vw, 42px)",
                fontWeight: 400,
                color: "#f5f0e8",
                margin: 0,
                letterSpacing: "-0.5px",
              }}>
                Shopping Cart
              </h1>
              {value.cart.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    fontSize: "12px",
                    color: "rgba(245,240,232,0.4)",
                    border: "0.5px solid rgba(245,240,232,0.12)",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {value.cart.length} {value.cart.length === 1 ? "item" : "items"}
                  </span>
                  <button
                    onClick={() => setSummaryOpen(true)}
                    style={{
                      height: "36px", padding: "0 18px",
                      background: "#f5f0e8", color: "#0f0f0f",
                      border: "none", borderRadius: "36px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px", fontWeight: 500,
                      cursor: "pointer", transition: "opacity 0.15s",
                    }}
                    className="bs-pay-btn"
                  >
                    Checkout →
                  </button>
                </div>
              )}
            </div>
          </div>

          {value.cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" }}>

              {/* ── Cart items ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {value.cart.map((p, index) => (
                  <div
                    key={p._id}
                    className="bs-cart-item"
                    style={{
                      background: "#1a1a1a",
                      border: "0.5px solid rgba(245,240,232,0.08)",
                      borderRadius: "16px",
                      padding: "1.25rem",
                      display: "flex",
                      gap: "1.25rem",
                      animationDelay: `${index * 0.07}s`,
                      transition: "border-color 0.2s",
                    }}
                  >
                    {/* Cover */}
                    <div style={{
                      width: "90px", height: "120px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "#141414",
                      border: "0.5px solid rgba(245,240,232,0.08)",
                    }}>
                      <img
                        src={p.items[0].bookimage}
                        alt={p.items[0].bookname}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                          <div>
                            <h3 style={{
                              fontFamily: "'DM Serif Display', serif",
                              fontSize: "17px", fontWeight: 400,
                              color: "#f5f0e8", margin: "0 0 3px",
                            }}>
                              {p.items[0].bookname}
                            </h3>
                            <p style={{ fontSize: "12px", color: "rgba(245,240,232,0.38)", margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>
                              {p.items[0].authore}
                            </p>
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", color: "#f5f0e8", margin: 0 }}>
                              ${(p.items[0].price * p.items[0].quantity).toFixed(2)}
                            </p>
                            {p.items[0].offer > 0 && (
                              <span style={{
                                fontSize: "11px", color: "#f5f0e8",
                                background: "#c0392b",
                                padding: "2px 7px", borderRadius: "10px",
                                fontFamily: "'DM Sans', sans-serif",
                              }}>
                                {p.items[0].offer}% off
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom row */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                        {/* Qty controls */}
                        <div style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          background: "rgba(245,240,232,0.05)",
                          border: "0.5px solid rgba(245,240,232,0.1)",
                          borderRadius: "20px", padding: "4px 12px",
                        }}>
                          <button
                            onClick={() => updateQty(p, -1)}
                            className="bs-qty-btn"
                            style={{
                              width: "22px", height: "22px", borderRadius: "50%",
                              background: "transparent", border: "0.5px solid rgba(245,240,232,0.15)",
                              color: "#f5f0e8", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "14px", transition: "background 0.15s",
                              opacity: p.items[0].quantity <= 1 ? 0.3 : 1,
                            }}
                          >−</button>
                          <span style={{ fontSize: "13px", fontWeight: 500, color: "#f5f0e8", minWidth: "16px", textAlign: "center" }}>
                            {p.items[0].quantity}
                          </span>
                          <button
                            onClick={() => updateQty(p, 1)}
                            className="bs-qty-btn"
                            style={{
                              width: "22px", height: "22px", borderRadius: "50%",
                              background: "transparent", border: "0.5px solid rgba(245,240,232,0.15)",
                              color: "#f5f0e8", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "14px", transition: "background 0.15s",
                            }}
                          >+</button>
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => handelremove(p)}
                            className="bs-remove-btn"
                            style={{
                              display: "flex", alignItems: "center", gap: "5px",
                              height: "32px", padding: "0 12px",
                              background: "transparent",
                              border: "0.5px solid rgba(245,240,232,0.12)",
                              borderRadius: "20px",
                              color: "rgba(245,240,232,0.4)",
                              fontSize: "12px", fontFamily: "'DM Sans', sans-serif",
                              cursor: "pointer", transition: "color 0.15s, border-color 0.15s",
                            }}
                          >
                            <TrashIcon /> Remove
                          </button>
                          <button
                            onClick={() => { setbuy(p.items[0]); setDetails(true); }}
                            className="bs-view-btn"
                            style={{
                              display: "flex", alignItems: "center", gap: "5px",
                              height: "32px", padding: "0 12px",
                              background: "rgba(245,240,232,0.06)",
                              border: "0.5px solid rgba(245,240,232,0.12)",
                              borderRadius: "20px",
                              color: "rgba(245,240,232,0.6)",
                              fontSize: "12px", fontFamily: "'DM Sans', sans-serif",
                              cursor: "pointer", transition: "background 0.15s",
                            }}
                          >
                            <EyeIcon /> Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Order summary sidebar ── */}
              <div style={{
                background: "#1a1a1a",
                border: "0.5px solid rgba(245,240,232,0.08)",
                borderRadius: "16px",
                padding: "1.5rem",
                position: "sticky",
                top: "80px",
                animation: "bs-slide-in 0.4s ease 0.15s both",
              }}>
                <h2 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "20px", fontWeight: 400,
                  color: "#f5f0e8", margin: "0 0 1.25rem",
                }}>
                  Order summary
                </h2>

                {/* Line items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.25rem" }}>
                  {[
                    { label: "Subtotal", value: `$${calculatetotalprice.toFixed(2)}` },
                    { label: "Shipping", value: "Free" },
                    { label: "Tax", value: "$4.00" },
                  ].map(({ label, value: val }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                      <span style={{ color: "rgba(245,240,232,0.4)" }}>{label}</span>
                      <span style={{ color: "#f5f0e8", fontWeight: 400 }}>{val}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ borderTop: "0.5px solid rgba(245,240,232,0.08)", margin: "0 0 1.25rem", paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "17px", color: "#f5f0e8" }}>Total</span>
                    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#f5f0e8" }}>
                      ${(calculatetotalprice + 4).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Pay button */}
                <button
                  onClick={handelpay}
                  className="bs-pay-btn"
                  style={{
                    width: "100%", padding: "14px",
                    background: "#f5f0e8", color: "#0f0f0f",
                    border: "none", borderRadius: "10px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px", fontWeight: 500,
                    cursor: "pointer", transition: "opacity 0.15s",
                    marginBottom: "1.5rem",
                  }}
                >
                  Pay with Razorpay
                </button>

                {/* Perks */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { icon: <ShieldIcon />, label: "Secure payment", desc: "Your transactions are encrypted and protected." },
                    { icon: <TruckIcon />, label: "Free delivery", desc: "Free shipping on all orders, always." },
                    { icon: <RefreshIcon />, label: "Easy returns", desc: "Hassle-free returns within 30 days." },
                  ].map(({ icon, label, desc }) => (
                    <div key={label} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <div style={{ color: "rgba(245,240,232,0.3)", flexShrink: 0, marginTop: "1px" }}>{icon}</div>
                      <div>
                        <p style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: 500, color: "rgba(245,240,232,0.6)" }}>{label}</p>
                        <p style={{ margin: 0, fontSize: "11px", color: "rgba(245,240,232,0.25)", lineHeight: 1.5 }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Book detail modal ── */}
        {details && buy && (
          <div
            onClick={() => setDetails(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
              zIndex: 200,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1rem",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#1a1a1a",
                border: "0.5px solid rgba(245,240,232,0.12)",
                borderRadius: "20px",
                width: "100%", maxWidth: "480px",
                overflow: "hidden",
                animation: "bs-modal-in 0.25s ease both",
              }}
            >
              {/* Modal header */}
              <div style={{
                background: "#141414",
                padding: "1rem 1.25rem",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "0.5px solid rgba(245,240,232,0.08)",
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>
                    Order #FN123456789
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(245,240,232,0.5)" }}>{formatdate}</p>
                </div>
                <button
                  onClick={() => setDetails(false)}
                  style={{
                    width: "30px", height: "30px", borderRadius: "50%",
                    background: "rgba(245,240,232,0.06)",
                    border: "0.5px solid rgba(245,240,232,0.12)",
                    color: "rgba(245,240,232,0.5)",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Modal body */}
              <div style={{ padding: "1.5rem", display: "flex", gap: "1.25rem" }}>
                <img
                  src={buy.bookimage}
                  alt={buy.bookname}
                  style={{
                    width: "90px", height: "120px",
                    borderRadius: "8px", objectFit: "cover",
                    border: "0.5px solid rgba(245,240,232,0.1)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: 400, color: "#f5f0e8", margin: "0 0 4px" }}>
                    {buy.bookname}
                  </h3>
                  <p style={{ fontSize: "22px", fontFamily: "'DM Serif Display', serif", color: "#f5f0e8", margin: "0 0 8px" }}>
                    ${buy.price}
                  </p>
                  <span style={{
                    fontSize: "11px", color: "rgba(245,240,232,0.4)",
                    background: "rgba(245,240,232,0.06)",
                    border: "0.5px solid rgba(245,240,232,0.1)",
                    padding: "3px 10px", borderRadius: "10px",
                  }}>
                    via COD
                  </span>
                  <p style={{ margin: "12px 0 0", fontSize: "12px", color: "rgba(245,240,232,0.35)" }}>
                    Tracking updates from: <span style={{ color: "rgba(245,240,232,0.6)" }}>{formatdate}</span>
                  </p>
                </div>
              </div>

              {/* Modal footer */}
              <div style={{
                padding: "1rem 1.5rem",
                borderTop: "0.5px solid rgba(245,240,232,0.08)",
                display: "flex", gap: "8px",
              }}>
                {["Track", "Cancel", "Pre-pay"].map((action) => (
                  <button
                    key={action}
                    style={{
                      flex: 1, height: "34px",
                      background: "transparent",
                      border: "0.5px solid rgba(245,240,232,0.12)",
                      borderRadius: "8px",
                      color: "rgba(245,240,232,0.5)",
                      fontSize: "12px", fontFamily: "'DM Sans', sans-serif",
                      cursor: "pointer", transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,240,232,0.07)"; e.currentTarget.style.color = "#f5f0e8"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(245,240,232,0.5)"; }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;