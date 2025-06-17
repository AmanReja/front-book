import React, { useEffect, useState, useContext } from "react";
import "./Login.css";

import { Link } from "react-router-dom";
import Home from "./Home";
import ScrollReveal from "scrollreveal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import cartcontext from "./Context/cartcontext";
import Swal from "sweetalert2";

function Login() {
  const value = useContext(cartcontext);
  const base_url = "https://book-backend-ust3.onrender.com";
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");
  console.log(pass, email);

  const login_user = async (e) => {
    e.preventDefault();
    const new_user = {
      userid: email,
      password: pass,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_user),
    };
    const response = await fetch(`${base_url}/user/loginUser`, requestOptions);
    const data = await response.json();

    console.log(33, data.length);

    if (data.length !== 0) {
      Swal.fire({
        title: "login successfull",

        icon: "success",
      });
      Navigate("/");
      localStorage.setItem("id", data[0]._id);
      localStorage.setItem("user", JSON.stringify(data[0]));
    } else {
      Swal.fire({
        title: "wrong credentials",
        text: "try again",
        icon: "error",
      });
    }
  };

  const userid = JSON.parse(localStorage.getItem("user"));

  // useEffect(()=>{
  //   ScrollReveal({ reset: true });
  //   ScrollReveal().reveal('.control_form', { delay: 500, origin:"left", duration:300,distance:"40px" });
  // },[])

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="flex h-[900px] items-center justify-center p-[5px]  ">
        <div className="w-full rounded-2xl border border-blue-800 md:shadow-xl">
          <div className="grid md:grid-cols-2 p-5">
            <div className>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/login-10299071-8333958.png?f=webp"
                alt
              />
            </div>
            <div className="flex items-center justify-center">
              <form
                onSubmit={(e) => {
                  login_user(e);
                }}
              >
                <h1 className="text-center font-extrabold uppercase text-rose-500">
                  User login
                </h1>
                <br />
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  type="text"
                  className="mb-3 w-full rounded-2xl text-black bg-zinc-100 outline-rose-400 px-5 py-3"
                  placeholder="email"
                />
                <input
                  value={pass}
                  required
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  type="password"
                  className="mb-3 w-full rounded-2xl text-black bg-zinc-100 outline-rose-400 px-5 py-3"
                  placeholder="password"
                />
                <button
                  type="submit"
                  className="mb-3 w-full rounded-2xl bg-rose-500 px-5 py-3 font-semibold text-white"
                >
                  Login
                </button>
                <div className="flex items-center justify-between">
                  <div className="text-blue-600">Don't have an account? </div>{" "}
                  <Link to="/register">
                    <button className=" bg-sky-400 w-[80px] py-[5px]">
                      Register{" "}
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
