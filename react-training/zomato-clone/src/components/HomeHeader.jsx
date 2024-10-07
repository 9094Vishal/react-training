import React from "react";
import heroImg from "../assets/zomate-hero.png";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchFood from "./SearchFood";
import Profile from "./Profile";
import { Link } from "react-router-dom";
const HomeHeader = () => {
  return (
    <div
      className={`relative h-[486px] mb-16 text-white`}
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex justify-between items-center  px-20 py-2">
        <a href="https://www.zomato.com/mobile" className="cursor-pointer">
          <FontAwesomeIcon icon={faThumbsUp} />
          &nbsp; Get the App
        </a>
        <ul className="flex gap-3 items-center">
          <Link className="cursor-pointer" to="/partner-with-us">
            Add Restaurant
          </Link>
          <li className="">
            <Profile />
          </li>
        </ul>
      </div>
      <div className="flex h-full items-center justify-center gap-5 flex-col">
        <h1 className="text-5xl font-semibold">Zomato </h1>
        <p className="text-3xl">Discover the best food & drinks in Ahmedabad</p>
        <SearchFood />
      </div>
    </div>
  );
};

export default HomeHeader;
