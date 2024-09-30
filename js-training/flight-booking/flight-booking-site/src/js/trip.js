import { airLines } from "../mock/airlinis.js";
import { flights } from "../mock/flightsData.js";
import { sendNotification } from "./customNotification.js";
import {
  convertDate,
  getDurartion,
  getListeners,
  getListOfUsers,
  getLogedInUser,
  getTime,
  isLogedIn,
  loadHeaderWithBookFunctions,
  loadPhoneNUmberPopUp,
} from "./helper.js";

let userOtp = "";
let price = null;
const airlines = document.getElementById("airlines");
const range = document.getElementById("range");
const setAirlinesFilter = () => {
  airlines.innerHTML = airLines
    .map(
      (item, id) =>
        `
            <div>
              <input type="checkbox" class="airlines  name="airlines" value="${item}" id="air-${id}" />
              <label class="hover:text-gray-600"" for="air-${id}">${item}</label>
            </div>
    `
    )
    .join("");
};
let selectedAirLines = [];
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderWithBookFunctions();
  getListeners();
  setAirlinesFilter();

  const fliterWrapper = document.getElementById("flight-wraper");
  const x = document.getElementsByTagName("BODY")[0]; // Select body tag because of disable scroll when modal is active
  const modal = document.getElementById("modal"); // modal
  const modalBtn = document.getElementById("modal-button"); // launch modal button
  const modalClose = document.getElementsByClassName("modal-close"); // close modal button

  let params = new URLSearchParams(location.search);
  let totalAdults = params.get("adults");
  let TotalChilds = params.get("childs");
  const totalTravelers = Number(totalAdults) + Number(TotalChilds);

  const makeCards = () => {
    let params = new URLSearchParams(location.search);
    let from = params.get("from");
    let to = params.get("to");
    let startDate = params.get("depart");

    let availableFlights = flights.filter((item) => {
      return (
        item.arrivalCity == to &&
        item.departureCity == from &&
        convertDate(new Date(item.arrivalTime), startDate)
      );
    });
    if (availableFlights.length != 0) {
      range.parentElement.parentElement.style.display = "block";
      range.min = Math.min(...availableFlights.map((o) => o.price));
      range.max = Math.max(...availableFlights.map((o) => o.price));
    } else {
      range.parentElement.parentElement.style.display = "none";
    }
    if (selectedAirLines.length != 0) {
      const res = [];
      availableFlights.forEach((item) => {
        selectedAirLines.forEach((data) => {
          if (data == item.airline) res.push(item);
        });
      });
      availableFlights = res;
    }

    if (price) {
      availableFlights = availableFlights.filter((item) => item.price <= price);
    }
    fliterWrapper.innerHTML = "";
    if (availableFlights.length != 0) {
      fliterWrapper.innerHTML = availableFlights
        .map(
          ({
            id,
            imageUrl,
            airline,
            arrivalCity,
            departureCity,
            arrivalTime,
            departureTime,
            flightNumber,
            estimatedTravelTime,
            price,
          }) => {
            return `
            <div class="mx-3 mt-2 bg-gray-200 p-3 rounded-md">
                    <div class="flex items-center gap-2 flex-shrink-0">
                      <img
                        src="https://media.istockphoto.com/id/155439315/photo/passenger-airplane-flying-above-clouds-during-sunset.jpg?s=612x612&w=0&k=20&c=LJWadbs3B-jSGJBVy9s0f8gZMHi2NvWFXa3VJ2lFcL0="
                        class="h-[50px] w-[50px] object-contain rounded-lg"
                        alt=""
                      />
                      <div class="flex items-center justify-between flex-1">
                        <h1 class="font-semibold text-xl">
                         ${airline} <span class="text-gray-500 text-lg"> (${flightNumber})</span>
                        </h1>
                        <p class="font-semibold">&#8377;${price}</p>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>Departure:</span>
                      <span>Destination</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>${getTime(departureTime)}</span>
                      <span>${getTime(arrivalTime)}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>${departureCity}</span>
                      <div class="relative flex-1 mx-2 text-center">
                        <hr
                          class="border-t absolute w-full top-1/2 border-dotted z-0 border-black"
                        />
                        <span class="relative z-10 mx-auto bg-white">${getDurartion(
                          estimatedTravelTime
                        )} </span>
                      </div>
                      <span>${arrivalCity}</span>
                    </div>
                    <div class="w-full text-center mt-2">
                      <button
                      value="${id}"
                        class="book-now-btn mx-auto bg-blue-300 border border-blue-600 rounded-xl py-2 px-5 font-medium hover:bg-blue-500"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
            `;
          }
        )
        .join("");
    } else {
      sendNotification("info", "Flights not found, for your selected choice!!");
    }

    document.querySelectorAll(".book-now-btn").forEach((button) => {
      button.addEventListener("click", () => {
        flightId = button.value;
        const { seatsAvailable } = flights.find((item) => item.id == flightId);
        const loginUser = getLogedInUser();
        const history = loginUser.history;

        let dateToBeBook = new Date(startDate);
        let isBooked = false;
        history.forEach(
          ({ time, flightData, totalAdults: ta, totalAdults: tc }) => {
            const date = new Date(time);

            if (
              dateToBeBook.getFullYear() === date.getFullYear() &&
              dateToBeBook.getDay() === date.getDay() &&
              dateToBeBook.getMonth() === date.getMonth() &&
              flightId == flightData.id &&
              totalAdults + TotalChilds == ta + tc
            ) {
              isBooked = true;
            }
          }
        );
        if (seatsAvailable < totalTravelers) {
          sendNotification(
            "error",
            `Total passengers are more than available seats!!!`
          );
        } else if (isBooked) {
          sendNotification("error", "You can't book same flight on same day!!");
        } else {
          if (isLogedIn()) {
            let user = JSON.parse(localStorage.getItem("currentUser"));
            loadBookingPopUp(flightId, user);
          } else {
            loadPhoneNUmberPopUp(loadBookingPopUp, flightId, true);
          }
        }
      });
    });
  };
  document.querySelectorAll(".airlines").forEach((item) => {
    item.addEventListener("change", () => {
      if (item.checked) selectedAirLines = [...selectedAirLines, item.value];
      else
        selectedAirLines = selectedAirLines.filter(
          (data) => data != item.value
        );
      makeCards();
    });
  });
  makeCards();
  const loadBookingPopUp = (id, user) => {
    let params = new URLSearchParams(location.search);
    let totalAdults = params.get("adults");
    let TotalChilds = params.get("childs");
    const flightData = flights.find((item) => item.id == id);
    const {
      airline,
      flightNumber,
      price,
      departureTime,
      departureCity,
      arrivalTime,
      arrivalCity,
      estimatedTravelTime,
      totalSeats,
      seatsAvailable,
    } = flightData;
    const adultsPrice = totalAdults * price;
    const childPrice = TotalChilds * (price / 2 / 3);
    const total = adultsPrice + childPrice;
    document.getElementById("book-popup").innerHTML = `
    <div
        class="w-[90%] sm:w-[450px] lg:w-[600px] p-8 sm:pb-4 bg-white rounded shadow-lg text-center sm:text-left"
      >
        <h3
          class="text-xl w-full sm:text-2xl font-semibold mb-6 flex flex-col sm:flex-row items-center"
        >
          <div
            class="p-2 rounded-full w-full flex items-center justify-between mb-4 sm:mb-0 sm:mr-2"
          >
            <div class="flex items-center">
              <svg
                class="h-10 w-10 mr-1 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span class="font-bold">Mi Book</span>
            </div>
            <span class="hover:opacity-40 cursor-pointer close-flight-popup">
              X
            </span>
          </div>
        </h3>

        <div class="">
          <div class="bg-gray-200 p-3 rounded-md">
            <div class="flex items-center gap-2 flex-shrink-0">
              <img
                src="https://media.istockphoto.com/id/155439315/photo/passenger-airplane-flying-above-clouds-during-sunset.jpg?s=612x612&w=0&k=20&c=LJWadbs3B-jSGJBVy9s0f8gZMHi2NvWFXa3VJ2lFcL0="
                class="h-[50px] w-[50px] object-contain rounded-lg"
                alt=""
              />
              <div class="flex items-center justify-between flex-1">
                <h1 class="font-semibold text-xl">
                  ${airline}
                  <span class="text-gray-500 text-lg"> (${flightNumber})</span>
                </h1>
                <p>&#8377;${price}</p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span>Departure:</span>
              <span>Destination</span>
            </div>
            <div class="flex justify-between items-center">
              <span>${getTime(departureTime)}</span>
              <span>${getTime(arrivalTime)}</span>
            </div>
            <div class="flex justify-between items-center">
              <span>${departureCity}</span>
              <div class="relative flex-1 mx-2 text-center">
                <hr
                  class="border-t absolute w-full top-1/2 border-dotted z-0 border-black"
                />
                <span class="relative z-10 mx-auto bg-white"
                  >${getDurartion(estimatedTravelTime)}
                </span>
              </div>
              <span>${arrivalCity}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-shrink-0 h-fit mt-2 gap-2">
          <div class="max-w-[200px] flex-shrink-0">
            <img
              class="w-full object-cover h-full flex-shrink-0"
              src="https://images.unsplash.com/photo-1603778863766-48c0ab66e9a1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div class="flex-1 text-start">
            <h1 class="font-semibold">Passenger Detail</h1>
            <p>${user.username}</p>
            <p>${user.phone}</p>
            <h1 class="font-semibold">Traveling Detail</h1>
            <div class="flex justify-between items-center">
              <p>Adults(${totalAdults})</p>
              <span>$${adultsPrice.toFixed(2)}</span>
            </div>
            <div class="flex justify-between items-center">
              <p>Childs(${TotalChilds})</p>
              <span>$${childPrice.toFixed(2)}</span>
            </div>
            <div class="flex justify-between items-center font-semibold">
              <p>Total(${Number(totalAdults) + Number(TotalChilds)})</p>
              <span>$${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div
          class="mt-8 pt-8 sm:pt-4 border-t -mx-8 px-8 flex flex-col sm:flex-row justify-end leading-relaxed"
        >
          <button
            class="close-flight-popup px-8 py-3 sm:py-2 rounded border border-gray-400 hover:bg-gray-200 transition duration-300"
          >
            Close
          </button>
          <button
          id="book-btn"
            class="font-bold mt-4 sm:mt-0 sm:ml-4 px-8 py-3 sm:py-2 rounded bg-[#09203C] text-gray-100 hover:bg-[#092030] transition duration-300 text-center"
          >
            Book
          </button>
        </div>
      </div>
    `;
    document
      .querySelectorAll(".close-flight-popup")
      .forEach((item) => item.addEventListener("click", closeFlightPopup));
    document.getElementById("book-btn").onclick = () => {
      const bookingData = {
        flightData,
        user,
        totalAdults: totalAdults != 0 && totalAdults != "" ? totalAdults : 1,
        TotalChilds: TotalChilds != 0 && TotalChilds != "" ? TotalChilds : 0,
        total,
        time: Date(),
      };
      closeFlightPopup();
      checkOut(bookingData);
    };
    openFlightPopup();
  };

  const tooltip = document.getElementById("tooltip"),
    setValue = () => {
      const newValue = Number(
          ((range.value - range.min) * 100) / (range.max - range.min)
        ),
        newPosition = 16 - newValue * 0.32;
      price = range.value;
      tooltip.innerHTML = `<span>${range.value}</span>`;
      tooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;
      document.documentElement.style.setProperty(
        "--range-progress",
        `calc(${newValue}% + (${newPosition}px))`
      );
    };
  range.value = range.max;
  setValue();
  range.addEventListener("input", () => {
    setValue();
    makeCards();
  });
  // const phone = document.getElementById("phone");
  // const userName = document.getElementById("user-name");

  const from = document.getElementById("from");
  const to = document.getElementById("to");
  const startDate = document.getElementById("depart");

  const fromError = document.getElementById("from-error");
  const torror = document.getElementById("to-error");
  const departError = document.getElementById("depart-error");
  const adults = document.getElementById("adults");
  // const adultsError = document.getElementById("adult-error");
  const child = document.getElementById("child");
  // const childError = document.getElementById("child-error");
  let flightId = 1;

  document.getElementById("flight-search-btn").onclick = () => {
    if (from.value.trim() == "") {
      fromError.textContent = "This field is required!!";
    } else if (to.value.trim() == "") {
      torror.textContent = "This field is required!!";
    } else if (startDate.value == "") {
      departError.innerText = "This field is required!!";
    } else {
      history.replaceState(
        {},
        "",
        `?from=${from.value}&to=${to.value}&depart=${startDate.value}&adults=${adults.value}&childs=${child.value}`
      );
      makeCards();
    }
  };

  /* YOU DONT NEED THESE, these are just for the popup you see */

  function closeFlightPopup() {
    document.querySelector(".flight-popup").classList.add("hidden");
  }
  function openFlightPopup() {
    document.querySelector(".flight-popup").classList.remove("hidden");
  }
  const checkOut = (bookingData) => {
    modal.innerHTML = `
    <div class="bg-white max-w-lg w-full rounded-md">
        <div
          class="p-3 flex items-center justify-between border-b border-b-gray-300"
        >
          <h3 class="font-semibold text-xl">Make Payment</h3>
          <span class="modal-close cursor-pointer text-3xl">×</span>
        </div>
        <div class="p-3 border-b border-b-gray-300">
          <div class="flex items-center justify-between">
            <span>Name</span>
            <span>${bookingData.user.username}</span>
          </div>
          <div
            class="flex items-center justify-between border-b border-b-gray-300 pb-2"
          >
            <span>Phone</span>
            <span>${bookingData.user.phone}</span>
          </div>
          <div class="flex items-center font-semibold justify-between pt-2">
            <span>Total</span>
            <span>$${bookingData.total.toFixed(2)}</span>
          </div>
        </div>
        <div class="p-3 flex items-center justify-start">
          <div>
            <button
              id="checkout"
              class="text-sm text-white bg-[#09203C] rounded-md px-4 py-2"
            >
              Make payment
            </button>
            <button
              class="modal-close text-sm text-gray-500 border rounded-md px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    `;
    // Open modal
    modal.style.display = "flex"; // Show modal
    x.style.overflow = "hidden"; //Disable scroll on body

    // Select and trigger all close buttons
    for (var i = 0; i < modalClose.length; i++) {
      modalClose[i].addEventListener("click", function () {
        modal.style.display = "none"; // Hide modal
        x.style.overflow = "auto"; // Active scroll on body
      });
    }
    document.getElementById("checkout").addEventListener("click", () => {
      let users = getListOfUsers();
      const user = JSON.parse(localStorage.getItem("currentUser"));

      const usersData = users.find((item) => item.phone == user.phone);
      if (usersData.history) {
        usersData.history = [...usersData.history, bookingData];
      } else {
        usersData.history = [{ ...bookingData }];
      }
      users = users.map((person) => {
        if (person.phone == usersData.phone) {
          return { ...usersData };
        } else {
          return person;
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
      sendNotification("success", "You flight booked successfully!!");
      location = "/src/history.html";
    });
    // Close modal when click away from modal
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none"; // Hide modal
        x.style.overflow = "auto"; // Active scroll on body
      }
    };
  };
});
