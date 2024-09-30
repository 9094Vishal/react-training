import {
  getcurrentUser,
  getUserAccountType,
  listOfProducts,
  setNavBar,
} from "./helper.js";
import { isLogdedIn } from "./helper.js";
import { moveToUp } from "./helper.js";
import { debouncing } from "./helper.js";
import { addToCart } from "./helper.js";
const itemsPerPage = 9;
let currentPage = 1;
let categoryFilter = null;
let searchValue = "";
let startRating = null;
const range = document.querySelector(".range-selected");
const rangeInput = document.querySelectorAll(".range-input input");
const rangePrice = document.querySelectorAll(".range-price label");
const product = document.getElementById("products-card");
let minProductPrice = 0;
let maxProductPrice = 1000;
document.addEventListener("DOMContentLoaded", () => {
  isLogdedIn();
  loadData();
  setNavBar();
});

let newProductList = [];
let products = [];
let totalPages = 0;
const pagination = document.getElementById("pagination");
let priceRangeMin = rangeInput[0].value;
let priceRangeMax = rangeInput[1].value;
const loadPageData = () => {
  if (products.length == 1) {
    minProductPrice = 0;
  } else
    minProductPrice = products.reduce((accumulator, currentValue) => {
      return Math.ceil(Math.min(accumulator, currentValue.price));
    }, Infinity);

  maxProductPrice = products.reduce((accumulator, currentValue) => {
    return Math.floor(Math.max(accumulator, currentValue.price));
  }, 0);
  // Price range slider code...
  let rangeMin = 100;

  rangeInput[0].max = maxProductPrice;
  rangeInput[1].max = maxProductPrice;
  rangeInput[0].min = minProductPrice;
  rangeInput[1].min = minProductPrice;
  rangeInput[0].value = 0;
  rangeInput[1].value = maxProductPrice;

  rangePrice[0].innerHTML = "$" + minProductPrice;
  rangePrice[1].innerHTML = "$" + maxProductPrice;

  range.style.left = (0 / rangeInput[0].max) * 100 + "%";
  range.style.right = 100 - (maxProductPrice / rangeInput[1].max) * 100 + "%";

  priceRangeMin = rangeInput[0].value;
  priceRangeMax = rangeInput[1].value;

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

  makeProductCard(currentPage);
};
const loadData = () => {
  let data;

  const url = `https://dummyjson.com/products?limit=194`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      data = JSON.parse(xhr.responseText);
      const newProducts = listOfProducts();
      if (newProducts) {
        newProductList = [...newProducts.reverse(), ...data.products];
        products = [...newProducts.reverse(), ...data.products];
        totalPages = Math.ceil(data.total + newProducts.length / itemsPerPage);
      } else {
        products = data.products;
        newProductList = data.products;
        totalPages = Math.ceil(data.total / itemsPerPage);
      }
      loadPageData();
    }
  };
  xhr.send();
};
const makeProductCard = (page = 1) => {
  moveToUp();
  product.innerHTML = "";
  if (newProductList.length == 0) {
    product.innerHTML = "Sorry, No product found!!!";
  }
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageItems = newProductList.slice(startIndex, endIndex);

  pageItems.map((item) => {
    const productCrad = document.createElement("div");
    productCrad.setAttribute(
      "class",
      "product-wrapper  bg-white border border-[rgba(173, 216, 230, 0.507)] w-full relative p-2 flex justify-between gap-2 flex-col cursor-pointer rounded-md"
    );
    productCrad.setAttribute("data", item.id);
    const images = item.images.map((image) => {
      return `  <div class="swiper-slide"><div class="swiper-slide-inside 
      h-full w-full float-left flex justify-center items-center bg-white
      ">
                    <div class="h-52 w-full flex items-start justify-center my-2 mx-0">
                      <img
                      class="  h-full w-1/2 object-contain hover:scale-105"
                        src="${image}"
                        alt="Image not found"
                      />
                    </div></div></div>
                  `;
    });

    productCrad.innerHTML = `
    <div>
                <div class="large-slider-container mb-[10px]">
                  <div class="large-swiper overflow-hidden relative">
                    <div class="swiper-wrapper">
                     ${images.join("")}
                    
                    </div>
                    <div class="prev  ${images.length > 1 ? "" : "hidden"}
                    cursor-pointer absolute text-white flex items-center justify-center font-bold text-lg 
                    transition duration-[0.6s] ease rounded-r-sm select-none top-0 bottom-0 left-2 w-[30px] h-[30px] m-auto bg-[#0000005e] hover:bg-[#0000009e]
                    z-[4]
                    "><</div>
                    <div class="next ${
                      images.length > 1 ? "" : "hidden"
                    } cursor-pointer absolute text-white flex items-center justify-center font-bold text-lg 
                    transition duration-[0.6s] ease rounded-r-sm select-none top-0 bottom-0 right-2 w-[30px] h-[30px] m-auto bg-[#0000005e] hover:bg-[#0000009e]
                    z-[4]">></div>
                  </div>

                </div>		


                 <div class="product-detail-wrapper flex gap-2 pr-1">
                  <p class="w-1/4">Title:</p>
                  <div class="font-semibold w-3/4">${item?.title}</div>
                </div>
                <div class="product-detail-wrapper flex gap-2 pr-1">
                  <p class="w-1/4">Category:</p>
                  <div class="font-medium text-sm w-3/4">${item.category}</div>
                </div>
                <div class="product-detail-wrapper flex gap-2 pr-1">
                  <p class="w-1/4 ">Price:</p>
                  <div class="font-semibold w-3/4">$${item?.price}</div>
                </div>

               <div class="product-detail-wrapper flex gap-2 pr-1">
                  <p class="w-1/4">Rating:</p>
                  <div class="product-rating flex items-center">${
                    item.rating
                  }&nbsp;
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
                ? `<button class="add-to-cart-btn w-1/2 self-center" data-product="${item.id}" data-stock="${item.stock}" >Add to cart</button>`
                : `<p class="text-center bg-[#406882] text-white w-1/2 rounded-md self-center">Out of stock</p>`
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
        location.href = "/src/productDetail.html?" + params.join("&");
      },
      false
    );
  });
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.onclick = function (e) {
      e.stopPropagation();
      addToCart(this.dataset.product, this.dataset.stock);
      setNavBar();
    };
  });
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.onclick = function (e) {
      e.stopPropagation();
      const params = [];
      params.push("productId=" + this.dataset.product);
      location.href = "/src/storeManager/add-product.html?" + params.join("&");
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
  firstBtn.setAttribute("class", `w-fit p-2 cursor-pointer`);
  firstBtn.innerHTML = "<<";
  firstBtn.addEventListener("mouseover", () => {
    currentPage == 1
      ? firstBtn.className.replace("cursor-pointer", "cursor-not-allowed")
      : firstBtn.className.replace("cursor-not-allowed", "cursor-pointer");
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
  prevBtn.setAttribute("class", `w-fit p-2 cursor-pointer`);
  prevBtn.innerHTML = "Previous";
  prevBtn.addEventListener("mouseover", (event) => {
    currentPage == 1
      ? prevBtn.className.replace("cursor-pointer", "cursor-not-allowed")
      : prevBtn.className.replace("cursor-not-allowed", "cursor-pointer");
  });
  prevBtn.addEventListener("click", () => {
    if (currentPage == 1) return;
    currentPage--;
    makeProductCard(currentPage);
  });
  pagination.appendChild(prevBtn);

  // Index Button
  let noOfPage = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      noOfPage.push(i);
    }
  } else if (currentPage <= 2) {
    for (let i = 1; i <= 5; i++) {
      noOfPage.push(i);
    }
  } else if (currentPage > 2) {
    if (currentPage > 2 && currentPage < totalPages - 2) {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        noOfPage.push(i);
      }
    } else {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        noOfPage.push(i);
      }
    }
  }

  let start = noOfPage[0];
  let end = noOfPage[noOfPage.length - 1];
  if (currentPage > 3 && totalPages > 5) {
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
  nextBtn.setAttribute("class", `w-fit p-2 cursor-pointer`);
  nextBtn.innerHTML = "Next";
  nextBtn.addEventListener("mouseover", (event) => {
    currentPage == totalPages
      ? nextBtn.className.replace("cursor-pointer", "cursor-not-allowed")
      : nextBtn.className.replace("cursor-not-allowed", "cursor-pointer");
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
  lastBtn.setAttribute("class", `w-fit p-2 cursor-pointer`);
  lastBtn.innerHTML = ">>";
  lastBtn.addEventListener("mouseover", (event) => {
    currentPage == totalPages
      ? lastBtn.className.replace("cursor-pointer", "cursor-not-allowed")
      : lastBtn.className.replace("cursor-not-allowed", "cursor-pointer");
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
    `cursor-pointer   ${
      index == currentPage
        ? "font-semibold scale-1.3 text-[#1A374D]"
        : "text-[#6998AB]"
    }`
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
    this.getElementById("search-btn").addEventListener("click", () => {
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
    priceRangeMin = minProductPrice;
    priceRangeMax = maxProductPrice;
    rangeInput[0].value = priceRangeMin;
    rangeInput[1].value = priceRangeMax;
    rangePrice[0].innerHTML = "$" + priceRangeMin;
    rangePrice[1].innerHTML = "$" + priceRangeMax;
    range.style.left = (priceRangeMin / rangeInput[0].max) * 100 + "%";
    range.style.right = 100 - (priceRangeMax / rangeInput[1].max) * 100 + "%";
    searchWithDebounce(searchValue);
  });
});

// search with debouncing
const searchWithDebounce = (searchValue) => {
  categoryFilter = document.getElementById("filter-menu").value;

  newProductList = products;
  newProductList = newProductList.filter(
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

  // if (newProductList.length != 0) {
  //   let priceRangeMin = newProductList.reduce((accumulator, currentValue) => {
  //     return Math.ceil(Math.min(accumulator, currentValue.price));
  //   }, Infinity);

  //   let priceRangeMax = newProductList.reduce((accumulator, currentValue) => {
  //     return Math.floor(Math.max(accumulator, currentValue.price));
  //   }, 0);

  //   rangeInput[0].max = priceRangeMax;
  //   rangeInput[1].max = priceRangeMax;
  //   rangeInput[0].min = priceRangeMin;
  //   rangeInput[1].min = priceRangeMin;
  //   rangeInput[0].value = 0;
  //   rangeInput[1].value = priceRangeMax;

  //   rangePrice[0].innerHTML = "$" + priceRangeMin;
  //   rangePrice[1].innerHTML = "$" + priceRangeMax;

  //   range.style.left = (0 / rangeInput[0].max) * 100 + "%";
  //   range.style.right = 100 - (priceRangeMax / rangeInput[1].max) * 100 + "%";
  // }

  totalPages = Math.ceil(newProductList.length / itemsPerPage);

  makeProductCard();
};

const inputValue = debouncing(searchWithDebounce, 300);
