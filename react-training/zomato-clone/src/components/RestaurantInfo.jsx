import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamondTurnRight } from "@fortawesome/free-solid-svg-icons";
import RestaurantTabBar from "./RestaurantTabBar";
import { getHotelData } from "../helper/helper";
import { HotelContext } from "../context/HotelContext";
import { Image } from "antd";

const RestaurantInfo = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const id = searchParams.get("hotelId");
  const food = searchParams.get("food");
  const [hotelData, setHotelData] = useState(null);
  console.log("hotelData: ", hotelData);
  useEffect(() => {
    setHotelData(getHotelData(id));
    return () => {};
  }, []);
  const address = (data) => {
    const { area, city, landmark, shop } = data;
    return (
      (shop ? `${shop},` : "") +
      (area ? `${area},` : "") +
      (landmark ? `${landmark},` : "") +
      (city ? `${city}` : "")
    );
  };

  return (
    <div className="mx-20 my-3">
      <div className="h-[350px] w-full">
        <Image
          className="object-cover   "
          width={"100%"}
          height={"350px"}
          src={hotelData?.documents?.restaurantImage}
        />
      </div>
      <div className="flex items-start justify-between mt-3">
        <div>
          <p>{(hotelData && hotelData.restaurantName) || ""}</p>
          <p>{hotelData && address(hotelData.restaurantAddressDetails)}</p>
        </div>
        <div>
          <span className="bg-green-400">
            3.0 <FontAwesomeIcon icon={faStar} style={{ color: "#ff330f" }} />
          </span>
        </div>
      </div>
      <span>Open now - 8am - 10pm</span>
      <div className="my-2">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=23.0592775043,72.5140487775"
          target="_blank"
        >
          <button className="border py-2 px-6 rounded">
            <FontAwesomeIcon
              icon={faDiamondTurnRight}
              className="text-btnColor"
            />
            {"    "}
            Direction
          </button>
        </a>
      </div>
      {hotelData && (
        <HotelContext.Provider value={{ hotelData }}>
          <RestaurantTabBar />
        </HotelContext.Provider>
      )}
    </div>
  );
};

export default RestaurantInfo;
