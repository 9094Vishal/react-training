import {
  getDurartion,
  getLogedInUser,
  getTime,
  loadNavBar,
  sendOtp,
} from "./helper.js";

document.addEventListener("DOMContentLoaded", () => {
  loadNavBar();
  createOrderCard();

  if (document.getElementById("go-to-home"))
    document.getElementById("go-to-home").addEventListener("click", (e) => {
      location = `/src/`;
    });
});

const createOrderCard = async () => {
  const user = getLogedInUser();
  const history = user.history;

  let html = `
    <div class="w-full h-full text-center flex flex-col gap-5 items-center justify-center">
        <h1 class="text-3xl">You don't have any booking</h1>
         <p class="w-[25%] font-bold cursor-pointer" id="go-to-home">Continue booking</p>
    </div>
  `;
  const orderCard = document.querySelector(".order-card-holder");

  if (history) {
    html = history
      .map(({ TotalChilds, total, totalAdults, flightData, time }) => {
        const {
          airline,
          id,
          arrivalCity,
          arrivalTime,
          departureCity,
          departureTime,
          destination,
          imageUrl,
          estimatedTravelTime,
          flightNumber,
        } = flightData;

        return `
         <div class=" border border-[#a0a0a0] rounded-lg">
            <div class="order-card-top rounded-t-lg p-[10px] bg-[#e5e4e2] sm:flex sm:justify-between">
              <div class="top-left flex sm:w-1/2 justify-between">
                <div class="top-detail flex flex-col">
                  <span>Booking Date</span>
                  <span>${new Date(time).toISOString().split("T")[0]}</span>
                </div>
                <div class="top-detail flex flex-col">
                  <span>TOTAL</span>
                  <span>&#8377; ${total.toFixed(2)}</span>
                </div>
                <div class="top-detail flex flex-col">
                  <span>Traveller</span>
                  <span>${user.username}</span>
                </div>
              </div>
              
              <div class="top-right flex flex-col">
                <div class="top-detail flex sm:items-end flex-col">
                  <span>Flight #${sendOtp()}</span>
               
                </div>
              </div>
            </div>
            <div class="order-card-bottom p-[10px] flex justify-between">
              <div class="bottom-left w-full">
               
                <!-- all products in order -->
              
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
                
              </div>
             
            </div>
          </div>
    `;
      })
      .reverse()
      .join("");
  } else {
    orderCard.classList.add("h-[400px]");
    orderCard.classList.add("w-full");
  }
  orderCard.innerHTML = html;
};
