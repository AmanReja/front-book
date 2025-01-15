import React, { useState, useEffect } from "react";

import b1 from "../assets/images/1.jpg";
import b2 from "../assets/images/2.jpeg";
import b3 from "../assets/images/3.jpeg";
import b4 from "../assets/images/4.jpg";
import b5 from "../assets/images/5.jpeg";

import "./Slider.css";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

function Slider() {
  const base_url = "https://bookapp-3e2d.onrender.com";
  const [product, setProducts] = useState([]);

  // console.log(10, search);

  async function getProducts() {
    const response = await fetch(`${base_url}/seller/getAllBooks`);
    const data = await response.json();
    console.log("slid", data);

    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    if (currentIndex == 0) {
      setCurrentIndex(product.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const nextSlide = () => {
    if (currentIndex == product.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(); // Automatically move to next slide every 3 seconds
    }, 3000); // 3000 ms = 3 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]); // Re-run the effect whenever currentIndex changes

  // const slides = [
  //   { url: b1 },
  //   { url: b2 },
  //   { url: b3 },
  //   { url: b4 },

  //   { url: b5 }
  // ];

  // console.log(33, slides[currentIndex]?.url);

  return (
    <>
      <div className="aman max w-[1400]px top-[40px] h-[700px] w-full m-auto py-20 px-20 absolute z-1">
        <div
          style={{
            backgroundImage: `url(${product[currentIndex]?.bookimage})`
          }}
          className="box w-[350px] h-full rounded-2xl bg-center bg-cover duration-[0.2s] "
        ></div>
        <div className=" nav-l absolute top-[50%] -translate-x-0 translate-x[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 cursor-pointer hover:bg-lime-400 ">
          <BsChevronCompactLeft onClick={prevSlide} size={40} />
        </div>
        <div className="nav-l absolute top-[50%] -translate-x-0 translate-x[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 cursor-pointer hover:bg-lime-400">
          <BsChevronCompactRight onClick={nextSlide} size={40} />
        </div>
        <div className=" dot-box absolute gap-4 top-[78%] right-[700px] flex justify-center py-2">
          {product.map((slid, Index) => {
            return (
              <div
                onClick={() => {
                  setCurrentIndex(Index);
                }}
                className={`rounded-full w-2 h-2 ${
                  Index == currentIndex
                    ? "bg-lime-500 w-4 transition-all duration-[0.5s]"
                    : "bg-white transition-all duration-[0.5s]"
                }`}
                key={Index}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Slider;
