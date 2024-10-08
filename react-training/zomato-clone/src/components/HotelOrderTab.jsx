import React, { useContext } from "react";
import { HotelContext } from "../context/HotelContext";
import { Flex, Image, Rate } from "antd";

const HotelOrderTab = () => {
  const { hotelData } = useContext(HotelContext);

  return (
    <div className="flex gap-3">
      <div className="w-1/4"> {/* sidebar */}</div>
      <div className="w-full">
        <div className="flex justify-between items-start">
          <div>
            <p>Order Online</p>
            <p>Live track your order | 13 min</p>
          </div>
          <div>{/* search */}</div>
        </div>
        <div>
          <p>head</p>
          <Flex gap={"10px"}>
            <Image height={"130px"} src="" />
            <Flex justify="space-between" align="center" className="flex-1">
              <div>
                <p>title</p>
                <p className="text-white bg-[#F2A266] rounded px-1 my-3">
                  BESTSELLER
                </p>
                <Rate allowHalf defaultValue={2.8} disabled />
                <p className="my-3">Price</p>
              </div>
              <div>
                <button className="bg-btnColor py-2 px-6 rounded-md text-white hover:opacity-70">
                  Add to cart
                </button>
              </div>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default HotelOrderTab;
