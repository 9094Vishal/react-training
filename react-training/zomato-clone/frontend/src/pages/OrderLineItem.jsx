import React from "react";
import { vegLogo } from "../assets/svg/Icons";

const OrderLineItem = () => {
  return (
    <ul>
      <li className="flex items-center gap-2">
        {vegLogo({ height: "15px" })} 2X manchuriryyan
      </li>
    </ul>
  );
};

export default OrderLineItem;
