import { productsData } from "../mock/productData.js";
import {
  setNavBar,
  getCartItems,
  totalCartItem,
  getcurrentUser,
  addToCart,
} from "./helper.js";
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

  const ItemCartItem = productsInCart.map((item) => {
    return `
              <div class="cart-item" data-product="${item.id}">
              <div class="image">
                <img
                  src="${item.images[0]}"
                  alt=""
                />
              </div>
              <div class="item-detail">
                <h2 class="name">${item.title}</h2>
                <div class="category">${item.category}</div>
                <div class="in-stoke">${item.availabilityStatus}</div>
                <div class="shipping-info">${item.shippingInformation}</div>
                <div class="no-of-item">
                  <button class="remove cart-btn" value="-" data-product="${
                    item.id
                  }">-</button>
                  <span class="count" data-product="${item.id}">${
      item.itemInCart
    }</span>
                  <button class="add cart-btn" value="+" data-product="${
                    item.id
                  }">+</button> |
                  <span class="cart-btn delete-cart-product" data-product="${
                    item.id
                  }" value="delete">delete</span>
                </div>
              </div>
              <div class="price ">
              <div> $${item.price}</div>
            
              <div class="product-price">$${Number(
                setPrice(Number(item.price), Number(item.itemInCart))
              ).toFixed(2)}</div>
            </div>
            </div>
  `;
  });
  const subtotalItem = `
             <div class="subtot">
              Subtotal (${totalCartItem()} item):
              <span class="price sub-total">$${subTotalPrice}</span>
            </div>
  `;
  const productTable = `
    <div class="product-table">
  <div class="header">
    <h2> Your Order</h2>
  </div>
  <div class="content">
    <table border="1">
      <tr>
     
        <th>Image</th>
        <th>Price</th>
        <th>Quntity</th>
        <th>Total</th>
      </tr>
      ${productsInCart
        .map(
          ({ images, price, itemInCart }) =>
            `
      <tr>
        <td><img src="${
          images[0]
        }" width="80px" alt="this is image apple" /></td>
        <td>$${price}</td>
        <td class="cart-item-count">${itemInCart}</td>
        <td>${setPrice(price, itemInCart)}</td>
  
      </tr>
      `
        )
        .join("")}
      <tr >
       
        <td class="total" colspan="4"><span class="subtot">
                Subtotal (${totalCartItem()} item):
                <span class="price sub-total">$${subTotalPrice}</span>
              </span></td>
      </tr>
    </table>
  </div>

</div>
  `;
  if (productsInCart.length != 0) {
    cartWrapper.innerHTML = ItemCartItem.join("");

    // returnPolicy.innerHTML = productsInCart[0].returnPolicy;
    document.getElementById("modalContant").innerHTML = productTable;
  } else {
    document.getElementsByClassName("cart-payment")[0].style.display = "none";
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
  const sponsoredItem = productsData.slice(0, 5);

  const html = sponsoredItem.map(({ id, title, images, price }) => {
    return `
             <div class="items">
                <img
                src="${images[0]}"
                alt="" />
                <div class="ads-item-wrapper">
                  <div class="item-title">${title}</div>
                  <div class="item-price">$${price}</div>
                  <button class="add-to-ads-cart" value="${id}">Add to cart</button>
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
      location = "/cart.html";
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
    console.log(userData.orders);

    delete userData.products;
    for (let i = 0; i < cartItems.length; i++) {
      cartItems[i].remove();
    }
    cartProducts = [];
    localStorage.setItem(getcurrentUser().toString(), JSON.stringify(userData));
    location = "/orderhistory.html";
    closeFunction();
  };
  var showModal = document.getElementById("mainModal");

  function clickFunction() {
    // alert("btn click function");
    showModal.classList.remove("modalToggle");
  }

  function closeFunction() {
    // alert("close Button");
    showModal.classList.add("modalToggle");
  }

  //   + - buttons

  document.querySelectorAll(".cart-btn").forEach((button) => {
    button.onclick = function (e) {
      e.stopPropagation();

      let userData = JSON.parse(
        localStorage.getItem(getcurrentUser().toString())
      );

      const product = this.dataset.product;
      const opration = e.target.value;
      const cartItem = getCartItems();
      const stock = productsData.find((item) => item.id == product).stock;
      const cartItems = document.getElementsByClassName("cart-item");
      if (opration == "+") {
        if (cartItem[product] >= stock) {
          alert("You can not add more product");
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
      } else {
        delete cartItem[product];
        for (let i = 0; i < cartProducts.length; i++) {
          if (cartItems[i]?.dataset?.product == product) {
            cartItems[i].remove();
            break;
          }
        }
        cartProducts = cartProducts.filter((item) => item.id != product);
      }

      userData.products = { ...cartItem };

      localStorage.setItem(
        getcurrentUser().toString(),
        JSON.stringify(userData)
      );

      const span = document.querySelectorAll(".count");

      const cartItemCount = document.querySelectorAll(".cart-item-count");

      const subtotal = document.getElementsByClassName("sub-total");
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
            span[index].innerHTML = cartItem[product];
            cartItemCount[index].innerHTML = cartItem[product];
          }

          productPrice[index].innerHTML = `$${Number(
            Number(cartProducts[index].price) *
              Number(cartProducts[index].itemInCart)
          ).toFixed(2)}`;
        }
        console.log(span[cartProducts.length]);
      }
      for (let i = 0; i < subtotal.length; i++) {
        subtotal[i].innerHTML = "$" + subTotalPrice;
      }
      setNavBar(false);
    };
  });
});
