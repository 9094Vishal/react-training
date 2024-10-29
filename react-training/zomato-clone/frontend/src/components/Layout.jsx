import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import MainHeader from "./MainHeader";
import { AuthContext } from "../context/loginContext";
import CartDropDown from "./CartDropDown";
import { CartContext } from "../context/CartContext";

const Layout = () => {
  const { user } = useContext(AuthContext);
  const route = useLocation();
  let showNav = true;
  const { cartData, itemInCart } = useContext(CartContext);
  console.log("cart: ", cartData);
  const paths = ["/", "/partner-with-us", "/partner-with-us/new"];
  useEffect(() => {
    itemInCart();
    // all list of paths where you don't want nav bar
    if (paths.includes(route.pathname)) {
      showNav = false;
    }
    return () => {};
  }, [route]);

  return (
    <>
      {showNav && <MainHeader />}
      <Outlet />
      {cartData.length != 0 && <CartDropDown />}
      <Footer />
    </>
  );
};

export default Layout;
