import {
  setNavBar,
  listOfProducts,
  isLogdedIn,
  moveToUp,
  debouncing,
  addToCart,
  getcurrentUser,
} from "../helper.js";
const itemsPerPage = 9;
let currentPage = 1;
let categoryFilter = null;
let searchValue = "";

const product = document.getElementById("products-card");

document.addEventListener("DOMContentLoaded", () => {
  isLogdedIn();
  setNavBar();
  loadData();
});

let newProductList = [];
let products = [];
let totalPages = 0;
const pagination = document.getElementById("pagination");

const loadData = () => {
  const newProducts = listOfProducts().reverse();
  products = newProducts;
  newProductList = newProducts;
  totalPages = Math.ceil(newProducts.length / itemsPerPage);
  makeProductCard(currentPage);
};
const makeProductCard = (page = 1) => {
  moveToUp();
  product.innerHTML = "";
  if (newProductList.length == 0) {
    product.innerHTML = "You don't have any produt!!!";
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

              
              </div>
              <div class="flex gap-3 items-center">
            <button class="edit-btn w-1/2 self-center" data-product="${
              item.id
            }" data-stock="${item.stock}" >Edit</button>
            <button class="delete-btn w-1/2 border border-red-500 !text-red-500 !bg-transparent hover:!bg-red-500  hover:!text-white self-center" data-product="${
              item.id
            }" data-stock="${item.stock}" >Delete</button> </div>`;

    product.appendChild(productCrad);
  });

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
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.onclick = function (e) {
      e.stopPropagation();
      const products = listOfProducts().filter(
        (item) => item.id != this.dataset.product
      );

      localStorage.setItem("products", JSON.stringify(products));
      const userData = JSON.parse(
        localStorage.getItem(getcurrentUser().toString())
      );

      userData.store = userData.store.filter(
        (item) => item != this.dataset.product
      );
      localStorage.setItem(
        getcurrentUser().toString(),
        JSON.stringify(userData)
      );
      location.reload();
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
});

// search with debouncing
const searchWithDebounce = (searchValue) => {
  categoryFilter = document.getElementById("filter-menu").value;

  newProductList = products;

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

  totalPages = Math.ceil(newProductList.length / itemsPerPage);

  makeProductCard();
};

const inputValue = debouncing(searchWithDebounce, 300);
