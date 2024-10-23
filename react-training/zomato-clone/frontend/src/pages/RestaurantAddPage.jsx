import React, { memo, useContext } from "react";
import RestaurantInformation from "../components/RestaurantInformation";
import { AddRestaurantContext } from "../context/AddRestaurantContext";
import MenuAndTime from "../components/MenuAndTime";
import Documents from "../components/Documents";
import RestaurantTiming from "../components/RestaurantTiming";

const RestaurantAddPage = ({}) => {
  const { activeId } = useContext(AddRestaurantContext);
  let component;
  switch (activeId) {
    case 1:
      component = <RestaurantInformation />;
      break;
    case 2:
      component = <MenuAndTime />;
      break;
    case 3:
      component = <RestaurantTiming />;
      break;
    case 4:
      component = <Documents />;
      break;
    default:
      component = <RestaurantInformation />;

      break;
  }
  return <>{component}</>;
};

export default memo(RestaurantAddPage);
