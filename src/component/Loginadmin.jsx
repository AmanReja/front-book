import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./Admin.css";

// "http://localhost:3000/admin/loginAdmin",

function Loginadmin() {
  const base_url = "https://bookapp-3e2d.onrender.com";
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const Navigate = useNavigate();

  const login_admin = async () => {
    const new_admin = {
      adminid: email,
      adminpassword: pass
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_admin)
    };
    const response = await fetch(
      `${base_url}/admin/loginAdmin`,
      requestOptions
    );
    const data = await response.json();

    console.log(33, data.length);

    if (data.length == 0) {
      alert("login failed");
    } else {
      Navigate("/edit");
      alert("login successfull");
    }

    // const login_input = (document.querySelector("#email").value = "");

    // const login_pass = (document.querySelector("#password").value = "");
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className=" adminlogo absolute w-[600px] left-[100px] h-[700px]">
        <img className="w-full h-full object-cover" src={card} alt="" />
      </div>
      <div className=" admin-box relative w-[420px] left-[900px] min-h-screen  py-6 flex flex-col justify-center sm:py-12">
        <form
          onSubmit={(e) => {
            login_admin(), e.preventDefault();
          }}
          className="relative w-full py-3 sm:max-w-xl sm:mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl text-blue-400 font-semibold">
                  Admin Log In
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      required
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative h-[40px] w-[80%]">
                    <button className=" h-full w-full bg-blue-500 hover:bg-lime-400 text-white rounded-md px-2 py-1">
                      Login In
                    </button>
                  </div>
                  <div className="flex justify-evenly relative top-[35px]">
                    <div className="relative h-[40px] w-[70%]">
                      <button
                        type="button"
                        className=" h-full w-full  bg-red-600  hover:bg-zinc-950 text-white rounded-md px-2 py-1"
                      >
                        Forgot password
                      </button>
                    </div>

                    <div className="relative h-[80px] w-[30%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Loginadmin;
