import { productsData } from "../mock/productData.js";
import {
  setNavBar,
  getCartItems,
  totalCartItem,
  getcurrentUser,
  addToCart,
} from "./helper.js";
import { sendNotification } from "./customNotification.js";
let cartProducts = [];
let subTotalPrice = 0;

const makeCartItem = () => {
  const cartItem = getCartItems();
  const cartWrapper = document.getElementsByClassName("cart-item-wrapper")[0];

  // const returnPolicy = document.getElementsByClassName("returnPolicy")[0];
  const subTotal = document.getElementsByClassName("subtotal");
  let productsInCart = [];
  if (cartItem)
    for (let index = 0; index < productsData.length; index++) {
      Object.keys(cartItem).map((item) => {
        if (item == productsData[index].id) {
          productsInCart.push({
            ...productsData[index],
            itemInCart: cartItem[item],
          });
        }
      });
    }
  cartProducts = productsInCart;
  subTotalPrice = productsInCart
    .reduce((accumulator, currentValue) => {
      return Number(
        (accumulator +=
          Number(currentValue.price) * Number(currentValue.itemInCart))
      );
    }, 0)
    .toFixed(2);
  const getOption = (stock, value) => {
    let options = "";
    for (let i = 1; i <= stock; i++) {
      options += `
      <option value="${i}" ${
        value === i ? "selected" : ""
      } class="">${i}</option>
      `;
    }
    return options;
  };
  const makeOption = (id, stock, items) => {
    return `  <select class="count p-1 appearance-none cart-quntity h-full  rounded text-[#1A374D]
               w-20 bg-gray-200 border-none outline-none 
             right-2 top-[6px]" name="count" data-product="${id}"  >${getOption(
      stock,
      items
    )}</select> `;
  };

  const ItemCartItem = productsInCart.map((item) => {
    return `
              <div class="cart-item mt-2 flex gap-1 md:gap-5 pt-5 pl-5" data-product="${
                item.id
              }">
              <div class="image p-2 mr-3 md:mr-0 md:pl-[10px] h-[150px] 1-[150px] md:h-[300px] md:w-[300px]">
                <img
                class="w-full h-full object-contain"
                  src="${item.images[0]}"
                  alt=""
                />
              </div>
              <div class="flex flex-1 flex-col gap-1">
                <h2 class="text-[22px] md:text-[28px]">${item.title}</h2>
                <div class="category">${item.category}</div>
                <div class="in-stoke">${item.availabilityStatus}</div>
                <div class="shipping-info">${item.shippingInformation}</div>
                <div class="flex items-center gap-[10px]">
                  <button class="remove cart-btn w-[30px] h-[30px] flex justify-center items-center text-black" value="-" data-product="${
                    item.id
                  }">-</button>
                <div class="relative ">
                ${makeOption(item.id, item.stock, item.itemInCart)}
                <div class="pointer-events-none absolute right-[6px]  top-0 bottom-0 flex items-center px-2  justify-center">
                  <svg class="h-4 w-4 fill-[#1A374D]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                   </svg>
                </div>
             </div>
                 
                  <button class="add cart-btn w-[30px] flex justify-center items-center h-[30px]" value="+" data-product="${
                    item.id
                  }">+</button> |
                  <span class="cart-btn cursor-pointer" data-product="${
                    item.id
                  }" value="delete">Delete</span>
                </div>
              </div>
              <div class="price text-end justify-end md:justify-normal text-[28px] flex items-start w-[300px]">
                  <div class="md:w-[150px]"> $ ${item.price} </div>
                
                  <div class="product-price hidden md:block md:w-[150px]">$${Number(
                    setPrice(Number(item.price), Number(item.itemInCart))
                  ).toFixed(2)}
                  </div>
            </div>
            </div>
  `;
  });

  const subtotalItem = `
             <div class="subtot text-[20px] ${
               totalCartItem() == 0 ? "hidden" : ""
             }">
              Subtotal (<span class="total-item-in-cart">${totalCartItem()}</span> item):
              <span class="price text-[28px] sub-total">$${subTotalPrice}</span>
            </div>
  `;
  const productTable = `
    <div class="rounded-[4%] p-[2%]">
  <div class="bg-[#406882] text-white p-[1%] mb-2 rounded">
    <h2 class="text-center "> Your Order</h2>
  </div>
  <div class="content">
    <table class="w-full border" >
      <tr class="text-center">
        <th>Image</th>
        <th>Price</th>
        <th>Quntity</th>
        <th>Total</th>
      </tr>
      ${productsInCart
        .map(
          ({ images, price, itemInCart }) =>
            `
      <tr class="text-center">
        <td class="text-center"><img class="m-auto h-24 w-26 object-contain" src="${
          images[0]
        }" width="80px" alt="this is image apple" /></td>
        <td class="text-center">$${price}</td>
        <td class="cart-item-count text-center">${itemInCart}</td>
        <td class="text-center">${setPrice(price, itemInCart)}</td>
  
      </tr>
      `
        )
        .join("")}
      <tr class="text-center" >
       
        <td class="total text-end pr-2 " colspan="4"><span class="subtot">
                Subtotal (<span class="total-item-in-cart">${totalCartItem()}</span> item):
                <span class="price text-[28px] sub-total">$${subTotalPrice}</span>
              </span></td>
      </tr>
    </table>
  </div>

</div>
  `;
  let html = `
  <div class="w-full h-[400px] flex flex-col gap-5 items-center justify-center">
      <h1 class="text-3xl">You don't have any product in your cart</h1>
       <button class="w-1/2 lg:w-[30%]" id="go-to-home">Go to shopping</button>
  </div>
`;
  if (productsInCart.length != 0) {
    cartWrapper.innerHTML = ItemCartItem.join("");

    // returnPolicy.innerHTML = productsInCart[0].returnPolicy;
    document.getElementById("modalContant").innerHTML = productTable;
  } else {
    document.getElementsByClassName("cart-payment")[0].style.display = "none";
    cartWrapper.innerHTML = html;
  }
  for (let index = 0; index < subTotal.length; index++) {
    subTotal[index].innerHTML =
      productsInCart.length != 0 ? subtotalItem : "Subtotal (0 item): $0.0";
  }
};
const setPrice = (price, qun) => {
  return price * qun;
};

const SponsoredItems = () => {
  const element = document.getElementsByClassName("ads-card")[0];
  const sponsoredItem = productsData.slice(3, 8);

  const html = sponsoredItem.map(({ id, title, images, price }) => {
    return `
             <div class="items flex gap-2">
                <img
                class="w-[100px] h-[100px] object-contain" 
                src="${images[0]}"
                alt="" />
                <div class="ads-item-wrapper">
                  <div class="item-title">${title}</div>
                  <div class="item-price">$${price}</div>
                  <button class="add-to-ads-cart w-fit p-2" value="${id}">Add to cart</button>
                </div>
              </div>
  `;
  });
  element.innerHTML = html.join("");
};

document.addEventListener("DOMContentLoaded", () => {
  setNavBar(false);
  makeCartItem();
  SponsoredItems();

  document.querySelectorAll(".add-to-ads-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      addToCart(e.target.value);
      location = "/src/cart.html";
    });
  });
  //   MODEL

  document.getElementById("checkout").onclick = function () {
    clickFunction();
  };
  const closeBtns = document.getElementsByClassName("close-btn");

  closeBtns[0].onclick = () => {
    closeFunction();
  };
  closeBtns[1].onclick = () => {
    confirmPurchase();
  };
  const confirmPurchase = () => {
    const userData = JSON.parse(
      localStorage.getItem(getcurrentUser().toString())
    );
    const cartItems = document.getElementsByClassName("cart-item");
    const cartItem = Object.keys(getCartItems());

    for (let i = 0; i < cartItem.length; i++) {
      cartItem[i] = {
        id: cartItem[i],
        price: cartItems[i].childNodes[5].childNodes[1].textContent,
      };
    }
    if (userData.orders) {
      userData.orders.push({
        lineItem: cartItem,
        date: Date(),
        subTotalPrice,
        orderId: new Date().getUTCMilliseconds(),
      });
    } else {
      userData.orders = [];
      userData.orders.push({
        lineItem: cartItem,
        date: Date(),
        subTotalPrice,
        orderId: new Date().getUTCMilliseconds(),
      });
    }

    delete userData.products;
    for (let i = 0; i < cartItems.length; i++) {
      cartItems[i].remove();
    }
    cartProducts = [];
    localStorage.setItem(getcurrentUser().toString(), JSON.stringify(userData));
    location = "/src/orderhistory.html";
    closeFunction();
  };
  var showModal = document.getElementById("mainModal");

  function clickFunction() {
    // alert("btn click function");
    showModal.classList.remove("hidden");
    showModal.classList.add("flex");
  }

  function closeFunction() {
    // alert("close Button");
    showModal.classList.remove("flex");
    showModal.classList.add("hidden");
  }

  //   + - buttons

  document.querySelectorAll(".cart-btn").forEach((button) => {
    button.onclick = function (e) {
      e.stopPropagation();
      const product = this.dataset.product;
      manageCart(e, product);
    };
  });

  if (document.getElementById("go-to-home"))
    document.getElementById("go-to-home").addEventListener("click", (e) => {
      location = `/src/`;
    });
  document.querySelectorAll(".count").forEach((select) => {
    select.addEventListener("change", (e) => {
      e.stopPropagation();

      const product = e.target.dataset.product;
      manageCart(e, product, true);
    });
  });
  const manageCart = (e, product, isSelect = false) => {
    let userData = JSON.parse(
      localStorage.getItem(getcurrentUser().toString())
    );

    const opration = e.target.value;

    const cartItem = getCartItems();
    const stock = productsData.find((item) => item.id == product).stock;
    const cartItems = document.getElementsByClassName("cart-item");
    if (opration == "+") {
      if (cartItem[product] >= stock) {
        sendNotification("error", "You can not add more product");
        return;
      } else {
        cartItem[product]++;
      }
    } else if (opration == "-") {
      if (cartItem[product] <= 1) {
        for (let i = 0; i < cartProducts.length; i++) {
          if (cartItems[i].dataset.product == product) {
            cartItems[i].remove();
            break;
          }
        }
        delete cartItem[product];
        cartProducts = cartProducts.filter((item) => item.id != product);
      } else cartItem[product]--;
    } else if (!isSelect) {
      delete cartItem[product];
      for (let i = 0; i < cartProducts.length; i++) {
        if (cartItems[i]?.dataset?.product == product) {
          cartItems[i].remove();
          break;
        }
      }
      cartProducts = cartProducts.filter((item) => item.id != product);
    } else {
      cartItem[product] = Number(opration);
    }

    userData.products = { ...cartItem };

    localStorage.setItem(getcurrentUser().toString(), JSON.stringify(userData));

    const span = document.querySelectorAll(".count");

    const cartItemCount = document.querySelectorAll(".cart-item-count");

    const subtotal = document.getElementsByClassName("sub-total");
    const totalCartTemp = document.getElementsByClassName("total-item-in-cart");
    const productPrice = document.getElementsByClassName("product-price");

    for (let i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].id == product) {
        cartProducts[i].itemInCart = cartItem[product];
      }
    }

    const subTotalPrice = cartProducts
      .reduce((accumulator, currentValue) => {
        return Number(
          (accumulator +=
            Number(currentValue.price) * Number(currentValue.itemInCart))
        );
      }, 0)
      .toFixed(2);
    if (cartProducts.length != 0) {
      for (let index = 0; index < cartProducts.length; index++) {
        if (span[index].dataset.product == product) {
          span[index].value = cartItem[product];
          cartItemCount[index].innerHTML = cartItem[product];
        }

        productPrice[index].innerHTML = `$${Number(
          Number(cartProducts[index].price) *
            Number(cartProducts[index].itemInCart)
        ).toFixed(2)}`;
      }
    }
    for (let i = 0; i < subtotal.length; i++) {
      subtotal[i].innerHTML = "$" + subTotalPrice;
      totalCartTemp[i].innerHTML = totalCartItem();
    }
    setNavBar(false);
    if (cartProducts.length == 0) {
      makeCartItem();
    }
  };
});
