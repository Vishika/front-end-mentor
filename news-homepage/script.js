"use strict";

const nav = document.getElementById("nav");
const navOpen = document.getElementById("nav-open");
const navClose = document.getElementById("nav-close");

const toggleNav = function () {
  nav.classList.toggle("open");
};

const navLinkClicked = function (event) {
  if (event.target.nodeName === "A") {
    toggleNav();
  }
};

navOpen.addEventListener("click", toggleNav);
navClose.addEventListener("click", toggleNav);
nav.addEventListener("click", navLinkClicked);
