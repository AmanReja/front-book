import { React, useContext, useEffect, useState, useRef } from "react";
import cartcontext from "./Context/cartcontext";
import Searchcontext from "./Context/Searchcontext";
import "./Cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import master from "../assets/icons/master.png";
import Swal from "sweetalert2";
import camera from "../assets/icons/camara.png";
import Getallcart from "./Context/Getallcart";

function Cart() {
  const getAllcart = useContext(Getallcart);
  const cartvalue = useContext(cartcontext);
  const [rezPayid, setRezPayid] = useState("");
  const base_url = "https://back-book-zct1.onrender.com";

  const searcher = useContext(Searchcontext);
  const date = new Date();
  const formatdate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const value = useContext(cartcontext);

  const [details, setDetails] = useState(false);
  const [successdetails, setSuccessdetails] = useState([]);
  // const [makepayment, setMakepayment] = useState(false);

  const [buy, setbuy] = useState(false);
  const [total, setTotal] = useState(true);

  const calculatetotalprice = value.cart.reduce((acumulate, item) => {
    return acumulate + item.items[0].price * item.items[0].quantity;
  }, 0);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  // console.log(48, cartvalue.cart[0].userid);

  const handelpay = async () => {
    const addpayment = {
      userid: cartvalue.cart[0].userid,
      amount: calculatetotalprice,
      brandname: "Online Shopping",
      quantity: value.cart.length,
      brandimage:
        "https://images.shiksha.com/mediadata/images/1626695443phppjGnqq.jpeg",
      razorpayid: ""
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addpayment)
    };
    const response = await fetch(
      `${base_url}/pay/createPayment`,
      requestOptions
    );
    const data = await response.json();

    console.log(33, data);
    setSuccessdetails(data);

    var options = {
      key: "rzp_test_ND81BEh4gRO77Q", // Enter the Key ID generated from the Dashboard
      amount: calculatetotalprice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Book shop", //your business name
      description: "There are 3 Products.",
      image:
        "https://images.shiksha.com/mediadata/images/1626695443phppjGnqq.jpeg",
      handler: function (response) {
        setRezPayid(response.razorpay_payment_id);
        paySuccess(response.razorpay_payment_id, data._id, data.amount);
      }
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  console.log("success", successdetails);
  console.log("rezid", rezPayid);

  const paySuccess = async (rid, _id, amount) => {
    const successpayment = {
      razorpayid: rid,
      status: "Success"
    };

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(successpayment)
    };
    const response = await fetch(
      `${base_url}/pay/sucessPayment/${_id}`,
      requestOptions
    );
    const data = await response.json();
    console.log("patch data", data);
    if (response.ok) {
      Swal.fire({
        title: "Good job!",
        text: "payment succssful!",
        icon: "success"
      });
    }
    // Voice message after successful payment
    const utterance = new SpeechSynthesisUtterance(
      ` ${amount} rupees has been sent.`
    );
    window.speechSynthesis.speak(utterance);
  };

  const handeltotal = () => {
    setTotal((prev) => !prev);
  };

  const handelbuy = (p) => {
    setbuy(p.items[0]);
    if (!details) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };

  const handelremove = async (p, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p)
        };

        const response = await fetch(
          `${base_url}/cart/deleteCartitem/${p._id}`,
          requestOptions
        );
        const data = await response.json();

        if (!response.ok) {
          toast.error("Your product has not removed", { theme: "dark" });
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        await getAllcart();
      }
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  const incqnt = async (cart, itemIndex) => {
    console.log(84, cart);

    try {
      const updatedQuantity = cart.items[0].quantity + 1; // Increment quantity

      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: cart.items[0]._id, // Pass item ID
          quantity: updatedQuantity // Pass updated quantity
        })
      };

      const response = await fetch(
        `${base_url}/cart/updateCartitem/${cart._id}`, // Cart ID
        requestOptions
      );
    } catch (error) {
      console.error("Error updating cart:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong.",
        icon: "error"
      });
    }
    await getAllcart();
  };
  const decqnt = async (cart, itemIndex) => {
    console.log(84, cart);

    try {
      const updatedQuantity = cart.items[0].quantity - 1; // Increment quantity

      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: cart.items[0]._id, // Pass item ID
          quantity: updatedQuantity // Pass updated quantity
        })
      };

      const response = await fetch(
        `${base_url}/cart/updateCartitem/${cart._id}`, // Cart ID
        requestOptions
      );
    } catch (error) {
      console.error("Error updating cart:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong.",
        icon: "error"
      });
    }
    await getAllcart();
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className=" cart-box min-h-[1000px] bg-gray-900">
        <div
          className={
            !total
              ? "cart-b1 bg-gray-800 h-max w-[700px] rounded-md p-4 shadow-[0_3px_20px_-10px_rgba(6,81,237,0.4)] z-10 absolute top-[100px] left-[700px]"
              : "hidden"
          }
        >
          <h3 className="text-lg font-bold text-white">Order Summary</h3>
          <br />
          <button
            onClick={handeltotal}
            className=" bg-lime-500 w-[150px] absolute right-[10px] top-[3%]"
          >
            <i class="fa-solid fa-x"></i>
          </button>

          <ul className="text-gray-500 text-sm space-y-3 mt-3">
            <li className="flex flex-wrap gap-4">
              Subtotal{" "}
              <span className="ml-auto font-bold">${calculatetotalprice}</span>
            </li>
            <li className="flex flex-wrap gap-4">
              Shipping <span className="ml-auto font-bold">Free</span>
            </li>
            <li className="flex flex-wrap gap-4">
              Tax <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 font-bold">
              Total <span className="ml-auto">${calculatetotalprice + 4}</span>
            </li>
          </ul>
          <button
            onClick={handelpay}
            type="button"
            className="mt-6 text-sm px-6 py-3 w-full bg-blue-700 hover:bg-blue-800 tracking-wide text-white rounded-md"
          >
            Make Payment
          </button>
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-sky-400 mb-3">
                Secure payment
              </h4>
              <p className="text-sm text-gray-500">
                Experience peace of mind with our secure payment options,
                ensuring your transactions are protected and reliable.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-red-500 mb-3">
                Free delivery
              </h4>
              <p className="text-sm text-gray-500">
                Enjoy the convenience of free delivery on all your orders,
                providing a cost-effective and seamless shopping experience.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-yellow-300 mb-3">
                Easy to return
              </h4>
              <p className="text-sm text-gray-500">
                Simplify your shopping experience with hassle-free returns. Our
                easy return process ensures convenience and customer
                satisfaction.
              </p>
            </div>
          </div>
        </div>
        <br />
        <div
          className={
            value.cart.length > 0
              ? "shopping-head  pl-[50px] cart-head bg-gray-900 rounded w-[700px] items-center	 h-[60px] border-spacing-2 flex gap-[50px]"
              : "hidden"
          }
        >
          <h1 className="font-bold text-2xl">Shopping Cart </h1>{" "}
          <button
            onClick={handeltotal}
            className={
              total
                ? "bg-lime-500 flex items-center justify-center w-[170px]"
                : "hidden"
            }
          >
            <p>Check total</p>
            <i className="fa-solid text-2xl w-[60px] fa-arrow-right rotate-45"></i>
          </button>
          <h1 className="text-2xl font-thin w-[170px] text-center rounded bg-sky-500">
            Total items : {value.cart.length}
          </h1>
        </div>

        <section
          className={
            !details
              ? "hidden"
              : "group-A  w-[900px] vh-100 gradient-custom-2 left-[600px] z-10 "
          }
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-10 col-lg-8 col-xl-6">
                <div className="card card-stepper" style={{ borderRadius: 16 }}>
                  <div className=" bg-lime-400 card-header p-4">
                    <button
                      className="w-[80px] hover:bg-red-600 left-[200px] rounded-2xl relative duration-300"
                      onClick={() => {
                        setDetails(false);
                      }}
                    >
                      <i class="  fa-solid fa-x"></i>
                    </button>

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-muted mb-2">
                          {" "}
                          {}{" "}
                          <span className="fw-bold text-body">FN123456789</span>
                        </p>
                        <p className="text-muted mb-0">
                          {" "}
                          <span className="fw-bold text-body">
                            {formatdate}
                          </span>{" "}
                        </p>
                      </div>
                      <div>
                        <h6 className="mb-0">
                          {" "}
                          {/* <a href="#">View Details</a>{" "} */}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className=" bg-black card-body p-4">
                    <div className="d-flex flex-row mb-4 pb-2">
                      <div className="flex-fill">
                        <h5 className="bold">{buy?.bookname}</h5>
                        <br />
                        <h4 className="mb-3">
                          {" "}
                          $ {buy?.price}
                          <span className="small "> via (COD) </span>
                        </h4>
                        <p className="text-amber-400">
                          Tracking Status on:{" "}
                          <span className="text-white">{formatdate} Today</span>
                        </p>
                      </div>
                      <div>
                        <img
                          className=" w-[200px] h-[132px] rounded-2xl object-cover"
                          src={buy?.bookimage}
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" bg-sky-500 card-footer p-4">
                    <div className="d-flex justify-content-between">
                      <h5 className="fw-normal mb-0">
                        <a href="#!">Track</a>
                      </h5>
                      <div className="border-start h-100" />
                      <h5 className="fw-normal mb-0">
                        <a href="#!">Cancel</a>
                      </h5>
                      <div className="border-start h-100" />
                      <h5 className="fw-normal mb-0">
                        <a href="#!">Pre-pay</a>
                      </h5>
                      <div className="border-start h-100" />
                      <h5 className="fw-normal mb-0">
                        <a href="#!" className="text-muted">
                          <i className="fas fa-ellipsis-v" />
                        </a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {cartvalue.cart.map((p, index) => (
          <div key={p._id} className="  relative w-[710px] bg-gray-900">
            <div className=" fixed  transition-opacity " />
            <div className=" mt-8 ">
              <div className=" box-cart-1  relative left-[80px] flow bg-gray-900">
                <li className=" box-cart flex py-6 w-[700px]">
                  <div className=" box-car-img w-[200px] h-[132px] shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={p.items[0].bookimage}
                      alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                      className=" w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex flex-col text-left  font-medium text-gray-900">
                        <h3 className="text-sky-500">
                          <a className="uppercase" href="#">
                            {p.items[0].bookname}
                          </a>
                        </h3>

                        <p className="ml-4 	">${p.items[0].price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {p.items[0].authore}
                      </p>
                      <p>{p.items[0].offer}% off</p>
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm text-gray-500">
                          Qty:X{p.items[0].quantity}
                        </h4>
                        <button
                          onClick={(e) => {
                            decqnt(p, index);
                          }}
                          type="button"
                          className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2 fill-white"
                            viewBox="0 0 124 124"
                          >
                            <path
                              d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                              data-original="#000000"
                            />
                          </svg>
                        </button>
                        <span className="font-bold text-sm leading-[16px]">
                          {p.items[0].quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            incqnt(p, index);
                          }}
                          type="button"
                          className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2 fill-white"
                            viewBox="0 0 42 42"
                          >
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                              data-original="#000000"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className=" flex items-end justify-between text-sm">
                      <div className="cart-box-btn flex gap-2">
                        <button
                          onClick={() => {
                            handelremove(p, index);
                          }}
                          type="button"
                          className=" w-[150px] border font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-3 fill-current mr-3 inline-block"
                            viewBox="0 0 390 390"
                          >
                            <path
                              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                              data-original="#000000"
                            ></path>
                            <path
                              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          Remove
                        </button>
                        <button
                          onClick={() => {
                            handelbuy(p, index);
                          }}
                          type="button"
                          className="w-[150px] h-8 rounded bg-lime-400 font-medium  hover:text-indigo-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-3.5 fill-current mr-3 inline-block"
                            viewBox="0 0 128 128"
                          >
                            <path
                              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          View details
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                {/* More products... */}
              </div>
            </div>
          </div>
        ))}
        <br />
      </div>
    </>
  );
}

export default Cart;
