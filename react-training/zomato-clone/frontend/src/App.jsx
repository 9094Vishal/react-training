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
import toast, { Toaster } from "react-hot-toast";
import { ToastContext } from "./context/ToastContext";
import UploadImage from "./components/UploadImage";
import { SearchContext } from "./context/SearchContext";
import api from "./api/Axios";

function App() {
  const [isLogin, setIsLogin] = useState(getLoginUser());
  const [cartData, setCartData] = useState([]);
  // for searching
  const [locationOption, setLocationOption] = useState({
    label: "Ahmedabad",
    value: ",,Ahmedabad",
  });
  const [foodOption, setFoodOption] = useState(null);
  const [foodOptionList, setFoodOptionList] = useState([]);
  const [hotels, setHotels] = useState([]);

  console.log(isLogin);
  // const addToCart = (hotelId, foodId) => {
  //   let cart = getCart();
  //   const cartIndex = cart.findIndex((i) => i.hotelId == hotelId);
  //   if (cartIndex > -1) {
  //     const index = cart[cartIndex].food.findIndex(
  //       (food) => food.foodId == foodId
  //     );

  //     if (index > -1) {
  //       cart[cartIndex].food[index] = {
  //         ...cart[cartIndex].food[index],
  //         quntity: Number(cart[cartIndex].food[index].quntity) + 1,
  //       };
  //     } else {
  //       cart[cartIndex].food = [
  //         ...cart[cartIndex].food,
  //         {
  //           foodId: foodId,
  //           quntity: 1,
  //         },
  //       ];
  //     }
  //   } else {
  //     const newCart = {
  //       hotelId,
  //       food: [
  //         {
  //           foodId,
  //           quntity: 1,
  //         },
  //       ],
  //     };
  //     cart.push(newCart);
  //   }
  //   const { user } = isLogin;
  //   user.cart = cart;
  //   updateUser(user);
  //   setCartData(cart);
  //   setLoginData(getLoginUser());
  // };
  const addToCart = (hotelId, foodId, price) => {
    const data = {
      userId: isLogin.user._id,
      hotelId: hotelId,

      menuItem: [
        {
          foodItemId: foodId,
          quantity: 1,
          price: price,
        },
      ],
    };
    const response = api.post(`/cart`, data);
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

  const itemInCart = async (hotelId) => {
    // const hotelData = getHotelById(hotelId).menuItem || {};
    // const cartData =
    //   getCart().find((item) => item.hotelId == hotelId).food || {};
    // const list = [];
    // cartData.forEach((element) => {
    //   const data = hotelData.find((item) => item.id == element.foodId);
    //   list.push({ ...data, quntity: element.quntity });
    // });
    // return list;
    const response = await api.get(`/cart/${isLogin.user._id}`);
    if (response) {
      setCartData(response.data.data);
    }
  };

  const getTotalofCart = () => {};

  const setLoginData = (data) => {
    setIsLogin(data);
  };

  const makeToast = (type = null, messages) => {
    type != null
      ? toast[type](messages)
      : toast(messages, {
          duration: 40000,
        });
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
        <SearchContext.Provider
          value={{
            locationOption,
            setLocationOption,
            foodOption,
            setFoodOption,
            foodOptionList,
            setFoodOptionList,
            hotels,
            setHotels,
          }}
        >
          <ToastContext.Provider value={{ makeToast }}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/:city" element={<SearchFoodPage />} />
                <Route path="/restaurant" element={<RestaurantInfo />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/temp" element={<UploadImage />} />
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
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              toastOptions={{
                style: {
                  border: "1px solid #713200",
                  padding: "10px",
                  color: "#713200",
                },
                success: {
                  style: {
                    borderColor: "green",
                    color: "green",
                  },
                },
                error: {
                  style: {
                    borderColor: "red",
                    color: "red",
                  },
                },
              }}
            />
          </ToastContext.Provider>
        </SearchContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
