"use strict";

const nav = document.getElementById("nav");
const navOpen = document.getElementById("nav-open");
const navClose = document.getElementById("nav-close");
const cartOpen = document.getElementById("cart-open");
const profileBtn = document.getElementById("profile-btn");
const media = window.matchMedia("(min-width: 69.375em)");
const main = document.getElementById("main");
const slidePrev = document.getElementById("slide-prev");
const slideNext = document.getElementById("slide-next");

function setupNav(event) {
  if (media.matches) {
    closeNav();
    nav.removeAttribute("inert");
  } else {
    nav.setAttribute("inert", "");
  }
}

const openNav = function () {
  navOpen.setAttribute("aria-expanded", true);
  navClose.focus();
  nav.removeAttribute("inert");
  main.setAttribute("inert", "");
  cartOpen.setAttribute("inert", "");
  profileBtn.setAttribute("inert", "");
};

const closeNav = function () {
  navOpen.setAttribute("aria-expanded", false);
  main.removeAttribute("inert");
  cartOpen.removeAttribute("inert");
  profileBtn.removeAttribute("inert");
  if (!media.matches) {
    nav.setAttribute("inert", "");
  }
  navOpen.focus();
};

const navLinkClicked = function (event) {
  if (event.target.nodeName === "A") {
    closeNav();
  }
};

const navLinkPressed = function (event) {
  if (event.code === "Space" && event.target.nodeName === "A") {
    closeNav();
  }
};

const prevSlide = function () {
  const slides = document.getElementsByClassName("slide");
  let index;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("active")) {
      slides[i].classList.remove("active");
      index = i;
    }
  }
  let previous;
  if (index == 0) {
    previous = 3;
  } else {
    previous = --index;
  }
  slides[previous].classList.add("active");
};

const nextSlide = function () {
  const slides = document.getElementsByClassName("slide");
  let index;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("active")) {
      slides[i].classList.remove("active");
      index = i;
    }
  }
  let next;
  if (index == 3) {
    next = 0;
  } else {
    next = ++index;
  }
  slides[next].classList.add("active");
};

navOpen.addEventListener("click", openNav);
navClose.addEventListener("click", closeNav);
nav.addEventListener("click", navLinkClicked);
nav.addEventListener("keyup", navLinkPressed);
media.addEventListener("change", setupNav);
slidePrev.addEventListener("click", prevSlide);
slideNext.addEventListener("click", nextSlide);

setupNav();
