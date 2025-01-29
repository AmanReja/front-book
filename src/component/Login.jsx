import React, { useEffect, useState, useContext } from "react";
import "./Login.css";
import glass from "../assets/images/glass.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
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
  const base_url = "https://back-book-zct1.onrender.com";
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");
  console.log(pass, email);

  const login_user = async (e) => {
    e.preventDefault();
    const new_user = {
      userid: email,
      password: pass
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_user)
    };
    const response = await fetch(`${base_url}/user/loginUser`, requestOptions);
    const data = await response.json();

    console.log(33, data.length);

    if (data.length == 0) {
      toast.error("login failed", { theme: "dark" });
    } else {
      console.log(2, data);

      localStorage.setItem("id", data[0]._id);
      localStorage.setItem("user", JSON.stringify(data[0]));
      toast.success("login successfull");

      Navigate("/");
      window.location.reload();
      setEmail("");
      setPass("");
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
      <div className="flex h-screen items-center justify-center p-10">
        <div className="xl:w-1/2  rounded-2xl border border-blue-800 md:shadow-xl">
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  type="text"
                  className="mb-3 w-full rounded-2xl text-black bg-zinc-100 outline-rose-400 px-5 py-3"
                  placeholder="email"
                />
                <input
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
