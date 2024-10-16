import { getUserAccountType, listOfProducts, setNavBar } from "./helper.js";

import { addToCart } from "./helper.js";
let quntity = 1;
document.addEventListener("DOMContentLoaded", () => {
  setNavBar(false);
});
const urlParams = new URLSearchParams(window.location.search);
const request = new XMLHttpRequest();
request.onload = function () {
  if (this.status === 404) {
    const data = listOfProducts().find(
      (item) => item.id == urlParams.get("productId")
    );
    if (data) {
      makePage(data);
    } else
      document.getElementById(
        "product-detail-wrapper"
      ).innerHTML = ` <div class="h-[450px]">
        <p>Product with id ${urlParams.get("productId")} not found</p>
      </div>`;
    return;
  }
  if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
    const data = JSON.parse(request.responseText);

    makePage(data);
  }
};

request.open(
  "GET",
  `https://dummyjson.com/products/${urlParams.get("productId")}`,
  true
);
try {
  request.send();
} catch (error) {
  console.log("error: ", error);
}

const makePage = (data) => {
  const {
    title,
    images,
    description,
    category,
    price,
    discountPercentage,
    rating,
    warrantyInformation,
    id,
    brand,
    stock,
    shippingInformation,
    returnPolicy,
    reviews,
    availabilityStatus,
  } = data;
  const imgShowcase = document.querySelector(".img-showcase");
  const thumbnailImagesWrapper = document.querySelector(".img-select");
  const image = images.map((item) => {
    return ` <img
                class="min-w-full w-full h-full object-contain block"
                src="${item}"
                alt="Product image"
              />
              `;
  });

  if (images.length > 1) {
    const thumbnailImages = images.map((item, index) => {
      return `
       <div class="img-item h-full m-1 odd:m-0 even:m-0 hover:opacity-85">
                <a href="#" data-id="${index + 1}">
                  <img
                 class="h-full w-full"
                    src="${item}"
                    alt="product image"
                  />
                </a>
              </div>
      `;
    });
    thumbnailImagesWrapper.innerHTML = thumbnailImages.join("");
  }

  imgShowcase.innerHTML = image.join("");
  const starRating = `
  <div class="flex items-center">
  ${rating}&nbsp;
  <div
    class="stars-container"
    style="font-size: 20px; color: orange; display: flex"
    data-rate="${rating}"
  >
    <div
      class="star-container"
      style="
        margin-right: 5px;
        position: relative;
        width: auto; /*width: 1em;*/ /*height: 1em;*/
      "
    >
      <div
        class="starfill"
        style="
          position: absolute;
          width: 100%;
          overflow: hidden; /*height: 1em;*/
        "
      >
        <i
          class="fa fa-star"
          style="/*position: absolute;*/ /*width: 50%;*/"
        ></i>
      </div>
      <div style="overflow: hidden" veiwbox="0 0 15 15">
        <i class="fa fa-star-o" style="/*position: absolute;*/ width: 100%"></i>
      </div>
    </div>
    <div
      class="star-container"
      style="
        margin-right: 5px;
        position: relative;
        width: auto; /*width: 1em;*/ /*height: 1em;*/
      "
    >
      <div
        class="starfill"
        style="
          position: absolute;
          width: 100%;
          overflow: hidden; /*height: 1em;*/
        "
        veiwbox="0 0 15 15"
      >
        <i
          class="fa fa-star"
          style="/*position: absolute;*/ /*width: 50%;*/"
        ></i>
      </div>
      <div style="overflow: hidden" veiwbox="0 0 15 15">
        <i class="fa fa-star-o" style="/*position: absolute;*/ width: 100%"></i>
      </div>
    </div>
    <div
      class="star-container"
      style="
        margin-right: 5px;
        position: relative;
        width: auto; /*width: 1em;*/ /*height: 1em;*/
      "
    >
      <div
        class="starfill"
        style="
          position: absolute;
          width: 100%;
          overflow: hidden; /*height: 1em;*/
        "
        veiwbox="0 0 15 15"
      >
        <i
          class="fa fa-star"
          style="/*position: absolute;*/ /*width: 50%;*/"
        ></i>
      </div>
      <div style="overflow: hidden" veiwbox="0 0 15 15">
        <i class="fa fa-star-o" style="/*position: absolute;*/ width: 100%"></i>
      </div>
    </div>
    <div
      class="star-container"
      style="
        margin-right: 5px;
        position: relative;
        width: auto; /*width: 1em;*/ /*height: 1em;*/
      "
    >
      <div
        class="starfill"
        style="position: absolute; width: 100%; overflow: hidden"
        veiwbox="0 0 15 15"
      >
        <i
          class="fa fa-star"
          style="/*position: absolute;*/ /*width: 50%;*/"
        ></i>
      </div>
      <div style="overflow: hidden" veiwbox="0 0 15 15">
        <i class="fa fa-star-o" style="/*position: absolute;*/ width: 100%"></i>
      </div>
    </div>
    <div
      class="star-container"
      style="
        margin-right: 5px;
        position: relative;
        width: auto; /*width: 1em;*/ /*height: 1em;*/
      "
    >
      <div
        class="starfill"
        style="
          position: absolute;
          width: 88%;
          overflow: hidden; /*height: 1em;*/
        "
        veiwbox="0 0 15 15"
      >
        <i
          class="fa fa-star"
          style="/*position: absolute;*/ /*width: 50%;*/"
        ></i>
      </div>
      <div style="overflow: hidden" veiwbox="0 0 15 15">
        <i class="fa fa-star-o" style="/*position: absolute;*/ width: 100%"></i>
      </div>
    </div>
  </div>
</div>
  `;
  // product
  const productContent = document.querySelector(".product-content");
  const productDetails = `
  <h2 class="product-title text-2xl md:text-5xl capitalize font-semibold text-[#1A374D] my-4 
  after:absolute after:content-[""] after:left-0 after:bottom-0 after:h-1 after:w-20 after:bg-[#12263a]
  ">${title}</h2>
          ${starRating}

          <div class="product-price my-4 text-base font-semibold">
            <p class="last-price ">Old Price: <span class="font-normal text-[#f64749] line-through">$${Number(
              price * discountPercentage
            ).toFixed(2)}</span></p>
            <p class="new-price">New Price: <span class="text-[#1A374D]">$${price} (${discountPercentage}%)</span></p>
          </div>

          <div class="product-detail">
            <h2 class="capitalize text-[#406882] pb-2">about this item:</h2>
            <div id="description">
             ${description}
            </div>
            <span id="btn-text" class="text-[#406882] cursor-pointer" >Show more</span>
            <ul class="my-4 text-[0.9rem]" >
              <li class="m-0 list-none  flex   my-2  gap-1 font-semibold">
           
                   Brand: <span class="font-normal">${brand}</span></li>
              <li class="m-0 list-none  flex   my-2  gap-1 font-semibold">Available: <span class="font-normal">${availabilityStatus}</span></li>
              <li class="m-0 list-none  flex   my-2  gap-1 font-semibold"> 
              
              Category: <span class="font-normal">${category}</span></li>
              <li class="m-0 list-none  flex   my-2  gap-1 font-semibold">
             
              Warranty: <span class="font-normal">${warrantyInformation}</span></li>
               <li class="m-0 list-none  flex   my-2  gap-1 font-semibold">
               
               Return policy: <span class="font-normal">${returnPolicy}</span></li>
              <li class="m-0 list-none  flex   my-2  gap-1 font-semibold">
           
              Shipping Fee: <span class="font-normal">Free</span></li>
            </ul>
          </div>

          <div class="my-8 mx-0 flex gap-[10px] items-center">
          ${
            stock != 0
              ? `<div class="relative text-[24px]"><select class="appearance-none cart-quntity h-full p-1 rounded text-[#1A374D]
               w-20 bg-gray-200 border-none outline-none 
             right-2 top-[6px]" name="count" id="cart-quntity"></select> 
                <div class="pointer-events-none absolute right-[6px] top-0 bottom-0 flex items-center px-2  justify-center">
                  <svg class="h-4 w-4 fill-[#1A374D]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                   </svg>
                </div>
             </div>
            <button id="add-to-cart" type="button" class="btn border-[1.5px] border-[#ddd] rounded-xl text-center p-2 outline-none mr-1">
              Add to Cart <i class="fas fa-shopping-cart"></i>
            </button>`
              : `<p class="btn">Out of stock</p>`
          }
             
          </div>
  `;
  productContent.innerHTML = productDetails;

  const imgs = document.querySelectorAll(".img-select a");

  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;

    document.querySelector(".img-showcase").style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }

  window.addEventListener("resize", slideImage);

  if (stock != 0) {
    document.getElementById("cart-quntity").addEventListener("change", (e) => {
      quntity = e.target.value;
    });
    document.getElementById("add-to-cart").addEventListener("click", () => {
      addToCart(id, stock);
      setNavBar(false);
    });
  }

  const cartQuentity = document.getElementById("cart-quntity");
  for (let i = 1; i <= stock; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", i);

    const value = document.createTextNode(i);
    option.appendChild(value);
    cartQuentity.appendChild(option);
  }
  // expanded text
  let length = 100,
    div = document.getElementById("description");
  const text = div.innerHTML;
  if (div) {
    let trunc = div.innerHTML;

    if (trunc.length > length) {
      (trunc = trunc.substring(0, length)), (trunc += "...");
      trunc.replace(/\w+$/, "");

      div.innerHTML = trunc;
    }

    document.getElementById("btn-text").addEventListener("click", (e) => {
      if (e.target.innerHTML == "Show more") {
        div.innerHTML = text;
        e.target.innerHTML = "Show less";
      } else {
        div.innerHTML = trunc;
        e.target.innerHTML = "Show more";
      }
    });
  }
  // star
  const stars_container = document.getElementsByClassName("stars-container");
  for (let element of stars_container) {
    let rate = element.getAttribute("data-rate");
    let starsfill = element.getElementsByClassName("starfill");
    for (let i = 0; i < 5; i++) {
      let star = element.getElementsByClassName("starfill")[i];
      if (rate > i) {
        if (rate < i + 1) {
          // If the rating is between i and i+1, set the width of the star to represent the fractional part
          star.style.width = `${(rate - i) * 100}%`;
        } else {
          // If the rating is greater than i, set the width of the star to 100%
          star.style.width = "100%";
        }
      } else {
        // If the rating is less than i, set the width of the star to 0%
        star.style.width = "0%";
      }
    }
  }
};
