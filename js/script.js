"use strict";
//CARDS

const buttons = document.querySelectorAll(".game__rank");
const icons = document.querySelectorAll(".fas");
let activeButtons = 0;
if (buttons.length > 0) {
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const currentButton = e.target.parentElement;
      const currentIcon = currentButton.querySelector(".fas");

      currentButton.classList.toggle("_active");

      currentIcon.classList.toggle("fa-search-plus");
      currentIcon.classList.toggle("fa-search-minus");

      const activeButtons = document.querySelectorAll(".game__rank._active");

      if (activeButtons.length > 1) {
        activeButtons.forEach((activeButton) => {
          activeButton.classList.remove("_active");
          const activeIcon = activeButton.querySelector(".fas");
          activeIcon.classList.toggle("fa-search-plus");
          activeIcon.classList.toggle("fa-search-minus");
        });
        currentButton.classList.toggle("_active");

        currentIcon.classList.toggle("fa-search-plus");
        currentIcon.classList.toggle("fa-search-minus");
      }
    });
  });
}

//TABS

let tabs = document.querySelector(".tabs");
let tabHeader = tabs.querySelector(".tabs__header");
let tabBody = tabs.querySelector(".tabs__body");
let tabIndicator = tabs.querySelector(".tabs__indicator");
let tabHeaderNodes = tabs.querySelectorAll(".menu__link");
let tabBodyNodes = tabs.querySelectorAll(".body__section");

for (let i = 0; i < tabHeaderNodes.length; i++) {
  tabHeaderNodes[i].addEventListener("click", function () {
    tabHeader.querySelector("._active").classList.remove("_active");
    tabHeaderNodes[i].classList.add("_active");
    tabBody.querySelector("._active").classList.remove("_active");
    tabBodyNodes[i].classList.add("_active");
    tabIndicator.style.left = `calc(calc(25% * ${i}) )`;
    e.preventDefault(e);
  });
}

//MENU BURGER
const iconMenu = document.querySelector(".menu__icon");
const icon = document.querySelector(".menu__icon>i");
const menuList = document.querySelector(".menu__list");

iconMenu.addEventListener("click", function () {
  menuList.classList.toggle("_show");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});
