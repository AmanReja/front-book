import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Footer from "./Footer";
import Herobanner from "./Herobanner";
import Slider from "./Slider";
import Dashboard from "./Dashboard";

import Loader from "./Loader";
import { ToastContainer } from "react-toastify";
import Midfooter from "./Midfooter";
import Searchcontext from "./Context/Searchcontext";

function Home() {
  const base_url = "https://book-backend-ust3.onrender.com";
  const { search, setSearch } = useContext(Searchcontext);

  const [product, setProducts] = useState([]);
  const [load, setLoad] = useState(true);
  async function getProducts() {
    const response = await fetch(`${base_url}/seller/getAllBooks/${search}`);
    const data = await response.json();

    setProducts(data);
    setLoad(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>
      {load ? (
        <Loader />
      ) : (
        <div>
          <Slider></Slider>

          <Herobanner></Herobanner>
          <Products></Products>
          <Midfooter></Midfooter>
        </div>
      )}
    </>
  );
}

export default Home;
