import { getcurrentUser, setNavBar } from "./helper.js";
import { productsData } from "../mock/productData.js";
document.addEventListener("DOMContentLoaded", () => {
  setNavBar(false);
  createOrderCard();

  document.querySelectorAll(".view-product").forEach((button) => {
    button.addEventListener("click", (e) => {
      location = `/productDetail.html?productId=${e.target.value}`;
    });
  });
});

const createOrderCard = () => {
  const orderData = JSON.parse(
    localStorage.getItem(getcurrentUser().toString())
  ).orders;

  const orders = orderData.map(({ date, lineItem, orderId, subTotalPrice }) => {
    const data = lineItem.map((subItem) => {
      const data = productsData.find((item) => item.id == subItem.id);
      return { ...data, orderDate: subItem.date };
    });

    return { data, date, orderId, subTotalPrice };
  });

  console.log(orders);
  const orderCard = document.querySelector(".order-card-holder");
  const html = orders
    .map(({ data, date, orderId, subTotalPrice }) => {
      return `
         <div class="order-crad">
            <div class="order-card-top">
              <div class="top-left">
                <div class="top-detail">
                  <span>ORDER PLASED</span>
                  <span>${new Date(date).toISOString().split("T")[0]}</span>
                </div>
                <div class="top-detail">
                  <span>TOTAL</span>
                  <span>${subTotalPrice}</span>
                </div>
                <div class="top-detail">
                  <span>SHIP TO</span>
                  <span>${getcurrentUser()}</span>
                </div>
              </div>
              <div class="top-right">
                <div class="top-detail">
                  <span>ORDER # ${orderId}</span>
                  <span>View order details | <span>Invoice </span></span>
                </div>
              </div>
            </div>
            <div class="order-card-bottom">
              <div class="bottom-left">
               
                <!-- all products in order -->
              ${data
                .map(({ title, price, orderData, images, id }) => {
                  return `  <div class="product-details">
                  <img
                    src="${images[0]}"
                    alt=""
                  />
                  <div class="details">
                  <div>
                    <div class="title">${title}</div>
                    <div class="price">$${price}</div>
                  </div>
                    <div class="btns">
                      <button class="view-product" value="${id}">View product</button>
                    </div>
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
  orderCard.innerHTML = html;
};
