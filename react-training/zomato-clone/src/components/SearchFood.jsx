import {
  faLocationDot,
  faMagnifyingGlass,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import Select from "react-select";
import AsyncSelect from "react-select/async";

const SearchFood = () => {
  const options = [
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
  const food = [
    {
      value: "Sola",
      label: "Manchuriyan",
    },
  ];
  const [locationOption, setlocationOption] = useState(null);
  const [foodOption, setfoodOption] = useState(null);

  const handleSubmit = (val) => {
    setfoodOption(val);
    let location = "";
    locationOption?.value != ""
      ? (location = locationOption.value)
      : (location = "Ahmedabad");
  };
  const filterLocations = (inputValue) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const loadFoodItem = (location) => {};
  const handleOnchange = (e) => {
    setlocationOption(e);
    loadFoodItem(e.value);
  };
  const promiseLocation = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterLocations(inputValue));
      }, 1000);
    });

  return (
    <div className="flex bg-white text-black h-[3.4rem] gap-3 rounded-md p-2 items-center">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-btnColor h-5 w-5"
        />

        <AsyncSelect
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
          cacheOptions
          placeholder={"Search location.."}
          onChange={handleOnchange}
          value={locationOption}
          defaultOptions={options}
          loadOptions={promiseLocation}
        />
      </div>

      <span className=" text-3xl text-slate-300">|</span>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-slate-300 h-5 w-5"
        />

        <AsyncSelect
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: "none",
              outline: "none",
              width: "250px",
            }),
          }}
          inputId="food"
          cacheOptions
          name="food"
          placeholder={"Search food.."}
          onChange={handleSubmit}
          value={foodOption}
          options={food}
        />
      </div>
    </div>
  );
};

export default SearchFood;
