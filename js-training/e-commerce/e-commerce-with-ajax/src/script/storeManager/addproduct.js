import { sendNotification } from "../customNotification.js";
import { getcurrentUser, listOfProducts, setNavBar } from "../helper.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

document.addEventListener("DOMContentLoaded", () => {
  setNavBar(false);
  const name = document.getElementById("name");
  const category = document.getElementById("category");
  const decription = document.getElementById("decription");
  const price = document.getElementById("price");
  const discount = document.getElementById("discount");
  const brand = document.getElementById("brand");
  const warranty = document.getElementById("warranty");
  const returnPolicy = document.getElementById("return-policy");
  const imageWrapper = document.getElementById("images-wrapper");
  const images = [];
  const quntity = document.getElementById("quntity");

  let selectedWarranty = null;
  let selectedReturnPolicy = null;
  let selectedCategory = null;
  let myProducts;
  const deleteElement = (element) => {
    if (imageWrapper.childNodes.length === 1) {
      imageWrapper.parentElement.classList.add("hidden");
      imageWrapper.parentElement.classList.remove("flex");
    }
    element.target.parentElement.remove();
  };
  if (productId) {
    document.getElementById("title").innerHTML = "Edit product";
    document.getElementById("save-btn").innerHTML = "Edit product";

    myProducts = listOfProducts().find((item) => item.id == productId);
    name.value = myProducts.title;
    decription.value = myProducts.description;
    price.value = myProducts.price;
    discount.value = myProducts.discountPercentage;
    brand.value = myProducts.brand;
    quntity.value = myProducts.stock;
    warranty.value = myProducts.warrantyInformation;
    returnPolicy.value = myProducts.returnPolicy;
    imageWrapper.parentElement.classList.remove("hidden");
    imageWrapper.parentElement.classList.add("flex");

    myProducts.images.map((image) => {
      const div = document.createElement("div");
      div.setAttribute("class", "flex gap-2 my-1 input-holder");
      div.innerHTML = `
                   <input
                    type="text"
                    
                    placeholder="Product image.."
                    value="${image}"
                    class="images-list border py-2 px-3 border-[#1A374D] rounded-lg outline-none w-full"
                  />
                  <button
                    class="remove-btn w-fit py-2 text-xl font-semibold  px-5"
                    id="remove"
                    type="button"
                  >
                   -
                  </button>
  `;

      imageWrapper.appendChild(div);
      div.lastElementChild.addEventListener("click", deleteElement);
    });
  }
  // adding inputs

  const addBtns = document.getElementById("add-btn");
  const imageRegax = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;
  const imageError = document.getElementById("images-error");

  const input = addBtns.previousElementSibling;

  addBtns.addEventListener("click", () => {
    if (input.value.toString().trim() === "") {
      imageError.innerHTML = "Please write product image url...";
      return;
    }
    if (input.value.match(imageRegax)) {
      const div = document.createElement("div");
      div.setAttribute("class", "flex gap-2 my-1 input-holder");

      div.innerHTML = `
                   <input
                    type="text"
                    
                    placeholder="Product image.."
                    value="${input.value}"
                    class="images-list border py-2 px-3 border-[#1A374D] rounded-lg outline-none w-full"
                  />
                  <button
                    class="remove-btn w-fit py-2 text-xl font-semibold px-5"
                    id="remove"
                    type="button"
                  >
                    -
                  </button>
  `;
      imageWrapper.parentElement.classList.remove("hidden");

      imageWrapper.parentElement.classList.add("flex");
      imageWrapper.appendChild(div);
      div.lastElementChild.addEventListener("click", deleteElement);
      input.value = "";
    } else {
      imageError.innerHTML =
        "Image must contain .jpg/.jpeg/.png/.webp formates";
      return;
    }
  });

  const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];
  let categoryHtml = `<option value="select" key="">
       Select
      </option>`;

  categoryHtml += categories
    .map((option) => {
      return `<option value="${option}" ${
        productId && option == myProducts.category ? "selected" : ""
      } key="">
        ${option}
      </option>`;
    })
    .join("");
  category.innerHTML = categoryHtml;

  name.addEventListener("input", (e) => {
    if (name.value.toString().trim() === "") {
      name.nextElementSibling.innerHTML = "This field is required...";
    } else {
      name.nextElementSibling.innerHTML = "";
    }
  });
  category.addEventListener("input", (e) => {
    if (category.value.toString().trim() === "") {
      category.nextElementSibling.innerHTML = "This field is required...";
    } else {
      category.nextElementSibling.innerHTML = "";
    }
  });
  decription.addEventListener("input", (e) => {
    if (decription.value.toString().trim() === "") {
      decription.nextElementSibling.innerHTML = "This field is required...";
    } else {
      decription.nextElementSibling.innerHTML = "";
    }
  });
  price.addEventListener("input", (e) => {
    if (price.value.toString().trim() === "") {
      price.nextElementSibling.innerHTML = "This field is required...";
    } else {
      price.nextElementSibling.innerHTML = "";
    }
  });
  discount.addEventListener("input", (e) => {
    if (discount.value.toString().trim() === "") {
      discount.nextElementSibling.innerHTML = "This field is required...";
    } else {
      discount.nextElementSibling.innerHTML = "";
    }
  });
  brand.addEventListener("input", (e) => {
    if (brand.value.toString().trim() === "") {
      brand.nextElementSibling.innerHTML = "This field is required...";
    } else {
      brand.nextElementSibling.innerHTML = "";
    }
  });
  warranty.addEventListener("change", (e) => {
    if (warranty.value === "select") {
      warranty.nextElementSibling.innerHTML = "This field is required...";
    } else {
      warranty.nextElementSibling.innerHTML = "";
    }
  });
  returnPolicy.addEventListener("change", (e) => {
    if (returnPolicy.value === "select") {
      returnPolicy.nextElementSibling.innerHTML = "This field is required...";
    } else {
      returnPolicy.nextElementSibling.innerHTML = "";
    }
  });

  quntity.addEventListener("input", (e) => {
    if (quntity.value.toString().trim() === "") {
      quntity.nextElementSibling.innerHTML = "This field is required...";
    } else {
      quntity.nextElementSibling.innerHTML = "";
    }
  });
  input.addEventListener("input", (e) => {
    if (input.value.toString().trim() === "") {
      imageError.innerHTML = "This field is required...";
    } else {
      imageError.innerHTML = "";
    }
  });

  document
    .getElementById("add-product-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        validate([
          name,
          category,
          decription,
          price,
          discount,
          brand,
          warranty,
          returnPolicy,
          quntity,
        ])
      ) {
        const productId = Date.now();
        const productData = {
          title: name.value,
          category: category.value,
          description: decription.value,
          price: price.value,
          discountPercentage: discount.value,
          brand: brand.value,
          warrantyInformation: warranty.value,
          returnPolicy: returnPolicy.value,
          stock: quntity.value,
          rating: 0,
          availabilityStatus: quntity.value != 0 ? "In stock" : "Out of stock",
          images: images,
          shippingInformation: "Ships in 1 month",
        };

        if (myProducts) {
          editProduct(productData, myProducts.id);
        } else addProduct(productData, productId);
      }
    });
  const validate = (elements = []) => {
    let allDone = true;
    elements.forEach((element) => {
      if (allDone) {
        if (element.value.toString().trim() === "") {
          element.nextElementSibling.innerHTML = "This field is required...";
          allDone = false;
          element.focus();
        }
      } else {
        return;
      }
    });
    if (allDone) {
      if (category.value === "select") {
        category.nextElementSibling.innerHTML = "This field is required...";
        category.focus();
        allDone = false;
        return;
      } else {
        selectedCategory = category.value;
      }
      if (warranty.value === "select") {
        warranty.nextElementSibling.innerHTML = "This field is required...";
        warranty.focus();
        allDone = false;
        return;
      } else {
        selectedWarranty = warranty.value;
      }
      if (returnPolicy.value === "select") {
        returnPolicy.nextElementSibling.innerHTML = "This field is required...";
        returnPolicy.focus();
        allDone = false;
        return;
      } else {
        selectedReturnPolicy = returnPolicy.value;
      }

      if (input.value === "" && imageWrapper.childNodes.length === 0) {
        imageError.innerHTML = "This field is required...";
        input.focus();
        allDone = false;
        return;
      } else if (imageWrapper.childNodes.length !== 0) {
        document.querySelectorAll(".images-list").forEach((item) => {
          images.push(item.value);
        });
      } else {
        imageError.innerHTML = "Atleast one image is required...";
        allDone = false;
        return;
      }
    }

    return allDone;
  };
});
const addProduct = (productData, productId) => {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://dummyjson.com/products/add", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(productData));
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 201) {
      sendNotification("success", "Product Added succesfully...");
      const userData = JSON.parse(
        localStorage.getItem(getcurrentUser().toString())
      );
      let products = listOfProducts();
      if (!products) {
        products = [];
      }
      products.push({ ...productData, id: productId });

      if (userData.store) {
        userData.store.push(productId);
      } else {
        userData.store = [];
        userData.store.push(productId);
      }

      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem(
        getcurrentUser().toString(),
        JSON.stringify(userData)
      );

      location = "/src/storeManager/dash-board.html";
    } else if (xhr.readyState === 4 && xhr.status !== 201) {
      sendNotification("error", "Fail to add product...");
      location.reload();
    }
  };
};
const editProduct = (productData, id) => {
  let allUserProduct = listOfProducts();

  allUserProduct = allUserProduct.map((item, index) =>
    item.id == id
      ? { ...allUserProduct[index][id], ...productData }
      : { ...item }
  );
  localStorage.setItem("products", JSON.stringify(allUserProduct));
  location = "/src/storeManager/dash-board.html";
};
