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
export const getHotelsByFood = (title, location) => {
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

  console.log("Hotels: ", Hotels);
  return Hotels;
};
export const getHotelById = (id) => {
  return getListOfRestaurants()?.find((hotel) => hotel.id == id) || null;
};
export const getHotelData = (id) => {
  return getListOfRestaurants().find((item) => item.id == id);
};
