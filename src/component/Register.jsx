import React, { useEffect, useState } from "react";
import glass from "../assets/images/glass.png";
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

  async function register() {
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
    const login_input = (document.querySelector("#login-input").value = "");
    const login_num = (document.querySelector("#login-num").value = "");
    const login_pass = (document.querySelector("#login-pass").value = "");
  }

  // useEffect(()=>{
  //     ScrollReveal({ reset: true });
  //     ScrollReveal().reveal('.control_form', { delay: 500, origin:"left", duration:400,distance:"40px" });
  //   },[])

  return (
    <>
      <img className="form-container" src={glass} alt="" />

      <ToastContainer />
      <div className="control_form">
        <form
          className="login-container"
          onSubmit={(e) => {
            register(), e.preventDefault();
          }}
        >
          <h2 className="text-4xl ">Register</h2>

          <div className="input-box">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="login-email"
              id="login-input"
              type="text"
            />
            <label className="input-lable" htmlFor="login-input">
              Enter your email
            </label>
          </div>
          <div className="input-box">
            <input
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              required
              className="login-email"
              id="login-num"
              type="number"
            />
            <label className="input-lable" htmlFor="login-num">
              Enter your Mobile number
            </label>
          </div>
          <div className="input-box">
            <input
              onChange={(e) => {
                setPass(e.target.value);
              }}
              required
              className="login-email"
              id="login-pass"
              type="text"
            />
            <label className="input-lable" htmlFor="login-pass">
              Enter your password
            </label>
          </div>
          <div className="rememberme">
            <label htmlFor="remember">
              <input id="remember" type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password</a>
          </div>
          {/* <Link to="/"> */}
          <button type="submit" id="login">
            {" "}
            Register
          </button>

          {/* </Link> */}
          <div className="register">
            <p>Don't have an account?</p>
            <Link to="/login">
              <a href="#">Login</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
