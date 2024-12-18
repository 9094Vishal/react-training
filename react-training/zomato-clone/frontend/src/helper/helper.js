import { array } from "yup";
import api from "../api/Axios";

export const sendOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log("otp: ", otp);

  return otp;
};
export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};
export const getUserByNumber = (phone) => {
  return getAllUsers().find((user) => user.phone == phone) || null;
};
export const login = (token, user) => {
  console.log(token);
  localStorage.setItem("isLogin", true);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const updateUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getLoginUser = () => {
  const data = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    isLogin: JSON.parse(localStorage.getItem("isLogin")) || null,
  };
  return data;
};
export const logOut = () => {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("user");
  localStorage.removeItem("registrationData");
};
export const getRegistratonData = () => {
  return JSON.parse(localStorage.getItem("registrationData")) || {};
};
export const getListOfRestaurants = () => {
  return JSON.parse(localStorage.getItem("allRestaurants")) || [];
};
export const myRestaurantData = (phone) => {
  return getListOfRestaurants().find((item) => item.id == phone) || null;
};
export const setReaturantDataToMainList = (data) => {
  const { user } = getLoginUser();
  let listOfRestuarants = getListOfRestaurants();
  if (user) {
    if (listOfRestuarants.length != 0) {
      const myRestaurant = myRestaurantData(user.phone);
      if (myRestaurant) {
        listOfRestuarants = listOfRestuarants.map((item) => {
          if (item.id == myRestaurant.id) {
            return {
              ...data,
              id: user.phone,
            };
          } else {
            return item;
          }
        });
      } else {
        listOfRestuarants = [...listOfRestuarants, { ...data, id: user.phone }];
      }
    } else {
      listOfRestuarants = [{ ...data, id: user.phone }];
    }
    localStorage.setItem("allRestaurants", JSON.stringify(listOfRestuarants));
    if (!user.isReastaurant) {
      updateUser({ ...user, isReastaurant: true });
    }
  }
};
export const getLocations = (allRestaurants) => {
  console.log("allRestaurants: ", allRestaurants);
  // const allRestaurants = getListOfRestaurants();
  return allRestaurants.map((item) => {
    const { area, city, address } = item.restaurantAddressDetails;
    const data =
      (address ? `${address},` : "") +
      (area ? `${area},` : "") +
      (city ? `${city}` : "");

    return {
      value: data,
      label: data,
    };
  });
};
export const searchFoodByLocation = async (location, allRestaurants) => {
  console.log("allRestaurants: ", allRestaurants);
  // const allRestaurants = getListOfRestaurants();
  const Hotels = allRestaurants?.filter((item) => {
    const { address, area, city } = item.restaurantAddressDetails;
    const data = location.toString().split(",");
    if (
      data.length == 1 &&
      data[0].toString().toLowerCase() == city.toString().toLowerCase()
    ) {
      return item;
    }
    if (
      data[0].toString().toLowerCase() == address.toString().toLowerCase() ||
      data[1].toString().toLowerCase() == area.toString().toLowerCase() ||
      data[2].toString().toLowerCase() == city.toString().toLowerCase()
    ) {
      return item;
    }
  });
  console.log(Hotels);
  const ids = Hotels.map((i) => i._id);
  // console.log("ids: ", ids);
  const response = await api.get(`restaurant/food?ids=${ids.join(",")}`);
  if (response) {
    console.log("response: ", response);
    // Create a new array to hold unique objects
    const uniqueObjects = [];

    // Use a Set to track titles that have been added
    const titles = new Set();

    response.data.forEach((item) => {
      if (!titles.has(item.title)) {
        titles.add(item.title);
        uniqueObjects.push(item);
      }
    });

    return uniqueObjects;
  }
};

// this will first filter on address then match the food title
export const getHotelsByFood = (title, location) => {
  const allRestaurants = getListOfRestaurants();
  const Hotels = allRestaurants.filter((item) => {
    const { area, city, address } = item.restaurantAddressDetails;
    const data = location.toString().split(",");
    if (
      data.length == 1 &&
      data[0].toString().toLowerCase() == city.toString().toLowerCase()
    ) {
      return item.menuItem.find((menu) => menu.title == title);
    }
    if (
      data[1].toString().toLowerCase() == address.toString().toLowerCase() ||
      data[0].toString().toLowerCase() == area.toString().toLowerCase() ||
      data[2].toString().toLowerCase() == city.toString().toLowerCase()
    ) {
      return item.menuItem.find((menu) => menu.title == title);
    }
  });

  // console.log("Hotels: ", Hotels);
  return Hotels;
};
// this will give us single hotel by its id
export const getHotelById = async (id) => {
  const response = await api.get(`/restaurant/${id}`);
  if (response && response.data) return response.data.data;
};
export const getHotelData = (id) => {
  return getListOfRestaurants().find((item) => item.id == id);
};
export const getFoodListData = ({ menuItem }) => {
  const category = getListOfCategory();

  const main = [];
  category.forEach((item) => {
    const list = [];
    menuItem.forEach((menu) => {
      if (menu.foodCategory == item.id) {
        list.push({ ...menu });
      }
    });
    if (list.length != 0) {
      main.push({ menu: [...list], category: item.category });
    }
  });
  return main;
};

export const getListOfCategory = () => {
  return [
    {
      category: "Gujarati",
      id: "1",
    },
    {
      category: "Panjabi",
      id: "2",
    },
    {
      category: "Chinise",
      id: "3",
    },
  ];
};

export const getCart = () => {
  const { user } = getLoginUser();
  return user.cart || [];
};
export const address = (data) => {
  const { address, area, city } = data;
  return (
    (address ? `${address},` : "") +
    (area ? `${area},` : "") +
    (city ? `${city}` : "")
  );
};

export const getDefaultAddress = () => {
  const { user } = getLoginUser();
  if (user.address) {
    return user.address.find((item) => item.default);
  } else {
    return null;
  }
};
export const getUserAddressById = (id) => {
  const { user } = getLoginUser();
  console.log("id: ", id);
  console.log("user: ", user);

  if (user.address) {
    return user.address.find((item) => item._id == id);
  } else {
    return null;
  }
};
export const deleteAddress = (id) => {
  console.log("id: ", id);
  const { user } = getLoginUser();

  if (user.address) {
    user.address = user.address.filter((i) => i._id != id);
  }
  console.log(user);
  // updateUser(user);
};

export const EditUserProfile = (id, data) => {
  updateUser(user);
};
