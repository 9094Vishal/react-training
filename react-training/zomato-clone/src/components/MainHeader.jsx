import React from "react";
import logo from "../assets/zomato.png";
import SearchFood from "./SearchFood";
import Profile from "./Profile";
import { Link } from "react-router-dom";
const MainHeader = () => {
  return (
    <nav className="flex items-center justify-between px-20 bg-white py-2 shadow">
      <Link to={"/"}>
        <img src={logo} />
      </Link>
      <SearchFood />
      <Profile />
    </nav>
  );
};

export default MainHeader;
