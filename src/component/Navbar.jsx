import React, { useEffect, useRef, useState, useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import cartcontext from "./Context/cartcontext";

import Loginbtn from "./Loginbtn";

function Navbar({ hand }) {
  const value = useContext(cartcontext);

  const user_menu = document.querySelector("#user-menu-button");
  const menu_buttons = document.querySelector("#menu-buttons");

  const [open, setOpen] = useState(true);
  const [openinp, setOpeninp] = useState(true);

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

  // if(open){
  //   setOpen(false)

  // useEffect(()=>{
  //   closed()
  // },[setDisplay])

  // const first = useRef()
  // useEffect(() => {
  //   cartitem;
  //   console.log(50, cartitem.current.length);
  // }, [cartitem.current]);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                onClick={() => {
                  show();
                }}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {/*
        Icon when menu is closed.
  
        Menu open: "hidden", Menu closed: "block"
      */}
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/*
        Icon when menu is open.
  
        Menu open: "block", Menu closed: "hidden"
      */}
                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
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
                onChange={hand}
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
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="log-btn relative ml-3">
                <div>
                  <Link to="login">
                    <Loginbtn></Loginbtn>
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={open ? " show-profile " : ""} id="mobile-menu">
          <div className=" relative z-10 space-y-1 px-2 pb-3 pt-2">
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
