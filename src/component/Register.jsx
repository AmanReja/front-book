import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./Register.css";
import ScrollReveal from "scrollreveal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const base_url = "https://back-book-zct1.onrender.com";
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");

  async function register(e) {
    e.preventDefault();
    const new_user = {
      userid: email,
      contact: number,
      password: pass
    };
    console.log(new_user);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_user)
    };
    const response = await fetch(`${base_url}/user/addUser`, requestOptions);
    const data = await response.json();

    if (data._id != null) {
      toast.success("You are successfully registered", {
        theme: "dark"
      });
    } else {
      toast.error("Registration failed", { theme: "dark" });
    }

    setEmail("");
    setNumber("");
    setPass("");
  }

  // useEffect(()=>{
  //     ScrollReveal({ reset: true });
  //     ScrollReveal().reveal('.control_form', { delay: 500, origin:"left", duration:400,distance:"40px" });
  //   },[])

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
                  register(e);
                }}
              >
                <h1 className="text-center font-extrabold uppercase text-rose-500">
                  User Sign Up
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
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                  required
                  type="text"
                  className="mb-3 w-full rounded-2xl text-black bg-zinc-100 outline-rose-400 px-5 py-3"
                  placeholder="number"
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
                  Register
                </button>
                <div className="flex items-center justify-between">
                  <div className="text-blue-600">Already have an account? </div>{" "}
                  <Link to="/login">
                    <button className=" bg-sky-400 w-[80px] py-[5px]">
                      Login{" "}
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

export default Register;
