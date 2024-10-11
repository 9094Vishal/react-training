import React from "react";
import noData from "../assets/nodata.png";

const Nodata = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
      <div className="text-center  h-[500px] w-full">
        <img src={noData} alt="" className="mx-auto h-[150px]" />
        <p className="mt-3">Nothing here yet</p>
      </div>
    </>
  );
};

export default Nodata;
