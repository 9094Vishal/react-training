import {
  Button,
  Collapse,
  Divider,
  Dropdown,
  Flex,
  Image,
  Select,
  Spin,
} from "antd";
import React, { Fragment, memo, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import notFound from "../assets/emptyCart.png";
import { address, getHotelById } from "../helper/helper";
import { CartContext } from "../context/CartContext";
const Cart = () => {
  const [queryPerams] = useSearchParams();
  const hotelId = queryPerams.get("hotelId");
  const { itemInCart } = useContext(CartContext);
  let mode = "online";
  const handleChange = (value) => {
    mode = value;
  };
  const [hotel, setHotel] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setHotel(getHotelById(hotelId));
    setCartItem(itemInCart(hotelId));

    return () => {};
  }, []);
  if (!hotelId) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Image src={notFound} height={200} />
        <p>Your don't have any item in cart</p>
      </div>
    );
  }

  const totalItemCollaps = [
    {
      key: "1",
      label: `Total ${total}`,
      children: (
        <>
          <Flex justify="space-between">
            <p>Total Price</p>
            <p>{total}</p>
          </Flex>
          <Flex justify="space-between">
            <p>GST (18%)</p>
            <p>140</p>
          </Flex>
          <Divider />
          <Flex justify="space-between">
            <p>Grand Total (18%)</p>
            <p>140</p>
          </Flex>
        </>
      ),
    },
  ];
  return (
    <div className="mx-20 my-3">
      <div className="">
        {hotel ? (
          <>
            <p>{hotel.restaurantName}</p>{" "}
            <span className="text-sm text-gray-400">
              {address(hotel.restaurantAddressDetails)}
            </span>
          </>
        ) : (
          <Spin />
        )}
      </div>
      {cartItem ? (
        <>
          <div className="bg-white p-2 shadow rounded-lg">
            {cartItem.map(({ title, quntity, price, id }) => {
              return (
                <CartItem
                  key={id}
                  price={price}
                  quntity={quntity}
                  title={title}
                  hotelId={hotelId}
                  foodId={id}
                  setCartItem={setCartItem}
                  cartItem={cartItem}
                />
              );
            })}
          </div>
          <ul className="bg-white p-2 shadow rounded-lg mt-3">
            <li>
              <p>Delivery in 22 min</p>
            </li>
            <li>
              <p>
                Delivery at <span className="font-medium">home</span>
              </p>
              <p>
                Jay goga kiramna golsheri, neasr matfati maletan opade ni same
                patyan...
              </p>
            </li>
            <li>
              <p>
                Vishal Prajapati, <span className="font-medium">901645133</span>
              </p>
            </li>
            <li>
              <Collapse items={totalItemCollaps} ghost />
            </li>
          </ul>
        </>
      ) : (
        <Spin />
      )}

      <Flex justify="space-between" align="center" className="mt-3">
        <Select
          defaultValue={mode}
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={[
            {
              value: "online",
              label: "Online",
            },
            {
              value: "cashOnDelivery",
              label: "cashOnDelivery",
            },
          ]}
        />
        <button
          disabled={!cartItem}
          className={`bg-btnColor text-white px-10 py-2 rounded-md hover:border-none hover:opacity-75 ${
            !cartItem && "cursor-not-allowed"
          }`}
        >
          <span className="font-medium"> &#8377; 45</span> Order Now
        </button>
      </Flex>
    </div>
  );
};

export default memo(Cart);

export const CartItem = ({
  title,
  quntity,
  price,
  hotelId,
  foodId,
  setCartItem,
  cartItem,
}) => {
  const { addToCart, deleteCart } = useContext(CartContext);

  const [qun, setQun] = useState(Number(quntity));
  const handleAdd = () => {
    addToCart(hotelId, foodId);
    setQun((pr) => pr + 1);
  };
  const handleremove = () => {
    if (qun == 1) {
      setCartItem(cartItem.filter((item) => item.id != foodId));
    } else {
      setQun((pr) => pr - 1);
    }
    deleteCart(hotelId, foodId);
  };

  return (
    <>
      <Flex align="center" className="" justify="space-between">
        <p>{title}</p>
        <span className="bg-red-200 rounded-md border-btnColor border p-1">
          <button className="w-4 text-btnColor mx-2" onClick={handleremove}>
            -
          </button>
          {qun}
          <button className="w-4 text-btnColor mx-2" onClick={handleAdd}>
            +
          </button>
        </span>
      </Flex>
      <Flex align="center" justify="space-between">
        <p>&#8377; {price}</p>
        <span className="">&#8377; {price * qun}</span>
      </Flex>
    </>
  );
};
