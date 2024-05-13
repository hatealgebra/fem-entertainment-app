"use client";

import React from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastComponent = () => {
  return (
    <ToastContainer position="top-center" theme="dark" transition={Bounce} />
  );
};

export default ToastComponent;
