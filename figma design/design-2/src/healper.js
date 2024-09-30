// Toggle Dark Functionality
let flag = true;
const toggler = document.querySelector(".toggler");

// Toggle Dark Function
export const toggleDark = () => {
  toggler.addEventListener("click", () => {
    const html = document.documentElement;
    toggler.children[0].classList.toggle("translate-x-10");
    if (flag) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    flag = !flag;
  });
};
export const aboutme = (color) => {
  document.getElementById("aboutme").innerHTML = `
  <h1 class="text-xl md:text-[28px]">About Me</h1>
          <div style="background:${color}" class=" h-[3px] w-full my-[16px]"></div>
          <p class="text-sm md:text-base lg:text-lg">
            My passion for building websites started since 2013 and since then
            i have helped companies around the world build amazing websites
            and products that create real value for the business and users.
            <br />
            I enjoy solving problems with clean scalable solutions and I also
            have a genuine passion for inspiring design. <br />
            I am a fullstack developer focusing on core frontend and backend
            technologies which include HTML, CSS, Javascript, React and other
            core languages
          </p>
  `;
};

const images = [
  "./assets/google.png",
  "./assets/amezon.png",
  "./assets/bolt.png",
  "./assets/netflix.png",
  "./assets/paypal.png",
];
export const companiesWork = (bg) => {
  const slider = `
            <div
                    class="scroll-arrow  w-[10%] inline-block align-middle cursor-pointer p-0 m-0 opacity-50 text-[34px] transition duration-[0.2s] hover:transition hover:duration-[0.2s] hover:opacity-100"
                    id="scroll-left"
                  >
                    &#8592;
                  </div>
                  <ul
                    id="imgList"
                    class="w-[70%] scroll-smooth inline-block relative align-middle text-center overflow-x-hidden overflow-y-hidden whitespace-nowrap"
                  >
                  ${images
                    .map(
                      (image) => `
                        <li
                      class="inline-block relative align-middle w-[20%] mr-[1.5%] ml-[1.5%] grayscale transition duration-[0.2s] hover:transition hover:duration-[0.2s] hover:grayscale-0"
                    >
                      <img
                        src="${image}"
                      />
                    </li>    
                        `
                    )
                    .join("")}
                    
                  </ul>
                  <div
                    class="scroll-arrow w-[10%] inline-block align-middle cursor-pointer p-0 m-0 opacity-50 text-[34px] transition duration-[0.2s] hover:transition hover:duration-[0.2s] hover:opacity-100"
                    id="scroll-right"
                    
                  >
                    &#8594;
                  </div>
        `;
  document.getElementById("companys").innerHTML = slider;
  const imgList = document.getElementById("imgList");
  const scrollRight = document.getElementById("scroll-right");
  const scrollLeft = document.getElementById("scroll-left");

  // When a user clicks on the right arrow, the ul will scroll 750px to the right
  scrollRight.addEventListener("click", (event) => {
    imgList.scrollBy(750, 0);
  });

  // When a user clicks on the left arrow, the ul will scroll 750px to the left
  scrollLeft.addEventListener("click", (event) => {
    imgList.scrollBy(-750, 0);
  });
};
// testo
const testoImages = [
  {
    name: "Charles Dim",
    image: "./assets/client1.png",
    position: "Lead Designer, Netflix",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt in malesuada tristique arcu non eu lectus orci. Amet non, sed eget ultrices cursus diam orci. Risus sed tristique lectus fusce lacus.",
  },
  {
    name: "Margeret Wills",
    image: "./assets/client2.png",
    position: "CEO, Ebay",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt in malesuada tristique arcu non eu lectus orci. Amet non, sed eget ultrices cursus diam orci. Risus sed tristique lectus fusce lacus.",
  },
  {
    name: "Harshit",
    image: "./assets/client3.png",
    position: "Web developer",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt in malesuada tristique arcu non eu lectus orci. Amet non, sed eget ultrices cursus diam orci. Risus sed tristique lectus fusce lacus.",
  },
  {
    name: "Miss Diyu",
    image: "./assets/client4.png",
    position: "Web developer",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt in malesuada tristique arcu non eu lectus orci. Amet non, sed eget ultrices cursus diam orci. Risus sed tristique lectus fusce lacus.",
  },
];
export const whatMyClientSay = () => {
  const testoSlider = testoImages
    .map(
      ({ image, name, message, position }) => `
                 <div class="swiper-slide cursor-pointer">
               <div
                    class="dark:bg-[#00000073]  bg-white py-[15px] px-[18px] "
                  >
                    <div class="flex flex-shrink-0 justify-between items-center">
                      <div class="flex items-center gap-1">
                        <img class="w-[40px] h-[40px] object-contain" src="${image}" alt="" />
                        <div class="text-start">
                          <h2 class="text-sm md:text-base lg:text-lg">
                          ${name}
                          </h2>
                          <p class="text-[#C5C5C5] text-xs md:text-sm">
                           ${position}
                          </p>
                        </div>
                      </div>
                      <div class="">
                        <img src="./assets/quote.svg" alt="" />
                      </div>
                    </div>
                    <div class="py-[15px]">
                    ${message}
                    </div>
                  </div>
                  </div>
    `
    )
    .join("");
  document.getElementById("client").innerHTML = testoSlider;
  var swiper = new Swiper(".mySwiper.clients", {
    cssMode: true,
    slidesPerView: 2,
    grid: {
      rows: 1,
    },
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      clickable: true,
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
      // when window width is <= 499px

      100: {
        slidesPerView: 1,
        spaceBetweenSlides: 20,
      },
      // when window width is <= 999px
      1024: {
        slidesPerView: 2,
        spaceBetweenSlides: 40,
      },
    },
  });
};
