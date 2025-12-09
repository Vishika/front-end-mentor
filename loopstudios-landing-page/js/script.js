"use strict";

const btnMenuOpen = document.getElementById("btn-menu-open");
const btnMenuClose = document.getElementById("btn-menu-close");
const containerMain = document.getElementById("container-main");
const containerNav = document.getElementById("container-nav");
const mainTitle = document.getElementById("main-title");
const mainLogo = document.getElementById("main-logo");
let deactivatedMenu = false;

const openMenu = function (event) {
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
  Array.from(containerMain.children).map((child) =>
    child.removeAttribute("inert")
  );
  containerNav.setAttribute("inert", "");
  mainTitle.removeAttribute("inert");
  mainLogo.removeAttribute("inert");
  btnMenuOpen.setAttribute("aria-expanded", "false");
};

const handleResize = function () {
  if (!deactivatedMenu && window.innerWidth >= 1440) {
    deactivatedMenu = true;
    closeMenu();
    containerNav.removeAttribute("inert");
  }

  if (deactivatedMenu && window.innerWidth < 1440) {
    deactivatedMenu = false;
    containerNav.setAttribute("inert", "");
  }
};

btnMenuOpen.addEventListener("click", openMenu);
btnMenuClose.addEventListener("click", closeMenu);
window.addEventListener("resize", handleResize);
