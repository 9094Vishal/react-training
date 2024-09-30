import { productsData } from "../mock/productData.js";

export const setNavBar = (isSearchNeeded = true) => {
  const cartData = JSON.parse(localStorage.getItem(getuser()));
  let totalCartItem = 0;
  if (cartData)
    if (cartData.products) {
      totalCartItem = Object.values(cartData.products)?.reduce(
        (accumulator, currentValue) => {
          return (accumulator += currentValue);
        },
        0
      );
    }

  const navbar = document.getElementsByTagName("nav");

  navbar[0].setAttribute(
    "class",
    "flex justify-between p-4 bg-[#576F72] items-center"
  );
  const searchBar = ` <div class="search-wrapper flex w-3/4">
        <select class="rounded-l-lg" name="category" id="filter-menu"></select>
        <div class="search-bar">
          <input type="text" id="search" placeholder="Search some thing.." />
          <img src="./assets/images/search.png" alt="" />
        </div>
      </div>`;
  const navbarItem = `<h1 class="cursor-pointer" id="logo">MI Store</h1>
  ${isSearchNeeded ? searchBar : ""}  
      <div class="nav-links">
      ${
        getUserAccountType() == "storeManager"
          ? `
          <span  class="inline-block px-2 cursor-pointer hover:font-semibold"
          ><a href="/storeManager/add-product.html">Add Product</a>
        </span>
          `
          : getUserAccountType() == "admin"
          ? ``
          : `   <a class="relative text-black" href="./cart.html"
          ><img src="./assets/images/cart.png" alt="" />
          <p class="cart-count">${totalCartItem}</p>
        </a> 
        <span   class="inline-block px-2 cursor-pointer hover:font-semibold"
          ><a href="./orderhistory.html">Orders</a>
        </span>`
      }
    
        
       <span class="inline-block px-2 cursor-pointer hover:font-semibold" id="login-status">${
         checkLogin() ? "Logout" : " Login"
       }</span
        >
      </div>`;

  navbar[0].innerHTML = navbarItem;
  document
    .getElementById("login-status")
    .addEventListener("click", handleLogin);

  document.getElementById("logo").addEventListener("click", () => {
    window.location = "/#";
  });
  const makeOptionCategory = (data) => {
    const option = document.createElement("option");
    option.setAttribute("value", data);
    const value = document.createTextNode(data);
    option.appendChild(value);
    category.appendChild(option);
  };

  // this code will use for generating dynamic category list
  const category = document.getElementById("filter-menu");
  const categoryList = loadCategoryList();
  if (isSearchNeeded) {
    makeOptionCategory("All");
    for (let data of categoryList) {
      makeOptionCategory(data);
    }
  }
};

export const isLogdedIn = () => {
  const isLogdedIn = localStorage.getItem("isLogin");
  !isLogdedIn ? (window.location = "/src/Login.html") : null;
};

export const LogOutModel = () => {
  const model = document.getElementById("logout-model");
  const modelPopUp = `<div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <p>Are you sure you want to Log-out..</p>
      <button id="logout-btn-yes">Yes</button>
    <button id="logout-btn-no">No</button>
  </div>

</div>`;
};

const checkLogin = () => {
  const isLogdedIn = localStorage.getItem("isLogin");
  if (isLogdedIn) {
    return true;
  }
  return false;
};

function handleLogin() {
  if (checkLogin) {
    localStorage.removeItem("isLogin");
  }
  window.location = "/Login.html";
}

const loadCategoryList = () => {
  const list = new Set(
    productsData.map((item) => capitalizeFirstLetter(item.category))
  );
  return list;
};

export const moveToUp = () => {
  document.documentElement.scrollTop = 0;
};

export const debouncing = (func, time = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, time);
  };
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const addToCart = (id, quntity = null) => {
  const productQuntity = productsData.find((item) => item.id == id).stock;

  const user = getuser();
  let userData = JSON.parse(localStorage.getItem(user.toString()));
  if (!userData) userData = {};
  if (userData.products) {
    if (userData.products[id.toString()] && productQuntity != 0) {
      if (userData.products[id.toString()] >= productQuntity) {
        alert("You can not add more product");
        return;
      } else {
        quntity != null
          ? (userData.products[id.toString()] = quntity)
          : userData.products[id.toString()]++;
      }
    } else {
      if (productQuntity <= 0) {
        alert("Product is out of stock");
        return;
      } else userData.products[id.toString()] = quntity != null ? quntity : 1;
    }
  } else {
    userData.products = {};
    userData.products[id.toString()] = quntity != null ? quntity : 1;
  }
  localStorage.setItem(user.toString(), JSON.stringify(userData));
};

export const getCartItems = () => {
  let cartData = JSON.parse(localStorage.getItem(getuser()));
  if (cartData) {
    return cartData.products;
  }
  return {};
};
const getuser = () => {
  return JSON.parse(localStorage.getItem("user")).username;
};
const getUserAccountType = () => {
  return JSON.parse(localStorage.getItem("user")).accountType;
};
export const getcurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")).username;
};
export const totalCartItem = () => {
  const cartData = JSON.parse(localStorage.getItem(getuser()));
  let totalCartItem = 0;
  if (cartData)
    if (cartData.products) {
      totalCartItem = Object.values(cartData.products)?.reduce(
        (accumulator, currentValue) => {
          return (accumulator += currentValue);
        },
        0
      );
    }
  return totalCartItem;
};
