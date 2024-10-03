"use strict";

const faqs = document.querySelector(".faqs");
const accordions = document.querySelectorAll(".accordion");

const accordionClick = function (event) {
  const faq = event.target.closest(".faq");

  if (!faq) return;

  faq.classList.toggle("open");
};

const openOnly = function (accordion) {
  for (const current of accordions) {
    if (current == accordion) {
      current.closest(".faq").classList.add("open");
      current.focus();
    } else {
      current.closest(".faq").classList.remove("open");
    }
  }
};

const openPrevious = function (accordion) {
  const target = document.querySelector(".open") || accordion;
  const index = Array.from(accordions).indexOf(accordion);

  if (index === 0) {
    openOnly(accordions[accordions.length - 1]);
  } else {
    openOnly(accordions[index - 1]);
  }
};

const openNext = function (accordion) {
  const target = document.querySelector(".open") || accordion;
  const index = Array.from(accordions).indexOf(accordion);

  if (index === accordions.length - 1) {
    openOnly(accordions[0]);
  } else {
    openOnly(accordions[index + 1]);
  }
};

const accordionKey = function (event) {
  const accordion = event.target.closest(".accordion");

  if (!accordion) return;

  switch (event.key) {
    case "Up":
    case "ArrowUp":
    case "Left":
    case "ArrowLeft":
      openPrevious(accordion);
      break;
    case "Down":
    case "ArrowDown":
    case "Right":
    case "ArrowRight":
      openNext(accordion);
      break;
    default:
      break;
  }
};

faqs.addEventListener("click", accordionClick);
faqs.addEventListener("keydown", accordionKey);
