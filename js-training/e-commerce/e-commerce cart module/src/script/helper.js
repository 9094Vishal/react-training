import { productsData } from "../mock/productData.js";
import { sendNotification } from "./customNotification.js";

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
    "flex gap-[10px] justify-between p-4 bg-[#1A374D] h-fit items-center relative overflow-hidden"
  );
  const searchBar = ` <div class="flex w-3/4 h-[35px] ">
  <div class="relative "><select class="appearance-none h-full rounded-l-lg text-[#1A374D] font-medium text-[10px] 
  sm:text-base bg-gray-200 p-1 border-none outline-none w-fit" name="category" id="filter-menu"" name="count"
   id="cart-quntity"></select> 
                <div class="pointer-events-none absolute right-[6px] top-0 bottom-0 flex items-center px-2  justify-center">
                  <svg class="h-4 w-4 fill-[#1A374D]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                   </svg>
                </div>
             </div>
       
        <div class="flex flex-1">
          <input type="text" class="w-32 flex-1 text-[12px] md:text-[14px] border outline-none p-1" id="search" placeholder="Search some thing.." />
          <img class=" p-2 h-full bg-[#6998AB] rounded-r-lg" id="search-btn" src="/public/images/white.png" alt="" />
        </div>
      </div>`;
  const navbarItem = `<h1 class="text-[12px] text-[#fff] md:text-2xl cursor-pointer" id="logo">MI Store</h1>
  ${isSearchNeeded ? searchBar : ""}  

      <div class="hidden md:flex items-center text-[#fff]">
      ${
        getUserAccountType() == "storeManager"
          ? `
          <span  class="inline-block px-2 cursor-pointer hover:font-semibold"
          ><a href="/src/storeManager/add-product.html">Add Product</a>
        </span>
          `
          : getUserAccountType() == "admin"
          ? ``
          : `   <a class="relative hover:opacity-50 text-black w-[35px] h-[42px] " href="/src/cart.html"
          ><img class="invert " src="/public/images/cart.png" alt="" />
          <p class="cart-count  text-[#fff] absolute m-0   font-semibold  ${
            totalCartItem.toString().length >= 3
              ? "text-xs top-[-5px] right-[6px]"
              : totalCartItem.toString().length > 1
              ? "text-sm top-[-7px] right-[9px]"
              : "text-lg top-[-12px] right-[10px]"
          }  p-1">${
              totalCartItem.toString().length >= 3 ? "99+" : totalCartItem
            }</p>
        </a> 
        <span   class="inline-block px-2 cursor-pointer hover:opacity-50"
          ><a href="/src/orderhistory.html">Orders</a>
        </span>`
      }
    
        
       <span class="inline-block px-2 cursor-pointer hover:opacity-50 login-status">${
         checkLogin() ? "Logout" : " Login"
       }</span
        >
      </div>
       <div class="md:hidden" id="hamburger-menu-icon">&#9776</div>
      `;

  const menu = document.getElementById("hamburger-menu");
  const menuItem = `
   <div
        class="w-full bg-[#1A374D] text-white h-[67px] flex items-center p-2 justify-between"
      >
        <h1 class="text-[24px] md:text-2xl cursor-pointer" id="logo">
          MI Store
        </h1>
        <div class="text-3xl" id="menu-close" >X</div>
      </div>
      <div id="hamburger-menu-item" class="p-3">
        <a href="/src/orderhistory.html">
          <div class="flex items-center gap-3 mb-2">
            <img
              class="w-8 h-8 object-contain"
              src="/public/images/order.png"
              alt=""
            />
            Orders
          </div>
        </a>
        <a href="/src/cart.html">
          <div class="flex items-center gap-3 mb-2">
            <img
              class="w-8 h-8 object-contain"
              src="/public/images/cart.png"
              alt=""
            />
            Cart
          </div>
        </a>
        
          <div class="flex items-center gap-3 mb-2 login-status">
            <img
              class="w-8 h-8 object-contain"
              src="/public/images/logout.png"
              alt=""
            />
            Logout
          </div>
        
      </div>
  `;
  menu.innerHTML = menuItem;

  let isMenuOpen = false;

  navbar[0].innerHTML = navbarItem;
  document.querySelectorAll(".login-status").forEach((item) => {
    item.addEventListener("click", handleLogin);
  });

  document.getElementById("logo").addEventListener("click", () => {
    window.location = "/#";
  });

  document.getElementById("menu-close").addEventListener("click", () => {
    isMenuOpen = false;
    menu.className = menu.className.replace("block", "hidden");
    document.body.classList.remove("h-full");
    document.body.classList.remove("overflow-hidden");
  });
  menu.addEventListener("resize", () => {
    isMenuOpen = false;
    menu.className = menu.className.replace("block", "hidden");
  });
  document
    .getElementById("hamburger-menu-icon")
    .addEventListener("click", () => {
      const menu = document.getElementById("hamburger-menu");

      if (isMenuOpen) {
        isMenuOpen = false;
        menu.className = menu.className.replace("block", "hidden");
        document.body.classList.remove("h-full");
        document.body.classList.remove("overflow-hidden");
      } else {
        isMenuOpen = true;
        menu.className = menu.className.replace("hidden", "block");
        document.body.classList.add("h-full");
        document.body.classList.add("overflow-hidden");
      }
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
  window.location = "/src/Login.html";
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
    if (userData.products[id.toString()]) {
      sendNotification("warning", "Product already in cart");
      return;
    }
    if (userData.products[id.toString()] && productQuntity != 0) {
      if (userData.products[id.toString()] >= productQuntity) {
        sendNotification("error", "You can not add more product");
        return;
      } else {
        quntity != null
          ? (userData.products[id.toString()] = quntity)
          : sendNotification("warning", "Product already in cart");
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
