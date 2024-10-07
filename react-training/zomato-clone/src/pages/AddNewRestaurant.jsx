import React, { useState } from "react";
import RastaurantRegistrationSideBar from "../components/RastaurantRegistrationSideBar";
import RestaurantAddPage from "./RestaurantAddPage";
import { AddRestaurantContext } from "../context/AddRestaurantContext";

const AddNewRestaurant = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="bg-[#F4F6FB] flex  py-10 mx-auto w-full gap-5">
      <AddRestaurantContext.Provider value={{ activeId, setActiveId }}>
        <RastaurantRegistrationSideBar
          setActiveId={setActiveId}
          activeId={activeId}
        />
        <RestaurantAddPage />
      </AddRestaurantContext.Provider>
    </div>
  );
};

export default AddNewRestaurant;
