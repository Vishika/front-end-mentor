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
const slidePrevCarousel = document.getElementById("slide-prev--carousel");
const slideNextCarousel = document.getElementById("slide-next--carousel");
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
const thumbnailNavCarousel = document.getElementById("thumbnail-nav--carousel");
const closeLightboxBtn = document.getElementById("close-lightbox-btn");
const lightbox = document.getElementById("lightbox");
const carousel = document.getElementById("carousel");
const slidePrevLightbox = document.getElementById("slide-prev--lightbox");
const slideNextLightbox = document.getElementById("slide-next--lightbox");
const thumbnailNavLightbox = document.getElementById("thumbnail-nav--lightbox");

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

const changeSlide = function (index, className) {
  const slides = document.getElementsByClassName(`slide--${className}`);
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].getAttribute("view") == index) {
      slides[i].classList.add("active");
    }
  }
};

const prev = function (className) {
  const slides = document.getElementsByClassName(`slide--${className}`);
  let index;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("active")) {
      slides[i].classList.remove("active");
      index = slides[i].getAttribute("view");
    }
  }
  let previous;
  if (index == 1) {
    previous = 4;
  } else {
    previous = --index;
  }

  changeSlide(previous, className);
  changeThumb(previous, className);
};

const next = function (className) {
  const slides = document.getElementsByClassName(`slide--${className}`);
  let index;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("active")) {
      slides[i].classList.remove("active");
      index = slides[i].getAttribute("view");
    }
  }

  let next;
  if (index == 4) {
    next = 1;
  } else {
    next = ++index;
  }

  changeSlide(next, className);
  changeThumb(next, className);
};

const prevSlideCarousel = function () {
  prev("carousel");
};

const nextSlideCarousel = function () {
  next("carousel");
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

const changeView = function (index, className) {
  const slides = document.getElementsByClassName(`slide--${className}`);

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    slide.classList.remove("active");
    if (slide.getAttribute("view") == index) {
      slide.classList.add("active");
    }
  }
};

const changeThumb = function (index, className) {
  console.log(`changing thumbs for ${className} at ${index}`);

  const thumbs = document.getElementsByClassName(`thumbnail--${className}`);
  for (let i = 0; i < thumbs.length; i++) {
    const thumb = thumbs[i];
    thumb.classList.remove("thumbnail--active");
    if (thumb.getAttribute("view") == index) {
      thumb.classList.add("thumbnail--active");
    }
  }
};

const thumbNavClicked = function (event, className) {
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

  changeThumb(index, className);
  changeView(index, className);
};

const thumbNavCarouselClicked = function (event) {
  thumbNavClicked(event, "carousel");
};

const thumbNavLightboxClicked = function (event) {
  thumbNavClicked(event, "lightbox");
};

const closeLightbox = function () {
  lightbox.classList.remove("active");
};

const carouselClicked = function (event) {
  if (window.innerWidth < 1110) return;

  const parent = event.target.parentNode;
  if (parent.classList.contains("slide")) {
    lightbox.classList.add("active");
  }
};

const prevSlideLightbox = function () {
  prev("lightbox");
};

const nextSlideLightbox = function () {
  next("lightbox");
};

navOpen.addEventListener("click", openNav);
navClose.addEventListener("click", closeNav);
nav.addEventListener("click", navLinkClicked);
nav.addEventListener("keyup", navLinkPressed);
media.addEventListener("change", setupNav);
slidePrevCarousel.addEventListener("click", prevSlideCarousel);
slideNextCarousel.addEventListener("click", nextSlideCarousel);
decrementAmountBtn.addEventListener("click", decrementAmount);
incrementAmountBtn.addEventListener("click", incrementAmount);
addToCartBtn.addEventListener("click", addToCart);
cartOpenBtn.addEventListener("click", toggleCart);
cartDeleteBtn.addEventListener("click", deleteCart);
thumbnailNavCarousel.addEventListener("click", thumbNavCarouselClicked);
closeLightboxBtn.addEventListener("click", closeLightbox);
carousel.addEventListener("click", carouselClicked);
slidePrevLightbox.addEventListener("click", prevSlideLightbox);
slideNextLightbox.addEventListener("click", nextSlideLightbox);
thumbnailNavLightbox.addEventListener("click", thumbNavLightboxClicked);

setupNav();
