import { cities } from "../mock/cityes.js";
import { getListeners, loadHeaderWithBookFunctions } from "./helper.js";

// grab everything we need

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderWithBookFunctions();
  // getListeners();
  const from = document.getElementById("from");
  const to = document.getElementById("to");
  const startDate = document.getElementById("depart");
  const fromError = document.getElementById("from-error");
  const torror = document.getElementById("to-error");
  const departError = document.getElementById("depart-error");

  const adults = document.getElementById("adults");
  const adultsError = document.getElementById("adult-error");
  const child = document.getElementById("child");
  const childError = document.getElementById("child-error");
  document.getElementById("flight-search-btn").onclick = () => {
    if (from.value.trim() == "") {
      fromError.textContent = "This field is required!!";
    } else if (to.value.trim() == "") {
      torror.textContent = "This field is required!!";
    } else if (startDate.value == "") {
      departError.innerText = "This field is required!!";
    } else {
      location = `trip.html?from=${from.value}&to=${to.value}&depart=${startDate.value}&adults=${adults.value}&childs=${child.value}`;
    }
  };
  from.addEventListener("input", (e) => {
    if (e.target.value.trim() == "") {
      fromError.textContent = "This field is required!!";
    } else {
      fromError.textContent = "";
    }
  });

  to.addEventListener("input", (e) => {
    if (e.target.value.trim() == "") {
      torror.textContent = "This field is required!!";
    } else {
      torror.textContent = "";
    }
  });
});
