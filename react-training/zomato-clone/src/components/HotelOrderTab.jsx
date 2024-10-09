import React, { useContext, useEffect, useState } from "react";
import { HotelContext } from "../context/HotelContext";
import { Flex, Image, Rate } from "antd";
import HotelOrderTabSidebar from "./HotelOrderTabSidebar";
import { getFoodListData } from "../helper/helper";
import { CartContext } from "../context/CartContext";

const HotelOrderTab = () => {
  const {
    cartData,
    addToCart,
    editCart,
    deleteCart,
    itemInCart,
    getTotalofCart,
  } = useContext(CartContext);
  const { hotelData } = useContext(HotelContext);

  const [foods, setFoods] = useState(null);
  useEffect(() => {
    setFoods(getFoodListData(hotelData));
    return () => {};
  }, []);

  return (
    <div className="flex gap-3">
      {/* <div className="w-1/4">
        <HotelOrderTabSidebar />
      </div> */}
      <div className="w-full">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-2xl font-medium">Order Online</p>
            <p>Live track your order | 13 min</p>
          </div>
          <div>{/* search */}</div>
        </div>
        <hr className="my-3" />
        {foods &&
          foods.map(({ category, menu }) => {
            return (
              <div key={category}>
                <p className="text-xl font-semibold">{category}</p>
                {menu.map(({ description, image, title, price, id }) => {
                  return (
                    <Flex gap={"10px"} key={id}>
                      <Image height={"130px"} src={image} />
                      <Flex
                        justify="space-between"
                        align="center"
                        className="flex-1"
                      >
                        <div>
                          <p className="text-xl font-medium">{title}</p>
                          <span className="text-white bg-[#F2A266] rounded px-1 my-3">
                            BESTSELLER
                          </span>
                          <br />
                          <Rate allowHalf defaultValue={2.8} disabled />
                          <p className="my-3">{price}</p>
                        </div>
                        <div>
                          <button
                            className="bg-btnColor py-2 px-6 rounded-md text-white hover:opacity-70"
                            onClick={() => addToCart(hotelData.id, id)}
                          >
                            Add to cart
                          </button>
                        </div>
                      </Flex>
                    </Flex>
                  );
                })}
                <hr className="my-3" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HotelOrderTab;
