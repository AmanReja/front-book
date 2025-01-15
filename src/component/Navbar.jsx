import React, { useEffect, useRef, useState, useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import cartcontext from "./Context/cartcontext";
import userpng from "../assets/icons/user.png";

import Loginbtn from "./Loginbtn";

function Navbar({ searchHandelar }) {
  const value = useContext(cartcontext);

  const user_menu = document.querySelector("#user-menu-button");
  const menu_buttons = document.querySelector("#menu-buttons");

  const [open, setOpen] = useState(true);
  const [openinp, setOpeninp] = useState(true);
  const [flag, setFlag] = useState(true);
  const [pcheck, setPcheck] = useState(false);
  const [userdata, setUserdata] = useState("");
  const [user, setUser] = useState([]);

  const handelpcheck = () => {
    setPcheck((prev) => !prev);
  };

  const handeldataremove = () => {
    localStorage.clear("user");
    window.location.reload();
  };

  function show() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }
  function openInp() {
    const show_icon = document.querySelector(".show-icon");
    const cross_icon = document.querySelector(".cross-icon");

    if (openinp) {
      setOpeninp(false);

      cross_icon.style.display = "inline-flex";
      show_icon.style.display = "none";
    } else {
      setOpeninp(true);
      show_icon.style.color = "white";
      cross_icon.style.display = "none";
      show_icon.style.display = "inline-flex";
    }
  }
  const getoneuser = async () => {
    const userid = JSON.parse(localStorage.getItem("user"));
    const userdomain = userid._id;
    const response = await fetch(
      `http://localhost:3000/user/getUser/${userdomain}`
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userid = JSON.parse(localStorage.getItem("user"));
      setFlag(false);

      setUserdata(userid);
    }
    getoneuser();
  }, [flag]);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <div
                onClick={show}
                className={`items-center flex flex-col duration-300 transition-all justify-center ${
                  !open ? "gap-[-3px]" : "gap-[9px]"
                } w-[60px] h-[40px]`}
              >
                <div
                  className={
                    open
                      ? "bg-white w-[30px] h-[2px] duration-300"
                      : "bg-white w-[30px] h-[2px] rotate-45  duration-300"
                  }
                ></div>
                <div
                  className={open ? "bg-white w-[30px]  h-[2px]" : "hidden"}
                ></div>
                <div
                  className={
                    open
                      ? "bg-white w-[30px] h-[2px]  duration-300"
                      : "bg-white w-[30px] h-[2px] -rotate-45  duration-300"
                  }
                ></div>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <h3 className="logo text-3xl">MY LOGO </h3>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className=" relative top-[10px] flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}

                  <Link>
                    <a
                      href="#"
                      className="erounded-md px-3 py-2 text-sm font-medium text-white hover:bg-lime-500"
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                  </Link>

                  <Link></Link>
                  <Link to="/">
                    <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Home
                    </a>
                  </Link>
                  <Link>
                    <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Contact us
                    </a>
                  </Link>
                  <Link className="the-cart" to="/cart">
                    <i class=" text-2xl fa-solid fa-cart-shopping"></i>

                    <h3
                      className={
                        value.cart.length > 0
                          ? "  relative top-[-40px] left-[20px] w-[20px] text-center h-[20px] rounded bg-red-500"
                          : "hidden"
                      }
                    >
                      {value.cart.length}
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
            <form className="search-container">
              <input
                id="m-search"
                onChange={searchHandelar}
                placeholder="Search here"
                className={openinp ? "search-inp" : "open-inp"}
                type="text"
              />
              <span
                type="submit"
                className="center"
                onClick={() => {
                  openInp();
                }}
              >
                <i class="text-2xl fa-solid fa-magnifying-glass show-icon"></i>
                <i
                  style={{ display: "none" }}
                  class="text-2xl fa-solid fa-xmark cross-icon"
                ></i>
              </span>
            </form>
            <div className="profile relative">
              {flag ? (
                <Link to="login">
                  <Loginbtn></Loginbtn>{" "}
                </Link>
              ) : (
                <div onClick={handelpcheck} className="w-[40px] h-[40px]">
                  {user.image == null ? (
                    <img
                      className="w-full object-cover rounded-full h-full"
                      src={userpng}
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-full object-cover rounded-full h-full"
                      src={user.image}
                      alt=""
                    />
                  )}
                </div>
              )}
              <div
                className={
                  pcheck
                    ? " absolute z-30 flex flex-col top-[50px] left-[-50px] w-[200px] items-start bg-white text-black px-[20px] gap-2 rounded font-thin text-[17px]"
                    : "hidden duration-300"
                }
              >
                <Link onClick={handelpcheck} to="/profile">
                  <button className="hover:text-blue-400  duration-300">
                    Profile Setting
                  </button>
                </Link>

                <button className="hover:text-blue-400  duration-300">
                  Customer Service
                </button>
                <button
                  onClick={() => {
                    handeldataremove(), handelpcheck();
                  }}
                  className="hover:text-blue-400  duration-300"
                >
                  Sign Out
                </button>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="log-btn relative ml-3"></div>
            </div>
          </div>
        </div>

        <div className={open ? " show-profile " : ""} id="mobile-menu">
          <div className=" relative  z-10 space-y-1 px-2 pb-3 pt-2">
            <a
              onClick={() => {
                setOpen(true);
              }}
              href="#"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              aria-current="page"
            >
              Dashboard
            </a>
            <Link
              onClick={() => {
                setOpen(true);
              }}
              to="/"
            >
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Home
              </a>
            </Link>

            <Link
              onClick={() => {
                setOpen(true);
              }}
              to="/cart"
            >
              <a
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                href="#"
              >
                Go to cart
              </a>

              <h5
                className={
                  value.cart.length > 0
                    ? "  relative top-[-30px] left-[100px] w-[20px] text-center h-[20px] rounded bg-red-500"
                    : "hidden"
                }
              >
                {value.cart.length}
              </h5>
            </Link>
            <Link
              onClick={() => {
                setOpen(true);
              }}
              to="/adminlogin"
            >
              <a
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                href="#"
              >
                Admin login
              </a>
            </Link>
            <a
              onClick={() => {
                setOpen(true);
              }}
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Contact us
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
