import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getHotelsByFood } from "../helper/helper";
import api from "../api/Axios";

const SearchFoodPage = () => {
  const { city } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const food = searchParams.get("food");

  const [foodData, setFoodData] = useState([]);
  const getData = async () => {
    const address = city.toString().split(",");
    let url = "";
    if (address.length == 1) {
      url = `/restaurant/hotels?&address=${address[0]}&foodType=${food}`;
    } else {
      url = `/restaurant/hotels?area=${address[0]}&city=${address[1]}&address=${address[2]}&foodType=${food}`;
    }

    const data = await api.get(url);
    console.log("data: ", data);
    if (data && data.data) {
      setFoodData(data.data);
    }
  };
  useEffect(() => {
    getData();
    // setFoodData(getHotelsByFood(food, city));
    return () => {};
  }, []);
  console.log(foodData);
  const handleClick = (id) => {
    const url = `/restaurant?food=${food}&hotelId=${id}`;
    navigate(url);
  };
  return (
    <div className="mx-20 my-2 ">
      <h1 className="text-2xl">
        {food} in {city}
      </h1>
      <div className="grid grid-cols-3 gap-3">
        {foodData.map(({ restaurantName, _id, image, menuItem }, index) => {
          const foodCategory = menuItem?.find(
            (item) => item.title.toLowerCase() == food.toLowerCase()
          ).foodCategory;
          return (
            <div
              key={index}
              className=" hover:shadow-lg hover:bg-white text-center p-4 rounded-lg cursor-pointer"
              onClick={() => handleClick(_id)}
            >
              <div className="w-full h-[250px]">
                <img className="w-full h-full object-cover" src={image} />
              </div>
              <div className="flex items-center mt-2 justify-between gap-2">
                <p>{restaurantName}</p>
                <span className="bg-green-500 rounded-md px-1">
                  4.5
                  <FontAwesomeIcon icon={faStar} style={{ color: "#ff0000" }} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchFoodPage;
