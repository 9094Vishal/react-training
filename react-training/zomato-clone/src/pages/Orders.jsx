import React from "react";
import RestaurantInfoHotelInfo from "../components/RestaurantInfoHotelInfo";
import { Card, Divider } from "antd";
import OrderLineItem from "./OrderLineItem";

const Orders = () => {
  return (
    <div className="mx-20 my-3">
      <h1>Your orders</h1>
      <Card className="my-3 !p-2">
        <RestaurantInfoHotelInfo />
        <Divider />
        <OrderLineItem />
      </Card>
    </div>
  );
};

export default Orders;
