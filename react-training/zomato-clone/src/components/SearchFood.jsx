import {
  faLocationDot,
  faMagnifyingGlass,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getLocations, searchFoodByLocation } from "../helper/helper";
import { useLocation, useNavigate } from "react-router-dom";
let locationOptions = [
  {
    value: "Sola",
    label: "Sola, ahmdabad",
  },
  {
    value: "Sola bhagvat",
    label: "Sola bhagvat, ahmdabad",
  },
  {
    value: "Sola mandir",
    label: "Sola mandir, ahmdabad",
  },
  {
    value: "Science sity Sola",
    label: "Science sity, Sola, ahmdabad",
  },
  {
    value: "Science sity road",
    label: "Science sity road, Sola, ahmdabad",
  },
];

let food = [
  {
    value: "Sola",
    label: "Manchuriyan",
  },
];
const SearchFood = () => {
  const [locationOption, setlocationOption] = useState({
    label: "Ahmedabad",
    value: ",,Ahmedabad",
  });
  const [foodOption, setfoodOption] = useState(null);
  const [foodOptionList, setfoodOptionList] = useState(
    searchFoodByLocation(",,Ahmedabad")
  );
  const navigation = useNavigate();
  const handleSubmit = (val) => {
    setfoodOption(val);
    const url = `/${locationOption.label}?food=${val.title}`;

    navigation(url);
  };

  const handleOnchange = (e) => {
    setlocationOption(e);
    setfoodOptionList(searchFoodByLocation(e.value));

    setfoodOption(null);
  };

  return (
    <div className="flex bg-white text-black h-[3.4rem] gap-3 rounded-md p-2 items-center shadow-md">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-btnColor h-5 w-5"
        />

        <Select
          styles={{
            control: (baseStyles, state) => ({
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
          options={getLocations()}
        />
      </div>

      <span className=" text-3xl text-slate-300">|</span>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-slate-300 h-5 w-5"
        />

        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: "none",
              outline: "none",
              width: "250px",
            }),
          }}
          inputId="food"
          name="food"
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
