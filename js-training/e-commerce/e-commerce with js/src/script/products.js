import { productsData as products } from "../mock/productData.js";
import { setNavBar } from "./helper.js";
import { isLogdedIn } from "./helper.js";
import { moveToUp } from "./helper.js";
import { debouncing } from "./helper.js";
import { addToCart } from "./helper.js";
const itemsPerPage = 9;
let currentPage = 1;
let categoryFilter = null;
let searchValue = "";
let startRating = null;
const product = document.getElementById("products-card");
document.addEventListener("DOMContentLoaded", () => {
  isLogdedIn();
  makeProductCard(currentPage);
  setNavBar();
});

let newProductList = products;

let totalPages = Math.ceil(newProductList.length / itemsPerPage);
const pagination = document.getElementById("pagination");

const makeProductCard = (page = 1) => {
  moveToUp();
  product.innerHTML = "";
  if (newProductList.length == 0) {
    product.innerHTML = "Sorry, You have no order!!!";
  }
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageItems = newProductList.slice(startIndex, endIndex);

  pageItems.map((item) => {
    const productCrad = document.createElement("div");
    productCrad.setAttribute("class", "product-wrapper");
    productCrad.setAttribute("data", item.id);
    const images = item.images.map((image) => {
      return `  <div class="swiper-slide"><div class="swiper-slide-inside">
                    <div class="img">
                      <img
                        src="${image}"
                        alt="Image not found"
                      />
                    </div></div></div>
                  `;
    });

    productCrad.innerHTML = `
    <div>
                <div class="large-slider-container">
                  <div class="large-swiper">
                    <div class="swiper-wrapper">
                     ${images.join("")}
                      
                    </div>
                    <div class="prev"><</div>
                    <div class="next">></div>
                  </div>
                </div>		


                 <div class="product-detail-wrapper">
                  <p>Title:</p>
                  <div class="title">${item?.title}</div>
                </div>
                <div class="product-detail-wrapper">
                  <p>Category:</p>
                  <div class="category">${item.category}</div>
                </div>
                <div class="product-detail-wrapper">
                  <p>Price:</p>
                  <div class="price">$${item?.price}</div>
                </div>

                <div class="product-detail-wrapper">
                  <p>Rating:</p>
                  <div class="product-rating">${item.rating}&nbsp;
                    <div class=" stars-container" style="font-size: 20px;color:orange;display:flex;" data-rate="${
                      item.rating
                    }">
  <div class="star-container" style="margin-right: 5px;position: relative;width: auto;/*width: 1em;*//*height: 1em;*/">
    <div class="starfill" style="position: absolute;width: 100%;overflow: hidden;/*height: 1em;*/"><i class="fa fa-star" style="/*position: absolute;*//*width: 50%;*/"></i></div>
    <div style="overflow: hidden;" veiwbox="0 0 15 15"><i class="fa fa-star-o" style="/*position: absolute;*/width: 100%;"></i></div>
  </div>
  <div class="star-container" style="margin-right: 5px;position: relative;width: auto;/*width: 1em;*//*height: 1em;*/">
    <div class="starfill" style="position: absolute;width: 100%;overflow: hidden;/*height: 1em;*/" veiwbox="0 0 15 15"><i class="fa fa-star" style="/*position: absolute;*//*width: 50%;*/"></i></div>
    <div style="overflow: hidden;" veiwbox="0 0 15 15"><i class="fa fa-star-o" style="/*position: absolute;*/width: 100%;"></i></div>
  </div>
  <div class="star-container" style="margin-right: 5px;position: relative;width: auto;/*width: 1em;*//*height: 1em;*/">
    <div class="starfill" style="position: absolute;width: 100%;overflow: hidden;/*height: 1em;*/" veiwbox="0 0 15 15"><i class="fa fa-star" style="/*position: absolute;*//*width: 50%;*/"></i></div>
    <div style="overflow: hidden;" veiwbox="0 0 15 15"><i class="fa fa-star-o" style="/*position: absolute;*/width: 100%;"></i></div>
  </div>
  <div class="star-container" style="margin-right: 5px;position: relative;width: auto;/*width: 1em;*//*height: 1em;*/">
    <div class="starfill" style="position: absolute;width: 100%;overflow: hidden;" veiwbox="0 0 15 15"><i class="fa fa-star" style="/*position: absolute;*//*width: 50%;*/"></i></div>
    <div style="overflow: hidden;" veiwbox="0 0 15 15"><i class="fa fa-star-o" style="/*position: absolute;*/width: 100%;"></i></div>
  </div>
  <div class="star-container" style="margin-right: 5px;position: relative;width: auto;/*width: 1em;*//*height: 1em;*/">
    <div class="starfill" style="position: absolute;width: 88%;overflow: hidden;/*height: 1em;*/" veiwbox="0 0 15 15"><i class="fa fa-star" style="/*position: absolute;*//*width: 50%;*/"></i></div>
    <div style="overflow: hidden;" veiwbox="0 0 15 15"><i class="fa fa-star-o" style="/*position: absolute;*/width: 100%;"></i></div>
  </div>
</div>
                  </div>
                </div>
               
              </div>
            ${
              item.stock != 0
                ? `<button class="add-to-cart-btn" data-product="${item.id}" >Add to cart</button>`
                : `<p class="out-of-stock">Out of stock</p>`
            } `;

    product.appendChild(productCrad);
  });
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
  document.querySelectorAll(".product-wrapper").forEach((item) => {
    item.addEventListener(
      "click",
      () => {
        const params = [];
        params.push("productId=" + item.getAttribute("data"));
        location.href = "/productDetail.html?" + params.join("&");
      },
      false
    );
  });
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.onclick = function (e) {
      e.stopPropagation();
      addToCart(this.dataset.product);
      setNavBar();
    };
  });
  largeSlider();
  createPagination();
};
const largeSlider = () => {
  let largeSliders = document.querySelectorAll(".large-swiper");
  let prevArrow = document.querySelectorAll(".prev");
  let nextArrow = document.querySelectorAll(".next");

  largeSliders.forEach((slider, index) => {
    // this bit checks if there's more than 1 slide, if there's only 1 it won't loop
    let sliderLength = slider.children[0].children.length;
    let result = sliderLength > 1 ? true : false;
    prevArrow[index].addEventListener("click", (e) => {
      e.stopPropagation();
    });
    nextArrow[index].addEventListener("click", (e) => {
      e.stopPropagation();
    });
    const swiper = new Swiper(slider, {
      direction: "horizontal",
      loop: result,
      navigation: {
        // the 'index' bit below is just the order of the class in the queryselectorAll array, so the first one would be NextArrow[0] etc
        nextEl: nextArrow[index],
        prevEl: prevArrow[index],
      },
      speed: 1000,
    });
  });
};
// Adding Pagination

const createPagination = () => {
  if (totalPages == 1 || newProductList.length == 0) {
    pagination.style.display = "none";
  } else {
    pagination.style.display = "flex";
  }
  pagination.innerHTML = "";
  // first button
  const firstBtn = document.createElement("button");
  firstBtn.setAttribute("id", `firstBtn`);
  firstBtn.innerHTML = "<<";
  firstBtn.addEventListener("mouseover", () => {
    currentPage == 1
      ? firstBtn.setAttribute("class", "disabled")
      : firstBtn.removeAttribute("class");
  });
  firstBtn.addEventListener("click", () => {
    if (currentPage == 1) return;
    currentPage = 1;
    makeProductCard(currentPage);
  });
  pagination.appendChild(firstBtn);

  // preveous button
  let prevBtn = document.createElement("button");
  prevBtn.setAttribute("id", `previousBtn`);
  prevBtn.innerHTML = "Previous";
  prevBtn.addEventListener("mouseover", (event) => {
    currentPage == 1
      ? prevBtn.setAttribute("class", "disabled")
      : prevBtn.removeAttribute("class");
  });
  prevBtn.addEventListener("click", () => {
    if (currentPage == 1) return;
    currentPage--;
    makeProductCard(currentPage);
  });
  pagination.appendChild(prevBtn);

  // Index Button
  let noOfPage = [];

  if (currentPage + 4 >= totalPages) {
    if (totalPages <= 4) {
      for (let index = 1; index <= totalPages; index++) {
        noOfPage.push(index);
      }
    } else if (currentPage == 1) {
      for (let index = currentPage; index < currentPage + 4; index++) {
        noOfPage.push(index);
      }
    } else
      for (let index = totalPages - 3; index <= totalPages; index++) {
        noOfPage.push(index);
      }
  }

  let start = noOfPage[0];
  let end = noOfPage[noOfPage.length - 1];
  if (currentPage > 1 && totalPages > 4) {
    makePageButtton("...");
  }
  for (let index = start; index <= end; index++) {
    makePageButtton(index);
  }
  if (!noOfPage.includes(totalPages)) {
    makePageButtton("...");
  }

  let nextBtn = document.createElement("button");
  nextBtn.setAttribute("id", `nextBtn`);
  nextBtn.innerHTML = "Next";
  nextBtn.addEventListener("mouseover", (event) => {
    currentPage == totalPages
      ? nextBtn.setAttribute("class", "disabled")
      : nextBtn.removeAttribute("class");
  });
  nextBtn.addEventListener("click", () => {
    if (currentPage == totalPages) {
      return;
    }
    currentPage++;
    makeProductCard(currentPage);
  });

  pagination.appendChild(nextBtn);

  // Last button
  let lastBtn = document.createElement("button");
  lastBtn.setAttribute("id", `lastBtn`);
  lastBtn.innerHTML = ">>";
  lastBtn.addEventListener("mouseover", (event) => {
    currentPage == totalPages
      ? lastBtn.setAttribute("class", "disabled")
      : lastBtn.removeAttribute("class");
  });
  pagination.appendChild(lastBtn);
  // adding event listener in buttons

  document.getElementById("lastBtn")?.addEventListener("click", () => {
    if (currentPage == totalPages) return;
    currentPage = totalPages;
    makeProductCard(currentPage);
  });
};
const makePageButtton = (index) => {
  const span = document.createElement("span");
  span.innerHTML = index;

  span.setAttribute(
    "class",
    `page-btns ${index == currentPage ? "active" : ""}`
  );
  if (!isNaN(index))
    span.addEventListener("click", function () {
      currentPage = index;
      makeProductCard(currentPage);
    });
  pagination.appendChild(span);
};

// adding event listener
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("search").addEventListener("input", (e) => {
    searchValue = e.target.value;
    inputValue(searchValue);
  });
  document,
    this.getElementById("filter-menu").addEventListener("change", () => {
      searchWithDebounce(searchValue);
    });
  // Rating filter

  document.querySelectorAll('input[name="rating"]').forEach((input) => {
    input.addEventListener("change", (e) => {
      startRating = e.target.value;
      searchWithDebounce(searchValue);
    });
  });
  document.getElementById("clear-filter-btn").addEventListener("click", () => {
    document.getElementById("filter-menu").value = "All";
    document.getElementById("search").value = "";
    ///todo :
    document.querySelectorAll('input[name="rating"]').forEach((input) => {
      if (input.checked) {
        input.checked = false;
      }
    });
    searchValue = "";
    startRating = "";
    categoryFilter = "All";
    priceRangeMin = 0;
    priceRangeMax = 1000;
    rangeInput[0].value = priceRangeMin;
    rangeInput[1].value = priceRangeMax;
    rangePrice[0].innerHTML = "$" + priceRangeMin;
    rangePrice[1].innerHTML = "$" + priceRangeMax;
    range.style.left = (priceRangeMin / rangeInput[0].max) * 100 + "%";
    range.style.right = 100 - (priceRangeMax / rangeInput[1].max) * 100 + "%";
    searchWithDebounce(searchValue);
  });
});

// Price range slider code...
let rangeMin = 100;
const minProductPrice = newProductList.reduce((accumulator, currentValue) => {
  return Math.ceil(Math.min(accumulator, currentValue.price));
}, Infinity);
const maxProductPrice = newProductList.reduce((accumulator, currentValue) => {
  return Math.floor(Math.max(accumulator, currentValue.price));
}, 0);
console.log(minProductPrice, maxProductPrice);
const range = document.querySelector(".range-selected");
const rangeInput = document.querySelectorAll(".range-input input");
const rangePrice = document.querySelectorAll(".range-price label");

rangeInput[0].max = maxProductPrice;
rangeInput[1].max = maxProductPrice;
rangeInput[0].min = minProductPrice;
rangeInput[1].min = minProductPrice;
rangeInput[0].value = 0;
rangeInput[1].value = maxProductPrice;
console.log(rangeInput[0].value, rangeInput[1].value);

rangePrice[0].innerHTML = minProductPrice;
rangePrice[1].innerHTML = maxProductPrice;

range.style.left = (0 / rangeInput[0].max) * 100 + "%";
range.style.right = 100 - (maxProductPrice / rangeInput[1].max) * 100 + "%";

let priceRangeMin = rangeInput[0].value;
let priceRangeMax = rangeInput[1].value;

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minRange = parseInt(rangeInput[0].value);
    let maxRange = parseInt(rangeInput[1].value);
    if (maxRange - minRange < rangeMin) {
      if (e.target.className === "min") {
        rangeInput[0].value = maxRange - rangeMin;
      } else {
        rangeInput[1].value = minRange + rangeMin;
      }
    } else {
      rangePrice[0].innerHTML = "$" + minRange;
      rangePrice[1].innerHTML = "$" + maxRange;
      range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
    }
    priceRangeMin = minRange;
    priceRangeMax = maxRange;
    inputValue(searchValue);
  });
});

// rangePrice.forEach((input) => {
//   input.addEventListener("input", (e) => {
//     let minPrice = rangePrice[0].value;
//     let maxPrice = rangePrice[1].value;
//     if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
//       if (e.target.className === "min") {
//         rangeInput[0].value = minPrice;
//         range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
//       } else {
//         rangeInput[1].value = maxPrice;
//         range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
//       }
//     }
//     priceRangeMin = minPrice;
//     priceRangeMax = maxPrice;
//     inputValue(searchValue);
//   });
// });

// search with debouncing
const searchWithDebounce = (searchValue) => {
  categoryFilter = document.getElementById("filter-menu").value;
  if (searchValue.trim() === "") {
    categoryFilter == "All";
  }
  newProductList = products.filter(
    (item) => item.price >= priceRangeMin && item.price <= priceRangeMax
  );
  if (startRating != null) {
    newProductList = newProductList.filter(
      (item) => item.rating >= startRating
    );
  }
  if (categoryFilter === "All") {
    newProductList = newProductList.filter((item) =>
      item.title
        .toString()
        .toLowerCase()
        .trim()
        .includes(searchValue.toLowerCase().trim())
    );
  } else {
    newProductList = newProductList.filter((item) => {
      return (
        item.category.toLocaleLowerCase() ===
          categoryFilter.toLocaleLowerCase() &&
        item.title
          .toString()
          .toLowerCase()
          .trim()
          .includes(searchValue.toLowerCase().trim())
      );
    });
  }

  console.log(newProductList);
  totalPages = Math.ceil(newProductList.length / itemsPerPage);
  makeProductCard();
};

const inputValue = debouncing(searchWithDebounce, 300);
