import {
  aboutme,
  companiesWork,
  toggleDark,
  whatMyClientSay,
} from "./healper.js";

document.addEventListener("DOMContentLoaded", () => {
  toggleDark();
  aboutme("#EE6C4D");
  companiesWork();
  whatMyClientSay();
  const workData = [
    {
      title: "Ecommerce Landing page",
      image: "./assets/work1.png",
    },
    {
      title: "Basketball Studio",
      image: "./assets/work2.png",
    },
    {
      title: "Perfume Company site",
      image: "./assets/work3.png",
    },
    {
      title: "Health care site",
      image: "./assets/work4.png",
    },
    {
      title: "Real Estate",
      image: "./assets/work5.png",
    },
    {
      title: "Bank Wallet",
      image: "./assets/work6.png",
    },
  ];
  const workHtml = workData
    .map(
      ({ image, title }) => `
      
    <div class="w-[313px] cursor-pointer work-card">
            <p>${title}</p>
            <div class="pt-[14px]">
              <img src="${image}" alt="" />
            </div>
          </div>
  `
    )
    .join("");
  document.getElementById("mywork").innerHTML = workHtml;
  document.querySelectorAll(".work-card").forEach((item) => {
    item.addEventListener("click", () => {
      location = "/src";
    });
  });
});
