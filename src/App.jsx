import { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import Registration from "./component/Registration";
import Products from "./component/Products";
import Navbar from "./component/Navbar";
import Herobanner from "./component/Herobanner";
import Footer from "./component/Footer";
import Home from "./component/Home";
import { Outlet } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import Editproducts from "./component/Editproducts";
import Productcotext from "./component/Context/Productcotext";
import cartcontext from "./component/Context/cartcontext";
import Cart from "./component/Cart";
import Navtest from "./component/Navtest";
import loadercontext from "./component/Context/loadercontext";
import Profileset from "./component/Profileset";
import Getallcart from "./component/Context/Getallcart";
import { ToastContainer } from "react-toastify";

function App() {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const base_url = "https://book-backend-ust3.onrender.com";

  // ✅ Safe fetch function with JSON + user check
  const getallcartitem = async () => {
    const storedUser = localStorage.getItem("user");
    const id = storedUser ? JSON.parse(storedUser)?._id : null;

    // 🧠 Stop here if no user found (prevents crash)
    if (!id) {
      console.warn("User not logged in or user ID missing.");
      return;
    }

    try {
      const response = await fetch(`${base_url}/cart/getAllcartitem/${id}`);
      if (!response.ok) throw new Error("Failed to fetch cart items");

      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // ✅ Only call getallcartitem if user exists
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      getallcartitem();
    }
  }, []);

  const handelchange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <ToastContainer />
      <Getallcart.Provider value={getallcartitem}>
        <cartcontext.Provider value={{ cart, setCart }}>
          <Navbar searchHandelar={handelchange} open={open} setOpen={setOpen} />
          {/* <Navtest /> */}

          {/* 👇 React Router Outlet handles nested routes */}
          <Outlet>
            <Products
              getallcartitem={getallcartitem}
              search={search}
              setSearch={setSearch}
            />
            <Home search={search} setSearch={setSearch} />
            <Login />
            <Register />
            <Editproducts />
            <Cart />
            <Profileset />
          </Outlet>

          <Footer />
        </cartcontext.Provider>
      </Getallcart.Provider>
    </>
  );
}

export default App;
