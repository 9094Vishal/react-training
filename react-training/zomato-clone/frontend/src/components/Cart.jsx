import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Image,
  Select,
  Spin,
} from "antd";
import React, { memo, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import notFound from "../assets/emptyCart.png";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/loginContext";
import { address, getDefaultAddress, getHotelById } from "../helper/helper";
import AddAddres from "./AddAddres";
import SelectAddressDrawer from "./SelectAddressDrawer";
import api from "../api/Axios";
const Cart = () => {
  const [queryPerams] = useSearchParams();
  const hotelId = queryPerams.get("hotelId");
  const { itemInCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [userAddress, setUserAddress] = useState(getDefaultAddress());

  let mode = "online";
  const handleChange = (value) => {
    mode = value;
  };
  const [hotel, setHotel] = useState(null);
  const [cart, setCart] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const [total, setTotal] = useState({
    total: 0,
    totalWithGst: 0,
    gst: "0%",
  });
  const getCartDeta = async () => {
    const response = await api.get(`/cart/hotelCart/${user._id}/${hotelId}`);
    setCart(response.data.cartData[0]);
    console.log("response.data.cartData: ", response.data.cartData[0]);
  };
  useEffect(() => {
    getCartDeta();
    setHotel(getHotelById(hotelId));
    setCartItem(itemInCart(hotelId));

    return () => {};
  }, [queryPerams]);
  useEffect(() => {
    if (cart) {
      const sum = cart.menuItem.reduce((a, b) => {
        return a + b.price * b.quntity;
      }, 0);
      setTotal({
        total: `₹${sum}`,
        totalWithGst: `₹${((sum / 100) * 18 + sum).toFixed(2)}`,
        gst: `₹${((sum / 100) * 18).toFixed(2)}`,
      });
    }
  }, [cart]);
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
      label: `Total ${total.total}`,
      children: (
        <>
          <Flex justify="space-between">
            <p>Total Price</p>
            <p>{total.totalWithGst}</p>
          </Flex>
          <Flex justify="space-between">
            <p>GST (18%)</p>
            <p className="font-medium">{total.gst}</p>
          </Flex>
          <Divider />
          <Flex justify="space-between">
            <p>Grand Total </p>
            <p className="font-semibold">{total.totalWithGst}</p>
          </Flex>
        </>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState({
    isOpen: false,
    editId: false,
    id: null,
  });
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = (isEdit = false, id = null) => {
    setChildrenDrawer({
      isOpen: true,
      isEdit,
      id,
    });
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer({
      isOpen: false,
      editId: false,
      id: null,
    });
  };

  const handleOrder = () => {
    console.log(mode);
  };
  return (
    <div className="mx-20 my-3">
      <div className="">
        {cart ? (
          <>
            <p>{hotel.restaurantName}</p>{" "}
            <span className="text-sm text-gray-400">
              {address(cart.hotelData.restaurantAddressDetails)}
            </span>
          </>
        ) : (
          <Spin />
        )}
      </div>
      {cart ? (
        <>
          <div className="bg-white p-2 shadow rounded-lg">
            {cart.menuItem.map(({ title, quntity, price, id }, index) => {
              return (
                <CartItem
                  key={index}
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
              <p>
                <FontAwesomeIcon
                  icon={faStopwatch}
                  className="text-btnColor h-5 w-5"
                />{" "}
                Delivery in 22 min
              </p>
            </li>
            <Card>
              <div className="my-2 flex justify-between items-center">
                {userAddress && (
                  <div className="flex-1">
                    {userAddress.default && (
                      <p className="text-btnColor">Default Address</p>
                    )}
                    <p>{userAddress.addressType}</p>
                    <p>{userAddress.name}</p>
                    <p>{userAddress.phone}</p>
                    <p>
                      {userAddress.address} {userAddress.city}
                    </p>{" "}
                  </div>
                )}
                <button onClick={showDrawer}>Select Address</button>
              </div>
            </Card>
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
        {userAddress ? (
          <button
            disabled={!cartItem}
            onClick={handleOrder}
            className={`bg-btnColor text-white px-10 py-2 rounded-md hover:border-none hover:opacity-75 ${
              !cartItem && "cursor-not-allowed"
            }`}
          >
            <span>
              <span>{total.totalWithGst}</span> Order now
            </span>
          </button>
        ) : (
          <button
            disabled={!cartItem}
            onClick={showDrawer}
            className={`bg-btnColor text-white px-10 py-2 rounded-md hover:border-none hover:opacity-75 ${
              !cartItem && "cursor-not-allowed"
            }`}
          >
            Select Address at next step
          </button>
        )}
      </Flex>
      {open && (
        <SelectAddressDrawer
          open={open}
          childrenDrawer={childrenDrawer}
          onClose={onClose}
          setChildrenDrawer={setChildrenDrawer}
          setOpen={setOpen}
          showChildrenDrawer={showChildrenDrawer}
          showDrawer={showDrawer}
          onChildrenDrawerClose={onChildrenDrawerClose}
          setUserAddress={setUserAddress}
        />
      )}
      {childrenDrawer.isOpen && (
        <Drawer
          title="Address"
          width={520}
          closable={true}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer.isOpen}
        >
          <AddAddres
            isEdit={childrenDrawer.isEdit}
            addressId={childrenDrawer.id}
            onChildrenDrawerClose={onChildrenDrawerClose}
          />
        </Drawer>
      )}
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
  const { addToCart, deleteCart, itemInCart } = useContext(CartContext);

  const [qun, setQun] = useState(Number(quntity));
  const handleAdd = () => {
    addToCart(hotelId, foodId);
    setQun((pr) => pr + 1);
    setCartItem(itemInCart(hotelId));
  };
  const handleremove = () => {
    deleteCart(hotelId, foodId);
    if (qun > 1) {
      setQun((pr) => pr - 1);
    }
    setCartItem(itemInCart(hotelId));
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
