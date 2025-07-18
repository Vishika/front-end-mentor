"use strict";

let currentAmount = 0;
let cartAmount = 0;
const productPrice = 125;

const nav = document.getElementById("nav");
const navOpen = document.getElementById("nav-open");
const navClose = document.getElementById("nav-close");
const cartOpenBtn = document.getElementById("cart-open");
const profileBtn = document.getElementById("profile-btn");
const media = window.matchMedia("(min-width: 69.375em)");
const main = document.getElementById("main");
const slidePrev = document.getElementById("slide-prev");
const slideNext = document.getElementById("slide-next");
const decrementAmountBtn = document.getElementById("decrement-amount");
const incrementAmountBtn = document.getElementById("increment-amount");
const amountOutput = document.getElementById("amount");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const cart = document.getElementById("cart");
const cartEmptySection = document.getElementById("cart-empty");
const cartNotEmptySection = document.getElementById("cart-not-empty");
const cartProductPriceOutput = document.getElementById("cart-product-price");
const cartAmountOutput = document.getElementById("cart-amount");
const cartTotalOutput = document.getElementById("cart-total");
const cartDeleteBtn = document.getElementById("cart-delete");
const cartAmountBubble = document.getElementById("cart-amount-bubble");
const thumbnailNav = document.getElementById("thumbnail-nav");

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
  cartOpenBtn.setAttribute("inert", "");
  profileBtn.setAttribute("inert", "");
};

const closeNav = function () {
  navOpen.setAttribute("aria-expanded", false);
  main.removeAttribute("inert");
  cartOpenBtn.removeAttribute("inert");
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

const decrementAmount = function () {
  if (currentAmount > 0) amountOutput.textContent = --currentAmount;
};

const incrementAmount = function () {
  if (currentAmount < 99) amountOutput.textContent = ++currentAmount;
};

const updateCart = function () {
  if (cartAmount > 0) {
    cartEmptySection.classList.remove("active");
    cartNotEmptySection.classList.add("active");
    cartAmountBubble.classList.add("active");
  } else {
    cartEmptySection.classList.add("active");
    cartNotEmptySection.classList.remove("active");
    cartAmountBubble.classList.remove("active");
  }
  cartAmountBubble.textContent = cartAmount;
  cartProductPriceOutput.textContent = "$" + productPrice + ".00";
  cartAmountOutput.textContent = cartAmount;
  cartTotalOutput.textContent = "$" + cartAmount * productPrice + ".00";
};

const addToCart = function () {
  cartAmount += currentAmount;
  updateCart();
};

const toggleCart = function () {
  cart.classList.toggle("active");
};

const deleteCart = function () {
  cartAmount = 0;
  updateCart();
};

const changeView = function (index) {
  const slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    slide.classList.remove("active");
    if (slide.getAttribute("view") == index) {
      slide.classList.add("active");
    }
  }
};

const thumbNavClicked = function (event) {
  let index;
  if (event.target.nodeName == "BUTTON") {
    index = event.target.getAttribute("view");
  }

  if (event.target.nodeName == "IMG") {
    index = event.target.parentNode.getAttribute("view");
  }

  if (typeof index == "undefined") {
    return;
  }

  const thumbs = document.getElementsByClassName("thumbnail");
  for (let i = 0; i < thumbs.length; i++) {
    const thumb = thumbs[i];
    thumb.classList.remove("thumbnail--active");
    if (thumb.getAttribute("view") == index) {
      thumb.classList.add("thumbnail--active");
    }
  }
  changeView(index);
};

navOpen.addEventListener("click", openNav);
navClose.addEventListener("click", closeNav);
nav.addEventListener("click", navLinkClicked);
nav.addEventListener("keyup", navLinkPressed);
media.addEventListener("change", setupNav);
slidePrev.addEventListener("click", prevSlide);
slideNext.addEventListener("click", nextSlide);
decrementAmountBtn.addEventListener("click", decrementAmount);
incrementAmountBtn.addEventListener("click", incrementAmount);
addToCartBtn.addEventListener("click", addToCart);
cartOpenBtn.addEventListener("click", toggleCart);
cartDeleteBtn.addEventListener("click", deleteCart);
thumbnailNav.addEventListener("click", thumbNavClicked);

setupNav();
