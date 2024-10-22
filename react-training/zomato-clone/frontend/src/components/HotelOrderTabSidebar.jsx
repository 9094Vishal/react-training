import React from "react";

const HotelOrderTabSidebar = () => {
  const tabs = ["panjabi", "Gujarati", "chiness"];
  return (
    <ul>
      {tabs.map((item, index) => {
        return (
          <li key={index} className="hover:bg-gray-200 cursor-pointer text-xl">
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default HotelOrderTabSidebar;
