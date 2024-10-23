import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import MainHeader from "./MainHeader";
import { AuthContext } from "../context/loginContext";
import CartDropDown from "./CartDropDown";

const Layout = () => {
  const { user } = useContext(AuthContext);
  const route = useLocation();
  console.log("route: ");
  return (
    <>
      {route.pathname != "/" && <MainHeader />}
      <Outlet />
      {user.cart && user.cart.length != 0 && <CartDropDown />}
      <Footer />
    </>
  );
};

export default Layout;
