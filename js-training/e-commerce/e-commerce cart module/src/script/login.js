import { usersData } from "../mock/usersData.js";

function isShowPassword() {
  const checkBox = document.getElementById("password");
  if (checkBox.type != "password") {
    checkBox.type = "password";
  } else {
    checkBox.type = "text";
  }
}

document
  .getElementById("showpass")
  .addEventListener("change", () => isShowPassword());

const username = document.getElementById("username");
const password = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const error = document.getElementById("error");
const validatePassword = (username, password) => {
  return usersData.find(
    (item) => item.username == username && item.password == password
  );
};

username.addEventListener("input", (e) => {
  if (e.target.value == "") {
    usernameError.innerHTML = "Username is required";
  } else {
    usernameError.innerHTML = "";
  }
});

password.addEventListener("input", () => {
  if (password.value == "") {
    passwordError.innerHTML = "Password is required";
  } else {
    passwordError.innerHTML = "";
  }
});

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!username.value) {
    usernameError.innerHTML = "Username is required";
  }
  if (!password.value) {
    passwordError.innerHTML = "Password is required";
  }
  if (username.value && password.value) {
    const user = validatePassword(username.value, password.value);

    if (user) {
      localStorage.setItem("isLogin", true);
      if (user.accountType === "storeManager" || user.accountType === "admin") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: username.value,
            accountType: user.accountType,
          })
        );
        user.accountType === "storeManager"
          ? (window.location = "/src/dashbord/")
          : (window.location = "/src/storeManager/");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({ username: username.value })
        );
        window.location = "/src/";
      }
    } else {
      error.innerHTML = "Invalid credentials";
    }
  }
});
