import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

import { getCategories } from "../../features/categories/categoriesSlice";
import { getProducts } from "../../features/products/productsSlice";

import UserForm from "../User/UserForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  const { theme } = useSelector(({ layout }) => layout);

  return (
    <div className={theme === "light" ? "light-mode" : "dark-mode"}>
      <div className="app">
        <Header />
        <UserForm />
        <div className="container">
          <Sidebar />
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
