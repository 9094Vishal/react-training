import { getcurrentUser, listOfProducts, setNavBar } from "./helper.js";
import { productsData } from "../mock/productData.js";
import { sendNotification } from "./customNotification.js";
document.addEventListener("DOMContentLoaded", () => {
  setNavBar(false);
  createOrderCard();

  if (document.getElementById("go-to-home"))
    document.getElementById("go-to-home").addEventListener("click", (e) => {
      location = `/src/`;
    });
});

const createOrderCard = async () => {
  const orderData = JSON.parse(
    localStorage.getItem(getcurrentUser().toString())
  )?.orders;
  let orders = [];
  let html = `
    <div class="w-full h-full flex flex-col gap-5 items-center justify-center">
        <h1 class="text-3xl">You don't have any orders</h1>
         <p class="w-[25%] bg-[#406882]" id="go-to-home">Continue shopping</p>
    </div>
  `;
  const orderCard = document.querySelector(".order-card-holder");

  if (orderData) {
    const urls = [];

    let newData = [];
    orderData.forEach(({ lineItem }) => {
      const data = lineItem.forEach(({ id }) => {
        if (id <= 194) {
          urls.push(fetch(`https://dummyjson.com/products/${id}`));
        } else {
          newData = listOfProducts();
        }
      });
    });
    const responses = await Promise.all(urls);
    let respons = [];
    for (let i = 0; i < responses.length; i++) {
      respons.push(await responses[i].json());
    }

    orders = orderData.map(({ date, lineItem, orderId, subTotalPrice }) => {
      const data = lineItem.map((subItem) => {
        let data;
        if (subItem.id >= 194) {
          data = newData.find((item) => item.id == subItem.id);
        } else data = respons.find((item) => item.id == subItem.id);

        return { ...data, orderDate: subItem.date };
      });

      return { data, date, orderId, subTotalPrice };
    });

    html = orders
      .map(({ data, date, orderId, subTotalPrice }) => {
        return `
         <div class=" border border-[#a0a0a0] rounded-lg">
            <div class="order-card-top rounded-t-lg p-[10px] bg-[#e5e4e2] sm:flex sm:justify-between">
              <div class="top-left flex sm:w-1/2 justify-between">
                <div class="top-detail flex flex-col">
                  <span>ORDER PLASED</span>
                  <span>${new Date(date).toISOString().split("T")[0]}</span>
                </div>
                <div class="top-detail flex flex-col">
                  <span>TOTAL</span>
                  <span>${subTotalPrice}</span>
                </div>
                <div class="top-detail flex flex-col">
                  <span>SHIP TO</span>
                  <span>${getcurrentUser()}</span>
                </div>
              </div>
              
              <div class="top-right flex flex-col">
                <div class="top-detail flex sm:items-end flex-col">
                  <span>ORDER # ${orderId}</span>
                  <span>View order details | <span>Invoice </span></span>
                </div>
              </div>
            </div>
            <div class="order-card-bottom p-[10px] flex justify-between">
              <div class="bottom-left w-full">
               
                <!-- all products in order -->
              ${data
                .map(({ title, price, orderData, images, id }) => {
                  return `  <div class="product-details flex gap-5">
                  <img class="w-[100px] h-[100px] object-contain"
                    src="${
                      images
                        ? images[0]
                        : "https://www.pharmacybazar.in/assets/img/No_Product_Found.png"
                    }"
                    alt=""
                  />
                  <div class="details w-full flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div class="flex-1">
                    <div class="title text-xl sm:text-2xl text-[#1A374D] font-medium">${
                      title ?? "Product Now availiable"
                    }</div>
                    <div class="price text-xl sm:text-2xl font-medium">${
                      price ? "$" + price : ""
                    }</div>
                  </div>
                   
                      <button class="view-product w-fit p-[10px] rounded-2xl
                      " value="${id ?? ""}">View product</button>
                   
                  </div>
                </div>`;
                })
                .join("")}
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
  if (orderData)
    document.querySelectorAll(".view-product").forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.value) {
          location = `/src/productDetail.html?productId=${e.target.value}`;
        } else {
          sendNotification("error", "This product is not available");
        }
      });
    });
};
