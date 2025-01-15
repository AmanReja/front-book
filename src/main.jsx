import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Products from "./component/Products.jsx";
import Home from "./component/Home.jsx";
import Login from "./component/Login";
import Mnorder from "./component/Mnorder.jsx";
import Editproducts from "./component/Editproducts.jsx";
import Signinadmin from "./component/Signinadmin.jsx";
import Loginadmin from "./component/Loginadmin.jsx";
import Cart from "./component/Cart.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Register from "./component/Register.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/order" element={<Mnorder />} />
      <Route path="/edit" element={<Editproducts />} />
      {/* <Route path="/adminsignin" element={<Signinadmin />} /> */}
      <Route path="/adminlogin" element={<Loginadmin />} />
      <Route path="/Cart" element={<Cart />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
