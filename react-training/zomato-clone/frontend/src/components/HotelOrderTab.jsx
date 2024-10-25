import React, { useContext, useEffect, useState } from "react";
import { HotelContext } from "../context/HotelContext";
import { Drawer, Flex, Image, Rate } from "antd";
import HotelOrderTabSidebar from "./HotelOrderTabSidebar";
import { getFoodListData } from "../helper/helper";
import { CartContext } from "../context/CartContext";
import Nodata from "./Nodata";
import MenuAndTime from "./MenuAndTime";

const HotelOrderTab = ({ isOwner = false, foods, setFoods }) => {
  const {
    cartData,
    addToCart,
    editCart,
    deleteCart,
    itemInCart,
    getTotalofCart,
  } = useContext(CartContext);
  const { hotelData } = useContext(HotelContext);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  useEffect(() => {
    // setFoods(getFoodListData(hotelData));
    return () => {
      // setFoods([]);
    };
  }, [hotelData]);
  console.log("food: ", foods);
  return (
    <div className="flex gap-3">
      {/* <div className="w-1/4">
        <HotelOrderTabSidebar />
      </div> */}
      <div className="w-full">
        <div className="flex justify-between items-start">
          {!isOwner ? (
            <div>
              <p className="text-2xl font-medium">Order Online</p>
              <p>Live track your order | 13 min</p>
            </div>
          ) : (
            <button
              className="bg-btnColor text-white rounded-md py-2 w-36 hover:opacity-70 mt-2"
              onClick={() => setIsMenuDrawerOpen(true)}
            >
              Add menu item
            </button>
          )}

          <div>{/* search */}</div>
        </div>
        <hr className="my-3" />
        {foods.length > 0 ? (
          foods.map(({ category, menu }, id) => {
            return (
              <div key={id}>
                <p className="text-xl font-semibold">{category}</p>
                {menu.map(({ description, image, title, price, id }, index) => {
                  return (
                    <Flex gap={"10px"} className="my-3" key={index}>
                      <Image
                        height={"130px"}
                        width={"170px"}
                        className="object-contain"
                        src={image}
                      />
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
                          <p className="my-3">₹{price}</p>
                        </div>
                        <div>
                          {!isOwner ? (
                            <button
                              className="bg-btnColor py-2 px-6 rounded-md text-white hover:opacity-70"
                              onClick={() => addToCart(hotelData.id, id)}
                            >
                              Add to cart
                            </button>
                          ) : (
                            <div>
                              <button className="bg-btnColor py-2 px-6 rounded-md text-white hover:opacity-70">
                                Edit
                              </button>{" "}
                              <button className="hover:bg-btnColor py-2 px-6 rounded-md text-btnColor border border-btnColor hover:text-white">
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </Flex>
                    </Flex>
                  );
                })}
                <hr className="my-3" />
              </div>
            );
          })
        ) : (
          <div className="mx-20 my-3">
            <Nodata title="" />
          </div>
        )}
      </div>
      {isMenuDrawerOpen && (
        <Drawer
          title="Menu item"
          width={520}
          closable={true}
          onClose={() => setIsMenuDrawerOpen(false)}
          open={isMenuDrawerOpen}
        >
          <MenuAndTime
            setIsMenuDrawerOpen={setIsMenuDrawerOpen}
            id={hotelData._id}
          />
        </Drawer>
      )}
    </div>
  );
};

export default HotelOrderTab;
