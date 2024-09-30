import { setNavBar } from "./helper.js";
import { productsData } from "../mock/productData.js";
import { addToCart } from "./helper.js";
document.addEventListener("DOMContentLoaded", () => {
  setNavBar(false);
  makePage();
  const imgs = document.querySelectorAll(".img-select a");
  console.log(imgs);

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
});
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
const {
  title,
  images,
  description,
  category,
  price,
  discountPercentage,
  rating,
  warrantyInformation,
  brand,
  stock,
  shippingInformation,
  returnPolicy,
  reviews,
  availabilityStatus,
} = productsData.find((item) => item.id.toString() === productId.toString());
const makePage = () => {
  const imgShowcase = document.querySelector(".img-showcase");
  const thumbnailImagesWrapper = document.querySelector(".img-select");
  const image = images.map((item) => {
    return ` <img
                src="${item}"
                alt="Product image"
              />
              `;
  });
  if (images.length > 1) {
    const thumbnailImages = images.map((item, id) => {
      return `
       <div class="img-item">
                <a href="#" data-id="${id}">
                  <img
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
  const starRating = ` <div class="product-rating">
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
        <i
          class="fa fa-star-o"
          style="/*position: absolute;*/ width: 100%"
        ></i>
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
        <i
          class="fa fa-star-o"
          style="/*position: absolute;*/ width: 100%"
        ></i>
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
        <i
          class="fa fa-star-o"
          style="/*position: absolute;*/ width: 100%"
        ></i>
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
        <i
          class="fa fa-star-o"
          style="/*position: absolute;*/ width: 100%"
        ></i>
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
        <i
          class="fa fa-star-o"
          style="/*position: absolute;*/ width: 100%"
        ></i>
      </div>
    </div>
  </div>
 
</div>`;
  // product
  const productContent = document.querySelector(".product-content");
  const productDetails = `
  <h2 class="product-title">${title}</h2>
          ${starRating}

          <div class="product-price">
            <p class="last-price">Old Price: <span>$${Number(
              price * discountPercentage
            ).toFixed(2)}</span></p>
            <p class="new-price">New Price: <span>$${price} (${discountPercentage}%)</span></p>
          </div>

          <div class="product-detail">
            <h2>about this item:</h2>
            <p>
             ${description}
            </p>

            <ul>
              <li>Brand: <span>${brand}</span></li>
              <li>Available: <span>${availabilityStatus}</span></li>
              <li>Category: <span>${category}</span></li>
              <li>Warranty: <span>${warrantyInformation}</span></li>
               <li>Return policy: <span>${returnPolicy}</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul>
          </div>

          <div class="purchase-info">
            <input type="number" min="0" value="1" />
            <button type="button" class="btn">
              Add to Cart <i class="fas fa-shopping-cart"></i>
            </button>
            <button type="button" class="btn">Compare</button>
          </div>
  `;
  productContent.innerHTML = productDetails;
};
