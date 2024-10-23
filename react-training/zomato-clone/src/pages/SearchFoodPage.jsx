import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getHotelsByFood } from "../helper/helper";

const SearchFoodPage = () => {
  const { city } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const food = searchParams.get("food");

  const [foodData, setFoodData] = useState([]);
  useEffect(() => {
    setFoodData(getHotelsByFood(food, city));
    return () => {};
  }, []);
  const handleClick = (id, foodId) => {
    const url = `/restaurant?location=${city}&food=${foodId}&hotelId=${id}`;
    navigate(url);
  };
  return (
    <div className="mx-20 my-2 ">
      <h1 className="text-2xl">
        {food} in {city}
      </h1>
      <div className="grid grid-cols-3 gap-3">
        {foodData.map(
          (
            { restaurantName, id, documents: { restaurantImage }, menuItem },
            index
          ) => {
            const foodCategory = menuItem?.find(
              (item) => item.title.toLowerCase() == food.toLowerCase()
            ).foodCategory;
            return (
              <div
                key={index}
                className=" hover:shadow-lg hover:bg-white text-center p-4 rounded-lg cursor-pointer"
                onClick={() => handleClick(id, foodCategory)}
              >
                <div className="w-full h-[250px]">
                  <img
                    className="w-full h-full object-cover"
                    src={restaurantImage}
                  />
                </div>
                <div className="flex items-center mt-2 justify-between gap-2">
                  <p>{restaurantName}</p>
                  <span className="bg-green-500 rounded-md px-1">
                    4.5
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#ff0000" }}
                    />
                  </span>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default SearchFoodPage;
