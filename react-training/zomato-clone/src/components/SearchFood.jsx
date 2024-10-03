import {
  faLocationDot,
  faMagnifyingGlass,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import Select from "react-select";

const SearchFood = () => {
  const options = [
    {
      value: "Sola",
      label: "Sola, ahmdabad",
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
    console.log("location", location);
    console.log("locationOption", locationOption);
  };
  return (
    <div className="flex bg-white text-black h-[3.4rem] gap-3 rounded-md p-2 items-center">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-btnColor h-5 w-5"
        />

        <ReactSelect
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
          onChange={setlocationOption}
          value={locationOption}
          options={options}
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
          options={food}
        />
      </div>
    </div>
  );
};

export default SearchFood;
