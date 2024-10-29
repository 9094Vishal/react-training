import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "antd";
import HotelOverviewTab from "./HotelOverviewTab";
import HotelOrderTab from "./HotelOrderTab";
import { HotelContext } from "../context/HotelContext";
import { AuthContext } from "../context/loginContext";
import MenuAndTime from "./MenuAndTime";
import api from "../api/Axios";
const onChange = (key) => {
  //   console.log(key);
};
const RestaurantTabBar = ({ id }) => {
  const [foods, setFoods] = useState([]);

  const loadFoodData = async () => {
    const data = await api.get(`/restaurant/foods/${id}`);
    if (data) {
      console.log("data: ", data);
      setFoods(data.data.data);
    }
  };
  useEffect(() => {
    loadFoodData();
  }, []);

  const tabs = ["Order"];
  const { user } = useContext(AuthContext);
  const tabData = [<HotelOrderTab foods={foods} setFoods={setFoods} />];

  if (id == user.restaurantId) {
    tabs.push("View menu");
    tabData.push(
      <HotelOrderTab isOwner={true} foods={foods} setFoods={setFoods} />
    );
  }
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
