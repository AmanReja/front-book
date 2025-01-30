import { useState, useEffect, useContext, useRef, useCallback } from "react";
import reactLogo from "./assets/react.svg";
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
import Searchcontext from "./component/Context/Searchcontext";
import Productcotext from "./component/Context/Productcotext";
import cartcontext from "./component/Context/cartcontext";
import Cart from "./component/Cart";
import Navtest from "./component/Navtest";
import loadercontext from "./component/Context/loadercontext";
import Profileset from "./component/Profileset";
import Getallcart from "./component/Context/Getallcart";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const base_url = "https://back-book-zct1.onrender.com";

  const getallcartitem = async () => {
    const userid = JSON.parse(localStorage.getItem("user")) || {};
    const id = userid._id;
    const response = await fetch(`${base_url}/cart/getAllcartitem/${id}`);
    const data = await response.json();
    setCart(data);
  };

  useEffect(() => {
    getallcartitem();
  }, []);

  const handelchange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <ToastContainer></ToastContainer>{" "}
      <Getallcart.Provider value={getallcartitem}>
        <cartcontext.Provider value={{ cart, setCart }}>
          <Searchcontext.Provider value={search}>
            <Navbar
              searchHandelar={handelchange}
              open={open}
              setOpen={setOpen}
            ></Navbar>
            {/* <Navtest></Navtest> */}

            <Outlet>
              <Products
                getallcartitem={getallcartitem}
                search={search}
                setSearch={setSearch}
              />
              <Home search={search} setSearch={setSearch} />
              <Login></Login>
              <Register></Register>
              <Editproducts></Editproducts>
              <Cart></Cart>
              <Profileset></Profileset>
            </Outlet>
            {/* <Footer></Footer> */}
          </Searchcontext.Provider>
        </cartcontext.Provider>
      </Getallcart.Provider>
    </>
  );
}

export default App;
