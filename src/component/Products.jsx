import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { React, useContext, useEffect, useState } from "react";
import right from "../assets/icons/right.png";
import Searchcontext from "./Context/Searchcontext";
import cartcontext from "./Context/cartcontext";
import { Bounce } from "react-awesome-reveal";
import "./Products.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Getallcart from "./Context/Getallcart";

function Products() {
  const navigate = useNavigate();
  const getAllcart = useContext(Getallcart);
  const base_url = "https://back-book-zct1.onrender.com";
  const value = useContext(cartcontext);
  const [product, setProducts] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [postprepage, setpostPrepage] = useState(3);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const newuser = JSON.parse(localStorage.getItem("user")) || {};
      setUserdata(newuser);
    }
  }, []);

  const addtoCart = async (item) => {
    if (!localStorage.getItem("user")) {
      Swal.fire({
        title: "You have to login first",
        icon: "warning"
      });
      navigate("/login");
    } else {
      const new_cart = {
        userid: userdata._id,
        itemid: item.id,
        bookname: item.bookname,
        price: item.price,
        bookimage: item.bookimage,
        authore: item.authore,
        offer: item.offer
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_cart)
      };

      const response = await fetch(`${base_url}/cart/addCart`, requestOptions);
      const data = await response.json();

      if (data._id) {
        Swal.fire({
          title: `${item.bookname} is added to your cart`,
          icon: "success"
        });
        await getAllcart();
      } else {
        toast.error(`Failed to add to cart`, {
          theme: "dark"
        });
      }
    }
  };

  const searcher = useContext(Searchcontext);

  async function getProducts() {
    const response = await fetch(`${base_url}/seller/getAllBooks/${searcher}`);
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const lastpostindex = currentpage * postprepage;
  const firstpostindex = lastpostindex - postprepage;
  const currentPostes = product.slice(firstpostindex, lastpostindex);
  const totalPages = Math.ceil(product.length / postprepage);

  return (
    <>
      <ToastContainer />

      <div className="items-container flex flex-wrap items-center justify-center bg-gray-900 gap-[30px]">
        {currentPostes.map((item, index) => (
          <Bounce key={index} delay={0.5}>
            <div className="blackf w-[300px] h-[600px] hover:translate-y-6 duration-500 relative xl:px-16 max-lg:mx-auto max-lg:mt-8">
              <div className="w-[300px] h-[200px]">
                <img
                  className="w-[200px] duration-500 transition-all bg-cover object-cover m-auto h-[350px]"
                  src={item.bookimage}
                  alt={item.bookname}
                />
              </div>

              <div className="flex flex-col gap-5 items-center mb-8 gap-y-5 pt-[100px]">
                <div className="flex items-center">
                  <h5 className="font-manrope font-semibold text-2xl leading-9 text-lime-300 ">
                    $ {item.price}{" "}
                  </h5>
                  <span className="ml-3 font-semibold text-lg text-white">
                    {item.offer}% off
                  </span>
                </div>
              </div>

              <div className="p-add-btn relative flex justify-between gap-4 w-[400px]">
                <NavLink to="/cart">
                  <button
                    onClick={() => addtoCart(item)}
                    className="text-center h-[40px] w-[170px] px-5 py-4 rounded-[100px] flex items-center justify-center font-semibold text-[15px] text-white shadow-sm transition-all duration-500 hover:bg-fuchsia-700 hover:shadow-indigo-300"
                  >
                    Buy Book
                  </button>
                </NavLink>

                <button
                  onClick={() => addtoCart(item)}
                  className="bittu text-center h-[40px] w-[170px] px-5 py-4 rounded-[100px] bg-red-600 flex items-center justify-center font-semibold text-[15px] text-white shadow-sm transition-all duration-500 hover:bg-lime-400 hover:shadow-indigo-300"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </Bounce>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="bg-gray-900 flex pt-5 items-center justify-center gap-[10px]">
        <button
          onClick={() => setCurrentpage((prev) => Math.max(prev - 1, 1))}
          disabled={currentpage === 1}
          className={`px-4 h-10 leading-tight rounded ${
            currentpage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-red-500"
          }`}
        >
          Previous
        </button>

        <span className="text-white text-lg">
          Page {currentpage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentpage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentpage === totalPages}
          className={`px-4 h-10 leading-tight rounded ${
            currentpage === totalPages
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-sky-500"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Products;
