import React from "react";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

const Base = ({ className = "", userEmail = "", children }) => {
  return (
    <div className={className}>
      <Navbar userEmail={userEmail} />
      <ToastContainer />
      <div>{children}</div>
    </div>
  );
};

export default Base;
