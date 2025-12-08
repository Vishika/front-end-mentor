"use strict";

const btnMenuOpen = document.getElementById("btn-menu-open");
const btnMenuClose = document.getElementById("btn-menu-close");
const containerMain = document.getElementById("container-main");
const containerNav = document.getElementById("container-nav");
const mainTitle = document.getElementById("main-title");
const mainLogo = document.getElementById("main-logo");

const openMenu = function (event) {
  console.log("opened!");

  Array.from(containerMain.children).map((child) =>
    child.classList.contains("splash")
      ? child.removeAttribute("inert")
      : child.setAttribute("inert", "")
  );
  containerNav.removeAttribute("inert");
  btnMenuClose.focus();
  mainTitle.setAttribute("inert", "");
  mainLogo.setAttribute("inert", "");
  btnMenuOpen.setAttribute("aria-expanded", "true");
};

const closeMenu = function (event) {
  console.log("closed!");

  Array.from(containerMain.children).map((child) =>
    child.removeAttribute("inert")
  );
  containerNav.setAttribute("inert", "");
  mainTitle.removeAttribute("inert");
  mainLogo.removeAttribute("inert");
  btnMenuOpen.setAttribute("aria-expanded", "false");
};

btnMenuOpen.addEventListener("click", openMenu);
btnMenuClose.addEventListener("click", closeMenu);
