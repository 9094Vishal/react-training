import React, { Children } from "react";
import { Link } from "react-router-dom";

const ProfileBottomSideBar = ({ activerTab, setActiverTab }) => {
  const activityTabs = [
    { value: "review", label: "Review" },
    { value: "address", label: "Address" },
  ];

  const sideBarData = [
    {
      title: "ACTIVITY",
      children: activityTabs.map((tabs) => (
        <li
          key={tabs.label}
          id="review"
          className={`px-3 border-l-4 border-btnColor hover:text-btnColor  my-2 py-1 ${
            tabs.value == activerTab &&
            "bg-gradient-to-l from-pink-100 to-transparent"
          } `}
          onClick={() => setActiverTab(tabs.value)}
        >
          {tabs.label}
        </li>
      )),
    },
  ];
  return (
    <div className="w-1/5">
      {sideBarData.map(({ title, children }, id) => {
        return (
          <ul key={id}>
            <li className="px-3">{title}</li>
            {children}
          </ul>
        );
      })}
    </div>
  );
};

export default ProfileBottomSideBar;
