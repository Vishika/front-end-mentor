"use strict";

const nav = document.getElementById("nav");
const navOpen = document.getElementById("nav-open");
const navClose = document.getElementById("nav-close");
const media = window.matchMedia("(min-width: 43.75em)");
const main = document.getElementById("main");

function setupNav(event) {
  if (media.matches) {
    // is desktop
    closeNav();
    nav.removeAttribute("inert");
  } else {
    // is mobile so make sure that the navigation is "inert"
    // this means screen readers and keyboard navigation will be disabled for it
    nav.setAttribute("inert", "");
    nav.style.transition = "none";
  }
}

const openNav = function () {
  navOpen.setAttribute("aria-expanded", true);
  nav.removeAttribute("inert");
  nav.removeAttribute("style");
  main.setAttribute("inert", "");
  navClose.focus();
};

const closeNav = function () {
  navOpen.setAttribute("aria-expanded", false);
  main.removeAttribute("inert");
  if (!media.matches) {
    nav.setAttribute("inert", "");
  }
  setTimeout(() => {
    nav.style.transition = "none";
  }, 500);
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

navOpen.addEventListener("click", openNav);
navClose.addEventListener("click", closeNav);
nav.addEventListener("click", navLinkClicked);
nav.addEventListener("keyup", navLinkPressed);
media.addEventListener("change", setupNav);

setupNav();
