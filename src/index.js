import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import PrivateRoute from "./Layouts/PrivateRoute";
import Products from "./Pages/Products";
import ProductForm from "./Components/ProductForm";
import Home from "./Pages/Home";
import ItemPage from "./Pages/ItemPage";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import MessageDashboard from "./Pages/MessageDashboard";
import SearchCategory from "./Pages/SearchCategory";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "itemPage",
        element: <ItemPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "messageDashboard",
        element: <MessageDashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "search-category/:category",
        element: <SearchCategory />,
      },
      {
        path: "products",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: "add-product",
            element: <ProductForm />,
          },
        ],
      },
    ],
  },

  {
    path: "home",
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
