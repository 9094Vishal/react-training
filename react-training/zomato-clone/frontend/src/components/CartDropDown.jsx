import { Button, Dropdown, Flex } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/loginContext";
import { getHotelById } from "../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../context/CartContext";
import api from "../api/Axios";

const CartDropDown = () => {
  const navigate = useNavigate();
  const { cartData } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [listOfHotels, setListOfHotels] = useState([]);

  const getHotels = async () => {
    const listOfId = [];
    cartData.forEach(async (element) => {
      listOfId.push(element.hotelId);
    });
    const response = await api.post("/restaurant/byIds", {
      restaurantIds: listOfId,
    });
    if (response) {
      setListOfHotels(response.data.restaurants);
    }
  };
  useEffect(() => {
    getHotels();
  }, []);
  const items = listOfHotels.map(({ _id, restaurantName }, index) => {
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
            <div onClick={() => navigate(`/restaurant?hotelId=${_id}`)}>
              <p>{restaurantName}</p>
              <span className="text-blue-500 ">
                View Hotel <FontAwesomeIcon icon={faCaretRight} />
              </span>
            </div>
            <Button onClick={() => navigate(`/cart?hotelId=${_id}`)}>
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
