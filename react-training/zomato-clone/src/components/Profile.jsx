import React, { useEffect, useState } from "react";
import user from "../assets/user.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = (e) => {
    setOpenMenu(true);
  };
  useEffect(() => {
    // Select all dropdown toggle buttons
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        // Find the next sibling element which is the dropdown menu
        const dropdownMenu = toggle.nextElementSibling;

        // Toggle the 'hidden' class to show or hide the dropdown menu
        if (dropdownMenu.classList.contains("hidden")) {
          // Hide any open dropdown menus before showing the new one
          document.querySelectorAll(".dropdown-menu").forEach((menu) => {
            menu.classList.add("hidden");
          });

          dropdownMenu.classList.remove("hidden");
        } else {
          dropdownMenu.classList.add("hidden");
        }
      });
    });

    // Clicking outside of an open dropdown menu closes it
    window.addEventListener("click", function (e) {
      if (!e.target.matches(".dropdown-toggle")) {
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          if (!menu.contains(e.target)) {
            menu.classList.add("hidden");
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
    return () => {};
  }, []);
  document.addEventListener("DOMContentLoaded", () => {});

  return (
    <div className="">
      <div className="container mx-auto  md:flex items-center gap-6">
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
        <div className="hidden md:flex md:flex-row flex-col items-center justify-start md:space-x-1 pb-3 md:pb-0 navigation-menu">
          {/* Dropdown menu */}
          <div className="relative">
            <button
              type="button"
              onClick={handleClick}
              className="dropdown-toggle py-2 px-3  flex items-center gap-2 rounded"
            >
              <span className="pointer-events-none select-none flex items-center gap-1">
                <div className="relative h-12 w-12">
                  <img src={user} className="w-full h-full" />
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
            <div className="dropdown-menu absolute hidden bg-white text-black rounded-lg p-2 w-48">
              <Link to="/" className="block px-6 py-2 hover:bg-slate-200">
                Web Design
              </Link>
              <Link href="/" className="block px-6 py-2 hover:bg-slate-200">
                Web Development
              </Link>
              <Link href="/" className="block px-6 py-2 hover:bg-slate-200">
                SEO
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
