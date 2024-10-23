import React, { useContext } from "react";
import { Tabs } from "antd";
import HotelOverviewTab from "./HotelOverviewTab";
import HotelOrderTab from "./HotelOrderTab";
import { HotelContext } from "../context/HotelContext";
const onChange = (key) => {
  //   console.log(key);
};
const RestaurantTabBar = () => {
  const tabs = ["Order"];
  const tabData = [<HotelOrderTab />];
  return (
    <Tabs
      size={"large"}
      onChange={onChange}
      type="card"
      items={tabs.map((tab, i) => {
        return {
          label: `${tab} `,
          key: i,
          children: tabData[i],
        };
      })}
    />
  );
};
export default RestaurantTabBar;
