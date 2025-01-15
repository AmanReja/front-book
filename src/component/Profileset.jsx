import { useState, React, useEffect } from "react";
import camara from "../assets/icons/camara.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userpng from "../assets/icons/user.png";
import Swal from "sweetalert2";
import "./Profileset.css";
import { useNavigate } from "react-router-dom";

const Profileset = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  // const [show1, setShow1] = useState(false);
  const [fileload, setFileload] = useState(false);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState([]);

  const handelshow = () => {
    setShow((prev) => !prev);
  };
  // const handelshow1 = () => {
  //   setShow1((prev) => !prev);
  // };

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
    getoneuser();
  }, []);

  const handelimgupload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileload(true);
      setLoad(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "l838hc61"); // Replace 'your_upload_preset' with your actual upload preset

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/djpw8rdeu/image/upload",
          formData
        );

        console.log("response: ", res.data);
        const x = res.data.secure_url;
        const y = res.data.public_id;

        console.log(x, y);

        // setUserimg(x);
        // setUserimgurl(y);
        // user.image = x;
        // user.imageid = y;

        setUser({ ...user, image: x, imageid: y }), setLoad(false);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };
  const updateuserprofile = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    };
    const response = await fetch(
      `http://localhost:3000/user/updateUser/${user._id}`,
      requestOptions
    );
    const data = await response.json();
    console.log("daat", data);

    if (response.ok) {
      Swal.fire({
        title: "Succesfully Updated",

        icon: "success"
      });
      window.location.reload();
    } else {
      toast.error("bad request", { theme: "dark" });
    }
  };
  const deleteuser = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.clear("user");
        window.location.reload();
        const requestOptions = {
          method: "DELETE",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(user)
        };
        const response = await fetch(
          `http://localhost:3000/user/deleteUser/${user._id}`,
          requestOptions
        );
        const data = await response.json();
        console.log("dele", data);

        if (response.ok) {
          Swal.fire({
            title: "Good job!",
            text: "You have succesfully deleted your account",
            icon: "success"
          });
        } else {
          toast.error("Bad request", { theme: "dark" });
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      {localStorage.getItem("user") == null ? (
        <div className="w-full relative flex items-center justify-center h-[300px]  bg-gray-900">
          <h1 className="text-center text-3xl text-blue-500">
            User not Found kindly login
          </h1>
        </div>
      ) : (
        <div className="p-16">
          <div className="box-contenar p-8 bg-white shadow mt-24">
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {" "}
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                {" "}
                <div>
                  {" "}
                  <p className="font-bold text-gray-700 text-xl">22</p>{" "}
                  <p className="text-gray-400">Totalorder</p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <p className="font-bold text-gray-700 text-xl">10</p>{" "}
                  <p className="text-gray-400">Returns</p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="relative">
                {" "}
                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  <input
                    onChange={(e) => {
                      handelimgupload(e);
                    }}
                    className="w-full h-[50%] hidden"
                    type="file"
                    name=""
                    id="profile"
                  />

                  {load ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <img
                      className={
                        user.image == null || user.image == ""
                          ? "hidden"
                          : "w-full h-full object-cover rounded-full"
                      }
                      src={user.image}
                      alt=""
                    />
                  )}

                  <label htmlFor="profile">
                    <img
                      className="w-[80px] h-[80px] absolute rounded right-[55px] top-[140px]"
                      src={camara}
                      alt=""
                    />
                  </label>
                  {fileload ? (
                    <input
                      placeholder=" Upload Image"
                      onClick={(e) => {
                        updateuserprofile(e), setFileload(false);
                      }}
                      className="input-box w-[120px] z-40 cursor-pointe bg-blue-400  text-white absolute h-[40px] rounded top-[120%] "
                      type="submit"
                    />
                  ) : (
                    ""
                  )}
                </div>{" "}
              </div>{" "}
              <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                <button
                  onClick={(e) => {
                    deleteuser(e);
                  }}
                  className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  {" "}
                  Delete
                </button>{" "}
                <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  {" "}
                  Message
                </button>{" "}
              </div>
            </div>{" "}
            <div className="mt-20 text-center items-center flex flex-col ">
              {" "}
              <div className=" text-center relative items-center gap-3">
                <h1 className="text-4xl font-medium text-gray-700 text-center">
                  {user.userid}
                </h1>{" "}
              </div>{" "}
              <p className="font-light text-gray-600 mt-3">{user.contact}</p>{" "}
              <button className=" invisible text-indigo-500 py-2 px-4  font-medium mt-4">
                {" "}
                Show more
              </button>
              <button
                onClick={handelshow}
                className="w-[300px] relative  h-[40px] rounded-[5px] bg-red-500 hover:bg-sky-400"
              >
                {" "}
                Edit Username and Contact
              </button>
              <form
                onSubmit={(e) => {
                  updateuserprofile(e);
                }}
                className={
                  show
                    ? "form-box absolute bg-gray-900 items-center justify-center rounded-[5px] h-[250px] bottom-[20%] right-20 shadow-lg w-[500px] gap-[12px] inline-flex flex-col"
                    : "hidden"
                }
                action=""
              >
                <input
                  onChange={(e) => {
                    setUser({ ...user, userid: e.target.value });
                  }}
                  className="outline-none p-[15px]  font-thin bg-transparent  placeholder-white  rounded text-white w-[300px] border-lime-400 border-[3px]"
                  type="text"
                  placeholder="Type your user name "
                />
                <input
                  onChange={(e) => {
                    setUser({ ...user, contact: e.target.value });
                  }}
                  className="outline-none  p-[15px] font-thin bg-transparent placeholder-white rounded text-white w-[300px]  border-pink-600 border-[3px]"
                  type="text"
                  placeholder="Type your contact "
                />
                <button
                  type="submit"
                  onClick={() => {
                    setShow(false);
                  }}
                  className="bg-sky-600 rounded-[5px] w-[150px] p-[10px] relative left-[72px]"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profileset;
