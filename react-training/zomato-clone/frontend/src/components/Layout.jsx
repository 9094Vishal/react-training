import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import MainHeader from "./MainHeader";
import { AuthContext } from "../context/loginContext";
import CartDropDown from "./CartDropDown";

const Layout = () => {
  const { user } = useContext(AuthContext);
  const route = useLocation();
  let showNav = true;

  // all list of paths where you don't want nav bar
  const paths = ["/", "/partner-with-us", "/partner-with-us/new"];
  if (paths.includes(route.pathname)) {
    showNav = false;
  }
  return (
    <>
      {showNav && <MainHeader />}
      <Outlet />
      {user.cart && user.cart.length != 0 && <CartDropDown />}
      <Footer />
    </>
  );
};

export default Layout;
