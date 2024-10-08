import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import MainHeader from "./MainHeader";

const Layout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
