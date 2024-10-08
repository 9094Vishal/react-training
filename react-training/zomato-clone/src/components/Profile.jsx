import React, { useContext, useEffect, useState } from "react";
import userImg from "../assets/user.png";
import { Link } from "react-router-dom";
import Login from "./Login";
import OtpPopup from "./Otp";
import { AuthContext } from "../context/loginContext";
import { logOut } from "../helper/helper";

const Profile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [loginModel, setLoginModel] = useState(false);
  const [otpModel, setOtpModel] = useState(false);
  const [phone, setPhone] = useState(null);
  const [userOtp, setUserOtp] = useState("");
  const { user, isLogin, setLoginData } = useContext(AuthContext);

  const handleClick = (e) => {
    setOpenMenu(true);
  };
  useEffect(() => {
    // Clicking outside of an open dropdown menu closes it
    window.addEventListener("click", function (e) {
      if (!e.target.matches(".dropdown-toggle")) {
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          if (!menu.contains(e.target)) {
            setOpenMenu(false);
          }
        });
      }
    });

    // Mobile menu toggle

    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".navigation-menu");

    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    return () => {
      window.removeEventListener("click", function (e) {
        if (!e.target.matches(".dropdown-toggle")) {
          document.querySelectorAll(".dropdown-menu").forEach((menu) => {
            if (!menu.contains(e.target)) {
              setOpenMenu(false);
            }
          });
        }
      });
    };
  }, []);

  return (
    <div className="">
      <div className="  md:flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center justify-between md:w-auto w-full">
          {/* mobile menu icon */}
          <div className="md:hidden flex items-center">
            <button type="button" className="mobile-menu-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
            </button>
          </div>
        </div>
        {!isLogin && (
          <ul className="flex gap-3 items-center">
            <li className="cursor-pointer" onClick={() => setLoginModel(true)}>
              Log in / Signup
            </li>
          </ul>
        )}
        {isLogin && (
          <div className="hidden md:flex md:flex-row flex-col items-center  justify-start md:space-x-1 pb-3 md:pb-0 navigation-menu">
            {/* Dropdown menu */}
            <div className="relative">
              <button
                type="button"
                onClick={handleClick}
                className="dropdown-toggle py-2 px-3  flex items-center gap-2 rounded"
              >
                <span className="pointer-events-none select-none flex items-center gap-1">
                  <div className="relative h-12 w-12">
                    <img src={userImg} className="w-full h-full" />
                  </div>
                  Vishal
                </span>
                <svg
                  className="w-3 h-3 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <div
                className={`dropdown-menu absolute ${
                  openMenu ? "" : "hidden transition duration-[0.3s] ease-out"
                } bg-white text-black  rounded-lg py-2 w-48 z-20 shadow-md`}
              >
                <Link to="/" className="block px-6 py-2 hover:bg-slate-200">
                  Profile
                </Link>
                <Link href="/" className="block px-6 py-2 hover:bg-slate-200">
                  Notification
                </Link>
                <Link href="/" className="block px-6 py-2 hover:bg-slate-200">
                  Bookmarks
                </Link>
                <Link href="/" className="block px-6 py-2 hover:bg-slate-200">
                  Reviews
                </Link>
                <div
                  onClick={() => {
                    setLoginData({});
                    logOut();
                    setOpenMenu(false);
                  }}
                  className="block px-6 py-2 hover:bg-slate-200"
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {loginModel && (
        <Login
          otp={setUserOtp}
          setLoginModel={setLoginModel}
          setOtpModel={setOtpModel}
          phone={phone}
          setPhone={setPhone}
        />
      )}

      {otpModel && (
        <OtpPopup setOtpModel={setOtpModel} otp={userOtp} phone={phone} />
      )}
    </div>
  );
};

export default Profile;
