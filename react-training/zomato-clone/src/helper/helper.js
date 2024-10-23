import { array } from "yup";

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
export const login = () => {
  localStorage.setItem("isLogin", true);
};
export const createUser = (user) => {
  localStorage.setItem("users", JSON.stringify([...getAllUsers(), user]));
};
export const updateUser = (user) => {
  let allUsers = getAllUsers();
  allUsers = allUsers.map((item) => {
    if (item.phone == user.phone) {
      return user;
    } else {
      return item;
    }
  });
  localStorage.setItem("users", JSON.stringify([...allUsers]));
  localStorage.setItem("user", JSON.stringify(user));
};
export const setLoginUser = (phone) => {
  let user = getUserByNumber(phone);
  if (!user) {
    user = {
      phone,
    };
  }
  let regiData = getHotelById(phone);

  if (regiData) {
    localStorage.setItem("registrationData", JSON.stringify(regiData));
  }

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
export const getLocations = () => {
  const allRestaurants = getListOfRestaurants();
  return allRestaurants.map((item) => {
    const { area, city, landmark } = item.restaurantAddressDetails;
    const data =
      (area ? `${area},` : "") +
      (landmark ? `${landmark},` : "") +
      (city ? `${city}` : "");

    return {
      value: data,
      label: data,
    };
  });
};
export const searchFoodByLocation = (location) => {
  const allRestaurants = getListOfRestaurants();
  const Hotels = allRestaurants.filter((item) => {
    const { area, city, landmark } = item.restaurantAddressDetails;
    const data = location.toString().split(",");
    if (
      data.length == 1 &&
      data[0].toString().toLowerCase() == city.toString().toLowerCase()
    ) {
      return item;
    }
    if (
      data[0].toString().toLowerCase() == area.toString().toLowerCase() ||
      data[1].toString().toLowerCase() == landmark.toString().toLowerCase() ||
      data[2].toString().toLowerCase() == city.toString().toLowerCase()
    ) {
      return item;
    }
  });

  return Hotels.map((item) => item.menuItem).flat();
};

// this will first filter on address then match the food title
export const getHotelsByFood = (title, location) => {
  const allRestaurants = getListOfRestaurants();
  const Hotels = allRestaurants.filter((item) => {
    const { area, city, landmark } = item.restaurantAddressDetails;
    const data = location.toString().split(",");
    if (
      data.length == 1 &&
      data[0].toString().toLowerCase() == city.toString().toLowerCase()
    ) {
      return item.menuItem.find((menu) => menu.title == title);
    }
    if (
      data[0].toString().toLowerCase() == area.toString().toLowerCase() ||
      data[1].toString().toLowerCase() == landmark.toString().toLowerCase() ||
      data[2].toString().toLowerCase() == city.toString().toLowerCase()
    ) {
      return item.menuItem.find((menu) => menu.title == title);
    }
  });

  // console.log("Hotels: ", Hotels);
  return Hotels;
};
// this will give us single hotel by its id
export const getHotelById = (id) => {
  return getListOfRestaurants()?.find((hotel) => hotel.id == id) || null;
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
  const { area, city, landmark, shop } = data;
  return (
    (shop ? `${shop},` : "") +
    (area ? `${area},` : "") +
    (landmark ? `${landmark},` : "") +
    (city ? `${city}` : "")
  );
};

export const AddUserAddress = (address) => {
  const { user } = getLoginUser();

  if (user.address) {
    const index = user.address.findIndex((i) => i.id == address.id);
    if (address.default) {
      user.address = user.address.map((item) => {
        item.default = false;
        return item;
      });
    }

    if (index > -1) {
      user.address[index] = address;
    } else {
      user.address = [...user.address, address];
    }
  } else {
    user.address = [address];
  }

  updateUser(user);
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
  if (user.address) {
    return user.address.find((item) => item.id == id);
  } else {
    return null;
  }
};
export const deleteAddress = (id) => {
  const { user } = getLoginUser();

  if (user.address) {
    user.address = user.address.filter((i) => i.id != id);
  }

  updateUser(user);
};

export const EditUserProfile = (id, data) => {
  const { user } = getLoginUser();
  user.profileData = data;

  updateUser(user);
};
