import React, { useState, useEffect, useContext } from "react";
import Productcotext from "./Context/Productcotext";
import Searchcontext from "./Context/Searchcontext";
import "./Editproducts.css";
import Dashboard from "./Dashboard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

function Editproducts() {
  const [imgload, setImgLoad] = useState(false);
  const [load, setLoad] = useState(true);
  const base_url = "https://bookapp-3e2d.onrender.com";
  // const products = useContext(Productcotext);
  const searcher = useContext(Searchcontext);

  const [product, setProducts] = useState([]);
  async function getProducts() {
    const response = await fetch(`${base_url}/seller/getAllBooks/${searcher}`);
    const data = await response.json();
    // const items = data.items;

    setProducts(data);
    setLoad(false);
  }

  useEffect(() => {
    getProducts();
  }, [product]);

  const [displayform, setDisplayform] = useState(true);

  const handleImageUpload = async (e) => {
    setImgLoad(true);
    console.log(16, "hiii");
    const file = e.target.files[0];
    if (!file) {
      setImgLoad(false);
    }
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "l838hc61"); // Replace 'your_upload_preset' with your actual upload preset

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/djpw8rdeu/image/upload",
          formData
        );

        console.log("response: ", res.data);
        const x = res.data.secure_url;
        const y = res.data.public_id;

        console.log(x, y);

        // setBookimage(x);
        // setBookimageid(y);

        editedItem.bookimage = x;
        editedItem.bookimageid = y;
        setImgLoad(false);
      } catch (error) {
        console.error("Error uploading image: ", error);
        setImgLoad(false);
      }
    }
  };

  const formDisplay = () => {
    if (displayform) {
      setDisplayform(false);
    } else {
      setDisplayform(true);
    }
  };

  const handelDelete = async (item) => {
    if (window.confirm("Are u sure to delete?")) {
      const requestOptions = {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      };

      const response = await fetch(
        `${base_url}/seller/deleteBook/${item._id}`,
        requestOptions
      );
      const data = await response.json();
      console.log(12, response);
      console.log(data);
      if (response.ok) {
        toast("Your product has been deleted", {
          theme: "dark"
        });
      } else {
        console.log(2, data._id);
        toast.error("Your product has not deleted", { theme: "dark" });
      }
    }
  };
  const [editedItem, setEditedItem] = useState(null);

  const handleEdit = (item) => {
    // console.log(82, editedItem._id);
    setEditedItem(item);
    console.log(item._id);
  };

  const updateBook = async () => {
    console.log(88, editedItem._id, editedItem.bookname);

    //console.log(13, item, editedItem);

    //Preset:  l838hc61
    //App name : djpw8rdeu

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedItem)
    };
    const response = await fetch(
      `${base_url}/seller/updateBook/${editedItem._id}`,
      requestOptions
    );

    const data = await response.json();
    console.log(107, data);

    if (response.ok) {
      toast("Your product hasbeen updated", {
        theme: "dark"
      });
    } else {
      toast.error("Your new product addition failed", { theme: "dark" });
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <Dashboard></Dashboard>

      <div id="pl" className="  items-containt">
        {load ? (
          <Loader></Loader>
        ) : (
          product.map((item) => (
            <div className=" duration-300 blackd align-i h-[500px] pro-detail w-[500px] lg:pl-8 pr[100px] xl:px-16 max-lg:mx-auto max-lg:mt-8">
              <div
                className={
                  !displayform
                    ? " display-box bg-gray-900 h-[700px] rounded-3xl top-[23%] left-[39%] w-[50%] z-10 transition-all duration-500"
                    : "hidden duration-500"
                }
              >
                <div className="relative left-[40%]">
                  <button
                    onClick={() => {
                      setDisplayform(true), console.log(item.bookname);
                    }}
                    type="submit"
                    className="  inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-lime-400 text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-red-500"
                  >
                    <span>
                      <i class="fa-solid fa-xmark text-2xl"></i>
                    </span>
                  </button>
                </div>
                <div>
                  {/* <ToastContainer /> */}

                  <section className="bg-white dark:bg-gray-900"></section>

                  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                      Update Book
                    </h2>
                    <form
                      method="post"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Book name
                          </label>
                          <input
                            value={editedItem?.bookname}
                            onChange={(e) => {
                              setEditedItem({
                                ...editedItem,
                                bookname: e.target.value
                              });
                            }}
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type Book name"
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="brand"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Book price
                          </label>
                          <input
                            value={editedItem?.price}
                            onChange={(e) => {
                              setEditedItem({
                                ...editedItem,
                                price: e.target.value
                              });
                            }}
                            type="number"
                            name="brand"
                            id="brand"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$2999"
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Book quantity
                          </label>
                          <input
                            value={editedItem?.quantity}
                            onChange={(e) => {
                              setEditedItem({
                                ...editedItem,
                                quantity: e.target.value
                              });
                            }}
                            type="number"
                            name="price"
                            id="price"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="0-1"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Book rating
                          </label>
                          <select
                            value={editedItem?.rating}
                            onChange={(e) => {
                              setEditedItem({
                                ...editedItem,
                                rating: e.target.value
                              });
                            }}
                            id="category"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          >
                            <option selected>Select rating</option>
                            <option value="2.0">2.0</option>
                            <option value="3.5">3.5</option>

                            <option value="4.5">4.5</option>
                            <option value="4.8">4.8</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="item-weight"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Authore
                          </label>
                          <input
                            value={editedItem?.authore}
                            onChange={(e) => {
                              setEditedItem({
                                ...editedItem,
                                authore: e.target.value
                              });
                              // console.log(33);
                            }}
                            type="text"
                            name="item-weight"
                            id="item-weight"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type Authores Name"
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="brand"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Book offer
                          </label>
                          <input
                            value={editedItem?.offer}
                            onChange={(e) => {
                              setEditedItem({
                                ...editedItem,
                                offer: e.target.value
                              });
                            }}
                            type="number"
                            name="brand"
                            id="brand"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$2999"
                            required
                          />
                        </div>
                        {imgload ? (
                          <div className="loader1" />
                        ) : (
                          <div className="relative right-5 max-w-lg mx-auto">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              htmlFor="user_avatar"
                            >
                              Upload file
                            </label>
                            <input
                              onChange={(e) => {
                                handleImageUpload(e);
                              }}
                              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                              aria-describedby="user_avatar_help"
                              id="user_avatar"
                              type="file"
                            />
                            <div
                              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                              id="user_avatar_help"
                            >
                              Please upload your products image
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          updateBook(), setDisplayform(true);
                        }}
                        type="submit"
                        className=" bg-lime-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-lime-400"
                      >
                        Update book{" "}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className=" w-[300px] h-[200px]">
                <img
                  className=" w-full hover:scale-[1.1] duration-500 transition-all object-cover rounded-3xl m-auto h-full"
                  src={item.bookimage}
                  alt=""
                />
              </div>

              <div className=" flex items-center justify-between gap-11 mb-6">
                <div className="w-[600px] text flex items-center justify-evenly flex-col gap-[22px] ">
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-black mb-2 relative left-[50px] ">
                    {item.bookname}
                  </h2>
                  <p className="font-normal text-left text-gray-500">
                    {item.authore}
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
                      className="fill-indigo-50 transition-all duration-500 group-hover:fill-indigo-100"
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
                  <h5 className="font-manrope font-semibold text-2xl leading-9 text-pink-500 ">
                    $ {item.price}{" "}
                  </h5>
                  <span className="ml-3 font-semibold text-lg text-indigo-600">
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

              <div className=" p-add-btn relative  flex justify-between gap-4 w-[400px]">
                <button
                  onClick={(e) => {
                    handelDelete(item);
                  }}
                  className="text-center h-[40px] w-[150px] px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-[15px] text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-fuchsia-700 hover:shadow-indigo-300"
                >
                  Delete Book
                </button>
                <button
                  onClick={() => {
                    formDisplay(), handleEdit(item);
                  }}
                  className="text-center h-[40px] w-[150px] px-5 py-4 rounded-[100px] bg-red-600 flex items-center justify-center font-semibold text-[15px] text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-lime-400 hover:shadow-indigo-300"
                >
                  Edit Book
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Editproducts;
