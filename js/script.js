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

//MENU BURGER
const iconMenu = document.querySelector(".menu__icon");
const icon = document.querySelector(".menu__icon>i");
const menuList = document.querySelector(".menu__list");

iconMenu.addEventListener("click", function () {
  menuList.classList.toggle("_show");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

//TABS
let tabs = document.querySelector(".tabs");
let tabHeader = tabs.querySelector(".tabs__header");
let tabBody = tabs.querySelector(".tabs__body");
let tabIndicator = tabs.querySelector(".tabs__indicator");
let tabHeaderNodes = tabs.querySelectorAll(".menu__link");
let tabBodyNodes = tabs.querySelectorAll(".body__section");

for (let i = 0; i < tabHeaderNodes.length; i++) {
  tabHeaderNodes[i].addEventListener("click", function () {
    if (menuList.classList.contains("_show")) {
      menuList.classList.toggle("_show");
    }
    tabHeader.querySelector("._active").classList.remove("_active");
    tabHeaderNodes[i].classList.add("_active");
    tabBody.querySelector("._active").classList.remove("_active");
    tabBodyNodes[i].classList.add("_active");
    tabIndicator.style.left = `calc(calc(25% * ${i}) )`;
    e.preventDefault(e);
  });
}

//SLIDER
const wrapper = document.querySelector(".scroll__wrapper");
const el = document.querySelector(".scroll");
const filler = document.querySelector(".scroll__filler");
const position = document.querySelector(".scroll__position-inner");
const inner = document.querySelector(".scroll__inner");
const btns = {
  prev: document.querySelector(".scroll__btn.prev"),
  next: document.querySelector(".scroll__btn.next"),
};

const lerp = (a, b, n) => {
  return (1 - n) * a + n * b;
};

const padding = 20;

let scrollNow = 0;

filler.style.width = inner.offsetWidth + padding * 2 + "px";
position.style.width =
  (wrapper.offsetWidth / (inner.offsetWidth + padding * 2)) * 100 + "%";

const offset = 150;
const angle = 25;
const z = 15;

function render() {
  let now = lerp(scrollNow, wrapper.scrollLeft, 0.02);
  gsap.set(el, { x: -now });
  gsap.set(position, { x: (now / wrapper.offsetWidth) * 100 + "%" });

  document.querySelectorAll(".scroll__item").forEach((item) => {
    let elPos = item.offsetLeft + item.offsetWidth / 2 - scrollNow;

    if (elPos > wrapper.offsetWidth - offset) {
      let q = (wrapper.offsetWidth - elPos) / offset;
      gsap.set(item, { rotateY: -(angle - q * angle), z: z - z * q });
    } else if (elPos < offset) {
      let q = elPos / offset;
      gsap.set(item, { rotateY: angle - q * angle, z: z - z * q });
    } else {
      gsap.set(item, { rotateY: 0, z: 0 });
    }
  });

  scrollNow = now;

  if (wrapper.scrollLeft === 0) btns.prev.disabled = true;
  else if (
    inner.offsetWidth - wrapper.scrollLeft ===
    wrapper.offsetWidth - padding * 2
  )
    btns.next.disabled = true;
  else {
    btns.prev.disabled = false;
    btns.next.disabled = false;
  }
  requestAnimationFrame(render);
}

render();

function nextBtn() {
  window.innerWidth < 1230
    ? (wrapper.scrollLeft +=
        document.querySelector(".scroll__item").offsetWidth * 1 - 20)
    : (wrapper.scrollLeft +=
        document.querySelector(".scroll__item").offsetWidth * 2 - 20);
  if (window.innerWidth < 800 && window.innerWidth > 700) {
    wrapper.scrollLeft +=
      document.querySelector(".scroll__item").offsetWidth * 2 - 20;
  }
  if (window.innerWidth < 700 && window.innerWidth > 500) {
    wrapper.scrollLeft +=
      document.querySelector(".scroll__item").offsetWidth * 1 - 20;
  }

  if (window.innerWidth < 576) {
    wrapper.scrollLeft +=
      document.querySelector(".scroll__item").offsetWidth / 100 - 20;
  }
}
function prevBtn() {
  window.innerWidth < 1230
    ? (wrapper.scrollLeft -=
        document.querySelector(".scroll__item").offsetWidth * 1 - 20)
    : (wrapper.scrollLeft -=
        document.querySelector(".scroll__item").offsetWidth * 2 - 20);
  if (window.innerWidth < 800 && window.innerWidth > 700) {
    wrapper.scrollLeft -=
      document.querySelector(".scroll__item").offsetWidth * 2 - 20;
  }
  if (window.innerWidth < 700 && window.innerWidth > 500) {
    wrapper.scrollLeft -=
      document.querySelector(".scroll__item").offsetWidth * 1 - 20;
  }

  if (window.innerWidth < 576) {
    wrapper.scrollLeft -=
      document.querySelector(".scroll__item").offsetWidth / 100 - 20;
  }
}

//BACKGROUND
