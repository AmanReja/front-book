import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import cartcontext from "./Context/cartcontext";
import userpng from "../assets/icons/user.png";
import Searchcontext from "./Context/Searchcontext";
import Loginbtn from "./Loginbtn";

function Navbar() {
  const { search, setSearch } = useContext(Searchcontext);
  const value = useContext(cartcontext);

  const [open, setOpen] = useState(true);
  const [openinp, setOpeninp] = useState(false);
  const [flag, setFlag] = useState(true);
  const [pcheck, setPcheck] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [user, setUser] = useState({});
  const base_url = "https://book-backend-ust3.onrender.com";

  // ✅ Toggle profile dropdown
  const handelpcheck = () => {
    setPcheck((prev) => !prev);
  };

  // ✅ Clear user data safely
  const handeldataremove = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // ✅ Toggle mobile menu
  const show = () => {
    setOpen((prev) => !prev);
  };

  // ✅ Toggle search input visibility
  const openInput = () => {
    setOpeninp((prev) => !prev);
  };

  // ✅ Safe user fetch function
  const getoneuser = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.warn("No user found in localStorage.");
      return;
    }

    let userdomain = null;
    try {
      const parsedUser = JSON.parse(storedUser);
      userdomain = parsedUser?._id;
      if (!userdomain) return;
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      return;
    }

    try {
      const response = await fetch(`${base_url}/user/getUser/${userdomain}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserdata(parsed);
        setFlag(false);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
    getoneuser();
  }, [flag]);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <div
                onClick={show}
                className={`relative left-[-8px] items-center flex flex-col duration-300 transition-all justify-center ${
                  !open ? "gap-[-3px]" : "gap-[9px]"
                } w-[60px] h-[40px]`}
              >
                <div
                  className={`bg-white w-[30px] h-[2px] duration-300 ${
                    open ? "" : "rotate-45"
                  }`}
                ></div>
                <div
                  className={open ? "bg-white w-[30px]  h-[2px]" : "hidden"}
                ></div>
                <div
                  className={`bg-white w-[30px] h-[2px] duration-300 ${
                    open ? "" : "-rotate-45"
                  }`}
                ></div>
              </div>
            </div>

            {/* Logo */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <h3 className="logo text-3xl font-bold">
                  Nov
                  <span className="font-bold" style={{ color: "#f5710c" }}>
                    elity
                  </span>
                </h3>
              </div>

              {/* Desktop Links */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="relative top-[10px] flex space-x-4">
                  <Link to="#">
                    <span className="erounded-md px-3 py-2 text-sm font-medium text-white hover:bg-lime-500">
                      Dashboard
                    </span>
                  </Link>

                  <Link to="/">
                    <span className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      Home
                    </span>
                  </Link>

                  <Link to="#">
                    <span className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      Contact us
                    </span>
                  </Link>

                  {/* Cart icon */}
                  <Link className="the-cart" to="/cart">
                    <i className="text-2xl fa-solid fa-cart-shopping"></i>
                    <h3
                      className={
                        value.cart.length > 0
                          ? "relative top-[-40px] left-[20px] w-[20px] text-center h-[20px] rounded bg-red-500"
                          : "hidden"
                      }
                    >
                      {value.cart.length}
                    </h3>
                  </Link>
                </div>
              </div>
            </div>

            {/* Search bar */}
            <form className="flex items-center justify-between relative sm:r-0 right-[20px]">
              <input
                placeholder="Search here"
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className={`transition-all duration-300 outline-none absolute top-[50px] right-[50px] bg-white z-10 ${
                  openinp ? "w-[200px] h-[40px] text-black" : "h-[0]"
                }`}
              />
              <button
                className="bg-lime-400 w-[50px] rounded"
                type="button"
                onClick={openInput}
              >
                {!openinp ? (
                  <i className="text-2xl fa-solid fa-magnifying-glass"></i>
                ) : (
                  <i className="text-2xl fa-solid fa-xmark cross-icon"></i>
                )}
              </button>
            </form>

            {/* Profile */}
            <div className="profile relative">
              {flag ? (
                <Link to="/login">
                  <Loginbtn />
                </Link>
              ) : (
                <div
                  onClick={handelpcheck}
                  className="w-[40px] h-[40px] cursor-pointer"
                >
                  <img
                    className="w-full object-cover rounded-full h-full"
                    src={user?.image || userpng}
                    alt="user"
                  />
                </div>
              )}

              {/* Dropdown */}
              <div
                className={
                  pcheck
                    ? "absolute z-30 flex flex-col top-[50px] left-[-163px] w-[200px] items-start bg-white text-black px-[20px] gap-2 rounded font-thin text-[17px]"
                    : "hidden duration-300"
                }
              >
                <Link onClick={handelpcheck} to="/profile">
                  <button className="hover:text-blue-400 duration-300">
                    Profile Setting
                  </button>
                </Link>
                <button className="hover:text-blue-400 duration-300">
                  Customer Service
                </button>
                <button
                  onClick={() => {
                    handeldataremove();
                    handelpcheck();
                  }}
                  className="hover:text-blue-400 duration-300"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={open ? "show-profile" : ""} id="mobile-menu">
          <div className="relative z-10 space-y-1 px-2 pb-3 pt-2">
            <Link
              onClick={() => setOpen(true)}
              to="#"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            >
              Dashboard
            </Link>

            <Link onClick={() => setOpen(true)} to="/">
              <span className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                Home
              </span>
            </Link>

            <Link onClick={() => setOpen(true)} to="/cart">
              <span className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                Go to cart
              </span>
              {value.cart.length > 0 && (
                <h5 className="relative top-[-30px] left-[100px] w-[20px] text-center h-[20px] rounded bg-red-500">
                  {value.cart.length}
                </h5>
              )}
            </Link>

            <Link onClick={() => setOpen(true)} to="/adminlogin">
              <span className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                Admin login
              </span>
            </Link>

            <Link onClick={() => setOpen(true)} to="#">
              <span className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                Contact us
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
