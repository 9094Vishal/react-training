import { getcurrentUser, setNavBar } from "../../script/helper.js";
document.addEventListener("DOMContentLoaded", () => {
  setNavBar(false);
  document.querySelector(`h2`).innerHTML = `Welcome ${getcurrentUser()}...`;
});
