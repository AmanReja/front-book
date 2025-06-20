import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import "./Mnorder.css";

function Mnorder() {
  const base_url = "https://book-backend-ust3.onrender.com";
  const [load, setLoad] = useState(false);
  // const [bookid, setBookid] = useState("");
  const [bookname, setBookname] = useState("");
  const [bookprice, setBookprice] = useState("");
  const [bookquantity, setBookquantity] = useState("");
  const [bookrating, setBookrating] = useState("");
  const [bookoffer, setBoooffer] = useState("");
  const [bookauthore, setBookauthore] = useState("");
  const [bookimage, setBookimage] = useState("");
  const [bookimageid, setBookimageid] = useState("");

  console.log(bookrating);

  const handleImageUpload = async (e) => {
    setLoad(true);
    console.log(16, "hiii");
    const file = e.target.files[0];
    if (!file) {
      setLoad(false);
      console.error("No file selected");
      return;
    }

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

      setBookimage(x);
      setBookimageid(y);
      setLoad(false);
    } catch (error) {
      console.error("Error uploading image: ", error);
      setLoad(false);
    }
  };

  const addProduct = async () => {
    const new_product = {
      bookname: bookname,
      price: bookprice,
      quantity: bookquantity,
      authore: bookauthore,
      rating: bookrating,
      offer: bookoffer,
      bookimage: bookimage,
      bookimageid: bookimageid,
    };
    console.log(new_product);

    //Preset:  l838hc61
    //App name : djpw8rdeu

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_product),
    };
    const response = await fetch(`${base_url}/seller/addBook`, requestOptions);
    const data = await response.json();

    console.log(12, data);

    if (data._id != null) {
      toast("You new product has added", {
        theme: "dark",
      });
    } else {
      toast.error("Your new product addition failed", { theme: "dark" });
    }
  };

  return (
    <>
      <Dashboard></Dashboard>
      <div className=" box-b bg-gray-900 h-[100vh]">
        <div>
          <ToastContainer />

          <section className="bg-white dark:bg-gray-900"></section>

          <div className=" py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Add a new Book
            </h2>
            <form
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                addProduct();
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
                    onChange={(e) => {
                      setBookname(e.target.value);
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
                    onChange={(e) => {
                      setBookprice(e.target.value);
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
                    onChange={(e) => {
                      setBookquantity(e.target.value);
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
                    Rating
                  </label>
                  <select
                    onChange={(e) => {
                      setBookrating(e.target.value);
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
                    onChange={(e) => {
                      setBookauthore(e.target.value);
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
                    onChange={(e) => {
                      setBoooffer(e.target.value);
                    }}
                    type="number"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required
                  />
                </div>
                {load ? (
                  <div className="loader2"></div>
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
                type="submit"
                className=" bg-lime-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-lime-400"
              >
                Add product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mnorder;
