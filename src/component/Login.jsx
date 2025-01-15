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

function Login() {
  const value = useContext(cartcontext);
  const base_url = "https://back-book-zct1.onrender.com";
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");

  const login_user = async () => {
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

      Navigate("/");
      window.location.reload();
    }

    const login_input = (document.querySelector("#login-input").value = "");
    const login_pass = (document.querySelector("#login-pass").value = "");
  };

  const userid = JSON.parse(localStorage.getItem("user"));

  // useEffect(()=>{
  //   ScrollReveal({ reset: true });
  //   ScrollReveal().reveal('.control_form', { delay: 500, origin:"left", duration:300,distance:"40px" });
  // },[])

  return (
    <>
      <img className="form-container" src={glass} alt="" />
      <ToastContainer />

      <div className="control_form">
        <form
          onSubmit={(e) => {
            login_user(), e.preventDefault();
          }}
          className="login-container"
        >
          <h2 className="text-4xl ">Log in</h2>
          <div className="input-box">
            <input
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPass(e.target.value)}
              required
              className="login-email"
              id="login-pass"
              type="text"
            />
            <label className="input-lable" htmlFor="login-pass">
              Enter your pass
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
            login
          </button>

          {/* </Link> */}
          <div className="register">
            <p>Don't have an account?</p>
            <Link to="/register">
              <a href="#">Register</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
