import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import { AuthContext } from "./context/loginContext";
import { useState } from "react";
import {
  getCart,
  getHotelById,
  getLoginUser,
  updateUser,
} from "./helper/helper";
import PartnerWithUs from "./pages/PartnerWithUs";
import RestaurantResto from "./pages/RestaurantResto";
import AddNewRestaurant from "./pages/AddNewRestaurant";
import ViewHotel from "./components/ViewHotel";
import ViewRequestPage from "./pages/ViewRequestPage";
import SearchFoodPage from "./pages/SearchFoodPage";
import RestaurantInfo from "./components/RestaurantInfo";
import { CartContext } from "./context/CartContext";
import Cart from "./components/Cart";
import MenuItem from "antd/es/menu/MenuItem";
import Profile from "./pages/Profile";
import AddAddres from "./components/AddAddres";
import Notification from "./pages/Notification";
import Orders from "./pages/Orders";

function App() {
  const [isLogin, setIsLogin] = useState(getLoginUser());
  const [cartData, setCartData] = useState([]);

  const addToCart = (hotelId, foodId) => {
    let cart = getCart();
    const cartIndex = cart.findIndex((i) => i.hotelId == hotelId);
    if (cartIndex > -1) {
      const index = cart[cartIndex].food.findIndex(
        (food) => food.foodId == foodId
      );

      if (index > -1) {
        cart[cartIndex].food[index] = {
          ...cart[cartIndex].food[index],
          quntity: Number(cart[cartIndex].food[index].quntity) + 1,
        };
      } else {
        cart[cartIndex].food = [
          ...cart[cartIndex].food,
          {
            foodId: foodId,
            quntity: 1,
          },
        ];
      }
    } else {
      const newCart = {
        hotelId,
        food: [
          {
            foodId,
            quntity: 1,
          },
        ],
      };
      cart.push(newCart);
    }
    const { user } = isLogin;
    user.cart = cart;
    updateUser(user);
    setCartData(cart);
    setLoginData(getLoginUser());
  };
  const editCart = () => {};
  const deleteCart = (hotelId, foodId) => {
    let cart = getCart();
    const cartIndex = cart.findIndex((i) => i.hotelId == hotelId);
    if (cartIndex > -1) {
      const index = cart[cartIndex].food.findIndex(
        (food) => food.foodId == foodId
      );

      if (index > -1) {
        if (Number(cart[cartIndex].food[index].quntity) > 1) {
          cart[cartIndex].food[index] = {
            ...cart[cartIndex].food[index],
            quntity: Number(cart[cartIndex].food[index].quntity) - 1,
          };
        } else {
          cart[cartIndex].food = cart[cartIndex].food.filter(
            (item) => item.foodId != foodId
          );
        }
      }
    } else {
    }
    const { user } = isLogin;
    user.cart = cart;

    updateUser(user);
    setCartData(cart);
    setLoginData(getLoginUser());
  };

  const itemInCart = (hotelId) => {
    const hotelData = getHotelById(hotelId).menuItem || {};
    const cartData =
      getCart().find((item) => item.hotelId == hotelId).food || {};
    const list = [];
    cartData.forEach((element) => {
      const data = hotelData.find((item) => item.id == element.foodId);
      list.push({ ...data, quntity: element.quntity });
    });
    return list;
  };

  const getTotalofCart = () => {};

  const setLoginData = (data) => {
    setIsLogin(data);
  };

  return (
    <AuthContext.Provider value={{ ...isLogin, setLoginData }}>
      <CartContext.Provider
        value={{
          cartData,
          addToCart,
          editCart,
          deleteCart,
          itemInCart,
          getTotalofCart,
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:city" element={<SearchFoodPage />} />
            <Route path="/restaurant" element={<RestaurantInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/partner-with-us" element={<PartnerWithUs />} />
            <Route
              path="/partner-with-us/new"
              element={<RestaurantResto />}
            ></Route>
            <Route
              path="/partner-with-us/new/add/"
              element={<AddNewRestaurant />}
            />
            <Route
              path="/partner-with-us/new/edit/"
              element={<AddNewRestaurant />}
            />
            <Route path="/partner-with-us/view" element={<ViewHotel />} />
            <Route path="/orders/request" element={<ViewRequestPage />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
