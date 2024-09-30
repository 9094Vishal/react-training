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
    "flex gap-[10px] justify-between p-4 bg-[#1A374D] h-fit items-center  overflow-hidden "
  );
  navbar[0].setAttribute("x-data", "{ isOpen: false }");

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
  const navbarItem = `<a href="/src/"><h1 class="text-[12px] text-[#fff] md:text-2xl cursor-pointer" id="logo">MI Store</h1></a>
  ${isSearchNeeded ? searchBar : ""}
 
  <div class="flex items-center gap-3">
  <a class="relative hover:opacity-50 text-black w-[35px] h-[42px] " href="/src/cart.html"
          ><img class="invert h-full w-full" src="/public/images/cart.png" alt="" />
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
   <div class="">
   
      <button class="w-fit" id="user-menu" aria-label="User menu" aria-haspopup="true">
        <img
          class="w-8 h-8 rounded-full"
          src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
        />
      </button>
      <div
        id="user-menu-dropdown"
        class="absolute z-30 right-0 w-48 mt-2 origin-top-right rounded-lg shadow-lg top-10 menu-hidden"
      >
        <div
          class="p-4 bg-white rounded-md shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
        ${
          getUserAccountType() == "storeManager"
            ? `
         <a href="/src/storeManager/dash-board.html ">
          <div class="flex items-center gap-3 mb-2 hover:opacity-50">
            <img
              class="w-8 h-8 object-contain"
              src="/public/images/chart.svg"
              alt=""
            />
            Dashboard
          </div>
        </a>
        <a href="/src/storeManager/add-product.html">
          <div class="flex items-center gap-3 mb-2 hover:opacity-50">
            <img
              class="w-8 h-8 object-contain"
              src="/public/images/add.svg"
              alt=""
            />
            Add product
          </div>
        </a>
        `
            : ``
        }
        <a href="/src/orderhistory.html">
          <div class="flex items-center gap-3 mb-2 hover:opacity-50">
            <img
              class="w-8 h-8 object-contain"
              src="/public/images/order.png"
              alt=""
            />
            Orders
          </div>
        </a>
        <a href="/src/cart.html">
          <div class="flex items-center gap-3 mb-2 hover:opacity-50">
            <img
              class="w-8 h-8 object-contain"
              src="/public/images/cart.png"
              alt=""
            />
            Cart
          </div>
        </a>
        
          <div class="flex items-center gap-3 mb-2 login-status cursor-pointer hover:opacity-50">
            <img
              class="w-8 h-8 object-contain"
              src="/public/images/logout.png"
              alt=""
            />
            Logout
          </div>
        
        </div>
      </div>
    </div></div>
 <div class="hidden text-white font-bold cursor-pointer" id="hamburger-menu-icon">&#9776</div>
      `;

  navbar[0].innerHTML = navbarItem;
  document.querySelectorAll(".login-status").forEach((item) => {
    item.addEventListener("click", handleLogin);
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
  const request = new XMLHttpRequest();
  let categories = [];
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      const data = JSON.parse(request.responseText);

      categories = data.map((item) => item.slug);

      if (isSearchNeeded) {
        makeOptionCategory("All");
        for (let data of categories) {
          makeOptionCategory(capitalizeFirstLetter(data));
        }
      }
    }
  };
  const options = document.querySelectorAll(".menu-bar");
  for (let i = 0; i < options.length; i++) {
    options[i].onclick = () => {
      document.activeElement.blur();
    };
  }
  request.open("GET", "https://dummyjson.com/products/categories");
  request.send();
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

export const addToCart = async (id, quntity = null) => {
  // const request = new XMLHttpRequest();
  // request.onload = function () {
  //   if (this.status === 404) {
  //     return;
  //   }
  //   if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
  //     const data = JSON.parse(request.responseText);

  const productQuntity = quntity;

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
          ? (userData.products[id.toString()] = 1)
          : sendNotification("warning", "Product already in cart");
      }
    } else {
      if (productQuntity <= 0) {
        sendNotification("error", "Product is out of stock");
        return;
      } else {
        userData.products[id.toString()] = 1;
        sendNotification("success", "Product added in your cart...");
      }
    }
  } else {
    userData.products = {};
    userData.products[id.toString()] = quntity != null ? quntity : 1;
    sendNotification("success", "Product added in your cart...");
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
export const getUserAccountType = () => {
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
export const listOfProducts = () => {
  return JSON.parse(localStorage.getItem("products"));
};
