import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Footer from "./Footer";
import Herobanner from "./Herobanner";
import Slider from "./Slider";
import Dashboard from "./Dashboard";
import Searchcontext from "./Context/Searchcontext";
import Loader from "./Loader";

function Home() {
  const base_url = "https://bookapp-3e2d.onrender.com";
  const searcher = useContext(Searchcontext);
  const [product, setProducts] = useState([]);
  const [load, setLoad] = useState(true);
  async function getProducts() {
    const response = await fetch(`${base_url}/seller/getAllBooks/${searcher}`);
    const data = await response.json();

    setProducts(data);
    setLoad(false);
  }

  useEffect(() => {
    getProducts();
  }, [product]);

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <div>
          <Slider></Slider>

          <Herobanner></Herobanner>
          <Products></Products>
        </div>
      )}
    </>
  );
}

export default Home;
