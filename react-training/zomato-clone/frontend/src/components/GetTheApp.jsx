import React from "react";
import phone from "../assets/phone.png";
import apple from "../assets/apple.webp";
import android from "../assets/indroid.webp";

const GetTheApp = () => {
  return (
    <div className="bg-[#FEFBF7 px-20 flex items-center flex-col md:flex-row justify-center">
      <div className="w-full md:w-2/5">
        <img src={phone} className="h-[300px] md:h-full mx-auto" />
      </div>
      <div className="h-3/5 flex flex-col gap-5">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl">
          Get the Zomato app
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl">
          Download app from
        </p>
        <div className="flex gap-3 flex-col sm:flex-row">
          <a href="#">
            <img src={apple} className="cursor-pointer w-40" />
          </a>
          <a href="#">
            <img src={android} className="cursor-pointer w-40" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetTheApp;
