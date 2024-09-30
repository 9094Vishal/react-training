import { cities } from "../mock/cityes.js";

const KEYS = {
  leftKey: 37,
  rightKey: 39,
  backspace: 8,
  deleteKey: 46,
  enter: 13,
};
export const convertDate = (str, d) => {
  var start = new Date(d);
  var date = new Date(str);

  if (start <= date) {
    return true;
  }
};
export const getTime = (d) => {
  const date = new Date(d);

  return `${date.getUTCHours()}:${date.getUTCMinutes()}`;
};
export const getDurartion = (d) => {
  const hours = d.split(" ")[0];
  const minutes = d.split(" ")[2];
  let formattedHours = hours.toString().padStart(2, "0");
  let formattedMinutes = minutes ? minutes.toString().padStart(2, "0") : "00";

  return `${formattedHours}h:${formattedMinutes}m`;
};

export const isLogedIn = () => {
  const user = localStorage.getItem("isLogIn");
  if (user) {
    return true;
  }
  return false;
};

export const loadNavBar = () => {
  const header = document.querySelector("header");
  header.setAttribute("class", "px-14 py-2 bg-[#09203C] text-white");
  const mainHeader = getNavigationBar();
  header.innerHTML = mainHeader;
  if (!isLogedIn) {
    document.getElementById("login-btn").addEventListener("click", () => {
      openLoginPopUp();
    });
    document.getElementById("signup-btn").addEventListener("click", () => {
      loadPhoneNUmberPopUp();
    });
  } else
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("isLogIn");
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
};
export const getListeners = () => {
  if (!isLogedIn()) {
    document.getElementById("login-btn").addEventListener("click", () => {
      openLoginPopUp();
    });
    document.getElementById("signup-btn").addEventListener("click", () => {
      loadPhoneNUmberPopUp();
    });
  } else
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("isLogIn");
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
};
export const loadHeaderWithBookFunctions = () => {
  const header = document.querySelector("header");
  header.setAttribute("class", "px-14 py-3 bg-[#09203C] text-white");
  const mainHeader = getNavigationBar() + getBookFunctions();
  header.innerHTML = mainHeader;
  const btn = document.querySelector("button.mobile-menu-button");
  const menu = document.querySelector(".mobile-menu");
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
  if (!isLogedIn()) {
    document.getElementById("login-btn").addEventListener("click", () => {
      openLoginPopUp();
    });
    document.getElementById("signup-btn").addEventListener("click", () => {
      loadPhoneNUmberPopUp();
    });
  } else
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("isLogIn");
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
  document.querySelectorAll(".clear-btn").forEach((item) => {
    item.onclick = () => {
      if (item.id == "source") {
        from.value = "";
      } else {
        to.value = " ";
      }
    };
  });
  document.querySelectorAll("input[type='date']").forEach((date) => {
    date.setAttribute("min", new Date().toISOString().split("T")[0]);
    date.setAttribute("value", new Date().toISOString().split("T")[0]);
  });
  document.querySelectorAll("[data-suggest]").forEach((input) => {
    input.addEventListener("input", function () {
      const scope = input.closest(".suggestions-container");
      const suggestionsBox = scope.querySelector(".suggestions");
      suggestionsBox.innerHTML = '<div role="listbox"></div>';
      const suggestionsHelp = scope.querySelector(".suggestions-help");
      suggestionsHelp.innerHTML = "";

      const value = input.value;
      const suggestions = cities
        .filter((item) => {
          if (item.city.toLowerCase().includes(value.toLowerCase()))
            return item;
        })
        .sort();

      if (value) {
        const listbox = suggestionsBox.querySelector('[role="listbox"]');
        suggestions.forEach((item, index) => {
          const option = document.createElement("div");
          option.setAttribute("role", "option");

          option.textContent = `
            ${item.city}
          `.trim();
          option.id = `${input.id}-${index}`;
          listbox.appendChild(option);
        });

        if (suggestions.length) {
          suggestionsHelp.textContent = `There are ${suggestions.length} suggestions. Use the up and down arrows to browse.`;
        }
      }

      const id = input.id;
      input.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          const listbox = scope.querySelector('[role="listbox"]');
          listbox.setAttribute("tabindex", "0");
          listbox.focus();
          const firstOption = listbox.querySelector(
            '[role="option"]:first-child'
          );
          if (firstOption) {
            listbox.setAttribute("aria-activedescendant", firstOption.id);
            firstOption.classList.add("selected");
            document.getElementById(id).value = firstOption.textContent.trim();
          }
        }
        if (e.key === "Tab") {
          scope.querySelector('[role="listbox"]').remove();
        }
      });

      const listbox = scope.querySelector('[role="listbox"]');
      listbox.addEventListener("keydown", function (e) {
        let newOption;
        if (e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          input.focus();
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          newOption = document.querySelector(".selected").nextElementSibling;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          newOption =
            document.querySelector(".selected").previousElementSibling;
        }
        if (newOption) {
          const currentSelected = document.querySelector(".selected");
          if (currentSelected) {
            currentSelected.classList.remove("selected");
          }
          newOption.classList.add("selected");
          listbox.setAttribute("aria-activedescendant", newOption.id);
          document.getElementById(id).value = newOption.textContent;
        }
      });

      listbox.addEventListener("blur", function () {
        this.innerHTML = "";
      });

      listbox.querySelectorAll('[role="option"]').forEach((option) => {
        option.addEventListener("click", function () {
          input.value = this.textContent;
          listbox.remove();
          input.focus();
        });
      });
    });
  });
};
export const getNavigationBar = () => {
  return `
    <nav class="">
        <div class="w-full">
          <div class="flex justify-between">
            <div class="flex space-x-4">
              <!-- logo -->
              <div>
                <a
                  href="/src"
                  class="flex items-center py-5 px-2 hover:text-gray-200"
                >
                  <svg
                    class="h-6 w-6 mr-1 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span class="font-bold">Mi Book</span>
                </a>
              </div>

              <!-- primary nav -->
              <div class="hidden md:flex items-center space-x-1">
                <a href="/src/history.html" class="py-5 px-3hover:text-gray-200">History</a>
              </div>
            </div>

            <!-- secondary nav -->
            ${
              !isLogedIn()
                ? `  <div class="hidden md:flex items-center space-x-1">
              <button value="login" id="login-btn" class="py-5 px-3">Login</button>
              <Button
                id="signup-btn"
                value="signup"
                class="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                >Signup</Button
              >
            </div>`
                : `  <div class="hidden md:flex items-center space-x-1">
            
              <Button
                id="logout"
                value="logout"
                class="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                >Log out</Button
              >
            </div>`
            }
          

            <!-- mobile button goes here -->
            <div class="md:hidden flex items-center">
              <button class="mobile-menu-button">
                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- mobile menu -->
        <div class="mobile-menu hidden md:hidden">
          <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200"
            >Features</a
          >
          <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200"
            >Pricing</a
          >
        </div>
      </nav>
    `;
};
export const getBookFunctions = () => {
  let params = new URLSearchParams(location.search);
  const from = params.get("from");
  const to = params.get("to");
  const startDate = params.get("depart");
  const returnDate = params.get("return");
  const adults = params.get("adults");
  const childs = params.get("childs");
  return `
   <div class="mt-5">
        <p>Millions of cheap flights. One simple search.</p>

        <div class="mt-5">
          <div class="flex w-full gap-2 flex-wrap">
            <div class="flex w-full gap-4">
              <!-- from -->
              <div class="flex gap-2 w-full">
                <div class="bg-white px-5 py-1 w-full">
                  <div>
                    <label
                      for="from"
                      class="block text-sm font-medium leading-6 text-slate-500"
                      >From</label
                    >
                    <div
                      class="mt-2 rounded-md shadow-sm flex w-full items-center bg-white pr-2"
                    >
                      <div class="suggestions-container w-full">
                        <div
                          class="suggestions-help absolute left-[9999px] bg-white"
                          role="status"
                        ></div>
                        <input
                          id="from"
                          data-suggest
                          type="text"
                          name="from"
                          value="${from ?? "Delhi"}"
                          placeholder="Source"
                          autocomplete="off"
                          class="block border-none outline-none w-full flex-1 rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm"
                        />
                        <div class="suggestions relative"></div>
                      </div>

                      <div class="clear-btn" id="source">
                        <i class="fa-solid fa-xmark text-black"></i>
                      </div>
                    </div>
                  </div>
                  <p class="text-red-500" id="from-error"></p>
                </div>
              </div>
              <!-- to -->
              <div class="flex gap-2 w-full">
                <div class="bg-white px-5 py-1 w-full">
                  <div>
                    <label
                      for="to"
                      class="block text-sm font-medium leading-6 text-slate-500"
                      >To</label
                    >
                    <div
                      class="mt-2 rounded-md shadow-sm flex items-center bg-white pr-2"
                    >
                      <div class="suggestions-container w-full">
                        <div
                          class="suggestions-help absolute left-[9999px] bg-white"
                          role="status"
                        ></div>
                        <input
                          type="text"
                          id="to"
                          name="to"
                          value="${to ?? "Goa"}"
                          data-suggest
                          placeholder="Destination"
                          autocomplete="off"
                          class="block border-none outline-none w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm"
                        />
                        <div class="suggestions relative"></div>
                      </div>

                      <div class="clear-btn">
                        <i class="fa-solid fa-xmark text-black"></i>
                      </div>
                    </div>
                  </div>
                  <p class="text-red-500" id="to-error"></p>
                </div>
              </div>
            </div>
            <div class="flex gap-2 relative flex-1">
              <div class="bg-white px-5 py-1 w-full">
                <div class="w-full">
                  <label
                    for="depart"
                    class="block text-sm font-medium leading-6 text-slate-500"
                    >Depart</label
                  >
                  <div
                    class="mt-2 rounded-md shadow-sm flex items-center bg-white pr-2 w-full"
                  >
                    <input
                      type="date"
                      name="depart"
                      value="${startDate ?? ""}"
                      id="depart"
                      class="block border-none outline-none w-full rounded-md py-1.5 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="Destination"
                    />
                  </div>
                  <p class="text-red-500" id="depart-error"></p>
                </div>
              </div>
            </div>

            <div class="flex gap-2 relative flex-1">
              <div class="bg-white px-5 py-1 w-full">
                <div>
                  <label
                    for="adults"
                    class="block text-sm font-medium leading-6 text-slate-500"
                    >Adutls</label
                  >
                  <div
                    class="mt-2 rounded-md shadow-sm flex items-center bg-white pr-2"
                  >
                    <input
                      type="number"
                      name="adults"
                      value="${adults ?? 1}"
                      id="adults"
                      class="block border-none outline-none w-full rounded-md py-1.5 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="Number of Adutls"
                      value="0"
                      min="1"
                      max="9"
                    />
                  </div>
                  <p class="text-red-500" id="adult-error"></p>
                </div>
              </div>
            </div>
            <div class="flex gap-2 relative flex-1">
              <div class="bg-white px-5 py-1 w-full">
                <div>
                  <label
                    for="child"
                    class="block text-sm font-medium leading-6 text-slate-500"
                    >Childs</label
                  >
                  <div
                    class="mt-2 rounded-md shadow-sm flex items-center bg-white pr-2"
                  >
                    <input
                      type="number"
                      value="${childs ?? 0}"
                      name="child"
                      id="child"
                      class="block border-none outline-none w-full rounded-md py-1.5 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="Number of child"
                      value="0"
                      min="0"
                      max="9"
                    />
                  </div>
                  <p class="text-red-500" id="child-error"></p>
                </div>
              </div>
            </div>
          </div>

          <button
            id="flight-search-btn"
            class="bg-blue-500 text-center py-4 px-5 rounded-lg h-full mt-2"
          >
            Search
          </button>
        </div>
      </div>
  `;
};

export const loadOtpPop = (
  userOtp,
  callBack,
  id,
  phone,
  userName,
  isCallBackNeeded = false,
  islogin = false
) => {
  let otp = userOtp;
  document.getElementById("otp-wrapper").innerHTML = `
  <div
        class="max-w-lg p-8 sm:pb-4 bg-white rounded shadow-lg text-center sm:text-left"
      >
        <h3
          class="text-xl w-full sm:text-2xl font-semibold mb-6 flex flex-col sm:flex-row items-center"
        >
          <div
            class="p-2 rounded-full w-full flex items-center justify-between mb-4 sm:mb-0 sm:mr-2"
          >
            <div class="flex items-center">
              <svg
                class="h-10 w-10 mr-1 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span class="font-bold">Mi Book</span>
            </div>
            <span class="hover:opacity-40 cursor-pointer close-otp-popup">
              X
            </span>
          </div>
        </h3>
        <form class="space-y-6" id="otp-form">
          <div id="otp-wrapper" class="">
            <div class="flex items-center justify-between">
              <label
                for="otp"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Otp</label
              >
            </div>
            <div class="mt-2">
              <input
                id="otp"
                name="otp"
                maxlength="6"
                type="number"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
            </div>
            <p class="text-red-500" id="otp-error"></p>
            <label
              id="resend"
              class="mt-2 cursor-pointer block text-sm font-medium leading-6 text-gray-900"
              >Resend otp</label
            >
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
        <div
          class="mt-8 pt-8 sm:pt-4 border-t -mx-8 px-8 flex flex-col sm:flex-row justify-end leading-relaxed"
        ></div>
      </div>
  `;
  const otpInput = document.getElementById("otp");
  const otpError = document.getElementById("otp-error");
  otpInput.addEventListener("keydown", (e) => {
    if (
      e.keyCode === KEYS.backspace ||
      e.keyCode === KEYS.deleteKey ||
      e.keyCode === KEYS.rightKey ||
      e.keyCode === KEYS.leftKey ||
      e.keyCode === KEYS.enter
    ) {
      return true;
    }
    if (e.target.value.length === e.target.maxLength) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    return true;
  });
  document.getElementById("otp-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateNumber(otpInput.value.toString(), otpError, 6)) {
      if (otpInput.value.toString() == otp) {
        const users = getListOfUsers();
        if (isCallBackNeeded) {
          const data = {
            username: userName.value,
            phone: phone.value,
          };
          users.push(data);
          localStorage.setItem("currentUser", JSON.stringify(data));
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("isLogIn", true);
          callBack(id, data);
          document.querySelector(".flight-popup").classList.remove("hidden");
        } else if (islogin) {
          const user = users.find((item) => item.phone == phone.value);
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("isLogIn", true);
          location.reload();
        } else {
          const data = {
            username: userName.value,
            phone: phone.value,
          };
          users.push(data);
          localStorage.setItem("currentUser", JSON.stringify(data));
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("isLogIn", true);
          location.reload();
        }
        closeOtpPopup();
      } else {
        otpError.innerHTML = "Invalid otp";
      }
    }
  });
  document.getElementById("resend").onclick = () => {
    otp = sendOtp();
  };
  function closeOtpPopup() {
    document.querySelector(".otp-popup").classList.add("hidden");
  }

  document
    .querySelector(".close-otp-popup")
    .addEventListener("click", closeOtpPopup);
  otpInput.addEventListener("change", () => {
    validateNumber(otpInput.value.toString(), otpError, 6);
  });
  document.querySelector(".otp-popup").classList.remove("hidden");
};
export const loadPhoneNUmberPopUp = (cb, id, needCb = false) => {
  document.getElementById("user-phone").innerHTML = `
  <div
        class="max-w-lg p-8 sm:pb-4 bg-white rounded shadow-lg text-center sm:text-left"
      >
        <h3
          class="text-xl w-full sm:text-2xl font-semibold mb-6 flex flex-col sm:flex-row items-center"
        >
          <div
            class="p-2 rounded-full w-full flex items-center justify-between mb-4 sm:mb-0 sm:mr-2"
          >
            <div class="flex items-center">
              <svg
                class="h-10 w-10 mr-1 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span class="font-bold">Mi Book</span>
            </div>
            <span class="hover:opacity-40 cursor-pointer close-treact-popup">
              X
            </span>
          </div>
        </h3>
        <form class="space-y-6" id="login-form">
          <div>
            <label
              for="user-name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >User name</label
            >
            <div class="mt-2">
              <input
                id="user-name"
                name="name"
                type="text"
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
                <p class="text-red-500" id="name-error"></p>
                
          </div>
          <div>
            <label
              for="phone"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Phone Numebr</label
            >
            <div class="mt-2">
              <input
                id="phone"
                name="number"
                maxlength="10"
                type="number"
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p class="text-red-500" id="phone-error"></p>
              <span class='hidden text-[#09203C] cursor-pointer login' >Log in</span>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get-otp
            </button>
          </div>
        </form>
        <div
          class="mt-8 pt-8 sm:pt-4 border-t -mx-8 px-8 flex flex-col sm:flex-row justify-end leading-relaxed"
        ></div>
      </div>
  `;
  const phone = document.getElementById("phone");
  const userName = document.getElementById("user-name");
  const nameError = document.getElementById("name-error");
  const phoneError = document.getElementById("phone-error");
  const signup = document.querySelector(".login");
  phone.addEventListener("keydown", (e) => {
    if (
      e.keyCode === KEYS.backspace ||
      e.keyCode === KEYS.deleteKey ||
      e.keyCode === KEYS.rightKey ||
      e.keyCode === KEYS.leftKey ||
      e.keyCode === KEYS.enter
    ) {
      return true;
    }
    if (e.target.value.length === e.target.maxLength) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    return true;
  });
  phone.addEventListener("input", () => {
    validateNumber(phone.value.toString(), phoneError, 10);
  });
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (userName.value === "") {
      nameError.innerHTML = "This field is required!!";
      return;
    } else {
      nameError.innerHTML = "";
    }
    if (validateNumber(phone.value.toString(), phoneError, 10)) {
      const users = getListOfUsers();
      const user = users.find((item) => item.phone == phone.value);

      if (user) {
        phoneError.innerHTML =
          "Your phone number is already exist, Please login";
        signup.classList.remove("hidden");
      } else {
        closeTreactPopup();
        loadOtpPop(sendOtp(), cb, id, phone, userName, needCb);
      }
    }
  });
  function closeTreactPopup() {
    document.querySelector(".treact-popup").classList.add("hidden");
  }
  signup.addEventListener("click", () => {
    closeTreactPopup();
    openLoginPopUp();
  });
  document.querySelector(".treact-popup").classList.remove("hidden");

  document
    .querySelector(".close-treact-popup")
    .addEventListener("click", closeTreactPopup);
};

export const openLoginPopUp = () => {
  document.getElementById("user-login-phone").innerHTML = `
  <div
        class="max-w-lg p-8 sm:pb-4 bg-white rounded shadow-lg text-center sm:text-left"
      >
        <h3
          class="text-xl w-full sm:text-2xl font-semibold mb-6 flex flex-col sm:flex-row items-center"
        >
          <div
            class="p-2 rounded-full w-full flex items-center justify-between mb-4 sm:mb-0 sm:mr-2"
          >
            <div class="flex items-center">
              <svg
                class="h-10 w-10 mr-1 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span class="font-bold">Mi Book</span>
            </div>
            <span class="hover:opacity-40 cursor-pointer close-login-popup">
              X
            </span>
          </div>
        </h3>
        <form class="space-y-6" id="user-login-form">
       
          <div>
            <label
              for="phone-number"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Phone Numebr</label
            >
            <div class="mt-2">
              <input
                id="phone-number"
                name="phone"
                maxlength="10"
                type="number"
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p class="text-red-500" id="phone-number-error"></p>
            <span class='hidden text-[#09203C] cursor-pointer signup' >Sign up</span>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get-otp
            </button>
          </div>
        </form>
        <div
          class="mt-8 pt-8 sm:pt-4 border-t -mx-8 px-8 flex flex-col sm:flex-row justify-end leading-relaxed"
        ></div>
      </div>
  `;
  const signup = document.querySelector(".signup");
  const number = document.getElementById("phone-number");
  const numberError = document.getElementById("phone-number-error");
  number.addEventListener("keydown", (e) => {
    if (
      e.keyCode === KEYS.backspace ||
      e.keyCode === KEYS.deleteKey ||
      e.keyCode === KEYS.rightKey ||
      e.keyCode === KEYS.leftKey ||
      e.keyCode === KEYS.enter
    ) {
      return true;
    }
    if (e.target.value.length === e.target.maxLength) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    return true;
  });
  document.getElementById("user-login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateNumber(number.value.toString(), numberError, 10)) {
      const users = getListOfUsers();
      const user = users.find((item) => item.phone == number.value);

      if (user) {
        closeLogin();
        loadOtpPop(sendOtp(), () => {}, 1, number, null, false, true);
      } else {
        numberError.innerHTML = "Your phone number is not exist";
        signup.classList.remove("hidden");
      }
    }
  });

  signup.addEventListener("click", () => {
    closeLogin();
    loadPhoneNUmberPopUp();
  });
  function closeLogin() {
    document.querySelector(".login-popup").classList.add("hidden");
  }

  document.querySelector(".login-popup").classList.remove("hidden");

  document
    .querySelector(".close-login-popup")
    .addEventListener("click", closeLogin);
};
export const validateNumber = (number, error, digits) => {
  if (number === "") {
    error.innerHTML = "This field is required!!";
    return false;
  }
  if (number.length >= 0 && number.length < digits) {
    error.innerHTML = `${
      digits == 10 ? "Number" : "Otp"
    } must be ${digits} digits`;
    return false;
  } else {
    error.innerHTML = "";
    return true;
  }
};
export const sendOtp = () => {
  const userOtp = Math.floor(100000 + Math.random() * 900000);

  return userOtp;
};
export const getListOfUsers = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  if (users) {
    return users;
  } else {
    localStorage.setItem("users", JSON.stringify([]));
    return [];
  }
};
export const getLogedInUser = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users"));
  if (users) {
    return users.find((item) => item.phone == user.phone);
  } else {
    localStorage.setItem("users", JSON.stringify([]));
    return {};
  }
};
