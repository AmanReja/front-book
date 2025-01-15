import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { React, useContext, useEffect, useState, useRef } from "react";
import right from "../assets/icons/right.png";
import Searchcontext from "./Context/Searchcontext";
import Productcotext from "./Context/Productcotext";
import cartcontext from "./Context/cartcontext";
import { Bounce } from "react-awesome-reveal";
import "./Products.css";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";

function Products() {
  // const [load, setLoad] = useState(true);
  const base_url = "https://bookapp-3e2d.onrender.com";
  const value = useContext(cartcontext);
  const [product, setProducts] = useState([]);

  const addtoCart = (item) => {
    toast.success(`${item.bookname} is added to your cart`, {
      theme: "dark"
    });
    value.setCart((prev) => [...prev, item]);

    console.log("Cart", 22, value.cart);

    console.log("cart length", 24, value.cart.length);
  };

  async function getProducts() {
    const response = await fetch(`${base_url}/seller/getAllBooks/${searcher}`);
    const data = await response.json();

    setProducts(data);
    // setLoad(false);
  }

  useEffect(() => {
    getProducts();
  }, [product]);

  const searcher = useContext(Searchcontext);

  return (
    <>
      <ToastContainer></ToastContainer>
      <div id="pl" className="  items-container">
        <h1></h1>

        {product.map((item) => (
          <Bounce delay={0.5}>
            <div className=" hover:translate-y-6 duration-500 blackf align-i h-[500px] pro-detail w-[500px] lg:pl-8 pr[100px] xl:px-16 max-lg:mx-auto max-lg:mt-8">
              <div className="w-[300px] h-[200px]">
                <img
                  className="w-full hover:scale-[1.1] duration-500 transition-all bg-cover object-cover rounded-3xl m-auto h-full"
                  src={item.bookimage}
                  alt=""
                />
              </div>

              <div className=" flex items-center justify-between gap-11 mb-6">
                <div className="w-[600px] text flex items-center justify-evenly flex-col gap-[22px] ">
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-white mb-2 relative left-[50px] ">
                    {item.bookname}
                  </h2>
                  <p className="font-normal text-left text-gray-500">
                    {item.authore}
                    {searcher}
                  </p>
                </div>
                <button className="  relative right-[200px] top-[40px] group transition-all duration-500 p-0.5">
                  <svg
                    width={33}
                    height={33}
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="fill-indigo-50 transition-all duration-500 group-hover:fill-lime-300"
                      cx={30}
                      cy={30}
                      r={30}
                      fill
                    />
                    <path
                      className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-indigo-700"
                      d="M21.4709 31.3196L30.0282 39.7501L38.96 30.9506M30.0035 22.0789C32.4787 19.6404 36.5008 19.6404 38.976 22.0789C41.4512 24.5254 41.4512 28.4799 38.9842 30.9265M29.9956 22.0789C27.5205 19.6404 23.4983 19.6404 21.0231 22.0789C18.548 24.5174 18.548 28.4799 21.0231 30.9184M21.0231 30.9184L21.0441 30.939M21.0231 30.9184L21.4628 31.3115"
                      stroke
                      strokeWidth="1.6"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3">
                <div className="flex items-center">
                  <h5 className="font-manrope font-semibold text-2xl leading-9 text-lime-300 ">
                    $ {item.price}{" "}
                  </h5>
                  <span className="ml-3 font-semibold text-lg text-white">
                    {item.offer}% off
                  </span>
                </div>
                <svg
                  className="mx-5 max-[400px]:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  width={2}
                  height={36}
                  viewBox="0 0 2 36"
                  fill="none"
                >
                  <path d="M1 0V36" stroke="#E5E7EB" />
                </svg>
                <button className="flex items-center gap-1 rounded-lg bg-yellow-300 py-1.5 px-2.5 w-max">
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_12657_16865)">
                      <path
                        d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                        fill="white"
                      />
                      <g clipPath="url(#clip1_12657_16865)">
                        <path
                          d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                          fill="white"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_12657_16865">
                        <rect width={18} height={18} fill="white" />
                      </clipPath>
                      <clipPath id="clip1_12657_16865">
                        <rect width={18} height={18} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-base font-medium text-white">
                    {item.rating}
                  </span>
                </button>
              </div>

              <div className="p-add-btn relative  flex justify-between gap-4 w-[400px]">
                <NavLink to="/cart">
                  <button
                    onClick={() => {
                      addtoCart(item);
                    }}
                    className="text-center h-[40px] w-[170px] px-5 py-4 rounded-[100px]  flex items-center justify-center font-semibold text-[15px] text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-fuchsia-700 hover:shadow-indigo-300"
                  >
                    buy book
                  </button>
                </NavLink>

                <button
                  onClick={(e) => {
                    addtoCart(item);
                  }}
                  className="bittu text-center h-[40px] w-[170px] px-5 py-4 rounded-[100px] bg-red-600 flex items-center justify-center font-semibold text-[15px] text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-lime-400 hover:shadow-indigo-300"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </Bounce>
        ))}
      </div>
    </>
  );
}

export default Products;
