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
  console.log("user: ", user);
  localStorage.setItem("users", JSON.stringify([...getAllUsers(), user]));
};
export const setLoginUser = (phone) => {
  let user = getUserByNumber(phone);
  if (!user) {
    user = {
      phone,
    };
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
};
export const getRegistratonData = () => {
  return JSON.parse(localStorage.getItem("registrationData")) || {};
};
