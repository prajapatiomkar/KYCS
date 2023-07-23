import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <div className="px-5 sm:px-[50px]">
      <Header />
      <ToastContainer
       position="bottom-right"
       autoClose={3000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
      />
      <Outlet />
    </div>
  );
}
