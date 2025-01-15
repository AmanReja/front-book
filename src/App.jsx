import { useState, useEffect, useContext, useRef } from "react";
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

function App() {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  // const addCart = useRef([]);

  // async function filter() {
  //   const response = await fetch(
  //     `http://localhost:3000/seller/filterbookByname/${searcher}`
  //   );
  //   const data = await response.json();
  //   // const items = data.items;
  //   console.log(12, searcher);

  //   setProducts(data);
  // }

  const handelchange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      {" "}
      <cartcontext.Provider value={{ cart, setCart }}>
        <Searchcontext.Provider value={search}>
          <Navbar hand={handelchange} open={open} setOpen={setOpen}></Navbar>
          {/* <Navtest></Navtest> */}

          <Outlet>
            <Products search={search} setSearch={setSearch} />
            <Home search={search} setSearch={setSearch} />
            <Login></Login>
            <Register></Register>
            <Editproducts></Editproducts>
            <Cart></Cart>
          </Outlet>
          <Footer></Footer>
        </Searchcontext.Provider>
      </cartcontext.Provider>
    </>
  );
}

export default App;
