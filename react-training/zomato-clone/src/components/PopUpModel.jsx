import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PopUpModel = ({ setModel, redirect = null, msg, title, type = null }) => {
  const navigation = useNavigate();
  useEffect(() => {
    let time;
    if (redirect)
      time = setTimeout(() => {
        navigation(redirect);
      }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 bg-[rgb(0,0,0,.5)] h-screen w-full flex items-center justify-center">
      <div className="bg-white p-4 shadow text-center">
        <div className="flex items-center justify-between">
          <span>{title}</span>
          <FontAwesomeIcon
            icon={faXmark}
            className="cursor-pointer"
            onClick={() => {
              setModel(false);
            }}
          />
        </div>
        <hr className="my-3" />
        <div className="h-[100px] w-full mx-auto ">
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ height: "100%", width: "100%", color: "#33c016" }}
          />
        </div>
        <hr className="my-3" />
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default PopUpModel;
