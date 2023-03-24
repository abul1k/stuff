import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";

import "react-toastify/dist/ReactToastify.css";

// toast
import { ToastContainer } from "react-toastify";

import { store } from "./features/store";

import App from "./components/App/App";

createRoot(document.getElementById("root")).render(
  <Suspense fallback="Loading...">
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer autoClose={2000} position="top-center" />
      </BrowserRouter>
    </Provider>
  </Suspense>
);
