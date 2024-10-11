import { Button, Dropdown, Flex } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "../context/loginContext";
import { getHotelById } from "../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartDropDown = () => {
  const navigate = useNavigate();
  const {
    user: { cart },
  } = useContext(AuthContext);
  const listOfHotels = [];
  cart.forEach((element) => {
    listOfHotels.push(getHotelById(element.hotelId));
  });
  const items = listOfHotels.map(({ id, restaurantName }, index) => {
    return {
      key: index + 1,
      label: (
        <>
          <Flex
            gap={15}
            align="center"
            justify="space-between"
            className="w-full"
          >
            <div onClick={() => navigate(`/restaurant?hotelId=${id}`)}>
              <p>{restaurantName}</p>
              <span className="text-blue-500 ">
                View Hotel <FontAwesomeIcon icon={faCaretRight} />
              </span>
            </div>
            <Button onClick={() => navigate(`/cart?hotelId=${id}`)}>
              Cart
            </Button>
          </Flex>
        </>
      ),
    };
  });

  return (
    <div className="fixed bottom-3 right-6">
      <Dropdown
        menu={{
          items,
        }}
      >
        <Button className="bg-btnColor text-white px-10 hover:!text-white border-none hover:!bg-btnColor hover:!border-none">
          View Cart
        </Button>
      </Dropdown>
    </div>
  );
};

export default CartDropDown;
