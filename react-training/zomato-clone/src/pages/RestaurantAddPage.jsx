import React, { memo, useContext } from "react";
import RestaurantInformation from "../components/RestaurantInformation";
import { AddRestaurantContext } from "../context/AddRestaurantContext";
import MenuAndTime from "../components/MenuAndTime";
import Documents from "../components/Documents";

const RestaurantAddPage = ({}) => {
  const { activeId } = useContext(AddRestaurantContext);
  console.log("activeId: ", activeId);
  let component;
  switch (activeId) {
    case 1:
      component = <RestaurantInformation />;
      break;
    case 2:
      component = <MenuAndTime />;
      break;

    case 3:
      component = <Documents />;
      break;
    default:
      component = <RestaurantInformation />;

      break;
  }
  return <>{component}</>;
};

export default memo(RestaurantAddPage);
