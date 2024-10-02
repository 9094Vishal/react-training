import {
  faCircleExclamation,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ConfirmationPopUp = ({ handelClose, handelDelete }) => {
  return (
    <div className="fixed z-10 top-0 left-0 bg-[rgb(0,0,0,0.2)] h-full w-full flex items-center justify-center">
      <div className="p-2 bg-white w-1/3 h-1/4 rounded-lg">
        <div className=" px-2  py-2 flex items-center gap-2 justify-between">
          <div className="flex items-center text-[#74C0FC] gap-2">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              style={{ color: "#74C0FC" }}
              className="h-5 w-5 "
            />
            Delete data?
          </div>
          <FontAwesomeIcon
            className="h-5 w-5 cursor-pointer"
            onClick={handelClose}
            icon={faXmark}
          />
        </div>
        <hr />
        <div className="text-center mt-5">
          Are you sure you want to delete this student data?
          <div className="flex gap-2 items-center justify-center mt-5">
            <button className="bg-slate-300  px-5 py-2" onClick={handelClose}>
              Cancel
            </button>
            <button className="bg-red-500 px-5 py-2" onClick={handelDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
