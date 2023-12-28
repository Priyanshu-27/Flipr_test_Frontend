// main.jsx

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import Loader from "./Loader.jsx";
import "tailwindcss/tailwind.css";

const Main = () => {
  useEffect(() => {
    // Apply overflow-x-hidden to the body element
    document.body.classList.add("overflow-x-hidden");

    return () => {
      // Remove overflow-x-hidden when the component is unmounted
      document.body.classList.remove("overflow-x-hidden");
    };
  }, []);

  return (
    <React.StrictMode>
      <Loader />
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
