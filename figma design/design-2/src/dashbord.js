import {
  aboutme,
  companiesWork,
  toggleDark,
  whatMyClientSay,
} from "./healper.js";

document.addEventListener("DOMContentLoaded", () => {
  var swiper = new Swiper(".mySwiper.recent-work", {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination ",
      clickable: true,
    },
  });

  toggleDark();
  aboutme("#fdba0e");
  companiesWork();
  whatMyClientSay();

  const progressData = [
    {
      percentage: "75%",
      title: "Optimising Javascript loading time",
    },
    {
      percentage: "80%",
      title: "Speeding up Queries",
    },
    {
      percentage: "70%",
      title: "Optimising Image loading time",
    },
    {
      percentage: "75%",
      title: "Optimising CSS",
    },
    {
      percentage: "85%",
      title: "Optimising Database",
    },
  ];
  const progressBar = progressData
    .map(({ percentage, title }) => {
      return `
          <div class="pt-6">
              <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style="width: ${percentage}"
                >
                  ${percentage}
                </div>
              </div>
              <p>${title}</p>
            </div>
    `;
    })
    .join("");
  document.getElementById("progress").innerHTML = progressBar;
});
