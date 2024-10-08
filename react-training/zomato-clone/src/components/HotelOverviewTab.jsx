import React, { useContext } from "react";
import { HotelContext } from "../context/HotelContext";

const HotelOverviewTab = () => {
  const { hotelData } = useContext(HotelContext);
  console.log("hotelData: ", hotelData);
  return <div></div>;
};

export default HotelOverviewTab;
