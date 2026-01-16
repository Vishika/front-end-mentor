"use strict";

const btnPrev = document.getElementById("carousel__btn--prev");
const btnNext = document.getElementById("carousel__btn--next");

const prevImg = () => {
  const carouselImgs = Array.from(document.querySelectorAll(".carousel__img"));
  const firstIndex = 0;
  const lastIndex = carouselImgs.length - 1;
  let newIndex;
  let oldIndex;
  for (let i = 0; i < carouselImgs.length; i++) {
    if (!carouselImgs[i].classList.contains("slid-in")) continue;

    oldIndex = i;
    newIndex = i === firstIndex ? lastIndex : i - 1;
  }
  carouselImgs[oldIndex].classList.remove("slide-in-right");
  carouselImgs[oldIndex].classList.remove("slide-in-left");
  carouselImgs[newIndex].classList.add("slid-in");
  carouselImgs[newIndex].classList.add("slide-in-left");
  setTimeout(() => {
    carouselImgs[oldIndex].classList.remove("slid-in");
  }, 1000);
};

const nextImg = () => {
  const carouselImgs = Array.from(document.querySelectorAll(".carousel__img"));
  const firstIndex = 0;
  const lastIndex = carouselImgs.length - 1;
  let newIndex;
  let oldIndex;
  for (let i = 0; i < carouselImgs.length; i++) {
    if (!carouselImgs[i].classList.contains("slid-in")) continue;

    oldIndex = i;
    newIndex = i === lastIndex ? firstIndex : i + 1;
  }

  carouselImgs[oldIndex].classList.remove("slide-in-right");
  carouselImgs[oldIndex].classList.remove("slide-in-left");
  carouselImgs[newIndex].classList.add("slid-in");
  carouselImgs[newIndex].classList.add("slide-in-right");
  setTimeout(() => {
    carouselImgs[oldIndex].classList.remove("slid-in");
  }, 1000);
};

btnPrev.addEventListener("click", prevImg);
btnNext.addEventListener("click", nextImg);

/**
 * o x x > x o x
 * x o x > x x o
 * x x o > o x x
 *
 * o x x < x x o
 * x o x < o x x
 * x x o < x o x
 */
