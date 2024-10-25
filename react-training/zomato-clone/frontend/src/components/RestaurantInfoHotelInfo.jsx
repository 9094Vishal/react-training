import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { address } from "../helper/helper";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const RestaurantInfoHotelInfo = ({ hotelData }) => {
  console.log("hotelData: ", hotelData);
  const navigate = useNavigate();
  return (
    <div className="flex item-start justfy-between mt-3 w-full">
      <div
        className="flex-1 cursor-pointer"
        // onClick={() => {
        //   navigate(`/restaurant?hotelId=${hotelData?._id}`);
        // }}
      >
        <p>{(hotelData && hotelData.restaurantName) || "N/a"}</p>

        <p className="text-sm text-gray-400">
          {(hotelData && address(hotelData.restaurantAddressDetails)) ||
            "Patan"}
        </p>
      </div>
      <div>
        <span className="bg-green-500 p-1 rounded-md">
          3.0 <FontAwesomeIcon icon={faStar} style={{ color: "#ff330f" }} />
        </span>
      </div>
    </div>
  );
};

export default RestaurantInfoHotelInfo;
