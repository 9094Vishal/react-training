import {
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getLocations, searchFoodByLocation } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";
import { SearchContext } from "../context/SearchContext";

const SearchFood = () => {
  // const [locationOption, setLocationOption] = useState({
  //   label: "Ahmedabad",
  //   value: ",,Ahmedabad",
  // });
  // const [foodOption, setFoodOption] = useState(null);
  // const [foodOptionList, setFoodOptionList] = useState([]);
  // const [hotels, setHotels] = useState([]);
  const {
    locationOption,
    setLocationOption,
    foodOption,
    setFoodOption,
    setFoodOptionList,
    foodOptionList,
    hotels,
    setHotels,
  } = useContext(SearchContext);

  const getHotels = async () => {
    try {
      const response = await api.get("/restaurant");
      if (response && response.data) {
        setHotels(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching hotels: ", error);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  const navigation = useNavigate();

  const handleSubmit = (val) => {
    setFoodOption(val);
    const url = `/${locationOption.label}?food=${val.title}`;
    navigation(url);
  };

  const handleOnchange = async (e) => {
    setLocationOption(e);

    // Ensure food options are set correctly
    const options = await searchFoodByLocation(e.value, hotels);
    setFoodOptionList(options);
    setFoodOption(null);
  };
  console.log(foodOptionList);
  return (
    <div className="flex bg-white text-black h-[3.4rem] gap-3 rounded-md p-2 items-center shadow-md">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-btnColor h-5 w-5"
        />
        <Select
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: "none",
              outline: "none",
              width: "250px",
            }),
          }}
          inputId="location"
          name="location"
          placeholder={"Search location.."}
          onChange={handleOnchange}
          value={locationOption}
          options={getLocations(hotels)}
        />
      </div>

      <span className="text-3xl text-slate-300">|</span>

      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-slate-300 h-5 w-5"
        />
        <Select
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: "none",
              outline: "none",
              width: "250px",
            }),
          }}
          inputId="food"
          name="food"
          isDisabled={foodOptionList.length == 0}
          placeholder={"Search food.."}
          onChange={handleSubmit}
          value={foodOption}
          options={foodOptionList}
          getOptionLabel={(x) => x.title}
          getOptionValue={(x) => x.title}
        />
      </div>
    </div>
  );
};

export default SearchFood;
