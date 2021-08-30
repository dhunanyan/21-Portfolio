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

//HOME
/**
 * ITEManimate object is used to animate ease with bezier functions
 * example: TweenMax.to($('selector'), 1.5, {left:"80%", ease: ITEManimate.bezier(0.04,0.86,0.8,1)});
 *
 * Used: https://github.com/rdallasgray/bez
   Forked from: https://codepen.io/karlovidek/pen/qOxYjp
 */
var ITEManimate = {
  start: 0,
  bezier: function (p0, p1, p2, p3) {
    return ITEManimate.polyBez([p0, p1], [p2, p3]);
  },
  polyBez: function (p1, p2) {
    var A = [null, null],
      B = [null, null],
      C = [null, null],
      bezCoOrd = function (t, ax) {
        (C[ax] = 3 * p1[ax]),
          (B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax]),
          (A[ax] = 1 - C[ax] - B[ax]);
        return t * (C[ax] + t * (B[ax] + t * A[ax]));
      },
      xDeriv = function (t) {
        return C[0] + t * (2 * B[0] + 3 * A[0] * t);
      },
      xForT = function (t) {
        var x = t,
          i = 0,
          z;
        while (++i < 14) {
          z = bezCoOrd(x, 0) - t;
          if (Math.abs(z) < 1e-3) break;
          x -= z / xDeriv(x);
        }
        return x;
      };
    return function (t) {
      return bezCoOrd(xForT(t), 1);
    };
  },
};

//CUSTOM JS CODE
(function ($) {
  //VIEWPORT
  var w = $(window);

  //ANIMATION
  var animationTrigger1 = $(".trigger1");
  var animationTrigger2 = $(".trigger2");
  var sceneContainer = $(".slide-wrapper");
  var smallCircles = $(".small-circle");
  var portfolioContainer = $(".portfolio-wrapper");

  var main = {
    init: function () {
      var self = this;
      //GSAP ANIMATE
      main.animate();
    },

    //GSAP ANIMATION
    animate: function () {
      //OPEN
      function openAnimation() {
        TweenMax.to(sceneContainer, 1.8, {
          height: "100%",
          ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
          top: "0%",
          ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
          width: "100%",
          ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
          left: "0%",
          ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),

          onComplete: function () {
            console.log(sceneContainer);
            TweenMax.to(portfolioContainer, 1.8, {
              width: "100%",
              ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
              top: "30%",
              ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
            });
            TweenMax.to(sceneContainer, 0.8, {
              top: "-85%",
              ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
            });
          },
        });

        TweenMax.to(smallCircles, 0.4, {
          scale: "0",
          ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
        });
      }

      //CLOSE
      function closeAnimation() {
        TweenMax.to(portfolioContainer, 1.2, {
          top: "100%",
          ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
          width: "100%",
          ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),

          onComplete: function () {
            TweenMax.to(sceneContainer, 0.8, {
              height: "80%",
              ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
              top: "10%",
              ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
              width: "80%",
              ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
              left: "10%",
              ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
              onComplete: function () {
                TweenMax.to(smallCircles, 0.4, {
                  scale: "1",
                  ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
                });
              },
            });
          },
        });
      }

      animationTrigger1.click(function () {
        animationTrigger2.fadeOut(400);
        $(this).attr("data-toggle", "opened");
        openAnimation();
      });

      animationTrigger2.click(function () {
        animationTrigger2.fadeOut(400);
        if ($(this).attr("data-toggle") == "closed") {
          $(this).attr("data-toggle", "opened");
          openAnimation();
        } else if ($(this).attr("data-toggle", "opened")) {
          $(this).attr("data-toggle", "closed");
          closeAnimation();
        }
      });
    },
  };

  $(window).resize(function () {});
  return main.init();
})($);

//TEXT ANIMATION

$(document).ready(function () {
  $(".main-home__title").lettering();
});

$(document).ready(function () {
  animation();
}, 300);

$(".button").click(function () {
  animation();
});

function animation() {
  var title1 = new TimelineMax();
  title1.to(".button", 0, { visibility: "hidden", opacity: 0 });
  title1.staggerFromTo(
    ".main-home__title",
    0.8,
    { ease: Back.easeOut.config(5), opacity: 0, bottom: -120 },
    { ease: Back.easeOut.config(5), opacity: 1, bottom: 0 },
    0.05
  );

  title1.staggerFromTo(
    ".main-home__subtitle",
    0.5,
    { ease: Back.easeOut.config(1.7), opacity: 0, bottom: -120 },
    { ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0 },
    0.05
  );

  title1.staggerFromTo(
    ".main-home__btn",
    0.3,
    { ease: Back.easeOut.config(1.7), opacity: 0, bottom: -250 },
    { ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0 },
    0.05
  );
  title1.to(".button", 0.2, { visibility: "visible", opacity: 1 });
}

//TABS
let tabs = document.querySelector(".tabs");
let tabHeader = tabs.querySelector(".tabs__header");
let tabBody = tabs.querySelector(".tabs__body");
let tabIndicator = tabs.querySelector(".tabs__indicator");
let tabHeaderNodes = tabs.querySelectorAll(".menu__link");
let tabBodyNodes = tabs.querySelectorAll(".body__section");
let worksButton = tabs.querySelector(".portfolio__btn");
let worksSection = tabs.querySelector(".games");
let worksLink = tabs.querySelector(".menu__works");
let home = tabs.querySelector(".menu__home");

for (let i = 0; i < tabHeaderNodes.length; i++) {
  tabHeaderNodes[i].addEventListener("click", function () {
    if (menuList.classList.contains("_show")) {
      menuList.classList.toggle("_show");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
    tabHeader.querySelector("._active").classList.remove("_active");
    tabHeaderNodes[i].classList.add("_active");
    tabBody.querySelector("._active").classList.remove("_active");
    tabBodyNodes[i].classList.add("_active");
    tabIndicator.style.left = `calc(calc(25% * ${i}) )`;
    e.preventDefault(e);
  });
}

worksButton.addEventListener("click", function (e) {
  if (menuList.classList.contains("_show")) {
    menuList.classList.toggle("_show");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  }

  tabHeader.querySelector("._active").classList.remove("_active");
  worksLink.classList.add("_active");
  tabBody.querySelector("._active").classList.remove("_active");
  worksSection.classList.add("_active");
  tabIndicator.style.left = `calc(calc(25%) )`;
  e.preventDefault(e);
});
