import React, { useState } from "react";
import RastaurantRegistrationSideBar from "../components/RastaurantRegistrationSideBar";
import RestaurantAddPage from "./RestaurantAddPage";
import { AddRestaurantContext } from "../context/AddRestaurantContext";

const AddNewRestaurant = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="bg-[#F4F6FB]  py-10  w-full ">
      <div className="flex gap-5 w-[80%] mx-auto">
        <AddRestaurantContext.Provider value={{ activeId, setActiveId }}>
          <RastaurantRegistrationSideBar
            setActiveId={setActiveId}
            activeId={activeId}
          />
          <RestaurantAddPage />
        </AddRestaurantContext.Provider>
      </div>
    </div>
  );
};

export default AddNewRestaurant;
