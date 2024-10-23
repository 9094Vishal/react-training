import { faClock, faFolder } from "@fortawesome/free-regular-svg-icons";
import {
  faBellConcierge,
  faCaretRight,
  faFileContract,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useState } from "react";

const getSideBarData = (activeId) => {
  let sideBarDeta = [
    {
      id: 1,
      title: "Restaurant information",
      subTitle: "Name, location and contact number",
      icon: (
        <FontAwesomeIcon
          icon={faBellConcierge}
          style={{ color: "#cfc22a" }}
          className="h-full w-full"
        />
      ),
      isActive: true,
    },
    {
      id: 2,
      title: "Menu",
      subTitle: "Add menu",
      icon: <FontAwesomeIcon icon={faHotel} />,
      isActive: false,
    },
    {
      id: 3,
      title: "Timings",
      subTitle: "Restayrant timing",
      icon: <FontAwesomeIcon icon={faClock} style={{ color: "#FFD43B" }} />,
      isActive: false,
    },
    {
      id: 4,
      title: "Restaurant documents",
      subTitle: "Ducuments",
      icon: <FontAwesomeIcon icon={faFolder} style={{ color: "#ccd63d" }} />,
      isActive: false,
    },
  ];
  return sideBarDeta.map((item) => {
    if (item.id === activeId) {
      return {
        ...item,
        isActive: true,
      };
    } else {
      return { ...item, isActive: false };
    }
  });
};
const RastaurantRegistrationSideBar = ({ activeId, setActiveId }) => {
  const [sideBarDeta, setSideBarData] = useState(getSideBarData(activeId));
  useEffect(() => {
    setSideBarData(getSideBarData(activeId));
    return () => {};
  }, [activeId]);
  const handStep = (id) => {
    setActiveId(id);
  };
  return (
    <div className=" bg-white rounded-2xl shadow w-[25%] h-fit sticky top-0">
      <h1 className="p-2">Complete your registration</h1>
      <hr />
      <ul className="py-2 ">
        {sideBarDeta.map(({ id, title, subTitle, icon, isActive }) => {
          return (
            <li
              className="pl-2  py-2 hover:bg-slate-200 flex items-center gap-3 relative cursor-pointer"
              key={id}
              onClick={() => handStep(id)}
            >
              <span className="absolute left-0 h-10 w-[3px] bg-blue-700 rounded-r"></span>
              <div className="relative flex flex-col items-center">
                <span
                  className={`h-10  w-10 p-2 rounded-full bg-[#F4F6FB] text-center ${
                    isActive ? "grayscale-0" : " grayscale"
                  } border-gray-500 border-2`}
                >
                  {icon}
                </span>
                {/* <div className=" my-[2px] h-full w-1 rounded bg-lavenderMist min-h-[20px] bg-gradient-to-b from-zBlue-200 to-transparent "></div> */}
              </div>
              <div>
                <p>{title}</p>
                <p>{subTitle}</p>
                {isActive && (
                  <p className={`text-sm text-blue-500`}>
                    Continue <FontAwesomeIcon icon={faCaretRight} />
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(RastaurantRegistrationSideBar);
