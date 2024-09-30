import { isLogdedIn } from "./helper.js";
import { setNavBar } from "./helper.js";

document.addEventListener("DOMContentLoaded", () => {
  isLogdedIn();
  setNavBar();

  // const isLogdedIn = localStorage.getItem("isLogin");
  // !isLogdedIn
  //   ? (window.location = "../Login.html")
  // : (window.location = "../products.html");
});
