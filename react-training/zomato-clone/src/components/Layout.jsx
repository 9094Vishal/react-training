import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import MainHeader from "./MainHeader";
import { AuthContext } from "../context/loginContext";
import CartDropDown from "./CartDropDown";

const Layout = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <MainHeader />
      <Outlet />
      {user.cart.length != 0 && <CartDropDown />}
      <Footer />
    </>
  );
};

export default Layout;
